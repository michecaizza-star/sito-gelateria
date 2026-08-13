"use client";

import { motion } from "framer-motion";
import { ArrowDown, MessageCircle } from "lucide-react";
import { waLink } from "@/lib/site-content";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-notte text-avorio"
    >
      {/* Base gradient wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,#0F4C81_0%,#0A2F52_55%,#081f38_100%)]" />

      {/* Decorative citrus-dot pattern */}
      <div className="pattern-agrumi absolute inset-0 opacity-[0.35]" />

      {/* Grain */}
      <div className="grain absolute inset-0" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 pb-20 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mb-6 text-xs font-medium uppercase tracking-[0.35em] text-oro"
        >
          Gelateria artigianale siciliana
        </motion.p>

        <h1 className="max-w-4xl font-display text-[13vw] font-medium italic leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-[6.4rem]">
          {"La Sicilia in ogni cucchiaio".split(" ").map((word, i) => (
            <motion.span
              key={i}
              initial={{ y: 26, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.08, ease }}
              className="mr-[0.28em] inline-block last:mr-0"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease }}
          className="mt-8 max-w-md text-base leading-relaxed text-avorio/80 sm:text-lg"
        >
          Gelati, granite e dolci artigianali nati da materie prime siciliane,
          locali e a km 0. Solo Sicilia, in ogni ricetta.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full bg-pistacchio py-3.5 pl-6 pr-3.5 text-sm font-medium text-notte transition-all hover:gap-4"
          >
            Ordina su WhatsApp
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-notte text-avorio transition-transform group-hover:scale-110">
              <MessageCircle className="h-4 w-4" />
            </span>
          </a>
          <a
            href="#storia"
            className="inline-flex items-center gap-2 rounded-full border border-avorio/30 px-6 py-3.5 text-sm font-medium text-avorio transition-colors hover:border-avorio/70"
          >
            Scopri la nostra storia
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#storia"
        aria-label="Scorri per scoprire di più"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-avorio/70"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-5 w-5" />
        </motion.div>
      </motion.a>
    </section>
  );
}
