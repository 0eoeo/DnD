export default function ChatInput({ input, setInput, onSend }) {
  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }

  return (
    <div style={{ marginTop: 10 }}>
      <textarea
        rows={3}
        style={{ width: "100%", resize: "none" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <button onClick={onSend} style={{ marginTop: 5 }}>Отправить</button>
    </div>
  );
}
