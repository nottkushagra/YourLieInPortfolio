"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { genres } from "@/lib/data";

export default function Soundtrack() {
  const [activeGenre, setActiveGenre] = useState<number | null>(null);

  return (
    <section id="soundtrack" className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[50%] w-[500px] h-[500px] rounded-full bg-[#C4B5FD]/6 blur-[120px] -translate-x-1/2" />
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
          The Soundtrack
        </h2>
        <p className="mt-4 font-serif italic text-lg text-[#4a4a6a]">
          Skills composed across genres
        </p>
        <div className="mt-6 mx-auto w-24 h-[2px] bg-gradient-to-r from-transparent via-[#C4B5FD] to-transparent rounded-full" />
      </motion.div>

      {/* Vinyl records grid */}
      <div className="relative max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {genres.map((genre, index) => (
          <VinylRecord
            key={genre.title}
            genre={genre}
            index={index}
            isActive={activeGenre === index}
            onActivate={() => setActiveGenre(activeGenre === index ? null : index)}
          />
        ))}
      </div>

      {/* Expanded track list */}
      <AnimatePresence>
        {activeGenre !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-lg mx-auto mt-12 overflow-hidden"
          >
            <div className="glass rounded-3xl p-8 text-center">
              <h3 className="font-serif text-2xl font-bold text-[#1a1a2e] mb-1">
                {genres[activeGenre].title}
              </h3>
              <p className="text-sm text-[#4a4a6a] font-serif italic mb-6">
                {genres[activeGenre].subtitle}
              </p>
              <div className="space-y-3">
                {genres[activeGenre].tracks.map((track, i) => (
                  <motion.div
                    key={track}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="flex items-center gap-4 px-4 py-2.5 rounded-xl hover:bg-[#FFB7D5]/8 transition-colors group"
                  >
                    <span className="text-xs text-[#8b8ba8] font-mono w-5 text-right">
                      {i + 1}
                    </span>
                    <span className="text-[#1a1a2e] text-sm font-medium group-hover:text-[#E8879E] transition-colors">
                      {track}
                    </span>
                    {/* Playback bars */}
                    <div className="ml-auto flex items-end gap-[2px]">
                      {[...Array(3)].map((_, j) => (
                        <div
                          key={j}
                          className="w-[2px] bg-[#FFB7D5]/30 rounded-full group-hover:bg-[#FFB7D5]/60 transition-colors"
                          style={{
                            height: `${4 + Math.random() * 8}px`,
                            animationDelay: `${j * 0.1}s`,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function VinylRecord({
  genre,
  index,
  isActive,
  onActivate,
}: {
  genre: (typeof genres)[0];
  index: number;
  isActive: boolean;
  onActivate: () => void;
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
      className="flex flex-col items-center cursor-pointer group"
      onClick={onActivate}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Vinyl container */}
      <div className="relative w-44 h-44 md:w-48 md:h-48">
        {/* Vinyl disc */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            rotate: isHovered || isActive ? 360 : 0,
          }}
          transition={{
            rotate: {
              duration: isHovered || isActive ? 3 : 0,
              repeat: isHovered || isActive ? Infinity : 0,
              ease: "linear",
            },
          }}
        >
          {/* Disc body */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#2d2d3d] to-[#1a1a2e] shadow-xl">
            {/* Grooves */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full border border-white/[0.04]"
                style={{
                  inset: `${12 + i * 6}%`,
                }}
              />
            ))}
            {/* Center label */}
            <div
              className="absolute rounded-full flex items-center justify-center"
              style={{
                inset: "32%",
                background: `linear-gradient(135deg, ${genre.accentFrom}, ${genre.accentTo})`,
              }}
            >
              <span className="text-white text-[10px] font-bold tracking-wider">
                {genre.title}
              </span>
            </div>
            {/* Light reflection */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent" />
          </div>
        </motion.div>

        {/* Hover glow */}
        <motion.div
          className="absolute inset-0 rounded-full -z-10"
          animate={{
            boxShadow: isHovered || isActive
              ? `0 0 40px ${genre.accentFrom}40, 0 0 80px ${genre.accentTo}20`
              : "0 0 0 transparent",
          }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Label */}
      <motion.div className="mt-5 text-center">
        <h3
          className={`font-serif text-lg font-bold transition-colors duration-300 ${
            isActive ? "text-[#E8879E]" : "text-[#1a1a2e]"
          }`}
        >
          {genre.title}
        </h3>
        <p className="text-xs text-[#8b8ba8] mt-1 font-serif italic">
          {genre.subtitle}
        </p>
      </motion.div>
    </motion.div>
  );
}
