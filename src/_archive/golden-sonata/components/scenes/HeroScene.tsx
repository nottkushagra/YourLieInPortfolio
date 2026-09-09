"use client";

import { motion } from "framer-motion";
import { staggerContainerSlow, fadeInUp, fadeInBlur, ANIMATION } from "@/lib/constants";

const dustParticles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${8 + Math.random() * 80}%`,
  top: `${15 + Math.random() * 65}%`,
  size: 1 + Math.random() * 2,
  duration: 8 + Math.random() * 6,
  delay: Math.random() * 5,
}));

export default function HeroScene() {
  return (
    <div className="scene flex items-center justify-center px-6 grain-overlay">
      {/* YLIA atmospheric background */}
      <div
        className="ylia-bg ylia-bg-stronger"
        style={{ backgroundImage: "url(/images/ylia-hero.png)" }}
      />

      {/* Multi-layered warm gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-base/50 via-bg-base/30 to-bg-base/70 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gold/[0.03] to-transparent z-[1]" />

      {/* Golden hour glow — soft ambient light */}
      <div
        className="golden-glow"
        style={{
          width: "700px",
          height: "700px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "glow-pulse 8s ease-in-out infinite",
        }}
      />

      {/* Secondary glow — offset */}
      <div
        className="golden-glow"
        style={{
          width: "400px",
          height: "400px",
          top: "30%",
          right: "15%",
          animation: "glow-pulse 10s ease-in-out infinite 2s",
        }}
      />

      {/* Warm dust particles */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {dustParticles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-accent-muted/25"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `dust-drift ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-3xl"
        variants={staggerContainerSlow}
        initial="hidden"
        animate="visible"
      >
        {/* Decorative line above name */}
        <motion.div
          variants={fadeInUp}
          className="mx-auto mb-8 w-px h-16 bg-gradient-to-b from-transparent via-accent-muted/50 to-accent-muted/20"
        />

        {/* Name */}
        <motion.h1
          variants={fadeInBlur}
          className="font-serif text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tight text-text-primary leading-[0.9]"
        >
          Kushagra
        </motion.h1>

        {/* Subtitle — italic serif */}
        <motion.p
          variants={fadeInUp}
          className="mt-5 md:mt-7 font-editorial italic text-xl md:text-2xl text-text-secondary tracking-wide"
          style={{ fontFamily: "var(--font-editorial)" }}
        >
          The Spring I Found Code
        </motion.p>

        {/* Tagline */}
        <motion.p
          variants={fadeInUp}
          className="mt-4 text-sm md:text-base text-text-tertiary max-w-lg mx-auto leading-relaxed"
        >
          B.Tech · AI · Full-Stack · Builder
        </motion.p>

        {/* Thin editorial line */}
        <motion.div
          variants={fadeInUp}
          className="mt-10 mx-auto editorial-divider"
        />

        {/* YLIA quote — warm accent */}
        <motion.p
          variants={fadeInUp}
          className="mt-8 text-[13px] text-text-muted italic font-serif max-w-md mx-auto leading-relaxed"
        >
          &ldquo;I met the girl under the bloomed cherry blossoms,
          and my faded, monochrome world began to change.&rdquo;
        </motion.p>

        {/* Navigate hint */}
        <motion.div
          variants={fadeInUp}
          className="mt-14 flex flex-col items-center gap-3"
        >
          <span className="text-[9px] uppercase tracking-[0.4em] text-text-muted/60 font-medium">
            navigate
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-text-muted/50"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom editorial line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ ...ANIMATION.cinematic, delay: 2.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-accent-muted/30 to-transparent z-10"
      />
    </div>
  );
}
