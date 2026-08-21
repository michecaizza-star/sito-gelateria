export const WHATSAPP_NUMBER = "390000000000"; // TODO: sostituire con il numero WhatsApp reale di MARÌ
export const WHATSAPP_MESSAGE = "Ciao MARÌ! Vorrei fare un ordine — Tastalu 🍋";

export function waLink(message: string = WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const HORECA_EMAIL = "michecaizza@gmail.com";
export const NEWSLETTER_EMAIL = "michecaizza@gmail.com";
export const NEWSLETTER_DISCOUNT_CODE = "TASTALU10";
export const NEWSLETTER_DISCOUNT_RATE = 0.1;
export const GIFT_PROFILE_EMAIL = "michecaizza@gmail.com";

export const FREE_SHIPPING_THRESHOLD = 75;
export const SHIPPING_COST = 4.99;

export const navLinks = [
  { href: "#storia", label: "Storia" },
  { href: "#prodotti", label: "Prodotti" },
  { href: "#materie-prime", label: "Materie prime" },
  { href: "#solo-sicilia", label: "Solo Sicilia" },
  { href: "#horeca", label: "Horeca" },
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
  /**
   * TODO — indicazioni generiche, da verificare/correggere con la vera
   * shelf-life dei prodotti prima di pubblicarle come informazione
   * ufficiale (usate anche dal chatbot).
   */
  conservation: string;
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
    conservation: "In luogo fresco e asciutto, in contenitore ermetico, lontano da fonti di calore e umidità.",
  },
  {
    slug: "zuccotti",
    group: "Biscotti siciliani",
    name: "Zuccotti",
    description: "Dolci della tradizione, realizzati artigianalmente.",
    ingredient: "Ricetta antica siciliana",
    tone: "sabbia",
    image: "/images/prodotto-zuccotti.png",
    conservation: "In luogo fresco e asciutto, in contenitore ermetico, lontano da fonti di calore e umidità.",
  },
  {
    slug: "buccellati",
    group: "Biscotti siciliani",
    name: "Buccellati",
    description: "Biscotti siciliani ripieni, legati alla tradizione dell'isola.",
    ingredient: "Fichi e frutta secca",
    tone: "melograno",
    image: "/images/prodotto-buccellati.png",
    conservation: "In luogo fresco e asciutto, in contenitore ermetico; una volta aperta la confezione, consumare preferibilmente entro pochi giorni.",
  },
  {
    slug: "paste-di-mandorla",
    name: "Paste di mandorla",
    description: "Realizzate valorizzando la mandorla siciliana, con la ricetta della tradizione.",
    ingredient: "Mandorla siciliana",
    tone: "sabbia",
    image: "/images/prodotto-paste-mandorla.png",
    conservation: "In luogo fresco e asciutto, in contenitore ermetico a temperatura ambiente.",
  },
  {
    slug: "ciambelle-siciliane",
    name: "Ciambelle siciliane",
    description: "Ciambelle morbide della tradizione locale, cotte ogni giorno.",
    ingredient: "Ricetta della tradizione",
    tone: "oro",
    image: "/images/prodotto-ciambelle.png",
    conservation: "A temperatura ambiente in contenitore chiuso; da consumare preferibilmente entro 2-3 giorni per apprezzarne al meglio la morbidezza.",
  },
  {
    slug: "crostate-artigianali",
    name: "Crostate artigianali",
    description: "Realizzate con marmellate e confetture di frutta locale e siciliana.",
    ingredient: "Frutta siciliana",
    tone: "melograno",
    image: "/images/prodotto-crostata.png",
    conservation: "A temperatura ambiente in contenitore chiuso per 2-3 giorni; una volta tagliate, si consiglia di conservarle in frigorifero.",
  },
  {
    slug: "sbriciolata-ricotta",
    name: "Sbriciolata alla ricotta",
    description: "Friabile e morbida, realizzata con ricotta siciliana fresca.",
    ingredient: "Ricotta siciliana",
    tone: "notte",
    image: "/images/prodotto-sbriciolata.png",
    conservation: "In frigorifero, per la presenza di ricotta fresca; consumare entro 2-3 giorni dall'acquisto.",
  },
  {
    slug: "frutta-martorana",
    name: "Frutta martorana",
    description: "Pasta di mandorla modellata e dipinta a mano nelle forme della frutta siciliana.",
    ingredient: "Mandorla siciliana",
    tone: "pistacchio",
    image: "/images/prodotto-frutta-martorana.png",
    conservation: "In luogo fresco e asciutto, in contenitore chiuso; si conserva bene anche per diverse settimane.",
  },
  {
    slug: "croccante",
    name: "Croccante",
    description: "Croccante artigianale alla mandorla o al pistacchio, cotto a mano fino al punto giusto di caramellizzazione.",
    ingredient: "Mandorla o pistacchio siciliano",
    tone: "oro",
    // Immagine segnaposto: sostituire con una foto reale del prodotto.
    image: "/images/prodotto-croccante.png",
    conservation: "In luogo fresco e asciutto, in contenitore ermetico, lontano dall'umidità.",
  },
];

export const comingSoon = ["Gelati", "Granite", "Brioche", "Prodotti stagionali"];

export interface Ingredient {
  slug: string;
  name: string;
  origin: string;
  story: string;
  usedIn?: string;
  tone: Tone;
  image?: string;
}

export const ingredients: Ingredient[] = [
  {
    slug: "miele",
    name: "Miele",
    origin: "Campobello di Licata · AG",
    story:
      "Miele locale dal gusto pieno e aromatico, con delicate note floreali e una dolcezza che cambia seguendo le fioriture.",
    usedIn: "Dolci della tradizione",
    tone: "oro",
    image: "/images/ingrediente-miele.png",
  },
  {
    slug: "mandorle",
    name: "Mandorle",
    origin: "Campobello di Licata · AG",
    story:
      "Mandorle dal sapore intenso e dalla consistenza croccante. Un ingrediente semplice, coltivato da sempre nelle campagne intorno a noi.",
    usedIn: "Paste di mandorla, Frutta martorana",
    tone: "sabbia",
    image: "/images/ingrediente-mandorla.png",
  },
  {
    slug: "pistacchio",
    name: "Pistacchio",
    origin: "Raffadali · AG",
    story:
      "Pistacchio dal gusto profondo e persistente, con note naturalmente tostate e un profilo aromatico che non ha bisogno di essere corretto.",
    usedIn: "Produzioni presenti e future",
    tone: "pistacchio",
    image: "/images/ingrediente-pistacchio.png",
  },
  {
    slug: "arance",
    name: "Arance",
    origin: "Ribera · AG",
    story:
      "Dolci, succose e intensamente profumate. Arance che portano nelle nostre ricette tutta la freschezza degli agrumeti di Ribera.",
    usedIn: "Crostate artigianali",
    tone: "melograno",
    image: "/images/ingrediente-arance.png",
  },
  {
    slug: "limoni",
    name: "Limoni",
    origin: "Siracusa · SR",
    story:
      "Scorza ricca di oli essenziali, profumo intenso e una freschezza netta. Pochi ingredienti riescono a farsi riconoscere così facilmente.",
    usedIn: "Crostate artigianali",
    tone: "oro",
    image: "/images/ingrediente-limoni.png",
  },
  {
    slug: "farina",
    name: "Farina",
    origin: "Provincia di Agrigento",
    story:
      "Farina da grano coltivato nel territorio, scelta per dare alle nostre preparazioni struttura, fragranza e un sapore autentico.",
    usedIn: "Biscotti Regina, Zuccotti, Buccellati",
    tone: "sabbia",
  },
  {
    slug: "zucchine",
    name: "Zucchine",
    origin: "Produzione locale",
    story:
      "Coltivate vicino a noi e raccolte seguendo la stagione. Una materia prima semplice, legata alle ricette che appartengono alla nostra tradizione.",
    tone: "pistacchio",
  },
  {
    slug: "fichi",
    name: "Fichi",
    origin: "Catania · CT",
    story:
      "Fichi dalla polpa morbida, carnosa e naturalmente dolce. Un gusto pieno che raggiunge il suo meglio quando il frutto è perfettamente maturo.",
    usedIn: "Buccellati",
    tone: "melograno",
    image: "/images/ingrediente-fichi.png",
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
