"use client";

import { useState, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Layout
import FloatingNav from "@/components/layout/FloatingNav";
import MusicVisualizer from "@/components/layout/MusicVisualizer";

// Effects
import SakuraParticles, {
  type SakuraParticlesRef,
} from "@/components/effects/SakuraParticles";
import EasterEggs from "@/components/effects/EasterEggs";
import LightRays from "@/components/effects/LightRays";
import FloatingParticles from "@/components/effects/FloatingParticles";

// Sections
import OpeningExperience from "@/components/sections/OpeningExperience";
import Overture from "@/components/sections/Overture";
import SpringStory from "@/components/sections/SpringStory";
import Soundtrack from "@/components/sections/Soundtrack";
import Albums from "@/components/sections/Albums";
import Constellations from "@/components/sections/Constellations";
import Letters from "@/components/sections/Letters";
import Finale from "@/components/sections/Finale";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const sakuraRef = useRef<SakuraParticlesRef>(null);

  const handlePetalBurst = useCallback((x: number, y: number) => {
    sakuraRef.current?.triggerBurst(x, y, 20);
  }, []);

  const handleEnter = useCallback(() => {
    setHasEntered(true);
  }, []);

  return (
    <>
      {/* Opening Experience — gate */}
      {!hasEntered && <OpeningExperience onEnter={handleEnter} />}

      {/* Effects layers (always mounted, but may be invisible until entered) */}
      <AnimatePresence>
        {hasEntered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            <LightRays />
            <FloatingParticles />
            <SakuraParticles ref={sakuraRef} />
            <EasterEggs onBurst={handlePetalBurst} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <FloatingNav visible={hasEntered} />
      <MusicVisualizer visible={hasEntered} />

      {/* Main Content */}
      <AnimatePresence>
        {hasEntered && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="relative z-10"
          >
            <Overture />

            {/* Transition gradient */}
            <div className="h-24 bg-gradient-to-b from-transparent via-[#FFF0F5]/30 to-transparent" />

            <SpringStory />

            <div className="h-16 bg-gradient-to-b from-transparent via-[#F3E8FF]/20 to-transparent" />

            <Soundtrack />

            <div className="h-16 bg-gradient-to-b from-transparent via-[#E0F2FE]/20 to-transparent" />

            <Albums />

            {/* No gradient before Constellations — it handles its own transition */}
            <Constellations />

            <Letters />

            <div className="h-16 bg-gradient-to-b from-transparent via-[#FCE7F3]/20 to-transparent" />

            <Finale />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
