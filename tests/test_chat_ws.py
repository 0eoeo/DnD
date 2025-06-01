import pytest
from starlette.testclient import TestClient
from app.main import app

client = TestClient(app)

@pytest.mark.asyncio
async def test_chat_ws():
    with client.websocket_connect("/ws/game/testroom/alex") as websocket:
        websocket.send_text("Привет")
        data = websocket.receive_text()
        assert "alex:" in data
