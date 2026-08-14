import Image from "next/image";
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";

export function SoloSicilia() {
  return (
    <section
      id="solo-sicilia"
      className="relative flex min-h-[85vh] items-center overflow-hidden bg-notte text-avorio"
    >
      <Image
        src="/images/campobello-aerea.jpg"
        alt="Campagne dell'entroterra agrigentino"
        fill
        sizes="100vw"
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,47,82,0.9)_0%,rgba(10,47,82,0.55)_50%,rgba(10,47,82,0.9)_100%)]" />

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
