"use client";

import { useState } from "react";
import { PlusCircle, X } from "lucide-react";

interface PlayerListProps {
  players: string[];
  addPlayer: (player: string) => void;
  removePlayer: (index: number) => void;
}

export default function PlayerList({ players, addPlayer, removePlayer }: PlayerListProps) {
  const [newPlayer, setNewPlayer] = useState<string>("");

  const handleAddPlayer = () => {
    if (newPlayer.trim()) {
      addPlayer(newPlayer.trim());
      setNewPlayer("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <input
          type="text"
          value={newPlayer}
          onChange={(e) => setNewPlayer(e.target.value)}
          placeholder="Enter player name"
          className="flex-grow px-4 py-2 bg-[#0D0D0D] border border-[#00FF41] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00FF41] text-white placeholder-gray-500"
        />
        <button
          onClick={handleAddPlayer}
          className="px-4 py-2 bg-[#00FF41] text-[#0D0D0D] rounded-md hover:bg-[#FF007F] transition-colors duration-200 flex items-center"
        >
          <PlusCircle size={20} className="mr-2" /> Add Player
        </button>
      </div>
      <ul className="space-y-2">
        {players.map((player: string, index: number) => (
          <li key={index} className="flex justify-between items-center bg-[#1A1A1A] px-4 py-2 rounded-md">
            <span>{player}</span>
            <button
              onClick={() => removePlayer(index)}
              className="text-[#FF007F] hover:text-[#00FF41] transition-colors duration-200"
            >
              <X size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
