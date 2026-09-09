"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OpeningExperienceProps {
  onEnter: () => void;
}

export default function OpeningExperience({ onEnter }: OpeningExperienceProps) {
  const [phase, setPhase] = useState<"waiting" | "transitioning" | "done">("waiting");

  const handleClick = useCallback(() => {
    if (phase !== "waiting") return;
    setPhase("transitioning");
    setTimeout(() => {
      setPhase("done");
      onEnter();
    }, 2000);
  }, [phase, onEnter]);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      {(phase === "waiting" || phase === "transitioning") && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center cursor-pointer"
          onClick={handleClick}
          role="button"
          tabIndex={0}
          aria-label="Enter the experience"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleClick();
          }}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFF0F5] via-[#FFF8F3] to-[#F3E8FF]" />

          {/* Soft watercolor blobs */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={phase === "transitioning" ? { opacity: 0, scale: 1.2 } : {}}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute top-[15%] left-[20%] w-[400px] h-[400px] rounded-full bg-[#FFB7D5]/20 blur-[100px]" />
            <div className="absolute top-[40%] right-[15%] w-[350px] h-[350px] rounded-full bg-[#C4B5FD]/15 blur-[90px]" />
            <div className="absolute bottom-[20%] left-[40%] w-[300px] h-[300px] rounded-full bg-[#93C5FD]/12 blur-[80px]" />
          </motion.div>

          {/* Headphones SVG */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            animate={
              phase === "transitioning"
                ? { scale: 1.5, opacity: 0, y: -60, rotateY: 180 }
                : {}
            }
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* 3D-ish Headphones using SVG */}
            <motion.div
              className="relative"
              animate={
                phase === "waiting"
                  ? {
                      y: [0, -12, 0],
                      rotateZ: [0, 2, -2, 0],
                    }
                  : {}
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg
                width="140"
                height="140"
                viewBox="0 0 140 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-2xl"
              >
                {/* Headband */}
                <path
                  d="M30 75 C30 35, 110 35, 110 75"
                  stroke="url(#headband-grad)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Left ear cup */}
                <rect
                  x="18"
                  y="68"
                  width="28"
                  height="40"
                  rx="10"
                  fill="url(#cup-grad)"
                  stroke="#FFB7D5"
                  strokeWidth="1.5"
                />
                <rect
                  x="23"
                  y="73"
                  width="18"
                  height="30"
                  rx="7"
                  fill="#FFF0F5"
                  opacity="0.6"
                />
                {/* Right ear cup */}
                <rect
                  x="94"
                  y="68"
                  width="28"
                  height="40"
                  rx="10"
                  fill="url(#cup-grad)"
                  stroke="#FFB7D5"
                  strokeWidth="1.5"
                />
                <rect
                  x="99"
                  y="73"
                  width="18"
                  height="30"
                  rx="7"
                  fill="#FFF0F5"
                  opacity="0.6"
                />
                {/* Cushion details */}
                <ellipse cx="32" cy="88" rx="6" ry="10" fill="#FFD6E8" opacity="0.3" />
                <ellipse cx="108" cy="88" rx="6" ry="10" fill="#FFD6E8" opacity="0.3" />
                {/* Gradients */}
                <defs>
                  <linearGradient id="headband-grad" x1="30" y1="35" x2="110" y2="35">
                    <stop offset="0%" stopColor="#FFB7D5" />
                    <stop offset="50%" stopColor="#C4B5FD" />
                    <stop offset="100%" stopColor="#FFB7D5" />
                  </linearGradient>
                  <linearGradient id="cup-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#FFD6E8" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Glow behind headphones */}
              <div className="absolute inset-0 -z-10 bg-[#FFB7D5]/20 rounded-full blur-[40px] scale-150" />
            </motion.div>

            {/* Text */}
            <motion.div
              className="mt-10 text-center max-w-sm px-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-serif italic text-xl md:text-2xl text-[#1a1a2e]/80 leading-relaxed">
                Put on your headphones.
              </p>
              <p className="font-serif italic text-lg md:text-xl text-[#4a4a6a]/70 mt-2 leading-relaxed">
                Every story sounds better with music.
              </p>
            </motion.div>

            {/* Click hint */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="px-6 py-3 rounded-full bg-white/70 border border-[#FFB7D5]/30 text-sm font-medium text-[#1a1a2e]/70 backdrop-blur-sm shadow-lg shadow-[#FFB7D5]/10"
              >
                Click anywhere to begin
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Floating petals in opening */}
          {phase === "waiting" && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    left: `${15 + i * 14}%`,
                    top: `${20 + (i % 3) * 25}%`,
                    background: i % 2 === 0 ? "#FFB7D5" : "#C4B5FD",
                    opacity: 0.25,
                  }}
                  animate={{
                    y: [0, -30, 10, -20, 0],
                    x: [0, 15, -10, 5, 0],
                    rotate: [0, 45, -30, 60, 0],
                    scale: [1, 1.2, 0.9, 1.1, 1],
                  }}
                  transition={{
                    duration: 8 + i * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5,
                  }}
                />
              ))}
            </>
          )}

          {/* Transition ripple effect */}
          {phase === "transitioning" && (
            <motion.div
              className="absolute z-20 rounded-full bg-white"
              initial={{ width: 0, height: 0, opacity: 0.8 }}
              animate={{
                width: "300vmax",
                height: "300vmax",
                opacity: 0,
              }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
