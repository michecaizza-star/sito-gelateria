import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { ChatbotProvider } from "@/lib/chatbot-context";
import { CartDrawer } from "@/components/site/cart-drawer";
import { NewsletterPopup } from "@/components/site/newsletter-popup";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { Chatbot } from "@/components/site/chatbot";

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
  title: "MARÌ — Tastalu. Solo Sicilia.",
  description:
    "MARÌ: prodotti artigianali siciliani nati a Campobello di Licata (AG). Materie prime siciliane, produttori locali, filiere vicine. Solo Sicilia. Tastalu.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="it"
      className={`${playfair.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-avorio text-testo font-sans">
        <CartProvider>
          <ChatbotProvider>
            {children}
            <CartDrawer />
            <NewsletterPopup />
            <WhatsAppButton />
            <Chatbot />
          </ChatbotProvider>
        </CartProvider>
      </body>
    </html>
  );
}
