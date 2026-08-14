import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";

export function Story() {
  return (
    <section id="storia" className="relative overflow-hidden bg-avorio py-24 md:py-32">
      <Container className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="La nostra storia"
            title="Nata a Campobello di Licata."
            className="mb-8"
          />
          <Reveal delay={0.1} className="max-w-xl space-y-5 text-base leading-relaxed text-testo/75 sm:text-lg">
            <p>
              MARÌ nasce a <strong className="font-medium text-notte">Campobello di Licata</strong>,
              nel cuore della Sicilia, da una storia che comincia molto prima
              del brand.
            </p>
            <p>
              Da circa <strong className="font-medium text-notte">15 anni</strong>, la nostra
              famiglia porta avanti qui un&apos;attività nata come bar,
              pasticceria e gelateria, crescendo insieme al paese e
              mantenendo uno stretto legame con le ricette, i sapori e le
              materie prime del territorio.
            </p>
            <p>
              Ma il nome MARÌ nasce ancora prima. È un{" "}
              <strong className="font-medium text-notte">omaggio a nostra nonna</strong> e a un
              gesto semplice che, in famiglia, faceva parte della
              quotidianità. Tutti passavamo da lei e, per chiamarla, bastava
              dire: <em className="text-notte">&ldquo;Marì…&rdquo;</em>
            </p>
            <p>
              Da quella casa, da quei momenti e da quel modo familiare di
              stare insieme nasce l&apos;identità del brand. Anche{" "}
              <strong className="font-medium text-notte">TASTALU</strong>, il claim di MARÌ,
              viene da lì. Quando portavamo qualcosa da assaggiare alla
              nonna, la frase era sempre la stessa:{" "}
              <em className="text-notte">&ldquo;Marì, tastalu.&rdquo;</em> Assaggialo.
              Provalo.
            </p>
            <p>
              Due parole semplici che oggi racchiudono tutto il progetto:{" "}
              <strong className="font-medium text-notte">MARÌ</strong> è da dove veniamo,{" "}
              <strong className="font-medium text-notte">TASTALU</strong> è il gesto con cui
              vogliamo raccontarlo.
            </p>
            <p>
              Da questa memoria nasce un progetto contemporaneo con un
              obiettivo preciso: continuare la tradizione, valorizzando ciò
              che la Sicilia ci offre. Mandorle, ricotta, agrumi, frutta,
              farine e produzioni locali diventano il punto di partenza per
              creare prodotti artigianali profondamente legati alla nostra
              terra, privilegiando materie prime siciliane e produttori
              locali ogni volta che è possibile.
            </p>
            <p>
              MARÌ nasce a Campobello di Licata, ma guarda oltre: vogliamo
              custodire ciò che abbiamo imparato qui e, nel tempo, portare
              questi sapori e questa storia anche fuori dalla Sicilia.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-5 lg:pt-20">
          <Reveal delay={0.15}>
            <div className="rounded-[2rem] bg-notte px-8 py-14 text-center text-avorio sm:px-10">
              <p className="font-display text-4xl italic leading-tight sm:text-5xl">
                &ldquo;Marì, tastalu.&rdquo;
              </p>
              <p className="mt-4 text-sm uppercase tracking-[0.3em] text-oro">
                Assaggialo. Provalo.
              </p>
              <div className="mx-auto mt-8 h-px w-12 bg-avorio/20" />
              <p className="mt-8 font-display text-xl italic">
                MARÌ. TASTALU.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-avorio/65">
                Una storia di famiglia, diventata un invito ad assaggiare la
                Sicilia.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
