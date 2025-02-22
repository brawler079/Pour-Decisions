import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST() {
    try {
        const questions = [
            {
                text: "Which of these is the worst hangover cure?",
                options: ["More alcohol", "A cold shower", "Eating raw onions"],
                answer: "Raw onions? Who hurt you?",
            },
            {
                text: "What’s the worst possible name for a pet?",
                options: ["Tax Evasion", "Moist", "Grandma"],
                answer: "Moist. Just... no.",
            },
            {
                text: "Which of these drinks should never exist?",
                options: ["Garlic vodka", "Mayonnaise beer", "Broccoli tequila"],
                answer: "Mayonnaise beer. Absolutely not.",
            },
            {
                text: "What's the most cursed thing you could say before taking a shot?",
                options: ["See you in the hospital!", "This one's for my ex!", "I don't have a liver anyway!"],
                answer: "All of the above are red flags.",
            },
            {
                text: "What’s the worst possible last text before passing out?",
                options: ["I have a great idea!", "Trust me, I got this!", "Meet me at the airport."],
                answer: "Trust me, I got this.",
            },
            {
                text: "If you had a theme song that played every time you walked into a bar, what would it be?",
                options: ["The Titanic flute fail", "Mission Impossible", "Circus music"],
                answer: "Titanic flute fail is a vibe.",
            },
            {
                text: "What’s the worst thing to say to your bartender?",
                options: ["Surprise me!", "Make it strong.", "I don’t have money, but I have personality."],
                answer: "Surprise me is always dangerous.",
            },
            {
                text: "If drunk you had a catchphrase, what would it be?",
                options: ["Let’s get matching tattoos!", "You guys are my best friends!", "I can totally do a backflip."],
                answer: "Backflip ends in disaster 99% of the time.",
            },
            {
                text: "Which of these should NOT be an Olympic sport?",
                options: ["Drunk texting", "Speed napping", "Finding your phone while drunk"],
                answer: "Finding your phone while drunk is impossible.",
            },
            {
                text: "What’s the worst way to answer ‘How drunk are you?’",
                options: ["I’m fine.", "Define drunk.", "Who are you?"],
                answer: "Who are you?",
            },
            {
                text: "What’s the worst thing to wake up next to?",
                options: ["A parking ticket", "A half-eaten pizza slice stuck to your face", "An unknown pet"],
                answer: "An unknown pet. Where did it come from?",
            },
            {
                text: "What’s the worst thing to say in a job interview?",
                options: ["Do you drug test?", "I have a warrant, is that a problem?", "I can start after I recover from this hangover."],
                answer: "All of the above.",
            },
            {
                text: "If you were a drink, what would you be?",
                options: ["A flaming shot", "A lukewarm beer", "A spilled margarita"],
                answer: "A spilled margarita. Messy but fun.",
            },
            {
                text: "What’s the worst time to start taking shots?",
                options: ["Before a family dinner", "Before a wedding speech", "Before an exam"],
                answer: "Before an exam. Please don't.",
            },
            {
                text: "If you could erase one thing from existence, what would it be?",
                options: ["Hangovers", "Exes", "Crocs"],
                answer: "Hangovers. World peace achieved.",
            },
            {
                text: "What’s the worst thing to hear from your Uber driver?",
                options: ["'You look different from your picture.'", "'I have no idea where we are going.'", "'Wanna see something cool?'"],
                answer: "'Wanna see something cool?' Run.",
            },
            {
                text: "Which of these places is the worst to pass out in?",
                options: ["A zoo", "An amusement park", "A public restroom"],
                answer: "Public restroom. No explanation needed.",
            },
            {
                text: "What’s the worst thing to do drunk?",
                options: ["Online shopping", "Changing your hairstyle", "Calling your ex’s mom"],
                answer: "Calling your ex’s mom is next-level bad.",
            },
            {
                text: "If drunk decisions had a logo, what would it be?",
                options: ["A spilled beer", "A confused raccoon", "A 404 error message"],
                answer: "A confused raccoon. Fits perfectly.",
            },
            {
                text: "What’s the most dangerous phrase to say on a night out?",
                options: ["'One more shot!'", "'We won’t be out too late!'", "'Trust me, I know a shortcut!'"],
                answer: "‘One more shot!’ is the beginning of the end.",
            },
            {
                text: "What’s the worst excuse for being late to work?",
                options: ["'Traffic was bad.'", "'I got lost in my own house.'", "'I woke up in another state.'"],
                answer: "Third one is impressive, honestly.",
            },
            {
                text: "What’s the worst bar pickup line?",
                options: ["'Are you a magician? Because every time I look at you, everyone else disappears.'", "'Are you a parking ticket? Because you got fine written all over you.'", "'Do you believe in love at first sip?'"],
                answer: "All should be illegal.",
            },
            {
                text: "Which of these jobs should you never do drunk?",
                options: ["Surgeon", "Airplane pilot", "Fire dancer"],
                answer: "Fire dancer would be a disaster.",
            },
            {
                text: "What’s the worst possible tattoo to get while drunk?",
                options: ["Your own name", "A barcode", "Your last text message"],
                answer: "Your last text message. Risky business.",
            },
            {
                text: "Which of these is the worst way to find out you’re still drunk?",
                options: ["You wake up in a stranger’s house", "You check your bank account", "You’re still wearing the same clothes from last night"],
                answer: "Checking your bank account = horror movie.",
            },
            {
                text: "What’s the worst response to 'I love you'?",
                options: ["'Thanks!'", "'Who doesn’t?'", "'I think of you like a sibling.'"],
                answer: "Sibling zone is fatal.",
            },
            {
                text: "If drunk texts were a currency, what would be the exchange rate?",
                options: ["1 tequila shot = 5 bad texts", "1 beer = 3 questionable texts", "1 glass of wine = a poetic essay"],
                answer: "All of these are accurate.",
            },
            {
                text: "Which of these is the ultimate drunk flex?",
                options: ["Walking in a straight line", "Finding your way home", "Winning an argument"],
                answer: "Winning an argument never happens.",
            },
            {
                text: "What’s the worst thing to hear from a bartender?",
                options: ["'You’ve had enough.'", "'We only have light beer left.'", "'Why are you crying?'"],
                answer: "If you’re crying, it’s time to go home.",
            },
            {
                text: "Which of these is a guaranteed bad idea?",
                options: ["Mixing every type of alcohol", "Drunk karaoke", "Texting your boss"],
                answer: "Texting your boss is a career-ending move.",
            },
            {
                text: "What’s the most cursed drunk purchase?",
                options: ["A pet snake", "A unicycle", "An entire cow"],
                answer: "An entire cow. Why?",
            },
            {
                text: "What’s the worst part of a hangover?",
                options: ["The headache", "The regret", "The texts you sent"],
                answer: "The texts. No way to undo them.",
            },
            {
                text: "If you could live in any fictional world, where would it be?",
                options: ["Hogwarts", "Middle-earth", "Westeros"],
                answer: "Depends on your favorite fictional universe!",
            },
            {
                text: "What's the most ridiculous pick-up line you've ever used?",
                options: ["Do you have a Band-Aid? Because I just scraped my knee falling for you.", "Are you a magician? Because whenever I look at you, everyone else disappears!", "Do you have a library card? Because I am checking you out."],
                answer: "Pick-up lines can be hilariously bad!",
            },
            {
                text: "If you could bring any fictional villain to life for a day, who would it be?",
                options: ["The Joker", "Darth Vader", "Loki"],
                answer: "Chaos guaranteed!",
            },
        ];

        // Insert questions into database
        await prisma.question.createMany({
            data: questions.map((q) => ({
                text: q.text,
                options: q.options,
                answer: q.answer,
            })),
            skipDuplicates: true, // Avoid duplicate entries
        });

        return NextResponse.json({ success: true, message: "Questions added successfully!" });
    } catch (error) {
        console.error("Error adding questions:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
