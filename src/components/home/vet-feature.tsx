"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Activity, HeartPulse, Microscope, ShieldCheck, Stethoscope, Syringe, Scissors } from "lucide-react";
import { Container, Eyebrow, Reveal, StockNote, fadeUp, stagger } from "@/components/ui/primitives";
import { BookButton } from "@/components/booking/book-button";
import { ease } from "@/lib/utils";

const items = [
  { icon: Stethoscope, title: "Veterinary consultation", text: "Unhurried check-ups where we listen, examine and explain." },
  { icon: Microscope, title: "Diagnostics", text: "Blood tests including CBC, liver and kidney panels." },
  { icon: ShieldCheck, title: "Preventive care", text: "Routine health check-ups to catch concerns early." },
  { icon: Syringe, title: "Vaccinations", text: "Keeping puppies, kittens and adults protected." },
  { icon: HeartPulse, title: "Treatment", text: "Care plans including IV fluid therapy and dental care." },
  { icon: Scissors, title: "Minor surgeries", text: "Including spaying and neutering, with gentle recovery support." },
];

export function VetFeature({ showHeading = true }: { showHeading?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <section id="vet" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <Container className="grid items-center gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        {/* Collage */}
        <div className="relative order-2 lg:order-1">
          <motion.div
            className="relative mx-auto aspect-[1/1.08] max-w-[560px]"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
          >
            <motion.div
              variants={{
                hidden: { clipPath: reduce ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" },
                show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.2, ease } },
              }}
              className="absolute left-0 top-0 h-[78%] w-[78%] overflow-hidden rounded-[2rem]"
            >
              <Image src="/images/vet-cat.jpg" alt="A veterinarian examining a calm tabby cat" fill sizes="(min-width:1024px) 34vw, 80vw" className="object-cover" />
              <StockNote className="absolute bottom-3 left-3" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease, delay: 0.3 }}
              className="absolute bottom-0 right-0 h-[46%] w-[48%] overflow-hidden rounded-[1.5rem] rounded-tl-[5rem] border-[6px] border-white shadow-lift"
            >
              <Image src="/images/vet-recovery.jpg" alt="A pug resting comfortably in a recovery cone" fill sizes="260px" className="object-cover" />
            </motion.div>

            {/* live-pulse card */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.85 },
                show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 160, damping: 18, delay: 0.6 } },
              }}
              className="absolute bottom-[14%] left-[4%] w-[56%] rounded-2xl bg-teal p-4 text-cream shadow-lift sm:p-5"
            >
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-sage/70">
                <span>Health check</span>
                <span className="flex items-center gap-1.5 text-gold">
                  <span className="relative flex size-2">
                    {!reduce && <span className="absolute inset-0 animate-ping rounded-full bg-gold/70" />}
                    <span className="relative size-2 rounded-full bg-gold" />
                  </span>
                  Caring
                </span>
              </div>
              <svg viewBox="0 0 220 50" preserveAspectRatio="none" className="mt-3 h-10 w-full" aria-hidden>
                <motion.path
                  d="M0 28 H60 L72 28 L80 10 L92 44 L104 4 L114 34 L122 28 H220"
                  fill="none"
                  stroke="#F28B62"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={{
                    hidden: { pathLength: reduce ? 1 : 0 },
                    show: { pathLength: 1, transition: { duration: 1.6, ease: "easeInOut", delay: 1 } },
                  }}
                />
              </svg>
              <p className="mt-2 text-sm text-sage/85">Thoughtful care at every life stage.</p>
            </motion.div>

            <div aria-hidden className="absolute -right-6 top-6 -z-10 size-40 rounded-full bg-sage" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="order-1 lg:order-2">
          {showHeading && (
            <>
              <Reveal><Eyebrow>The veterinary clinic</Eyebrow></Reveal>
              <Reveal delay={0.06}>
                <h2 className="font-display mt-4 text-[2.4rem] leading-[1.03] font-medium text-teal sm:text-[3.5rem]">
                  Care That Goes Beyond a <span className="italic text-coral-600 font-display-wonk">Check-up.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
                  Our clinic at Mayuresh Shristi is a calm, welcoming space where your pet is examined with patience and your questions are
                  always answered. From first vaccinations to diagnostics and minor procedures, we look after their health at every stage.
                </p>
              </Reveal>
            </>
          )}

          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            className="mt-10 grid gap-x-8 gap-y-2 sm:grid-cols-2"
          >
            {items.map(({ icon: Icon, title, text }) => (
              <motion.li key={title} variants={fadeUp} className="group flex gap-4 rounded-2xl p-3 transition-colors duration-300 hover:bg-sage-100 -mx-3">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-sage-100 text-teal transition-colors duration-300 group-hover:bg-teal group-hover:text-cream">
                  <Icon className="size-5" strokeWidth={1.8} />
                </span>
                <span>
                  <span className="block font-semibold text-teal">{title}</span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-ink-soft">{text}</span>
                </span>
              </motion.li>
            ))}
          </motion.ul>

          <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center gap-5">
            <BookButton service="Veterinary consultation">Book a Veterinary Visit</BookButton>
            <span className="flex items-center gap-2 text-sm text-ink-soft">
              <Activity className="size-4 text-coral-600" /> For dogs &amp; cats
            </span>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
