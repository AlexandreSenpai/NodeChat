from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.orm import relationship

from database.models.base import Base

class Users(Base):

    __tablename__ = 'users'

    id = Column(Integer,
                autoincrement=True, 
                unique=True, 
                primary_key=True,
                nullable=False)
    created_at = Column(DateTime, 
                        default=datetime.utcnow)
    updated_at = Column(DateTime, 
                        default=datetime.utcnow, 
                        onupdate=datetime.utcnow)
    name = Column(String,
                  nullable=False,
                  unique=False)
    email = Column(String,
                   nullable=False,
                   unique=True)
    avatar = Column(String,
                    default='https://us.123rf.com/450wm/marish/marish1801/marish180100020/93241326-ilustra%C3%A7%C3%A3o-de-gato-bonito-%C3%ADcone-avatar.jpg',
                    nullable=False,
                    unique=False)
    
    owned_chats = relationship("Chats", back_populates="owner", foreign_keys="[Chats.owner_id]", lazy="selectin")
    member_chats = relationship("Chats", back_populates="member", foreign_keys="[Chats.member_id]", lazy="selectin")

