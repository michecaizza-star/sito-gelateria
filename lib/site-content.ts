export const WHATSAPP_NUMBER = "393713203449";
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
  { href: "/#storia", label: "Storia" },
  { href: "/#prodotti", label: "Prodotti" },
  { href: "/#materie-prime", label: "Materie prime" },
  { href: "/#solo-sicilia", label: "Solo Sicilia" },
  { href: "/#horeca", label: "Horeca" },
  { href: "/#contatti", label: "Contatti" },
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
  /** Racconto d'origine, mostrato nella pagina dedicata al prodotto. */
  story: string;
  /**
   * TODO — racconto del processo di lavorazione, da aggiungere quando
   * disponibile. Finché resta vuoto, la pagina del prodotto mostra un
   * messaggio placeholder al posto di questa sezione.
   */
  process?: string;
}

export const products: Product[] = [
  {
    slug: "biscotti-regina",
    group: "Biscotti siciliani",
    name: "Biscotti Regina",
    description: "Biscotti di frolla ricoperti di sesamo, tostato fino a diventare fragrante. Un incontro tra la friabilità della pasta e il gusto intenso della giuggiulena.",
    ingredient: "Sesamo e grano siciliano",
    tone: "oro",
    image: "/images/prodotto-regina.png",
    conservation: "In luogo fresco e asciutto, in contenitore ermetico, lontano da fonti di calore e umidità.",
    story: `Il protagonista non è il biscotto: è il seme. Il sesamo, in Sicilia chiamato **giuggiulena**, è arrivato da lontano attraverso le antiche rotte del Mediterraneo e, una volta entrato nella cucina dell'isola, ha trovato un posto praticamente ovunque.

A Palermo finisce anche sopra un biscotto di pasta frolla — ma non come decorazione: tutto intorno. Ogni biscotto viene passato nel sesamo prima di entrare in forno; il calore lo tosta e sprigiona quel profumo che arriva prima ancora del morso.

A Palermo diventano *reginelle*, mentre in siciliano sono conosciuti come *viscotti ca gigiulena*: biscotti con il sesamo.

*Una storia piccola, ma bellissima. Perché racconta una cosa tipicamente siciliana: prendere qualcosa arrivato da lontano e farlo diventare così nostro da dimenticarci quasi che un tempo venisse da altrove.*`,
  },
  {
    slug: "zuccotti",
    group: "Biscotti siciliani",
    name: "Zuccotti",
    description: "Piccoli dolci di frolla con un ripieno di mandorle, zuccata e cannella. Un guscio semplice che, appena si rompe, rivela tutti i suoi profumi.",
    ingredient: "Ricetta antica siciliana",
    tone: "sabbia",
    image: "/images/prodotto-zuccotti.png",
    conservation: "In luogo fresco e asciutto, in contenitore ermetico, lontano da fonti di calore e umidità.",
    story: `Qui la storia non parla di Firenze e nemmeno dello zuccotto rinascimentale: parla di **zuccata**. In Sicilia la zucca viene trasformata lentamente — candita, lasciata riposare, fatta diventare morbida, lucida e intensamente dolce — e poi incontra quello che la pasticceria siciliana conosce bene: mandorle e cannella.

Il ripieno viene racchiuso nella pasta frolla e nasce uno di quei dolci che, a prima vista, sembrano semplici. Ma il nome racconta già cosa nascondono: lo spezzi e trovi la zuccata, la mandorla, il profumo della cannella.

Non è un dolce nato per stupire con l'apparenza. È l'opposto.

*È uno di quei dolci siciliani che ti obbligano a rompere la superficie per scoprire la storia che c'è dentro.*`,
  },
  {
    slug: "buccellati",
    group: "Biscotti siciliani",
    name: "Buccellati",
    description: "Frolla ripiena di fichi secchi, mandorle, agrumi e spezie. Un dolce nato dalla dispensa siciliana e diventato un simbolo delle feste.",
    ingredient: "Fichi e frutta secca",
    tone: "melograno",
    image: "/images/prodotto-buccellati.png",
    conservation: "In luogo fresco e asciutto, in contenitore ermetico; una volta aperta la confezione, consumare preferibilmente entro pochi giorni.",
    story: `Molto prima che il buccellato diventasse un dolce siciliano di Natale, esisteva il **buccellatum** romano: un pane semplice, asciutto, fatto per durare. Lo portavano con sé i legionari, lo mangiavano i naviganti — doveva essere facile da trasportare e soprattutto non rovinarsi rapidamente. Il nome stesso viene da *buccella*, boccone.

Poi quel pane attraversa i secoli e arriva in Sicilia, e qui cambia completamente vita: la pasta si arricchisce e dentro entrano i sapori della dispensa — fichi secchi, mandorle, noci, scorze d'agrumi, spezie.

Quello che era nato per accompagnare un viaggio diventa il dolce delle feste: da pane da viaggio a dolce da mettere al centro della tavola.

*Non è una cattiva evoluzione.*`,
  },
  {
    slug: "paste-di-mandorla",
    name: "Paste di mandorla",
    description: "Mandorle finemente lavorate con zucchero per ottenere una pasta morbida e profumata. È da qui che nascono alcuni dei dolci più iconici della pasticceria siciliana.",
    ingredient: "Mandorla siciliana",
    tone: "sabbia",
    image: "/images/prodotto-paste-mandorla.png",
    conservation: "In luogo fresco e asciutto, in contenitore ermetico a temperatura ambiente.",
    story: `Prima di diventare un biscotto, la mandorla ha fatto un viaggio. Le tecniche di lavorazione della frutta secca e dello zucchero arrivano in Sicilia anche attraverso la cultura araba; poi entrano nei conventi, dove le monache trasformano quella conoscenza in una vera arte.

Mandorle finemente macinate, zucchero, acqua: niente di più. Eppure da quell'impasto nasce un mondo intero. La pasta viene modellata, colorata, trasformata in frutti, pecorelle, dolci delle feste — diventa persino il rivestimento della cassata.

A Palermo, il lavoro delle monache della **Martorana** è così importante che il nome del convento finisce per diventare il nome stesso del prodotto.

*Una mandorla, da sola, non raccontava ancora nulla: fu la mano dell'uomo a insegnarle quante storie poteva diventare.*`,
  },
  {
    slug: "ciambelle-siciliane",
    name: "Ciambelle siciliane",
    description: "Ciambelle di pasta dolce, dorate e fragranti, nate dalle antiche ricette delle case siciliane. Semplici da vedere, difficili da dimenticare.",
    ingredient: "Ricetta della tradizione",
    tone: "oro",
    image: "/images/prodotto-ciambelle.png",
    conservation: "A temperatura ambiente in contenitore chiuso; da consumare preferibilmente entro 2-3 giorni per apprezzarne al meglio la morbidezza.",
    story: `Questa è la storia che terrei più vicina alle persone, perché le ciambelle non appartengono alle grandi tavole dei re: appartengono alle case. Alle ricette che passavano da una madre a una figlia, da una nonna a una nipote, spesso senza essere mai scritte.

Una ciambella semplice, preparata con ingredienti che una famiglia poteva avere in casa — e proprio per questo ogni paese poteva avere la sua. La forma ad anello, il profumo appena uscita dal forno, la consistenza asciutta che la rendeva perfetta da conservare.

Non era un dolce da fotografare. Era un dolce da tenere in dispensa, e magari qualcuno arrivava a casa, apriva il contenitore e ne prendeva una senza nemmeno chiedere.

*Perché certe ricette non diventano tradizione quando finiscono nei libri: diventano tradizione quando nessuno sente il bisogno di chiedere chi le ha inventate.*`,
  },
  {
    slug: "crostate-artigianali",
    name: "Crostate artigianali",
    description: "Una frolla friabile che racchiude marmellate siciliane, preparate con la frutta e gli agrumi della nostra terra. Un classico che cambia sapore con ogni stagione.",
    ingredient: "Frutta siciliana",
    tone: "melograno",
    image: "/images/prodotto-crostata.png",
    conservation: "A temperatura ambiente in contenitore chiuso per 2-3 giorni; una volta tagliate, si consiglia di conservarle in frigorifero.",
    story: `Nel 1570, a Roma, il cuoco **Bartolomeo Scappi** pubblica *Opera*, uno dei più importanti ricettari del Rinascimento. Tra le sue pagine c'è un intero capitolo dedicato alle crostate — e qui arriva la sorpresa: quelle crostate non sono necessariamente dolci. Scappi le prepara con funghi, frutta, formaggi, carne, spezie, zucchero; alcune sono ricoperte da strisce di pasta, proprio come quelle che riconosciamo ancora oggi.

La crostata, quindi, non nasce come il dolce alla marmellata della domenica: nasce molto prima, come un'idea — una pasta che racchiude qualcosa.

Poi i secoli fanno il resto. La frutta prende il posto della carne, arrivano confetture e creme, la pasta diventa friabile, e quella vecchia idea del Rinascimento arriva fino alle nostre tavole.

*Una crostata cambia ripieno, ma non cambia mai il suo modo di raccontare ciò che c'è dentro.*`,
  },
  {
    slug: "sbriciolata-ricotta",
    name: "Sbriciolata alla ricotta",
    description: "Frolla friabile, tante briciole dorate e un ripieno morbido al centro. Si spezza, si condivide e difficilmente ci si ferma alla prima fetta.",
    ingredient: "Ricotta siciliana",
    tone: "notte",
    image: "/images/prodotto-sbriciolata.png",
    conservation: "In frigorifero, per la presenza di ricotta fresca; consumare entro 2-3 giorni dall'acquisto.",
    story: `Questa storia, in realtà, comincia lontano dalla Sicilia. Nelle campagne mantovane, molto prima che arrivasse sulle tavole eleganti, esisteva una torta povera fatta con ciò che c'era: farina di mais, grassi e frutta secca. Era irregolare, grossolana, e soprattutto si rompeva.

Poi la ricetta arriva alla corte dei Gonzaga, prima del Seicento: gli ingredienti si raffinano, entrano mandorle, zucchero e farina bianca. Ma la torta mantiene il suo carattere — non si taglia in fette perfette, si spezza.

Il nome stesso viene da **brìsa**, "briciola" nel dialetto mantovano.

*È curioso pensare che una preparazione nata nelle cucine contadine sia arrivata alla corte dei nobili senza perdere la sua caratteristica più importante: continuare a sbriciolarsi tra le mani.*`,
  },
  {
    slug: "frutta-martorana",
    name: "Frutta martorana",
    description: "Piccoli frutti modellati a mano con pasta di mandorla e dipinti uno a uno. Sembrano appena raccolti, ma nascondono un cuore tutto siciliano.",
    ingredient: "Mandorla siciliana",
    tone: "pistacchio",
    image: "/images/prodotto-frutta-martorana.png",
    conservation: "In luogo fresco e asciutto, in contenitore chiuso; si conserva bene anche per diverse settimane.",
    story: `C'è una leggenda che sembra uscita da una favola. Palermo, un convento, la fine dell'autunno: arriva la notizia che un sovrano vuole vedere il meraviglioso giardino delle monache della **Martorana**. Ma è la stagione sbagliata — gli alberi sono spogli, i frutti non ci sono più.

E allora le monache fanno qualcosa di impensabile: prendono mandorle e zucchero e cominciano a modellare la pasta. Arance, limoni, fichi, pere — le colorano una a una e le appendono agli alberi. Da lontano, il giardino sembra tornato improvvisamente vivo. Solo avvicinandosi si scopre l'inganno: non era frutta, era pasta di mandorle.

La storia è una leggenda, ma il legame con i monasteri palermitani e la tradizione della pasta di mandorle è antico e documentato.

*E ancora oggi la Martorana è legata alla Festa dei Morti, quando quei piccoli frutti tornano a riempire le pasticcerie siciliane.*`,
  },
  {
    slug: "croccante",
    name: "Croccante",
    description: "Mandorle tostate o pistacchio, avvolti nel caramello e lavorati fino a diventare sottili e croccanti. Pochi ingredienti, un morso deciso — con il pistacchio il gusto intenso arriva subito, senza troppi giri.",
    ingredient: "Mandorla o pistacchio siciliano",
    tone: "oro",
    // Immagine segnaposto: sostituire con una foto reale del prodotto.
    image: "/images/prodotto-croccante.png",
    conservation: "In luogo fresco e asciutto, in contenitore ermetico, lontano dall'umidità.",
    story: `Prima di essere un dolce, il croccante era soprattutto un modo intelligente di conservare: frutta secca, miele o zucchero, ingredienti preziosi, nutrienti e capaci di durare. In Sicilia questa tradizione incontra anche l'eredità della cucina araba — è da questo mondo che viene fatta risalire la **cubaita**, il croccante tradizionale dell'isola, il cui nome è collegato all'arabo *qubbayt*.

Poi arriva il fuoco. Lo zucchero o il miele diventano caramello, la frutta secca viene incorporata, tutto viene steso rapidamente prima che indurisca — e quello che pochi istanti prima era morbido diventa una lastra croccante.

*È quasi una piccola magia della cucina antica: calore, zucchero e frutta secca, tre cose semplici, trasformate in qualcosa che resiste al tempo.*`,
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
