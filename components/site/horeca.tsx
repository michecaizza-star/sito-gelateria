"use client";

import { useState, type FormEvent } from "react";
import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { HORECA_EMAIL } from "@/lib/site-content";

type Status = "idle" | "sending" | "sent" | "error";

export function Horeca() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      _subject: "Nuova richiesta Horeca — sito MARÌ",
      "Nome e cognome": data.get("nome"),
      "Località": data.get("localita"),
      "Tipo di attività": data.get("attivita"),
      Messaggio: data.get("messaggio"),
    };

    setStatus("sending");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${HORECA_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="horeca" className="bg-avorio py-24 md:py-32">
      <Container className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="MARÌ per Horeca"
            title="Il tuo prodotto. Fatto da noi."
            className="mb-8"
          />
          <Reveal delay={0.1} className="max-w-md space-y-5 text-base leading-relaxed text-testo/75">
            <p>
              Realizziamo{" "}
              <strong className="font-medium text-notte">
                dolci, biscotti e specialità artigianali personalizzate
              </strong>{" "}
              per bar, hotel, ristoranti, caffetterie e attività che vogliono
              offrire qualcosa di proprio.
            </p>
            <p>
              Partiamo dalle esigenze del locale per creare un prodotto su
              misura: dalla ricetta al formato, fino alla presentazione e al
              packaging.
            </p>
            <p>
              Possiamo personalizzare prodotti già presenti nel mondo MARÌ
              oppure sviluppare{" "}
              <strong className="font-medium text-notte">referenze dedicate</strong>,
              pensate esclusivamente per la tua attività.
            </p>
            <p>
              Biscotti per accompagnare il caffè, piccola pasticceria,
              prodotti da colazione, monoporzioni, crostate, specialità
              siciliane o una ricetta creata insieme.
            </p>
            <p>
              Sempre con la stessa filosofia:{" "}
              <strong className="font-medium text-notte">
                lavorazione artigianale e una particolare attenzione alle
                materie prime siciliane.
              </strong>
            </p>
            <p className="font-display text-xl italic text-notte">
              Hai in mente un prodotto? Parliamone.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.15} className="rounded-[2rem] bg-sabbia/30 p-8 sm:p-10">
            {status === "sent" ? (
              <div className="flex min-h-[22rem] flex-col items-center justify-center text-center">
                <p className="font-display text-3xl italic text-notte">Grazie!</p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-testo/70">
                  Abbiamo ricevuto la tua richiesta. Ti risponderemo il prima
                  possibile per parlare del tuo progetto.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-xs font-medium uppercase tracking-[0.15em] text-testo/60">
                      Nome e cognome
                    </span>
                    <input
                      type="text"
                      name="nome"
                      required
                      className="mt-2 w-full border-b border-notte/20 bg-transparent py-2 text-notte outline-none transition-colors focus:border-oro"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-medium uppercase tracking-[0.15em] text-testo/60">
                      Località
                    </span>
                    <input
                      type="text"
                      name="localita"
                      required
                      className="mt-2 w-full border-b border-notte/20 bg-transparent py-2 text-notte outline-none transition-colors focus:border-oro"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-xs font-medium uppercase tracking-[0.15em] text-testo/60">
                      Tipo di attività
                    </span>
                    <input
                      type="text"
                      name="attivita"
                      placeholder="Bar, hotel, ristorante, caffetteria…"
                      required
                      className="mt-2 w-full border-b border-notte/20 bg-transparent py-2 text-notte outline-none transition-colors placeholder:text-testo/30 focus:border-oro"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-xs font-medium uppercase tracking-[0.15em] text-testo/60">
                      Messaggio
                    </span>
                    <textarea
                      name="messaggio"
                      required
                      rows={4}
                      className="mt-2 w-full resize-none border-b border-notte/20 bg-transparent py-2 text-notte outline-none transition-colors focus:border-oro"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-2.5 rounded-full bg-notte px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-avorio transition-colors hover:bg-mari disabled:opacity-60"
                >
                  {status === "sending" ? "Invio in corso…" : "Richiedi una proposta →"}
                </button>

                {status === "error" && (
                  <p className="text-sm text-melograno">
                    Qualcosa è andato storto. Riprova, oppure scrivici
                    direttamente a{" "}
                    <a href={`mailto:${HORECA_EMAIL}`} className="underline">
                      {HORECA_EMAIL}
                    </a>
                    .
                  </p>
                )}
              </form>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
