"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { DATA } from "@/data/resume";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, X, Move, ZoomIn, ZoomOut, Home } from "lucide-react";
import Link from "next/link";

interface Position {
    x: number;
    y: number;
}

type Project = (typeof DATA.projects)[number];

interface ProjectCardProps {
    project: Project;
    position: Position;
    scale: number;
    onClick: () => void;
}

function ProjectCard({ project, position, scale, onClick }: ProjectCardProps) {
    return (
        <motion.div
            className="absolute cursor-pointer"
            style={{
                left: position.x,
                top: position.y,
                width: 320,
            }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            onClick={onClick}
        >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <div className="space-y-4">
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                            {project.description}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 3).map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs bg-white/10 hover:bg-white/20">
                                {tech}
                            </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                            <Badge variant="secondary" className="text-xs bg-white/10">
                                +{project.technologies.length - 3}
                            </Badge>
                        )}
                    </div>
                    <div className="text-xs text-muted-foreground">{project.dates}</div>
                </div>
            </div>
        </motion.div>
    );
}

function ProjectModal({
    project,
    onClose
}: {
    project: Project;
    onClose: () => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative bg-black/80 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                    <X className="size-5" />
                </button>

                <div className="space-y-6">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
                        <p className="text-muted-foreground">{project.dates}</p>
                    </div>

                    <p className="text-gray-300 leading-relaxed">{project.description}</p>

                    <div>
                        <h4 className="text-sm font-semibold text-white mb-3">technologies</h4>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                                <Badge
                                    key={tech}
                                    variant="secondary"
                                    className="bg-white/10 hover:bg-white/20 text-white"
                                >
                                    {tech}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        {project.links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
                            >
                                {link.type === "Source" ? (
                                    <Github className="size-4" />
                                ) : (
                                    <ExternalLink className="size-4" />
                                )}
                                {link.type}
                            </Link>
                        ))}
                        {project.href && (
                            <Link
                                href={project.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
                            >
                                <ExternalLink className="size-4" />
                                Visit Project
                            </Link>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function ProjectsPage() {
    const canvasRef = useRef<HTMLDivElement>(null);
    const [isPanning, setIsPanning] = useState(false);
    const [startPan, setStartPan] = useState<Position>({ x: 0, y: 0 });
    const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });
    const [scale, setScale] = useState(1);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // Generate scattered positions for projects
    const projectPositions = useCallback(() => {
        const positions: Position[] = [];
        const centerX = 1500;
        const centerY = 1000;

        DATA.projects.forEach((_, index) => {
            const angle = (index / DATA.projects.length) * 2 * Math.PI;
            const radius = 300 + (index % 2) * 200;
            positions.push({
                x: centerX + Math.cos(angle) * radius - 160,
                y: centerY + Math.sin(angle) * radius - 100,
            });
        });

        return positions;
    }, []);

    const positions = projectPositions();

    // Center the canvas on load
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setOffset({
                x: -1500 + window.innerWidth / 2,
                y: -1000 + window.innerHeight / 2,
            });
        }
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.button === 0) {
            setIsPanning(true);
            setStartPan({ x: e.clientX - offset.x, y: e.clientY - offset.y });
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isPanning) {
            setOffset({
                x: e.clientX - startPan.x,
                y: e.clientY - startPan.y,
            });
        }
    };

    const handleMouseUp = () => {
        setIsPanning(false);
    };

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.97 : 1.03;
        const newScale = Math.min(Math.max(scale * delta, 0.3), 2);

        // Zoom towards cursor position
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Calculate the point in canvas space that's under the cursor
        const pointX = (mouseX - offset.x) / scale;
        const pointY = (mouseY - offset.y) / scale;

        // After scaling, adjust offset so the same point stays under cursor
        const newOffsetX = mouseX - pointX * newScale;
        const newOffsetY = mouseY - pointY * newScale;

        setScale(newScale);
        setOffset({ x: newOffsetX, y: newOffsetY });
    };

    const resetView = () => {
        if (typeof window !== 'undefined') {
            setOffset({
                x: -1500 + window.innerWidth / 2,
                y: -1000 + window.innerHeight / 2,
            });
            setScale(1);
        }
    };

    const zoomIn = () => setScale((prev) => Math.min(prev * 1.2, 2));
    const zoomOut = () => setScale((prev) => Math.max(prev * 0.8, 0.3));

    return (
        <div className="fixed inset-0 overflow-hidden bg-background">
            {/* Controls */}
            <div className="fixed top-4 left-4 z-40 flex items-center gap-2">
                <Link
                    href="/"
                    className="p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors"
                >
                    <Home className="size-5" />
                </Link>
            </div>

            <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
                <button
                    onClick={zoomOut}
                    className="p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors"
                >
                    <ZoomOut className="size-5" />
                </button>
                <div className="px-3 py-2 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-sm font-mono">
                    {Math.round(scale * 100)}%
                </div>
                <button
                    onClick={zoomIn}
                    className="p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors"
                >
                    <ZoomIn className="size-5" />
                </button>
                <button
                    onClick={resetView}
                    className="p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors"
                >
                    <Move className="size-5" />
                </button>
            </div>

            {/* Instructions */}
            <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-sm text-muted-foreground">
                drag to pan • scroll to zoom • click a project to view details
            </div>

            {/* Canvas */}
            <div
                ref={canvasRef}
                className={`w-full h-full ${isPanning ? 'cursor-grabbing' : 'cursor-grab'}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
            >
                {/* Grid background */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
                        backgroundSize: `${50 * scale}px ${50 * scale}px`,
                        backgroundPosition: `${offset.x}px ${offset.y}px`,
                    }}
                />

                {/* Projects container */}
                <div
                    className="absolute"
                    style={{
                        transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                        transformOrigin: '0 0',
                    }}
                >
                    {/* Center label */}
                    <div
                        className="absolute text-center"
                        style={{ left: 1500 - 150, top: 1000 - 60, width: 300 }}
                    >
                        <h1 className="text-4xl font-bold text-white mb-2">projects</h1>
                        <p className="text-muted-foreground">building my digital footprint</p>
                    </div>

                    {/* Connection lines */}
                    <svg
                        className="absolute pointer-events-none"
                        style={{ left: 0, top: 0, width: 3000, height: 2000 }}
                    >
                        {positions.map((pos, index) => (
                            <line
                                key={index}
                                x1={1500}
                                y1={1000}
                                x2={pos.x + 160}
                                y2={pos.y + 100}
                                stroke="rgba(255,255,255,0.1)"
                                strokeWidth="1"
                                strokeDasharray="5,5"
                            />
                        ))}
                    </svg>

                    {/* Project cards */}
                    {DATA.projects.map((project, index) => (
                        <ProjectCard
                            key={project.title}
                            project={project}
                            position={positions[index]}
                            scale={scale}
                            onClick={() => setSelectedProject(project)}
                        />
                    ))}
                </div>
            </div>

            {/* Project Modal */}
            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </div>
    );
}
