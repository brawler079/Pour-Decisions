// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// const truths = [
//     { text: "Have you ever sent a text to the wrong person? What happened?" },
//     { text: "What’s the most embarrassing thing you’ve done while drunk?" },
//     { text: "If you had to choose, which player here would you trade lives with for a week?" },
//     { text: "What’s a secret you’ve never told anyone?" },
//     { text: "Have you ever had a crush on someone in this room?" },
//     { text: "What’s the most awkward date you’ve ever been on?" },
//     { text: "What’s the dumbest thing you’ve ever Googled?" },
//     { text: "If you could erase one past experience, what would it be?" },
//     { text: "Have you ever lied to get out of plans?" },
//     { text: "What’s something childish you still do?" },
//     { text: "Have you ever stalked someone on social media? Who?" },
//     { text: "What’s your worst habit?" },
//     { text: "If you had to delete one app from your phone, which one would it be?" },
//     { text: "What’s the most embarrassing thing in your search history?" },
//     { text: "What’s the worst thing you've ever done to get revenge on someone?" },
//     { text: "Have you ever had a wardrobe malfunction in public?" },
//     { text: "What’s the most embarrassing nickname you've ever had?" },
//     { text: "If you had to be handcuffed to one person in this room for 24 hours, who would you choose?" },
//     { text: "Have you ever accidentally liked an old post while stalking someone?" },
//     { text: "What’s the worst pickup line you've ever used or received?" },
//     { text: "Have you ever cheated in a game (board game, video game, etc.)?" },
//     { text: "Have you ever had a crush on your teacher/professor?" },
//     { text: "What’s the most ridiculous reason you’ve ever cried?" },
//     { text: "Who was your first celebrity crush?" },
//     { text: "What’s something really weird that you find attractive?" },
//     { text: "Have you ever been caught doing something embarrassing in public?" },
//     { text: "What’s the last thing you lied about?" },
//     { text: "What’s something you’ve done drunk that you completely forgot about until someone reminded you?" },
//     { text: "What’s the worst gift you’ve ever received?" },
//     { text: "Have you ever had an imaginary friend?" },
//     { text: "What’s the weirdest thing you do when you're alone?" },
//     { text: "What’s the most awkward thing you've ever said to a stranger?" },
//     { text: "What’s a weird food combination you actually love?" },
//     { text: "What’s the worst haircut you’ve ever had?" },
//     { text: "Have you ever slid into someone's DMs? What happened?" },
//     { text: "What’s the most embarrassing thing you’ve ever done in front of your crush?" },
//     { text: "What’s a guilty pleasure song you secretly love?" },
//     { text: "Have you ever had a dream about someone in this room?" },
//     { text: "Have you ever lied in a Truth or Dare game?" },
//     { text: "What’s one thing you would never admit to your parents?" }
//   ];
  

//   const dares = [
//     { text: "Text your crush 'I have something to confess... but not now.'" },
//     { text: "Do your best impression of another player for the next two rounds." },
//     { text: "Call a random contact and say 'I can’t talk right now' then hang up." },
//     { text: "Speak in an accent of your choice for the next three turns." },
//     { text: "Swap shirts with the player to your left." },
//     { text: "Send a voice note saying 'I need help, I'm stuck in a bathtub!'" },
//     { text: "Read out your last text message in a dramatic voice." },
//     { text: "Pretend to be a waiter and take everyone's 'drink order'." },
//     { text: "Try to touch your nose with your tongue. Keep trying for 30 seconds." },
//     { text: "Sing a song chosen by the group in the most emotional way possible." },
//     { text: "Do 10 squats while making intense eye contact with someone." },
//     { text: "Let another player post something random on your social media." },
//     { text: "Speak only in questions for the next three turns." },
//     { text: "Give a foot massage to the person on your right." },
//     { text: "Do your best dance move for 30 seconds." },
//     { text: "Take a selfie with the weirdest pose possible and post it." },
//     { text: "Eat a spoonful of a condiment chosen by the group." },
//     { text: "Put ice cubes in your shirt and leave them there for a minute." },
//     { text: "Try to juggle 3 random objects." },
//     { text: "Talk like a robot for the next two turns." },
//     { text: "Go outside and yell 'I love tacos!' as loud as you can." },
//     { text: "Let the group draw on your face with a marker." },
//     { text: "Act like a monkey for the next two rounds." },
//     { text: "Attempt to moonwalk across the room." },
//     { text: "Do your best runway model walk across the room." },
//     { text: "Speak in a whisper for the next three turns." },
//     { text: "Put on a blindfold and let the group feed you something." },
//     { text: "Let someone style your hair in the weirdest way possible." },
//     { text: "Take a sip of a drink mixed by the group (non-toxic, of course)." },
//     { text: "Dance with an imaginary partner for one minute." },
//     { text: "Act out a dramatic breakup scene with the person next to you." },
//     { text: "Let someone redo your profile picture with their choice." },
//     { text: "Wear socks on your hands for the next three turns." },
//     { text: "Send a flirty text to the 7th person in your contact list." },
//     { text: "Do your best impression of a famous celebrity." },
//     { text: "Try to lick your elbow for 30 seconds straight." },
//     { text: "Balance a random object on your head for one minute." },
//     { text: "Do your best belly dance for 20 seconds." },
//     { text: "Let the person to your right rename one of your contacts." }
//   ];
  

// export async function POST() {
//   try {
//     // Insert Truths and Dares into their respective tables
//     // @ts-ignore
//     await prisma.truth.createMany({ data: truths });
//     // @ts-ignore
//     await prisma.dare.createMany({ data: dares });

//     return NextResponse.json({ success: true, message: "Truths and Dares added successfully!" });
//   } catch (error) {
//     console.error("Error adding truths and dares:", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// }


import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const choice = searchParams.get("choice");

    // Validate input (must be "truth" or "dare")
    if (!choice || (choice !== "truth" && choice !== "dare")) {
      return NextResponse.json({ error: "Invalid choice" }, { status: 400 });
    }

    // Count total available truths/dares
    //@ts-ignore
    const totalCount = await prisma[choice].count();
    if (totalCount === 0) {
      return NextResponse.json({ error: `No ${choice}s available` }, { status: 404 });
    }

    // Pick a random entry
    const randomIndex = Math.floor(Math.random() * totalCount);
    //@ts-ignore
    const randomItem = await prisma[choice].findMany({
      take: 1,
      skip: randomIndex,
    });

    return NextResponse.json({
      success: true,
      type: choice,
      text: randomItem[0]?.text || `No ${choice}s available`,
    });
  } catch (error) {
    console.error("❌ Error fetching Truth/Dare:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

