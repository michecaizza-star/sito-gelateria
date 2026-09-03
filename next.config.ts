import type { NextConfig } from "next";

// Sito pubblicato su GitHub Pages con dominio personalizzato
// (https://www.maritastalu.it), quindi senza basePath: viene servito
// dalla radice, non da un sottopercorso. Vedi public/CNAME e
// .github/workflows/deploy.yml — ad ogni push su main la Action esegue
// `next build` (con questa config) e pubblica la cartella `out/`.
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
