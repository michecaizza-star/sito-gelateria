import Image from "next/image";
import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";

export function Story() {
  return (
    <section id="storia" className="relative overflow-hidden bg-avorio py-24 md:py-32">
      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <SectionHeading
            eyebrow="La nostra storia"
            title="Nata a Campobello di Licata."
            className="mb-8"
          />
          <Reveal delay={0.1} className="max-w-xl space-y-5 text-base leading-relaxed text-testo/75 sm:text-lg">
            <p>
              Circa quindici anni fa, in una piccola cittadina dell&apos;entroterra
              agrigentino, nasce la nostra attività: un bar, pasticceria e
              gelateria. Un&apos;attività costruita giorno dopo giorno attraverso
              il rapporto con il paese, i clienti, le ricette della tradizione
              e i prodotti del territorio.
            </p>
            <p>
              Da questa esperienza nasce oggi MARÌ: la volontà di continuare
              quella tradizione dandole una nuova identità, partendo da ciò
              che abbiamo intorno — mandorle, ricotta, agrumi, frutta, farine
              e tutte le materie prime che la Sicilia può offrire.
            </p>
            <p>
              Il brand nasce con un obiettivo preciso: privilegiare prodotti e
              materie prime siciliane, valorizzando quando possibile
              produttori locali e filiere vicine. Vogliamo continuare a
              produrre qui, a Campobello di Licata, mantenendo il legame con
              le nostre origini e, nel tempo, portare MARÌ e i sapori della
              nostra terra anche fuori dalla Sicilia.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <Reveal delay={0.15}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image
                src="/images/campobello-aerea.jpg"
                alt="Vista aerea di Campobello di Licata"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-notte/60 via-transparent to-transparent" />
              <p className="absolute bottom-6 left-6 right-6 font-display text-lg italic text-avorio">
                Campobello di Licata, Agrigento
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
