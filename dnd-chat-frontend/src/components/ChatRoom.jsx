import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

export default function ChatRoom({ roomId, username }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(`ws://localhost:8000/ws/game/${roomId}/${username}`);

    ws.current.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.current.onmessage = (event) => {
      const msg = event.data;
      setMessages((prev) => [...prev, msg]);
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.current.close();
    };
  }, [roomId, username]);

  async function handleSend() {
    if (input.trim() === "") return;
    ws.current.send(input);
    setInput("");
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto", paddingTop: 20 }}>
      <h2>Комната: {roomId}</h2>
      <ChatMessages messages={messages} />
      <ChatInput input={input} setInput={setInput} onSend={handleSend} />
    </div>
  );
}
