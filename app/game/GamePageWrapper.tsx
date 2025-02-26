"use client";
import { useSearchParams } from "next/navigation";
import GamePage from "./GamePage";

export default function GamePageWrapper() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");

  return <GamePage sessionId={sessionId} />;
}
