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
  projects: [
    {
      title: "k8sgpt-telco-rag",
      href: "https://github.com/aarsh1a/k8sgpt-telco-rag",
      dates: "may 2025 - august 2025",
      active: true,
      description: "k8sgpt is designed to work across generic kubernetes clusters. i focused on making it more useful for 5g telco setups by teaching it to reason using telco-specific specs through a rag-based approach.",
      technologies: ["python", "javascript", "langchain", "kubernetes", "k8sgpt", "gcp", "chromadb", "deepseek", "react", "tailwindcss", "nextjs", "supabase"],
      links: [
        {
          type: "Source",
          href: "https://github.com/aarsh1a/k8sgpt-telco-rag",
          icon: Icons.github,
        },
      ],
    },
    {
      title: "earthRAG",
      href: "https://github.com/aarsh1a/earthRAG",
      dates: "dec 2025 - present",
      active: true,
      description: "i’m researching the use of a retrieval-augmented generation (rag) model for natural language querying of earth observation data. the goal is to make satellite imagery more accessible and explainable using llms. this project is for my spaice 2026 short paper submission.",
      technologies: ["python", "pytorch", "huggingface transformers", "faiss", "llama or mistral (llm)", "terraMind (eo vision encoder)", "sentinel-2 satellite data", "openstreetmap", "wikipedia api", "noaa/climate datasets", "vector databases", "retrieval-augmented generation (rag)", "google earth engine (optional)", "pandas", "scikit-learn"],
      links: [
        {
          type: "Source",
          href: "https://github.com/aarsh1a/earthRAG",
          icon: Icons.github,
        },
      ],
    },
    {
      title: "pinterest-mac-app",
      href: "https://github.com/aarsh1a/pinterest-mac-app",
      dates: "nov 2025",
      active: true,
      description: "created a desktop mac app for pinterest purely out of my own need for it.",
      technologies: ["electron", "node.js", "javascript", "html", "css", "macos app packaging", "chromium engine"],
      links: [
        {
          type: "Source",
          href: "https://github.com/aarsh1a/pinterest-mac-app",
          icon: Icons.github,
        },
      ],
    },
    {
      title: "skinly",
      href: "https://github.com/aarsh1a/skinly",
      dates: "nov 2025 - present",
      active: true,
      description: "skinly is an ai powered user-first skincare analysis tool i built to break down product ingredients, check compatibility, and flag potential skin concerns.",
      technologies: ["python", "fastapi", "javascript", "electron", "framer motion", "llm integration", "nlp", "ocr", "api integration", "rule - based systems", "data validation"],
      links: [
        {
          type: "Source",
          href: "https://github.com/aarsh1a/skinly",
          icon: Icons.github,
        },
      ],
    },
    {
      title: "blackhole - visual",
      href: "https://github.com/aarsh1a/blackhole-visual",
      dates: "nov 2025 - present",
      active: true,
      description: "a simple interactive blackhole visualization to uderstand spacetime distortion and experience it - based on nasa released blackhole video",
      technologies: ["javascript", "webgl", "three.js", "glsl", "html", "css", "shader programming", "mathematical modeling", "real-time rendering"],
      links: [
        {
          type: "Source",
          href: "https://github.com/aarsh1a/blackhole-visual",
          icon: Icons.github,
        },
      ],
    },
  ],
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
