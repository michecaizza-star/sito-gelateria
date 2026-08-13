import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Story } from "@/components/site/story";
import { Products } from "@/components/site/products";
import { Territorio } from "@/components/site/territorio";
import { Gallery } from "@/components/site/gallery";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { WhatsAppButton } from "@/components/site/whatsapp-button";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Story />
        <Products />
        <Territorio />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
