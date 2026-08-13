export const WHATSAPP_NUMBER = "390000000000"; // TODO: sostituire con il numero WhatsApp reale
export const WHATSAPP_MESSAGE =
  "Ciao MARÌ! Vorrei fare un ordine 🍋";

export function waLink(message: string = WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const navLinks = [
  { href: "#storia", label: "La nostra storia" },
  { href: "#prodotti", label: "Prodotti" },
  { href: "#territorio", label: "Territorio" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contatti", label: "Contatti" },
];

export interface Product {
  name: string;
  description: string;
  tone: "mari" | "notte" | "oro" | "pistacchio" | "melograno" | "sabbia";
}

export const products: Product[] = [
  {
    name: "Gelati artigianali",
    description:
      "Pistacchio di Bronte, mandorla di Avola, cioccolato di Modica: gusti classici siciliani, mantecati ogni giorno.",
    tone: "pistacchio",
  },
  {
    name: "Granite",
    description:
      "Limone, mandorla, gelso e caffè: la granita della tradizione, servita con la brioscia col tuppo.",
    tone: "mari",
  },
  {
    name: "Brioche col tuppo",
    description:
      "Impasto morbido lievitato con lenta lievitazione, sfornato ogni mattina per accompagnare gelato e granita.",
    tone: "oro",
  },
  {
    name: "Paste di mandorla",
    description:
      "Ricetta antica a base di mandorla siciliana pura, zucchero e aromi naturali di agrumi.",
    tone: "sabbia",
  },
  {
    name: "Crostate",
    description:
      "Frolla artigianale con confetture di frutta siciliana: fico d'India, arancia, gelso e mandorla.",
    tone: "melograno",
  },
  {
    name: "Biscotti siciliani",
    description:
      "Ricciarelli, mostaccioli e biscotti al pistacchio, preparati in piccoli lotti con materie prime locali.",
    tone: "notte",
  },
];

export interface Ingredient {
  name: string;
  origin: string;
  description: string;
}

export const ingredients: Ingredient[] = [
  {
    name: "Pistacchio",
    origin: "Bronte, Catania",
    description: "DOP, raccolto a mano sulle pendici dell'Etna.",
  },
  {
    name: "Mandorla",
    origin: "Avola, Siracusa",
    description: "Varietà pizzuta, tra le più pregiate al mondo.",
  },
  {
    name: "Limone",
    origin: "Siracusa",
    description: "IGP, agrumeti a pochi passi dal mare.",
  },
  {
    name: "Ricotta di pecora",
    origin: "Entroterra siciliano",
    description: "Lavorazione fresca, da piccoli allevamenti locali.",
  },
  {
    name: "Fico d'India",
    origin: "Etna",
    description: "Raccolto a fine estate, dolcezza naturale intensa.",
  },
  {
    name: "Cioccolato di Modica",
    origin: "Modica, Ragusa",
    description: "Lavorazione a freddo secondo la tradizione IGP.",
  },
];

export const galleryItems: { label: string; tone: Product["tone"] }[] = [
  { label: "Pistacchio di Bronte", tone: "pistacchio" },
  { label: "Granita al limone", tone: "mari" },
  { label: "Brioche col tuppo", tone: "oro" },
  { label: "Mandorla di Avola", tone: "sabbia" },
  { label: "Fico d'India", tone: "melograno" },
  { label: "Cioccolato di Modica", tone: "notte" },
  { label: "Gelso nero", tone: "notte" },
  { label: "Agrumi di Siracusa", tone: "mari" },
];

export const openingHours: { day: string; hours: string }[] = [
  { day: "Lunedì – Giovedì", hours: "11:00 – 22:30" },
  { day: "Venerdì – Sabato", hours: "11:00 – 23:30" },
  { day: "Domenica", hours: "11:00 – 22:30" },
];

export const contactInfo = {
  address: "Corso Vittorio Emanuele, 12 — Cefalù (PA), Sicilia",
  phone: "+39 000 000 0000",
  email: "ciao@mari-gelateria.it",
  instagram: "https://instagram.com/mari.gelateria",
  facebook: "https://facebook.com/mari.gelateria",
  mapsQuery: "MARÌ Gelateria, Cefalù, Sicilia",
};
