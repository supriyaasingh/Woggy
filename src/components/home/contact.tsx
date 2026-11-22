"use client";

import { motion } from "motion/react";
import { Clock, MapPin, MessageCircle, Navigation, Phone, ShoppingBag, Stethoscope } from "lucide-react";
import { Container, SectionHeading, Paw } from "@/components/ui/primitives";
import { directionsUrl, site, whatsappUrl } from "@/lib/site";
import { useBooking } from "@/components/booking/booking-context";
import { ease } from "@/lib/utils";

const icons = { clinic: Stethoscope, store: ShoppingBag } as const;

export function Contact() {
  const { open } = useBooking();
  const wa = whatsappUrl("Hello Doggy Woggy! I'd like to know more.");

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Visit us"
          align="center"
          title={<>Your Pet&apos;s Happy Place <span className="italic text-coral-600 font-display-wonk">Is Nearby.</span></>}
          intro="Two friendly locations in Bhandup West — one for health, one for happy shopping."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {site.locations.map((l, i) => {
            const Icon = icons[l.id as keyof typeof icons];
            return (
              <motion.article
                key={l.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease, delay: i * 0.12 }}
                className="overflow-hidden rounded-[2rem] bg-white shadow-soft ring-1 ring-teal/5"
              >
                <MapPlaceholder embed={l.mapEmbedUrl} label={l.label} variant={i} />
                <div className="p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <span className={`grid size-14 shrink-0 place-items-center rounded-2xl ${i === 0 ? "bg-teal text-cream" : "bg-gold text-teal"}`}>
                      <Icon className="size-6" />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral-700">{l.label}</p>
                      <h3 className="font-display mt-1 text-3xl text-teal">{l.place}</h3>
                      <p className="mt-1 flex items-center gap-1.5 text-ink-soft"><MapPin className="size-4" /> {l.area}</p>
                    </div>
                  </div>

                  <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                    <div className="flex items-center gap-3 rounded-xl bg-cream px-4 py-3">
                      <Phone className="size-4 shrink-0 text-teal" />
                      <dd>{site.phone ? <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="font-semibold text-teal">{site.phone}</a> : <span className="italic text-ink-soft/70">Phone number to be added</span>}</dd>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl bg-cream px-4 py-3">
                      <Clock className="size-4 shrink-0 text-teal" />
                      <dd>{site.hours ?? <span className="italic text-ink-soft/70">Timings to be confirmed</span>}</dd>
                    </div>
                  </dl>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={directionsUrl(l.directionsQuery)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-12 items-center gap-2 rounded-full bg-teal px-5 text-sm font-semibold text-cream transition hover:bg-teal-700"
                    >
                      <Navigation className="size-4" /> Get Directions
                    </a>
                    {wa ? (
                      <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#1f9d55] px-5 text-sm font-semibold text-white transition hover:bg-[#188447]">
                        <MessageCircle className="size-4" /> WhatsApp
                      </a>
                    ) : (
                      <button
                        onClick={() => open(l.id === "clinic" ? "Veterinary consultation" : "Other")}
                        className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full px-5 text-sm font-semibold text-teal ring-1 ring-teal/20 transition hover:bg-teal/5"
                        title="WhatsApp link activates once the verified number is added"
                      >
                        <MessageCircle className="size-4" /> Send an enquiry
                      </button>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function MapPlaceholder({ embed, label, variant }: { embed: string | null; label: string; variant: number }) {
  if (embed) {
    return (
      <iframe
        src={embed}
        title={`Map — Doggy Woggy ${label}`}
        className="h-64 w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }
  return (
    <div className="relative h-56 overflow-hidden bg-sage sm:h-64" aria-label={`Map placeholder for the ${label}`} role="img">
      <svg viewBox="0 0 600 260" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
        <rect width="600" height="260" fill="#D8E8D6" />
        {[...Array(9)].map((_, i) => (
          <rect key={i} x={20 + ((i * 71) % 560)} y={20 + ((i * 53) % 200)} width={60 + (i % 3) * 20} height={40 + (i % 2) * 18} rx="8" fill="#EBF3EA" />
        ))}
        <path d={variant === 0 ? "M-10 180 C 150 150, 260 210, 380 130 S 560 80, 620 100" : "M-10 90 C 120 120, 240 60, 340 120 S 520 210, 620 170"} stroke="#FFF8ED" strokeWidth="22" fill="none" />
        <path d={variant === 0 ? "M260 -10 C 280 80, 240 180, 290 270" : "M420 -10 C 400 90, 450 170, 410 270"} stroke="#FFF8ED" strokeWidth="14" fill="none" />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <motion.div initial={{ y: -20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.3 }} className="flex flex-col items-center">
          <span className="grid size-14 place-items-center rounded-full rounded-br-none rotate-45 bg-coral shadow-coral">
            <Paw className="size-6 -rotate-45 text-teal-800" />
          </span>
          <span className="mt-3 h-2 w-8 rounded-full bg-teal/15" />
        </motion.div>
      </div>
      <span className="absolute bottom-3 left-3 rounded-full bg-cream/90 px-3 py-1 text-[0.68rem] font-semibold text-teal/70">
        Google Maps embed — add exact pin in site settings
      </span>
    </div>
  );
}
