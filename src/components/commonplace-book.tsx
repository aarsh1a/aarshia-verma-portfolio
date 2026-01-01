"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { DATA } from "@/data/resume";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

interface CommonplaceBookProps {
    delay?: number;
}

// 4-pointed star (like the boxed version in the image)
const FourPointStar = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
    </svg>
);

// Fibonacci spiral
const GoldenSpiral = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <svg className={className} style={style} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
        {/* Outer arc */}
        <path d="M95 95 A55 55 0 0 1 40 95" />
        {/* Medium arc */}
        <path d="M40 95 A35 35 0 0 1 40 60" />
        {/* Smaller arc */}
        <path d="M40 60 A22 22 0 0 1 62 60" />
        {/* Tiny arc */}
        <path d="M62 60 A14 14 0 0 1 62 74" />
        {/* Grid lines */}
        <line x1="40" y1="5" x2="40" y2="95" strokeOpacity="0.3" />
        <line x1="5" y1="60" x2="95" y2="60" strokeOpacity="0.3" />
        <line x1="62" y1="40" x2="62" y2="80" strokeOpacity="0.2" />
        <line x1="50" y1="60" x2="75" y2="60" strokeOpacity="0.2" />
        {/* Small circle at center */}
        <circle cx="58" cy="67" r="2" fill="currentColor" />
    </svg>
);

// Lotus stamp (like the red seal)
const Lotus = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <svg className={className} style={style} viewBox="0 0 30 60" fill="currentColor">
        {/* Outer frame */}
        <rect x="2" y="2" width="26" height="56" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        {/* Lotus petals */}
        <ellipse cx="15" cy="18" rx="4" ry="7" />
        <ellipse cx="10" cy="20" rx="3" ry="6" transform="rotate(-20 10 20)" />
        <ellipse cx="20" cy="20" rx="3" ry="6" transform="rotate(20 20 20)" />
        <ellipse cx="7" cy="23" rx="2.5" ry="5" transform="rotate(-40 7 23)" />
        <ellipse cx="23" cy="23" rx="2.5" ry="5" transform="rotate(40 23 23)" />
        {/* Stem */}
        <path d="M15 26 Q12 35 15 50" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
);

export const CommonplaceBook = ({ delay = 0 }: CommonplaceBookProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 30, stiffness: 300 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay, duration: 0.6 }}
            className="w-full"
        >
            <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="relative w-screen -ml-[50vw] left-1/2 overflow-hidden"
                style={{ minHeight: "620px" }}
            >
                {/* Dark background */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(180deg, rgba(8,8,12,1) 0%, rgba(12,12,18,1) 50%, rgba(8,8,12,1) 100%)",
                    }}
                />

                {/* Gradient glow orbs - aurora effect */}
                <div
                    className="absolute top-[15%] left-[5%] w-[500px] h-[400px] rounded-full pointer-events-none"
                    style={{
                        background: "radial-gradient(ellipse, rgba(60,100,140,0.15) 0%, rgba(40,80,120,0.05) 50%, transparent 70%)",
                        filter: "blur(60px)",
                    }}
                />
                <div
                    className="absolute bottom-[10%] right-[10%] w-[400px] h-[350px] rounded-full pointer-events-none"
                    style={{
                        background: "radial-gradient(ellipse, rgba(160,100,60,0.12) 0%, rgba(140,80,40,0.04) 50%, transparent 70%)",
                        filter: "blur(50px)",
                    }}
                />
                <div
                    className="absolute top-[40%] right-[25%] w-[300px] h-[300px] rounded-full pointer-events-none"
                    style={{
                        background: "radial-gradient(ellipse, rgba(100,60,120,0.08) 0%, transparent 60%)",
                        filter: "blur(45px)",
                    }}
                />

                {/* DECORATIVE ELEMENTS */}

                {/* Fibonacci spiral - large, positioned nicely */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 0.25, scale: 1 }}
                    transition={{ delay: delay + 0.5, duration: 0.8 }}
                    className="absolute top-16 right-[8%]"
                >
                    <GoldenSpiral className="w-36 h-36 text-white/30" />
                </motion.div>

                {/* Sparkle cluster with glow and twinkle */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        delay: delay + 0.6,
                        opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    }}
                    className="absolute bottom-16 left-[6%]"
                    style={{
                        filter: "drop-shadow(0 0 12px rgba(255,255,255,0.35)) invert(1)",
                    }}
                >
                    <Image
                        src="/sparkle-cluster.png"
                        alt=""
                        width={180}
                        height={180}
                        className="w-[180px] h-auto object-contain"
                    />
                </motion.div>

                {/* Lotus stamp */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.3, y: 0 }}
                    transition={{ delay: delay + 0.7, duration: 0.5 }}
                    className="absolute top-[35%] right-[4%]"
                >
                    <Lotus className="w-10 h-20 text-white/20" />
                </motion.div>

                {/* 4-point stars - subtle accents */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.5, scale: [1, 1.15, 1] }}
                    transition={{ delay: delay + 0.4, scale: { duration: 3, repeat: Infinity } }}
                    className="absolute top-28 left-[20%]"
                >
                    <FourPointStar className="w-4 h-4 text-white/50" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4, scale: [1, 1.2, 1] }}
                    transition={{ delay: delay + 0.5, scale: { duration: 4, repeat: Infinity } }}
                    className="absolute bottom-32 right-[18%]"
                >
                    <FourPointStar className="w-3 h-3 text-amber-200/40" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3, scale: [1, 1.3, 1] }}
                    transition={{ delay: delay + 0.6, scale: { duration: 2.5, repeat: Infinity } }}
                    className="absolute top-[55%] left-[12%]"
                >
                    <FourPointStar className="w-2 h-2 text-blue-200/40" />
                </motion.div>

                {/* Interactive cursor */}
                <motion.div
                    className="absolute pointer-events-none z-30"
                    style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }}
                >
                    <motion.div
                        animate={{ opacity: isHovering ? 1 : 0, scale: isHovering ? 1 : 0.5 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div
                            className="w-32 h-32 rounded-full"
                            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%)" }}
                        />
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        >
                            <FourPointStar className="w-3 h-3 text-white/40" />
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* CONTENT */}
                <div className="relative z-10 max-w-5xl mx-auto px-8 py-14">

                    {/* Masthead */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: delay + 0.2, duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <div className="flex items-center justify-center gap-4 mb-2">
                            <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/20" />
                            <FourPointStar className="w-3 h-3 text-white/40" />
                            <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/20" />
                        </div>
                        <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white/95">
                            the commonplace book
                        </h2>
                        <p className="text-[10px] text-white/30 tracking-[0.4em] uppercase mt-3">
                            research & ideas
                        </p>
                    </motion.div>

                    {/* Main grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

                        {/* Left - Published */}
                        <motion.div
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: delay + 0.3, duration: 0.5 }}
                            className="md:col-span-5"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-white/50">
                                    Published
                                </h3>
                                <div className="h-px flex-1 bg-white/10" />
                            </div>

                            <div className="space-y-6">
                                {DATA.research.published.map((paper, idx) => (
                                    <motion.a
                                        key={paper.title}
                                        href={paper.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: delay + 0.4 + idx * 0.1 }}
                                        className="block group"
                                    >
                                        <div className="flex gap-4">
                                            <span className="font-serif text-3xl font-light text-white/15">
                                                {String(idx + 1).padStart(2, '0')}
                                            </span>
                                            <div className="flex-1 pb-5 border-b border-white/5">
                                                <h4 className="font-serif text-base text-white/80 leading-snug group-hover:text-white transition-colors">
                                                    {paper.title}
                                                </h4>
                                                <div className="flex items-center gap-3 mt-2">
                                                    <span className="text-[10px] text-white/35 uppercase tracking-wider">
                                                        {paper.venue}
                                                    </span>
                                                    <ExternalLink size={10} className="text-white/20 group-hover:text-white/50 transition-colors" />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>

                            {/* In Progress */}
                            <div className="mt-8 pl-4 border-l border-white/10">
                                <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-3">
                                    Research Notes
                                </h3>
                                <a
                                    href="https://drive.google.com/file/d/1LoUkmNktbiol1c3wRKMgRmddc-PJXcPZ/view?usp=sharing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-white/60 mb-2 cursor-pointer hover:text-white/80 transition-colors group"
                                >
                                    <FourPointStar className="w-2 h-2 text-white/40" />
                                    <span>k8sgpt for 5g telco clusters</span>
                                    <ExternalLink size={10} className="text-white/20 group-hover:text-white/50 transition-colors" />
                                </a>
                            </div>

                            {/* Building */}
                            <div className="mt-6 pl-4 border-l border-white/10">
                                <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-3">
                                    Building
                                </h3>
                                {DATA.research.inProgress.map((work) => (
                                    <div key={work.title} className="flex items-center gap-2 text-sm text-white/60">
                                        <motion.span
                                            animate={{ opacity: [0.4, 1, 0.4] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="w-1.5 h-1.5 rounded-full bg-green-400"
                                        />
                                        <span>{work.title}</span>
                                        <span className="text-[9px] text-white/25 uppercase">{work.venue}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right - Featured + Interests */}
                        <motion.div
                            initial={{ opacity: 0, x: 15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: delay + 0.35, duration: 0.5 }}
                            className="md:col-span-7"
                        >
                            {/* Featured - k8sgpt */}
                            <div
                                className="p-4 rounded-xl mb-8"
                                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)", border: "1px solid rgba(255,255,255,0.06)" }}
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <FourPointStar className="w-2 h-2 text-white/40" />
                                    <span className="text-[9px] text-white/30 uppercase tracking-[0.2em]">research note / technical whitepaper</span>
                                </div>

                                <h4 className="font-serif text-xl sm:text-2xl font-bold text-white/90 leading-tight">
                                    k8sgpt for 5g telco systems
                                </h4>

                                <p className="text-sm text-white/50 mt-4 leading-relaxed">
                                    a comparison of existing kubernetes debugging tools showed strong general performance but limited relevance for 5g telco deployments. consequently, a retrieval-augmented generation (rag) architecture was adopted, combining a deepseek llm with telco specifications as an external knowledge source.
                                </p>

                                <div className="mt-5">
                                    <span className="text-[9px] text-white/30 uppercase tracking-[0.2em]">methods</span>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <span className="text-xs text-white/50 px-2 py-1 border border-white/10 rounded">rag (langchain + chromadb)</span>
                                        <span className="text-xs text-white/50 px-2 py-1 border border-white/10 rounded">deepseek llm</span>
                                        <span className="text-xs text-white/50 px-2 py-1 border border-white/10 rounded">telco specs as retrieval corpus</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                                    <span className="text-[10px] text-white/30 uppercase tracking-wider">
                                        linux foundation • 2025
                                    </span>
                                    <a
                                        href="https://drive.google.com/file/d/1LoUkmNktbiol1c3wRKMgRmddc-PJXcPZ/view?usp=sharing"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[10px] text-white/40 hover:text-white transition-colors flex items-center gap-1"
                                    >
                                        read more →
                                    </a>
                                </div>
                            </div>

                            {/* Current Focus */}
                            <div>
                                <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-4">
                                    Current Focus
                                </h3>
                                <ul className="space-y-2">
                                    <li className="text-sm text-white/55 flex items-start gap-2">
                                        <FourPointStar className="w-2 h-2 text-white/40 mt-1.5 flex-shrink-0" />
                                        <span>ai/ml for scientific and systems-driven research</span>
                                    </li>
                                    <li className="text-sm text-white/55 flex items-start gap-2">
                                        <FourPointStar className="w-2 h-2 text-white/40 mt-1.5 flex-shrink-0" />
                                        <span>retrieval-augmented systems - grounding models in domain knowledge (infra docs, real data)</span>
                                    </li>
                                    <li className="text-sm text-white/55 flex items-start gap-2">
                                        <FourPointStar className="w-2 h-2 text-white/40 mt-1.5 flex-shrink-0" />
                                        <span>space exploration and long-horizon research</span>
                                    </li>
                                    <li className="text-sm text-white/55 flex items-start gap-2">
                                        <FourPointStar className="w-2 h-2 text-white/40 mt-1.5 flex-shrink-0" />
                                        <span>generative models as tools</span>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CommonplaceBook;
