// ── Animation presets ──
export const EASE = {
  cinematic: [0.16, 1, 0.3, 1] as const,
  editorial: [0.33, 1, 0.68, 1] as const,
  dreamy: [0.25, 0.1, 0.25, 1] as const,
  instant: [0.5, 0, 0, 1] as const,
};

export const SPRING = {
  physical: { type: "spring" as const, stiffness: 80, damping: 20 },
  gentle: { type: "spring" as const, stiffness: 60, damping: 18 },
  snappy: { type: "spring" as const, stiffness: 200, damping: 28 },
};

export const DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.8,
  cinematic: 1.2,
  dreamy: 1.6,
};

// ── Beat names (for Menu) ──
export const BEATS = [
  { id: "threshold", label: "The Threshold" },
  { id: "name", label: "The Name" },
  { id: "voice", label: "The Voice" },
  { id: "work", label: "The Work" },
  { id: "craft", label: "The Craft" },
  { id: "horizon", label: "The Horizon" },
  { id: "silence", label: "The Silence" },
] as const;

// ── Contact links ──
export const CONTACT_LINKS = [
  { label: "kushsh007@gmail.com", href: "mailto:kushsh007@gmail.com", accent: "golden" },
  { label: "github.com/nottkushagra", href: "https://github.com/nottkushagra", accent: "cream" },
  { label: "linkedin.com/in/nott-kushagra", href: "https://linkedin.com/in/nott-kushagra/", accent: "cloud" },
] as const;
