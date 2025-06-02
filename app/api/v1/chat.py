from fastapi import APIRouter, WebSocket, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.chat import ChatManager
from app.services.llama import ask_llama

router = APIRouter()
chat_manager = ChatManager()

@router.websocket("/ws/game/{room_id}/{username}")
async def websocket_endpoint(
    websocket: WebSocket,
    room_id: str,
    username: str,
    db: Session = Depends(get_db)
):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            response = await chat_manager.handle_message(room_id, username, data, db)
            await websocket.send_text(response)
    except Exception as e:
        print(f"WebSocket error: {e}")
    finally:
        await websocket.close()
