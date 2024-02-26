from datetime import datetime
from database.models.chats import Chats
from database.models.messages import Messages
from database.models.users import Users

async def serialize_user(user: Users):
    return {
        "id": user.id,
        "created_at": datetime.strftime(user.created_at, '%d/%m/%Y'), # type: ignore
        "updated_at": datetime.strftime(user.updated_at, '%d/%m/%Y'), # type: ignore
        "name": user.name,
        "email": user.email,
        "avatar": user.avatar,
        "chats": [await serialize_simplified_chat(chat) for chat in user.owned_chats if chat is not None] + [await serialize_simplified_chat(chat) for chat in user.member_chats if chat is not None]
    }

async def serialize_simplified_user(user: Users):
    return {
        "id": user.id,
        "created_at": datetime.strftime(user.created_at, '%d/%m/%Y'), # type: ignore
        "updated_at": datetime.strftime(user.updated_at, '%d/%m/%Y'), # type: ignore
        "name": user.name,
        "email": user.email,
        "avatar": user.avatar
    }

async def serialize_message(message: Messages):
    return {
        "id": message.id,
        "chat_id": message.chat_id,
        "sender_id": message.sender_id,
        "recipient_id": message.recipient_id,
        "created_at": datetime.strftime(message.created_at, '%d/%m/%Y'), # type: ignore
        "updated_at": datetime.strftime(message.updated_at, '%d/%m/%Y'), # type: ignore
        "content": message.content,
        "attachment": {
            "id": message.attachment_id,
            "uri": message.attachment_uri,
            "type": message.attachment_type,
            "mime": message.attachment_mime
        } if bool(message.has_attachment) else None
    }

async def serialize_simplified_chat(chat: Chats):
    return { 
        "id": chat.id,
        "created_at": datetime.strftime(chat.created_at, '%d/%m/%Y'), # type: ignore
        "updated_at": datetime.strftime(chat.updated_at, '%d/%m/%Y'), # type: ignore
        "member": await serialize_simplified_user(chat.member),
        "owner": await serialize_simplified_user(chat.owner),
    }

async def serialize_chat(chat: Chats):
    return { 
        "id": chat.id,
        "created_at": datetime.strftime(chat.created_at, '%d/%m/%Y'), # type: ignore
        "updated_at": datetime.strftime(chat.updated_at, '%d/%m/%Y'), # type: ignore
        "member": await serialize_simplified_user(chat.member),
        "owner": await serialize_simplified_user(chat.owner),
        "messages": [await serialize_message(message) for message in chat.messages]
    }