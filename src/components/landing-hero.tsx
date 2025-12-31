"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import BlurFade from "@/components/magicui/blur-fade";
import { X, Download } from "lucide-react";

const TILES = [
    {
        id: "tech-stack",
        label: "how i work",
        image: "/tile-1.png",
    },
    {
        id: "about-me",
        label: "notes",
        image: "/tile-2.png",
    },
    {
        id: "resume",
        label: "resume",
        isResume: true,
        image: "/tile-3.png",
    },
    {
        id: "research",
        label: "research",
        image: "/tile-4.png",
    },
    {
        id: "contact",
        label: "leave a note",
        isExternal: true,
        href: "mailto:contact@example.com",
        image: "/tile-5.png",
    },
];

const BLUR_FADE_DELAY = 0.04;

export function LandingHero() {
    const [showResume, setShowResume] = useState(false);

    const handleNavigation = (tile: (typeof TILES)[0]) => {
        if (tile.isResume) {
            setShowResume(true);
            return;
        }

        if (tile.isExternal && tile.href) {
            window.location.href = tile.href;
            return;
        }

        const section = document.getElementById(tile.id);
        if (section) {
            const offset = 100; // pixels from top - adjust this value
            const elementPosition = section.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: "smooth"
            });
        }
    };

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center pb-24 relative overflow-hidden">
            {/* Subtle background stars - Truly randomized distribution */}
            <div className="absolute inset-0 pointer-events-none">
                {/* 4-point stars - scattered everywhere */}
                {/* 4-point stars - scattered everywhere */}
                {[
                    // Top area
                    { x: 10, y: 10, size: 12, delay: 0.2 },
                    { x: 90, y: 8, size: 10, delay: 0.8 },
                    { x: 50, y: 15, size: 8, delay: 1.5 },
                    // Upper Middle area
                    { x: 5, y: 30, size: 10, delay: 2.1 },
                    { x: 95, y: 35, size: 12, delay: 0.5 },
                    { x: 15, y: 45, size: 8, delay: 1.2 },
                    // Lower Middle area (capped at 65% height)
                    { x: 8, y: 55, size: 10, delay: 1.8 },
                    { x: 85, y: 60, size: 12, delay: 0.3 },
                ].map((star, i) => (
                    <motion.svg
                        key={`star-${i}`}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="absolute text-white"
                        style={{
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                            width: star.size,
                            height: star.size,
                        }}
                        animate={{
                            opacity: [0.15, 0.4, 0.15],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: star.delay,
                            ease: "easeInOut",
                        }}
                    >
                        <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                    </motion.svg>
                ))}

                {/* Circular dots - Random starfield */}
                {[
                    // Top third (0-33%)
                    { x: 5, y: 5, size: 1.5, delay: 0.1 },
                    { x: 25, y: 12, size: 2, delay: 1.1 },
                    { x: 45, y: 8, size: 1.5, delay: 0.6 },
                    { x: 75, y: 15, size: 2, delay: 1.6 },
                    { x: 95, y: 12, size: 1.5, delay: 2.1 },
                    { x: 60, y: 20, size: 2, delay: 0.4 },

                    // Middle third (33-50%)
                    { x: 8, y: 35, size: 1.5, delay: 0.9 },
                    { x: 38, y: 32, size: 2, delay: 1.4 },
                    { x: 68, y: 40, size: 1.5, delay: 1.9 },
                    { x: 92, y: 45, size: 2, delay: 0.2 },
                    { x: 22, y: 48, size: 1.5, delay: 1.2 },
                    { x: 52, y: 42, size: 1, delay: 0.7 },

                    // Lower third (capped at 65%)
                    { x: 12, y: 55, size: 2, delay: 1.7 },
                    { x: 78, y: 58, size: 1.5, delay: 0.3 },
                    { x: 96, y: 62, size: 2, delay: 2.2 },
                    { x: 32, y: 60, size: 1.5, delay: 0.8 },
                    { x: 58, y: 65, size: 1, delay: 1.3 },
                    { x: 88, y: 52, size: 2, delay: 0.5 },

                    // Random scatter (all high up)
                    { x: 18, y: 25, size: 1, delay: 1.0 },
                    { x: 82, y: 28, size: 1.5, delay: 0.5 },
                    { x: 35, y: 50, size: 1, delay: 1.5 },
                    { x: 72, y: 22, size: 1.5, delay: 2.0 },
                ].map((dot, i) => (
                    <motion.div
                        key={`dot-${i}`}
                        className="absolute rounded-full bg-white"
                        style={{
                            left: `${dot.x}%`,
                            top: `${dot.y}%`,
                            width: dot.size,
                            height: dot.size,
                        }}
                        animate={{
                            opacity: [0.1, 0.35, 0.1],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 3 + Math.random(),
                            repeat: Infinity,
                            delay: dot.delay,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            <div className="w-full flex flex-col items-center justify-center space-y-12 relative z-10">
                {/* Header Text */}
                <div className="text-center">
                    <BlurFadeText
                        delay={BLUR_FADE_DELAY}
                        className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
                        text="hi, i'm aarshia"
                    />
                </div>

                {/* Tiles Row */}
                <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
                    <div className="flex flex-row items-center justify-center gap-4 md:gap-6">
                        {TILES.map((tile, index) => (
                            <Tile
                                key={tile.id}
                                tile={tile}
                                index={index}
                                onClick={() => handleNavigation(tile)}
                            />
                        ))}
                    </div>
                </BlurFade>

                {/* Description Text */}
                <BlurFade delay={BLUR_FADE_DELAY * 2} className="max-w-2xl text-center">
                    <p className="text-muted-foreground md:text-xl font-sans text-pretty">
                        showcase of things i&apos;m interested in, things i&apos;ve worked on, and
                        things i&apos;m currently exploring, mostly across computer science,
                        research and systems-oriented problem solving.
                    </p>
                </BlurFade>
            </div>

            {/* Resume Modal */}
            <AnimatePresence>
                {showResume && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowResume(false)}
                            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none"
                        >
                            <div
                                className="relative w-full max-w-5xl h-[90vh] rounded-xl bg-card overflow-hidden pointer-events-auto"
                                style={{
                                    boxShadow: "0 0 40px rgba(236,72,153,0.3), 0 25px 50px rgba(0,0,0,0.5)",
                                    border: "1px solid rgba(236,72,153,0.4)",
                                }}
                            >
                                {/* Header */}
                                <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-card">
                                    <span className="text-sm font-medium text-foreground/80">resume</span>
                                    <div className="flex items-center gap-2">
                                        <a
                                            href="/resume.pdf"
                                            download="AarshiaVerma_BtechCSE.pdf"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                const link = document.createElement('a');
                                                link.href = '/resume.pdf';
                                                link.download = 'AarshiaVerma_BtechCSE.pdf';
                                                document.body.appendChild(link);
                                                link.click();
                                                document.body.removeChild(link);
                                            }}
                                            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                                            title="Download"
                                        >
                                            <Download size={18} />
                                        </a>
                                        <button
                                            onClick={() => setShowResume(false)}
                                            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                </div>

                                {/* PDF Embed */}
                                <iframe
                                    src="/resume.pdf#toolbar=0&navpanes=0"
                                    className="w-full h-[calc(100%-52px)] bg-white"
                                    title="Resume"
                                />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}

function Tile({
    tile,
    index,
    onClick,
}: {
    tile: (typeof TILES)[0];
    index: number;
    onClick: () => void;
}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="relative flex flex-col items-center">
            <motion.button
                onClick={onClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                    "ceramic-tile-img w-20 h-20 md:w-24 md:h-24 rounded-lg",
                    "transition-all duration-300 ease-out",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                )}
                style={{
                    backgroundImage: `url('${tile.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
                aria-label={`Navigate to ${tile.label}`}
            />
            {/* Hover tooltip - absolute so it doesn't affect layout */}
            <AnimatePresence>
                {isHovered && (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-foreground/80 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md border border-border/50 shadow-sm pointer-events-none"
                    >
                        {tile.label}
                    </motion.span>
                )}
            </AnimatePresence>
        </div>
    );
}
