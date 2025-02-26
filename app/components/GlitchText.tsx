"use client";

import { useState, useEffect, ReactNode } from "react";

interface GlitchTextProps {
  children: ReactNode;
  className?: string;
}

export default function GlitchText({ children, className = "" }: GlitchTextProps) {
  const text = typeof children === "string" ? children : String(children);
  const [glitchText, setGlitchText] = useState<string>(text);

  useEffect(() => {
    if (typeof children !== "string") return; // Ensure it's a string before glitch effect
  
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        setGlitchText(
          text
            .split("")
            .map((char) => (Math.random() < 0.5 ? String.fromCharCode(Math.floor(Math.random() * 26) + 65) : char))
            .join("")
        );
        setTimeout(() => setGlitchText(text), 100);
      }
    }, 100);
  
    return () => clearInterval(glitchInterval);
  }, [children, text]); // ✅ Added 'children' to dependency array
  

  return (
    <span
      className={`relative inline-block ${className}`}
      style={{
        textShadow:
          "0.05em 0 0 rgba(255,0,0,0.75), -0.025em -0.05em 0 rgba(0,255,0,0.75), 0.025em 0.05em 0 rgba(0,0,255,0.75)",
        animation: "glitch 500ms infinite",
      }}
    >
      {glitchText}
      <span
        className="absolute top-0 left-0"
        style={{
          clipPath: "rect(0, 900px, 0, 0)",
          animation: "noise-anim 2s infinite linear alternate-reverse",
        }}
      >
        {glitchText}
      </span>
      <span
        className="absolute top-0 left-0"
        style={{
          clipPath: "rect(0, 900px, 0, 0)",
          animation: "noise-anim-2 3s infinite linear alternate-reverse",
        }}
      >
        {glitchText}
      </span>
    </span>
  );
}
