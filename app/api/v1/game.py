from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Set
import uuid

router = APIRouter()

# Примитивное хранилище игр в памяти (замени на БД по необходимости)
games: Dict[str, Dict] = {}

class GameCreateRequest(BaseModel):
    name: str

class JoinGameRequest(BaseModel):
    username: str

@router.post("", status_code=200)
async def create_game(request: GameCreateRequest):
    game_id = str(uuid.uuid4())
    games[game_id] = {
        "name": request.name,
        "players": set()
    }
    return {"id": game_id, "name": request.name}

@router.post("/{game_id}/join", status_code=200)
async def join_game(game_id: str, request: JoinGameRequest):
    game = games.get(game_id)
    if not game:
        raise HTTPException(status_code=404, detail="Game not found")
    if request.username in game["players"]:
        return {"status": "already joined"}
    game["players"].add(request.username)
    return {"status": "joined", "game_id": game_id, "username": request.username}
