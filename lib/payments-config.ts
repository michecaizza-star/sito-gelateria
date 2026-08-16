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
 * Stripe non permette più di creare un checkout dinamico solo da
 * codice client (serve sempre un server che generi la sessione di
 * pagamento con la chiave segreta) — quindi con un sito statico come
 * questo, senza backend, l'unica strada realistica è un "Payment
 * Link": crealo da Stripe Dashboard → Payment Links e incolla qui
 * il suo URL. Il pulsante "Paga con carta" porta il cliente lì; il
 * totale del carrello resta visibile nel riepilogo che gli mandi su
 * WhatsApp, per confermare l'importo esatto dell'ordine.
 */
export const STRIPE_PAYMENT_LINK_URL = "";
