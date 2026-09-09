"use client";

import { useState, useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { stars, constellationLines } from "@/lib/data";

export default function Constellations() {
  const [hoveredStar, setHoveredStar] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // Generate background stars (decorative)
  const bgStars = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 2,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
      })),
    []
  );

  return (
    <section
      id="constellations"
      ref={sectionRef}
      className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)" }}
    >
      {/* Transition from light to dark */}
      <div className="absolute -top-1 left-0 right-0 h-32 bg-gradient-to-b from-[#FFF8F3] to-transparent z-10" />
      {/* Transition from dark back to light */}
      <div className="absolute -bottom-1 left-0 right-0 h-32 bg-gradient-to-t from-[#FFF8F3] to-transparent z-10" />

      {/* Background stars */}
      <div className="absolute inset-0">
        {bgStars.map((star, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Nebula glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[30%] left-[20%] w-[300px] h-[300px] rounded-full bg-[#C4B5FD]/8 blur-[100px]" />
        <div className="absolute bottom-[20%] right-[25%] w-[250px] h-[250px] rounded-full bg-[#FFB7D5]/6 blur-[80px]" />
      </div>

      {/* Section header */}
      <motion.div
        className="relative z-20 text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
          Constellations
        </h2>
        <p className="mt-4 font-serif italic text-lg text-white/60">
          Goals, dreams, and the stars I&apos;m reaching for
        </p>
        <div className="mt-6 mx-auto w-24 h-[2px] bg-gradient-to-r from-transparent via-[#C4B5FD]/50 to-transparent rounded-full" />
      </motion.div>

      {/* Star map */}
      <motion.div
        className="relative z-20 max-w-4xl mx-auto aspect-[16/10] md:aspect-[16/9]"
        style={{ y: parallaxY }}
      >
        {/* Constellation lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {constellationLines.map((line, i) => {
            const fromStar = stars.find((s) => s.id === line.from);
            const toStar = stars.find((s) => s.id === line.to);
            if (!fromStar || !toStar) return null;

            const isHighlighted =
              hoveredStar === line.from || hoveredStar === line.to;

            return (
              <motion.line
                key={i}
                x1={fromStar.x}
                y1={fromStar.y}
                x2={toStar.x}
                y2={toStar.y}
                stroke={isHighlighted ? "#C4B5FD" : "rgba(255,255,255,0.15)"}
                strokeWidth={isHighlighted ? "0.3" : "0.15"}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
              />
            );
          })}
        </svg>

        {/* Stars */}
        {stars.map((star, i) => {
          const sizeMap = { sm: 6, md: 8, lg: 12 };
          const size = sizeMap[star.size];
          const isHovered = hoveredStar === star.id;
          const groupColor =
            star.group === "near"
              ? "#A7F3D0"
              : star.group === "aspiration"
              ? "#C4B5FD"
              : "#FFB7D5";

          return (
            <motion.div
              key={star.id}
              className="absolute cursor-pointer group"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.3 + i * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              onMouseEnter={() => setHoveredStar(star.id)}
              onMouseLeave={() => setHoveredStar(null)}
            >
              {/* Glow */}
              <motion.div
                className="absolute rounded-full -z-10"
                style={{
                  width: size * 4,
                  height: size * 4,
                  left: -(size * 4 - size) / 2,
                  top: -(size * 4 - size) / 2,
                  background: `radial-gradient(circle, ${groupColor}40 0%, transparent 70%)`,
                }}
                animate={{
                  scale: isHovered ? 1.5 : 1,
                  opacity: isHovered ? 1 : 0.5,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Star dot */}
              <div
                className="rounded-full"
                style={{
                  width: size,
                  height: size,
                  background: groupColor,
                  boxShadow: `0 0 ${size}px ${groupColor}80`,
                }}
              />

              {/* Label tooltip */}
              <AnimatedTooltip visible={isHovered} label={star.label} group={star.group} />
            </motion.div>
          );
        })}

        {/* Legend */}
        <div className="absolute bottom-0 left-0 flex gap-6 text-xs text-white/50">
          {[
            { label: "Near-term", color: "#A7F3D0" },
            { label: "Aspirations", color: "#C4B5FD" },
            { label: "Dreams", color: "#FFB7D5" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: item.color }}
              />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function AnimatedTooltip({
  visible,
  label,
  group,
}: {
  visible: boolean;
  label: string;
  group: string;
}) {
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 5,
        scale: visible ? 1 : 0.95,
      }}
      transition={{ duration: 0.2 }}
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 whitespace-nowrap pointer-events-none"
    >
      <div className="px-3 py-1.5 rounded-lg glass-dark text-xs text-white font-medium shadow-xl">
        {label}
      </div>
    </motion.div>
  );
}
