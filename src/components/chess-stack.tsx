"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X } from "lucide-react";

interface ChessStackProps {
    delay?: number;
}

interface ChessPiece {
    symbol: string;
    name: string;
    role: string;
    hint: string; // Short hint for hover state
    description: string;
    items: string[];
    relatedProjects?: string[];
}

const pieces: Record<string, ChessPiece> = {
    pawn: {
        symbol: "♙",
        name: "pawn",
        role: "languages",
        hint: "core syntax, the building blocks",
        description: "these are the languages i actually write code in. python for most things, java and c when i need more control, dart for mobile stuff, and go when i want something fast and clean.",
        items: ["python", "java", "c", "dart", "go"],
        relatedProjects: ["backend services", "cli tools", "cross-platform apps"],
    },
    knight: {
        symbol: "♘",
        name: "knight",
        role: "frameworks",
        hint: "non-linear moves, rapid prototyping",
        description: "i use these to build things quickly. flask and fastapi for apis, streamlit when i need a quick ui for ml stuff, flutter for mobile apps.",
        items: ["flask", "fastapi", "streamlit", "flutter", "sqlite", "git", "rest apis", "tensorflow"],
        relatedProjects: ["rest microservices", "ml dashboards", "mobile apps"],
    },
    bishop: {
        symbol: "♗",
        name: "bishop",
        role: "developer tools",
        hint: "seeing patterns across the board",
        description: "this is my ai/ml tooling stack. chromadb for vector search, langgraph for orchestration, huggingface for models. currently learning cuda basics.",
        items: ["chromadb", "langgraph", "huggingface models", "cuda (learning)", "rag", "llms"],
        relatedProjects: ["rag pipelines", "embedding search", "fine-tuning workflows"],
    },
    rook: {
        symbol: "♖",
        name: "rook",
        role: "systems",
        hint: "straight lines, infrastructure at scale",
        description: "containers, cloud, and infrastructure. i use docker and kubernetes for deployments, ollama for local inference, and gcp/aws for cloud stuff.",
        items: ["unix/linux", "docker", "kubernetes", "langchain", "ollama", "google cloud", "aws"],
        relatedProjects: ["ci/cd pipelines", "k8s deployments", "cloud-native apps"],
    },
    queen: {
        symbol: "♕",
        name: "queen",
        role: "synthesis",
        hint: "where everything comes together",
        description: "this is where i put everything together. building full ai applications that combine all the tools above into something that actually works in production.",
        items: ["llm agents", "rag architectures", "multimodal pipelines"],
        relatedProjects: ["k8sgpt", "research projects", "ai applications"],
    },
    king: {
        symbol: "♔",
        name: "king",
        role: "principles",
        hint: "tools change, principles don't",
        description: "tools change. principles don't.",
        items: ["correctness", "interpretability", "systems thinking"],
    },
};

// 4x4 board layout - null means empty square (intentionally unplayed)
const boardLayout: (keyof typeof pieces | null)[][] = [
    ["rook", null, "knight", null],
    [null, "pawn", null, "bishop"],
    ["queen", null, null, null],
    [null, "king", null, "pawn"],
];

const isLightSquare = (row: number, col: number) => (row + col) % 2 === 0;

export const ChessStack = ({ delay = 0 }: ChessStackProps) => {
    const [selectedPiece, setSelectedPiece] = useState<keyof typeof pieces | null>(null);
    const [hoveredPiece, setHoveredPiece] = useState<keyof typeof pieces | null>(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const handlePieceClick = (piece: keyof typeof pieces) => {
        setSelectedPiece(selectedPiece === piece ? null : piece);
    };

    const handleBackdropClick = () => {
        setSelectedPiece(null);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: delay, duration: 0.6, ease: "easeOut" }}
            className="w-full"
        >
            {/* Header */}
            <motion.div
                className="text-center mb-6"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: delay + 0.2, duration: 0.5 }}
            >
                <h2 className="text-2xl md:text-3xl font-serif font-normal tracking-tight text-foreground/90 mb-2">
                    how i work
                </h2>
                <p className="text-sm text-muted-foreground/60 italic">
                    (click to explore)
                </p>
            </motion.div>

            {/* Main content area - board and panel side by side */}
            <motion.div
                className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-6 lg:gap-4"
                layout
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
                {/* Chess Board Container */}
                <motion.div
                    className="relative"
                    layout
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    {/* The Board */}
                    <div
                        className="relative grid grid-cols-4 overflow-hidden rounded-lg"
                        style={{
                            width: "380px",
                            height: "380px",
                            boxShadow: "0 0 0 1px rgba(255,255,255,0.1), 0 4px 20px rgba(0,0,0,0.3)",
                        }}
                    >
                        {boardLayout.map((row, rowIndex) =>
                            row.map((piece, colIndex) => {
                                const isLight = isLightSquare(rowIndex, colIndex);
                                const hasPiece = piece !== null;
                                const isSelected = selectedPiece === piece;
                                const isHovered = hoveredPiece === piece && piece !== null;

                                return (
                                    <motion.div
                                        key={`${rowIndex}-${colIndex}`}
                                        className={`
                                                relative flex items-center justify-center
                                                ${hasPiece ? "cursor-pointer" : "cursor-default"}
                                            `}
                                        style={{
                                            width: "95px",
                                            height: "95px",
                                        }}
                                        whileHover={hasPiece ? { scale: 1.02 } : {}}
                                        transition={{ duration: 0.15 }}
                                        onMouseEnter={() => hasPiece && setHoveredPiece(piece)}
                                        onMouseLeave={() => setHoveredPiece(null)}
                                        onClick={() => hasPiece && handlePieceClick(piece)}
                                    >
                                        {/* Square background */}
                                        <div
                                            className="absolute inset-0"
                                            style={{
                                                backgroundColor: isLight
                                                    ? "rgba(255, 255, 255, 0.08)"
                                                    : "rgba(0, 0, 0, 0.5)",
                                                // Subtle texture for dark squares
                                                backgroundImage: !isLight
                                                    ? `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.12'/%3E%3C/svg%3E")`
                                                    : "none",
                                            }}
                                        />

                                        {/* Subtle border between squares */}
                                        <div
                                            className="absolute inset-0 pointer-events-none"
                                            style={{
                                                boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.08)",
                                            }}
                                        />

                                        {/* Empty square indicator - subtle fade */}
                                        {!hasPiece && (
                                            <div
                                                className="absolute inset-0 pointer-events-none"
                                                style={{
                                                    background: "radial-gradient(circle, transparent 40%, rgba(70, 59, 59, 0.1) 100%)",
                                                }}
                                            />
                                        )}

                                        {/* Chess Piece */}
                                        {hasPiece && (
                                            <motion.span
                                                className="relative select-none z-10"
                                                animate={{
                                                    opacity: isHovered || isSelected ? 1 : 0.9,
                                                    scale: isSelected ? 1.1 : isHovered ? 1.05 : 1,
                                                }}
                                                transition={{ duration: 0.2 }}
                                                style={{
                                                    fontSize: piece === "king" || piece === "queen" ? "3.10rem" : "2.75rem",
                                                    color: "#ffffff",
                                                    textShadow: "0 2px 8px rgba(255,255,255,0.6), 0 4px 12px rgba(0,0,0,0.4)",
                                                    filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))",
                                                }}
                                            >
                                                {pieces[piece].symbol}
                                            </motion.span>
                                        )}

                                        {/* Selection indicator */}
                                        <AnimatePresence>
                                            {isSelected && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute inset-1 rounded-sm pointer-events-none"
                                                    style={{
                                                        border: "2px solid rgba(255,255,255,0.3)",
                                                    }}
                                                />
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })
                        )}
                    </div>

                    {/* Hover hint - appears below board */}
                    <div className="h-12 flex items-center justify-center mt-4">
                        <AnimatePresence mode="wait">
                            {hoveredPiece && !selectedPiece && (
                                <motion.div
                                    key={hoveredPiece}
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-center"
                                >
                                    <p className="text-sm font-medium text-foreground/90">
                                        {pieces[hoveredPiece].role}
                                    </p>
                                    <p className="text-xs text-muted-foreground italic">
                                        {pieces[hoveredPiece].hint}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Caption */}
                    <p className="text-[11px] text-muted-foreground/50 text-center mt-9 tracking-wide italic">
                        some squares remain unplayed
                    </p>
                </motion.div>

                {/* Side Panel - slides out from the chessboard */}
                <AnimatePresence>
                    {selectedPiece && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            className="w-full max-w-[320px] lg:w-[320px]"
                            style={{ height: "380px" }}
                        >
                            <div
                                className="relative rounded-xl p-5 border h-full overflow-y-auto"
                                style={{
                                    background: "rgba(255,255,255,0.02)",
                                    borderColor: "rgba(255,255,255,0.1)",
                                    boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
                                }}
                            >
                                {/* Close button */}
                                <button
                                    onClick={handleBackdropClick}
                                    className="absolute top-4 right-4 p-1.5 rounded-full text-muted-foreground/40 hover:text-muted-foreground/70 hover:bg-white/5 transition-all duration-200"
                                >
                                    <X size={14} />
                                </button>

                                {/* Piece header */}
                                <div className="flex items-center gap-4 mb-5 pb-5 border-b border-white/10">
                                    <span
                                        className="text-3xl"
                                        style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))" }}
                                    >
                                        {pieces[selectedPiece].symbol}
                                    </span>
                                    <div>
                                        <h3 className="text-lg font-medium text-foreground/90 tracking-tight">
                                            {pieces[selectedPiece].role}
                                        </h3>
                                        <p className="text-xs text-muted-foreground/50 uppercase tracking-widest">
                                            {pieces[selectedPiece].name}
                                        </p>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-muted-foreground/70 mb-6 leading-relaxed">
                                    {pieces[selectedPiece].description}
                                </p>

                                {/* Items - Tools or Principles */}
                                <div className="mb-6">
                                    <p className="text-[10px] text-muted-foreground/40 uppercase tracking-[0.15em] mb-3">
                                        {selectedPiece === "king" ? "Principles" : "Tools"}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {pieces[selectedPiece].items.map((item) => (
                                            <span
                                                key={item}
                                                className="text-xs px-3 py-1.5 rounded-md text-foreground/70"
                                                style={{
                                                    background: "rgba(255,255,255,0.04)",
                                                    border: "1px solid rgba(255,255,255,0.08)",
                                                }}
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Related projects - not shown for King */}
                                {pieces[selectedPiece].relatedProjects && (
                                    <div className="mb-4">
                                        <p className="text-[10px] text-muted-foreground/40 uppercase tracking-[0.15em] mb-2">
                                            Used in
                                        </p>
                                        <ul className="space-y-1.5">
                                            {pieces[selectedPiece].relatedProjects?.map((project) => (
                                                <li
                                                    key={project}
                                                    className="text-xs text-muted-foreground/50 flex items-center gap-2"
                                                >
                                                    <span className="text-muted-foreground/30">–</span>
                                                    {project}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* King footnote */}
                                {selectedPiece === "king" && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-[10px] text-muted-foreground/30 mt-6 pt-4 border-t border-white/5 italic"
                                    >
                                        ¹ tools change, principles don&apos;t
                                    </motion.p>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Mobile: Bottom sheet backdrop */}
            <AnimatePresence>
                {selectedPiece && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                        onClick={handleBackdropClick}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ChessStack;
