import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { galleryItems, type Product } from "@/lib/site-content";

const toneClasses: Record<Product["tone"], string> = {
  mari: "bg-[linear-gradient(155deg,#1a5a92_0%,#0F4C81_55%,#0A2F52_100%)]",
  notte: "bg-[linear-gradient(155deg,#123a5e_0%,#0A2F52_55%,#061422_100%)]",
  oro: "bg-[linear-gradient(155deg,#e6c98a_0%,#D4B26A_55%,#a9853f_100%)]",
  pistacchio: "bg-[linear-gradient(155deg,#a9c281_0%,#8EA760_55%,#5f7940_100%)]",
  melograno: "bg-[linear-gradient(155deg,#aa4a58_0%,#8E2E3A_55%,#5e1e27_100%)]",
  sabbia: "bg-[linear-gradient(155deg,#f2e9d8_0%,#E8DDCB_55%,#c9b795_100%)]",
};

export function Gallery() {
  return (
    <section id="gallery" className="bg-avorio py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Gallery"
          title="Un assaggio di Sicilia"
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {galleryItems.map((item, i) => (
            <Reveal key={item.label} delay={(i % 4) * 0.06}>
              <div
                className={`grain relative h-56 overflow-hidden rounded-2xl ${toneClasses[item.tone]}`}
              >
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <span className="absolute bottom-4 left-4 right-4 font-display text-lg italic text-white">
                  {item.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
