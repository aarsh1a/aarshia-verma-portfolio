"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Tile configuration with individual transparent tile images
const TILES = [
    {
        id: "about",
        label: "About",
        image: "/tile-1.png",
    },
    {
        id: "work",
        label: "How I Work",
        image: "/tile-2.png",
    },
    {
        id: "research",
        label: "Research",
        image: "/tile-3.png",
    },
    {
        id: "projects",
        label: "Projects",
        image: "/tile-4.png",
    },
    {
        id: "contact",
        label: "Leave a Note",
        isExternal: true,
        href: "mailto:contact@example.com",
        image: "/tile-5.png",
    },
];

export function TileNavigation() {
    const [hoveredTile, setHoveredTile] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const observer = useRef<IntersectionObserver | null>(null);

    // Set up IntersectionObserver to track which section is visible
    useEffect(() => {
        observer.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-50% 0px -50% 0px" } // Trigger when section is in middle of screen
        );

        // Observe each section that has a corresponding tile
        TILES.forEach((tile) => {
            const el = document.getElementById(tile.id);
            if (el) {
                observer.current?.observe(el);
            }
        });

        return () => {
            TILES.forEach((tile) => {
                const el = document.getElementById(tile.id);
                if (el) {
                    observer.current?.unobserve(el);
                }
            });
        };
    }, []);

    const handleNavigation = (tile: (typeof TILES)[0]) => {
        if (tile.isExternal && tile.href) {
            window.location.href = tile.href;
            return;
        }

        const section = document.getElementById(tile.id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <nav
            className="hidden lg:block fixed top-1/2 -translate-y-1/2 right-8 z-40"
            aria-label="Section navigation"
        >
            {/* Single column - all tiles stacked vertically */}
            <div className="flex flex-col gap-0">
                {TILES.map((tile, index) => (
                    <TileButton
                        key={tile.id}
                        tile={tile}
                        index={index}
                        hoveredTile={hoveredTile}
                        setHoveredTile={setHoveredTile}
                        handleNavigation={handleNavigation}
                        isActive={activeSection === tile.id}
                    />
                ))}
            </div>
        </nav>
    );
}

interface TileButtonProps {
    tile: (typeof TILES)[0];
    index: number;
    hoveredTile: string | null;
    setHoveredTile: (id: string | null) => void;
    handleNavigation: (tile: (typeof TILES)[0]) => void;
    isActive: boolean;
}

function TileButton({
    tile,
    index,
    hoveredTile,
    setHoveredTile,
    handleNavigation,
    isActive,
}: TileButtonProps) {
    const isHovered = hoveredTile === tile.id;

    return (
        <motion.button
            onClick={() => handleNavigation(tile)}
            onMouseEnter={() => setHoveredTile(tile.id)}
            onMouseLeave={() => setHoveredTile(null)}
            onFocus={() => setHoveredTile(tile.id)}
            onBlur={() => setHoveredTile(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
            className={cn(
                "ceramic-tile-img relative w-16 h-16",
                "transition-all duration-500 ease-out",
                "focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30",
                isHovered ? "ceramic-tile-img-hover" : "",
                isActive && !isHovered ? "ceramic-tile-img-active" : ""
            )}
            style={{
                backgroundImage: `url('${tile.image}')`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
            aria-label={`Navigate to ${tile.label}`}
            aria-current={isActive ? "true" : undefined}
        >
            {/* Hover label */}
            <motion.span
                initial={{ opacity: 0, x: 8 }}
                animate={{
                    opacity: isHovered ? 1 : 0,
                    x: isHovered ? 0 : 8,
                }}
                transition={{ duration: 0.3 }}
                className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap text-[11px] tracking-wide font-sans text-white/70 pointer-events-none"
            >
                {tile.label}
            </motion.span>
        </motion.button>
    );
}
