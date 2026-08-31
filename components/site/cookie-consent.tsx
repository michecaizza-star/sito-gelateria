"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  readCookieConsent,
  writeCookieConsent,
  REOPEN_COOKIE_BANNER_EVENT,
  type CookieConsent,
} from "@/lib/cookie-consent";

export function CookieConsentBanner() {
  const [open, setOpen] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = readCookieConsent();
    if (!existing) {
      const timer = setTimeout(() => setOpen(true), 900);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    function onReopen() {
      const existing = readCookieConsent();
      setAnalytics(existing?.analytics ?? false);
      setMarketing(existing?.marketing ?? false);
      setCustomizing(true);
      setOpen(true);
    }
    window.addEventListener(REOPEN_COOKIE_BANNER_EVENT, onReopen);
    return () => window.removeEventListener(REOPEN_COOKIE_BANNER_EVENT, onReopen);
  }, []);

  function save(consent: CookieConsent) {
    writeCookieConsent(consent);
    setOpen(false);
    setCustomizing(false);
  }

  function acceptAll() {
    save({ necessary: true, analytics: true, marketing: true, decidedAt: new Date().toISOString() });
  }

  function rejectAll() {
    save({ necessary: true, analytics: false, marketing: false, decidedAt: new Date().toISOString() });
  }

  function savePreferences() {
    save({ necessary: true, analytics, marketing, decidedAt: new Date().toISOString() });
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-[90] px-4 pb-4 sm:px-6 sm:pb-6"
        >
          <div className="mx-auto max-w-3xl rounded-[1.75rem] border border-notte/10 bg-avorio p-6 shadow-2xl sm:p-8">
            <div className="flex items-start gap-3">
              <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-oro" />
              <div>
                <p className="font-display text-lg italic text-notte">La tua privacy, prima di tutto</p>
                <p className="mt-1.5 text-sm leading-relaxed text-testo/70">
                  Usiamo solo cookie tecnici necessari al funzionamento del sito
                  (es. carrello). Con il tuo consenso potremmo in futuro usare
                  anche cookie statistici e di marketing per migliorare
                  l&apos;esperienza. Puoi leggere i dettagli nella{" "}
                  <Link href="/cookie" className="underline decoration-oro underline-offset-4">
                    Cookie Policy
                  </Link>
                  .
                </p>
              </div>
            </div>

            {customizing && (
              <div className="mt-5 space-y-3 border-t border-notte/10 pt-5">
                <label className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-testo/70">
                    Necessari <span className="text-testo/40">(sempre attivi)</span>
                  </span>
                  <input type="checkbox" checked disabled className="h-4 w-4 accent-notte" />
                </label>
                <label className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-testo/70">Statistici</span>
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="h-4 w-4 accent-notte"
                  />
                </label>
                <label className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-testo/70">Marketing</span>
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                    className="h-4 w-4 accent-notte"
                  />
                </label>
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-full bg-notte px-5 py-2.5 text-sm font-medium text-avorio transition-colors hover:bg-mari"
              >
                Accetta tutti
              </button>
              <button
                type="button"
                onClick={rejectAll}
                className="rounded-full border border-notte/20 px-5 py-2.5 text-sm font-medium text-notte transition-colors hover:border-notte"
              >
                Rifiuta
              </button>
              {customizing ? (
                <button
                  type="button"
                  onClick={savePreferences}
                  className={cn(
                    "rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
                    "bg-oro text-notte hover:bg-notte hover:text-avorio"
                  )}
                >
                  Salva preferenze
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setCustomizing(true)}
                  className="text-sm font-medium text-notte underline decoration-oro underline-offset-4"
                >
                  Personalizza
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
