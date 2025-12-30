"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import BlurFade from "@/components/magicui/blur-fade";

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
        id: "projects",
        label: "projects",
        isPage: true,
        href: "/projects",
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
    const handleNavigation = (tile: (typeof TILES)[0]) => {
        if (tile.isExternal && tile.href) {
            window.location.href = tile.href;
            return;
        }

        if (tile.isPage && tile.href) {
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
        <section id="hero" className="mb-section-lg py-section-md">
            <div className="w-full flex flex-col items-center justify-center space-y-12">
                {/* Header Text */}
                <div className="text-center">
                    <BlurFadeText
                        delay={BLUR_FADE_DELAY}
                        className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-serif"
                        yOffset={8}
                        text="hi, i'm aarshia"
                    />
                </div>

                {/* Horizontal Tile Grid */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                    {TILES.map((tile, index) => (
                        <Tile
                            key={tile.id}
                            tile={tile}
                            index={index}
                            onClick={() => handleNavigation(tile)}
                        />
                    ))}
                </div>

                {/* Description Text */}
                <BlurFade delay={BLUR_FADE_DELAY * 2} className="max-w-2xl text-center">
                    <p className="text-muted-foreground md:text-xl font-sans text-pretty">
                        showcase of things i'm interested in, things i've worked on, and
                        things i'm currently exploring, mostly across computer science,
                        research and systems-oriented problem solving.
                    </p>
                </BlurFade>
            </div>
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

