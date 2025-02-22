import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
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

    return NextResponse.json({ success: true, question: question[0] });
  } catch (error) {
    console.error("Error fetching question:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
