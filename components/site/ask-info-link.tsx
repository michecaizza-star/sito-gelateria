"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageCircle } from "lucide-react";
import { useChatbot } from "@/lib/chatbot-context";
import { waLink } from "@/lib/site-content";
import { cn } from "@/lib/utils";

export function AskInfoLink({
  productName,
  className,
}: {
  productName: string;
  className?: string;
}) {
  const { openChatbot } = useChatbot();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "group/link inline-flex items-center gap-1.5 font-sans font-medium text-notte/70 transition-colors hover:text-mari",
          className
        )}
      >
        Chiedi info
        <span className="transition-transform group-hover/link:translate-x-1">→</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-notte/10 bg-avorio shadow-xl"
            >
              <p className="px-4 pt-3 text-xs font-medium uppercase tracking-[0.15em] text-testo/40">
                Come vuoi chiedere?
              </p>
              <button
                type="button"
                onClick={() => {
                  openChatbot(`Dimmi di più su ${productName}`);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-notte transition-colors hover:bg-sabbia/40"
              >
                <Bot className="h-4 w-4 shrink-0 text-oro" />
                Scrivi al nostro assistente
              </button>
              <a
                href={waLink(`Ciao MARÌ! Vorrei sapere di più su ${productName}`)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex w-full items-center gap-3 border-t border-notte/10 px-4 py-3 text-left text-sm text-notte transition-colors hover:bg-sabbia/40"
              >
                <MessageCircle className="h-4 w-4 shrink-0 text-oro" />
                Scrivi su WhatsApp
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
