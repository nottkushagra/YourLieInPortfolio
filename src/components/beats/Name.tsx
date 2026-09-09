"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const nameChars = "Kushagra".split("");

export default function Name() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px" });

  return (
    <section
      id="name"
      ref={ref}
      className="relative min-h-screen flex items-center px-8 md:px-16 lg:px-24 overflow-hidden"
      style={{ backgroundColor: "var(--color-night)" }}
    >
      {/* Golden light gradient — right side */}
      <div
        className="absolute top-0 right-0 w-[60%] h-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 35%, rgba(196, 164, 108, 0.06) 0%, transparent 65%)",
        }}
      />

      {/* Content — left aligned */}
      <div className="relative z-10 max-w-4xl">
        {/* The name — character by character */}
        <h1 className="type-hero" aria-label="Kushagra">
          {nameChars.map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : undefined
              }
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1 + i * 0.05,
              }}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        {/* The line — personal, not a job title */}
        <motion.p
          className="mt-6 md:mt-8 type-editorial text-xl md:text-2xl"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 0.7, y: 0 } : undefined}
          transition={{
            duration: 0.8,
            ease: [0.33, 1, 0.68, 1],
            delay: 0.8,
          }}
        >
          The spring I found code
        </motion.p>

        {/* Decorative editorial line */}
        <motion.div
          className="mt-10 h-px bg-gradient-to-r from-golden/30 to-transparent"
          initial={{ width: 0 }}
          animate={isInView ? { width: 80 } : undefined}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
            delay: 1.2,
          }}
        />
      </div>
    </section>
  );
}
