"use client";

interface TruthOrDareDisplayProps {
  choice: "truth" | "dare";
  text: string;
  onContinue: () => void;
}

export default function TruthOrDareDisplay({ choice, text, onContinue }: TruthOrDareDisplayProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0D0D0D] text-white p-4">
      <h2 className="text-4xl font-bold mb-4 text-[#00FF41]">{choice === "truth" ? "Truth" : "Dare"} Challenge</h2>
      <p className="text-lg text-center bg-[#1A1A1A] p-4 rounded-md shadow-md">{text}</p>

      <button
        onClick={onContinue}
        className="mt-6 px-6 py-3 bg-[#00FF41] text-black rounded-md hover:bg-[#FF007F] transition cursor-pointer"
      >
        Continue
      </button>
    </div>
  );
}
