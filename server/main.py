from contextlib import asynccontextmanager
import typing
from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


from database import SQLite
from database.models import Users, Chats
from database.models.messages import Messages
from database.utils.serializers import serialize_chat, serialize_message, serialize_simplified_chat, serialize_simplified_user, serialize_user
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession

database: SQLite = SQLite('sqlite+aiosqlite:////home/alexandresenpai/scripts/chat/server/database/chat.sqlite')

@asynccontextmanager
async def setup(server: FastAPI):
    await database.connect()
    yield
    await database.disconnect()

server = FastAPI(lifespan=setup)

server.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

class NewUser(BaseModel):
    name: str
    email: str

class NewChat(BaseModel):
    owner_id: int
    member_id: int

connected_users: dict[int, WebSocket] = dict()

async def notify_chat_members(message: Messages):
    members = [message.recipient_id, message.sender_id]
    print(members)
    for member in members:
        if member in connected_users:
            await connected_users[member].send_json(await serialize_message(message))

@server.post('/api/register')
async def register_user(new_user: NewUser):

    user = Users(name=new_user.name,
                 email=new_user.email)
    
    if database.session is not None:
        database.session.add(user)
        await database.session.commit()
        await database.session.refresh(user)

    response = {"id": user.id,
                "name": user.name,
                "email": user.email,
                "avatar": user.avatar}

    return response

@server.get('/api/user/login/{email}')
async def login(email: str):

    if database.session is None: raise HTTPException(status_code=500, detail="Theres no open database session!")

    async with database.session as session:
        query = select(Users).where(Users.email == email)
        result = await session.execute(query)
        user = result.scalars().first()
        if user is not None:
            return await serialize_simplified_user(user)

@server.get('/api/user/{user_id}')
async def get_user(user_id: int):

    if database.session is None: raise HTTPException(status_code=500, detail="Theres no open database session!")

    async with database.session as session:
        query = select(Users).where(Users.id == int(user_id)).options(selectinload(Users.owned_chats), selectinload(Users.member_chats))
        result = await session.execute(query)
        user = result.scalars().first()
        if user is not None:
            return await serialize_simplified_user(user)

    return {}

@server.get('/api/chat/{chat_id}')
async def get_chat(chat_id: int):
    
    if database.session is None: raise HTTPException(status_code=500, detail="Theres no open database session!")

    async with database.session as session:
        query = select(Chats).where(Chats.id == int(chat_id)).options(selectinload(Chats.member), selectinload(Chats.owner), selectinload(Chats.messages))
        result = await session.execute(query)
        chat = result.scalars().first()
        if chat is not None:
            return await serialize_chat(chat)

    raise HTTPException(status_code=404, detail="Theres no chat with this identifier!")

@server.get('/api/user/{user_id}/chats')
async def get_user_chats(user_id: int):
    
    if database.session is None: raise HTTPException(status_code=500, detail="Theres no open database session!")

    async with database.session as session:
        query = select(Chats).where((Chats.owner_id == int(user_id)) | (Chats.member_id == int(user_id))).options(selectinload(Chats.member), selectinload(Chats.owner))
        result = await session.execute(query)
        chats = result.scalars().all()
        if chats:
            return [await serialize_simplified_chat(chat) for chat in chats]

    return []

@server.post('/api/chat')
async def create_chat(new_chat: NewChat):

    chat = Chats(owner_id=new_chat.owner_id,
                 member_id=new_chat.member_id)
    
    if database.session is not None:
        database.session.add(chat)
        await database.session.commit()
        await database.session.refresh(chat)

    response = {"id": chat.id}

    return response


@server.websocket('/chat/{user_id}')
async def handle_chat_message(websocket: WebSocket, user_id: int):

    await websocket.accept()

    if user_id is None:
        print('Nenhum userId fornecido, fechando conexão.')
        await websocket.close(400)
        return
    
    connected_users[user_id] = websocket

    print(f"Usuário {user_id} conectado: {connected_users}")
    
    try:
        while True:
            data = await websocket.receive_json()
            
            print(data)

            chat_message = Messages(content=data["content"],
                                    chat_id=data["chat_id"],
                                    sender_id=data["sender_id"],
                                    recipient_id=data["recipient_id"])
            
            if database._session is None: continue

            async with database._session as session:
                session.add(chat_message)
                await session.commit()
                await session.refresh(chat_message)
                
                await notify_chat_members(message=chat_message)
    
    except WebSocketDisconnect:
        del connected_users[user_id]
        print('Cliente desconectado.')