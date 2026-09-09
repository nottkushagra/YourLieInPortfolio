"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { albums } from "@/lib/data";

export default function Albums() {
  const [expandedAlbum, setExpandedAlbum] = useState<number | null>(null);

  return (
    <section id="albums" className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] rounded-full bg-[#FFB7D5]/6 blur-[100px]" />
        <div className="absolute bottom-[10%] left-[20%] w-[350px] h-[350px] rounded-full bg-[#93C5FD]/5 blur-[90px]" />
      </div>

      {/* Section header */}
      <motion.div
        className="relative z-10 text-center mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a2e] tracking-tight">
          Albums
        </h2>
        <p className="mt-4 font-serif italic text-lg text-[#4a4a6a]">
          A discography of things I&apos;ve built
        </p>
        <div className="mt-6 mx-auto w-24 h-[2px] bg-gradient-to-r from-transparent via-[#FFB7D5] to-transparent rounded-full" />
      </motion.div>

      {/* Album grid */}
      <div className="relative max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {albums.map((album, index) => (
          <AlbumCover
            key={album.title}
            album={album}
            index={index}
            isExpanded={expandedAlbum === index}
            onToggle={() => setExpandedAlbum(expandedAlbum === index ? null : index)}
          />
        ))}
      </div>

      {/* Expanded album overlay */}
      <AnimatePresence>
        {expandedAlbum !== null && !albums[expandedAlbum].comingSoon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
            onClick={() => setExpandedAlbum(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-[#FFF8F3]/90 backdrop-blur-xl" />

            {/* Album detail */}
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", stiffness: 250, damping: 25 }}
              className="relative z-10 max-w-2xl w-full glass rounded-3xl p-8 md:p-12 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Accent blob */}
              <div
                className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-[80px] opacity-30"
                style={{
                  background: `linear-gradient(135deg, ${albums[expandedAlbum].accentFrom}, ${albums[expandedAlbum].accentTo})`,
                }}
              />

              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                {/* Mini album art */}
                <div
                  className="w-40 h-40 md:w-48 md:h-48 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-xl"
                  style={{
                    background: `linear-gradient(135deg, ${albums[expandedAlbum].accentFrom}40, ${albums[expandedAlbum].accentTo}40)`,
                  }}
                >
                  <span className="font-serif text-3xl font-bold text-[#1a1a2e]/80">
                    {albums[expandedAlbum].title}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-3xl font-bold text-[#1a1a2e]">
                    {albums[expandedAlbum].title}
                  </h3>
                  <p className="text-sm text-[#4a4a6a] font-serif italic mt-1">
                    {albums[expandedAlbum].subtitle}
                  </p>
                  <p className="mt-4 text-[#4a4a6a] leading-relaxed">
                    {albums[expandedAlbum].description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 mt-5">
                    {albums[expandedAlbum].technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-3 py-1 rounded-full bg-[#FFF0F5] text-[#4a4a6a] border border-[#FFB7D5]/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 mt-6">
                    {albums[expandedAlbum].github && (
                      <a
                        href={albums[expandedAlbum].github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 rounded-full text-sm font-medium bg-[#1a1a2e] text-white hover:bg-[#2a2a4e] transition-colors"
                      >
                        View Source
                      </a>
                    )}
                    {albums[expandedAlbum].live && albums[expandedAlbum].live !== "#" && (
                      <a
                        href={albums[expandedAlbum].live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 rounded-full text-sm font-medium border border-[#FFB7D5]/30 text-[#1a1a2e] hover:bg-[#FFB7D5]/10 transition-colors"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={() => setExpandedAlbum(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FFF0F5] flex items-center justify-center text-[#8b8ba8] hover:text-[#1a1a2e] hover:bg-[#FFB7D5]/20 transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function AlbumCover({
  album,
  index,
  isExpanded,
  onToggle,
}: {
  album: (typeof albums)[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.1,
      }}
      className={`group cursor-pointer ${album.comingSoon ? "opacity-50 pointer-events-none" : ""}`}
      onClick={onToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Album + Vinyl container */}
      <div className="relative">
        {/* Vinyl peeking out */}
        <motion.div
          className="absolute top-[10%] -right-3 w-[85%] h-[85%] rounded-full bg-gradient-to-br from-[#2d2d3d] to-[#1a1a2e] shadow-lg"
          animate={{
            x: isHovered ? 30 : 0,
            rotate: isHovered ? 45 : 0,
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Grooves */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-white/[0.05]"
              style={{ inset: `${15 + i * 8}%` }}
            />
          ))}
          {/* Center hole */}
          <div
            className="absolute rounded-full"
            style={{
              inset: "40%",
              background: `linear-gradient(135deg, ${album.accentFrom}, ${album.accentTo})`,
            }}
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 via-transparent to-transparent" />
        </motion.div>

        {/* Album cover */}
        <motion.div
          className="relative aspect-square rounded-2xl overflow-hidden shadow-xl z-10"
          animate={{
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Cover gradient art */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${album.accentFrom}50, ${album.accentTo}50)`,
            }}
          />
          {/* Abstract pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              {/* Staff lines */}
              {[60, 80, 100, 120, 140].map((y) => (
                <line
                  key={y}
                  x1="20"
                  y1={y}
                  x2="180"
                  y2={y}
                  stroke="white"
                  strokeWidth="0.5"
                  opacity="0.5"
                />
              ))}
              {/* Notes */}
              <circle cx="60" cy={80 + index * 5} r="5" fill="white" opacity="0.3" />
              <circle cx="100" cy={100 - index * 8} r="5" fill="white" opacity="0.3" />
              <circle cx="140" cy={120 + index * 3} r="5" fill="white" opacity="0.3" />
            </svg>
          </div>

          {/* Title on cover */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <span className="font-serif text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
              {album.title}
            </span>
            {album.comingSoon && (
              <span className="mt-2 text-xs tracking-widest uppercase text-white/70">
                Coming Soon
              </span>
            )}
          </div>

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 bg-[#1a1a2e]/20 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M5 3L15 9L5 15V3Z" fill="#1a1a2e" />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Info */}
      <div className="mt-4">
        <h3 className="font-semibold text-sm text-[#1a1a2e]">{album.title}</h3>
        <p className="text-xs text-[#4a4a6a] mt-0.5">{album.subtitle}</p>
      </div>
    </motion.div>
  );
}
