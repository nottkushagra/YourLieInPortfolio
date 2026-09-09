// ── Projects ──
export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string;
  github?: string;
  live?: string;
  atmosphere: "amber" | "cloud" | "plum";
  comingSoon?: boolean;
}

export const projects: Project[] = [
  {
    id: "ornamenta",
    number: "001",
    title: "Ornamenta",
    subtitle: "A modern jewellery brand, reimagined",
    description:
      "A unisex jewellery e-commerce platform built from scratch — API-driven product feeds, intelligent search with debouncing, category filters, theme switching, favourites, and scroll-triggered animations. Every detail crafted to feel like a real brand, not a side project.",
    tech: "HTML · CSS · JavaScript · DummyJSON API",
    github: "https://github.com/nottkushagra/Ornamenta",
    live: "https://nottkushagra.github.io/Ornamenta/",
    atmosphere: "amber",
  },
  {
    id: "signbridge",
    number: "002",
    title: "SignBridge",
    subtitle: "Breaking communication barriers with AI",
    description:
      "An AI-powered inclusive communication platform that bridges the gap between deaf/mute individuals and the hearing community. Real-time sign language recognition through computer vision, speech-to-text transcription, and text-to-voice synthesis — because communication shouldn't have barriers.",
    tech: "Python · Computer Vision · TensorFlow · Speech APIs",
    github: "https://github.com/nottkushagra/SignBridge",
    atmosphere: "cloud",
  },
  {
    id: "next-track",
    number: "003",
    title: "The Next Track",
    subtitle: "Something is being composed.",
    description: "",
    tech: "",
    atmosphere: "plum",
    comingSoon: true,
  },
];

// ── Skills constellation ──
export interface Skill {
  label: string;
  size: "lg" | "md" | "sm";
  opacity: number;
  group: "core" | "inner" | "outer";
}

export const skills: Skill[] = [
  // Core — center, largest, brightest
  { label: "Machine Learning", size: "lg", opacity: 1.0, group: "core" },
  { label: "React", size: "lg", opacity: 1.0, group: "core" },
  { label: "Python", size: "lg", opacity: 0.95, group: "core" },
  { label: "Next.js", size: "lg", opacity: 0.9, group: "core" },
  // Inner ring
  { label: "TypeScript", size: "md", opacity: 0.8, group: "inner" },
  { label: "PyTorch", size: "md", opacity: 0.75, group: "inner" },
  { label: "Node.js", size: "md", opacity: 0.7, group: "inner" },
  { label: "Framer Motion", size: "md", opacity: 0.7, group: "inner" },
  { label: "NLP", size: "md", opacity: 0.65, group: "inner" },
  // Outer ring — dimmest
  { label: "Docker", size: "sm", opacity: 0.45, group: "outer" },
  { label: "AWS", size: "sm", opacity: 0.4, group: "outer" },
  { label: "SQL", size: "sm", opacity: 0.45, group: "outer" },
  { label: "Figma", size: "sm", opacity: 0.4, group: "outer" },
  { label: "Java", size: "sm", opacity: 0.4, group: "outer" },
  { label: "Three.js", size: "sm", opacity: 0.45, group: "outer" },
  { label: "LLMs", size: "sm", opacity: 0.5, group: "outer" },
  { label: "Data Science", size: "sm", opacity: 0.4, group: "outer" },
  { label: "REST APIs", size: "sm", opacity: 0.45, group: "outer" },
  { label: "Tailwind CSS", size: "sm", opacity: 0.4, group: "outer" },
];

// ── Goals (depth layers) ──
export const goals = {
  foreground: ["Ship SignBridge v1", "Learn Rust", "Open Source"],
  midground: ["Build an AI Product", "Intern at a Top Lab", "Research Paper"],
  background: ["Start a Company", "Teach & Mentor", "Build Something Unforgettable"],
};
