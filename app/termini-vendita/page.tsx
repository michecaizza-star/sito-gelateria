import Link from "next/link";
import { contactInfo, FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from "@/lib/site-content";

// TODO: testo predisposto come base standard per un e-commerce alimentare
// italiano B2C; far verificare/validare da un legale con i dati reali
// dell'attività (ragione sociale, P.IVA, REA, eventuale iscrizione
// registro imprese) prima della pubblicazione definitiva.
export default function TerminiVenditaPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-28 md:px-10">
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-oro">MARÌ</p>
      <h1 className="mt-3 font-display text-4xl text-notte">Termini e Condizioni di Vendita</h1>
      <p className="mt-2 text-sm text-testo/50">Ultimo aggiornamento: 31 agosto 2026</p>

      <div className="mt-10 space-y-8 text-base leading-relaxed text-testo/80">
        <section>
          <h2 className="font-display text-xl text-notte">1. Oggetto</h2>
          <p className="mt-2">
            Le presenti Condizioni Generali di Vendita disciplinano
            l&apos;acquisto dei prodotti offerti sul sito MARÌ da parte di
            clienti consumatori, ai sensi del Codice del Consumo (D.Lgs.
            206/2005) e del D.Lgs. 70/2003 sul commercio elettronico.
            Effettuando un ordine, il Cliente dichiara di aver letto e
            accettato integralmente queste condizioni.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-notte">2. Il Venditore</h2>
          <p className="mt-2">
            {contactInfo.companyName}, con sede in {contactInfo.address} —
            P.IVA {contactInfo.vatNumber}. Contatti: {contactInfo.email},{" "}
            {contactInfo.phone}.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-notte">3. Prodotti</h2>
          <p className="mt-2">
            I prodotti MARÌ sono realizzati artigianalmente: per loro
            natura possono presentare lievi variazioni di forma, colore e
            peso rispetto alle immagini del sito, che hanno valore
            puramente illustrativo (alcune sono generate con intelligenza
            artificiale). I prodotti possono contenere allergeni (tra cui
            frutta a guscio, sesamo, glutine, uova, latte); per
            informazioni dettagliate su ingredienti e allergeni di uno
            specifico prodotto, contattaci prima di procedere
            all&apos;acquisto in caso di intolleranze o allergie. La
            disponibilità dei prodotti è soggetta a verifica al momento
            dell&apos;ordine.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-notte">4. Prezzi</h2>
          <p className="mt-2">
            I prezzi indicati sul sito sono espressi in Euro e si
            intendono comprensivi di IVA. Le spese di spedizione sono
            indicate separatamente prima della conferma dell&apos;ordine e
            sono {SHIPPING_COST.toFixed(2).replace(".", ",")} € per ordine, gratuite per ordini
            superiori a {FREE_SHIPPING_THRESHOLD} €. Ci riserviamo il diritto di modificare i
            prezzi in qualsiasi momento, fermo restando che il prezzo
            applicato a un ordine già confermato non subirà variazioni.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-notte">5. Modalità di pagamento</h2>
          <p className="mt-2">
            Il pagamento può essere effettuato tramite carta di
            credito/debito, con transazione gestita in modo sicuro dal
            circuito Nexi, o tramite gli altri metodi eventualmente
            indicati in fase di checkout. L&apos;addebito avviene alla
            conferma dell&apos;ordine; nessun dato della carta di pagamento
            viene memorizzato sui nostri sistemi.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-notte">6. Spedizione e consegna</h2>
          <p className="mt-2">
            Spediamo attualmente sul territorio italiano. I tempi di
            consegna indicati in fase d&apos;ordine sono indicativi e
            decorrono dalla conferma dell&apos;ordine; eventuali ritardi del
            corriere non dipendenti dalla nostra volontà non
            costituiscono inadempimento. Trattandosi di prodotti
            alimentari deperibili, il rischio di perdita o danneggiamento
            passa al Cliente al momento della consegna del pacco,
            conformemente all&apos;art. 63 del Codice del Consumo.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-notte">7. Diritto di recesso</h2>
          <p className="mt-2">
            Il Codice del Consumo riconosce generalmente al consumatore un
            diritto di recesso di 14 giorni per gli acquisti online.
            Tuttavia, ai sensi dell&apos;art. 59, comma 1, lett. d) del
            Codice del Consumo, tale diritto è escluso per i beni
            alimentari deperibili o che rischiano di deteriorarsi o
            scadere rapidamente: i prodotti da forno MARÌ rientrano in
            questa categoria, pertanto il diritto di recesso non è
            applicabile agli ordini effettuati sul sito. Restano fermi i
            diritti del Cliente in caso di prodotto difettoso, danneggiato
            in spedizione o non conforme a quanto ordinato — vedi la
            sezione &quot;Garanzia e reclami&quot; qui sotto.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-notte">8. Garanzia e reclami</h2>
          <p className="mt-2">
            Se un prodotto arriva danneggiato, difettoso o non
            corrispondente all&apos;ordine, contattaci entro 48 ore dalla
            consegna scrivendo a{" "}
            <a
              href={`mailto:${contactInfo.email}`}
              className="underline decoration-oro underline-offset-4"
            >
              {contactInfo.email}
            </a>{" "}
            o su WhatsApp, allegando quando possibile una foto del
            prodotto e della confezione. Valuteremo la sostituzione del
            prodotto o il rimborso, secondo quanto previsto dalla
            garanzia legale di conformità del Codice del Consumo.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-notte">9. Legge applicabile e foro competente</h2>
          <p className="mt-2">
            Le presenti condizioni sono regolate dalla legge italiana. Per
            i clienti che rivestono la qualità di consumatori, è
            competente in via esclusiva il foro del luogo di residenza o
            domicilio del consumatore, ai sensi dell&apos;art. 33, comma 2,
            lett. u) del Codice del Consumo.
          </p>
          <p className="mt-2">
            In caso di controversia, il consumatore residente nell&apos;UE
            può inoltre rivolgersi alla piattaforma europea di risoluzione
            delle controversie online (ODR), disponibile all&apos;indirizzo{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-oro underline-offset-4"
            >
              ec.europa.eu/consumers/odr
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-notte">10. Modifiche alle condizioni</h2>
          <p className="mt-2">
            Ci riserviamo il diritto di aggiornare periodicamente queste
            condizioni. Ogni ordine resta comunque disciplinato dalla
            versione delle condizioni in vigore al momento in cui è stato
            effettuato.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-notte">11. Contatti</h2>
          <p className="mt-2">
            Per qualsiasi domanda su ordini, prodotti o su queste
            condizioni, scrivici a{" "}
            <a
              href={`mailto:${contactInfo.email}`}
              className="underline decoration-oro underline-offset-4"
            >
              {contactInfo.email}
            </a>
            . Per il trattamento dei tuoi dati personali consulta la{" "}
            <Link href="/privacy" className="underline decoration-oro underline-offset-4">
              Privacy Policy
            </Link>{" "}
            e la{" "}
            <Link href="/cookie" className="underline decoration-oro underline-offset-4">
              Cookie Policy
            </Link>
            .
          </p>
        </section>
      </div>

      <Link
        href="/"
        className="mt-10 inline-block text-sm text-notte underline decoration-oro underline-offset-4"
      >
        ← Torna alla homepage
      </Link>
    </main>
  );
}
