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

    const gameSession = await prisma.gameSession.findUnique({
      where: { id: sessionId },
    });

    if (!gameSession) {
      return NextResponse.json({ error: "Game session not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, gameSession });
  } catch (error) {
    console.error("Error fetching game session:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
