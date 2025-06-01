import React from "react";

export default function ChatInput({ input, setInput, onSend }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSend();
    }
  };

  return (
    <div style={{ marginTop: 8 }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Введите сообщение..."
        style={{ width: "80%", padding: 8, fontSize: "1rem" }}
      />
      <button onClick={onSend} style={{ padding: "8px 12px", marginLeft: 8 }}>
        Отправить
      </button>
    </div>
  );
}
