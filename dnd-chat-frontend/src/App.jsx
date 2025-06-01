import React, { useState } from "react";

function ChatRoom({ roomId, username }) {
  return (
    <div>
      <h2>Комната: {roomId}</h2>
      <p>Пользователь: {username}</p>
    </div>
  );
}

export default function App() {
  const [roomId, setRoomId] = useState("4c851046-ef36-43f2-a7dd-005e97280237");
  const [username, setUsername] = useState("alex");
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
