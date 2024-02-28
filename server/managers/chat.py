from dataclasses import asdict, dataclass, field
from typing import Literal
from fastapi import WebSocket

@dataclass
class GroupMember:
    id: int
    channel: WebSocket

@dataclass
class Attachment:
    id: str
    content_type: str
    type: Literal["audio"] | Literal["image"]
    uri: str

@dataclass
class ChatMessage:
    sender_id: int
    recipient_id: int
    chat_id: int
    content: str
    attachment: Attachment | None = field(default=None)

    def to_json(self):
        return asdict(self)


class Chat:
    def __init__(self) -> None:
        self.members: dict[int, GroupMember] = dict()

    async def join(self, 
                   member: GroupMember) -> bool:
        
        if id in self.members: return True
        if len(self.members.keys()) >= 2: return False
        
        self.members[member.id] = member
        return True
    
    async def disconnect(self, member: GroupMember) -> bool:

        if member.id not in self.members: return True
        
        try:
            await self.members[member.id].channel.close()
        except RuntimeError as err:
            print(f'Could not close member channel due already closed channel or unexpected error. Reason: {err}')
        finally:            
            del self.members[member.id]
        
        return True
    
    @property
    def all_members(self) -> list[GroupMember]:
        return list(self.members.values())
    
    def get_member(self, id: int) -> GroupMember | None:
        if id not in self.members: return None
        return self.members[id]


class ChatManager:
    def __init__(self) -> None:
        self.chats: dict[int, Chat] = {}

    async def active_chats(self) -> None:
        for chat in self.chats:
            print(f'{chat}: {self.chats[chat].all_members}')

    async def join(self, 
                   chat_id: int,
                   member: GroupMember) -> bool:
    
        if chat_id not in self.chats:
            new_chat = Chat()
            self.chats[chat_id] = new_chat
        
        return await self.chats[chat_id].join(member=member)
    
    async def disconnect(self, chat_id: int, member: GroupMember) -> bool:

        if chat_id not in self.chats: return True

        return await self.chats[chat_id].disconnect(member)
    
    async def send_message(self, 
                           message: ChatMessage) -> bool:
        if message.chat_id not in self.chats: return False

        chat = self.chats[message.chat_id]
        member = chat.get_member(message.recipient_id)

        if member is None: return False

        try:
            await member.channel.send_json(message.to_json())
            return True
        except Exception as err:
            print(f'Could not send message to channel. Reason: {err}')
            return False