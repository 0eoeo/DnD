import React, { useState } from "react";
import { registerCharacter } from "./api";

export default function CharacterRegistration({ username, onCharacterRegistered }) {
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [race, setRace] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const character = await registerCharacter({ name, class_name: className, race, username });
      onCharacterRegistered(character);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "20px auto" }}>
      <h3>Регистрация персонажа</h3>
      <div>
        <label>Имя персонажа:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Класс:</label>
        <input value={className} onChange={(e) => setClassName(e.target.value)} required />
      </div>
      <div>
        <label>Раса:</label>
        <input value={race} onChange={(e) => setRace(e.target.value)} required />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" disabled={loading}>{loading ? "Загрузка..." : "Зарегистрировать"}</button>
    </form>
  );
}
