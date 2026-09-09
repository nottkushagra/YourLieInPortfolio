"use client";

import { motion } from "framer-motion";

export default function Threshold() {
  return (
    <section
      id="threshold"
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--color-void)" }}
    >
      {/* The line */}
      <motion.div
        className="h-px bg-cream/50"
        initial={{ width: 0 }}
        animate={{ width: 80 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.5 }}
      />

      {/* Title */}
      <motion.h1
        className="mt-8 font-serif text-2xl md:text-3xl tracking-tight text-cream/70"
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 2.5 }}
      >
        Your Lie in Portfolio
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="mt-3 type-editorial text-sm text-cream-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 3.5 }}
      >
        a memoir in code
      </motion.p>

      {/* Scroll hint */}
      <motion.span
        className="absolute bottom-12 type-mono text-cream-ghost text-[11px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      >
        scroll
      </motion.span>

      {/* Single drifting petal — CSS only, separate from R3F system */}
      <motion.div
        className="absolute w-2 h-2 rounded-full opacity-10"
        style={{ backgroundColor: "var(--color-sakura)" }}
        initial={{ top: "10%", right: "15%", rotate: 0 }}
        animate={{
          top: "85%",
          right: "65%",
          rotate: 180,
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      />
    </section>
  );
}
