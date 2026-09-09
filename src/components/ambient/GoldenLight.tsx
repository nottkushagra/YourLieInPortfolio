"use client";

import { useEffect, useRef, useState } from "react";

export default function GoldenLight() {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(window.scrollY / docHeight);
      }
    };

    const onMouse = (e: MouseEvent) => {
      // Subtle ±3% shift toward cursor
      const nx = ((e.clientX / window.innerWidth) - 0.5) * 6;
      const ny = ((e.clientY / window.innerHeight) - 0.5) * 6;
      setMouseOffset({ x: nx, y: ny });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  // Map scroll progress to light intensity and position
  // Beat 1 (0): 0 opacity
  // Beat 2 (0.1): 5%
  // Beat 4 (0.4): 6%
  // Beat 6 (0.75): 10% — warmest
  // Beat 7 (0.9+): fades to 0
  let opacity = 0;
  if (scrollProgress < 0.05) {
    opacity = scrollProgress * 100 * 0.05; // 0 -> 5% over first 5% of scroll
  } else if (scrollProgress < 0.75) {
    opacity = 0.05 + (scrollProgress - 0.05) * 0.071; // 5% -> 10%
  } else {
    opacity = 0.10 * (1 - (scrollProgress - 0.75) / 0.25); // 10% -> 0
  }
  opacity = Math.max(0, Math.min(0.12, opacity));

  const posX = 80 + mouseOffset.x - scrollProgress * 5;
  const posY = 30 + mouseOffset.y + scrollProgress * 10;

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{
        background: `radial-gradient(ellipse at ${posX}% ${posY}%, rgba(196, 164, 108, ${opacity}) 0%, rgba(196, 164, 108, ${opacity * 0.3}) 40%, transparent 70%)`,
        transition: "background 0.3s ease-out",
      }}
      aria-hidden="true"
    />
  );
}
