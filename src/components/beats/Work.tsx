"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { projects } from "@/lib/data";
import TextLink from "@/components/ui/TextLink";

const atmosphereGradients: Record<string, string> = {
  amber:
    "radial-gradient(ellipse at 75% 45%, rgba(196, 164, 108, 0.08) 0%, transparent 60%)",
  cloud:
    "radial-gradient(ellipse at 70% 40%, rgba(126, 145, 168, 0.06) 0%, transparent 60%)",
  plum:
    "radial-gradient(ellipse at 75% 50%, rgba(110, 90, 114, 0.05) 0%, transparent 60%)",
};

function ProjectWorld({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });
  const stagger = 0.1;

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center px-8 md:px-16 lg:px-24 py-24 overflow-hidden"
    >
      {/* Atmosphere gradient */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{
          background: atmosphereGradients[project.atmosphere],
          opacity: isInView ? 1 : 0,
        }}
      />

      {/* Divider line between projects */}
      {index > 0 && (
        <motion.div
          className="absolute top-0 left-0 right-0 h-px bg-cream-ghost/20"
          initial={{ scaleX: 0, transformOrigin: "left" }}
          animate={isInView ? { scaleX: 1 } : undefined}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      )}

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-12 w-full max-w-6xl">
        {/* Left — project content (3 cols) */}
        <div className="lg:col-span-3">
          {/* Number */}
          <motion.span
            className="type-mono text-cream-ghost/40"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.4 } : undefined}
            transition={{ duration: 0.3, delay: stagger * 0 }}
          >
            {project.number}
          </motion.span>

          {/* Title */}
          <motion.h2
            className={`mt-3 type-heading ${project.comingSoon ? "blur-[2px]" : ""}`}
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={
              isInView
                ? {
                    opacity: project.comingSoon ? 0.5 : 1,
                    y: 0,
                    filter: project.comingSoon ? "blur(2px)" : "blur(0px)",
                  }
                : undefined
            }
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
              delay: stagger * 2,
            }}
          >
            {project.title}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="mt-3 type-editorial text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.6 } : undefined}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
              delay: stagger * 4,
            }}
          >
            {project.subtitle}
          </motion.p>

          {/* Description */}
          {project.description && (
            <motion.p
              className="mt-6 type-body leading-[1.9] max-w-lg"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.8,
                ease: [0.33, 1, 0.68, 1],
                delay: stagger * 6,
              }}
            >
              {project.description}
            </motion.p>
          )}

          {/* Tech */}
          {project.tech && (
            <motion.p
              className="mt-6 type-mono text-cream-muted/50"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.4 } : undefined}
              transition={{ duration: 0.6, delay: stagger * 8 }}
            >
              {project.tech}
            </motion.p>
          )}

          {/* Links */}
          {!project.comingSoon && (
            <motion.div
              className="mt-8 flex gap-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.6 } : undefined}
              transition={{ duration: 0.6, delay: stagger * 10 }}
            >
              {project.github && (
                <TextLink
                  href={project.github}
                  accent="var(--color-rose-dust)"
                  className="text-sm"
                >
                  Source ↗
                </TextLink>
              )}
              {project.live && (
                <TextLink
                  href={project.live}
                  accent="var(--color-golden)"
                  className="text-sm"
                >
                  Live ↗
                </TextLink>
              )}
            </motion.div>
          )}
        </div>

        {/* Right — atmospheric visual zone (2 cols) */}
        <div className="hidden lg:flex lg:col-span-2 items-center justify-center">
          <motion.div
            className="w-64 h-64 rounded-full opacity-0"
            style={{
              background: atmosphereGradients[project.atmosphere],
              filter: "blur(40px)",
            }}
            animate={
              isInView
                ? {
                    opacity: [0, 0.6, 0.4],
                    scale: [0.8, 1.05, 1],
                  }
                : undefined
            }
            transition={{
              duration: 2,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.3,
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default function Work() {
  return (
    <div id="work">
      {projects.map((project, i) => (
        <ProjectWorld key={project.id} project={project} index={i} />
      ))}
    </div>
  );
}
