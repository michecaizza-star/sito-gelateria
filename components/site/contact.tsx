import Image from "next/image";
import { Clock, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { FacebookIcon, InstagramIcon } from "@/components/site/social-icons";
import { contactInfo, openingHours, waLink } from "@/lib/site-content";

export function Contact() {
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    contactInfo.mapsQuery
  )}`;
  const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    contactInfo.mapsQuery
  )}&output=embed`;

  return (
    <section id="contatti" className="relative overflow-hidden bg-mari py-24 text-avorio md:py-32">
      <div className="pattern-agrumi absolute inset-0 opacity-[0.15]" />

      <Container className="relative">
        <SectionHeading
          eyebrow="Contatti"
          title="MARÌ"
          tone="light"
          description={`${contactInfo.addressLine1} — ${contactInfo.addressLine2}`}
          className="mb-14"
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-avorio/15 sm:grid-cols-2 lg:grid-cols-1">
              <div className="space-y-6 bg-mari px-8 py-9">
                <div className="flex gap-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-oro" />
                  <div>
                    <p className="text-sm font-medium">Indirizzo</p>
                    <a
                      href={directionsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1.5 text-sm text-avorio/75 underline decoration-avorio/30 underline-offset-4 hover:text-avorio"
                    >
                      {contactInfo.address}
                      <Navigation className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-oro" />
                  <div>
                    <p className="text-sm font-medium">Telefono / WhatsApp</p>
                    <a
                      href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`}
                      className="mt-1 block text-sm text-avorio/75 hover:text-avorio"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 pt-2">
                  <a
                    href={contactInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-avorio/25 transition-colors hover:border-avorio/60"
                  >
                    <InstagramIcon className="h-[18px] w-[18px]" />
                  </a>
                  <a
                    href={contactInfo.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-avorio/25 transition-colors hover:border-avorio/60"
                  >
                    <FacebookIcon className="h-[18px] w-[18px]" />
                  </a>
                </div>
              </div>

              <div className="bg-mari px-8 py-9">
                <div className="mb-5 flex items-center gap-3">
                  <Clock className="h-5 w-5 text-oro" />
                  <p className="text-sm font-medium">Orari di apertura</p>
                </div>
                <ul className="space-y-3.5">
                  {openingHours.map((slot) => (
                    <li
                      key={slot.day}
                      className="flex items-baseline justify-between border-b border-avorio/10 pb-3 text-sm"
                    >
                      <span className="text-avorio/75">{slot.day}</span>
                      <span className="font-medium">{slot.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="mt-6">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-oro py-4 text-sm font-semibold uppercase tracking-wide text-notte transition-colors hover:bg-avorio sm:w-auto sm:px-8"
              >
                Ordina su WhatsApp →
                <MessageCircle className="h-4 w-4" />
              </a>
            </Reveal>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-7">
            <Reveal delay={0.1} className="relative h-56 overflow-hidden rounded-3xl sm:h-64">
              <Image
                src="/images/campobello-piazza.webp"
                alt="Piazza di Campobello di Licata"
                fill
                sizes="(min-width: 1024px) 55vw, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-notte/70 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-5 right-5 font-display text-lg italic text-avorio">
                Campobello di Licata
              </p>
            </Reveal>

            <Reveal delay={0.2} className="h-full min-h-[18rem] overflow-hidden rounded-3xl">
              <iframe
                title="Mappa MARÌ — Via Edison 189, Campobello di Licata (AG)"
                src={mapEmbedSrc}
                className="h-full min-h-[18rem] w-full grayscale-[0.3] contrast-[1.05]"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
