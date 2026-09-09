"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { CONTACT_LINKS } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TextLink from "@/components/ui/TextLink";

const accentColors: Record<string, string> = {
  golden: "var(--color-golden)",
  cream: "var(--color-cream)",
  cloud: "var(--color-cloud)",
};

export default function Silence() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  // Golden light dims over final section
  const goldenOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.08, 0.04, 0]);

  return (
    <section
      id="silence"
      ref={sectionRef}
      className="relative min-h-[120vh] flex flex-col items-center justify-center px-8 py-32 overflow-hidden"
      style={{ backgroundColor: "var(--color-night)" }}
    >
      {/* Dimming golden light */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 80% 30%, var(--color-golden) 0%, transparent 60%)",
          opacity: goldenOpacity,
        }}
      />

      <div className="relative z-10 max-w-[680px] text-center">
        {/* Closing statement */}
        <ScrollReveal>
          <p className="type-editorial text-lg md:text-xl leading-[2.2] text-cream-faded">
            Every line of code is a small act of faith — that what you build
            today will matter tomorrow. If you&apos;ve made it here, maybe our
            paths are meant to cross.
          </p>
        </ScrollReveal>

        {/* Contact links */}
        <div className="mt-20 flex flex-col items-center gap-5">
          {CONTACT_LINKS.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 0.6, y: 0 } : undefined}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.6 + i * 0.12,
              }}
            >
              <TextLink
                href={link.href}
                accent={accentColors[link.accent] || "var(--color-cream)"}
                className="font-editorial text-base md:text-lg"
              >
                {link.label}
              </TextLink>
            </motion.div>
          ))}
        </div>

        {/* Year */}
        <motion.span
          className="block mt-20 type-mono text-cream-ghost/40"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.3 } : undefined}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          2026
        </motion.span>
      </div>

      {/* Final scroll zone — the fade to void */}
      <div className="relative mt-32 flex flex-col items-center gap-10">
        {/* ありがとう — barely visible */}
        <motion.span
          className="text-cream-ghost/20 font-serif text-sm tracking-widest"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.15 } : undefined}
          transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1], delay: 2 }}
        >
          ありがとう
        </motion.span>

        {/* Closing line — mirrors Beat 1 */}
        <motion.div
          className="h-px bg-cream/30"
          initial={{ width: 0 }}
          animate={isInView ? { width: 80 } : undefined}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: 2.5,
          }}
        />
      </div>
    </section>
  );
}
