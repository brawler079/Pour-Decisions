import { Suspense } from "react";
import GamePageWrapper from "./GamePageWrapper";

export default function GamePageContainer() {
  return (
    <Suspense fallback={<p className="text-lg text-[#FF007F] animate-pulse">Loading...</p>}>
      <GamePageWrapper />
    </Suspense>
  );
}
