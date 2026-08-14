import Image from "next/image";
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";

export function SoloSicilia() {
  return (
    <section
      id="solo-sicilia"
      className="relative flex min-h-[85vh] items-center overflow-hidden bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,#154269_0%,#0A2F52_55%,#081f38_100%)] text-avorio"
    >
      <div className="pattern-agrumi pointer-events-none absolute inset-0 opacity-[0.18]" />
      <div className="pointer-events-none absolute -bottom-[15%] -left-[10%] h-[70%] w-[70%] opacity-[0.06]">
        <Image src="/logo-mari.png" alt="" fill className="object-contain" />
      </div>

      <Container className="relative py-24 text-center">
        <Reveal>
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.35em] text-oro">
            La nostra filosofia
          </p>
          <h2 className="font-display text-6xl italic leading-none tracking-tight sm:text-8xl md:text-9xl">
            Solo Sicilia.
          </h2>
        </Reveal>

        <Reveal delay={0.15} className="mx-auto mt-10 max-w-xl space-y-4 text-base leading-relaxed text-avorio/80 sm:text-lg">
          <p>Prima di cercare altrove, guardiamo qui.</p>
          <p>
            MARÌ nasce dalla volontà di valorizzare quello che la nostra
            terra sa produrre. Ingredienti, ricette, produttori e tradizioni
            siciliane sono il punto di partenza dei nostri prodotti.
          </p>
          <p>
            Quando possibile scegliamo materie prime locali e filiere
            vicine, con l&apos;obiettivo di costruire nel tempo prodotti
            sempre più legati alla nostra terra.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
