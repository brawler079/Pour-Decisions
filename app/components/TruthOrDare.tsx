"use client";
import { useState } from "react";

interface TruthOrDareProps {
  onSelect: (choice: "truth" | "dare") => void;
}

export default function TruthOrDare({ onSelect }: TruthOrDareProps) {
  const [loading, setLoading] = useState(false);

  const handleChoice = async (selectedChoice: "truth" | "dare") => {
    setLoading(true);
    await onSelect(selectedChoice); // ✅ Fetch Truth/Dare
    setLoading(false);
  };

  return (
    <div className="bg-[#1A1A1A] p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-xl font-bold">You got it wrong! Choose:</h2>
      <div className="mt-4 space-y-2">
        <button
          onClick={() => handleChoice("truth")}
          disabled={loading}
          className="block w-full py-2 px-4 bg-[#00FF41] text-black rounded-md hover:bg-[#FF007F] transition cursor-pointer disabled:opacity-50"
        >
          {loading ? "Loading..." : "Truth"}
        </button>
        <button
          onClick={() => handleChoice("dare")}
          disabled={loading}
          className="block w-full py-2 px-4 bg-[#FF007F] text-black rounded-md hover:bg-[#00FF41] transition cursor-pointer disabled:opacity-50"
        >
          {loading ? "Loading..." : "Dare"}
        </button>
      </div>
    </div>
  );
}
