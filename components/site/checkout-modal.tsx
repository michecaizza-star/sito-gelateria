"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CreditCard, Lock, MessageCircle, X } from "lucide-react";
import { useCart, isShippingComplete } from "@/lib/cart-context";
import { waLink, GIFT_PROFILE_EMAIL } from "@/lib/site-content";
import { PAYPAL_CLIENT_ID, NEXI_PAYMENT_LINK_URL } from "@/lib/payments-config";
import { loadComuni, extractProvince, type Comune } from "@/lib/comuni";
import { Combobox, type ComboboxOption } from "@/components/site/combobox";

type GiftFormStatus = "idle" | "sending" | "sent" | "error";

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: Record<string, unknown>) => { render: (el: HTMLElement) => void };
    };
  }
}

type Method = "gift" | "shipping" | "choose" | "paypal" | "done";

export function CheckoutModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const {
    items,
    subtotal,
    discountCode,
    discountAmount,
    shippingCost,
    totalPrice,
    note,
    shipping,
    updateShipping,
    clear,
  } = useCart();
  const [method, setMethod] = useState<Method>("gift");
  const [cardError, setCardError] = useState<string | null>(null);
  const [giftFormStatus, setGiftFormStatus] = useState<GiftFormStatus>("idle");
  const [shippingTouched, setShippingTouched] = useState(false);
  const [comuni, setComuni] = useState<Comune[]>([]);
  const paypalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (method !== "shipping" || comuni.length > 0) return;
    let cancelled = false;
    loadComuni().then((data) => {
      if (!cancelled) setComuni(data);
    });
    return () => {
      cancelled = true;
    };
  }, [method, comuni.length]);

  const provinceOptions = useMemo<ComboboxOption[]>(
    () => extractProvince(comuni).map((p) => ({ label: `${p.nome} (${p.sigla})`, value: p.sigla })),
    [comuni]
  );
  const cityOptions = useMemo<ComboboxOption[]>(() => {
    const scoped = shipping.provincia ? comuni.filter((c) => c.s === shipping.provincia) : comuni;
    return scoped.map((c) => ({ label: c.n, value: c.n }));
  }, [comuni, shipping.provincia]);
  const capOptions = useMemo<ComboboxOption[]>(() => {
    const match = comuni.find((c) => c.n === shipping.citta);
    return (match?.c ?? []).map((cap) => ({ label: cap, value: cap }));
  }, [comuni, shipping.citta]);
  const provinciaDisplayValue =
    provinceOptions.find((p) => p.value === shipping.provincia)?.label ?? shipping.provincia;

  function handleSelectCity(option: ComboboxOption) {
    const match = comuni.find((c) => c.n === option.value);
    updateShipping({
      citta: option.value,
      provincia: match?.s ?? shipping.provincia,
      cap: match?.c.length === 1 ? match.c[0] : "",
    });
  }

  function handleSelectProvincia(option: ComboboxOption) {
    const match = comuni.find((c) => c.n === shipping.citta);
    const cityStillValid = match?.s === option.value;
    updateShipping({
      provincia: option.value,
      ...(cityStillValid ? {} : { citta: "", cap: "" }),
    });
  }

  function handleClose() {
    setMethod("gift");
    setCardError(null);
    setGiftFormStatus("idle");
    setShippingTouched(false);
    onClose();
  }

  function handleShippingSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShippingTouched(true);
    if (isShippingComplete(shipping)) setMethod("choose");
  }

  async function handleGiftFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      _subject: `Profilo cliente per regalo personalizzato — ${data.get("nome") || ""}`,
      Nome: data.get("nome"),
      Cognome: data.get("cognome"),
      "Età": data.get("eta"),
      "Dove vive": data.get("dove"),
      "Qualcosa da condividere": data.get("racconto"),
    };

    setGiftFormStatus("sending");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${GIFT_PROFILE_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("request failed");
      setGiftFormStatus("sent");
      form.reset();
      setMethod("shipping");
    } catch {
      setGiftFormStatus("error");
    }
  }

  useEffect(() => {
    if (method !== "paypal" || !paypalRef.current || totalPrice == null) return;
    let cancelled = false;

    function render() {
      if (cancelled || !window.paypal || !paypalRef.current) return;
      paypalRef.current.innerHTML = "";
      window.paypal
        .Buttons({
          style: { color: "blue", shape: "pill", label: "pay" },
          createOrder: (_: unknown, actions: { order: { create: (o: unknown) => Promise<string> } }) =>
            actions.order.create({
              purchase_units: [
                { amount: { value: (totalPrice ?? 0).toFixed(2), currency_code: "EUR" } },
              ],
            }),
          onApprove: async (
            _: unknown,
            actions: { order: { capture: () => Promise<unknown> } }
          ) => {
            await actions.order.capture();
            clear();
            setMethod("done");
          },
        })
        .render(paypalRef.current);
    }

    if (window.paypal) {
      render();
      return () => {
        cancelled = true;
      };
    }

    const scriptId = "paypal-sdk";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=EUR`;
      script.addEventListener("load", render);
      document.body.appendChild(script);
    } else {
      script.addEventListener("load", render);
    }

    return () => {
      cancelled = true;
    };
  }, [method, totalPrice, clear]);

  function handleCardCheckout() {
    setCardError(null);
    if (!NEXI_PAYMENT_LINK_URL) {
      setCardError(
        "Il pagamento con carta non è ancora configurato su questo sito. Completa l'ordine su WhatsApp nel frattempo."
      );
      return;
    }
    window.open(NEXI_PAYMENT_LINK_URL, "_blank", "noopener,noreferrer");
  }

  function handleWhatsAppOrder() {
    const lines = items.map(
      (i) =>
        `• ${i.name}${i.flavor ? " – " + i.flavor : ""}${i.size ? " (" + i.size + ")" : ""} x${i.quantity}`
    );
    const fmt = (n: number) => n.toLocaleString("it-IT", { style: "currency", currency: "EUR" });
    const summary: string[] = [];
    if (subtotal != null) summary.push(`Subtotale: ${fmt(subtotal)}`);
    if (discountCode) summary.push(`Codice ${discountCode}: -${fmt(discountAmount)}`);
    if (shippingCost != null) {
      summary.push(`Spedizione: ${shippingCost === 0 ? "gratuita" : fmt(shippingCost)}`);
    }
    if (totalPrice != null) summary.push(`Totale: ${fmt(totalPrice)}`);
    const summaryBlock = summary.length ? `\n\n${summary.join("\n")}` : "";
    const shippingBlock = isShippingComplete(shipping)
      ? `\n\nSpedire a:\n${shipping.nome} ${shipping.cognome}\n${shipping.indirizzo}\n${shipping.cap} ${shipping.citta} (${shipping.provincia})\nTel: ${shipping.telefono}${shipping.infoConsegna.trim() ? `\nInfo consegna: ${shipping.infoConsegna.trim()}` : ""}`
      : "";
    const noteBlock = note.trim() ? `\n\nNote: ${note.trim()}` : "";
    const msg = `Ciao MARÌ! Vorrei ordinare:\n${lines.join("\n")}${summaryBlock}${shippingBlock}${noteBlock}\n\nTastalu 🍋`;
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
    clear();
    setMethod("done");
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[80] bg-notte/60"
          />
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-1/2 z-[90] w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[1.75rem] bg-avorio p-7 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={handleClose}
              aria-label="Chiudi"
              className="absolute right-5 top-5 text-testo/50 hover:text-notte"
            >
              <X className="h-5 w-5" />
            </button>

            {method === "gift" ? (
              <div className="max-h-[80vh] overflow-y-auto py-2 text-left">
                <p className="text-center font-display text-2xl italic text-notte">
                  Un piccolo regalo, solo per te
                </p>
                <p className="mx-auto mt-2 max-w-sm text-center text-xs leading-relaxed text-testo/60">
                  Prima di procedere al pagamento, se vuoi raccontaci
                  qualcosa di te: prepareremo una sorpresa pensata apposta,
                  da consegnarti insieme al tuo ordine. Campo facoltativo.
                </p>
                <form onSubmit={handleGiftFormSubmit} className="mt-5 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="text-xs font-medium uppercase tracking-[0.1em] text-testo/50">
                        Nome
                      </span>
                      <input
                        type="text"
                        name="nome"
                        className="mt-1.5 w-full border-b border-notte/20 bg-transparent py-1.5 text-sm text-notte outline-none focus:border-oro"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs font-medium uppercase tracking-[0.1em] text-testo/50">
                        Cognome
                      </span>
                      <input
                        type="text"
                        name="cognome"
                        className="mt-1.5 w-full border-b border-notte/20 bg-transparent py-1.5 text-sm text-notte outline-none focus:border-oro"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs font-medium uppercase tracking-[0.1em] text-testo/50">
                        Età
                      </span>
                      <input
                        type="number"
                        name="eta"
                        min={0}
                        max={120}
                        className="mt-1.5 w-full border-b border-notte/20 bg-transparent py-1.5 text-sm text-notte outline-none focus:border-oro"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs font-medium uppercase tracking-[0.1em] text-testo/50">
                        Dove vivi
                      </span>
                      <input
                        type="text"
                        name="dove"
                        className="mt-1.5 w-full border-b border-notte/20 bg-transparent py-1.5 text-sm text-notte outline-none focus:border-oro"
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="text-xs font-medium uppercase tracking-[0.1em] text-testo/50">
                      Raccontaci qualcosa di te
                    </span>
                    <textarea
                      name="racconto"
                      rows={3}
                      className="mt-1.5 w-full resize-none border-b border-notte/20 bg-transparent py-1.5 text-sm text-notte outline-none focus:border-oro"
                    />
                  </label>

                  <div className="flex items-center justify-between gap-3 pt-1">
                    <button
                      type="submit"
                      disabled={giftFormStatus === "sending"}
                      className="rounded-full bg-pistacchio px-5 py-2.5 text-xs font-semibold text-notte transition-colors hover:opacity-90 disabled:opacity-60"
                    >
                      {giftFormStatus === "sending" ? "Invio…" : "Continua →"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setMethod("shipping")}
                      className="text-xs text-testo/50 underline"
                    >
                      Salta, continua
                    </button>
                  </div>
                  {giftFormStatus === "error" && (
                    <p className="text-xs text-melograno">
                      Qualcosa è andato storto, riprova più tardi.
                    </p>
                  )}
                </form>
              </div>
            ) : method === "shipping" ? (
              <div className="max-h-[80vh] overflow-y-auto py-2 text-left">
                <p className="text-center font-display text-2xl italic text-notte">
                  Dove consegniamo il tuo ordine?
                </p>
                <p className="mx-auto mt-2 max-w-sm text-center text-xs leading-relaxed text-testo/60">
                  Ci servono questi dati per organizzare la consegna. Li
                  ricorderemo per i tuoi prossimi ordini.
                </p>
                <form onSubmit={handleShippingSubmit} className="mt-5 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="text-xs font-medium uppercase tracking-[0.1em] text-testo/50">
                        Nome
                      </span>
                      <input
                        type="text"
                        value={shipping.nome}
                        onChange={(e) => updateShipping({ nome: e.target.value })}
                        required
                        className="mt-1.5 w-full border-b border-notte/20 bg-transparent py-1.5 text-sm text-notte outline-none focus:border-oro"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs font-medium uppercase tracking-[0.1em] text-testo/50">
                        Cognome
                      </span>
                      <input
                        type="text"
                        value={shipping.cognome}
                        onChange={(e) => updateShipping({ cognome: e.target.value })}
                        required
                        className="mt-1.5 w-full border-b border-notte/20 bg-transparent py-1.5 text-sm text-notte outline-none focus:border-oro"
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="text-xs font-medium uppercase tracking-[0.1em] text-testo/50">
                      Telefono
                    </span>
                    <input
                      type="tel"
                      value={shipping.telefono}
                      onChange={(e) => updateShipping({ telefono: e.target.value })}
                      required
                      className="mt-1.5 w-full border-b border-notte/20 bg-transparent py-1.5 text-sm text-notte outline-none focus:border-oro"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-medium uppercase tracking-[0.1em] text-testo/50">
                      Indirizzo (via e civico)
                    </span>
                    <input
                      type="text"
                      value={shipping.indirizzo}
                      onChange={(e) => updateShipping({ indirizzo: e.target.value })}
                      required
                      className="mt-1.5 w-full border-b border-notte/20 bg-transparent py-1.5 text-sm text-notte outline-none focus:border-oro"
                    />
                  </label>
                  <Combobox
                    label="Città"
                    options={cityOptions}
                    value={shipping.citta}
                    onSelect={handleSelectCity}
                    placeholder={comuni.length ? "Inizia a scrivere…" : "Caricamento…"}
                    disabled={comuni.length === 0}
                    required
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Combobox
                      label="Provincia"
                      options={provinceOptions}
                      value={provinciaDisplayValue}
                      onSelect={handleSelectProvincia}
                      placeholder={comuni.length ? "Inizia a scrivere…" : "Caricamento…"}
                      disabled={comuni.length === 0}
                      required
                    />
                    <Combobox
                      label="CAP"
                      options={capOptions}
                      value={shipping.cap}
                      onSelect={(o) => updateShipping({ cap: o.value })}
                      placeholder="Inizia a scrivere…"
                      disabled={capOptions.length === 0}
                      disabledHint="Seleziona prima la città"
                      required
                    />
                  </div>
                  <label className="block">
                    <span className="text-xs font-medium uppercase tracking-[0.1em] text-testo/50">
                      Info aggiuntive per la consegna (facoltativo)
                    </span>
                    <textarea
                      value={shipping.infoConsegna}
                      onChange={(e) => updateShipping({ infoConsegna: e.target.value })}
                      rows={2}
                      placeholder="Es. citofono, piano, punto di riferimento…"
                      className="mt-1.5 w-full resize-none border-b border-notte/20 bg-transparent py-1.5 text-sm text-notte outline-none focus:border-oro"
                    />
                  </label>

                  {shippingTouched && !isShippingComplete(shipping) && (
                    <p className="text-xs text-melograno">
                      Compila tutti i campi (tranne le info aggiuntive, facoltative).
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full rounded-full bg-notte py-3 text-sm font-semibold text-avorio transition-colors hover:bg-mari"
                  >
                    Continua →
                  </button>
                </form>
              </div>
            ) : method === "done" ? (
              <div className="py-6 text-center">
                <p className="font-display text-3xl italic text-notte">Grazie!</p>
                <p className="mt-3 text-sm leading-relaxed text-testo/70">
                  Il tuo ordine è stato inviato. Ti risponderemo al più presto
                  — Tastalu.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-6 rounded-full bg-notte px-6 py-3 text-sm font-medium text-avorio"
                >
                  Chiudi
                </button>
              </div>
            ) : (
              <>
                <p className="font-display text-2xl italic text-notte">
                  Come vuoi completare l&apos;ordine?
                </p>
                <p className="mt-2 text-sm text-testo/60">
                  Totale:{" "}
                  <span className="font-medium text-notte">
                    {totalPrice == null
                      ? "da confermare"
                      : totalPrice.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "EUR",
                        })}
                  </span>
                </p>

                {method === "choose" && (
                  <div className="mt-6 space-y-3">
                    <button
                      type="button"
                      onClick={handleWhatsAppOrder}
                      className="flex w-full items-center justify-center gap-2.5 rounded-full bg-pistacchio py-3.5 text-sm font-semibold text-notte transition-colors hover:opacity-90"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Ordina su WhatsApp
                    </button>
                    <button
                      type="button"
                      onClick={() => setMethod("paypal")}
                      disabled={totalPrice == null}
                      className="flex w-full items-center justify-center gap-2.5 rounded-full border border-notte/20 py-3.5 text-sm font-semibold text-notte transition-colors hover:border-notte disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Paga con PayPal
                    </button>
                    <button
                      type="button"
                      onClick={handleCardCheckout}
                      className="flex w-full items-center justify-center gap-2.5 rounded-full border border-notte/20 py-3.5 text-sm font-semibold text-notte transition-colors hover:border-notte"
                    >
                      <CreditCard className="h-4 w-4" />
                      Paga con carta — pagamento sicuro Nexi
                      <Lock className="h-3.5 w-3.5 text-testo/40" />
                    </button>
                    {totalPrice == null && (
                      <p className="text-center text-xs text-testo/50">
                        Il pagamento online richiede prezzi confermati per
                        tutti i prodotti nel carrello.
                      </p>
                    )}
                    {cardError && (
                      <p className="text-center text-xs text-melograno">{cardError}</p>
                    )}
                  </div>
                )}

                {method === "paypal" && (
                  <div className="mt-6">
                    <div ref={paypalRef} />
                    <button
                      type="button"
                      onClick={() => setMethod("choose")}
                      className="mt-4 text-xs text-testo/50 underline"
                    >
                      ← Scegli un altro metodo
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
