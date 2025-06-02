export default function ChatMessages({ messages }) {
  return (
    <div style={{ height: 400, overflowY: "auto", border: "1px solid #ccc", padding: 10, backgroundColor: "#f9f9f9" }}>
      {messages.map((msg, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <b style={{
            color: msg.role === "assistant" ? "green" : msg.role === "user" ? "blue" : "gray"
          }}>
            {msg.username ? `${msg.username}:` : msg.role}{" "}
          </b>
          <span>{msg.content}</span>
        </div>
      ))}
    </div>
  );
}
