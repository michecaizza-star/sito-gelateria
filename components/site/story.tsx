import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";

const values = [
  {
    title: "Artigianalità",
    text: "Lavorazione quotidiana in piccoli lotti, senza semilavorati industriali.",
  },
  {
    title: "Territorio",
    text: "Materie prime siciliane selezionate, spesso a km 0, dai produttori locali.",
  },
  {
    title: "Autenticità",
    text: "Ricette della tradizione isolana, reinterpretate con rigore e misura.",
  },
];

export function Story() {
  return (
    <section id="storia" className="relative overflow-hidden bg-avorio py-24 md:py-32">
      <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="La nostra storia"
            title="Nata dal mare, cresciuta tra gli agrumeti."
            className="mb-8"
          />
          <Reveal delay={0.1} className="max-w-xl space-y-5 text-base leading-relaxed text-testo/75 sm:text-lg">
            <p>
              MARÌ nasce dal desiderio di raccontare la Sicilia attraverso il
              gelato: un&apos;isola di sapori intensi, contrasti luminosi e
              materie prime straordinarie, dal pistacchio dell&apos;Etna al
              limone di Siracusa.
            </p>
            <p>
              Ogni ricetta segue la filosofia artigianale che da sempre guida
              il nostro laboratorio: poche materie prime, di altissima
              qualità, lavorate con pazienza e rispetto per la tradizione
              siciliana.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-[2rem] bg-notte px-8 py-14 text-avorio">
              <ul className="relative space-y-9">
                {values.map((v, i) => (
                  <li key={v.title} className="flex gap-5">
                    <span className="font-display text-2xl italic text-oro">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-xl">{v.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-avorio/70">
                        {v.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
