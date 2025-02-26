import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { gameSessionId, player, answer, questionId } = await req.json();

    if (!gameSessionId || !player || !answer || !questionId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ✅ Fetch the game session
    const gameSession = await prisma.gameSession.findUnique({ where: { id: gameSessionId } });
    if (!gameSession) {
      return NextResponse.json({ error: "Game session not found" }, { status: 404 });
    }

    // ✅ Fetch the exact question
    const question = await prisma.question.findUnique({ where: { id: questionId } });
    if (!question) {
      return NextResponse.json({ error: "Question not found" }, { status: 500 });
    }

    const correctAnswer = question.answer;
    let penalty = answer !== correctAnswer; // ✅ Set penalty only if answer is wrong

    // ✅ Clone scores object to update safely
    const updatedScores: Record<string, number> = gameSession.scores
      ? { ...(gameSession.scores as Record<string, number>) }
      : {};

    if (!penalty) {
      updatedScores[player] = (updatedScores[player] || 0) + 10; // ✅ Add points only if correct
    }

    // ✅ Update scores in database
    await prisma.gameSession.update({
      where: { id: gameSessionId },
      data: { scores: updatedScores },
    });

    return NextResponse.json({
      success: true,
      penalty, // ✅ Send penalty status to frontend
      message: penalty ? "Wrong answer! Choose Truth or Dare." : "Correct answer recorded",
      scores: updatedScores,
    });
  } catch (error) {
    console.error("❌ Error processing answer:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
