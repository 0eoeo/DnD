from pydantic import BaseModel
from app.schemas.character import CharacterCreate, CharacterOut

class UserCreate(BaseModel):
    username: str
    password: str
    character: CharacterCreate

class UserOut(BaseModel):
    id: int
    username: str
    character: CharacterOut

    class Config:
        from_attributes = True
