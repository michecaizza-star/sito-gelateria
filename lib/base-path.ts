// Deve restare in sync con `basePath` in next.config.ts. Usato solo dove
// serve un percorso assoluto già corretto lato client — es. le immagini
// con `priority`, per cui next/image genera un <link rel="preload"> a
// runtime usando il src letterale (senza applicare il basePath da solo
// quando images.unoptimized è true).
export const BASE_PATH = "/sito-gelateria";

export function withBasePath(path: string) {
  return `${BASE_PATH}${path}`;
}
