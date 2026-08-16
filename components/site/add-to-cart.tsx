"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { getPrice, getVariants, variantId } from "@/lib/pricing";
import type { Product } from "@/lib/site-content";

export function AddToCart({ product }: { product: Product }) {
  const variants = getVariants(product.slug);
  const [flavor, setFlavor] = useState(variants?.flavors?.[0]);
  const [size, setSize] = useState(variants?.sizes?.[0]);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useCart();

  function handleAdd() {
    addItem({
      id: variantId(product.slug, flavor, size),
      slug: product.slug,
      name: product.name,
      image: product.image,
      flavor,
      size,
      price: getPrice(product.slug),
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  }

  return (
    <div className="mt-5 space-y-3">
      {variants?.flavors && (
        <div>
          <p className="mb-1.5 text-xs font-medium uppercase tracking-[0.15em] text-testo/50">
            Gusto
          </p>
          <div className="flex flex-wrap gap-2">
            {variants.flavors.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFlavor(f)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                  f === flavor
                    ? "border-notte bg-notte text-avorio"
                    : "border-notte/20 text-testo/70 hover:border-notte/50"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      )}

      {variants?.sizes && (
        <div>
          <p className="mb-1.5 text-xs font-medium uppercase tracking-[0.15em] text-testo/50">
            Formato
          </p>
          <div className="flex flex-wrap gap-2">
            {variants.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                  s === size
                    ? "border-notte bg-notte text-avorio"
                    : "border-notte/20 text-testo/70 hover:border-notte/50"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={handleAdd}
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
          justAdded
            ? "bg-pistacchio text-notte"
            : "bg-oro text-notte hover:bg-notte hover:text-avorio"
        )}
      >
        {justAdded ? (
          <>
            <Check className="h-4 w-4" />
            Aggiunto
          </>
        ) : (
          <>
            <ShoppingBag className="h-4 w-4" />
            Aggiungi al carrello
          </>
        )}
      </button>
    </div>
  );
}
