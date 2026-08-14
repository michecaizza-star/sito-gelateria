import Link from "next/link";
import { contactInfo } from "@/lib/site-content";

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-28 md:px-10">
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-oro">MARÌ</p>
      <h1 className="mt-3 font-display text-4xl text-notte">Privacy Policy</h1>
      <p className="mt-6 text-base leading-relaxed text-testo/70">
        Questa pagina sarà aggiornata con l&apos;informativa completa sul
        trattamento dei dati personali ai sensi del Regolamento (UE)
        2016/679 (GDPR), non appena disponibile.
      </p>
      <p className="mt-4 text-base leading-relaxed text-testo/70">
        Per qualsiasi richiesta relativa ai dati personali, puoi contattarci
        all&apos;indirizzo{" "}
        <a href={`mailto:${contactInfo.email}`} className="underline decoration-oro underline-offset-4">
          {contactInfo.email}
        </a>
        .
      </p>
      <Link href="/" className="mt-10 inline-block text-sm text-notte underline decoration-oro underline-offset-4">
        ← Torna alla homepage
      </Link>
    </main>
  );
}
