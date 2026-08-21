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
    .trim();
}

function fmtPrice(value: number) {
  return value.toLocaleString("it-IT", { style: "currency", currency: "EUR" });
}

function findProduct(normalized: string): Product | undefined {
  return products.find((p) => {
    const name = normalize(p.name);
    return normalized.includes(name) || name.includes(normalized) || normalized.includes(normalize(p.slug).replace(/-/g, " "));
  });
}

function findIngredient(normalized: string): Ingredient | undefined {
  return ingredients.find((i) => {
    const name = normalize(i.name);
    // match singular/plural-ish by trimming trailing vowel/consonant
    return normalized.includes(name) || normalized.includes(name.replace(/[eoi]$/, ""));
  });
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
  return parts.join("\n");
}

const PRODUCT_LIST_TEXT = products.map((p) => `• ${p.name}`).join("\n");
const INGREDIENT_LIST_TEXT = ingredients.map((i) => `• ${i.name} (${i.origin})`).join("\n");

const GREETING_RE = /\b(ciao|salve|buongiorno|buonasera|hey|ehi)\b/;
const PRODUCT_LIST_RE = /(che\s+prodott|quali\s+prodott|cosa\s+vendete|catalogo|menu|cosa\s+avete|prodotti\s+avete)/;
const INGREDIENT_LIST_RE = /(materie\s+prime|che\s+ingredient|quali\s+ingredient|ingredienti\s+usate)/;
const CONSERVATION_RE = /conserv/;
const SIZE_RE = /(grammatur|formato|formati|taglia|quanti\s+grammi|peso)/;
const PRICE_RE = /(prezzo|prezzi|costa|costano|costo|quanto\s+cost)/;
const SHIPPING_RE = /(spedizion|consegna|spedite|arriva)/;
const ORDER_RE = /(ordin|comprare|acquist|carrello|pagare|pagamento)/;
const DISCOUNT_RE = /(sconto|coupon|codice|newsletter)/;
const HOURS_RE = /(orari|apert|chius|quando\s+aprite)/;
const LOCATION_RE = /(dove\s+siete|indirizzo|negozio|dove\s+si\s+trova|come\s+arrivo)/;
const HORECA_RE = /(horeca|ristorante|bar\b|hotel|ingrosso|rivenditore|attivita)/;
const HUMAN_RE = /(parlare\s+con|operatore|persona\s+vera|umano)/;

export function getChatbotReply(rawText: string): ChatReply {
  const text = normalize(rawText);

  if (!text) {
    return {
      text: "Dimmi pure! Posso aiutarti con prodotti, materie prime, formati, conservazione, spedizioni e ordini.",
      suggestions: ["Che prodotti avete?", "Come si conservano i biscotti Regina?", "Quanto costa la spedizione?"],
    };
  }

  if (GREETING_RE.test(text) && text.length < 30) {
    return {
      text: "Ciao! Sono l'assistente MARÌ 🍋 Posso aiutarti con prodotti, ingredienti, formati, conservazione, spedizioni e ordini. Cosa vuoi sapere?",
      suggestions: ["Che prodotti avete?", "Che materie prime usate?", "Come ordino?"],
    };
  }

  const product = findProduct(text);
  if (product) {
    return {
      text: describeProduct(product),
      links: [{ label: "Vai al prodotto", href: "#prodotti" }],
    };
  }

  const ingredient = findIngredient(text);
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
    suggestions: ["Che prodotti avete?", "Come ordino?", "Quanto costa la spedizione?"],
    links: [{ label: "Scrivici su WhatsApp", href: waLink(), external: true }],
  };
}
