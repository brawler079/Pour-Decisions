interface TruthOrDareProps {
    truthOrDare: {
      truth: string;
      dare: string;
    };
    onComplete: () => void;
  }
  
  export default function TruthOrDare({ truthOrDare, onComplete }: TruthOrDareProps) {
    return (
      <div className="bg-[#1A1A1A] p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold">You got it wrong! Choose:</h2>
        <div className="mt-4 space-y-2">
          <button
            onClick={() => {
              alert(truthOrDare.truth);
              onComplete();
            }}
            className="block w-full py-2 px-4 bg-[#00FF41] text-black rounded-md hover:bg-[#FF007F] transition"
          >
            Truth
          </button>
          <button
            onClick={() => {
              alert(truthOrDare.dare);
              onComplete();
            }}
            className="block w-full py-2 px-4 bg-[#FF007F] text-black rounded-md hover:bg-[#00FF41] transition"
          >
            Dare
          </button>
        </div>
      </div>
    );
  }
  