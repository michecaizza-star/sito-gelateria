import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { AddToCart } from "@/components/site/add-to-cart";
import { AskInfoLink } from "@/components/site/ask-info-link";
import { products, comingSoon, type Product } from "@/lib/site-content";

function ProductPanel({ product }: { product: Product }) {
  return (
    <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] bg-avorio">
      <Image
        src={product.image}
        alt={product.name}
        fill
        sizes="(min-width: 1024px) 40vw, 90vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

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
          <Link href={`/prodotti/${product.slug}`} className="transition-colors hover:text-mari">
            {product.name}
          </Link>
        </h3>
        <p className="mt-4 max-w-md text-base leading-relaxed text-testo/70">
          {product.description}
        </p>
        <p className="mt-4 text-sm text-testo/50">
          Materia prima protagonista:{" "}
          <span className="text-testo/80">{product.ingredient}</span>
        </p>

        <AddToCart product={product} />

        <div className="mt-4 flex items-center gap-5">
          <Link
            href={`/prodotti/${product.slug}`}
            className="group/link inline-flex items-center gap-1.5 font-display text-base italic text-notte transition-colors hover:text-mari"
          >
            Scopri {product.name}
            <span className="transition-transform group-hover/link:translate-x-1">→</span>
          </Link>
          <AskInfoLink productName={product.name} className="text-base" />
        </div>
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
          className="mb-10"
        />

        <Reveal className="relative mb-14 aspect-[16/9] w-full overflow-hidden rounded-[2rem] sm:aspect-[21/9]">
          <Image
            src="/images/hero-pasticceria.png"
            alt="Selezione di prodotti artigianali MARÌ"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-notte/60 via-transparent to-transparent" />
          <p className="absolute bottom-5 left-6 right-6 font-display text-xl italic text-avorio sm:text-2xl">
            Il mondo MARÌ, in un unico sguardo.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 border-t border-notte/10 pt-10 sm:grid-cols-3">
          {biscotti.map((product, i) => (
            <Reveal key={product.slug} delay={i * 0.08}>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-oro">
                {i === 0 ? "Biscotti siciliani" : " "}
              </p>
              <ProductPanel product={product} />
              <h3 className="mt-4 font-display text-2xl text-notte">
                <Link href={`/prodotti/${product.slug}`} className="transition-colors hover:text-mari">
                  {product.name}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-testo/70">
                {product.description}
              </p>

              <AddToCart product={product} />

              <div className="mt-3 flex flex-wrap items-center gap-4">
                <Link
                  href={`/prodotti/${product.slug}`}
                  className="group/link inline-flex items-center gap-1.5 font-display text-sm italic text-notte transition-colors hover:text-mari"
                >
                  Scopri {product.name}
                  <span className="transition-transform group-hover/link:translate-x-1">→</span>
                </Link>
                <AskInfoLink productName={product.name} className="text-sm" />
              </div>
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
