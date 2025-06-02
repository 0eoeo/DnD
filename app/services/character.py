from sqlalchemy.orm import Session
from app.models.character import Character
from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import get_password_hash

def create_user_with_character(db: Session, user: UserCreate) -> User:
    hashed_password = get_password_hash(user.password)
    db_user = User(username=user.username, hashed_password=hashed_password)
    db.add(db_user)
    db.flush()

    db_character = Character(
        name=user.character.name,
        class_name=user.character.class_name,
        race=user.character.race,
        user_id=db_user.id
    )
    db.add(db_character)
    db.commit()
    db.refresh(db_user)
    return db_user
