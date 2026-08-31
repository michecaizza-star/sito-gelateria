import Link from "next/link";
import { contactInfo } from "@/lib/site-content";
import { ManageCookiePreferencesButton } from "@/components/site/manage-cookie-preferences-button";

export default function CookiePage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-28 md:px-10">
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-oro">MARÌ</p>
      <h1 className="mt-3 font-display text-4xl text-notte">Cookie Policy</h1>
      <p className="mt-2 text-sm text-testo/50">Ultimo aggiornamento: 31 agosto 2026</p>

      <ManageCookiePreferencesButton />

      <div className="mt-10 space-y-8 text-base leading-relaxed text-testo/80">
        <section>
          <h2 className="font-display text-xl text-notte">Cosa sono i cookie</h2>
          <p className="mt-2">
            I cookie sono piccoli file di testo che i siti visitati inviano al
            dispositivo dell&apos;utente, dove vengono memorizzati per essere poi
            ritrasmessi agli stessi siti alla visita successiva. Con
            &quot;cookie&quot; indichiamo qui, più in generale, anche altre
            tecnologie di memorizzazione locale come il localStorage del
            browser, che questo sito usa per alcune funzionalità.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-notte">Cookie tecnici (sempre attivi)</h2>
          <p className="mt-2">
            Questo sito utilizza esclusivamente memorizzazione locale
            (localStorage) strettamente necessaria al funzionamento delle
            sue funzionalità di base, per cui la normativa non richiede il
            consenso preventivo dell&apos;utente:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong className="font-medium text-notte">Carrello</strong> — memorizza
              i prodotti aggiunti al carrello, così da non perderli
              passando da una pagina all&apos;altra del sito.
            </li>
            <li>
              <strong className="font-medium text-notte">Preferenze del popup newsletter</strong>{" "}
              — ricorda se hai già visto o chiuso il popup di iscrizione,
              per non mostrartelo ripetutamente.
            </li>
            <li>
              <strong className="font-medium text-notte">Scelta sui cookie</strong> —
              memorizza le preferenze espresse tramite il banner cookie
              (quali categorie hai accettato), così da non richiederle a
              ogni visita.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl text-notte">
            Cookie statistici e di marketing
          </h2>
          <p className="mt-2">
            Al momento questo sito non installa cookie statistici (es.
            analisi del traffico) né di marketing/profilazione, e non
            utilizza pixel o script di terze parti a fini pubblicitari. Se
            in futuro dovessimo introdurne, aggiorneremo questa pagina e
            richiederemo il tuo consenso preventivo tramite il banner
            cookie, che potrai sempre modificare dal pulsante
            &quot;Gestisci preferenze cookie&quot; qui sopra.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-notte">Link e servizi esterni</h2>
          <p className="mt-2">
            Il sito include collegamenti a WhatsApp, Instagram e Facebook:
            si tratta di semplici link che aprono i rispettivi servizi in
            una nuova scheda. Non incorporiamo widget o contenuti di
            queste piattaforme all&apos;interno delle pagine, che quindi non
            impostano cookie propri finché non li visiti direttamente.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-notte">Come gestire le preferenze</h2>
          <p className="mt-2">
            Puoi modificare in qualsiasi momento la tua scelta usando il
            pulsante &quot;Gestisci preferenze cookie&quot; in cima a questa
            pagina, oppure cancellare i dati di navigazione salvati dal
            sito direttamente dalle impostazioni del tuo browser.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-notte">Contatti</h2>
          <p className="mt-2">
            Per qualsiasi domanda su questa Cookie Policy, puoi scriverci
            all&apos;indirizzo{" "}
            <a
              href={`mailto:${contactInfo.email}`}
              className="underline decoration-oro underline-offset-4"
            >
              {contactInfo.email}
            </a>
            . Per informazioni sul trattamento dei dati personali, consulta
            la nostra{" "}
            <Link href="/privacy" className="underline decoration-oro underline-offset-4">
              Privacy Policy
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
