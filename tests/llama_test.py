import httpx

response = httpx.post("http://127.0.0.1:11434/v1/chat/completions", json={
    "model": "llama3",
    "messages": [
        {"role": "system", "content": "Ты доброжелательный помощник."},
        {"role": "user", "content": "Привет, как дела?"}
    ]
})

print(response.json()["choices"][0]["message"]["content"])
