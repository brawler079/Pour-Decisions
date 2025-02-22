export default function RoundSelector({ rounds, setRounds }: { rounds: number; setRounds: (value: number) => void }) {
    return (
      <div className="flex items-center space-x-4">
        <label htmlFor="rounds" className="text-[#00FF41]">
          Rounds:
        </label>
        <input
          type="range"
          id="rounds"
          min="5"
          max="20"
          value={rounds}
          onChange={(e) => setRounds(Number.parseInt(e.target.value))}
          className="w-full h-2 bg-[#1A1A1A] rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #00FF41 0%, #00FF41 ${((rounds - 5) / 15) * 100}%, #1A1A1A ${
              ((rounds - 5) / 15) * 100
            }%, #1A1A1A 100%)`,
          }}
        />
        <span className="text-[#FF007F] font-bold">{rounds}</span>
      </div>
    );
  }
  