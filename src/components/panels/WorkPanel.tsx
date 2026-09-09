"use client";

import React, { useState } from "react";
import Image from "next/image";
import GlassCard from "@/components/ui/GlassCard";
import { projects, skills } from "@/lib/data";
import { ExternalLink, Sparkles, Code2, Layers, Terminal } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

export default function WorkPanel() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const currentProject = projects[activeProjectIndex];

  // Project banner images using user assets
  const projectImages = [
    "/images/ylia/ylia-cherry-blossom-duet-sunset.jpeg",
    "/images/ylia/ylia-manga-duet-collage-landscape.jpeg",
    "/images/ylia/ylia-starry-night-piano-violin-aerial.jpeg",
  ];

  // Microblog entries (isobelsweb style)
  const microblogEntries = [
    {
      date: "2026/09/10",
      tag: "deployment",
      text: "shipped the single-viewport Neocities dashboard redesign on revki.me! Zero scrolling clutter, rich glass panels, and pure atmosphere.",
    },
    {
      date: "2026/08/24",
      tag: "research",
      text: "benchmarked real-time sign language recognition latency for SignBridge on live camera streams. Reached steady 42ms inference.",
    },
    {
      date: "2026=07/18",
      tag: "craft",
      text: "tuned intelligent search debouncing & instant category filters for Ornamenta. Every interaction feels instant.",
    },
    {
      date: "2026/06/02",
      tag: "sonata",
      text: "listening to Einaudi & Chopin while writing algorithms. 'The spring I found code.'",
    },
  ];

  // Categorized skills
  const mlSkills = [
    "Machine Learning",
    "Python",
    "PyTorch",
    "Computer Vision",
    "NLP",
    "LLMs",
    "Data Science",
  ];
  const webSkills = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Tailwind CSS",
    "Framer Motion",
    "REST APIs",
  ];
  const systemSkills = ["Docker", "AWS", "SQL", "Java", "Three.js", "Figma"];

  return (
    <div className="flex flex-col gap-3.5 h-full overflow-y-auto custom-scroll pr-1">
      {/* ── CARD 1: Featured Projects Showcase ── */}
      <GlassCard
        title="featured creations & code"
        badge="interactive"
        windowControls={true}
        accentBorder={true}
      >
        {/* Project Selector Tabs */}
        <div className="flex items-center gap-1.5 mb-3 bg-black/40 p-1 rounded-lg border border-white/10 overflow-x-auto custom-scroll">
          {projects.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setActiveProjectIndex(idx)}
              className={`px-3 py-1 text-xs font-mono rounded transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeProjectIndex === idx
                  ? "bg-accent text-black font-bold shadow-sm"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>{p.number}</span>
              <span>{p.title}</span>
            </button>
          ))}
        </div>

        {/* Selected Project Card */}
        <div className="bg-white/[0.08] backdrop-blur-md rounded-xl overflow-hidden border border-white/15">
          {/* Banner Graphic */}
          <div className="relative w-full h-36 md:h-44 bg-slate-900/30 overflow-hidden group">
            <Image
              src={projectImages[activeProjectIndex] || projectImages[0]}
              alt={currentProject.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent" />

            <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between">
              <div>
                <span className="text-[10px] font-mono text-accent uppercase tracking-widest bg-black/60 px-2 py-0.5 rounded border border-accent/40">
                  {currentProject.number} · {currentProject.atmosphere}
                </span>
                <h3 className="font-pixel text-lg md:text-xl font-bold text-white mt-1 drop-shadow-md">
                  {currentProject.title}
                </h3>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1.5">
                {currentProject.live && (
                  <a
                    href={currentProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-accent text-black font-mono text-[11px] font-bold hover:bg-accent/90 transition-all shadow-glow"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {currentProject.github && (
                  <a
                    href={currentProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-black/60 hover:bg-white/20 text-white font-mono text-[11px] border border-white/25 transition-all"
                  >
                    <GithubIcon className="w-3 h-3" />
                    <span>Repo</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="p-3">
            <p className="text-[11px] font-mono text-accent font-semibold mb-1">
              {currentProject.subtitle}
            </p>
            <p className="text-[12px] font-mono text-white/90 leading-relaxed mb-3">
              {currentProject.description ||
                "Explorations in autonomous cognitive architectures, local LLM evaluation pipelines, and intelligent agent orchestrations. Formulating research directions."}
            </p>

            {currentProject.tech && (
              <div className="flex items-center gap-2 pt-2 border-t border-white/10 text-[10px] font-mono text-white/75">
                <Code2 className="w-3 h-3 text-accent" />
                <span className="truncate">{currentProject.tech}</span>
              </div>
            )}
          </div>
        </div>
      </GlassCard>

      {/* ── CARD 2: /microblog (Dev Log Feed) ── */}
      <GlassCard title="/microblog" badge="updates" windowControls={true}>
        <div className="space-y-2.5">
          {microblogEntries.map((item, i) => (
            <div
              key={i}
              className="p-2 rounded-lg bg-white/[0.07] border border-white/10 hover:border-accent/40 transition-all"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-white/50 mb-1">
                <span className="text-accent font-semibold flex items-center gap-1">
                  <Terminal className="w-2.5 h-2.5" />
                  {item.date}
                </span>
                <span className="bg-white/5 px-1.5 py-0.2 rounded border border-white/10 uppercase text-[9px]">
                  {item.tag}
                </span>
              </div>
              <p className="text-[11.5px] font-mono text-white/85 leading-snug">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* ── CARD 3: The Craft (Skills Matrix) ── */}
      <GlassCard title="the craft // skills" badge="matrix" windowControls={false}>
        <div className="space-y-2.5">
          {/* Machine Learning */}
          <div>
            <span className="text-[10px] font-mono text-accent uppercase tracking-wider block mb-1">
              Machine Learning & AI
            </span>
            <div className="flex flex-wrap gap-1">
              {mlSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 hover:border-emerald-400 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Web Engineering */}
          <div>
            <span className="text-[10px] font-mono text-accent uppercase tracking-wider block mb-1">
              Web Architecture & UI
            </span>
            <div className="flex flex-wrap gap-1">
              {webSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-950/40 text-blue-300 border border-blue-500/30 hover:border-blue-400 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Systems */}
          <div>
            <span className="text-[10px] font-mono text-accent uppercase tracking-wider block mb-1">
              Systems & Tools
            </span>
            <div className="flex flex-wrap gap-1">
              {systemSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-purple-950/40 text-purple-300 border border-purple-500/30 hover:border-purple-400 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
