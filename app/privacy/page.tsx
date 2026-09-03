import Link from "next/link";
import { contactInfo } from "@/lib/site-content";

// TODO: testo predisposto come base standard di informativa privacy per un
// e-commerce alimentare italiano B2C ai sensi del Regolamento (UE) 2016/679
// (GDPR); far verificare/validare da un legale con i dati reali
// dell'attività (ragione sociale, P.IVA, indirizzo) prima della
// pubblicazione definitiva. Il sito è statico (GitHub Pages, nessun server
// né database proprio): i dati raccolti nei moduli transitano solo verso i
// fornitori terzi elencati alla sezione 4.
export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-28 md:px-10">
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-oro">MARÌ</p>
      <h1 className="mt-3 font-display text-4xl text-notte">Privacy Policy</h1>
      <p className="mt-2 text-sm text-testo/50">Ultimo aggiornamento: 3 settembre 2026</p>

      <div className="mt-10 space-y-8 text-base leading-relaxed text-testo/80">
        <section>
          <h2 className="font-display text-xl text-notte">1. Titolare del trattamento</h2>
          <p className="mt-2">
            Il Titolare del trattamento dei dati personali raccolti tramite
            questo sito è {contactInfo.companyName}, con sede in{" "}
            {contactInfo.address} — P.IVA {contactInfo.vatNumber}. Per
            qualsiasi richiesta relativa ai tuoi dati personali puoi
            scrivere a{" "}
            <a
              href={`mailto:${contactInfo.email}`}
              className="underline decoration-oro underline-offset-4"
            >
              {contactInfo.email}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-notte">
            2. Quali dati raccogliamo e perché
          </h2>
          <p className="mt-2">
            Raccogliamo solo i dati che ci fornisci direttamente compilando
            un modulo sul sito. Non utilizziamo cookie di profilazione né
            raccogliamo dati di navigazione a fini statistici o pubblicitari
            (vedi la nostra{" "}
            <Link href="/cookie" className="underline decoration-oro underline-offset-4">
              Cookie Policy
            </Link>
            ).
          </p>
          <ul className="mt-3 list-disc space-y-3 pl-5">
            <li>
              <strong className="font-medium text-notte">Ordini</strong> —
              nome, cognome, telefono, indirizzo di spedizione ed eventuali
              note, raccolti al momento dell&apos;acquisto per evadere
              l&apos;ordine e concordare la consegna. Base giuridica:
              esecuzione di un contratto (art. 6.1.b GDPR).
            </li>
            <li>
              <strong className="font-medium text-notte">Profilo regalo (facoltativo)</strong>{" "}
              — se scegli di personalizzare un ordine come regalo, nome,
              età indicativa, città e un breve racconto che ci lasci,
              usati solo per preparare la personalizzazione richiesta.
              Base giuridica: consenso, prestato compilando volontariamente
              il modulo (art. 6.1.a GDPR).
            </li>
            <li>
              <strong className="font-medium text-notte">Newsletter</strong>{" "}
              — indirizzo email, raccolto per inviarti il codice sconto di
              benvenuto e, se lo desideri, comunicazioni promozionali
              successive. Base giuridica: consenso (art. 6.1.a GDPR); puoi
              revocarlo in qualsiasi momento tramite il link presente in
              ogni email o scrivendoci.
            </li>
            <li>
              <strong className="font-medium text-notte">Richieste Horeca</strong>{" "}
              — nome, località, tipo di attività e messaggio, raccolti
              tramite il modulo dedicato per rispondere a richieste di
              collaborazione commerciale. Base giuridica: misure
              precontrattuali su tua richiesta (art. 6.1.b GDPR).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl text-notte">
            3. Ordini su WhatsApp
          </h2>
          <p className="mt-2">
            Se completi l&apos;ordine tramite il pulsante &quot;Ordina su
            WhatsApp&quot;, il riepilogo dell&apos;ordine e i dati di
            spedizione che hai inserito vengono inclusi in un messaggio che
            si apre nella tua app WhatsApp: sei tu a inviarlo direttamente
            al nostro numero, come faresti con qualsiasi altro contatto.
            Quel messaggio resta nella conversazione WhatsApp tra te e noi,
            soggetta all&apos;informativa privacy di WhatsApp (WhatsApp
            Ireland Limited, gruppo Meta).
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-notte">
            4. A chi comunichiamo i tuoi dati
          </h2>
          <p className="mt-2">
            Questo sito è pubblicato come sito statico, senza un proprio
            server o database: non conserviamo i tuoi dati su nostri
            sistemi. I dati che invii tramite i moduli del sito (newsletter,
            profilo regalo, richieste Horeca) vengono recapitati alla nostra
            casella email attraverso un servizio esterno di inoltro moduli
            (formsubmit.co), che agisce come responsabile del trattamento
            limitatamente a questa attività di trasmissione. Se paghi con
            PayPal, i dati necessari alla transazione sono trattati
            direttamente da PayPal (Europe) S.à r.l. et Cie, S.C.A., secondo
            la sua{" "}
            <a
              href="https://www.paypal.com/it/webapps/mpp/ua/privacy-full"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-oro underline-offset-4"
            >
              informativa privacy
            </a>
            ; non vediamo né conserviamo mai il numero della tua carta o i
            dati del tuo conto PayPal. Non vendiamo né cediamo i tuoi dati a
            terzi per finalità di marketing.
          </p>
          <p className="mt-2">
            Alcuni di questi fornitori (formsubmit.co, PayPal, WhatsApp/Meta)
            possono trattare i dati anche al di fuori dello Spazio Economico
            Europeo; in tal caso il trasferimento avviene sulla base delle
            garanzie previste dagli articoli 44 e seguenti del GDPR (ad es.
            clausole contrattuali standard adottate dal fornitore).
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-notte">
            5. Per quanto tempo conserviamo i dati
          </h2>
          <p className="mt-2">
            I dati di spedizione (nome, telefono, indirizzo, note) restano
            salvati temporaneamente nel tuo browser solo per la durata del
            checkout e vengono cancellati automaticamente non appena
            l&apos;ordine viene inviato. I dati trasmessi via email tramite i
            moduli del sito vengono conservati nella nostra casella di posta
            per il tempo necessario a evadere la richiesta o l&apos;ordine e,
            per gli ordini, per il periodo previsto dagli obblighi fiscali e
            contabili applicabili. L&apos;iscrizione alla newsletter resta
            attiva fino a tua revoca del consenso.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-notte">6. I tuoi diritti</h2>
          <p className="mt-2">
            In qualità di interessato puoi, in qualsiasi momento, chiedere
            l&apos;accesso ai tuoi dati personali, la rettifica o la
            cancellazione degli stessi, la limitazione del trattamento,
            opporti al trattamento o richiederne la portabilità, scrivendo a{" "}
            <a
              href={`mailto:${contactInfo.email}`}
              className="underline decoration-oro underline-offset-4"
            >
              {contactInfo.email}
            </a>
            . Hai inoltre diritto di proporre reclamo al Garante per la
            protezione dei dati personali (
            <a
              href="https://www.garanteprivacy.it"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-oro underline-offset-4"
            >
              www.garanteprivacy.it
            </a>
            ) qualora ritenga che il trattamento violi la normativa
            applicabile.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-notte">
            7. Conferimento dei dati
          </h2>
          <p className="mt-2">
            Il conferimento dei dati richiesti in fase di checkout è
            necessario per completare l&apos;ordine: senza di essi non
            possiamo spedire i prodotti. Il conferimento dei dati per
            newsletter, profilo regalo e richieste Horeca è invece
            facoltativo: puoi usare il sito e acquistare senza fornirli.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-notte">8. Sicurezza</h2>
          <p className="mt-2">
            Il sito viene servito esclusivamente via HTTPS. Non gestiamo né
            memorizziamo mai dati di pagamento (numero carta, CVV): questi
            sono trattati direttamente dai circuiti di pagamento (PayPal, e
            in futuro Nexi) secondo i loro standard di sicurezza, tra cui il
            protocollo PCI-DSS.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-notte">
            9. Modifiche a questa informativa
          </h2>
          <p className="mt-2">
            Possiamo aggiornare periodicamente questa informativa, ad
            esempio in caso di nuovi servizi o fornitori. La data
            dell&apos;ultimo aggiornamento è indicata in cima alla pagina.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-notte">10. Contatti</h2>
          <p className="mt-2">
            Per qualsiasi domanda su questa Privacy Policy o sul trattamento
            dei tuoi dati, scrivici a{" "}
            <a
              href={`mailto:${contactInfo.email}`}
              className="underline decoration-oro underline-offset-4"
            >
              {contactInfo.email}
            </a>
            . Per i cookie e la memorizzazione locale del browser consulta
            la{" "}
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
