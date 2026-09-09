"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/lib/data";
import ScrollReveal from "@/components/ui/ScrollReveal";

// Generate deterministic positions for the constellation
function generatePositions(count: number) {
  const positions: { x: number; y: number }[] = [];
  const seed = 42;
  let s = seed;
  const next = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };

  for (let i = 0; i < count; i++) {
    const angle = next() * Math.PI * 2;
    const group = skills[i]?.group;
    const radius =
      group === "core"
        ? next() * 80
        : group === "inner"
          ? 100 + next() * 100
          : 180 + next() * 120;

    positions.push({
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    });
  }
  return positions;
}

export default function Craft() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const positions = useMemo(() => generatePositions(skills.length), []);

  const sizeMap = { lg: "text-2xl md:text-3xl", md: "text-lg md:text-xl", sm: "text-sm md:text-base" };

  return (
    <section
      id="craft"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-8 py-32 overflow-hidden"
      style={{ backgroundColor: "var(--color-night)" }}
    >
      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 60% 50%, rgba(196, 164, 108, 0.04) 0%, transparent 60%)",
        }}
      />

      {/* Desktop: constellation */}
      <div className="relative z-10 hidden md:flex items-center justify-center w-full max-w-3xl aspect-square">
        <motion.div
          className="relative w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          {skills.map((skill, i) => {
            const pos = positions[i];
            const isHovered = hoveredIndex === i;
            const isRelated =
              hoveredIndex !== null &&
              skills[hoveredIndex]?.group === skill.group &&
              hoveredIndex !== i;

            return (
              <motion.span
                key={skill.label}
                className={`absolute font-serif cursor-default select-none whitespace-nowrap ${sizeMap[skill.size]}`}
                style={{
                  left: `calc(50% + ${pos.x}px)`,
                  top: `calc(50% + ${pos.y}px)`,
                  transform: "translate(-50%, -50%)",
                  color: "var(--color-cream)",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? {
                        opacity: isHovered
                          ? 1
                          : isRelated
                            ? Math.min(skill.opacity + 0.2, 1)
                            : skill.opacity,
                        scale: isHovered ? 1.08 : 1,
                        // Counter-rotate to keep text readable
                        rotate: -360,
                      }
                    : undefined
                }
                transition={{
                  opacity: { duration: 0.3 },
                  scale: { type: "spring", stiffness: 200, damping: 20 },
                  rotate: { duration: 120, repeat: Infinity, ease: "linear" },
                  // Stagger initial appearance
                  ...(isInView && {
                    delay: i * 0.03,
                  }),
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {skill.label}
              </motion.span>
            );
          })}
        </motion.div>
      </div>

      {/* Mobile: editorial list */}
      <div className="relative z-10 md:hidden w-full max-w-md">
        {(["core", "inner", "outer"] as const).map((group) => (
          <ScrollReveal key={group} className="mb-8">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {skills
                .filter((s) => s.group === group)
                .map((skill) => (
                  <span
                    key={skill.label}
                    className="font-serif text-cream"
                    style={{ opacity: skill.opacity, fontSize: skill.size === "lg" ? "1.25rem" : skill.size === "md" ? "1rem" : "0.875rem" }}
                  >
                    {skill.label}
                  </span>
                ))}
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Bottom editorial line */}
      <ScrollReveal className="mt-16 md:mt-24 text-center">
        <p className="type-editorial text-[15px] text-cream-muted">
          Every skill is a note. The composition is what matters.
        </p>
      </ScrollReveal>
    </section>
  );
}
