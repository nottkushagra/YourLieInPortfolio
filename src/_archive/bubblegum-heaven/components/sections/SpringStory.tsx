"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { memories } from "@/lib/data";

export default function SpringStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section id="story" className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Section background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#FFF8F3] to-transparent" />
        <div className="absolute top-[30%] right-[5%] w-[300px] h-[300px] rounded-full bg-[#C4B5FD]/8 blur-[100px]" />
        <div className="absolute bottom-[20%] left-[10%] w-[250px] h-[250px] rounded-full bg-[#FFB7D5]/6 blur-[80px]" />
      </div>

      {/* Section header */}
      <motion.div
        className="relative z-10 text-center mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a2e] tracking-tight">
          The Spring I Found Code
        </h2>
        <p className="mt-4 font-serif italic text-lg text-[#4a4a6a]">
          Memories that shaped the journey
        </p>
        <div className="mt-6 mx-auto w-24 h-[2px] bg-gradient-to-r from-transparent via-[#FFB7D5] to-transparent rounded-full" />
      </motion.div>

      {/* Floating memory cards */}
      <div ref={containerRef} className="relative max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {memories.map((memory, index) => (
            <MemoryCard
              key={`${memory.year}-${memory.title}`}
              memory={memory}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function MemoryCard({
  memory,
  index,
  scrollYProgress,
}: {
  memory: (typeof memories)[0];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const floatY = useTransform(
    scrollYProgress,
    [0, 1],
    [30 + index * 10, -20 - index * 10]
  );

  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.15,
      }}
      style={{ y: floatY }}
      className={`relative ${isEven ? "md:mt-0" : "md:mt-16"}`}
    >
      <div className="relative group">
        {/* Card */}
        <div
          className="relative rounded-3xl p-8 md:p-10 bg-white/70 backdrop-blur-xl border border-white/60 shadow-xl shadow-black/[0.03] hover:shadow-2xl hover:shadow-[#FFB7D5]/10 transition-all duration-500 overflow-hidden"
        >
          {/* Accent glow */}
          <div
            className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-30 transition-opacity duration-500 group-hover:opacity-50"
            style={{ background: memory.accent }}
          />

          {/* Year — large watermark */}
          <div
            className="absolute top-4 right-6 font-serif text-7xl md:text-8xl font-bold opacity-[0.06] select-none pointer-events-none"
            style={{ color: memory.accent }}
          >
            {memory.year}
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Year badge */}
            <div
              className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider mb-4"
              style={{
                backgroundColor: `${memory.accent}20`,
                color: memory.accent,
                border: `1px solid ${memory.accent}30`,
              }}
            >
              {memory.year}
            </div>

            <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-3">
              {memory.title}
            </h3>

            <p className="text-[#4a4a6a] leading-relaxed text-base">
              {memory.description}
            </p>

            {/* Musical accent bars */}
            <div className="mt-6 flex items-end gap-1">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: "3px",
                    height: `${6 + Math.sin(i * 0.8) * 8 + 4}px`,
                    backgroundColor: `${memory.accent}40`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
