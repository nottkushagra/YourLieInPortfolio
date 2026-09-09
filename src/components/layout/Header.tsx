"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Terminal, Volume2, VolumeX, Sun, Moon } from "lucide-react";
import { useAudio } from "@/context/AudioContext";

interface HeaderProps {
  onNavClick?: (id: string) => void;
  onToggleAudio?: () => void;
  isAudioPlaying?: boolean;
  bgChoice?: "piano" | "warm" | "forest" | "clouds";
  onBgChange?: (bg: "piano" | "warm" | "forest" | "clouds") => void;
}

export default function Header({
  onNavClick,
  onToggleAudio,
  isAudioPlaying,
  bgChoice = "piano",
  onBgChange,
}: HeaderProps) {
  const {
    isPlaying: contextIsPlaying,
    togglePlay,
    currentTrack,
  } = useAudio();

  const playing = isAudioPlaying !== undefined ? isAudioPlaying : contextIsPlaying;
  const handleToggle = onToggleAudio || togglePlay;

  const [activeTheme, setActiveTheme] = useState<"lime" | "amber" | "cyan">(
    "amber"
  );

  useEffect(() => {
    // Set theme on root element
    document.documentElement.setAttribute("data-theme", activeTheme);
  }, [activeTheme]);

  const navItems = [
    { id: "bio", label: "profile" },
    { id: "projects", label: "projects" },
    { id: "craft", label: "skills" },
    { id: "log", label: "microblog" },
    { id: "music", label: "music" },
    { id: "guestbook", label: "guestbook" },
  ];

  return (
    <header className="w-full py-2.5 px-3 md:px-5 flex items-center justify-between gap-4 select-none z-20">
      {/* Brand & Retro Title */}
      <div className="flex items-center gap-3">
        <div
          onClick={() => onNavClick?.("bio")}
          className="group cursor-pointer flex items-center gap-2"
        >
          <h1 className="font-pixel text-lg md:text-2xl tracking-wide text-accent flex items-center gap-1.5 drop-shadow-[0_0_8px_var(--color-accent-glow)] transition-all">
            kushagra&apos;s web
            <span className="text-sm font-sans tracking-normal opacity-90 inline-block group-hover:rotate-45 transition-transform">
              ★°✿+°★
            </span>
          </h1>
        </div>

        {/* Live Status Pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/40 border border-white/10 text-[11px] font-mono text-muted-sage backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-white/80">revki.me</span>
          <span className="text-white/40">/</span>
          <span className="text-accent/90">building AI systems</span>
        </div>
      </div>

      {/* Pill Navigation Bar (isobelsweb style) */}
      <nav className="flex items-center gap-2">
        <div className="hidden lg:flex items-center gap-1 px-3 py-1 rounded-full bg-black/50 border border-accent/40 backdrop-blur-md shadow-[0_0_12px_var(--color-accent-glow)]">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavClick?.(item.id)}
              className="px-2.5 py-1 text-xs font-mono text-white/80 hover:text-accent hover:bg-white/5 rounded-full transition-all"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Audio Toggle Pill */}
        <button
          onClick={handleToggle}
          title={playing ? `Pause ${currentTrack.title}` : `Play ${currentTrack.title}`}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-mono backdrop-blur-md transition-all ${
            playing
              ? "bg-accent/20 border-accent text-accent shadow-[0_0_10px_var(--color-accent-glow)]"
              : "bg-black/40 border-white/10 text-white/60 hover:text-white"
          }`}
        >
          {playing ? (
            <>
              <Volume2 className="w-3.5 h-3.5 animate-pulse text-accent" />
              <span className="hidden sm:inline text-[11px] truncate max-w-[140px]">
                {currentTrack.title.split(",")[0]} ♪
              </span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">classical ♪</span>
            </>
          )}
        </button>

        {/* Wallpaper Switcher */}
        {onBgChange && (
          <button
            onClick={() => {
              const bgs: Array<"piano" | "warm" | "clouds" | "forest"> = [
                "piano",
                "warm",
                "clouds",
                "forest",
              ];
              const nextIdx = (bgs.indexOf(bgChoice) + 1) % bgs.length;
              onBgChange(bgs[nextIdx]);
            }}
            title="Switch Background Art"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-xs font-mono text-white/90 backdrop-blur-md transition-all"
          >
            <span>
              {bgChoice === "piano" && "🌅 lake"}
              {bgChoice === "warm" && "🎹 sunlit"}
              {bgChoice === "clouds" && "☁️ sky"}
              {bgChoice === "forest" && "🌲 forest"}
            </span>
          </button>
        )}

        {/* Theme Accent Switcher */}
        <div className="flex items-center p-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
          <button
            onClick={() => setActiveTheme("lime")}
            title="Spring Lime (Neocities)"
            className={`w-4 h-4 rounded-full bg-[#a3e635] transition-transform ${
              activeTheme === "lime" ? "scale-125 ring-2 ring-white/50" : "opacity-60 hover:opacity-100"
            }`}
          />
          <button
            onClick={() => setActiveTheme("amber")}
            title="Warm Amber (Golden)"
            className={`w-4 h-4 ml-1.5 rounded-full bg-[#eab308] transition-transform ${
              activeTheme === "amber" ? "scale-125 ring-2 ring-white/50" : "opacity-60 hover:opacity-100"
            }`}
          />
          <button
            onClick={() => setActiveTheme("cyan")}
            title="Cyber Cyan"
            className={`w-4 h-4 ml-1.5 rounded-full bg-[#38bdf8] transition-transform ${
              activeTheme === "cyan" ? "scale-125 ring-2 ring-white/50" : "opacity-60 hover:opacity-100"
            }`}
          />
        </div>
      </nav>
    </header>
  );
}
