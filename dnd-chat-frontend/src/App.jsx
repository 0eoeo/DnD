import React, { useState } from "react";
import ChatRoom from "./components/ChatRoom";

export default function App() {
  const [roomId, setRoomId] = useState("default-room");
  const [username, setUsername] = useState("user" + Math.floor(Math.random() * 1000));
  const [joined, setJoined] = useState(false);

  if (!joined) {
    return (
      <div style={{ maxWidth: 400, margin: "auto", paddingTop: 50 }}>
        <h1>Войти в чат</h1>
        <input
          placeholder="ID комнаты"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          style={{ width: "100%", marginBottom: 8, padding: 8 }}
        />
        <input
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", marginBottom: 8, padding: 8 }}
        />
        <button onClick={() => setJoined(true)} style={{ width: "100%", padding: 10 }}>
          Войти
        </button>
      </div>
    );
  }

  return <ChatRoom roomId={roomId} username={username} />;
}
