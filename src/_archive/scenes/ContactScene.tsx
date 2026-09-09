"use client";

import { motion } from "framer-motion";
import { staggerContainerSlow, fadeInUp, ANIMATION } from "@/lib/constants";
import { goals, reflections } from "@/lib/data";

function ContactIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "mail":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M22 7L13.03 12.7a1.94 1.94 0 01-2.06 0L2 7" />
        </svg>
      );
    case "github":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "twitter":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    default:
      return null;
  }
}

const CONTACT_LINKS = [
  { label: "Email", href: "mailto:kushsh007@gmail.com", icon: "mail" },
  { label: "GitHub", href: "https://github.com/nottkushagra", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/nott-kushagra/", icon: "linkedin" },
  { label: "Twitter", href: "#", icon: "twitter" },
];

export default function ContactScene() {
  const nearGoals = goals.filter((g) => g.tier === "near");
  const aspirations = goals.filter((g) => g.tier === "aspiration");
  const dreams = goals.filter((g) => g.tier === "dream");

  return (
    <div className="scene flex items-center justify-center px-6 md:px-12 lg:px-20 grain-overlay">
      {/* YLIA atmospheric background */}
      <div
        className="ylia-bg ylia-bg-stronger"
        style={{ backgroundImage: "url(/images/ylia-classroom.png)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-base/95 via-bg-base/85 to-bg-base/90 z-[1]" />

      {/* Warm glow */}
      <div
        className="golden-glow"
        style={{
          width: "600px",
          height: "600px",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          animation: "glow-pulse 10s ease-in-out infinite",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-5xl w-full"
        variants={staggerContainerSlow}
        initial="hidden"
        animate="visible"
      >
        {/* Section label */}
        <motion.div variants={fadeInUp} className="mb-12">
          <span className="scene-label">
            04 — Closing
          </span>
          <h2 className="mt-3 scene-title text-4xl md:text-5xl lg:text-6xl">
            Looking Ahead
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ ...ANIMATION.cinematic, delay: 0.6 }}
            className="mt-5 h-px bg-gradient-to-r from-accent-muted to-transparent"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          {/* Left: Goals + Reflections */}
          <motion.div variants={fadeInUp} className="space-y-8">
            {/* Goals grouped by tier */}
            {[
              { title: "Near-term", items: nearGoals, dotClass: "bg-accent" },
              { title: "Aspirations", items: aspirations, dotClass: "bg-gold" },
              { title: "Dreams", items: dreams, dotClass: "bg-stone/60" },
            ].map((section) => (
              <div key={section.title}>
                <h4 className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">
                  {section.title}
                </h4>
                <ul className="space-y-2.5">
                  {section.items.map((g) => (
                    <li key={g.label} className="text-sm text-text-secondary flex items-center gap-3 group">
                      <span className={`w-1.5 h-1.5 rounded-full ${section.dotClass} group-hover:scale-150 transition-transform duration-300`} />
                      <span className="group-hover:text-text-primary transition-colors duration-300">
                        {g.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Reflection */}
            {reflections.length > 0 && (
              <div className="pt-4">
                <div className="pl-5 border-l border-accent-muted/25">
                  <p className="text-sm text-text-tertiary italic leading-[1.8]" style={{ fontFamily: "var(--font-editorial)" }}>
                    {reflections[0].content}
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Right: Quote + Contact */}
          <motion.div variants={fadeInUp} className="flex flex-col justify-between">
            {/* YLIA Quote */}
            <div className="mb-10">
              <div className="text-accent-muted/30 text-5xl font-serif leading-none mb-4">&ldquo;</div>
              <p className="font-serif italic text-text-secondary leading-[1.9] text-[15px] -mt-6 pl-2">
                Maybe there&apos;s only a dark road up ahead. But you still have to believe and keep going.
                Believe that the stars will light your path, even a little bit.
              </p>
              <p className="mt-4 text-xs text-text-muted tracking-wide pl-2">
                — Kaori Miyazono
              </p>
            </div>

            {/* Contact links */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-5">
                Connect
              </h4>
              <div className="flex flex-wrap gap-3">
                {CONTACT_LINKS.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...ANIMATION.editorial, delay: 1.2 + i * 0.1 }}
                    className="flex items-center gap-2.5 px-5 py-3 rounded-xl
                      glass-card cursor-pointer
                      text-text-secondary hover:text-text-primary
                      text-sm group"
                  >
                    <span className="opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      <ContactIcon icon={link.icon} />
                    </span>
                    <span>{link.label}</span>
                  </motion.a>
                ))}
              </div>

              {/* Sign-off */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ...ANIMATION.cinematic, delay: 2 }}
                className="mt-10 pt-6 border-t border-sand/25"
              >
                <p className="text-xs text-text-muted/70 tracking-wider">
                  Built with care · Inspired by spring · Reaching you through the music of code
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
