"use client";

import { motion } from "framer-motion";

export default function LightRays() {
  return (
    <div className="fixed inset-0 z-[5] pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Ray 1 — warm diagonal */}
      <motion.div
        className="absolute -top-[10%] right-[15%] w-[250px] h-[120%] origin-top"
        style={{
          background:
            "linear-gradient(165deg, transparent 0%, rgba(255,222,173,0.04) 30%, rgba(255,255,255,0.08) 50%, rgba(255,222,173,0.04) 70%, transparent 100%)",
          transform: "rotate(15deg)",
        }}
        animate={{
          x: [0, 20, -10, 0],
          opacity: [0.6, 1, 0.7, 0.6],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Ray 2 — cooler tone */}
      <motion.div
        className="absolute -top-[5%] left-[30%] w-[180px] h-[110%] origin-top"
        style={{
          background:
            "linear-gradient(160deg, transparent 0%, rgba(255,183,213,0.03) 30%, rgba(255,255,255,0.06) 50%, rgba(255,183,213,0.03) 70%, transparent 100%)",
          transform: "rotate(8deg)",
        }}
        animate={{
          x: [-10, 15, 5, -10],
          opacity: [0.4, 0.8, 0.5, 0.4],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Ray 3 — subtle fill */}
      <motion.div
        className="absolute -top-[10%] left-[60%] w-[120px] h-[105%] origin-top"
        style={{
          background:
            "linear-gradient(170deg, transparent 0%, rgba(196,181,253,0.02) 40%, rgba(255,255,255,0.04) 50%, rgba(196,181,253,0.02) 60%, transparent 100%)",
          transform: "rotate(12deg)",
        }}
        animate={{
          x: [5, -15, 10, 5],
          opacity: [0.3, 0.6, 0.4, 0.3],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
