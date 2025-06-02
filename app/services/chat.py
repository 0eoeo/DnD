import json
from typing import Dict, List
from fastapi import WebSocket
from app.services.llama import ask_llama

class ChatManager:
    def __init__(self):
        self.active_rooms: Dict[str, Dict[str, WebSocket]] = {}

    async def connect(self, room_id: str, websocket: WebSocket, username: str):
        if room_id not in self.active_rooms:
            self.active_rooms[room_id] = {}
        self.active_rooms[room_id][username] = websocket
        await self.broadcast(room_id, f"🧙 {username} присоединился к комнате.")

    def disconnect(self, room_id: str, websocket: WebSocket, username: str):
        if room_id in self.active_rooms and username in self.active_rooms[room_id]:
            del self.active_rooms[room_id][username]

    async def broadcast(self, room_id: str, message: str):
        for ws in self.active_rooms.get(room_id, {}).values():
            await ws.send_text(message)

    async def handle_message(self, room_id: str, username: str, message: str, db):
        # Вызов ask_llama с передачей db
        llama_response = await ask_llama(room_id, message, username, db)
        return llama_response

        return f"{user_msg}\n🧙 LLaMA DM: {llama_response}"
