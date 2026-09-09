// ── Projects ──
export interface Project {
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  github?: string;
  live?: string;
  accent: string;
  comingSoon?: boolean;
}

export const projects: Project[] = [
  {
    title: "Ornamenta",
    subtitle: "A modern jewellery brand, reimagined",
    description:
      "A masculine/unisex jewellery e-commerce platform with API-fetched products, search with debouncing, category filters, dark/light mode, favourites, and scroll-triggered animations. Built to look and feel like a real brand.",
    technologies: ["HTML", "CSS", "JavaScript", "DummyJSON API"],
    github: "https://github.com/nottkushagra/Ornamenta",
    live: "https://nottkushagra.github.io/Ornamenta/",
    accent: "#8B7355",
  },
  {
    title: "SignBridge",
    subtitle: "Breaking communication barriers with AI",
    description:
      "An AI-powered inclusive communication platform that bridges the gap between deaf/mute individuals and the hearing community through real-time sign language recognition, speech-to-text, and text-to-voice.",
    technologies: ["Python", "Computer Vision", "TensorFlow", "Speech APIs"],
    github: "https://github.com/nottkushagra/SignBridge",
    live: "#",
    accent: "#9C8E7C",
  },
  {
    title: "The Next Track",
    subtitle: "Something new is in the works",
    description: "Stay tuned.",
    technologies: ["???"],
    accent: "#B0A593",
    comingSoon: true,
  },
];

// ── Journey Timeline ──
export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export const milestones: Milestone[] = [
  {
    year: "2025",
    title: "Started B.Tech",
    description:
      "The first chapter. Walking into a new world of possibilities, with a laptop and a dream.",
  },
  {
    year: "2025",
    title: "Discovered AI",
    description:
      "When I first trained a model and watched it learn — it felt like composing music from noise.",
  },
  {
    year: "2026",
    title: "Built Ornamenta",
    description:
      "A jewellery brand brought to life online — bold design, real API data, and every detail crafted with intention.",
  },
  {
    year: "2026",
    title: "Started SignBridge",
    description:
      "An AI-powered bridge between sign language and speech — because communication shouldn't have barriers.",
  },
];

// ── Skills ──
export interface SkillGroup {
  title: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "AI & Machine Learning",
    items: ["Machine Learning", "LLMs", "Data Science", "PyTorch", "NLP"],
  },
  {
    title: "Full Stack",
    items: ["React", "Next.js", "Node.js", "TypeScript", "REST APIs"],
  },
  {
    title: "Backend",
    items: ["Python", "Java", "SQL", "Docker", "AWS"],
  },
  {
    title: "Frontend",
    items: ["Tailwind CSS", "Framer Motion", "Three.js", "Figma"],
  },
];

// ── Goals ──
export interface Goal {
  label: string;
  tier: "near" | "aspiration" | "dream";
}

export const goals: Goal[] = [
  { label: "Ship SignBridge v1", tier: "near" },
  { label: "Learn Rust", tier: "near" },
  { label: "Open Source Contribution", tier: "near" },
  { label: "Build an AI Product", tier: "aspiration" },
  { label: "Intern at a Top Lab", tier: "aspiration" },
  { label: "Publish a Research Paper", tier: "aspiration" },
  { label: "Start a Company", tier: "dream" },
  { label: "Teach & Mentor", tier: "dream" },
  { label: "Build Something Unforgettable", tier: "dream" },
];

// ── Letters / Reflections ──
export interface Reflection {
  title: string;
  content: string;
}

export const reflections: Reflection[] = [
  {
    title: "On Learning",
    content:
      "Every day I discover that the more I learn, the less I know. Right now I'm deep into transformer architectures and the mathematics behind attention. It's beautiful how a concept from cognitive science became the backbone of modern AI.",
  },
  {
    title: "Where I'm Headed",
    content:
      "I want to build tools that feel invisible — technology that fades into the background and lets humans do what they do best. The intersection of AI and human creativity is where I want to live.",
  },
];
