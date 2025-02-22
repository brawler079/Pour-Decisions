interface Question {
  text: string;
  options: string[];
}

interface QuestionCardProps {
  question: Question | null;
  onAnswer: (selectedAnswer: string) => void;
}

export default function QuestionCard({ question, onAnswer }: QuestionCardProps) {
  if (!question) return <p className="text-white text-center">Loading question...</p>;

  return (
    <div className="bg-[#1A1A1A] p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-xl font-bold">{question.text}</h2>
      <div className="mt-4 space-y-2">
        {question.options.map((option: string, index: number) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            className="block w-full py-2 px-4 rounded-md transition duration-200 ease-in-out transform
                       bg-[#00FF41] text-black hover:bg-[#FF007F] hover:text-white 
                       active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#FF007F] 
                       cursor-pointer"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
