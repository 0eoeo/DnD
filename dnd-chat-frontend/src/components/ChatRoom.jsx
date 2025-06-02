import React, { useState, useEffect, useRef } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function ChatRoom({ roomId, username, character }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(`ws://localhost:8000/ws/game/${roomId}/${username}`);

    ws.current.onopen = () => console.log("WebSocket connected");

    ws.current.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        setMessages((prev) => [...prev, msg]);
      } catch {
        setMessages((prev) => [...prev, { role: "system", content: event.data }]);
      }
    };

    ws.current.onclose = () => console.log("WebSocket disconnected");

    return () => {
      ws.current.close();
    };
  }, [roomId, username]);

  function handleSend() {
    if (input.trim() === "") return;
    ws.current.send(input);
    setInput("");
  }

  return (
    <div style={{ maxWidth: 700, margin: "20px auto" }}>
      <h2>Комната: {roomId}</h2>
      <h4>Персонаж: {character.name} ({character.class_name}, {character.race})</h4>
      <ChatMessages messages={messages} />
      <ChatInput input={input} setInput={setInput} onSend={handleSend} />
    </div>
  );
}
