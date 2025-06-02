from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.user import UserCreate, UserOut
from app.services.character import create_user_with_character
from app.db.session import get_db

router = APIRouter()

@router.post("/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    return create_user_with_character(db, user)
