export interface ProductVariants {
  flavors?: string[];
  sizes?: string[];
}

export const productVariants: Record<string, ProductVariants> = {
  "frutta-martorana": {
    sizes: ["500g", "1kg"],
  },
  "biscotti-regina": {
    sizes: ["250g", "500g"],
  },
  "paste-di-mandorla": {
    flavors: ["S", "Arancia", "Caffè", "Pistacchio", "Mandorla", "Mix"],
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
  croccante: {
    flavors: ["Mandorla", "Pistacchio"],
    sizes: ["500g", "1kg"],
  },
};

/**
 * TODO — prezzi reali: sostituire questi placeholder prima di pubblicare
 * il sito. Finché un prodotto resta a `null`, il carrello mostra
 * "Prezzo da definire" al suo posto e non lo somma al totale.
 */
export const placeholderPrices: Record<string, number | null> = {
  "biscotti-regina": 10,
  zuccotti: 10,
  buccellati: 10,
  "paste-di-mandorla": 10,
  "ciambelle-siciliane": 10,
  "crostate-artigianali": 10,
  "sbriciolata-ricotta": 10,
  "frutta-martorana": 10,
  croccante: 10,
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
