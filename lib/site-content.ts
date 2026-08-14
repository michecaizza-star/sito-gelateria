export const WHATSAPP_NUMBER = "390000000000"; // TODO: sostituire con il numero WhatsApp reale di MARÌ
export const WHATSAPP_MESSAGE = "Ciao MARÌ! Vorrei fare un ordine — Tastalu 🍋";

export function waLink(message: string = WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const navLinks = [
  { href: "#storia", label: "Storia" },
  { href: "#prodotti", label: "Prodotti" },
  { href: "#materie-prime", label: "Materie prime" },
  { href: "#solo-sicilia", label: "Solo Sicilia" },
  { href: "#contatti", label: "Contatti" },
];

export type Tone = "mari" | "notte" | "oro" | "pistacchio" | "melograno" | "sabbia" | "avorio";

export interface Product {
  slug: string;
  group?: string;
  name: string;
  description: string;
  ingredient: string;
  tone: Tone;
  image: string;
}

export const products: Product[] = [
  {
    slug: "biscotti-regina",
    group: "Biscotti siciliani",
    name: "Biscotti Regina",
    description: "Biscotti tradizionali siciliani ricoperti di sesamo.",
    ingredient: "Sesamo e grano siciliano",
    tone: "oro",
    image: "/images/prodotto-regina.png",
  },
  {
    slug: "zuccotti",
    group: "Biscotti siciliani",
    name: "Zuccotti",
    description: "Dolci della tradizione, realizzati artigianalmente.",
    ingredient: "Ricetta antica siciliana",
    tone: "sabbia",
    image: "/images/prodotto-zuccotti.png",
  },
  {
    slug: "buccellati",
    group: "Biscotti siciliani",
    name: "Buccellati",
    description: "Biscotti siciliani ripieni, legati alla tradizione dell'isola.",
    ingredient: "Fichi e frutta secca",
    tone: "melograno",
    image: "/images/prodotto-buccellati.png",
  },
  {
    slug: "paste-di-mandorla",
    name: "Paste di mandorla",
    description: "Realizzate valorizzando la mandorla siciliana, con la ricetta della tradizione.",
    ingredient: "Mandorla siciliana",
    tone: "sabbia",
    image: "/images/prodotto-paste-mandorla.png",
  },
  {
    slug: "ciambelle-siciliane",
    name: "Ciambelle siciliane",
    description: "Ciambelle morbide della tradizione locale, cotte ogni giorno.",
    ingredient: "Ricetta della tradizione",
    tone: "oro",
    image: "/images/prodotto-ciambelle.png",
  },
  {
    slug: "crostate-artigianali",
    name: "Crostate artigianali",
    description: "Realizzate con marmellate e confetture di frutta locale e siciliana.",
    ingredient: "Frutta siciliana",
    tone: "melograno",
    image: "/images/prodotto-crostata.png",
  },
  {
    slug: "sbriciolata-ricotta",
    name: "Sbriciolata alla ricotta",
    description: "Friabile e morbida, realizzata con ricotta siciliana fresca.",
    ingredient: "Ricotta siciliana",
    tone: "notte",
    image: "/images/prodotto-sbriciolata.png",
  },
];

export const comingSoon = ["Gelati", "Granite", "Brioche", "Prodotti stagionali"];

export interface Ingredient {
  slug: string;
  name: string;
  story: string;
  usedIn: string;
  tone: Tone;
  image?: string;
}

export const ingredients: Ingredient[] = [
  {
    slug: "mandorla",
    name: "Mandorla siciliana",
    story:
      "Uno degli ingredienti simbolo della nostra pasticceria. La scegliamo per le nostre paste di mandorla e per le produzioni in cui vogliamo ritrovare il sapore autentico della tradizione siciliana.",
    usedIn: "Paste di mandorla",
    tone: "sabbia",
    image: "/images/ingrediente-mandorla.png",
  },
  {
    slug: "ricotta",
    name: "Ricotta siciliana",
    story:
      "Fresca, lavorata secondo la tradizione dei piccoli allevamenti locali. È il cuore della nostra sbriciolata e di molte lavorazioni dolciarie.",
    usedIn: "Sbriciolata alla ricotta",
    tone: "avorio",
    image: "/images/ingrediente-ricotta.png",
  },
  {
    slug: "pistacchio",
    name: "Pistacchio siciliano",
    story:
      "Un ingrediente pregiato della pasticceria siciliana, che stiamo destinando alle produzioni MARÌ presenti e future.",
    usedIn: "Produzioni presenti e future",
    tone: "pistacchio",
  },
  {
    slug: "limoni",
    name: "Limoni siciliani",
    story:
      "Una nota acida e profumata che usiamo per bilanciare le nostre crostate e produzioni stagionali.",
    usedIn: "Crostate artigianali",
    tone: "oro",
    image: "/images/ingrediente-limoni.png",
  },
  {
    slug: "arance",
    name: "Arance siciliane",
    story:
      "Le lavoriamo in marmellate e confetture per le nostre crostate della tradizione.",
    usedIn: "Crostate artigianali",
    tone: "melograno",
    image: "/images/ingrediente-arance.png",
  },
  {
    slug: "frutta-locale",
    name: "Frutta locale",
    story:
      "Frutta di stagione, trasformata in marmellate e confetture per crostate, granite e produzioni stagionali.",
    usedIn: "Crostate artigianali",
    tone: "melograno",
  },
  {
    slug: "grani",
    name: "Grani e farine siciliane",
    story:
      "Privilegiati quando disponibili, per gli impasti dei nostri prodotti da forno: dai biscotti della tradizione alle basi delle nostre crostate.",
    usedIn: "Biscotti Regina, Zuccotti, Buccellati",
    tone: "sabbia",
  },
  {
    slug: "miele",
    name: "Miele siciliano",
    story:
      "Utilizzato per addolcire alcune delle nostre lavorazioni della tradizione, in alternativa allo zucchero raffinato.",
    usedIn: "Dolci della tradizione",
    tone: "oro",
  },
];


export const openingHours: { day: string; hours: string }[] = [
  { day: "Lunedì – Giovedì", hours: "07:00 – 21:30" },
  { day: "Venerdì – Sabato", hours: "07:00 – 23:00" },
  { day: "Domenica", hours: "08:00 – 21:30" },
];

export const contactInfo = {
  addressLine1: "Via Edison 189",
  addressLine2: "Campobello di Licata (AG), Sicilia",
  address: "Via Edison 189, Campobello di Licata (AG), Sicilia",
  phone: "+39 000 000 0000", // TODO: sostituire con il numero reale
  email: "ciao@mari-sicilia.it", // TODO: sostituire con l'indirizzo email reale
  instagram: "https://instagram.com/mari.sicilia", // TODO: verificare handle reale
  facebook: "https://facebook.com/mari.sicilia", // TODO: verificare handle reale
  mapsQuery: "Via Edison 189, Campobello di Licata AG",
};

export const territoryTrail = [
  { label: "Campobello di Licata", detail: "Dove tutto nasce" },
  { label: "Agrigento", detail: "La nostra provincia" },
  { label: "Sicilia", detail: "La nostra materia prima" },
];
