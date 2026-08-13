import { Container } from "@/components/site/container";
import { Logo } from "@/components/site/logo";
import { FacebookIcon, InstagramIcon } from "@/components/site/social-icons";
import { navLinks, contactInfo } from "@/lib/site-content";

export function Footer() {
  return (
    <footer className="bg-notte py-16 text-avorio/70">
      <Container className="flex flex-col items-center gap-10 text-center">
        <Logo plate size={48} />

        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-avorio">
              {link.label}
            </a>
          ))}
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
          <p>© {new Date().getFullYear()} MARÌ Gelateria Artigianale — Tutti i diritti riservati</p>
          <p className="mt-1.5">{contactInfo.address}</p>
        </div>
      </Container>
    </footer>
  );
}
