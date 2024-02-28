from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from database.models.base import Base

class Messages(Base):

    __tablename__ = 'messages'

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
    content = Column(String,
                     unique=False,
                     nullable=False)
    chat_id = Column(Integer, ForeignKey("chats.id"))
    sender_id = Column(Integer, ForeignKey("users.id"))
    recipient_id = Column(Integer, ForeignKey("users.id"))
    has_attachment = Column(Boolean, 
                            unique=False, 
                            nullable=True, 
                            default=False)
    attachment_id = Column(String,
                           nullable=True)
    attachment_uri = Column(String, 
                            nullable=True)
    attachment_mime = Column(String, 
                             nullable=True, 
                             unique=False)
    attachment_type = Column(String,
                             nullable=True,
                             unique=False)

    chat = relationship("Chats", back_populates="messages", lazy="selectin")
