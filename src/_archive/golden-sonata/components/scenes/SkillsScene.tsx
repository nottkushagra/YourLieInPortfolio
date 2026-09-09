"use client";

import { motion } from "framer-motion";
import { staggerContainerSlow, fadeInUp, ANIMATION } from "@/lib/constants";
import { skillGroups } from "@/lib/data";

const categoryIcons: Record<string, string> = {
  "AI & Machine Learning": "◆",
  "Full Stack": "◇",
  Backend: "△",
  Frontend: "○",
};

export default function SkillsScene() {
  return (
    <div className="scene flex items-center justify-center px-6 md:px-12 lg:px-20 grain-overlay">
      {/* YLIA atmospheric background — very subtle */}
      <div
        className="ylia-bg"
        style={{ backgroundImage: "url(/images/ylia-warm.png)" }}
      />
      <div className="absolute inset-0 bg-bg-base/88 z-[1]" />

      {/* Golden ambient glow */}
      <div
        className="golden-glow"
        style={{
          width: "500px",
          height: "500px",
          bottom: "10%",
          left: "20%",
          animation: "glow-pulse 12s ease-in-out infinite",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-5xl w-full"
        variants={staggerContainerSlow}
        initial="hidden"
        animate="visible"
      >
        {/* Section label */}
        <motion.div variants={fadeInUp} className="mb-14">
          <span className="scene-label">
            02 — Skills
          </span>
          <h2 className="mt-3 scene-title text-4xl md:text-5xl lg:text-6xl">
            The Toolkit
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ ...ANIMATION.cinematic, delay: 0.6 }}
            className="mt-5 h-px bg-gradient-to-r from-accent-muted to-transparent"
          />
        </motion.div>

        {/* Skills grid — glassmorphism cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              variants={fadeInUp}
              custom={i}
              className="glass-card rounded-2xl p-6 md:p-8 group"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-accent/60 text-lg">
                  {categoryIcons[group.title] || "◆"}
                </span>
                <h3 className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
                  {group.title}
                </h3>
              </div>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-2">
                {group.items.map((item, j) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      ...ANIMATION.editorial,
                      delay: 0.5 + i * 0.15 + j * 0.05,
                    }}
                    className="px-3.5 py-2 text-[13px] text-text-secondary rounded-xl
                      bg-bg-base/60 border border-sand/50
                      hover:border-accent/40 hover:text-text-primary hover:bg-bg-elevated/80
                      hover:shadow-[0_2px_12px_rgba(139,115,85,0.06)]
                      transition-all duration-300 cursor-default"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom accent quote */}
        <motion.div
          variants={fadeInUp}
          className="mt-14 flex items-center justify-center gap-6"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-sand/40" />
          <p className="text-sm text-text-tertiary italic shrink-0" style={{ fontFamily: "var(--font-editorial)" }}>
            Every skill is a note. The composition is what matters.
          </p>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-sand/40" />
        </motion.div>
      </motion.div>
    </div>
  );
}
