"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const titleWords = ["Your", "Lie", "in", "Portfolio"];

export default function Overture() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="overture"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Parallax background layers */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        {/* Soft watercolor blobs */}
        <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full bg-[#FFB7D5]/15 blur-[120px]" />
        <div className="absolute top-[30%] right-[10%] w-[450px] h-[450px] rounded-full bg-[#C4B5FD]/12 blur-[100px]" />
        <div className="absolute bottom-[20%] left-[40%] w-[400px] h-[400px] rounded-full bg-[#93C5FD]/10 blur-[90px]" />
        <div className="absolute top-[60%] left-[10%] w-[300px] h-[300px] rounded-full bg-[#A7F3D0]/8 blur-[80px]" />

        {/* Light rays */}
        <div className="absolute top-0 right-[20%] w-[200px] h-full opacity-30">
          <div
            className="w-full h-full"
            style={{
              background:
                "linear-gradient(165deg, transparent 0%, rgba(255,222,173,0.08) 30%, rgba(255,255,255,0.15) 50%, rgba(255,222,173,0.08) 70%, transparent 100%)",
              animation: "ray-drift 12s ease-in-out infinite",
            }}
          />
        </div>
        <div className="absolute top-0 left-[35%] w-[150px] h-full opacity-20">
          <div
            className="w-full h-full"
            style={{
              background:
                "linear-gradient(155deg, transparent 0%, rgba(255,183,213,0.06) 30%, rgba(255,255,255,0.1) 50%, rgba(255,183,213,0.06) 70%, transparent 100%)",
              animation: "ray-drift 16s ease-in-out infinite reverse",
            }}
          />
        </div>
      </motion.div>

      {/* Musical staff lines — subtle background motif */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        {[25, 35, 45, 55, 65].map((top) => (
          <div
            key={top}
            className="absolute left-0 right-0 h-px bg-[#1a1a2e]"
            style={{ top: `${top}%` }}
          />
        ))}
      </div>

      {/* Title */}
      <motion.div
        className="relative z-10 text-center"
        style={{ y: textY, opacity }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.15, delayChildren: 0.3 },
          },
        }}
      >
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 md:gap-x-6">
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 50, filter: "blur(12px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: {
                    type: "spring",
                    stiffness: 150,
                    damping: 20,
                  },
                },
              }}
              className={`font-serif font-extrabold tracking-tight ${
                word === "Lie" || word === "Portfolio"
                  ? "bg-gradient-to-r from-[#FFB7D5] to-[#C4B5FD] bg-clip-text text-transparent"
                  : "text-[#1a1a2e]"
              } ${
                word === "in"
                  ? "text-3xl md:text-5xl lg:text-6xl italic font-medium text-[#8b8ba8]"
                  : "text-5xl md:text-7xl lg:text-8xl"
              }`}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.8 },
            },
          }}
          className="mt-4 md:mt-6 font-serif text-lg md:text-xl text-[#4a4a6a] italic"
        >
          The Spring I Found Code
        </motion.p>

        {/* Tagline */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.2 },
            },
          }}
          className="mt-3 text-sm md:text-base text-[#8b8ba8] max-w-md mx-auto leading-relaxed"
        >
          A collection of projects, memories, ideas, and dreams — written in code.
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 1.6 },
            },
          }}
          className="mt-10"
        >
          <button
            onClick={() =>
              document.getElementById("story")?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FFB7D5]/25 to-[#C4B5FD]/25 border border-[#FFB7D5]/30
              text-[#1a1a2e] text-sm font-medium hover:from-[#FFB7D5]/35 hover:to-[#C4B5FD]/35 hover:border-[#FFB7D5]/50
              transition-all duration-300 backdrop-blur-sm shadow-lg shadow-[#FFB7D5]/10"
          >
            Begin the Journey
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#8b8ba8] font-medium">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6L8 10L12 6" stroke="#8b8ba8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Treble clef watermark — subtle YLIA motif */}
      <div className="absolute bottom-16 right-8 md:right-16 opacity-[0.04] pointer-events-none">
        <svg width="60" height="120" viewBox="0 0 60 120" fill="none">
          <path
            d="M30 10 C30 10, 45 25, 45 40 C45 55, 30 60, 30 60 C30 60, 15 55, 15 40 C15 25, 30 10, 30 10 Z M30 60 L30 110 M25 100 C25 100, 30 105, 35 100"
            stroke="#1a1a2e"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
    </section>
  );
}
