import React from "react";

export default function ChatMessages({ messages }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        height: 300,
        overflowY: "auto",
        padding: 10,
        backgroundColor: "#f9f9f9",
      }}
    >
      {messages.map((msg, i) => (
        <div
          key={i}
          style={{
            margin: "5px 0",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {msg}
        </div>
      ))}
    </div>
  );
}
