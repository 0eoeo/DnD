from sqlalchemy import Column, Integer, String
from app.db.session import Base

class Character(Base):
    __tablename__ = "characters"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    class_name = Column(String)
    race = Column(String)
