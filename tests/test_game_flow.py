import pytest
from httpx import AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_create_game_and_join():
    async with AsyncClient(base_url="http://localhost:8000") as ac:
        # Создаем игру (нужно чтобы сервер был запущен на http://localhost:8000)
        response = await ac.post("http://localhost:8000/api/v1/game", json={"name": "Моя Игра"})
        assert response.status_code == 200
        game_id = response.json()["id"]

        # Присоединяемся к игре
        response = await ac.post(f"http://localhost:8000/api/v1/game/{game_id}/join", json={"username": "alex"})
        assert response.status_code == 200
        assert response.json()["status"] == "joined"
