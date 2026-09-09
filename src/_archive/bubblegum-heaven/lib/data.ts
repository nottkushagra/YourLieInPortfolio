// ── Albums (Projects) ──
export interface Album {
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  github?: string;
  live?: string;
  accentFrom: string;
  accentTo: string;
  comingSoon?: boolean;
}

export const albums: Album[] = [
  {
    title: "Ornamenta",
    subtitle: "A modern jewellery brand, reimagined",
    description:
      "A masculine/unisex jewellery e-commerce platform with API-fetched products, search with debouncing, category filters, dark/light mode, favourites, and scroll-triggered animations. Built to look and feel like a real brand.",
    technologies: ["HTML", "CSS", "JavaScript", "DummyJSON API"],
    github: "https://github.com/nottkushagra/Ornamenta",
    live: "https://nottkushagra.github.io/Ornamenta/",
    accentFrom: "#FFB7D5",
    accentTo: "#C4B5FD",
  },
  {
    title: "SignBridge",
    subtitle: "Breaking communication barriers with AI",
    description:
      "An AI-powered inclusive communication platform that bridges the gap between deaf/mute individuals and the hearing community through real-time sign language recognition, speech-to-text, and text-to-voice.",
    technologies: ["Python", "Computer Vision", "TensorFlow", "Speech APIs"],
    github: "https://github.com/nottkushagra/SignBridge",
    live: "#",
    accentFrom: "#C4B5FD",
    accentTo: "#93C5FD",
  },
  {
    title: "The Next Track",
    subtitle: "The next track is loading...",
    description: "Something new is in the works. Stay tuned.",
    technologies: ["???"],
    accentFrom: "#d4d4d8",
    accentTo: "#a1a1aa",
    comingSoon: true,
  },
];

// ── Memories (Spring Story timeline) ──
export interface Memory {
  year: string;
  title: string;
  description: string;
  accent: string;
}

export const memories: Memory[] = [
  {
    year: "2025",
    title: "Started B.Tech",
    description:
      "The first chapter. Walking into a new world of possibilities, with a laptop and a dream.",
    accent: "#FFB7D5",
  },
  {
    year: "2025",
    title: "Discovered AI",
    description:
      "When I first trained a model and watched it learn — it felt like composing music from noise.",
    accent: "#C4B5FD",
  },
  {
    year: "2026",
    title: "Built Ornamenta",
    description:
      "A jewellery brand brought to life online — bold design, real API data, and every detail crafted with intention.",
    accent: "#93C5FD",
  },
  {
    year: "2026",
    title: "Started SignBridge",
    description:
      "An AI-powered bridge between sign language and speech — because communication shouldn't have barriers.",
    accent: "#A7F3D0",
  },
];

// ── Soundtrack (Skills as genres) ──
export interface Genre {
  title: string;
  subtitle: string;
  accentFrom: string;
  accentTo: string;
  tracks: string[];
}

export const genres: Genre[] = [
  {
    title: "AI",
    subtitle: "The compositions that think",
    accentFrom: "#FDE68A",
    accentTo: "#FFB7D5",
    tracks: ["Machine Learning", "LLMs", "Data Science", "PyTorch", "NLP"],
  },
  {
    title: "Full Stack",
    subtitle: "End-to-end symphonies",
    accentFrom: "#C4B5FD",
    accentTo: "#93C5FD",
    tracks: ["React", "Next.js", "Node.js", "TypeScript", "REST APIs"],
  },
  {
    title: "Backend",
    subtitle: "The rhythm section",
    accentFrom: "#A7F3D0",
    accentTo: "#C4B5FD",
    tracks: ["Python", "Java", "SQL", "Docker", "AWS"],
  },
  {
    title: "Frontend",
    subtitle: "The melody you see",
    accentFrom: "#FFB7D5",
    accentTo: "#FDE68A",
    tracks: ["React", "Tailwind CSS", "Framer Motion", "Three.js", "Figma"],
  },
];

// ── Constellations (Goals / Dreams) ──
export interface Star {
  id: string;
  label: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  size: "sm" | "md" | "lg";
  group: "near" | "aspiration" | "dream";
}

export interface ConstellationLine {
  from: string;
  to: string;
}

export const stars: Star[] = [
  { id: "s1", label: "Ship SignBridge v1", x: 25, y: 30, size: "lg", group: "near" },
  { id: "s2", label: "Learn Rust", x: 40, y: 55, size: "md", group: "near" },
  { id: "s3", label: "Open Source Contribution", x: 15, y: 60, size: "md", group: "near" },
  { id: "s4", label: "Build an AI Product", x: 60, y: 25, size: "lg", group: "aspiration" },
  { id: "s5", label: "Intern at a Top Lab", x: 75, y: 45, size: "md", group: "aspiration" },
  { id: "s6", label: "Publish a Research Paper", x: 55, y: 70, size: "sm", group: "aspiration" },
  { id: "s7", label: "Start a Company", x: 85, y: 20, size: "lg", group: "dream" },
  { id: "s8", label: "Teach & Mentor", x: 80, y: 65, size: "md", group: "dream" },
  { id: "s9", label: "Build Something Unforgettable", x: 70, y: 80, size: "sm", group: "dream" },
];

export const constellationLines: ConstellationLine[] = [
  { from: "s1", to: "s2" },
  { from: "s2", to: "s3" },
  { from: "s1", to: "s4" },
  { from: "s4", to: "s5" },
  { from: "s5", to: "s6" },
  { from: "s4", to: "s7" },
  { from: "s7", to: "s8" },
  { from: "s8", to: "s9" },
  { from: "s6", to: "s9" },
];

// ── Letters to the Future ──
export interface Letter {
  title: string;
  category: "learning" | "reading" | "music" | "vision";
  content: string;
  rotation: number; // slight rotation in degrees
}

export const letters: Letter[] = [
  {
    title: "On Learning",
    category: "learning",
    content:
      "Every day I discover that the more I learn, the less I know. Right now I'm deep into transformer architectures and the mathematics behind attention. It's beautiful how a concept from cognitive science became the backbone of modern AI.",
    rotation: -2,
  },
  {
    title: "Books on My Desk",
    category: "reading",
    content:
      "Currently reading 'Designing Data-Intensive Applications' — it's changing how I think about systems. Also re-reading 'The Pragmatic Programmer' because some wisdom needs revisiting.",
    rotation: 1.5,
  },
  {
    title: "The Playlist",
    category: "music",
    content:
      "Lately it's been a lot of Ludovico Einaudi while coding. There's something about minimalist piano that makes complex problems feel approachable. Also: lo-fi beats for the late-night debugging sessions.",
    rotation: -1,
  },
  {
    title: "Where I'm Headed",
    category: "vision",
    content:
      "I want to build tools that feel invisible — technology that fades into the background and lets humans do what they do best. The intersection of AI and human creativity is where I want to live.",
    rotation: 2.5,
  },
];

// ── Performances (Experience) — kept for reference ──
export interface Performance {
  year: string;
  role: string;
  company: string;
  description: string;
  tracks: string[];
}

export const performances: Performance[] = [
  {
    year: "2025",
    role: "Software Engineering Intern",
    company: "Tech Company",
    description:
      "Built production features and learned to ship code that matters.",
    tracks: [
      "Developed microservice architecture",
      "Reduced API response time by 40%",
      "Led intern demo day presentation",
    ],
  },
  {
    year: "2024",
    role: "AI Research Assistant",
    company: "University Lab",
    description:
      "Explored the intersection of machine learning and human creativity.",
    tracks: [
      "Trained NLP models for sentiment analysis",
      "Published findings in workshop paper",
      "Built data pipeline for 1M+ records",
    ],
  },
  {
    year: "2023",
    role: "Open Source Contributor",
    company: "The Internet",
    description:
      "Discovered the joy of building things that help other developers.",
    tracks: [
      "Contributed to 5+ open-source projects",
      "Built developer tools used by 500+ devs",
      "Organized community hackathon",
    ],
  },
];
