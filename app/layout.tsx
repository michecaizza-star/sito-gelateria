import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MARÌ — Gelateria Artigianale Siciliana",
  description:
    "MARÌ: gelati, granite e dolci artigianali siciliani, realizzati con materie prime locali e a km 0. La Sicilia in ogni cucchiaio.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="it"
      className={`${playfair.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-avorio text-testo font-sans">
        {children}
      </body>
    </html>
  );
}
