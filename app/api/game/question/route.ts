import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json({ error: "Missing session ID" }, { status: 400 });
    }

    // Fetch the game session
    const gameSession = await prisma.gameSession.findUnique({
      where: { id: sessionId },
    });

    if (!gameSession) {
      return NextResponse.json({ error: "Game session not found" }, { status: 404 });
    }

    // Get the total count of questions
    const count = await prisma.question.count();
    if (count === 0) {
      return NextResponse.json({ error: "No questions available" }, { status: 404 });
    }

    // Pick a random question
    const randomIndex = Math.floor(Math.random() * count);
    const question = await prisma.question.findMany({
      take: 1,
      skip: randomIndex,
    });

    // Pick the next player's turn
    const players = gameSession.players as string[];
    const nextPlayerIndex = Math.floor(Math.random() * players.length);
    const currentPlayer = players[nextPlayerIndex]; // Random player

    return NextResponse.json({ success: true, question: question[0], currentPlayer });
  } catch (error) {
    console.error("Error fetching question:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
