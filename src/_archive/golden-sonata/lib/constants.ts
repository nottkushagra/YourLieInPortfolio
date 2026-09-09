// Animation presets — editorial, cinematic
export const ANIMATION = {
  spring: { type: "spring" as const, stiffness: 200, damping: 28 },
  springGentle: { type: "spring" as const, stiffness: 120, damping: 20 },
  smooth: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  cinematic: { duration: 1.0, ease: [0.16, 1, 0.3, 1] as const },
  dreamy: { duration: 1.6, ease: [0.25, 0.1, 0.25, 1] as const },
  editorial: { duration: 0.8, ease: [0.33, 1, 0.68, 1] as const },
  staggerChildren: 0.08,
  staggerSlow: 0.15,
};

// Scene definitions
export const SCENES = [
  { id: "hero", label: "Overture" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

// Framer Motion variants — editorial
export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: ANIMATION.editorial,
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8 },
  },
};

export const fadeInBlur = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: ANIMATION.cinematic,
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

// Scene transition variants
export const sceneVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 40 : -40,
    filter: "blur(4px)",
  }),
  center: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? -30 : 30,
    filter: "blur(4px)",
  }),
};

// Contact links
export const CONTACT_LINKS = [
  { label: "Email", href: "mailto:kushagra@example.com", icon: "mail" },
  { label: "GitHub", href: "https://github.com/nottkushagra", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/kushagra", icon: "linkedin" },
  { label: "Twitter", href: "https://twitter.com/kushagra", icon: "twitter" },
] as const;
