"use client";

import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  icon?: string;
  badge?: string;
  windowControls?: boolean;
  accentBorder?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  title,
  icon,
  badge,
  windowControls = false,
  accentBorder = false,
}: GlassCardProps) {
  return (
    <div
      className={`glass-panel relative rounded-2xl transition-all duration-300 ${
        accentBorder ? "border-accent/40 shadow-glow" : "border-white/10"
      } ${className}`}
    >
      {/* Optional retro title bar */}
      {title && (
        <div className="flex items-center justify-between px-3.5 py-2 border-b border-white/10 bg-black/25 rounded-t-2xl select-none">
          <div className="flex items-center gap-2">
            {icon && <span className="text-sm">{icon}</span>}
            <span className="font-mono text-xs font-semibold tracking-wider text-accent uppercase">
              {title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {badge && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30">
                {badge}
              </span>
            )}
            {windowControls && (
              <div className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80 inline-block" />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div className={title ? "p-3.5" : "p-4"}>{children}</div>
    </div>
  );
}
