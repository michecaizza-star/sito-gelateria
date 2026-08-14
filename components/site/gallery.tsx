import Image from "next/image";
import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { galleryItems, type Tone } from "@/lib/site-content";

const toneClasses: Record<Tone, string> = {
  mari: "bg-[linear-gradient(155deg,#1a5a92_0%,#0F4C81_55%,#0A2F52_100%)]",
  notte: "bg-[linear-gradient(155deg,#123a5e_0%,#0A2F52_55%,#061422_100%)]",
  oro: "bg-[linear-gradient(155deg,#e6c98a_0%,#D4B26A_55%,#a9853f_100%)]",
  pistacchio: "bg-[linear-gradient(155deg,#a9c281_0%,#8EA760_55%,#5f7940_100%)]",
  melograno: "bg-[linear-gradient(155deg,#aa4a58_0%,#8E2E3A_55%,#5e1e27_100%)]",
  sabbia: "bg-[linear-gradient(155deg,#f2e9d8_0%,#E8DDCB_55%,#c9b795_100%)]",
  avorio: "bg-[linear-gradient(155deg,#ffffff_0%,#F8F5EF_55%,#ddd6c8_100%)]",
};

const spans = [
  "sm:col-span-2 sm:row-span-2",
  "sm:col-span-2",
  "",
  "sm:row-span-2",
  "",
  "",
  "sm:col-span-2",
  "",
  "",
  "sm:col-span-2",
];

export function Gallery() {
  return (
    <section id="gallery" className="bg-avorio py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Gallery"
          title="Un racconto per immagini"
          align="center"
          className="mb-16"
        />

        <div className="grid grid-flow-row-dense grid-cols-2 gap-4 sm:grid-cols-4 sm:[grid-auto-rows:11rem]">
          {galleryItems.map((item, i) => (
            <Reveal key={item.label} delay={(i % 4) * 0.06} className={spans[i]}>
              <div className="grain group relative h-full min-h-[11rem] overflow-hidden rounded-2xl">
                {item.type === "photo" && item.src ? (
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div
                    className={`absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105 ${toneClasses[item.tone]}`}
                  />
                )}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <span className="absolute bottom-4 left-4 right-4 font-display text-lg italic text-white">
                  {item.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-[11px] text-testo/40">
          Immagini generate con intelligenza artificiale, a scopo illustrativo.
        </p>
      </Container>
    </section>
  );
}
