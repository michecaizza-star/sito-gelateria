"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { NewsletterForm } from "@/components/site/newsletter-form";

const STORAGE_KEY = "mari-newsletter-popup-seen";

export function NewsletterPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let seen = true;
    try {
      seen = window.localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // ignore unavailable storage
    }
    if (seen) return;

    const timer = setTimeout(() => setOpen(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  function markSeen() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore unavailable storage
    }
  }

  function dismiss() {
    setOpen(false);
    markSeen();
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            className="fixed inset-0 z-[95] bg-notte/60"
          />
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-1/2 z-[96] w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[1.75rem] bg-avorio p-8 text-center shadow-2xl sm:p-10"
          >
            <button
              type="button"
              onClick={dismiss}
              aria-label="Chiudi"
              className="absolute right-5 top-5 text-testo/50 hover:text-notte"
            >
              <X className="h-5 w-5" />
            </button>

            <Logo size={56} className="mx-auto" />

            <p className="mt-6 text-xs font-medium uppercase tracking-[0.25em] text-oro">
              Benvenuta/o su MARÌ
            </p>
            <h2 className="mt-3 font-display text-3xl italic text-notte">
              Il 10% sul tuo primo ordine.
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-testo/70">
              Iscriviti alla newsletter e ricevi subito via email il codice
              sconto per il tuo primo ordine da MARÌ.
            </p>

            <NewsletterForm onSubscribed={markSeen} />

            <p className="mt-4 text-xs text-testo/40">
              Nessuno spam, puoi disiscriverti quando vuoi.
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
