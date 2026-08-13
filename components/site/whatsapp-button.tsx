"use client";

import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/site-content";

export function WhatsAppButton() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Ordina su WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-pistacchio py-3 pl-3 pr-3 text-avorio shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all hover:pr-5 sm:bottom-8 sm:right-8"
    >
      <MessageCircle className="h-6 w-6 shrink-0" strokeWidth={2} />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 group-hover:max-w-[10rem]">
        Ordina su WhatsApp
      </span>
    </a>
  );
}
