import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Container } from "@/components/site/container";
import { Logo } from "@/components/site/logo";
import { FacebookIcon, InstagramIcon } from "@/components/site/social-icons";
import { contactInfo, waLink } from "@/lib/site-content";

export function Footer() {
  return (
    <footer className="bg-notte py-16 text-avorio/70">
      <Container className="flex flex-col items-center gap-8 text-center">
        <Logo size={52} invert />

        <p className="font-display text-2xl italic text-avorio">Tastalu.</p>

        <div className="text-sm leading-relaxed text-avorio/70">
          <p>{contactInfo.addressLine1}</p>
          <p>{contactInfo.addressLine2}</p>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-avorio">
            WhatsApp <MessageCircle className="h-3.5 w-3.5" />
          </a>
          <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-avorio">
            Instagram
          </a>
          <Link href="/#contatti" className="hover:text-avorio">
            Contatti
          </Link>
          <a href="/privacy" className="hover:text-avorio">
            Privacy
          </a>
          <a href="/cookie" className="hover:text-avorio">
            Cookie
          </a>
          <a href="/termini-vendita" className="hover:text-avorio">
            Termini e condizioni
          </a>
        </nav>

        <div className="flex gap-4">
          <a
            href={contactInfo.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-avorio/20 hover:border-avorio/50"
          >
            <InstagramIcon className="h-4 w-4" />
          </a>
          <a
            href={contactInfo.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-avorio/20 hover:border-avorio/50"
          >
            <FacebookIcon className="h-4 w-4" />
          </a>
        </div>

        <div className="w-full border-t border-avorio/10 pt-8 text-xs">
          <p className="font-display text-base italic tracking-wide text-avorio/90">
            MARÌ — SOLO SICILIA.
          </p>
          <p className="mt-2">© {new Date().getFullYear()} MARÌ — Tutti i diritti riservati</p>
          <p className="mt-1 text-avorio/40">
            Immagini dei prodotti generate con intelligenza artificiale, a scopo illustrativo.
          </p>
        </div>
      </Container>
    </footer>
  );
}
