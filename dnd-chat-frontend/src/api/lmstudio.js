const LMSTUDIO_URL = "http://localhost:11434/v1/chat/completions";

export async function sendMessageToLMStudio(messages) {
  // messages — массив сообщений в формате [{ role: "user", content: "..." }, ...]
  const body = {
    model: "llama",  // Укажи нужную модель из твоего LM Studio
    messages: messages,
  };

  const response = await fetch(LMSTUDIO_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`LM Studio API error: ${errorText}`);
  }

  const data = await response.json();
  // Вернём содержимое ответа модели
  return data.choices?.[0]?.message?.content || "";
}
