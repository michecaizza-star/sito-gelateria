import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { AddToCart } from "@/components/site/add-to-cart";
import { AskInfoLink } from "@/components/site/ask-info-link";
import { products, ingredients, type Product } from "@/lib/site-content";
import { renderInlineMarkdown } from "@/lib/rich-text";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: `${product.name} — MARÌ`,
    description: product.description,
  };
}

function findIngredientsForProduct(product: Product) {
  return ingredients.filter((i) =>
    i.usedIn
      ?.split(",")
      .map((name) => name.trim())
      .includes(product.name)
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const storyParagraphs = product.story.split("\n\n");
  const processParagraphs = product.process?.split("\n\n") ?? [];
  const relatedIngredients = findIngredientsForProduct(product);

  return (
    <>
      <Header />
      <main className="pb-24 pt-20 md:pt-24">
        <section className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[21/9]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-notte/80 via-notte/15 to-transparent" />
          <Container className="absolute inset-x-0 bottom-8">
            {product.group && (
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-oro">
                {product.group}
              </p>
            )}
            <h1 className="font-display text-4xl italic text-avorio sm:text-6xl">
              {product.name}
            </h1>
          </Container>
        </section>

        <Container className="pt-14 md:pt-20">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="space-y-16 lg:col-span-7">
              <Reveal>
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-oro">
                  La storia
                </p>
                <div className="space-y-4 text-base leading-relaxed text-testo/80">
                  {storyParagraphs.map((paragraph, i) => (
                    <p key={i}>{renderInlineMarkdown(paragraph)}</p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-oro">
                  Il processo
                </p>
                {product.process ? (
                  <div className="space-y-4 text-base leading-relaxed text-testo/80">
                    {processParagraphs.map((paragraph, i) => (
                      <p key={i}>{renderInlineMarkdown(paragraph)}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm italic leading-relaxed text-testo/50">
                    Presto racconteremo qui, passo per passo, come nasce questo
                    prodotto nel nostro laboratorio.
                  </p>
                )}
              </Reveal>

              <Reveal delay={0.15}>
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-oro">
                  Gli ingredienti
                </p>
                <p className="text-base leading-relaxed text-testo/80">
                  Materia prima protagonista:{" "}
                  <strong className="font-medium text-notte">{product.ingredient}</strong>
                </p>
                {relatedIngredients.length > 0 && (
                  <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {relatedIngredients.map((ingredient) => (
                      <Link
                        key={ingredient.slug}
                        href="/#materie-prime"
                        className="group relative overflow-hidden rounded-2xl bg-sabbia/30"
                      >
                        <div className="relative aspect-square">
                          {ingredient.image ? (
                            <Image
                              src={ingredient.image}
                              alt={ingredient.name}
                              fill
                              sizes="200px"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-notte/5">
                              <span className="font-display text-lg italic text-notte/40">
                                {ingredient.name}
                              </span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-notte/70 via-transparent to-transparent" />
                          <p className="absolute bottom-2.5 left-3 right-3 text-sm font-medium text-avorio">
                            {ingredient.name}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.1} className="lg:sticky lg:top-28">
                <div className="rounded-[2rem] bg-sabbia/30 p-8">
                  <h2 className="font-display text-2xl italic text-notte">{product.name}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-testo/70">
                    {product.description}
                  </p>

                  <AddToCart product={product} />

                  <div className="mt-8 border-t border-notte/10 pt-6">
                    <p className="mb-3 text-sm text-testo/70">
                      Hai altre domande su questo prodotto?
                    </p>
                    <AskInfoLink productName={product.name} className="text-base" />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
