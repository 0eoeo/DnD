import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import { sendMessageToLMStudio } from "../api/lmstudio";

export default function ChatRoom({ roomId, username }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const ws = useRef(null);

  // История сообщений для отправки в LM Studio
  const lmMessages = useRef([{ role: "system", content: "You are a helpful assistant." }]);

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

    // Отправляем сообщение в WebSocket
    ws.current.send(input);
    setMessages((prev) => [...prev, `${username}: ${input}`]);
    lmMessages.current.push({ role: "user", content: input });
    setInput("");

    try {
      // Отправляем историю в LM Studio и ждем ответ
      const aiResponse = await sendMessageToLMStudio(lmMessages.current);
      lmMessages.current.push({ role: "assistant", content: aiResponse });
      setMessages((prev) => [...prev, `🧙 LLaMA DM: ${aiResponse}`]);
    } catch (err) {
      setMessages((prev) => [...prev, `Ошибка LM Studio: ${err.message}`]);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto", paddingTop: 20 }}>
      <h2>Комната: {roomId}</h2>
      <ChatMessages messages={messages} />
      <ChatInput input={input} setInput={setInput} onSend={handleSend} />
    </div>
  );
}
