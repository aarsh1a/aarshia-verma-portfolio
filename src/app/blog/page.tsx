"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

export default function BlogPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="w-full min-h-screen relative overflow-hidden">
      {/* Decorative flower on right edge */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: [0.25, 0.4, 0.25],
          y: 0,
        }}
        transition={{
          opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 1, ease: "easeOut" },
        }}
        className="fixed bottom-0 right-0 pointer-events-none z-10"
        style={{
          filter: "drop-shadow(0 0 15px rgba(255,255,255,0.3)) invert(1)",
          transform: "scaleX(-1)",
        }}
      >
        <Image
          src="/flower-stem.png"
          alt=""
          width={150}
          height={600}
          className="h-[600px] w-auto object-contain"
        />
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="font-semibold text-4xl mb-3 tracking-tight">blog</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            anything and everything i know about
          </p>
        </div>

        {/* Article Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          onClick={() => setIsOpen(true)}
          className="cursor-pointer group w-80"
        >
          <div
            className="relative rounded-lg overflow-hidden border border-border/30 hover:border-border/50 transition-all duration-300 hover:shadow-xl"
            style={{ aspectRatio: "16/10" }}
          >
            {/* Background Image */}
            <Image
              src="/white-rabbit.jpg"
              alt="White Rabbit"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />

            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)",
              }}
            />

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-4">
              <h3 className="font-serif text-lg font-bold text-white leading-tight">
                down the rabbit hole
              </h3>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm"
            >
              <div
                className="relative p-8 rounded-2xl bg-card flex flex-col items-center justify-center"
                style={{
                  boxShadow: "0 0 19px rgba(238, 138, 188, 0.3), 0 0 80px rgba(237, 138, 187, 0.15), 0 25px 50px rgba(0,0,0,0.5)",
                  border: "1px solid rgba(228, 100, 164, 0.4)",
                }}
              >
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-1.5 text-muted-foreground/50 hover:text-foreground transition-colors"
                >
                  <X size={16} />
                </button>

                <p className="text-muted-foreground text-center py-6 leading-relaxed text-sm">
                  i can't figure out how to embed substack here yet so this will make do for now
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

