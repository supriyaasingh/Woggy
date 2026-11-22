"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, ShoppingBag, Scissors, Stethoscope } from "lucide-react";
import { Container, Eyebrow, Reveal, Underlined, fadeUp, stagger } from "@/components/ui/primitives";

const pillars = [
  {
    icon: Stethoscope,
    title: "Veterinary care",
    text: "Consultations, diagnostics, vaccinations and treatment from a caring clinic team.",
    href: "/veterinary",
    tone: "bg-teal text-cream",
  },
  {
    icon: Scissors,
    title: "Professional grooming",
    text: "Baths, haircuts and spa care — with pet-safe pickup and drop when you're busy.",
    href: "/grooming",
    tone: "bg-sage text-teal",
  },
  {
    icon: ShoppingBag,
    title: "Pet supplies",
    text: "Food, treats, toys and accessories for everyday happiness, close to home.",
    href: "/store",
    tone: "bg-gold text-teal",
  },
];

export function Intro() {
  return (
    <section id="intro" className="relative py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div>
            <Reveal><Eyebrow>All under one roof</Eyebrow></Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display mt-4 text-[2.5rem] leading-[1.02] font-medium text-teal sm:text-6xl">
                One Happy Place.
                <br />
                <Underlined>Every Pet Need.</Underlined>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-ink-soft">
                No more running across the city for a check-up, a haircut and a bag of food. Doggy Woggy brings veterinary care,
                grooming and pet supplies together in your neighbourhood — so caring for your pet feels simple, joyful and stress-free.
              </p>
            </Reveal>
          </div>

          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            className="grid gap-4"
          >
            {pillars.map(({ icon: Icon, ...p }, i) => (
              <motion.li key={p.title} variants={fadeUp}>
                <Link
                  href={p.href}
                  className="group relative flex items-center gap-5 overflow-hidden rounded-[1.6rem] bg-white p-5 shadow-soft ring-1 ring-teal/5 transition-shadow duration-500 hover:shadow-lift sm:gap-7 sm:p-7"
                >
                  <span className="font-display absolute right-6 top-2 hidden text-7xl sm:block text-teal/[0.04] transition-colors duration-500 group-hover:text-coral/15">
                    0{i + 1}
                  </span>
                  <span className={`grid size-12 shrink-0 place-items-center rounded-2xl sm:size-16 ${p.tone} transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105`}>
                    <Icon className="size-7" strokeWidth={1.7} />
                  </span>
                  <span className="relative min-w-0 flex-1">
                    <span className="font-display block text-2xl text-teal">{p.title}</span>
                    <span className="mt-1.5 block leading-relaxed text-ink-soft">{p.text}</span>
                  </span>
                  <ArrowUpRight className="relative hidden size-6 shrink-0 sm:block text-teal/30 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-coral-600" />
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </section>
  );
}
