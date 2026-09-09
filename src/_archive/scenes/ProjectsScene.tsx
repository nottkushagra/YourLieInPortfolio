"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainerSlow, fadeInUp, ANIMATION } from "@/lib/constants";
import { projects, type Project } from "@/lib/data";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      className={`relative group ${project.comingSoon ? "opacity-40" : "cursor-pointer"}`}
      onClick={() => !project.comingSoon && setExpanded(!expanded)}
    >
      {/* Card */}
      <div
        className={`rounded-2xl p-7 md:p-9 transition-all duration-500
          bg-bg-elevated/60 border border-sand/30
          ${!project.comingSoon ? "hover:border-accent-muted/50 hover:bg-bg-elevated/90 hover:shadow-[0_12px_48px_rgba(139,115,85,0.08)]" : ""}
          ${expanded ? "border-accent-muted/50 bg-bg-elevated/90 shadow-[0_12px_48px_rgba(139,115,85,0.08)]" : ""}`}
      >
        {/* Top row: Index + Expand */}
        <div className="flex items-start justify-between mb-1">
          <span className="text-[10px] font-mono text-accent/50 tracking-wider">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Expand indicator */}
          {!project.comingSoon && (
            <motion.div
              animate={{ rotate: expanded ? 45 : 0 }}
              transition={ANIMATION.smooth}
              className="w-7 h-7 rounded-full border border-accent-muted/30 flex items-center justify-center
                group-hover:border-accent/40 group-hover:bg-accent/[0.04] transition-all duration-300"
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M5.5 1V10M1 5.5H10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="text-text-muted" />
              </svg>
            </motion.div>
          )}
        </div>

        {/* Title + Subtitle */}
        <h3 className="font-serif text-2xl md:text-3xl font-bold text-text-primary tracking-tight leading-tight">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-text-tertiary italic" style={{ fontFamily: "var(--font-editorial)" }}>
          {project.subtitle}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mt-5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-[11px] font-mono text-text-muted/80
                bg-bg-raised/60 rounded-lg border border-sand/25"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Accent bar — hover reveals */}
        <div
          className="absolute bottom-0 left-8 right-8 h-px transition-all duration-500"
          style={{
            background: `linear-gradient(to right, transparent, ${project.accent}30, transparent)`,
          }}
        />

        {/* Expandable content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={ANIMATION.editorial}
              className="overflow-hidden"
            >
              <div className="pt-6 mt-6 border-t border-sand/20">
                <p className="text-sm text-text-secondary leading-[1.9]">
                  {project.description}
                </p>

                {/* Links */}
                <div className="mt-6 flex gap-5">
                  {project.github && project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-xs font-medium text-accent hover:text-text-primary
                        transition-all duration-300 tracking-wide uppercase group/link"
                    >
                      <span className="border-b border-accent/30 group-hover/link:border-text-primary pb-0.5">
                        Source
                      </span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform group-hover/link:translate-x-0.5">
                        <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  )}
                  {project.live && project.live !== "#" && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-xs font-medium text-accent hover:text-text-primary
                        transition-all duration-300 tracking-wide uppercase group/link"
                    >
                      <span className="border-b border-accent/30 group-hover/link:border-text-primary pb-0.5">
                        Live
                      </span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform group-hover/link:translate-x-0.5">
                        <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function ProjectsScene() {
  return (
    <div className="scene flex items-center justify-center px-6 md:px-12 lg:px-20 grain-overlay">
      {/* Subtle ambient */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute top-[30%] right-[5%] w-[400px] h-[400px] rounded-full bg-gold/[0.03] blur-[110px]"
          style={{ animation: "warm-drift 16s ease-in-out infinite" }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl w-full"
        variants={staggerContainerSlow}
        initial="hidden"
        animate="visible"
      >
        {/* Section label */}
        <motion.div variants={fadeInUp} className="mb-10">
          <span className="scene-label">
            03 — Projects
          </span>
          <h2 className="mt-3 scene-title text-4xl md:text-5xl lg:text-6xl">
            Selected Work
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ ...ANIMATION.cinematic, delay: 0.6 }}
            className="mt-5 h-px bg-gradient-to-r from-accent-muted to-transparent"
          />
        </motion.div>

        {/* Project cards */}
        <div className="space-y-5">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
