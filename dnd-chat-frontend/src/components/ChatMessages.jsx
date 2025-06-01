export default function ChatMessages({ messages }) {
  return (
    <div style={{
      height: 400,
      overflowY: "auto",
      border: "1px solid #ccc",
      padding: 10,
      marginBottom: 10,
      backgroundColor: "#f9f9f9"
    }}>
      {messages.map((msg, idx) => (
        <div key={idx} style={{ marginBottom: 8 }}>
          {msg.split("\n").map((line, i) => (
            <p key={i} style={{ margin: 0 }}>{line}</p>
          ))}
        </div>
      ))}
    </div>
  );
}
