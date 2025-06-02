from pydantic import BaseModel

class CharacterCreate(BaseModel):
    name: str
    class_name: str
    race: str

class CharacterOut(BaseModel):
    id: int
    name: str
    class_name: str
    race: str

    class Config:
        from_attributes = True
