"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { goals } from "@/lib/data";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Horizon() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15% 0px" });

  // Scroll-driven focus rack
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const fgBlur = useTransform(scrollYProgress, [0.3, 0.7], [0, 3]);
  const fgOpacity = useTransform(scrollYProgress, [0.3, 0.7], [1, 0.3]);
  const bgBlur = useTransform(scrollYProgress, [0.3, 0.7], [1.5, 0]);
  const bgOpacity = useTransform(scrollYProgress, [0.3, 0.7], [0.3, 1]);

  return (
    <section
      id="horizon"
      ref={sectionRef}
      className="relative min-h-[140vh] flex flex-col items-center justify-center px-8 py-32 overflow-hidden"
      style={{ backgroundColor: "var(--color-night)" }}
    >
      {/* Warmest golden light — peak of the journey */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 75% 40%, rgba(196, 164, 108, 0.10) 0%, rgba(196, 164, 108, 0.03) 40%, transparent 70%)",
        }}
      />

      {/* Reflective paragraph */}
      <ScrollReveal className="max-w-[680px] text-center mb-20">
        <p className="type-editorial text-lg md:text-xl leading-[2.2] text-cream-faded">
          I want to build tools that feel invisible — technology that fades into
          the background and lets humans do what they do best. The intersection
          of AI and human creativity is where I want to live.
        </p>
      </ScrollReveal>

      {/* Depth composition — three layers */}
      <div className="relative w-full max-w-[900px] min-h-[300px] flex flex-col items-center gap-14">
        {/* Foreground — sharp, bright */}
        <motion.div
          className="flex flex-wrap justify-center gap-x-10 gap-y-3"
          style={{
            filter: useTransform(fgBlur, (v) => `blur(${v}px)`),
            opacity: fgOpacity,
          }}
        >
          {goals.foreground.map((goal, i) => (
            <motion.span
              key={goal}
              className="font-serif text-lg md:text-2xl text-cream tracking-tight"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.6,
                ease: [0.33, 1, 0.68, 1],
                delay: 0.2 + i * 0.1,
              }}
            >
              {goal}
            </motion.span>
          ))}
        </motion.div>

        {/* Midground — medium */}
        <motion.div
          className="flex flex-wrap justify-center gap-x-8 gap-y-3"
          style={{ opacity: useTransform(scrollYProgress, [0.3, 0.7], [0.6, 0.7]) }}
        >
          {goals.midground.map((goal, i) => (
            <motion.span
              key={goal}
              className="font-serif text-base md:text-lg text-cream-faded tracking-tight"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 0.6, y: 0 } : undefined}
              transition={{
                duration: 0.6,
                ease: [0.33, 1, 0.68, 1],
                delay: 0.5 + i * 0.1,
              }}
            >
              {goal}
            </motion.span>
          ))}
        </motion.div>

        {/* Background — initially blurred, sharpens on scroll */}
        <motion.div
          className="flex flex-wrap justify-center gap-x-6 gap-y-3"
          style={{
            filter: useTransform(bgBlur, (v) => `blur(${v}px)`),
            opacity: bgOpacity,
          }}
        >
          {goals.background.map((goal, i) => (
            <motion.span
              key={goal}
              className="font-serif text-sm md:text-base text-cream-ghost tracking-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 0.3, y: 0 } : undefined}
              transition={{
                duration: 0.6,
                ease: [0.33, 1, 0.68, 1],
                delay: 0.8 + i * 0.1,
              }}
            >
              {goal}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
