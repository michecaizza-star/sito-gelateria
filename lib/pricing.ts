export interface ProductVariants {
  flavors?: string[];
  sizes?: string[];
}

export const productVariants: Record<string, ProductVariants> = {
  "frutta-martorana": {
    flavors: ["S", "Arancia", "Caffè", "Pistacchio", "Mandorla"],
    sizes: ["500g", "1kg"],
  },
  "biscotti-regina": {
    sizes: ["250g", "500g"],
  },
  buccellati: {
    sizes: ["250g", "500g"],
  },
  zuccotti: {
    sizes: ["250g", "500g"],
  },
  "crostate-artigianali": {
    flavors: ["Limone di Siracusa", "Zenzero", "Arancia", "Fichi", "Fichi d'India"],
    sizes: ["150g", "400g"],
  },
  "sbriciolata-ricotta": {
    flavors: ["Ricotta e cioccolato", "Ricotta e arancia"],
    sizes: ["150g", "400g"],
  },
};

/**
 * TODO — prezzi reali: sostituire questi placeholder prima di pubblicare
 * il sito. Finché un prodotto resta a `null`, il carrello mostra
 * "Prezzo da definire" al suo posto e non lo somma al totale.
 */
export const placeholderPrices: Record<string, number | null> = {
  "biscotti-regina": null,
  zuccotti: null,
  buccellati: null,
  "paste-di-mandorla": null,
  "ciambelle-siciliane": null,
  "crostate-artigianali": null,
  "sbriciolata-ricotta": null,
  "frutta-martorana": null,
};

export function getPrice(slug: string): number | null {
  return placeholderPrices[slug] ?? null;
}

export function getVariants(slug: string): ProductVariants | undefined {
  return productVariants[slug];
}

export function variantId(slug: string, flavor?: string, size?: string) {
  return [slug, flavor, size].filter(Boolean).join("__");
}
