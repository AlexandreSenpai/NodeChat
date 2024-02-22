from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, Integer
from sqlalchemy.orm import relationship

from database.models.base import Base

class Chats(Base):

    __tablename__ = 'chats'

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
    
    owner_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    member_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    # Specify the foreign_keys argument to resolve ambiguity
    owner = relationship("Users", foreign_keys=[owner_id], back_populates="owned_chats", lazy="selectin")
    member = relationship("Users", foreign_keys=[member_id], back_populates="member_chats", lazy="selectin")
    messages = relationship("Messages", back_populates="chat", lazy="selectin")

