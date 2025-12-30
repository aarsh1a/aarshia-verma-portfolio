"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

interface PostItNote {
    title: string;
    lines: string[];
    rotation?: number;
}

const NOTES: PostItNote[] = [
    {
        title: "education",
        lines: ["b.tech in computer science", "mit, bangalore", "(2023 — present)"],
        rotation: -2,
    },
    {
        title: "open source",
        lines: ["gsoc", "lfx mentorship"],
        rotation: 1.5,
    },
    {
        title: "learning",
        lines: ["systems", "infrastructure", "llms"],
        rotation: -1,
    },
    {
        title: "problem solving",
        lines: ["leetcode", "(ongoing)"],
        rotation: 2,
    },
    {
        title: "building",
        lines: ["projects > polish", "tools > demos"],
        rotation: -1.5,
    },
];

export function PostItSection({ delay = 0 }: { delay?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.section
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay, duration: 0.6 }}
            className="w-full py-12"
        >
            <div className="flex flex-nowrap justify-center gap-3 md:gap-5 overflow-visible pt-4 pb-4">
                {NOTES.map((note, index) => (
                    <PostIt
                        key={note.title}
                        note={note}
                        index={index}
                        delay={delay + 0.1 * index}
                    />
                ))}
            </div>
        </motion.section>
    );
}

function PostIt({
    note,
    index,
    delay,
}: {
    note: PostItNote;
    index: number;
    delay: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: note.rotation || 0 }}
            transition={{ delay, duration: 0.5, ease: "easeOut" }}
            whileHover={{
                scale: 1.05,
                rotate: 0,
                boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                transition: { duration: 0.15 }
            }}
            className="relative w-40 h-40 md:w-60 md:h-60 p-4 cursor-default flex-shrink-0"
            style={{
                background: "linear-gradient(135deg, rgba(255,255,200,0.08) 0%, rgba(255,255,180,0.04) 100%)",
                border: "1px solid rgba(255,255,200,0.15)",
                borderRadius: "2px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
        >
            {/* tape effect at top */}
            <div
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-5"
                style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)",
                    borderRadius: "2px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                }}
            />

            {/* content */}
            <div className="flex flex-col h-full mt-2">
                <h3 className="text-sm font-medium text-foreground/80 mb-3 tracking-wide">
                    {note.title}
                </h3>
                <div className="flex-1 flex flex-col justify-start gap-1">
                    {note.lines.map((line, i) => (
                        <p
                            key={i}
                            className="text-xs md:text-sm text-muted-foreground/70 leading-relaxed"
                        >
                            {line}
                        </p>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default PostItSection;
