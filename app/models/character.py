from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.session import Base

class Character(Base):
    __tablename__ = "characters"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    class_name = Column(String)
    race = Column(String)

    user_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="character")
