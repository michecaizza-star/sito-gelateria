import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { NewsletterForm } from "@/components/site/newsletter-form";

export function Newsletter() {
  return (
    <section className="bg-sabbia/30 py-20">
      <Container className="mx-auto max-w-2xl text-center">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-oro">
            Newsletter
          </p>
          <h2 className="mt-3 font-display text-3xl italic text-notte sm:text-4xl">
            Il 10% sul tuo primo ordine.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-testo/70">
            Iscriviti e ricevi subito via email il codice sconto per il tuo
            primo ordine da MARÌ.
          </p>

          <NewsletterForm />

          <p className="mt-4 text-xs text-testo/40">
            Iscrivendoti accetti di ricevere comunicazioni da MARÌ. Nessuno
            spam, puoi disiscriverti quando vuoi.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
