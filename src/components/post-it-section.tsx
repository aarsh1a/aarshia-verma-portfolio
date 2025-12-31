"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

interface PostItLine {
    text: string;
    href?: string;
}

interface PostItNote {
    title: string;
    lines: (string | PostItLine)[];
    rotation?: number;
}

const NOTES: PostItNote[] = [
    {
        title: "education",
        lines: ["b.tech in computer science", "manipal institute of technology, bangalore  ", "(2023 — 2027)"],
        rotation: -2,
    },
    {
        title: "certifications",
        lines: [
            { text: "- ai agents with transformers", href: "https://drive.google.com/file/d/1ebXMZHP0kF_u-yp9Winq3gmZGc45J_ch/view?usp=sharing" },
            { text: "- langchain for llm apps", href: "https://learn.deeplearning.ai/accomplishments/e300a47c-dcf3-40f6-80df-ee73434764a3?usp=sharing" },
            { text: "- networking & initial config", href: "https://www.credly.com/badges/fc0c2088-d913-439b-b87d-1fb8363a147e/public_url" },
            { text: "- kubernetes pod management", href: "https://www.coursera.org/account/accomplishments/verify/DAWQDHW5S4J1" },
            { text: "- software arch job simulation", href: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/pmnMSL4QiQ9JCgE3W/kkE9HyeNcw6rwCRGw_pmnMSL4QiQ9JCgE3W_XAxaxQdaqA7aneDCN_1751802473014_completion_certificate.pdf" },
        ],
        rotation: 1.5,
    },
    {
        title: "learning",
        lines: ["- operating systems", "- computer networks", "- distributed systems", "- systems programming", "- applied machine learning"],
        rotation: -1,
    },
    {
        title: "problem solving",
        lines: ["- leetcode", "100+ problems and counting", "- open source contributor", "gsoc • lfx mentorship • outreachy"],
        rotation: 2,
    },
    {
        title: "detour ideas",
        lines: ["- diffusion models (theory-heavy directions)", "- pure front-end animation experiments"],
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
                        delay={0.05 * index}
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
            initial={{ rotate: note.rotation || 0 }}
            animate={{ rotate: note.rotation || 0 }}
            whileHover={{
                y: -8,
                boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
                transition: { duration: 0.2 }
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
                    {note.lines.map((line, i) => {
                        const isLink = typeof line === "object" && line.href;
                        const text = typeof line === "string" ? line : line.text;
                        const href = typeof line === "object" ? line.href : undefined;

                        if (isLink && href) {
                            return (
                                <a
                                    key={i}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs md:text-sm text-muted-foreground/70 leading-relaxed hover:text-foreground transition-colors cursor-pointer"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {text}
                                </a>
                            );
                        }

                        return (
                            <p
                                key={i}
                                className="text-xs md:text-sm text-muted-foreground/70 leading-relaxed"
                            >
                                {text}
                            </p>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}

export default PostItSection;

