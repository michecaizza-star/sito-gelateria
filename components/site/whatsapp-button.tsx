"use client";

import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/site-content";

export function WhatsAppButton() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Tastalu — Ordina su WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full border border-oro/40 bg-notte py-3 pl-4 pr-4 text-avorio shadow-[0_10px_30px_rgba(10,47,82,0.35)] transition-all hover:border-oro hover:pr-5 sm:bottom-8 sm:right-8"
    >
      <span className="font-display text-base italic text-oro">Tastalu</span>
      <MessageCircle className="h-[18px] w-[18px] shrink-0" strokeWidth={2} />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 group-hover:max-w-[9rem]">
        Ordina su WhatsApp
      </span>
    </a>
  );
}
