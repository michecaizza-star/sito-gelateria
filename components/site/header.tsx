"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/site/logo";
import { navLinks, waLink } from "@/lib/site-content";
import { useCart } from "@/lib/cart-context";

function CartTrigger({ tone }: { tone: "light" | "dark" }) {
  const { open, totalCount } = useCart();
  return (
    <button
      type="button"
      onClick={open}
      aria-label="Apri carrello"
      className={cn(
        "relative flex h-9 w-9 items-center justify-center",
        tone === "dark" ? "text-notte" : "text-avorio"
      )}
    >
      <ShoppingBag className="h-5 w-5" />
      {totalCount > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-oro px-1 text-[10px] font-semibold text-notte">
          {totalCount}
        </span>
      )}
    </button>
  );
}

export function Header({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // "light" = testo/logo chiari su sfondo scuro (hero trasparente, o banner
  // blu forzato con `solid`). Su `solid` lo sfondo resta sempre blu, quindi
  // lo stile chiaro non dipende né dallo scroll né dal menu mobile aperto.
  const light = solid || !scrolled;
  const mobileLight = solid || !(scrolled || open);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        solid
          ? "bg-notte shadow-sm"
          : scrolled || open
            ? "bg-avorio/90 shadow-sm backdrop-blur-md"
            : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link href="/#top" className="flex items-center">
          <Logo
            size={58}
            invert={light}
            className="drop-shadow-[0_1px_8px_rgba(10,47,82,0.35)]"
          />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium tracking-wide transition-colors",
                light ? "text-avorio/85 hover:text-avorio" : "text-testo/80 hover:text-notte"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <CartTrigger tone={light ? "light" : "dark"} />
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "rounded-full px-5 py-2.5 font-display text-sm italic transition-colors",
              light
                ? "bg-avorio text-notte hover:bg-oro"
                : "bg-notte text-avorio hover:bg-mari"
            )}
          >
            Tastalu — Ordina
          </a>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <CartTrigger tone={mobileLight ? "light" : "dark"} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            className={cn(mobileLight ? "text-avorio" : "text-notte")}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
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
