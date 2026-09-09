"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface MusicVisualizerProps {
  visible: boolean;
}

export default function MusicVisualizer({ visible }: MusicVisualizerProps) {
  const [isActive, setIsActive] = useState(true);
  const barsRef = useRef<number[]>(Array.from({ length: 5 }, () => Math.random()));
  const [bars, setBars] = useState(barsRef.current);

  useEffect(() => {
    if (!isActive || !visible) return;

    const interval = setInterval(() => {
      barsRef.current = barsRef.current.map(() => 0.2 + Math.random() * 0.8);
      setBars([...barsRef.current]);
    }, 300);

    return () => clearInterval(interval);
  }, [isActive, visible]);

  if (!visible) return null;

  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      onClick={() => setIsActive(!isActive)}
      className="fixed top-6 right-6 z-[80] flex items-end gap-[3px] h-5 px-3 py-2 rounded-full glass-subtle cursor-pointer group"
      aria-label={isActive ? "Pause visualizer" : "Play visualizer"}
      title={isActive ? "♪ Playing" : "♪ Paused"}
    >
      {bars.map((height, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-gradient-to-t from-[#FFB7D5] to-[#C4B5FD] group-hover:from-[#E8879E] group-hover:to-[#A78BFA] transition-colors"
          animate={{
            height: isActive ? `${height * 16}px` : "4px",
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
        />
      ))}
    </motion.button>
  );
}
