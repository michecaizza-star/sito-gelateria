import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { Marquee } from "@/components/site/marquee";

export function Tastalu() {
  return (
    <section id="tastalu" className="overflow-hidden bg-avorio py-24 md:py-32">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-oro">
            Il nostro claim
          </p>
          <h2 className="font-display text-6xl italic leading-none tracking-tight text-notte sm:text-8xl md:text-9xl">
            Tastalu
          </h2>
        </Reveal>

        <Reveal delay={0.15} className="mx-auto mt-12 max-w-2xl space-y-5 text-center text-base leading-relaxed text-testo/75 sm:text-lg">
          <p>In Sicilia basta una parola.</p>
          <p>
            &ldquo;Tastalu&rdquo; significa &ldquo;assaggialo&rdquo;, &ldquo;provalo&rdquo;. È
            quella parola semplice che si usa quando vuoi condividere qualcosa
            di buono con qualcuno.
          </p>
          <p>
            Per MARÌ è diventata un invito a qualcosa di più grande: scoprire
            un prodotto attraverso la terra da cui nasce, le materie prime con
            cui viene realizzato e le persone che continuano a lavorarle.
          </p>
          <p className="pt-2 font-display text-xl italic text-notte sm:text-2xl">
            Tastalu. Assaggia la Sicilia.
          </p>
        </Reveal>
      </Container>

      <Reveal delay={0.2} className="mt-16 border-y border-notte/10 py-6">
        <Marquee
          items={["TASTALU", "SICILIA", "MATERIE PRIME", "TRADIZIONE"]}
          textClassName="text-notte/15 text-3xl sm:text-5xl"
        />
      </Reveal>
    </section>
  );
}
