export const COOKIE_CONSENT_KEY = "mari-cookie-consent";

/**
 * Evento custom su `window`: la pagina /cookie lo usa per far riaprire
 * il banner (es. dal pulsante "Gestisci preferenze"), senza dover
 * passare stato tra componenti lontani nell'albero.
 */
export const REOPEN_COOKIE_BANNER_EVENT = "mari:reopen-cookie-banner";

export interface CookieConsent {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  decidedAt: string;
}

export function readCookieConsent(): CookieConsent | null {
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookieConsent;
  } catch {
    return null;
  }
}

export function writeCookieConsent(consent: CookieConsent) {
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
  } catch {
    // ignore unavailable storage
  }
}
