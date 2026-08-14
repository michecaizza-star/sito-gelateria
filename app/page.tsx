import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Tastalu } from "@/components/site/tastalu";
import { Story } from "@/components/site/story";
import { Products } from "@/components/site/products";
import { MateriePrime } from "@/components/site/materie-prime";
import { SoloSicilia } from "@/components/site/solo-sicilia";
import { Territorio } from "@/components/site/territorio";
import { Horeca } from "@/components/site/horeca";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { WhatsAppButton } from "@/components/site/whatsapp-button";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Tastalu />
        <Story />
        <Products />
        <MateriePrime />
        <SoloSicilia />
        <Territorio />
        <Horeca />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
