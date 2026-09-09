"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SCENES, sceneVariants, ANIMATION } from "@/lib/constants";
import SceneNav from "@/components/layout/SceneNav";
import HeroScene from "@/components/scenes/HeroScene";
import AboutScene from "@/components/scenes/AboutScene";
import SkillsScene from "@/components/scenes/SkillsScene";
import ProjectsScene from "@/components/scenes/ProjectsScene";
import ContactScene from "@/components/scenes/ContactScene";

const SCENE_COMPONENTS = [
  HeroScene,
  AboutScene,
  SkillsScene,
  ProjectsScene,
  ContactScene,
];

export default function Home() {
  const [currentScene, setCurrentScene] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const navigateTo = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentScene) return;
      if (index < 0 || index >= SCENES.length) return;

      setIsTransitioning(true);
      setDirection(index > currentScene ? 1 : -1);
      setCurrentScene(index);

      setTimeout(() => setIsTransitioning(false), 900);
    },
    [currentScene, isTransitioning]
  );

  const navigateNext = useCallback(() => {
    if (currentScene < SCENES.length - 1) navigateTo(currentScene + 1);
  }, [currentScene, navigateTo]);

  const navigatePrev = useCallback(() => {
    if (currentScene > 0) navigateTo(currentScene - 1);
  }, [currentScene, navigateTo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!hasEntered) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleEnter();
        }
        return;
      }
      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
          e.preventDefault();
          navigateNext();
          break;
        case "ArrowUp":
        case "ArrowLeft":
          e.preventDefault();
          navigatePrev();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasEntered, navigateNext, navigatePrev]);

  // Wheel navigation
  useEffect(() => {
    let wheelTimeout: NodeJS.Timeout | null = null;
    let wheelAccumulator = 0;

    const handleWheel = (e: WheelEvent) => {
      if (!hasEntered) return;
      e.preventDefault();

      wheelAccumulator += e.deltaY;

      if (wheelTimeout) clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        if (Math.abs(wheelAccumulator) > 50) {
          if (wheelAccumulator > 0) navigateNext();
          else navigatePrev();
        }
        wheelAccumulator = 0;
      }, 80);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (wheelTimeout) clearTimeout(wheelTimeout);
    };
  }, [hasEntered, navigateNext, navigatePrev]);

  // Touch navigation
  useEffect(() => {
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!hasEntered) return;
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0) navigateNext();
        else navigatePrev();
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [hasEntered, navigateNext, navigatePrev]);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => setHasEntered(true), 1000);
  };

  // Opening gate — cinematic entrance
  if (!hasEntered) {
    return (
      <AnimatePresence>
        {!isExiting && (
          <motion.div
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
            className="fixed inset-0 bg-bg-night flex items-center justify-center z-[100] cursor-pointer grain-overlay"
            onClick={handleEnter}
          >
            {/* Warm ambient glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
              style={{
                background: "radial-gradient(ellipse, rgba(184,160,122,0.05) 0%, transparent 60%)",
                animation: "glow-pulse 6s ease-in-out infinite",
              }}
            />

            {/* Second ambient glow */}
            <div
              className="absolute top-[35%] left-[40%] w-[300px] h-[300px] rounded-full"
              style={{
                background: "radial-gradient(ellipse, rgba(139,115,85,0.04) 0%, transparent 60%)",
                animation: "glow-pulse 8s ease-in-out infinite 2s",
              }}
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-center relative z-10"
            >
              {/* Decorative top line */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 48, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="mx-auto w-px bg-gradient-to-b from-transparent via-accent-muted/30 to-accent-muted/10 mb-8"
              />

              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                {/* Musical note icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mx-auto text-accent-muted/40 mb-10"
                  >
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </svg>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="font-serif text-3xl md:text-4xl text-text-light/90 tracking-tight"
                >
                  Your Lie in Portfolio
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.1 }}
                  className="mt-3 text-sm text-text-light-muted/60 italic"
                  style={{ fontFamily: "var(--font-editorial)" }}
                >
                  The Spring I Found Code
                </motion.p>

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ duration: 1.2, delay: 1.5 }}
                  className="mt-10 mx-auto h-px bg-gradient-to-r from-transparent via-accent-muted/25 to-transparent"
                />

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 2 }}
                  className="mt-8 text-[9px] uppercase tracking-[0.5em] text-text-light-muted/35"
                >
                  Click anywhere to enter
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  const ActiveScene = SCENE_COMPONENTS[currentScene];

  return (
    <main className="fixed inset-0 bg-bg-base overflow-hidden">
      {/* Scene container */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentScene}
          custom={direction}
          variants={sceneVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            ...ANIMATION.cinematic,
            opacity: { duration: 0.6 },
          }}
          className="absolute inset-0"
        >
          <ActiveScene />
        </motion.div>
      </AnimatePresence>

      {/* Scene navigation */}
      <SceneNav currentScene={currentScene} onNavigate={navigateTo} />

      {/* Current scene label — bottom left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="fixed bottom-6 left-6 md:left-8 z-50"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <span className="text-[10px] font-mono text-text-muted/40 tracking-wider">
              {String(currentScene + 1).padStart(2, "0")} / {String(SCENES.length).padStart(2, "0")}
            </span>
            <div className="w-4 h-px bg-sand/30" />
            <span className="text-[9px] uppercase tracking-[0.25em] text-text-muted/30">
              {SCENES[currentScene].label}
            </span>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
