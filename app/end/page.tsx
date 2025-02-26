"use client";

export default function EndPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0D0D0D] text-white p-6 text-center">
      <h1 className="text-6xl font-extrabold text-[#FF007F] glitch-effect">
        YOU JUST WASTED YOUR TIME! 🤡
      </h1>
      <p className="text-xl mt-4 text-[#00FF41]">
        Hope it was worth it. Now go rethink your life choices. 🚮
      </p>
      <button
        onClick={() => window.location.href = "/"}
        className="mt-8 px-6 py-3 text-lg font-bold rounded-md transition duration-300
                   bg-[#FF007F] text-black hover:bg-[#00FF41] hover:text-[#0D0D0D]
                   animate-pulse shadow-lg transform hover:scale-110"
      >
        Go Regret Everything 🔄
      </button>
    </div>
  );
}
