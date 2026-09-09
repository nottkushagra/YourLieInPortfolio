"use client";

import React, { useEffect, useState } from "react";

export default function CherryPetals() {
  const [petals, setPetals] = useState<
    Array<{
      id: number;
      left: number;
      width: number;
      height: number;
      duration: number;
      delay: number;
      opacity: number;
    }>
  >([]);

  useEffect(() => {
    // Generate gentle petals
    const count = 18;
    const items = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      width: Math.random() * 8 + 8,
      height: Math.random() * 10 + 10,
      duration: Math.random() * 8 + 9,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.4 + 0.35,
    }));
    setPetals(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map((p) => (
        <div
          key={p.id}
          className="cherry-petal"
          style={{
            left: `${p.left}%`,
            width: `${p.width}px`,
            height: `${p.height}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}
