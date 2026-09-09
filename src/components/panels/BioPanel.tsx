"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import GlassCard from "@/components/ui/GlassCard";
import {
  Mail,
  Copy,
  Check,
  Play,
  Pause,
  Send,
  MessageSquare,
  BarChart2,
  ExternalLink,
} from "lucide-react";

import { useAudio } from "@/context/AudioContext";

interface BioPanelProps {
  onPlayPiano?: () => void;
  isAudioPlaying?: boolean;
}

export default function BioPanel({
  onPlayPiano,
  isAudioPlaying,
}: BioPanelProps) {
  const {
    isPlaying: contextIsPlaying,
    togglePlay,
    currentTrack,
    currentTime,
    formatTime,
  } = useAudio();

  const playing = isAudioPlaying !== undefined ? isAudioPlaying : contextIsPlaying;
  const handleToggle = onPlayPiano || togglePlay;
  const [copied, setCopied] = useState(false);
  const [guestMessages, setGuestMessages] = useState([
    {
      id: "1",
      name: "Autumn",
      text: "The YLIA aesthetic + Neocities dashboard is so heartwarming! 🌸",
      time: "2 hours ago",
    },
    {
      id: "2",
      name: "Devon",
      text: "Ornamenta's search debouncing is super slick.",
      time: "1 day ago",
    },
    {
      id: "3",
      name: "Elena",
      text: "SignBridge is such an impactful AI project. Keep inspiring!",
      time: "3 days ago",
    },
  ]);
  const [authorName, setAuthorName] = useState("");
  const [newMessage, setNewMessage] = useState("");

  // Poll state
  const [pollVoted, setPollVoted] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState<string>("ai");
  const [pollStats, setPollStats] = useState({
    ai: 54,
    web: 28,
    creative: 12,
    systems: 6,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("revki_guestbook_msgs");
      if (saved) {
        setGuestMessages(JSON.parse(saved));
      }
      const voted = localStorage.getItem("revki_poll_voted");
      if (voted) setPollVoted(true);
    } catch {}
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("kushsh007@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const item = {
      id: Date.now().toString(),
      name: authorName.trim() || "traveler",
      text: newMessage.trim(),
      time: "just now",
    };

    const updated = [item, ...guestMessages];
    setGuestMessages(updated);
    try {
      localStorage.setItem("revki_guestbook_msgs", JSON.stringify(updated));
    } catch {}
    setNewMessage("");
  };

  const handleVote = () => {
    if (pollVoted) return;
    setPollStats((prev) => ({
      ...prev,
      [selectedPoll]:
        (prev[selectedPoll as keyof typeof prev] || 0) + 1,
    }));
    setPollVoted(true);
    try {
      localStorage.setItem("revki_poll_voted", "true");
    } catch {}
  };

  return (
    <div className="flex flex-col gap-3.5 h-full overflow-y-auto custom-scroll pr-1">
      {/* ── CARD 1: Identity & Bio ── */}
      <GlassCard
        title="hello! (,,• ᴗ •,,)੭"
        badge="@revki.me"
        windowControls={true}
      >
        <div className="flex items-start gap-3 mb-3">
          {/* Avatar */}
          <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-accent/40 shadow-glow flex-shrink-0 bg-black/50">
            <Image
              src="/images/ylia/ylia-kousei-music-notes-avatar.jpeg"
              alt="Kushagra Avatar"
              fill
              className="object-cover"
              sizes="64px"
              priority
            />
          </div>

          {/* Quick info */}
          <div className="flex-1 min-w-0">
            <h2 className="font-pixel text-base font-bold text-white tracking-wide flex items-center gap-1.5">
              Kushagra
              <span className="text-[11px] font-mono font-normal text-accent bg-accent/15 px-1.5 py-0.2 rounded border border-accent/30">
                dev
              </span>
            </h2>
            <p className="text-[11px] font-mono text-white/70 mt-0.5">
              ML Engineer & Fullstack Crafter
            </p>
            <div className="flex items-center gap-1 text-[10px] text-white/50 mt-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>India · Available for research/work</span>
            </div>
          </div>
        </div>

        {/* Condensed personal intro */}
        <p className="text-[12px] leading-relaxed text-white/90 font-mono mb-3 bg-white/[0.07] p-2 rounded-lg border border-white/10">
          I fell in love with building things the way most people fall in love
          with music —{" "}
          <span className="text-accent font-semibold">
            slowly, and then all at once.
          </span>{" "}
          Deep into AI systems, computer vision, and crafting web applications
          that feel alive.
        </p>

        {/* Contact email line */}
        <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-white/[0.08] border border-white/15 text-[11px] font-mono mb-3">
          <div className="flex items-center gap-1.5 truncate text-white/90">
            <Mail className="w-3.5 h-3.5 text-accent flex-shrink-0" />
            <span className="truncate">kushsh007@gmail.com</span>
          </div>
          <button
            onClick={handleCopyEmail}
            title="Copy email"
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/15 hover:bg-accent/20 hover:text-accent text-white text-[10px] transition-colors flex-shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-accent" />
                <span>copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>copy</span>
              </>
            )}
          </button>
        </div>

        {/* Audio Player Bar */}
        <div className="p-2 rounded-lg bg-white/[0.08] border border-white/15 flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={handleToggle}
              title={playing ? "Pause" : "Play"}
              className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform ${
                playing
                  ? "bg-accent text-black scale-105 shadow-glow"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              {playing ? (
                <Pause className="w-3.5 h-3.5" />
              ) : (
                <Play className="w-3.5 h-3.5 ml-0.5" />
              )}
            </button>
            <div className="min-w-0">
              <p
                className="text-[11px] font-mono text-white font-medium truncate"
                title={currentTrack.pieceFull}
              >
                {currentTrack.composer} — {currentTrack.title}
              </p>
              <p className="text-[9px] font-mono text-white/70 truncate">
                {playing
                  ? `playing • ${formatTime(currentTime)} ♪`
                  : currentTrack.yliaContext}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-accent font-semibold flex-shrink-0">
            {currentTrack.duration}
          </span>
        </div>

        {/* Retro 88x31 Badges */}
        <div>
          <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider block mb-1.5">
            web badges
          </span>
          <div className="flex flex-wrap gap-1.5 justify-start">
            <div className="badge-88x31 bg-gradient-to-r from-blue-900 to-indigo-950 text-blue-200">
              NEXT.JS 16
            </div>
            <div className="badge-88x31 bg-gradient-to-r from-emerald-900 to-teal-950 text-emerald-200">
              PYTHON / ML
            </div>
            <div className="badge-88x31 bg-gradient-to-r from-pink-900 to-rose-950 text-pink-200">
              🌸 YLIA MEMOIR
            </div>
            <div className="badge-88x31 bg-gradient-to-r from-amber-900 to-yellow-950 text-amber-200">
              ☕ COFFEE.SH
            </div>
            <div className="badge-88x31 bg-gradient-to-r from-purple-900 to-violet-950 text-purple-200">
              NEOCITIES
            </div>
          </div>
        </div>
      </GlassCard>

      {/* ── CARD 2: Interactive Chatbox / Guestbook ── */}
      <GlassCard title="chatbox! 💬" badge="guestbook" windowControls={true}>
        {/* Message Stream */}
        <div className="h-36 overflow-y-auto custom-scroll space-y-2 p-1.5 mb-2.5 bg-white/[0.06] rounded-lg border border-white/10">
          {guestMessages.map((msg) => (
            <div
              key={msg.id}
              className="text-[11px] font-mono leading-tight bg-white/[0.08] p-2 rounded border-l-2 border-accent"
            >
              <div className="flex items-center justify-between text-[9px] text-white/60 mb-0.5">
                <span className="text-accent font-semibold">@{msg.name}</span>
                <span>{msg.time}</span>
              </div>
              <p className="text-white/95">{msg.text}</p>
            </div>
          ))}
        </div>

        {/* Quick Send Form */}
        <form onSubmit={handleSendMessage} className="space-y-1.5">
          <div className="flex gap-1.5">
            <input
              type="text"
              placeholder="your name..."
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-1/3 px-2 py-1 text-[11px] font-mono bg-white/[0.1] border border-white/20 rounded text-white placeholder-white/40 focus:outline-none focus:border-accent"
            />
            <input
              type="text"
              placeholder="leave a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 px-2 py-1 text-[11px] font-mono bg-white/[0.1] border border-white/20 rounded text-white placeholder-white/40 focus:outline-none focus:border-accent"
            />
            <button
              type="submit"
              className="px-2.5 py-1 bg-accent/25 hover:bg-accent/40 text-accent border border-accent/40 rounded text-[11px] font-mono transition-colors flex items-center justify-center"
            >
              <Send className="w-3 h-3" />
            </button>
          </div>
        </form>
      </GlassCard>

      {/* ── CARD 3: Mini Poll ── */}
      <GlassCard title="poll 📊" badge="live" windowControls={false}>
        <p className="text-[11px] font-mono text-white/80 mb-2">
          what are you building most lately?
        </p>

        <div className="space-y-1.5 mb-2.5 text-[11px] font-mono">
          {[
            { id: "ai", label: "AI & Neural Agents", pct: pollStats.ai },
            { id: "web", label: "Fullstack Web Apps", pct: pollStats.web },
            { id: "creative", label: "Creative / 3D Web", pct: pollStats.creative },
            { id: "systems", label: "Systems & Rust", pct: pollStats.systems },
          ].map((opt) => (
            <div
              key={opt.id}
              onClick={() => !pollVoted && setSelectedPoll(opt.id)}
              className={`p-1.5 rounded cursor-pointer border transition-all ${
                selectedPoll === opt.id
                  ? "bg-accent/15 border-accent/40 text-white"
                  : "bg-black/30 border-white/5 text-white/70 hover:bg-white/5"
              }`}
            >
              <div className="flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full border ${
                      selectedPoll === opt.id
                        ? "bg-accent border-accent"
                        : "border-white/40"
                    }`}
                  />
                  <span>{opt.label}</span>
                </div>
                {pollVoted && (
                  <span className="text-accent font-semibold">{opt.pct}%</span>
                )}
              </div>

              {pollVoted && (
                <div className="w-full h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all duration-500"
                    style={{ width: `${opt.pct}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleVote}
          disabled={pollVoted}
          className={`w-full py-1 rounded text-[10px] font-mono uppercase tracking-wider font-bold transition-all ${
            pollVoted
              ? "bg-white/10 text-white/40 cursor-default"
              : "bg-accent text-black hover:bg-accent/90"
          }`}
        >
          {pollVoted ? "✓ Vote Recorded" : "Submit Vote"}
        </button>
      </GlassCard>
    </div>
  );
}
