import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { FacebookIcon, InstagramIcon } from "@/components/site/social-icons";
import { contactInfo, openingHours, waLink } from "@/lib/site-content";

export function Contact() {
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    contactInfo.mapsQuery
  )}`;

  return (
    <section id="contatti" className="relative overflow-hidden bg-mari py-24 text-avorio md:py-32">
      <div className="pattern-agrumi absolute inset-0 opacity-[0.15]" />

      <Container className="relative grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Contatti"
            title="Vieni a trovarci"
            tone="light"
            description="Siamo nel cuore della Sicilia. Passa in gelateria o ordina comodamente su WhatsApp."
          />

          <Reveal delay={0.15} className="mt-10">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-avorio py-3.5 pl-6 pr-4 text-sm font-medium text-notte transition-colors hover:bg-oro"
            >
              Ordina su WhatsApp
              <MessageCircle className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-avorio/15 sm:grid-cols-2">
              <div className="space-y-6 bg-mari px-8 py-9">
                <div className="flex gap-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-oro" />
                  <div>
                    <p className="text-sm font-medium">Indirizzo</p>
                    <a
                      href={mapsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-sm text-avorio/75 underline decoration-avorio/30 underline-offset-4 hover:text-avorio"
                    >
                      {contactInfo.address}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-oro" />
                  <div>
                    <p className="text-sm font-medium">Telefono</p>
                    <a
                      href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`}
                      className="mt-1 block text-sm text-avorio/75 hover:text-avorio"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-oro" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="mt-1 block text-sm text-avorio/75 hover:text-avorio"
                    >
                      {contactInfo.email}
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
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
