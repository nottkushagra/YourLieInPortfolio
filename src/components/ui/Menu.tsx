"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BEATS } from "@/lib/constants";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToBeat = useCallback((id: string) => {
    setIsOpen(false);
    // Slight delay for overlay exit animation
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 400);
  }, []);

  return (
    <>
      {/* Trigger — top right */}
      <motion.button
        className="fixed top-8 right-8 z-[200] flex items-center gap-2 group cursor-pointer"
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        data-cursor="interactive"
        aria-label="Open menu"
      >
        <span className="block w-5 h-px bg-cream/30 group-hover:bg-cream/60 transition-colors duration-300" />
        <motion.span
          className="type-mono text-[11px] text-cream-ghost overflow-hidden"
          initial={{ width: 0, opacity: 0 }}
          whileHover={{ width: "auto", opacity: 0.5 }}
          transition={{ duration: 0.3 }}
        >
          Menu
        </motion.span>
      </motion.button>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[300] flex items-center justify-center cursor-pointer"
            style={{ backgroundColor: "rgba(8, 10, 14, 0.95)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={() => setIsOpen(false)}
          >
            {/* Backdrop blur */}
            <div className="absolute inset-0 backdrop-blur-sm" />

            <nav
              className="relative z-10 flex flex-col items-center gap-8 md:gap-10"
              onClick={(e) => e.stopPropagation()}
            >
              {BEATS.map((beat, i) => (
                <motion.button
                  key={beat.id}
                  className="block font-serif text-2xl md:text-4xl text-cream/70 hover:text-cream transition-colors duration-300 cursor-pointer group relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.33, 1, 0.68, 1],
                    delay: 0.2 + i * 0.05,
                  }}
                  onClick={() => scrollToBeat(beat.id)}
                  data-cursor="interactive"
                >
                  {/* Golden line on hover */}
                  <motion.span
                    className="absolute left-[-24px] top-1/2 -translate-y-1/2 w-3 h-px bg-golden/50 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="group-hover:translate-x-3 transition-transform duration-300 inline-block">
                    {beat.label}
                  </span>
                </motion.button>
              ))}
            </nav>

            {/* Close hint */}
            <motion.span
              className="absolute bottom-8 type-mono text-[10px] text-cream-ghost/30 tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              esc to close
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
