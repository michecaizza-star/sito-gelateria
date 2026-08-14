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
        src="/images/hero-pasticceria.png"
        alt="Selezione di dolci artigianali MARÌ"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Cinematic brand-toned wash over the photo */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,47,82,0.6)_0%,rgba(10,47,82,0.4)_35%,rgba(10,47,82,0.8)_75%,rgba(10,47,82,0.96)_100%)]" />
      <div className="grain absolute inset-0 opacity-[0.5]" />

      {/* Logo watermark — rendered as a soft light emboss so the mark reads
          clearly over both the photo and the dark gradient, like a watermark
          pressed into paper. Same artwork, just tinted for this effect. */}
      <div className="pointer-events-none absolute -right-[15%] -top-[10%] h-[80%] w-[80%] opacity-[0.16] sm:h-[65%] sm:w-[65%]">
        <Image
          src="/logo-mari.png"
          alt=""
          fill
          className="object-contain"
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-40 md:px-10 md:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-oro"
        >
          Campobello di Licata · Sicilia
        </motion.p>

        <h1 className="font-display text-[15vw] leading-[0.85] tracking-tight whitespace-nowrap sm:text-[13vw] md:text-[11vw] lg:text-[9rem]">
          {"MARÌ".split("").map((letter, i) => (
            <motion.span
              key={i}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.06, ease }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease }}
          className="mt-1 font-display text-3xl italic text-oro sm:text-4xl"
        >
          Tastalu.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease }}
          className="mt-6 max-w-md text-base leading-relaxed text-avorio/85 sm:text-lg"
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

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-10 text-[11px] text-avorio/45"
        >
          Immagini dei prodotti generate con intelligenza artificiale, a scopo illustrativo.
        </motion.p>
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
