"use client";

import React, { useState, useEffect } from "react";
import { Mail, ShieldCheck, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export default function Footer() {
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full py-2 px-3 md:px-5 flex flex-wrap items-center justify-between gap-2.5 text-[11px] font-mono text-white/70 select-none z-20 border-t border-white/10 bg-black/40 backdrop-blur-md">
      {/* Left info & domain verification */}
      <div className="flex items-center gap-2.5">
        <span className="flex items-center gap-1.5 text-accent font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          revki.me
        </span>
        <span className="text-white/30 hidden sm:inline">|</span>
        <span className="text-white/60 hidden sm:inline">
          portfolio & experiments
        </span>
      </div>

      {/* Classic Neocities Hit Counter */}
      <div className="flex items-center gap-2">
        <span className="text-white/50 text-[10px] hidden md:inline">VISITORS:</span>
        <div className="flex items-center gap-0.5 bg-black/80 px-2 py-0.5 rounded border border-white/20 font-mono font-bold tracking-widest text-accent text-[11px] shadow-inner">
          <span>0</span>
          <span>0</span>
          <span>4</span>
          <span>8</span>
          <span>9</span>
          <span>2</span>
        </div>
      </div>

      {/* Right side: Clock & Social links */}
      <div className="flex items-center gap-3">
        {timeStr && (
          <span className="text-white/50 font-mono hidden md:inline">
            [{timeStr}]
          </span>
        )}

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/nottkushagra"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="p-1 rounded hover:bg-white/10 text-white/70 hover:text-accent transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://linkedin.com/in/nott-kushagra/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="p-1 rounded hover:bg-white/10 text-white/70 hover:text-accent transition-colors"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href="mailto:kushsh007@gmail.com"
            title="Email"
            className="p-1 rounded hover:bg-white/10 text-white/70 hover:text-accent transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
