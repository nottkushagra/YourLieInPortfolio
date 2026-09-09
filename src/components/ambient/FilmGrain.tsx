"use client";

import { useEffect, useRef } from "react";

export default function FilmGrain() {
  const frameRef = useRef(0);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Animate at ~3fps for cinematic grain stutter
    let lastTime = 0;
    const interval = 333; // ~3fps

    const animate = (time: number) => {
      if (time - lastTime >= interval) {
        if (canvasRef.current) {
          // Shift the noise texture position slightly for grain animation
          const tx = Math.random() * -10;
          const ty = Math.random() * -10;
          canvasRef.current.style.transform = `translate(${tx}px, ${ty}px)`;
        }
        lastTime = time;
      }
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div
      ref={canvasRef}
      className="fixed inset-[-10px] pointer-events-none z-[9999]"
      style={{
        opacity: 0.025,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        mixBlendMode: "overlay",
      }}
      aria-hidden="true"
    />
  );
}
