"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SECTIONS } from "@/lib/constants";
import { useScrollSpy } from "@/hooks/useScrollSpy";

interface FloatingNavProps {
  visible: boolean;
}

export default function FloatingNav({ visible }: FloatingNavProps) {
  const [expanded, setExpanded] = useState(false);
  const sectionIds = SECTIONS.map((s) => s.id);
  const activeId = useScrollSpy(sectionIds);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setExpanded(false);
    }
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Desktop: floating pill navigation — bottom center */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] hidden md:flex items-center gap-1 px-2 py-2 rounded-full glass"
      >
        {SECTIONS.map((section) => {
          const isActive = activeId === section.id;
          return (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className={`relative px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                isActive
                  ? "text-[#1a1a2e]"
                  : "text-[#4a4a6a] hover:text-[#1a1a2e]"
              }`}
              aria-label={`Navigate to ${section.label}`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 bg-gradient-to-r from-[#FFB7D5]/30 to-[#C4B5FD]/30 rounded-full border border-[#FFB7D5]/20"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{section.label}</span>
            </button>
          );
        })}
      </motion.nav>

      {/* Mobile: floating button + expandable menu */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 25 }}
        className="fixed bottom-6 right-6 z-[90] md:hidden"
      >
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-12 h-12 rounded-full glass flex items-center justify-center shadow-lg shadow-[#FFB7D5]/15"
          aria-label={expanded ? "Close navigation" : "Open navigation"}
        >
          <motion.div
            animate={{ rotate: expanded ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <line x1="4" y1="10" x2="16" y2="10" stroke="#1a1a2e" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="10" y1="4" x2="10" y2="16" stroke="#1a1a2e" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.div>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-16 right-0 w-56 glass rounded-2xl p-3 shadow-xl"
            >
              {SECTIONS.map((section) => {
                const isActive = activeId === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollTo(section.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-[#FFB7D5]/15 text-[#1a1a2e] font-medium"
                        : "text-[#4a4a6a] hover:bg-[#FFB7D5]/10 hover:text-[#1a1a2e]"
                    }`}
                  >
                    {section.label}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
