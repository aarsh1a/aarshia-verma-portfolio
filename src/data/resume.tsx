import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon, SparklesIcon } from "lucide-react";

export const DATA = {
  name: "Aarshia Verma",
  initials: "HC",
  url: "https://heilcheng.github.io",
  description:
    "A rising junior with research interests in Mathematical Biology and AI for biomedicine. I'm also a software engineer specializing in AI/ML, and I love building fun, meaningful apps with React Native. On the side, I share my journey with over 10,000 followers on Threads and 25,000 on LinkedIn.",
  summary:
    "I'm a Homo sapiens born and raised in Hong Kong. I also spent a year studying in the UK and semesters in the US and France, experiences that opened my mind and shaped how I see the world.\n\nBefore university, I was that kid obsessed with biology and completely hooked on the Olympiad. I loved exploring the mysteries of life. But after countless hours pipetting in the lab, I started to feel burnt out. I realized I loved biology, just not the endless wet lab work.\n\nAt the same time, I discovered the beauty and speed of simulations, where you can explore complex systems without spilling a single drop. One day, I had a lightbulb moment: \"What if I could use math and code to solve big biology questions instead?\" That idea completely changed my path.\n\nAnd so, here I am, merging my love for biology with the power of math and computation.\n\nWhen I'm not coding or solving equations, you'll find me kayaking, playing tennis, or on a mission to hunt down the best ramen and handmade pasta in Hong Kong (I might have tried them all by now). And when it comes to boba, it's always \"No.1\" at Comebuytea.",
  avatarUrl: "/me.jpeg",

  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
    { href: "/supernova", icon: SparklesIcon, label: "Supernova" },
  ],
  contact: {
    email: "connectaarshia@gmail.com",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/aarsh1a",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/aarshia-verma",
        icon: Icons.linkedin,
        navbar: true,
      },

      email: {
        name: "Send Email",
        url: "mailto:connectaarshia@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  technicalExperience: [
    {
      company: "The Linux Foundation",
      badges: [],
      location: "Hybrid",
      title: "Intern",
      logoUrl: "/lfx.png",
      start: "May 2025",
      end: "Present",
      bullets: [
        "Fine-tuned DeepSeek LLM on 5G telco specs, enabling K8sGPT to generate context-aware diagnostics for Kubernetes clusters with improved accuracy and relevance in live testing.",
        "Designed a RAG pipeline (LangChain + ChromaDB) to inject domain knowledge, boosting context relevance for Kubernetes error explanations."
      ],
    },
  ],
  projects: [
    {
      title: "MEQ-Bench",
      href: "https://github.com/heilcheng/MEQ-Bench",
      dates: "2024 - Present",
      active: true,
      description:
        "The first benchmark designed to evaluate an LLM's ability to generate audience-adaptive medical explanations for diverse stakeholders, including physicians, nurses, and patients.",
      technologies: [
        "Python",
        "LLM",
        "Medical AI",
        "Benchmarking",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/heilcheng/MEQ-Bench",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Gemma Benchmark Suite",
      href: "https://github.com/heilcheng/gemma-benchmark",
      dates: "2024 - Present",
      active: true,
      description:
        "An evaluation suite for Google's Gemma models across academic LLM benchmarks, with quantization support and efficiency profiling.",
      technologies: [
        "Python",
        "LLM",
        "Benchmarking",
        "Quantization",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/heilcheng/gemma-benchmark",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "DeepChem Drug Formulation Tutorial",
      href: "https://github.com/heilcheng/deepchem-drug-formulation",
      dates: "2024 - Present",
      active: true,
      description:
        "A tutorial using DeepChem for predicting key pharmaceutical properties and visualizing molecular behaviors for drug discovery.",
      technologies: [
        "Python",
        "DeepChem",
        "Drug Discovery",
        "Molecular Biology",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/heilcheng/deepchem-drug-formulation",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Truth or Dare (Cantonese)",
      href: "https://github.com/heilcheng/Truth-or-Dare-Canto",
      dates: "2024 - Present",
      active: true,
      description:
        "A Truth or Dare question generator web app built in Cantonese, using React for webapp and React Native for Apps.",
      technologies: [
        "React",
        "React Native",
        "JavaScript",
        "Cantonese",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/heilcheng/Truth-or-Dare-Canto",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
  ],
  books: [
    {
      theme: "Political Philosophy & Social Theory",
      books: [
        {
          title: "The Social Contract",
          author: "Jean-Jacques Rousseau",
          number: 1,
        },
        {
          title: "On Liberty",
          author: "John Stuart Mill",
          number: 2,
        },
        {
          title: "Distinction: A Social Critique of the Judgement of Taste",
          author: "Pierre Bourdieu",
          number: 3,
        },
        {
          title: "The Spirit of the Laws",
          author: "Montesquieu",
          number: 4,
        },
      ],
    },
    {
      theme: "Contemporary Philosophy",
      books: [
        {
          title: "Agonie des Eros",
          author: "Byung-Chul Han",
          number: 5,
        },
        {
          title: "Thus Spoke Zarathustra",
          author: "Friedrich Nietzsche",
          number: 6,
        },
      ],
    },
    {
      theme: "History & Global Affairs",
      books: [
        {
          title: "A Concise History of Hong Kong",
          author: "John M. Carroll",
          number: 7,
        },
        {
          title: "Understanding Global Conflict and Cooperation",
          author: "David A. Welch and Joseph S. Nye, Jr.",
          number: 8,
        },
      ],
    },
    {
      theme: "Digital Life & Privacy",
      books: [
        {
          title: "The Art of Invisibility",
          author: "Kevin Mitnick",
          number: 9,
        },
        {
          title: "Digital Minimalism",
          author: "Cal Newport",
          number: 10,
        },
      ],
    },
    {
      theme: "Memoir & Personal Reflections",
      books: [
        {
          title: "The Watching Brief",
          author: "Margaret Ng Ngoi Yee",
          number: 11,
        },
      ],
    },
  ],
} as const;
