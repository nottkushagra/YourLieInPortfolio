// Animation presets
export const ANIMATION = {
  spring: { type: "spring" as const, stiffness: 300, damping: 24 },
  springBouncy: { type: "spring" as const, stiffness: 400, damping: 17 },
  springGentle: { type: "spring" as const, stiffness: 150, damping: 20 },
  smooth: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const },
  dramatic: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  cinematic: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const },
  dreamy: { duration: 1.8, ease: [0.25, 0.1, 0.25, 1] as const },
  staggerChildren: 0.06,
  staggerSlow: 0.2,
};

// Framer Motion variants
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: ANIMATION.dramatic,
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 },
  },
};

export const fadeInBlur = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: ANIMATION.cinematic,
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: ANIMATION.dramatic,
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: ANIMATION.dramatic,
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: ANIMATION.spring,
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: ANIMATION.staggerChildren,
    },
  },
};

export const staggerContainerSlow = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: ANIMATION.staggerSlow,
    },
  },
};

// Section IDs for navigation & scroll spy
export const SECTIONS = [
  { id: "overture", label: "Overture" },
  { id: "story", label: "The Spring I Found Code" },
  { id: "soundtrack", label: "The Soundtrack" },
  { id: "albums", label: "Albums" },
  { id: "constellations", label: "Constellations" },
  { id: "letters", label: "Letters" },
  { id: "finale", label: "Finale" },
] as const;

// Contact links
export const CONTACT_LINKS = [
  { label: "Email", href: "mailto:kushagra@example.com", icon: "mail" },
  { label: "GitHub", href: "https://github.com/nottkushagra", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/kushagra", icon: "linkedin" },
  { label: "Twitter", href: "https://twitter.com/kushagra", icon: "twitter" },
] as const;
