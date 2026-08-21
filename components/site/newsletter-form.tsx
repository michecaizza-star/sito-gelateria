"use client";

import { useState, type FormEvent } from "react";
import { NEWSLETTER_EMAIL, NEWSLETTER_DISCOUNT_CODE } from "@/lib/site-content";

type Status = "idle" | "sending" | "sent" | "error";

export function NewsletterForm({ onSubscribed }: { onSubscribed?: () => void }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = data.get("email");

    const payload = {
      _subject: "Nuova iscrizione newsletter MARÌ",
      Email: email,
      _autoresponse: `Ciao!\n\nGrazie per esserti iscritta/o alla newsletter MARÌ.\n\nEcco il tuo codice sconto del 10% sul primo ordine:\n\n${NEWSLETTER_DISCOUNT_CODE}\n\nMenzionalo quando ci scrivi su WhatsApp per ordinare e te lo applichiamo subito.\n\nTastalu 🍋\nMARÌ — Solo Sicilia`,
      _template: "table",
    };

    setStatus("sending");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${NEWSLETTER_EMAIL}`, {
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
      onSubscribed?.();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="mt-8 font-display text-xl italic text-notte">
        Grazie! Controlla la tua email — il codice sconto è in arrivo. 🍋
      </p>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
      >
        <input
          type="email"
          name="email"
          required
          placeholder="La tua email"
          className="w-full flex-1 rounded-full border border-notte/20 bg-avorio px-5 py-3 text-sm text-notte outline-none transition-colors placeholder:text-testo/40 focus:border-oro"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="whitespace-nowrap rounded-full bg-notte px-6 py-3 text-sm font-semibold text-avorio transition-colors hover:bg-mari disabled:opacity-60"
        >
          {status === "sending" ? "Invio…" : "Iscrivimi"}
        </button>
      </form>

      {status === "error" && (
        <p className="mt-4 text-sm text-melograno">
          Qualcosa è andato storto. Riprova più tardi.
        </p>
      )}
    </>
  );
}
