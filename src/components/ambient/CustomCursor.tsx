"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lerpPos = useRef({ x: -100, y: -100 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    // Hide on touch devices
    if ("ontouchstart" in window) return;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor='interactive']")
      ) {
        setIsHovering(true);
      }
    };

    const onOut = () => setIsHovering(false);
    const onDown = () => setIsHidden(true);
    const onUp = () => setIsHidden(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    // Lerp animation loop
    const lerp = () => {
      lerpPos.current.x += (pos.x - lerpPos.current.x) * 0.15;
      lerpPos.current.y += (pos.y - lerpPos.current.y) * 0.15;
      animRef.current = requestAnimationFrame(lerp);
    };
    animRef.current = requestAnimationFrame(lerp);

    // Hide default cursor
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(animRef.current);
      document.body.style.cursor = "";
    };
  }, [pos.x, pos.y]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10001] rounded-full"
        style={{
          width: isHovering ? 12 : 8,
          height: isHovering ? 12 : 8,
          backgroundColor: "var(--color-cream)",
          x: pos.x - (isHovering ? 6 : 4),
          y: pos.y - (isHovering ? 6 : 4),
          opacity: isHidden ? 0 : 0.6,
          mixBlendMode: "difference",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full border"
        style={{
          width: isHovering ? 44 : 28,
          height: isHovering ? 44 : 28,
          borderColor: "rgba(243, 240, 234, 0.1)",
          x: pos.x - (isHovering ? 22 : 14),
          y: pos.y - (isHovering ? 22 : 14),
          opacity: isHidden ? 0 : 0.3,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
    </>
  );
}
