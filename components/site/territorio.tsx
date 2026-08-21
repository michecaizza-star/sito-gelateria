import Image from "next/image";
import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { territoryTrail } from "@/lib/site-content";

function SicilyMap() {
  return (
    <svg viewBox="0 0 360 300" className="h-auto w-full max-w-xs text-avorio/25" fill="none">
      <path
        d="M40,120 L70,60 L140,40 L220,55 L300,70 L340,100 L320,140 L300,190 L330,230 L310,270 L230,260 L150,250 L90,220 L50,170 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <g>
        <circle cx="158" cy="246" r="5" className="fill-oro" />
        <circle cx="158" cy="246" r="10" className="fill-oro/30">
          <animate attributeName="r" values="6;16;6" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite" />
        </circle>
      </g>
      <text x="168" y="250" className="fill-avorio font-display text-[13px] italic">
        Campobello di Licata
      </text>
    </svg>
  );
}

export function Territorio() {
  return (
    <section
      id="territorio"
      className="relative overflow-hidden bg-notte py-24 text-avorio md:py-32"
    >
      <div className="pattern-agrumi pointer-events-none absolute inset-0 opacity-[0.1]" />

      <Container className="relative grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <SectionHeading
            eyebrow="Il territorio"
            title="Nasciamo qui."
            tone="light"
            className="mb-8"
          />

          <Reveal delay={0.1} className="space-y-1">
            {territoryTrail.map((step, i) => (
              <div key={step.label} className="flex items-baseline gap-4 py-2">
                <span className="font-display text-3xl italic text-oro sm:text-4xl">
                  {step.label}
                  {i < territoryTrail.length - 1 && (
                    <span className="mx-3 text-avorio/30">→</span>
                  )}
                </span>
                <span className="text-sm text-avorio/50">{step.detail}</span>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.2} className="mt-8 max-w-md text-base leading-relaxed text-avorio/70">
            <p>
              Da un piccolo paese dell&apos;entroterra agrigentino, lontano
              dalle rotte turistiche, raccontiamo una Sicilia agricola e
              produttiva: campagne, terra, persone e lavorazioni che
              continuano una tradizione lunga quindici anni.
            </p>
          </Reveal>

          <Reveal delay={0.25} className="mt-10">
            <SicilyMap />
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <Reveal delay={0.15} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] lg:aspect-[3/4]">
              <Image
                src="/images/campobello-fontana.jpg"
                alt="Fontana monumentale, Campobello di Licata"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-notte/70 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-10 -left-6 hidden w-44 overflow-hidden rounded-2xl border-4 border-notte shadow-xl lg:-left-10 lg:block lg:w-52">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/campobello-aerea.jpg"
                  alt="Vista aerea di Campobello di Licata"
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
