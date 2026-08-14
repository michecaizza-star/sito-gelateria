import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { products, comingSoon, waLink, type Product } from "@/lib/site-content";

const toneClasses: Record<Product["tone"], string> = {
  mari: "bg-[radial-gradient(circle_at_30%_25%,#2f78b8,45%,#0F4C81_75%,#0A2F52_100%)]",
  notte: "bg-[radial-gradient(circle_at_30%_25%,#154269,45%,#0A2F52_75%,#061422_100%)]",
  oro: "bg-[radial-gradient(circle_at_30%_25%,#e6c98a,45%,#D4B26A_75%,#a9853f_100%)]",
  pistacchio: "bg-[radial-gradient(circle_at_30%_25%,#aec688,45%,#8EA760_75%,#5f7940_100%)]",
  melograno: "bg-[radial-gradient(circle_at_30%_25%,#b25361,45%,#8E2E3A_75%,#5e1e27_100%)]",
  sabbia: "bg-[radial-gradient(circle_at_30%_25%,#f2e9d8,45%,#E8DDCB_75%,#c9b795_100%)]",
  avorio: "bg-[radial-gradient(circle_at_30%_25%,#ffffff,45%,#F8F5EF_75%,#ddd6c8_100%)]",
};

const lightTones = new Set<Product["tone"]>(["sabbia", "avorio"]);

function ProductPanel({ product }: { product: Product }) {
  const isLight = lightTones.has(product.tone);
  return (
    <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem]">
      <div
        className={`grain absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105 ${toneClasses[product.tone]}`}
      />
      <span
        className={`absolute left-6 top-6 font-display text-7xl italic ${isLight ? "text-notte/15" : "text-avorio/25"}`}
      >
        {product.name.charAt(0)}
      </span>

      {/* Ingredient chip, appears near the product on hover */}
      <div className="absolute bottom-5 right-5 translate-y-2 rounded-full bg-avorio/95 px-4 py-2 text-xs font-medium text-notte opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {product.ingredient}
      </div>
    </div>
  );
}

function ProductRow({ product, index }: { product: Product; index: number }) {
  const reversed = index % 2 === 1;
  return (
    <Reveal
      y={0}
      className="grid grid-cols-1 items-center gap-8 border-t border-notte/10 py-14 first:border-t-0 lg:grid-cols-12 lg:gap-10"
    >
      <div className={`lg:col-span-5 ${reversed ? "lg:order-2" : ""}`}>
        <ProductPanel product={product} />
      </div>
      <div className={`lg:col-span-7 ${reversed ? "lg:order-1" : ""}`}>
        {product.group && (
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-oro">
            {product.group}
          </p>
        )}
        <h3 className="font-display text-3xl text-notte sm:text-4xl">
          {product.name}
        </h3>
        <p className="mt-4 max-w-md text-base leading-relaxed text-testo/70">
          {product.description}
        </p>
        <p className="mt-4 text-sm text-testo/50">
          Materia prima protagonista:{" "}
          <span className="text-testo/80">{product.ingredient}</span>
        </p>
        <a
          href={waLink(`Ciao MARÌ! Vorrei sapere di più su: ${product.name}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link mt-6 inline-flex items-center gap-1.5 font-display text-lg italic text-notte transition-colors hover:text-mari"
        >
          Tastalu
          <span className="transition-transform group-hover/link:translate-x-1">
            →
          </span>
        </a>
      </div>
    </Reveal>
  );
}

export function Products() {
  const biscotti = products.filter((p) => p.group === "Biscotti siciliani");
  const standalone = products.filter((p) => !p.group);

  return (
    <section id="prodotti" className="bg-sabbia/30 py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Solo Sicilia"
          title="I nostri prodotti"
          description="Ogni prodotto nasce da un ingrediente protagonista e da una lavorazione artigianale, quotidiana, senza scorciatoie."
          className="mb-8"
        />

        <div className="grid grid-cols-1 gap-6 border-t border-notte/10 pt-10 sm:grid-cols-3">
          {biscotti.map((product, i) => (
            <Reveal key={product.slug} delay={i * 0.08}>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-oro">
                {i === 0 ? "Biscotti siciliani" : " "}
              </p>
              <ProductPanel product={product} />
              <h3 className="mt-4 font-display text-2xl text-notte">
                {product.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-testo/70">
                {product.description}
              </p>
              <a
                href={waLink(`Ciao MARÌ! Vorrei sapere di più su: ${product.name}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link mt-3 inline-flex items-center gap-1.5 font-display text-base italic text-notte transition-colors hover:text-mari"
              >
                Tastalu
                <span className="transition-transform group-hover/link:translate-x-1">
                  →
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-4">
          {standalone.map((product, i) => (
            <ProductRow key={product.slug} product={product} index={i} />
          ))}
        </div>

        <Reveal className="mt-16 flex flex-col items-center gap-4 border-t border-notte/10 pt-10 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-testo/50">
            In arrivo
          </p>
          <p className="font-display text-xl italic text-notte sm:text-2xl">
            {comingSoon.join(" · ")}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
