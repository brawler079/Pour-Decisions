export default function StartButton({ onClick, disabled }: { onClick: () => void; disabled: boolean }) {
  const handleClick = () => {
    if (disabled) {
      alert("Add at least one player before starting!"); // Prevents confusion
      return;
    }
    onClick(); // Start game
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full py-3 text-xl font-bold rounded-md transition-all duration-200 ${
        disabled
          ? "bg-gray-600 text-gray-400"
          : "bg-[#00FF41] text-[#0D0D0D] hover:bg-[#FF007F] hover:text-white animate-pulse"
      }`}
      style={{
        boxShadow: disabled ? "none" : "0 0 10px #00FF41, 0 0 20px #00FF41, 0 0 30px #00FF41, 0 0 40px #00FF41",
      }}
    >
      START GAME
    </button>
  );
}
