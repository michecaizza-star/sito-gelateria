"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Tag, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { CheckoutModal } from "@/components/site/checkout-modal";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/site-content";

function formatPrice(value: number) {
  return value.toLocaleString("it-IT", { style: "currency", currency: "EUR" });
}

export function CartDrawer() {
  const {
    items,
    isOpen,
    close,
    updateQuantity,
    removeItem,
    totalCount,
    subtotal,
    discountCode,
    discountAmount,
    applyDiscountCode,
    removeDiscountCode,
    shippingCost,
    totalPrice,
    hasUnknownPrice,
    note,
    setNote,
  } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [codeError, setCodeError] = useState<string | null>(null);

  function handleApplyCode(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCodeError(null);
    if (applyDiscountCode(codeInput)) {
      setCodeInput("");
    } else {
      setCodeError("Codice non valido.");
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="fixed inset-0 z-[60] bg-notte/50"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-avorio shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-notte/10 px-6 py-5">
                <p className="flex items-center gap-2 font-display text-xl italic text-notte">
                  <ShoppingBag className="h-5 w-5" />
                  Il tuo carrello
                </p>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Chiudi carrello"
                  className="text-testo/60 hover:text-notte"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-5">
                {items.length === 0 ? (
                  <p className="mt-16 text-center text-sm text-testo/60">
                    Il carrello è vuoto. Esplora i nostri prodotti e aggiungi
                    qualcosa da assaggiare.
                  </p>
                ) : (
                  <ul className="space-y-5">
                    {items.map((item) => (
                      <li key={item.id} className="flex gap-4">
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-white">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-display text-base text-notte">
                                {item.name}
                              </p>
                              {(item.flavor || item.size) && (
                                <p className="text-xs text-testo/60">
                                  {[item.flavor, item.size].filter(Boolean).join(" · ")}
                                </p>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              aria-label="Rimuovi"
                              className="text-testo/40 hover:text-melograno"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-2 rounded-full border border-notte/15 px-1.5 py-1">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                aria-label="Diminuisci quantità"
                                className="flex h-6 w-6 items-center justify-center text-testo/70 hover:text-notte"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-4 text-center text-sm text-notte">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                aria-label="Aumenta quantità"
                                className="flex h-6 w-6 items-center justify-center text-testo/70 hover:text-notte"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <span className="text-sm font-medium text-notte">
                              {item.price == null
                                ? "Prezzo da definire"
                                : formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t border-notte/10 px-6 py-5">
                  <label className="mb-4 block">
                    <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.1em] text-testo/50">
                      Note per l&apos;ordine (facoltativo)
                    </span>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={2}
                      placeholder="Es. allergie, orario di ritiro, richieste particolari…"
                      className="w-full resize-none rounded-2xl border border-notte/20 bg-transparent px-3.5 py-2.5 text-xs text-notte outline-none placeholder:text-testo/40 focus:border-oro"
                    />
                  </label>

                  {discountCode ? (
                    <div className="mb-4 flex items-center justify-between rounded-full bg-pistacchio/20 px-4 py-2 text-xs">
                      <span className="flex items-center gap-1.5 font-medium text-notte">
                        <Tag className="h-3.5 w-3.5" />
                        Codice {discountCode} applicato
                      </span>
                      <button
                        type="button"
                        onClick={removeDiscountCode}
                        className="text-testo/50 underline hover:text-notte"
                      >
                        Rimuovi
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCode} className="mb-4 flex gap-2">
                      <input
                        type="text"
                        value={codeInput}
                        onChange={(e) => setCodeInput(e.target.value)}
                        placeholder="Codice sconto"
                        className="w-full flex-1 rounded-full border border-notte/20 bg-transparent px-4 py-2 text-xs text-notte outline-none placeholder:text-testo/40 focus:border-oro"
                      />
                      <button
                        type="submit"
                        className="whitespace-nowrap rounded-full border border-notte/20 px-4 py-2 text-xs font-semibold text-notte transition-colors hover:border-notte"
                      >
                        Applica
                      </button>
                    </form>
                  )}
                  {codeError && (
                    <p className="mb-4 -mt-2 text-xs text-melograno">{codeError}</p>
                  )}

                  <div className="space-y-1.5 text-sm">
                    <div className="flex items-center justify-between text-testo/70">
                      <span>Subtotale ({totalCount} {totalCount === 1 ? "articolo" : "articoli"})</span>
                      <span>{subtotal == null ? "Da definire" : formatPrice(subtotal)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex items-center justify-between text-pistacchio">
                        <span>Sconto</span>
                        <span>-{formatPrice(discountAmount)}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-testo/70">
                      <span>Spedizione</span>
                      <span>
                        {shippingCost == null
                          ? "Da definire"
                          : shippingCost === 0
                            ? "Gratuita"
                            : formatPrice(shippingCost)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 mb-4 flex items-center justify-between border-t border-notte/10 pt-3">
                    <span className="text-sm font-medium text-testo/70">Totale</span>
                    <span className="font-display text-xl text-notte">
                      {totalPrice == null ? "Da definire" : formatPrice(totalPrice)}
                    </span>
                  </div>

                  {hasUnknownPrice ? (
                    <p className="mb-4 text-xs text-testo/50">
                      Alcuni prodotti non hanno ancora un prezzo pubblicato:
                      confermeremo il totale (spedizione inclusa) con te su
                      WhatsApp.
                    </p>
                  ) : (
                    shippingCost != null &&
                    shippingCost > 0 && (
                      <p className="mb-4 text-xs text-testo/50">
                        Ti mancano {formatPrice(FREE_SHIPPING_THRESHOLD - (subtotal ?? 0))} per la spedizione gratuita.
                      </p>
                    )
                  )}
                  <button
                    type="button"
                    onClick={() => setCheckoutOpen(true)}
                    className="w-full rounded-full bg-notte py-3.5 text-sm font-semibold uppercase tracking-wide text-avorio transition-colors hover:bg-mari"
                  >
                    Vai al pagamento
                  </button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  );
}
