"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Beat components
import Threshold from "@/components/beats/Threshold";
import Name from "@/components/beats/Name";
import Voice from "@/components/beats/Voice";
import Work from "@/components/beats/Work";
import Craft from "@/components/beats/Craft";
import Horizon from "@/components/beats/Horizon";
import Silence from "@/components/beats/Silence";

// Ambient layers
import FilmGrain from "@/components/ambient/FilmGrain";
import Vignette from "@/components/ambient/Vignette";
import GoldenLight from "@/components/ambient/GoldenLight";
import CustomCursor from "@/components/ambient/CustomCursor";
import Menu from "@/components/ui/Menu";
import LenisProvider from "@/components/providers/LenisProvider";

// R3F petal system — lazy loaded to avoid SSR issues
const PetalSystem = dynamic(
  () => import("@/components/ambient/PetalSystem"),
  { ssr: false }
);

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Keyboard navigation — arrow keys jump between beats
  useEffect(() => {
    const beatIds = [
      "threshold",
      "name",
      "voice",
      "work",
      "craft",
      "horizon",
      "silence",
    ];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") return; // Let Menu handle this

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        const scrollY = window.scrollY;
        for (const id of beatIds) {
          const el = document.getElementById(id);
          if (el && el.offsetTop > scrollY + 50) {
            el.scrollIntoView({ behavior: "smooth" });
            break;
          }
        }
      }

      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        const scrollY = window.scrollY;
        for (let i = beatIds.length - 1; i >= 0; i--) {
          const el = document.getElementById(beatIds[i]);
          if (el && el.offsetTop < scrollY - 50) {
            el.scrollIntoView({ behavior: "smooth" });
            break;
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <LenisProvider>
      {/* Ambient layers — always present */}
      {isMounted && (
        <>
          <FilmGrain />
          <Vignette />
          <GoldenLight />
          {!isMobile && <CustomCursor />}
          {!isMobile && <PetalSystem />}
          <Menu />
        </>
      )}

      {/* The seven beats — continuous scroll */}
      <main className="relative z-[5] world-breathing">
        <Threshold />
        <Name />
        <Voice />
        <Work />
        <Craft />
        <Horizon />
        <Silence />
      </main>
    </LenisProvider>
  );
}
