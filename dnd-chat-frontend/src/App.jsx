import React, { useState } from "react";
import CharacterRegistration from "./components/CharacterRegistration";
import ChatRoom from "./components/ChatRoom";

export default function App() {
  const [username] = useState(`user${Math.floor(Math.random() * 1000)}`);
  const [character, setCharacter] = useState(null);
  const roomId = "default-room";

  return (
    <div>
      {!character ? (
        <CharacterRegistration username={username} onCharacterRegistered={setCharacter} />
      ) : (
        <ChatRoom roomId={roomId} username={username} character={character} />
      )}
    </div>
  );
}
