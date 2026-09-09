"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useKeySequence } from "@/hooks/useKeySequence";

interface EasterEggsProps {
  onBurst?: (x: number, y: number) => void;
}

// Piano note frequencies (C4 to B4)
const PIANO_NOTES: Record<string, number> = {
  a: 261.63, // C4
  s: 293.66, // D4
  d: 329.63, // E4
  f: 349.23, // F4
  g: 392.0,  // G4
  h: 440.0,  // A4
  j: 493.88, // B4
};

const MELODY_SEQUENCE = ["a", "s", "d", "f", "g", "h", "j"]; // C scale

export default function EasterEggs({ onBurst }: EasterEggsProps) {
  const [showApril, setShowApril] = useState(false);
  const [showMelody, setShowMelody] = useState(false);
  const [melodyProgress, setMelodyProgress] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const melodyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Initialize AudioContext on first interaction
  const getAudioCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    return audioCtxRef.current;
  }, []);

  const playNote = useCallback((freq: number) => {
    try {
      const ctx = getAudioCtx();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime);

      gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 1.5);
    } catch {
      // Audio not available
    }
  }, [getAudioCtx]);

  // /april easter egg
  const handleApril = useCallback(() => {
    setShowApril(true);
    onBurst?.(window.innerWidth / 2, window.innerHeight / 2);

    setTimeout(() => {
      setShowApril(false);
    }, 4000);
  }, [onBurst]);

  useKeySequence(["/", "a", "p", "r", "i", "l"], handleApril);

  // Piano key listener for melody
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      const key = e.key.toLowerCase();
      if (key in PIANO_NOTES) {
        playNote(PIANO_NOTES[key]);

        // Check melody progress
        if (key === MELODY_SEQUENCE[melodyProgress]) {
          const newProgress = melodyProgress + 1;
          setMelodyProgress(newProgress);

          // Reset timer
          if (melodyTimerRef.current) clearTimeout(melodyTimerRef.current);
          melodyTimerRef.current = setTimeout(() => setMelodyProgress(0), 3000);

          if (newProgress === MELODY_SEQUENCE.length) {
            // Melody complete!
            setShowMelody(true);
            setMelodyProgress(0);
            onBurst?.(window.innerWidth / 2, window.innerHeight / 3);
            // Multiple bursts
            setTimeout(() => onBurst?.(window.innerWidth * 0.3, window.innerHeight * 0.5), 200);
            setTimeout(() => onBurst?.(window.innerWidth * 0.7, window.innerHeight * 0.5), 400);
            setTimeout(() => setShowMelody(false), 5000);
          }
        } else {
          setMelodyProgress(0);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (melodyTimerRef.current) clearTimeout(melodyTimerRef.current);
    };
  }, [melodyProgress, playNote, onBurst]);

  // Console easter egg
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ((window as unknown as Record<string, boolean>).__ylip_console) return;
    (window as unknown as Record<string, boolean>).__ylip_console = true;
    console.log(
      '%c🌸 "Even if you can\'t hear me, I\'ll keep playing." — Your Lie in Portfolio',
      "color: #FFB7D5; font-style: italic; font-size: 14px; background: #FFF8F3; padding: 8px 12px; border-radius: 6px;"
    );
    console.log(
      "%c♪ Try typing /april or playing piano keys: A S D F G H J",
      "color: #C4B5FD; font-size: 11px;"
    );
  }, []);

  return (
    <>
      {/* /april overlay */}
      <AnimatePresence>
        {showApril && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
          >
            <div className="absolute inset-0 bg-[#FFF8F3]/90 backdrop-blur-xl" />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="relative z-10 text-center px-6"
            >
              <p className="font-serif italic text-3xl md:text-5xl bg-gradient-to-r from-[#FFB7D5] to-[#C4B5FD] bg-clip-text text-transparent leading-relaxed">
                &ldquo;The spring I met code.&rdquo;
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="mt-4 text-[#8b8ba8] text-sm font-serif italic"
              >
                — Your Lie in Portfolio
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Melody complete overlay */}
      <AnimatePresence>
        {showMelody && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
          >
            <div className="absolute inset-0 bg-[#FFF8F3]/85 backdrop-blur-xl" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative z-10 text-center px-6"
            >
              <motion.p
                className="text-5xl md:text-7xl mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 2 }}
              >
                🌸
              </motion.p>
              <p className="font-serif text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#FFB7D5] via-[#C4B5FD] to-[#93C5FD] bg-clip-text text-transparent">
                ♪ You found the melody ♪
              </p>
              <p className="mt-3 text-[#4a4a6a] text-sm font-serif italic">
                The notes were always there, waiting to be played.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
