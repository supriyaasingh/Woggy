"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { CalendarCheck, Home, Sparkles, Truck } from "lucide-react";
import { Container, SectionHeading, StockNote, Paw } from "@/components/ui/primitives";
import { BookButton } from "@/components/booking/book-button";
import { cn, ease } from "@/lib/utils";

const treatments = [
  { title: "Bathing", note: "Gentle, regular, medicated or organic", img: "/images/groom-dryer.jpg", alt: "A groomer blow-drying a fluffy dog after a bath" },
  { title: "Haircuts", note: "Neat, breed-friendly trims", img: "/images/groom-schnauzer.jpg", alt: "A freshly trimmed schnauzer against a yellow backdrop" },
  { title: "Nail care", note: "Careful clipping for comfy paws", img: "/images/paw.jpg", alt: "Close-up of soft pink paw pads" },
  { title: "Deshedding", note: "Less fluff on your sofa", img: "/images/groom-samoyed.jpg", alt: "A fluffy white Samoyed with a beautifully brushed coat" },
  { title: "Spa treatments", note: "Brushing, ear & eye cleaning", img: "/images/groom-golden.jpg", alt: "A golden dog enjoying gentle grooming" },
];

const steps = [
  { icon: CalendarCheck, title: "Book grooming", text: "Choose the services your pet needs and a preferred day." },
  { icon: Truck, title: "Arrange pickup", text: "Opt for pickup in our ventilated, CCTV-equipped pet cart." },
  { icon: Sparkles, title: "Professional grooming", text: "Bath, trim and pampering — handled with patience." },
  { icon: Home, title: "Happy pet returns home", text: "Fresh, fluffy and dropped back to your door." },
];

export function Grooming() {
  return (
    <section id="grooming" className="relative overflow-hidden bg-sage py-24 sm:py-32">
      <Paw aria-hidden className="pointer-events-none absolute -right-20 top-10 size-80 rotate-12 text-sage-300/60" />
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Grooming & spa"
            title={<>A Little Freshness. <span className="italic text-coral-700 font-display-wonk">A Lot More</span> Happiness.</>}
            intro="Professional grooming that leaves your pet looking great and feeling even better — in a calm, caring salon."
          />
          <div className="shrink-0">
            <BookButton service="Grooming" variant="teal">Book Grooming</BookButton>
          </div>
        </div>
      </Container>

      {/* Treatments — scroll-snapping image rail */}
      <div className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:gap-5 sm:px-6 lg:px-[max(2rem,calc((100vw-1240px)/2+2rem))]">
        {treatments.map((t, i) => (
          <motion.figure
            key={t.title}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.9, ease, delay: i * 0.08 }}
            className={cn(
              "group relative shrink-0 snap-start overflow-hidden rounded-[1.75rem] bg-teal",
              i % 2 === 0 ? "h-[26rem] w-[17rem] sm:h-[30rem] sm:w-[20rem]" : "mt-10 h-[22rem] w-[16rem] sm:h-[26rem] sm:w-[19rem]",
            )}
          >
            <Image src={t.img} alt={t.alt} fill sizes="320px" className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-800/85 via-teal-800/10 to-transparent" />
            <StockNote light className="absolute right-3 top-3" />
            <figcaption className="absolute inset-x-0 bottom-0 p-6 text-cream">
              <span className="text-xs font-bold text-gold">0{i + 1}</span>
              <span className="font-display mt-1 block text-[1.9rem] leading-none">{t.title}</span>
              <span className="mt-2 block text-sm text-sage/85 transition-all duration-500 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                {t.note}
              </span>
            </figcaption>
          </motion.figure>
        ))}
        <div className="w-2 shrink-0" aria-hidden />
      </div>

      <Container>
        <Process />
      </Container>
    </section>
  );
}

function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const line = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0, 1]);

  return (
    <div ref={ref} className="relative mt-20 rounded-[2rem] bg-cream p-6 shadow-soft sm:p-10 lg:p-14">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h3 className="font-display text-3xl text-teal sm:text-4xl">How a grooming day works</h3>
        <p className="text-sm text-ink-soft">Pickup and drop is optional — you&apos;re always welcome to walk in.</p>
      </div>

      <div className="relative mt-12">
        {/* connecting line — horizontal on desktop, vertical on mobile */}
        <div aria-hidden className="absolute left-[1.75rem] top-7 bottom-7 w-0.5 bg-teal/10 lg:left-[12.5%] lg:right-[12.5%] lg:top-7 lg:bottom-auto lg:h-0.5 lg:w-auto">
          <motion.div style={{ scaleY: line }} className="absolute inset-0 origin-top bg-coral lg:hidden" />
          <motion.div style={{ scaleX: line }} className="absolute inset-0 hidden origin-left bg-coral lg:block" />
        </div>

        <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-6">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.7, ease, delay: i * 0.15 }}
              className="flex gap-5 lg:flex-col lg:items-center lg:text-center"
            >
              <motion.span
                initial={{ scale: 0.6 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.15 + i * 0.15 }}
                className={cn(
                  "relative z-10 grid size-14 shrink-0 place-items-center rounded-2xl ring-8 ring-cream",
                  i === 3 ? "bg-coral text-teal-800" : "bg-teal text-cream",
                )}
              >
                <Icon className="size-6" strokeWidth={1.8} />
                <span className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-gold text-[0.7rem] font-bold text-teal">
                  {i + 1}
                </span>
              </motion.span>
              <span>
                <span className="font-display block text-xl text-teal lg:mt-5">{title}</span>
                <span className="mt-1.5 block text-sm leading-relaxed text-ink-soft lg:mx-auto lg:max-w-[15rem]">{text}</span>
              </span>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}
