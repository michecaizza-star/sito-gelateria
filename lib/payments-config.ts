/**
 * TODO — credenziali reali di pagamento.
 *
 * Il sito è statico (GitHub Pages), quindi non ha un server proprio:
 * i pagamenti passano interamente da PayPal / Stripe lato client.
 *
 * PayPal: "sb" è il Client ID sandbox ufficiale di PayPal, funziona
 * subito per fare test (nessun pagamento reale). Per accettare
 * pagamenti veri, crea un'app su
 * https://developer.paypal.com/dashboard/applications e incolla qui
 * il Client ID "Live".
 */
export const PAYPAL_CLIENT_ID = "sb";

/**
 * Pagamento con carta — Nexi.
 *
 * Nexi (come Stripe) non permette di creare un checkout dinamico solo
 * da codice client: serve sempre un server che apra la sessione di
 * pagamento con le credenziali riservate dell'esercente. Su un sito
 * statico come questo, senza backend, la strada sicura e realistica è
 * un link di pagamento Nexi già pronto:
 *
 * 1. Attiva un contratto Nexi e-commerce (Nexi XPay / Nexi Pay by Link).
 * 2. Dal pannello Nexi crea un "Link di pagamento" — il pagamento
 *    avviene sui server Nexi, con i loro standard di sicurezza
 *    (3-D Secure, PCI-DSS): il sito non gestisce mai il numero di
 *    carta del cliente.
 * 3. Incolla qui l'URL del link. Il pulsante "Paga con carta" porta il
 *    cliente lì; il riepilogo dell'ordine resta visibile su WhatsApp
 *    per confermare l'importo esatto.
 *
 * Finché questo valore resta vuoto, il pulsante mostra un messaggio
 * chiaro e invita a completare l'ordine su WhatsApp nel frattempo.
 */
export const NEXI_PAYMENT_LINK_URL = "";
