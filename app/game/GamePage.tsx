"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import QuestionCard from "../components/QuestionCard";
import TruthOrDare from "../components/TruthOrDare";
import TruthOrDareDisplay from "../components/TruthOrDareDisplay";
import GlitchText from "../components/GlitchText";

interface GamePageProps {
  sessionId: string | null;
}

export default function GamePage({ sessionId }: GamePageProps) {
  const router = useRouter();
  const [players, setPlayers] = useState<string[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [truthOrDare, setTruthOrDare] = useState<{ choice: "truth" | "dare"; text: string } | null>(null);
  const [waitingForChoice, setWaitingForChoice] = useState(false);

  // 🔥 Memoized Fetch Next Question
  const fetchNextQuestion = useCallback(async (playerIndex: number) => {
    setLoading(true);
    setTruthOrDare(null);
    setWaitingForChoice(false);

    try {
      const response = await fetch(`/api/game/question?sessionId=${sessionId}`);
      const data = await response.json();

      if (data.success) {
        setCurrentQuestion(data.question);
        setCurrentPlayerIndex(playerIndex);
      } else {
        console.error("Error fetching question:", data.error);
      }
    } catch (error) {
      console.error("Error fetching question:", error);
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  // 🔥 Memoized Fetch Game Session & Players
  const fetchGameSession = useCallback(async () => {
    if (!sessionId) return;

    try {
      const response = await fetch(`/api/game/session?sessionId=${sessionId}`);
      const data = await response.json();

      if (data.success && Array.isArray(data.players) && data.players.length > 0) {
        console.log("✅ Players Fetched:", data.players);
        setPlayers(data.players);
        fetchNextQuestion(0);
      } else {
        console.error("❌ No players found in session.");
        setPlayers([]);
      }
    } catch (error) {
      console.error("❌ Error fetching session:", error);
      setPlayers([]);
    }
  }, [sessionId, fetchNextQuestion]);

  useEffect(() => {
    fetchGameSession();
  }, [fetchGameSession]);

  const fetchTruthOrDare = async (choice: "truth" | "dare") => {
    try {
      const response = await fetch(`/api/truth-dare?choice=${choice}`);
      const data = await response.json();
      setTruthOrDare({ choice, text: data.text });
      setWaitingForChoice(false);
    } catch (error) {
      console.error("Error fetching Truth/Dare:", error);
    }
  };

  const moveToNextPlayer = () => {
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    fetchNextQuestion(nextPlayerIndex);
  };

  const handleAnswer = async (selectedAnswer: string) => {
    try {
      const currentPlayer = players[currentPlayerIndex];

      const response = await fetch("/api/game/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gameSessionId: sessionId,
          player: currentPlayer,
          answer: selectedAnswer,
          // @ts-expect-error ✅ Using ts-expect-error instead of ts-ignore
          questionId: currentQuestion?.id,
        }),
      });

      const data = await response.json();
      console.log("Server Response:", data);

      if (data.success) {
        if (data.penalty) {
          console.log("❌ Wrong Answer! Showing Truth/Dare selection...");
          setWaitingForChoice(true);
        } else {
          console.log("✅ Correct Answer! Moving to next player...");
          setWaitingForChoice(false);
          moveToNextPlayer();
        }
      } else {
        console.error("❌ Error: No success response from server");
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  const handleEnd = () => {
    router.push("/end");
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#0D0D0D] text-white p-4 overflow-hidden">
      <GlitchText className="text-4xl md:text-6xl font-bold text-center mb-6 text-[#00FF41]">
        {players.length > 0 ? `${players[currentPlayerIndex]}'s Turn` : "Loading Players..."}
      </GlitchText>

      {loading ? (
        <p className="text-lg text-[#FF007F] animate-pulse">Fetching Question...</p>
      ) : waitingForChoice ? (
        <TruthOrDare onSelect={fetchTruthOrDare} />
      ) : truthOrDare ? (
        <TruthOrDareDisplay choice={truthOrDare.choice} text={truthOrDare.text} onContinue={moveToNextPlayer} />
      ) : (
        <QuestionCard question={currentQuestion} onAnswer={handleAnswer} />
      )}

      <button
        onClick={handleEnd}
        className="absolute bottom-8 px-6 py-3 text-lg font-bold rounded-md transition 
                   bg-[#FF007F] text-black hover:bg-[#00FF41] hover:text-[#0D0D0D]
                    shadow-lg transform hover:scale-110"
      >
        ☠️ END THE MADNESS ☠️
      </button>
    </div>
  );
}
