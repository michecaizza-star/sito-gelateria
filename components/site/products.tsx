import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { products, type Product } from "@/lib/site-content";

const toneClasses: Record<Product["tone"], string> = {
  mari: "bg-[radial-gradient(circle_at_32%_28%,#2f78b8,45%,#0F4C81_75%,#0A2F52_100%)]",
  notte: "bg-[radial-gradient(circle_at_32%_28%,#154269,45%,#0A2F52_75%,#061422_100%)]",
  oro: "bg-[radial-gradient(circle_at_32%_28%,#e6c98a,45%,#D4B26A_75%,#a9853f_100%)]",
  pistacchio: "bg-[radial-gradient(circle_at_32%_28%,#aec688,45%,#8EA760_75%,#5f7940_100%)]",
  melograno: "bg-[radial-gradient(circle_at_32%_28%,#b25361,45%,#8E2E3A_75%,#5e1e27_100%)]",
  sabbia: "bg-[radial-gradient(circle_at_32%_28%,#f2e9d8,45%,#E8DDCB_75%,#c9b795_100%)]",
};

export function Products() {
  return (
    <section id="prodotti" className="bg-sabbia/40 py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Solo Sicilia"
          title="I nostri prodotti"
          description="Gelati, granite e dolci della tradizione siciliana, preparati artigianalmente ogni giorno nel nostro laboratorio."
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <Reveal key={product.name} delay={(i % 3) * 0.08}>
              <article className="group h-full rounded-3xl border border-notte/8 bg-avorio p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(10,47,82,0.35)]">
                <div
                  className={`h-16 w-16 rounded-full ${toneClasses[product.tone]} shadow-inner transition-transform duration-500 group-hover:scale-110`}
                />
                <h3 className="mt-6 font-display text-2xl text-notte">
                  {product.name}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-testo/70">
                  {product.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
