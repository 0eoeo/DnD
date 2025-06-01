import pytest
from starlette.testclient import TestClient
from fastapi import FastAPI, WebSocket
from app.main import app  # Импортируй свой FastAPI-приложение

client = TestClient(app)

@pytest.mark.asyncio
async def test_chat_websocket():
    room_id = "4c851046-ef36-43f2-a7dd-005e97280237"
    username = "alex"

    with client.websocket_connect(f"/ws/game/{room_id}/{username}") as websocket:
        websocket.send_text("Привет, мир!")

        responses = []
        for _ in range(2):  # Ждём два сообщения: присоединение и само сообщение
            responses.append(websocket.receive_text())

        assert any("alex: Привет, мир!" in r or "🧙 LLaMA DM:" in r for r in responses)
