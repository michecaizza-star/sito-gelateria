import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { Logo } from "@/components/site/logo";

export function Story() {
  return (
    <section id="storia" className="relative overflow-hidden bg-avorio py-24 md:py-32">
      <Container className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="La nostra storia"
            title="Ci sono nomi che non hanno bisogno di essere spiegati."
            className="mb-8"
          />
          <Reveal delay={0.1} className="max-w-xl space-y-5 text-base leading-relaxed text-testo/75 sm:text-lg">
            <p>
              <strong className="font-medium text-notte">MARÌ</strong> è uno di questi.
            </p>
            <p>
              È un nome che ci accompagna da sempre. Un richiamo semplice,
              familiare, pronunciato così tante volte da diventare parte dei
              nostri ricordi: <em className="text-notte">&ldquo;Marì…&rdquo;</em>
            </p>
            <p>
              Una parola quotidiana, di quelle che con il tempo finiscono per
              custodire molto più di ciò che dicono.
            </p>
            <p>
              E spesso, subito dopo, arrivava un invito. Quando c&apos;era
              qualcosa di buono, qualcosa appena fatto o semplicemente
              qualcosa che valeva la pena condividere, veniva naturale dire:{" "}
              <em className="text-notte">&ldquo;Marì, tastalu.&rdquo;</em> Assaggialo.
              Provalo.
            </p>
            <p>
              MARÌ nasce da qui. Da un ricordo, ma soprattutto da un modo di
              intendere il cibo:{" "}
              <strong className="font-medium text-notte">
                fare qualcosa di buono e avere subito voglia di farlo
                assaggiare.
              </strong>
            </p>
            <p>
              È lo stesso spirito che da oltre quindici anni accompagna il
              nostro lavoro a{" "}
              <strong className="font-medium text-notte">Campobello di Licata</strong>,
              dove siamo nati come bar, pasticceria e gelateria.
            </p>
            <p>
              Oggi quella storia prende una forma nuova. MARÌ nasce per
              continuare ciò che abbiamo sempre fatto, ma con una scelta
              ancora più precisa:{" "}
              <strong className="font-medium text-notte">partire dalla nostra terra.</strong>
            </p>
            <p>
              Dalle mandorle, dalla ricotta, dagli agrumi, dalla frutta,
              dalle ricette e dalle materie prime che la Sicilia ci offre.
              Valorizzarle, trasformarle e raccontarle attraverso ciò che
              sappiamo fare.
            </p>
            <p>
              Con l&apos;ambizione di partire da Campobello di Licata e
              portare, un giorno, questi sapori anche più lontano.
            </p>
            <p>
              <strong className="font-medium text-notte">Solo Sicilia</strong> è la scelta.{" "}
              <strong className="font-medium text-notte">TASTALU</strong> è l&apos;invito.
            </p>
            <p>Perché, in fondo, tutto è cominciato così.</p>
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
              <Logo size={44} invert className="mx-auto mt-8" />
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
