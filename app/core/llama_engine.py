# app/core/llama_engine.py

import httpx
from typing import Dict, List

LLAMA_API_URL = "http://127.0.0.1:11434/v1/chat/completions"
MODEL_NAME = "gemma-3-1b-it-qat"

class LlamaEngine:
    def __init__(self):
        # Храним историю переписки в памяти (в будущем можно заменить на Redis)
        self.chat_history: Dict[str, List[Dict[str, str]]] = {}

    def _init_room(self, room_id: str):
        if room_id not in self.chat_history:
            self.chat_history[room_id] = [
                {"role": "system", "content": "Ты Dungeon Master. Веди D&D-сессию с игроками."}
            ]

    async def ask(self, room_id: str, user_message: str, username: str) -> str:
        self._init_room(room_id)

        self.chat_history[room_id].append({
            "role": "user",
            "content": f"{username}: {user_message}"
        })

        async with httpx.AsyncClient() as client:
            response = await client.post(LLAMA_API_URL, json={
                "model": MODEL_NAME,
                "messages": self.chat_history[room_id],
                "temperature": 0
            })
            response.raise_for_status()

            reply = response.json()["choices"][0]["message"]["content"]
            self.chat_history[room_id].append({"role": "assistant", "content": reply})
            return reply
