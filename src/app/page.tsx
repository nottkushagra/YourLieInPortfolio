"use client";

import React, { useState } from "react";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BioPanel from "@/components/panels/BioPanel";
import WorkPanel from "@/components/panels/WorkPanel";
import MediaPanel from "@/components/panels/MediaPanel";
import CherryPetals from "@/components/ambient/CherryPetals";
import { AudioProvider } from "@/context/AudioContext";

function Dashboard() {
  const [bgChoice, setBgChoice] = useState<"piano" | "warm" | "forest" | "clouds">("piano");

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Background map using user assets
  const bgImages = {
    piano: "/images/ylia-hero.png",
    warm: "/images/ylia-warm.png",
    forest: "/images/twilight_forest_bg.jpg",
    clouds: "/images/ylia/ylia-water-reflection-piano-clouds.jpeg",
  };

  return (
    <div className="relative w-full min-h-screen lg:h-screen lg:max-h-screen overflow-x-hidden lg:overflow-hidden flex flex-col justify-between select-text">
      {/* ── ATMOSPHERIC WARM BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Image
          src={bgImages[bgChoice]}
          alt="Atmospheric Background"
          fill
          className="object-cover object-center opacity-85 scale-100 transition-all duration-700"
          priority
        />
        {/* Eye-soothing ambient warm tint (gentle, not pitch dark) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/40" />
      </div>

      {/* ── GENTLE FLOATING SAKURA PETALS ── */}
      <CherryPetals />

      {/* ── TOP HEADER ── */}
      <Header
        onNavClick={scrollToSection}
        bgChoice={bgChoice}
        onBgChange={setBgChoice}
      />

      {/* ── 3-COLUMN MAIN DASHBOARD (Single-Viewport on Desktop) ── */}
      <main className="relative z-10 flex-1 min-h-0 w-full px-3 md:px-5 py-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3.5 h-full max-w-[1700px] mx-auto">
          {/* Left Column: Bio, Badges, Chatbox, Poll (~28%) */}
          <section
            id="bio"
            className="col-span-1 md:col-span-1 lg:col-span-3 xl:col-span-3 h-full min-h-0 flex flex-col"
          >
            <BioPanel />
          </section>

          {/* Center Column: Projects Showcase, Microblog, Skills (~44%) */}
          <section
            id="projects"
            className="col-span-1 md:col-span-1 lg:col-span-6 xl:col-span-6 h-full min-h-0 flex flex-col"
          >
            <WorkPanel />
          </section>

          {/* Right Column: Music Player, CRT TV, Goals (~28%) */}
          <section
            id="music"
            className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-3 h-full min-h-0 flex flex-col"
          >
            <MediaPanel />
          </section>
        </div>
      </main>

      {/* ── BOTTOM FOOTER ── */}
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <AudioProvider>
      <Dashboard />
    </AudioProvider>
  );
}
