from app.models.character import Character
from app.schemas.character import CharacterCreate
from app.db.session import SessionLocal

def create_character(data: CharacterCreate) -> Character:
    db = SessionLocal()
    character = Character(
        name=data.name,
        class_name=data.class_name,
        race=data.race
    )
    db.add(character)
    db.commit()
    db.refresh(character)
    db.close()
    return character
