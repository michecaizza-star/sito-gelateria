import { withBasePath } from "@/lib/base-path";

export interface Comune {
  n: string; // nome del comune
  p: string; // nome della provincia
  s: string; // sigla della provincia (es. "AG")
  c: string[]; // CAP (uno o più)
}

let cache: Promise<Comune[]> | null = null;

// Elenco dei comuni italiani con provincia e CAP, caricato solo quando
// serve (form di spedizione) invece che nel bundle principale del sito.
// Dati: https://github.com/matteocontrini/comuni-json
export function loadComuni(): Promise<Comune[]> {
  if (!cache) {
    cache = fetch(withBasePath("/data/comuni-italiani.json")).then((res) => res.json());
  }
  return cache;
}

export interface Provincia {
  nome: string;
  sigla: string;
}

export function extractProvince(comuni: Comune[]): Provincia[] {
  const map = new Map<string, string>();
  for (const c of comuni) map.set(c.s, c.p);
  return Array.from(map, ([sigla, nome]) => ({ nome, sigla })).sort((a, b) =>
    a.nome.localeCompare(b.nome, "it")
  );
}
