import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { gameSessionId, player, points } = await req.json();

    if (!gameSessionId || !player || points === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ✅ Fetch the current game session
    const gameSession = await prisma.gameSession.findUnique({
      where: { id: gameSessionId },
    });

    if (!gameSession) {
      return NextResponse.json({ error: "Game session not found" }, { status: 404 });
    }

    // ✅ Ensure scores is an object (Prisma stores JSON as `any`)
    const existingScores = typeof gameSession.scores === "object" && gameSession.scores !== null
      ? gameSession.scores as Record<string, number>
      : {};

    // ✅ Clone and update the scores object safely
    const updatedScores: Record<string, number> = { ...existingScores };
    updatedScores[player] = (updatedScores[player] || 0) + points;

    // ✅ Update the game session in the database
    await prisma.gameSession.update({
      where: { id: gameSessionId },
      data: { scores: updatedScores },
    });

    return NextResponse.json({
      success: true,
      message: `Updated ${player}'s score by ${points} points.`,
      scores: updatedScores,
    });
  } catch (error) {
    console.error("❌ Error updating score:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
