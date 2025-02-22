'use client';
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import QuestionCard from "../components/QuestionCard";
import TruthOrDare from "../components/TruthOrDare";
import GlitchText from "../components/GlitchText";

export default function GamePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState("Loading...");
  const [truthOrDare, setTruthOrDare] = useState(null);

  useEffect(() => {
    if (!sessionId) return;
    fetchNextQuestion();
  }, [sessionId]);

  const fetchNextQuestion = async () => {
    try {
      const response = await fetch(`/api/game/question?sessionId=${sessionId}`);
      const data = await response.json();
  
      if (data.success) {
        setCurrentQuestion(data.question);
        setCurrentPlayer(data.currentPlayer ?? "Mystery Player"); // ✅ Set player correctly
      } else {
        console.error("Error fetching question:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  const handleAnswer = async (selectedAnswer: any) => {
    try {
      const response = await fetch("/api/game/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, selectedAnswer }),
      });
      const data = await response.json();
      if (data.correct) {
        fetchNextQuestion();
      } else {
        fetchTruthOrDare();
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  const fetchTruthOrDare = async () => {
    try {
      const response = await fetch("/api/truth-dare");
      const data = await response.json();
      setTruthOrDare(data);
    } catch (error) {
      console.error("Error fetching Truth/Dare:", error);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#0D0D0D] text-white p-4 overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-20 z-0"></div>
      <GlitchText className="text-4xl md:text-6xl font-bold text-center mb-6 text-[#00FF41]">
      {currentPlayer ? `${currentPlayer}'s Turn` : "Loading Player..."}
      </GlitchText>
      {truthOrDare ? (
        <TruthOrDare truthOrDare={truthOrDare} onComplete={() => {
          setTruthOrDare(null);
          fetchNextQuestion();
        }} />
      ) : (
        <QuestionCard question={currentQuestion} onAnswer={handleAnswer} />
      )}
      <div className="absolute inset-0 pointer-events-none">
        <div className="bg-glitch w-full h-full absolute top-0 left-0 opacity-5 animate-glitch"></div>
        <div className="bg-matrix w-full h-full absolute top-0 left-0 opacity-10 animate-flicker"></div>
      </div>
    </div>
  );
}
