"use client";

import React, { useState } from "react";
import Image from "next/image";
import GlassCard from "@/components/ui/GlassCard";
import { useAudio } from "@/context/AudioContext";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Radio,
  Compass,
  CheckCircle2,
  Circle,
  Music,
} from "lucide-react";

export default function MediaPanel() {
  const {
    tracks,
    currentTrackIndex,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    progress,
    togglePlay,
    playTrack,
    nextTrack,
    prevTrack,
    seekPercent,
    formatTime,
  } = useAudio();

  const [activeChannel, setActiveChannel] = useState(0);

  const channels = [
    {
      name: "CH 01: Manga Duet",
      src: "/images/ylia/ylia-manga-duet-collage-landscape.jpeg",
      desc: "Kaori & Kousei duet collage",
    },
    {
      name: "CH 02: Concert Hall",
      src: "/images/ylia/ylia-concert-hall-ethereal-duet.jpeg",
      desc: "Ethereal golden performance",
    },
    {
      name: "CH 03: Mirrored Sky",
      src: "/images/ylia/ylia-mirrored-sky-fireflies-duet.jpeg",
      desc: "Duet under starry fireflies",
    },
  ];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    seekPercent(val);
  };

  return (
    <div className="flex flex-col gap-3.5 h-full overflow-y-auto custom-scroll pr-1">
      {/* ── CARD 1: radioweb ♪ (Your Lie in April Classical Radio) ── */}
      <GlassCard
        title="radioweb ♪"
        badge={currentTrack.composer.toLowerCase().split(" ").pop() || "ylia"}
        windowControls={true}
      >
        {/* Album Artwork & Header */}
        <div className="flex items-center gap-3 mb-2.5 bg-black/40 p-2.5 rounded-xl border border-white/10">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/20 flex-shrink-0 bg-black group">
            <Image
              src="/images/ylia/ylia-starry-night-piano-violin-aerial.jpeg"
              alt="radioweb playlist cover"
              fill
              className="object-cover transition-transform group-hover:scale-105 duration-500"
              sizes="64px"
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="flex items-end gap-0.5 h-4">
                  <span className="w-1 bg-accent rounded-full animate-[bounce_1s_infinite_100ms] h-full" />
                  <span className="w-1 bg-accent rounded-full animate-[bounce_1s_infinite_300ms] h-2/3" />
                  <span className="w-1 bg-accent rounded-full animate-[bounce_1s_infinite_200ms] h-4/5" />
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] font-mono text-accent uppercase tracking-wider font-semibold">
                {isPlaying ? "PLAYING NOW" : "PAUSED"}
              </span>
            </div>
            <h3
              className="font-pixel text-xs sm:text-sm font-bold text-white truncate"
              title={currentTrack.pieceFull}
            >
              {currentTrack.title}
            </h3>
            <p className="text-[10px] font-mono text-white/70 truncate">
              {currentTrack.composer}
            </p>
            <p
              className="text-[9px] font-mono text-accent/80 truncate mt-0.5"
              title={currentTrack.yliaContext}
            >
              ★ {currentTrack.yliaContext}
            </p>
          </div>
        </div>

        {/* Timeline Scrubber */}
        <div className="px-1 mb-2">
          <div className="relative flex items-center">
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={progress || 0}
              onChange={handleSliderChange}
              aria-label="Audio scrubber"
              className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[var(--color-accent)] hover:bg-white/30 transition-all"
            />
          </div>
          <div className="flex justify-between items-center text-[9px] font-mono text-white/50 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span className="text-white/30 font-sans">· · ·</span>
            <span>{duration > 0 ? formatTime(duration) : currentTrack.duration}</span>
          </div>
        </div>

        {/* Player Controls Bar */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-black/30 rounded-lg border border-white/10 mb-3">
          <button
            onClick={prevTrack}
            title="Previous Track"
            className="flex items-center gap-1 text-white/70 hover:text-accent transition-colors p-1"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={togglePlay}
            title={isPlaying ? "Pause" : "Play"}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isPlaying
                ? "bg-accent text-black shadow-glow scale-105"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" />
            )}
          </button>

          <button
            onClick={nextTrack}
            title="Next Track"
            className="flex items-center gap-1 text-white/70 hover:text-accent transition-colors p-1"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-1.5 text-[10px] font-mono text-accent">
            <Radio className={`w-3 h-3 ${isPlaying ? "animate-pulse" : ""}`} />
            <span>{isPlaying ? "LIVE" : "READY"}</span>
          </div>
        </div>

        {/* Tracklist of All Your Lie in April Pieces */}
        <div className="space-y-1 max-h-48 overflow-y-auto custom-scroll pr-0.5">
          <div className="text-[9px] font-mono text-white/40 uppercase tracking-wider px-1 pb-0.5 flex justify-between">
            <span>Your Lie in April Tracklist</span>
            <span>{tracks.length} pieces</span>
          </div>
          {tracks.map((t, idx) => {
            const isCurrent = idx === currentTrackIndex;
            return (
              <div
                key={t.id}
                onClick={() => playTrack(idx)}
                className={`flex items-center justify-between p-1.5 rounded cursor-pointer transition-all text-[11px] font-mono ${
                  isCurrent
                    ? "bg-accent/15 text-accent border border-accent/40 shadow-sm"
                    : "hover:bg-white/5 text-white/75 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-2 truncate min-w-0">
                  <span className="text-[10px] text-white/40 w-3.5 flex-shrink-0">
                    {isCurrent && isPlaying ? (
                      <Music className="w-3 h-3 text-accent animate-spin" />
                    ) : (
                      String(idx + 1).padStart(2, "0")
                    )}
                  </span>
                  <div className="truncate">
                    <span className="truncate font-medium block">
                      {t.title}
                    </span>
                    <span className="text-[9px] text-white/50 block truncate">
                      {t.composer}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-white/40 flex-shrink-0 ml-2 font-mono">
                  {t.duration}
                </span>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* ── CARD 2: #revkitube (Retro Sony Trinitron CRT TV) ── */}
      <GlassCard title="#revkitube" badge="CRT 1994" windowControls={true}>
        {/* Retro Sony Bezel */}
        <div className="bg-[#181a1f] p-2.5 rounded-xl border-2 border-[#2b2f38] shadow-2xl relative">
          {/* Top Label */}
          <div className="flex items-center justify-between text-[9px] font-mono text-white/40 mb-1 px-1">
            <span className="tracking-widest uppercase font-bold text-white/60">
              SONY
            </span>
            <span className="text-accent tracking-wider font-semibold">
              Trinitron
            </span>
          </div>

          {/* CRT Screen Frame */}
          <div className="crt-monitor relative w-full h-40 md:h-44 rounded-lg overflow-hidden border border-[#333]">
            <Image
              src={channels[activeChannel].src}
              alt="CRT Screen Content"
              fill
              className="object-cover opacity-90"
              sizes="320px"
            />

            {/* OSD Channel indicator */}
            <div className="absolute top-2 left-2 z-20 bg-black/60 px-2 py-0.5 rounded text-[9px] font-mono text-accent border border-accent/40">
              {channels[activeChannel].name}
            </div>
          </div>

          {/* TV Bottom Panel Controls */}
          <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/10 px-1">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
              <span className="text-[9px] font-mono text-white/50">POWER ON</span>
            </div>

            {/* Channel Switcher */}
            <div className="flex items-center gap-1">
              {channels.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveChannel(i)}
                  className={`px-1.5 py-0.5 rounded text-[9px] font-mono border transition-all ${
                    activeChannel === i
                      ? "bg-accent text-black border-accent font-bold"
                      : "bg-black/40 text-white/60 border-white/10 hover:text-white"
                  }`}
                >
                  CH {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* ── CARD 3: The Horizon // Goals & Quote ── */}
      <GlassCard title="the horizon // goals" badge="focus" windowControls={false}>
        <div className="space-y-2 mb-3 text-[11px] font-mono">
          <div className="flex items-start gap-2 text-white/90">
            <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
            <span>Ship single-viewport dashboard redesign on revki.me</span>
          </div>
          <div className="flex items-start gap-2 text-accent">
            <Compass className="w-3.5 h-3.5 text-accent animate-spin flex-shrink-0 mt-0.5" />
            <span>Optimize real-time SignBridge gesture vision pipeline</span>
          </div>
          <div className="flex items-start gap-2 text-white/70">
            <Circle className="w-3.5 h-3.5 text-white/40 flex-shrink-0 mt-0.5" />
            <span>Explore autonomous agent memory & planning engines</span>
          </div>
          <div className="flex items-start gap-2 text-white/70">
            <Circle className="w-3.5 h-3.5 text-white/40 flex-shrink-0 mt-0.5" />
            <span>Research paper publication & top lab internship</span>
          </div>
        </div>

        {/* Kaori's Inspirational Quote */}
        <div className="p-2 rounded bg-black/40 border-l-2 border-accent text-[10.5px] font-mono text-white/80 italic leading-relaxed">
          &ldquo;Maybe there&apos;s only a dark road up ahead. But you still have to
          believe and keep going. Believe that star will light your path, even a
          little bit.&rdquo;
          <span className="block not-italic text-accent font-semibold text-[9px] mt-1">
            — Kaori Miyazono, Your Lie in April
          </span>
        </div>
      </GlassCard>
    </div>
  );
}
