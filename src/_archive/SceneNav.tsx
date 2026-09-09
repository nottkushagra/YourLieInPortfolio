"use client";

import { motion } from "framer-motion";
import { SCENES } from "@/lib/constants";

interface SceneNavProps {
  currentScene: number;
  onNavigate: (index: number) => void;
}

export default function SceneNav({ currentScene, onNavigate }: SceneNavProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 1.5, ease: [0.33, 1, 0.68, 1] }}
      className="fixed right-5 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-5"
    >
      {SCENES.map((scene, index) => (
        <button
          key={scene.id}
          onClick={() => onNavigate(index)}
          className="group relative flex items-center justify-center py-0.5"
          aria-label={`Navigate to ${scene.label}`}
        >
          {/* Label tooltip on hover */}
          <motion.span
            initial={false}
            animate={{
              opacity: currentScene === index ? 0.6 : 0,
              x: currentScene === index ? 0 : 8,
            }}
            className="absolute right-9 whitespace-nowrap text-[9px] uppercase tracking-[0.25em]
              text-text-muted group-hover:!opacity-80 group-hover:!x-0
              transition-all duration-300 font-medium pointer-events-none"
          >
            {scene.label}
          </motion.span>

          {/* Dot container */}
          <div className="relative w-4 h-4 flex items-center justify-center">
            {/* Active ring — animated */}
            {currentScene === index && (
              <motion.div
                layoutId="scene-ring"
                className="absolute w-4 h-4 rounded-full border border-accent/50"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}

            {/* Inner dot */}
            <motion.div
              className="rounded-full transition-all duration-300"
              animate={{
                width: currentScene === index ? 6 : 4,
                height: currentScene === index ? 6 : 4,
                backgroundColor: currentScene === index ? "var(--color-accent)" : "var(--color-text-muted)",
                opacity: currentScene === index ? 1 : 0.25,
              }}
              whileHover={{
                opacity: 0.8,
                scale: 1.3,
                backgroundColor: "var(--color-accent-muted)",
              }}
              transition={{ duration: 0.25 }}
            />
          </div>
        </button>
      ))}

      {/* Progress track */}
      <div className="absolute left-1/2 -translate-x-1/2 top-2 w-px h-[calc(100%-16px)] bg-sand/20 -z-10">
        <motion.div
          className="w-full bg-accent-muted/40 origin-top"
          animate={{ scaleY: (currentScene + 1) / SCENES.length }}
          transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
          style={{ height: "100%" }}
        />
      </div>
    </motion.nav>
  );
}
