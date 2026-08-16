"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CreditCard, MessageCircle, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { waLink } from "@/lib/site-content";
import { PAYPAL_CLIENT_ID, STRIPE_PAYMENT_LINK_URL } from "@/lib/payments-config";

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: Record<string, unknown>) => { render: (el: HTMLElement) => void };
    };
  }
}

type Method = "choose" | "paypal" | "card" | "done";

export function CheckoutModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { items, totalPrice, clear } = useCart();
  const [method, setMethod] = useState<Method>("choose");
  const [cardError, setCardError] = useState<string | null>(null);
  const paypalRef = useRef<HTMLDivElement>(null);

  function handleClose() {
    setMethod("choose");
    setCardError(null);
    onClose();
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
    if (!STRIPE_PAYMENT_LINK_URL) {
      setCardError(
        "Il pagamento con carta non è ancora configurato su questo sito. Completa l'ordine su WhatsApp nel frattempo."
      );
      return;
    }
    window.open(STRIPE_PAYMENT_LINK_URL, "_blank", "noopener,noreferrer");
  }

  function handleWhatsAppOrder() {
    const lines = items.map(
      (i) =>
        `• ${i.name}${i.flavor ? " – " + i.flavor : ""}${i.size ? " (" + i.size + ")" : ""} x${i.quantity}`
    );
    const msg = `Ciao MARÌ! Vorrei ordinare:\n${lines.join("\n")}\n\nTastalu 🍋`;
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

            {method === "done" ? (
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
                      Paga con carta
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
