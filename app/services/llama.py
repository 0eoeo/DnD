import httpx

LLAMA_API_URL = "http://127.0.0.1:11434/v1/chat/completions"
MODEL_NAME = "gemma-3-1b-it-qat"  # Заменить на своё имя модели из LM Studio

# Опционально храним переписку
chat_history = {}

async def ask_llama(room_id: str, user_message: str, username: str) -> str:
    if room_id not in chat_history:
        chat_history[room_id] = [
            {"role": "system", "content": "Ты Dungeon Master. Веди D&D-сессию с игроками."}
        ]
    
    # Добавляем сообщение пользователя в историю
    chat_history[room_id].append({"role": "user", "content": f"{username}: {user_message}"})
    
    async with httpx.AsyncClient() as client:
        response = await client.post(LLAMA_API_URL, json={
            "model": MODEL_NAME,
            "messages": chat_history[room_id],
            "temperature": 0.8
        })
        response.raise_for_status()
        reply = response.json()["choices"][0]["message"]["content"]
        
        # Добавляем ответ LLaMA в историю
        chat_history[room_id].append({"role": "assistant", "content": reply})
        return reply
