"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/site/logo";
import { navLinks, waLink } from "@/lib/site-content";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        scrolled || open
          ? "bg-avorio/90 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" className="flex items-center">
          <Logo plate size={32} />
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium tracking-wide transition-colors",
                scrolled ? "text-testo/80 hover:text-notte" : "text-avorio/85 hover:text-avorio"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "rounded-full px-5 py-2.5 font-display text-sm italic transition-colors",
              scrolled
                ? "bg-notte text-avorio hover:bg-mari"
                : "bg-avorio text-notte hover:bg-oro"
            )}
          >
            Tastalu — Ordina
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          className={cn(
            "lg:hidden",
            scrolled || open ? "text-notte" : "text-avorio"
          )}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-notte/10 bg-avorio px-6 py-6 lg:hidden">
          <nav className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-testo/85"
              >
                {link.label}
              </a>
            ))}
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-notte px-5 py-3 text-center font-display text-sm italic text-avorio"
            >
              Tastalu — Ordina
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
