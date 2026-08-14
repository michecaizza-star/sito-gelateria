"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { ingredients, type Tone } from "@/lib/site-content";

const toneClasses: Record<Tone, string> = {
  mari: "bg-[radial-gradient(circle_at_35%_30%,#2f78b8,45%,#0F4C81_75%,#0A2F52_100%)]",
  notte: "bg-[radial-gradient(circle_at_35%_30%,#154269,45%,#0A2F52_75%,#061422_100%)]",
  oro: "bg-[radial-gradient(circle_at_35%_30%,#e6c98a,45%,#D4B26A_75%,#a9853f_100%)]",
  pistacchio: "bg-[radial-gradient(circle_at_35%_30%,#aec688,45%,#8EA760_75%,#5f7940_100%)]",
  melograno: "bg-[radial-gradient(circle_at_35%_30%,#b25361,45%,#8E2E3A_75%,#5e1e27_100%)]",
  sabbia: "bg-[radial-gradient(circle_at_35%_30%,#f2e9d8,45%,#E8DDCB_75%,#c9b795_100%)]",
  avorio: "bg-[radial-gradient(circle_at_35%_30%,#ffffff,45%,#F8F5EF_75%,#ddd6c8_100%)]",
};

const lightTones = new Set<Tone>(["sabbia", "avorio"]);

export function MateriePrime() {
  const [active, setActive] = useState(0);
  const current = ingredients[active];

  return (
    <section id="materie-prime" className="bg-notte py-24 text-avorio md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Le materie prime"
          title="Tutto parte da qui."
          description="Prima di cercare lontano, guardiamo intorno a noi."
          tone="light"
          className="mb-14"
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Ingredient photo panel */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.slug}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`grain absolute inset-0 ${toneClasses[current.tone]}`}
                >
                  <span
                    className={`absolute left-7 top-7 font-display text-8xl italic ${lightTones.has(current.tone) ? "text-notte/15" : "text-avorio/20"}`}
                  >
                    {current.name.charAt(0)}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Detail + selector */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-oro">
                  {current.origin}
                </p>
                <h3 className="mt-3 font-display text-4xl italic sm:text-5xl">
                  {current.name}
                </h3>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-avorio/75 sm:text-lg">
                  {current.story}
                </p>
                <p className="mt-6 text-sm text-avorio/60">
                  La trovi in{" "}
                  <span className="font-medium text-oro">→ {current.usedIn}</span>
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex flex-wrap gap-2 border-t border-avorio/10 pt-8">
              {ingredients.map((ing, i) => (
                <button
                  key={ing.slug}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors sm:text-sm",
                    i === active
                      ? "border-oro bg-oro text-notte"
                      : "border-avorio/25 text-avorio/70 hover:border-avorio/60 hover:text-avorio"
                  )}
                >
                  {ing.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
