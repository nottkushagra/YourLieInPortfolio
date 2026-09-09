"use client";

import { motion } from "framer-motion";
import { staggerContainerSlow, fadeInUp, ANIMATION } from "@/lib/constants";
import { milestones } from "@/lib/data";

export default function AboutScene() {
  return (
    <div className="scene flex items-center justify-center px-6 md:px-12 lg:px-20 grain-overlay">
      {/* Warm ambient blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute top-[15%] left-[10%] w-[450px] h-[450px] rounded-full bg-accent-muted/[0.05] blur-[120px]"
          style={{ animation: "warm-drift 15s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-[20%] right-[8%] w-[350px] h-[350px] rounded-full bg-gold-soft/[0.04] blur-[100px]"
          style={{ animation: "warm-drift 18s ease-in-out infinite 3s" }}
        />
      </div>

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
            01 — About
          </span>
          <h2 className="mt-3 scene-title text-4xl md:text-5xl lg:text-6xl">
            The Story So Far
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ ...ANIMATION.cinematic, delay: 0.6 }}
            className="mt-5 h-px bg-gradient-to-r from-accent-muted to-transparent"
          />
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16">
          {/* Bio — wider column */}
          <motion.div variants={fadeInUp} className="md:col-span-3">
            <p className="text-text-secondary leading-[1.9] text-[15px] md:text-base">
              I&apos;m a first-year B.Tech student who fell in love with building things —
              systems that think, interfaces that feel, and tools that disappear
              into the hands of the people using them.
            </p>
            <p className="mt-6 text-text-secondary leading-[1.9] text-[15px] md:text-base">
              Right now, I&apos;m deep into{" "}
              <span className="text-text-primary font-medium border-b border-accent-muted/40">machine learning</span> and{" "}
              <span className="text-text-primary font-medium border-b border-accent-muted/40">full-stack development</span>, exploring
              the quiet intersection where AI meets human creativity.
            </p>
            <p className="mt-6 text-text-secondary leading-[1.9] text-[15px] md:text-base">
              When I&apos;m not writing code, I&apos;m reading about distributed systems, 
              listening to Einaudi, or thinking about what to build next.
            </p>

            {/* Quote */}
            <div className="mt-10 pl-6 border-l-2 border-accent-muted/30">
              <p className="text-text-tertiary leading-[1.9] text-sm italic" style={{ fontFamily: "var(--font-editorial)" }}>
                &ldquo;The best technology is the kind you don&apos;t notice — it just works,
                and it makes life a little better.&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Timeline — narrower column */}
          <motion.div variants={fadeInUp} className="md:col-span-2 space-y-0">
            <h3 className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-6">
              Journey
            </h3>
            {milestones.map((m, i) => (
              <motion.div
                key={`${m.year}-${m.title}`}
                className="flex gap-4 group"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...ANIMATION.editorial, delay: 0.8 + i * 0.15 }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-accent-muted/60 group-hover:bg-accent group-hover:scale-125 transition-all duration-300 mt-1.5" />
                  {i < milestones.length - 1 && (
                    <div className="w-px flex-1 bg-gradient-to-b from-accent-muted/30 to-transparent mt-2 min-h-[24px]" />
                  )}
                </div>
                <div className="pb-6">
                  <div className="flex items-baseline gap-3">
                    <span className="text-[11px] font-mono text-accent/70 tracking-wider">
                      {m.year}
                    </span>
                    <h4 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors duration-300">
                      {m.title}
                    </h4>
                  </div>
                  <p className="mt-1.5 text-sm text-text-tertiary leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
