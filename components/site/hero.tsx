"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, MessageCircle } from "lucide-react";
import { waLink } from "@/lib/site-content";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-notte text-avorio"
    >
      <Image
        src="/images/campobello-fontana.jpg"
        alt="Sicilia, entroterra agrigentino"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Cinematic brand-toned wash over the photo */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,47,82,0.55)_0%,rgba(10,47,82,0.35)_35%,rgba(10,47,82,0.75)_75%,rgba(10,47,82,0.95)_100%)]" />
      <div className="grain absolute inset-0 opacity-[0.5]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-40 md:px-10 md:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-oro"
        >
          MARÌ · Campobello di Licata
        </motion.p>

        <h1 className="font-display text-[16vw] italic leading-[0.82] tracking-tight whitespace-nowrap sm:text-[15vw] md:text-[13vw] lg:text-[11rem]">
          {"TASTALU".split("").map((letter, i) => (
            <motion.span
              key={i}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.045, ease }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease }}
          className="mt-7 max-w-md text-base leading-relaxed text-avorio/85 sm:text-lg"
        >
          Prodotti artigianali. Materie prime siciliane. Solo Sicilia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full bg-oro py-3.5 pl-6 pr-3.5 text-sm font-medium text-notte transition-all hover:gap-4"
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
            Scopri MARÌ
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#tastalu"
        aria-label="Scorri per scoprire di più"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-avorio/70"
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
