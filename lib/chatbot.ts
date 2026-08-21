import {
  products,
  ingredients,
  openingHours,
  contactInfo,
  waLink,
  NEWSLETTER_DISCOUNT_CODE,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_COST,
  type Product,
  type Ingredient,
} from "@/lib/site-content";
import { getPrice, getVariants } from "@/lib/pricing";

export interface ChatLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface ChatReply {
  text: string;
  links?: ChatLink[];
  suggestions?: string[];
}

function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text: string): string[] {
  return text.split(" ").filter(Boolean);
}

// Distanza di Levenshtein, per tollerare piccoli errori di battitura
// (es. "pistaccio" -> "pistacchio").
function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp: number[] = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const tmp = dp[j];
      dp[j] = a[i - 1] === b[j - 1] ? prev : 1 + Math.min(prev, dp[j], dp[j - 1]);
      prev = tmp;
    }
  }
  return dp[n];
}

function fuzzyIncludesWord(tokens: string[], word: string): boolean {
  const maxDistance = word.length >= 7 ? 2 : word.length >= 4 ? 1 : 0;
  return tokens.some((t) => {
    if (t === word) return true;
    if (Math.abs(t.length - word.length) > maxDistance) return false;
    return levenshtein(t, word) <= maxDistance;
  });
}

function fmtPrice(value: number) {
  return value.toLocaleString("it-IT", { style: "currency", currency: "EUR" });
}

interface Entry<T> {
  item: T;
  aliases: string[]; // parole/frasi normalizzate, dalla più che dalla meno specifica
}

const PRODUCT_ALIASES: Record<string, string[]> = {
  "biscotti-regina": ["biscotti regina", "biscotto regina", "regina"],
  zuccotti: ["zuccotti", "zuccotto"],
  buccellati: ["buccellati", "buccellato"],
  "paste-di-mandorla": ["paste di mandorla", "pasta di mandorla", "paste mandorla"],
  "ciambelle-siciliane": ["ciambelle siciliane", "ciambelle", "ciambella"],
  "crostate-artigianali": ["crostate artigianali", "crostate", "crostata"],
  "sbriciolata-ricotta": ["sbriciolata alla ricotta", "sbriciolata"],
  "frutta-martorana": ["frutta martorana", "martorana"],
  croccante: ["croccante"],
};

const INGREDIENT_ALIASES: Record<string, string[]> = {
  miele: ["miele"],
  mandorle: ["mandorle", "mandorla", "mandorlato"],
  pistacchio: ["pistacchio", "pistacchi"],
  arance: ["arance", "arancia", "arancio"],
  limoni: ["limoni", "limone"],
  farina: ["farina", "grano"],
  zucchine: ["zucchine", "zucchina"],
  fichi: ["fichi", "fico"],
};

const productEntries: Entry<Product>[] = products.map((p) => ({
  item: p,
  aliases: PRODUCT_ALIASES[p.slug] ?? [normalize(p.name)],
}));

const ingredientEntries: Entry<Ingredient>[] = ingredients.map((i) => ({
  item: i,
  aliases: INGREDIENT_ALIASES[i.slug] ?? [normalize(i.name)],
}));

function findBestMatch<T>(text: string, tokens: string[], entries: Entry<T>[]): T | undefined {
  // 1. corrispondenza esatta di una frase/alias (multi-parola compresa)
  for (const entry of entries) {
    for (const alias of entry.aliases) {
      if (alias.includes(" ") ? text.includes(alias) : tokens.includes(alias)) {
        return entry.item;
      }
    }
  }
  // 2. corrispondenza tollerante (per errori di battitura) sulle singole parole
  for (const entry of entries) {
    for (const alias of entry.aliases) {
      if (alias.includes(" ")) continue;
      if (fuzzyIncludesWord(tokens, alias)) return entry.item;
    }
  }
  return undefined;
}

function findProductsByIngredient(ingredient: Ingredient): Product[] {
  const key = normalize(ingredient.name).replace(/[eoi]$/, "");
  return products.filter((p) => normalize(p.ingredient).includes(key));
}

function describeProduct(product: Product): string {
  const variants = getVariants(product.slug);
  const price = getPrice(product.slug);
  const parts = [`${product.name} — ${product.description}`, `Materia prima protagonista: ${product.ingredient}.`];
  if (variants?.sizes?.length) parts.push(`Formati: ${variants.sizes.join(", ")}.`);
  if (variants?.flavors?.length) parts.push(`Gusti disponibili: ${variants.flavors.join(", ")}.`);
  parts.push(price != null ? `Prezzo indicativo: ${fmtPrice(price)}.` : "Prezzo da confermare su WhatsApp.");
  parts.push(`Conservazione: ${product.conservation}`);
  return parts.join("\n");
}

function describeIngredient(ingredient: Ingredient): string {
  const parts = [`${ingredient.name} — ${ingredient.origin}`, ingredient.story];
  if (ingredient.usedIn) parts.push(`La trovi in: ${ingredient.usedIn}.`);
  const related = findProductsByIngredient(ingredient);
  if (related.length) parts.push(`La trovi protagonista in: ${related.map((p) => p.name).join(", ")}.`);
  return parts.join("\n");
}

const PRODUCT_LIST_TEXT = products.map((p) => `• ${p.name}`).join("\n");
const INGREDIENT_LIST_TEXT = ingredients.map((i) => `• ${i.name} (${i.origin})`).join("\n");

const GREETING_RE = /\b(ciao|salve|buongiorno|buonasera|buondi|hey|ehi|oi)\b/;
const THANKS_RE = /\b(grazie|perfetto|ok|va bene|top|ottimo|super|figo)\b/;
const CAPABILITIES_RE = /(chi sei|cosa sai fare|cosa puoi fare|come funzioni|sei un bot|sei un robot|sei un umano)/;
const PRODUCT_LIST_RE = /(che prodott|quali prodott|cosa vendete|catalogo|men[uù]|cosa avete|prodotti avete|cosa producete)/;
const INGREDIENT_LIST_RE = /(materie prime|che ingredient|quali ingredient|ingredienti usate|con cosa (li |vi )?fate)/;
const CONSERVATION_RE = /(conserv|dura(no)?|scadenz|si mantengono|shelf life|quanto (si )?tengono)/;
const SIZE_RE = /(grammatur|formato|formati|taglia|quanti grammi|\bpeso\b|quantita|misura|confezion)/;
const PRICE_RE = /(prezzo|prezzi|costa|costano|costo|quanto cost|spesa|euro)/;
const SHIPPING_RE = /(spedizion|consegna|spedite|arriva|tempi di consegna|quanto ci mette)/;
const ORDER_RE = /(ordin|comprare|acquist|carrello|pagare|pagamento|come si compra|voglio comprare|voglio ordinare)/;
const DISCOUNT_RE = /(sconto|coupon|codice|newsletter|promo)/;
const HOURS_RE = /(orari|apert|chius|quando aprite|che ore)/;
const LOCATION_RE = /(dove siete|indirizzo|negozio|dove si trova|come arrivo|dove siete situati)/;
const HORECA_RE = /(horeca|ristorante|bar\b|hotel|ingrosso|rivenditore|attivita|b2b)/;
const HUMAN_RE = /(parlare con|operatore|persona vera|umano|assistenza)/;

const FALLBACK_SUGGESTIONS = ["Che prodotti avete?", "Come ordino?", "Quanto costa la spedizione?"];

export function getChatbotReply(rawText: string): ChatReply {
  const text = normalize(rawText);
  const tokens = tokenize(text);

  if (!text) {
    return {
      text: "Dimmi pure! Posso aiutarti con prodotti, materie prime, formati, conservazione, spedizioni e ordini.",
      suggestions: FALLBACK_SUGGESTIONS,
    };
  }

  if (CAPABILITIES_RE.test(text)) {
    return {
      text: "Sono l'assistente virtuale di MARÌ: rispondo usando le informazioni reali del sito (prodotti, materie prime, formati, prezzi, conservazione, spedizioni, sconti e ordini). Non sono una persona — per tutto il resto ti metto in contatto con noi su WhatsApp.",
      links: [{ label: "Apri WhatsApp", href: waLink(), external: true }],
    };
  }

  if (GREETING_RE.test(text) && tokens.length < 6) {
    return {
      text: "Ciao! Sono l'assistente MARÌ 🍋 Posso aiutarti con prodotti, ingredienti, formati, conservazione, spedizioni e ordini. Cosa vuoi sapere?",
      suggestions: ["Che prodotti avete?", "Che materie prime usate?", "Come ordino?"],
    };
  }

  if (THANKS_RE.test(text) && tokens.length < 4) {
    return { text: "Di nulla! Se hai altre domande sono qui. Tastalu! 🍋" };
  }

  const product = findBestMatch(text, tokens, productEntries);
  if (product) {
    return {
      text: describeProduct(product),
      links: [{ label: "Vai al prodotto", href: "#prodotti" }],
    };
  }

  const ingredient = findBestMatch(text, tokens, ingredientEntries);
  if (ingredient) {
    return {
      text: describeIngredient(ingredient),
      links: [{ label: "Scopri le materie prime", href: "#materie-prime" }],
    };
  }

  if (PRODUCT_LIST_RE.test(text)) {
    return {
      text: `Ecco i nostri prodotti:\n${PRODUCT_LIST_TEXT}\n\nChiedimi di uno in particolare per formati, prezzo e conservazione.`,
      links: [{ label: "Vai ai prodotti", href: "#prodotti" }],
    };
  }

  if (INGREDIENT_LIST_RE.test(text)) {
    return {
      text: `Le nostre materie prime, quasi tutte siciliane:\n${INGREDIENT_LIST_TEXT}`,
      links: [{ label: "Scopri le materie prime", href: "#materie-prime" }],
    };
  }

  if (CONSERVATION_RE.test(text)) {
    return {
      text: "La conservazione cambia da prodotto a prodotto (alcuni si conservano a temperatura ambiente, altri in frigorifero). Dimmi il nome del prodotto e ti dico come conservarlo al meglio!",
      suggestions: products.slice(0, 4).map((p) => `Come si conserva ${p.name}?`),
    };
  }

  if (SIZE_RE.test(text)) {
    return {
      text: "I formati variano da prodotto a prodotto. Dimmi quale prodotto ti interessa e ti dico i formati e i gusti disponibili.",
      suggestions: products.slice(0, 4).map((p) => `Formati di ${p.name}`),
    };
  }

  if (DISCOUNT_RE.test(text)) {
    return {
      text: `Iscrivendoti alla newsletter ricevi subito un codice sconto del 10% sul primo ordine, da inserire nel carrello. Se ce l'hai già, il codice è ${NEWSLETTER_DISCOUNT_CODE}.`,
      links: [{ label: "Iscriviti alla newsletter", href: "#top" }],
    };
  }

  if (SHIPPING_RE.test(text)) {
    return {
      text: `Spedizione gratuita sopra i ${fmtPrice(FREE_SHIPPING_THRESHOLD)} di spesa, altrimenti ${fmtPrice(SHIPPING_COST)}. Puoi vedere il totale aggiornato direttamente nel carrello.`,
    };
  }

  if (PRICE_RE.test(text)) {
    return {
      text: "I prezzi sono indicati su ogni prodotto e nel carrello (li trovi anche sommati con spedizione e eventuale sconto). Dimmi un prodotto specifico se vuoi il suo prezzo.",
      links: [{ label: "Vai ai prodotti", href: "#prodotti" }],
    };
  }

  if (ORDER_RE.test(text)) {
    return {
      text: "Per ordinare: scegli i prodotti nella sezione Prodotti, aggiungili al carrello (icona in alto a destra), poi clicca su \"Vai al pagamento\". Puoi pagare con WhatsApp, PayPal o carta (Nexi).",
      links: [
        { label: "Vai ai prodotti", href: "#prodotti" },
        { label: "Scrivici su WhatsApp", href: waLink(), external: true },
      ],
    };
  }

  if (HOURS_RE.test(text)) {
    return {
      text: `I nostri orari:\n${openingHours.map((o) => `${o.day}: ${o.hours}`).join("\n")}`,
    };
  }

  if (LOCATION_RE.test(text)) {
    return {
      text: `Ci trovi a ${contactInfo.address}.`,
      links: [{ label: "Vai ai contatti", href: "#contatti" }],
    };
  }

  if (HORECA_RE.test(text)) {
    return {
      text: "Realizziamo prodotti personalizzati per bar, hotel, ristoranti e attività Horeca. Raccontaci la tua idea nel modulo dedicato.",
      links: [{ label: "Vai a MARÌ per Horeca", href: "#horeca" }],
    };
  }

  if (HUMAN_RE.test(text)) {
    return {
      text: "Certo! Scrivici direttamente su WhatsApp, ti rispondiamo il prima possibile.",
      links: [{ label: "Apri WhatsApp", href: waLink(), external: true }],
    };
  }

  return {
    text: "Non sono sicura di aver capito bene! Posso aiutarti con prodotti, materie prime, formati, conservazione, spedizioni o ordini. Oppure scrivici direttamente su WhatsApp.",
    suggestions: FALLBACK_SUGGESTIONS,
    links: [{ label: "Scrivici su WhatsApp", href: waLink(), external: true }],
  };
}
