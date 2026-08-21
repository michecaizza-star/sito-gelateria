import type { NextConfig } from "next";

// Sito pubblicato come GitHub Pages "project page" di questo repository
// (https://<utente>.github.io/sito-gelateria/), quindi serve un basePath.
// Vedi .github/workflows/deploy.yml — ad ogni push su main la Action
// esegue `next build` (con questa config) e pubblica la cartella `out/`.
const basePath = "/sito-gelateria";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath,
};

export default nextConfig;
