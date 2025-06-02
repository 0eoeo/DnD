from sqlalchemy.orm import Session
from app.models.user import User
import httpx

# пример констант
LLAMA_API_URL = "http://localhost:11434/v1/chat/completions"
MODEL_NAME = "gemma-3-1b-it-qat"

chat_history = {}

async def ask_llama(room_id: str, user_message: str, username: str, db: Session) -> str:
    user = db.query(User).filter(User.username == username).first()
    if user is None:
        character_name = "неизвестный герой"
    else:
        character = user.character
        character_name = character.name if character else "безымянный герой"

    if room_id not in chat_history:
        chat_history[room_id] = [
            {"role": "system", "content": "Ты Dungeon Master. Веди D&D-сессию с игроками."}
        ]

    chat_history[room_id].append({"role": "user", "content": f"{character_name} ({username}): {user_message}"})

    async with httpx.AsyncClient() as client:
        response = await client.post(LLAMA_API_URL, json={
            "model": MODEL_NAME,
            "messages": chat_history[room_id],
            "temperature": 0
        })
        response.raise_for_status()
        data = response.json()
        if "choices" not in data:
            print("Ошибка: нет ключа 'choices' в ответе:", data)
            return "Ошибка при получении ответа от модели."
        reply = data["choices"][0]["message"]["content"]

        chat_history[room_id].append({"role": "assistant", "content": reply})

    return reply

