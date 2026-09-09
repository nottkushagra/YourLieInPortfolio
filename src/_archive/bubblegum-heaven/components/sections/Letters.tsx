"use client";

import { motion } from "framer-motion";
import { letters } from "@/lib/data";

const categoryIcons: Record<string, string> = {
  learning: "📖",
  reading: "📚",
  music: "🎵",
  vision: "🔮",
};

const categoryColors: Record<string, string> = {
  learning: "#C4B5FD",
  reading: "#93C5FD",
  music: "#FFB7D5",
  vision: "#A7F3D0",
};

export default function Letters() {
  return (
    <section id="letters" className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] right-[15%] w-[350px] h-[350px] rounded-full bg-[#FDE68A]/8 blur-[100px]" />
        <div className="absolute bottom-[30%] left-[10%] w-[300px] h-[300px] rounded-full bg-[#FFB7D5]/6 blur-[80px]" />
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
          Letters to the Future
        </h2>
        <p className="mt-4 font-serif italic text-lg text-[#4a4a6a]">
          Thoughts, reflections, and things close to my heart
        </p>
        <div className="mt-6 mx-auto w-24 h-[2px] bg-gradient-to-r from-transparent via-[#FDE68A] to-transparent rounded-full" />
      </motion.div>

      {/* Letter cards — scattered layout */}
      <div className="relative max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {letters.map((letter, index) => (
            <LetterCard key={letter.title} letter={letter} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LetterCard({
  letter,
  index,
}: {
  letter: (typeof letters)[0];
  index: number;
}) {
  const color = categoryColors[letter.category];
  const icon = categoryIcons[letter.category];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
        rotate: letter.rotation,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotate: letter.rotation,
      }}
      whileHover={{
        rotate: 0,
        scale: 1.03,
        y: -5,
        transition: { duration: 0.3 },
      }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.12,
      }}
      className="group cursor-default"
    >
      <div className="paper-texture rounded-2xl p-8 relative overflow-hidden transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-[#FFB7D5]/8">
        {/* Wax seal */}
        <div
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-md"
          style={{
            background: `linear-gradient(135deg, ${color}, ${color}CC)`,
          }}
        >
          {icon}
        </div>

        {/* Category label */}
        <div
          className="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold mb-4"
          style={{
            backgroundColor: `${color}15`,
            color: color,
            border: `1px solid ${color}25`,
          }}
        >
          {letter.category}
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl font-bold text-[#1a1a2e] mb-3">
          {letter.title}
        </h3>

        {/* Content */}
        <p className="text-[#4a4a6a] leading-relaxed text-sm">
          {letter.content}
        </p>

        {/* Decorative line */}
        <div className="mt-6 flex items-center gap-2">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4d4d8] to-transparent" />
          <span className="text-[#8b8ba8] text-xs font-serif italic">— K</span>
        </div>

        {/* Paper fold corner */}
        <div
          className="absolute bottom-0 right-0 w-8 h-8 opacity-30"
          style={{
            background: "linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.03) 50%)",
          }}
        />
      </div>
    </motion.div>
  );
}
