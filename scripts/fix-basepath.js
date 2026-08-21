// Con `output: "export"` + `images.unoptimized: true`, next/image NON
// aggiunge automaticamente il basePath ai src stringa assoluti (es.
// "/images/foo.png"): lo fa solo per gli asset generati da Next stesso
// (_next/...). Questo script corregge tutti gli export statici in `out/`
// dopo la build, aggiungendo il basePath a src/href che puntano a file
// pubblici serviti da `public/` (immagini, logo, pagine interne).
/* eslint-disable @typescript-eslint/no-require-imports -- plain Node/CommonJS script, run standalone via `node` outside the Next.js/TS build pipeline */
const fs = require("fs");
const path = require("path");

const basePath = "/sito-gelateria";
const outDir = path.join(__dirname, "..", "out");

if (!fs.existsSync(outDir)) {
  console.log("fix-basepath: cartella out/ non trovata, salto.");
  process.exit(0);
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.name.endsWith(".html")) {
      fixFile(full);
    }
  }
}

function fixFile(file) {
  const original = fs.readFileSync(file, "utf8");
  const fixed = original.replace(
    /(src|href)="\/(?!sito-gelateria\/)/g,
    `$1="${basePath}/`
  );
  if (fixed !== original) {
    fs.writeFileSync(file, fixed);
  }
}

walk(outDir);
console.log("fix-basepath: percorsi corretti in out/.");
