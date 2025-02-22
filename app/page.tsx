"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GlitchText from "./components/GlitchText";
import PlayerList from "./components/PlayerList";
import RoundSelector from "./components/RoundSelector";
import StartButton from "./components/StartButton";

export default function Home() {
  const [players, setPlayers] = useState<string[]>([]);
  const [rounds, setRounds] = useState(10);
  const router = useRouter();

  const addPlayer = (name: string) => {
    setPlayers([...players, name]);
  };

  const removePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const startGame = async () => {
    try {
      const response = await fetch("/api/game", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ players, rounds }),
      });

      const data = await response.json();
      if (data.success) {
        router.push(`/game?sessionId=${data.gameSessionId}`);
      } else {
        console.error("Failed to start game:", data.error);
      }
    } catch (error) {
      console.error("Error starting game:", error);
    }
  };

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white p-4 flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full max-w-md space-y-8 relative z-10">
        <GlitchText className="text-4xl md:text-6xl font-bold text-center mb-2">
          Booze Quiz
        </GlitchText>
        <p className="text-center text-lg mb-8 animate-pulse">
          Enter your names and get ready to get wrecked!
        </p>
        <PlayerList players={players} addPlayer={addPlayer} removePlayer={removePlayer} />
        <RoundSelector rounds={rounds} setRounds={setRounds} />
        <StartButton onClick={startGame} disabled={players.length === 0} />
      </div>
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-scanlines opacity-10"></div>
        <div className="absolute inset-0 bg-matrix opacity-5"></div>
      </div>
    </main>
  );
}
