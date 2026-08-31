"use client";

import { REOPEN_COOKIE_BANNER_EVENT } from "@/lib/cookie-consent";

export function ManageCookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(REOPEN_COOKIE_BANNER_EVENT))}
      className="mt-4 inline-block rounded-full bg-notte px-5 py-2.5 text-sm font-medium text-avorio transition-colors hover:bg-mari"
    >
      Gestisci preferenze cookie
    </button>
  );
}
