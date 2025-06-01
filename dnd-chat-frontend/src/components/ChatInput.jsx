export default function ChatInput({ input, setInput, onSend }) {
  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }

  return (
    <textarea
      rows={3}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={onKeyDown}
      style={{ width: "100%", padding: 8, resize: "none" }}
      placeholder="Введите сообщение и нажмите Enter"
    />
  );
}
