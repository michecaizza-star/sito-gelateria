import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { ingredients } from "@/lib/site-content";

export function Territorio() {
  return (
    <section
      id="territorio"
      className="relative overflow-hidden bg-notte py-24 text-avorio md:py-32"
    >
      <div className="pattern-agrumi pointer-events-none absolute inset-0 opacity-[0.12]" />

      <Container className="relative">
        <SectionHeading
          eyebrow="Materie prime"
          title="Il territorio siciliano, in ogni ingrediente"
          description="Selezioniamo pochi ingredienti, ma eccellenti: prodotti locali e a km 0, scelti direttamente da chi li coltiva."
          align="center"
          tone="light"
          className="mb-16"
        />

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-avorio/10 sm:grid-cols-2 lg:grid-cols-3">
          {ingredients.map((ing, i) => (
            <Reveal key={ing.name} delay={(i % 3) * 0.08} y={16}>
              <div className="h-full bg-notte px-8 py-9 transition-colors duration-500 hover:bg-mari/40">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-oro">
                  {ing.origin}
                </p>
                <h3 className="mt-3 font-display text-2xl">{ing.name}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-avorio/70">
                  {ing.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
