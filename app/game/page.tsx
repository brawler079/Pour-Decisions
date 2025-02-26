"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import QuestionCard from "../components/QuestionCard";
import TruthOrDare from "../components/TruthOrDare";
import TruthOrDareDisplay from "../components/TruthOrDareDisplay";
import GlitchText from "../components/GlitchText";

export default function GamePage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState("Loading...");
  const [loading, setLoading] = useState(true);
  const [truthOrDare, setTruthOrDare] = useState<{ choice: "truth" | "dare"; text: string } | null>(null);
  const [waitingForChoice, setWaitingForChoice] = useState(false);

  useEffect(() => {
    if (!sessionId) return;
    fetchNextQuestion();
  }, [sessionId]);

  const fetchNextQuestion = async () => {
    setLoading(true);
    setTruthOrDare(null);
    setWaitingForChoice(false);

    try {
      const response = await fetch(`/api/game/question?sessionId=${sessionId}`);
      const data = await response.json();

      if (data.success) {
        setCurrentQuestion(data.question);
        setCurrentPlayer(data.currentPlayer ?? "Mystery Player");
      }
    } catch (error) {
      console.error("Error fetching question:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTruthOrDare = async (choice: "truth" | "dare") => {
    try {
      const response = await fetch(`/api/truth-dare?choice=${choice}`);
      const data = await response.json();
      console.log("Truth/Dare Response:", data);
      setTruthOrDare({ choice, text: data.text }); // ✅ Show the fetched Truth/Dare text
      setWaitingForChoice(false); // ✅ Stop waiting for a choice
    } catch (error) {
      console.error("Error fetching Truth/Dare:", error);
    }
  };

  const handleAnswer = async (selectedAnswer: string) => {
    try {
      const response = await fetch("/api/game/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gameSessionId: sessionId,
          player: currentPlayer,
          answer: selectedAnswer,
          questionId: currentQuestion?.id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        if (data.penalty) {
          setWaitingForChoice(true); // ✅ Show Truth/Dare selection buttons
        } else {
          fetchNextQuestion();
        }
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#0D0D0D] text-white p-4 overflow-hidden">
      <GlitchText className="text-4xl md:text-6xl font-bold text-center mb-6 text-[#00FF41]">
        {currentPlayer ? `${currentPlayer}'s Turn` : "Loading Player..."}
      </GlitchText>

      {loading ? (
        <p className="text-lg text-[#FF007F] animate-pulse">Fetching Question...</p>
      ) : waitingForChoice ? (
        <TruthOrDare onSelect={fetchTruthOrDare} />
      ) : truthOrDare ? (
        <TruthOrDareDisplay
          choice={truthOrDare.choice}
          text={truthOrDare.text}
          onContinue={fetchNextQuestion} // ✅ Moves to the next question
        />
      ) : (
        <QuestionCard question={currentQuestion} onAnswer={handleAnswer} />
      )}
    </div>
  );
}
