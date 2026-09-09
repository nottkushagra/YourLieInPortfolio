"use client";

export default function Vignette() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9998]"
      style={{
        background:
          "radial-gradient(ellipse at center, transparent 50%, rgba(8, 10, 14, 0.4) 100%)",
      }}
      aria-hidden="true"
    />
  );
}
