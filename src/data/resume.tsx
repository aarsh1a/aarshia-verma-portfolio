import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon, Orbit, FolderKanban } from "lucide-react";

export const DATA = {
  name: "aarshia verma",
  initials: "AV",
  url: "https://aarshiaverma.vercel.app",
  description:
    ".",
  summary:
    ".",
  avatarUrl: "/me.jpeg",

  navbar: [
    { href: "/", icon: HomeIcon, label: "home" },
    { href: "/projects", icon: FolderKanban, label: "projects" },
    { href: "/blog", icon: NotebookIcon, label: "blog" },
  ],
  contact: {
    email: "connectaarshia@gmail.com",
    social: {
      github: {
        name: "github",
        url: "https://github.com/aarsh1a",
        icon: Icons.github,
        navbar: true,
      },
      linkedin: {
        name: "linkedin",
        url: "https://linkedin.com/in/aarshia-verma",
        icon: Icons.linkedin,
        navbar: true,
      },
    },
  },

  technicalExperience: [
    {
      company: "The Linux Foundation",
      badges: [],
      location: "Bangalore, India",
      title: "Intern",
      logoUrl: "/lfx.png",
      start: "May 2025",
      end: "August 2025",
      bullets: [
        <>k8sgpt is designed to work across generic kubernetes clusters. i focused on making it more useful for <strong>5g telco setups</strong> by teaching it to reason using telco-specific specs through a rag-based approach.</>,
        <>implemented the rag pipeline using <strong>langchain + chromadb with deepseek LLM</strong>, so diagnostics were grounded in real domain knowledge instead of generic, context-less explanations.</>,
        <>designed a lightweight frontend ui <strong>(typescript + js)</strong> so on-site engineers could actually use the system, cutting down time wasted reading hard-to-parse logs during live debugging.</>,
      ],
      tldr: <>worked to make a generalized kubernetes debugging tool more useful for <strong>5g telco setups</strong> using a rag designed on telco-specific specs fed into deepseek llm.</>,
    },
  ],
  projects: [] as {
    title: string;
    href: string;
    dates: string;
    active: boolean;
    description: string;
    technologies: string[];
    links: {
      type: string;
      href: string;
      icon: any;
    }[];
    image?: string;
    video?: string;
  }[],
  research: {
    published: [
      {
        title: "Pushing the Frontiers: Integrating Artificial Intelligence to Transform Exoplanet Analysis",
        venue: "IAC 2024",
        year: "2024",
        link: "https://dl.iafastro.directory/event/IAC-2024/paper/85813/",
        abstract: "Using generative AI models for exoplanet data analysis, feature extraction from light curves, and orbital characterization.",
      },
      {
        title: "Cryo-Sleep in Space Exploration: A Viable Solution for Long-Term Space Travel",
        venue: "GLEX 2025",
        year: "2025",
        link: "https://dl.iafastro.directory/event/GLEX-2025/paper/93485/",
        abstract: "Examining therapeutic hypothermia for deep space missions, AI-enhanced life support, and metabolic stasis systems.",
      },
    ],
    inProgress: [
      {
        title: "EarthRAG",
        venue: "SPAICE 2026",
        status: "building",
      },
    ],
    interests: [
      "AI/ML for Scientific Discovery",
      "Space Exploration & Astrobiology",
      "Mathematical Biology",
      "Generative Models",
    ],
    aspirations: [
      "CERN",
      "SSRF",
      "International Research Programs",
    ],
  },
} as const;
