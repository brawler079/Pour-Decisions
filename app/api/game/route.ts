import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: any) {
  try {
    const { players } = await req.json(); // Get player names from request
    if (!players || !Array.isArray(players) || players.length === 0) {
      return NextResponse.json({ error: "Invalid player list" }, { status: 400 });
    }

    // Initialize scores for each player with 0
    const scores = players.reduce((acc, player) => {
      acc[player] = 0;
      return acc;
    }, {});

    // Create GameSession with players and scores
    const gameSession = await prisma.gameSession.create({
      data: {
        players,
        scores,
      },
    });

    return NextResponse.json({ success: true, gameSessionId: gameSession.id, players });
  } catch (error) {
    console.error("Error starting game:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
