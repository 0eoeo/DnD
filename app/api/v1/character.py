from fastapi import APIRouter, HTTPException
from app.schemas.character import CharacterCreate, CharacterOut
from app.services.character import create_character

router = APIRouter()

@router.post("/register", response_model=CharacterOut)
def register_character(data: CharacterCreate):
    character = create_character(data)
    if not character:
        raise HTTPException(status_code=400, detail="Cannot create character")
    return character
