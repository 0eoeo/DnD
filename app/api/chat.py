from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.services.chat import ChatRoomManager

router = APIRouter()
chat_manager = ChatRoomManager()

@router.websocket("/ws/game/{room_id}/{username}")
async def websocket_endpoint(websocket: WebSocket, room_id: str, username: str):
    await websocket.accept()
    await chat_manager.connect(room_id, websocket, username)
    try:
        while True:
            data = await websocket.receive_text()
            response = await chat_manager.handle_message(room_id, username, data)
            await chat_manager.broadcast(room_id, response)
    except WebSocketDisconnect:
        chat_manager.disconnect(room_id, websocket, username)
