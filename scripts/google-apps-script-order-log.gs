/**
 * MARÌ — Registro ordini (Google Apps Script)
 *
 * Come attivarlo:
 * 1. Crea un nuovo Google Sheet (consigliato: con l'account
 *    ordini.maritastalu@gmail.com) e rinominalo "MARÌ — Registro Ordini".
 * 2. Estensioni → Apps Script.
 * 3. Cancella il contenuto di Code.gs e incolla questo file al suo posto.
 * 4. Salva (icona dischetto).
 * 5. Distribuisci → Nuova implementazione → tipo "Web app".
 *      - Esegui come: Me
 *      - Chi ha accesso: Chiunque
 * 6. Autorizza l'accesso quando richiesto (è normale l'avviso "app non
 *    verificata": è uno script tuo, procedi con "Avanzate" → "Vai a...").
 * 7. Copia l'URL del Web App (finisce con /exec) e incollalo come
 *    ORDER_LOG_WEBHOOK_URL in lib/payments-config.ts sul sito.
 *
 * Ogni volta che il sito invia un ordine, questo script aggiunge una riga
 * al foglio e risponde con il numero d'ordine assegnato (il numero di riga
 * dell'ordine, quindi 1, 2, 3, ...). Lo stesso numero compare anche
 * nell'email di notifica degli ordini PayPal, così i due coincidono
 * sempre. Lo stato ("Pagato" per PayPal, "Da confermare" per WhatsApp) è
 * solo un valore di partenza: puoi modificarlo a mano nel foglio in
 * qualsiasi momento (es. "Spedito", "Consegnato", "Annullato").
 */

const SHEET_NAME = "Ordini";
const HEADERS = [
  "Numero ordine",
  "Data e ora",
  "Stato",
  "Metodo di pagamento",
  "Prodotti",
  "Subtotale",
  "Sconto",
  "Spedizione",
  "Totale",
  "Cliente",
  "Telefono",
  "Indirizzo",
  "Info consegna",
  "Note",
];

function doPost(e) {
  const sheet = getOrCreateSheet_();
  const data = JSON.parse(e.postData.contents);

  const orderNumber = Math.max(sheet.getLastRow(), 1); // header = riga 1, quindi il primo ordine è il numero 1

  sheet.appendRow([
    orderNumber,
    new Date(),
    data.status || "",
    data.paymentMethod || "",
    data.products || "",
    data.subtotal || "",
    data.discount || "",
    data.shipping || "",
    data.total || "",
    data.customer || "",
    data.phone || "",
    data.address || "",
    data.deliveryInfo || "",
    data.note || "",
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ orderNumber: orderNumber })
  ).setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}
