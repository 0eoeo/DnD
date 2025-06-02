from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import character, game, chat

app = FastAPI(title="LLaMA Dungeon Chat")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# REST endpoints
app.include_router(character.router, prefix="/api/v1/character")
app.include_router(game.router, prefix="/api/v1/game")
app.include_router(chat.router)
