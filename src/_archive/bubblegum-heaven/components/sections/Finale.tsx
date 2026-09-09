"use client";

import { motion } from "framer-motion";
import { CONTACT_LINKS } from "@/lib/constants";

const iconPaths: Record<string, React.ReactNode> = {
  mail: (
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ),
  github: (
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="1.5" fill="none" rx="0.5" />
      <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </>
  ),
  twitter: (
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ),
};

export default function Finale() {
  return (
    <section
      id="finale"
      className="relative py-32 px-6 md:px-12 lg:px-20 flex flex-col items-center justify-center text-center min-h-[80vh] overflow-hidden"
    >
      {/* Soft background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[30%] w-[500px] h-[500px] rounded-full bg-[#FFB7D5]/8 blur-[120px]" />
        <div className="absolute bottom-[30%] right-[20%] w-[400px] h-[400px] rounded-full bg-[#C4B5FD]/6 blur-[100px]" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-[#FDE68A]/5 blur-[80px]" />
      </div>

      {/* Main message */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-[#1a1a2e] leading-tight max-w-2xl">
          Thank you for listening.
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className="mt-6 relative z-10"
      >
        <p className="font-serif italic text-xl md:text-2xl text-[#4a4a6a] max-w-lg leading-relaxed">
          This isn&apos;t the end.
          <br />
          It&apos;s only the next movement.
        </p>
      </motion.div>

      {/* Contact links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-12 flex items-center gap-4 relative z-10"
      >
        {CONTACT_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white/70 border border-[#FFB7D5]/15 backdrop-blur-sm
              flex items-center justify-center text-[#4a4a6a]
              hover:text-[#1a1a2e] hover:border-[#FFB7D5]/40 hover:scale-110 hover:shadow-lg hover:shadow-[#FFB7D5]/10
              transition-all duration-300"
            aria-label={link.label}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              {iconPaths[link.icon]}
            </svg>
          </a>
        ))}
      </motion.div>

      {/* Say Hello CTA */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-8 relative z-10"
      >
        <a
          href="mailto:kushagra@example.com"
          className="inline-flex px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FFB7D5]/25 to-[#C4B5FD]/25
            border border-[#FFB7D5]/30 text-[#1a1a2e] text-sm font-medium
            hover:from-[#FFB7D5]/35 hover:to-[#C4B5FD]/35 hover:border-[#FFB7D5]/50
            transition-all duration-300 shadow-lg shadow-[#FFB7D5]/8"
        >
          Say Hello
        </a>
      </motion.div>

      {/* YLIA reference — treble clef motif */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 1.2 }}
        className="mt-24 relative z-10"
      >
        <div className="flex items-center gap-3 text-[#8b8ba8] text-xs">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#FFB7D5]/30" />
          <span className="font-serif italic">
            Reaching you through the music of code
          </span>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#FFB7D5]/30" />
        </div>
      </motion.div>

      {/* Cherry blossom branch — subtle YLIA illustration motif */}
      <div className="absolute bottom-8 right-8 md:right-16 opacity-[0.06] pointer-events-none select-none">
        <svg width="120" height="100" viewBox="0 0 120 100" fill="none">
          {/* Branch */}
          <path
            d="M10 80 Q30 70, 50 55 Q70 40, 90 30 Q100 25, 110 20"
            stroke="#1a1a2e"
            strokeWidth="2"
            fill="none"
          />
          {/* Blossoms */}
          <circle cx="50" cy="52" r="6" fill="#FFB7D5" opacity="0.8" />
          <circle cx="70" cy="38" r="5" fill="#FFB7D5" opacity="0.6" />
          <circle cx="90" cy="28" r="7" fill="#FFB7D5" opacity="0.7" />
          <circle cx="45" cy="60" r="4" fill="#FFD6E8" opacity="0.5" />
          <circle cx="80" cy="35" r="3" fill="#FFD6E8" opacity="0.4" />
          {/* Petals falling */}
          <circle cx="55" cy="65" r="2" fill="#FFB7D5" opacity="0.3" />
          <circle cx="75" cy="55" r="2.5" fill="#FFD6E8" opacity="0.25" />
        </svg>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FFF8F3] to-transparent pointer-events-none" />
    </section>
  );
}
