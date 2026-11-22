"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Building2, Cat, MapPinned, Scissors, Truck } from "lucide-react";
import { Container, Eyebrow, Reveal, StockNote, Underlined } from "@/components/ui/primitives";
import { cn, ease } from "@/lib/utils";

const reasons = [
  { icon: Building2, title: "Vet, grooming & retail together", text: "Health care, a fresh groom and the week's supplies — sorted in one trusted neighbourhood stop." },
  { icon: MapPinned, title: "Convenient neighbourhood care", text: "Two Bhandup West locations close to home, so care is never a long trip away." },
  { icon: Scissors, title: "Professional grooming", text: "From baths and trims to dematting and medicated baths, handled with patience and skill." },
  { icon: Truck, title: "Pet-safe pickup & drop", text: "A ventilated, CCTV-equipped pet cart covering Bhandup, Mulund, Nahur and Kanjurmarg." },
  { icon: Cat, title: "Care for dogs and cats", text: "Whether they woof or meow, every pet is welcomed and cared for like family." },
];

const tones = ["bg-teal text-cream", "bg-sage text-teal", "bg-coral text-teal-800", "bg-gold text-teal", "bg-teal-700 text-cream"];

export function Why() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);

  return (
    <section id="about" className="grain relative bg-cream-200/60 py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div ref={ref} className="lg:sticky lg:top-28 lg:self-start">
          <Reveal><Eyebrow>Why Doggy Woggy</Eyebrow></Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display mt-4 text-[2.4rem] leading-[1.03] font-medium text-teal sm:text-[3.4rem]">
              The neighbourhood&apos;s <Underlined>happy place</Underlined> for pets.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
              Doggy Woggy was created for pet parents who want the very best for their companions — without the running around. We bring
              veterinary care, grooming and pet supplies together, with warmth at the heart of everything we do.
            </p>
          </Reveal>
          <Reveal delay={0.18} className="relative mt-10 aspect-[16/11] overflow-hidden rounded-[2rem] rounded-tr-[7rem]">
            <motion.div style={{ y }} className="absolute -inset-y-[8%] inset-x-0">
              <Image src="/images/dog-cat-cuddle.jpg" alt="A dog and a cat cuddling together on the grass" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
            </motion.div>
            <StockNote className="absolute bottom-3 left-3" />
          </Reveal>
        </div>

        <ol className="relative space-y-4">
          {reasons.map(({ icon: Icon, title, text }, i) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, x: reduce ? 0 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.8, ease }}
              className="group relative flex gap-5 overflow-hidden rounded-[1.75rem] bg-white p-6 shadow-soft ring-1 ring-teal/5 transition-shadow duration-500 hover:shadow-lift sm:gap-7 sm:p-8 lg:min-h-[11.5rem]"
            >
              <span className={cn("grid size-16 shrink-0 place-items-center rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6", tones[i])}>
                <Icon className="size-7" strokeWidth={1.7} />
              </span>
              <span>
                <span className="text-xs font-bold tracking-[0.2em] text-coral-700">0{i + 1}</span>
                <span className="font-display mt-1 block text-2xl leading-tight text-teal sm:text-[1.75rem]">{title}</span>
                <span className="mt-2 block leading-relaxed text-ink-soft">{text}</span>
              </span>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
