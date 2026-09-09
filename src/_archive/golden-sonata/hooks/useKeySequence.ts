"use client";

import { useEffect, useRef, useCallback } from "react";

export function useKeySequence(
  sequence: string[],
  callback: () => void,
  timeout = 2000
) {
  const progress = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetProgress = useCallback(() => {
    progress.current = 0;
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      const expected = sequence[progress.current];
      const pressed = e.key.toLowerCase();

      if (pressed === expected.toLowerCase()) {
        progress.current += 1;

        // Reset inactivity timer
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(resetProgress, timeout);

        // Sequence complete
        if (progress.current === sequence.length) {
          callback();
          resetProgress();
        }
      } else {
        resetProgress();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [sequence, callback, timeout, resetProgress]);
}
