const API_BASE = "http://localhost:8000/api/v1";  // подкорректируй URL

export async function registerCharacter(data) {
  const res = await fetch(`${API_BASE}/character`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }
  return await res.json();
}
