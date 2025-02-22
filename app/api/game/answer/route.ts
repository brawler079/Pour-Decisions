import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { gameSessionId, player, answer, correctAnswer, choice } = await req.json();

    if (!gameSessionId || !player || !answer || !correctAnswer) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Fetch game session
    const gameSession = await prisma.gameSession.findUnique({
      where: { id: gameSessionId },
    });

    if (!gameSession) {
      return NextResponse.json({ error: "Game session not found" }, { status: 404 });
    }

    // Clone scores object
    const updatedScores = { ...(gameSession.scores as Record<string, number>) };

    let penalty = false;
    if (answer === correctAnswer) {
      updatedScores[player] = (updatedScores[player] || 0) + 10; // Add points for correct answer
    } else {
      penalty = true;
    }

    // Update game session with new scores
    await prisma.gameSession.update({
      where: { id: gameSessionId },
      data: { scores: updatedScores },
    });

    // If the answer was wrong, fetch truth or dare
    if (penalty && choice) {
      // @ts-ignore
      const truthOrDare = await prisma[choice].findFirst({
        orderBy: { id: "asc" },
        take: 1,
        skip: Math.floor(Math.random() * 10),
      });

      return NextResponse.json({
        success: true,
        message: "Answer recorded",
        scores: updatedScores,
        penalty: true,
        truthOrDare: truthOrDare?.text || `No ${choice}s available`,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Answer recorded",
      scores: updatedScores,
    });
  } catch (error) {
    console.error("Error processing answer:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
