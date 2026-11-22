"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Scissors, ShoppingBag, Stethoscope, Truck } from "lucide-react";
import { serviceCards, type ServiceCard } from "@/lib/content";
import { Container, SectionHeading, StockNote } from "@/components/ui/primitives";
import { cn, ease } from "@/lib/utils";

const theme = {
  vet: {
    card: "bg-teal text-cream",
    label: "text-gold",
    title: "text-cream",
    desc: "text-sage/80",
    chip: "bg-teal-700 text-sage",
    cta: "bg-coral text-teal-800",
    icon: Stethoscope,
    iconWrap: "bg-coral text-teal-800",
    shape: "rounded-t-[999px] rounded-b-[1.25rem]",
  },
  groom: {
    card: "bg-sage text-teal",
    label: "text-coral-700",
    title: "text-teal",
    desc: "text-ink-soft",
    chip: "bg-cream/70 text-teal",
    cta: "bg-teal text-cream",
    icon: Scissors,
    iconWrap: "bg-teal text-cream",
    shape: "rounded-[1.25rem] rounded-tr-[7rem]",
  },
  store: {
    card: "bg-gold-200 text-teal",
    label: "text-coral-700",
    title: "text-teal",
    desc: "text-ink-soft",
    chip: "bg-cream/80 text-teal",
    cta: "bg-teal text-cream",
    icon: ShoppingBag,
    iconWrap: "bg-coral text-teal-800",
    shape: "rounded-[1.25rem] rounded-tl-[7rem]",
  },
} as const;

export function Services() {
  return (
    <section id="services" className="relative pb-24 pt-20 sm:pb-36 sm:pt-28">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Three ways we care"
            title={<>A doctor, a salon &amp; a supermarket — <em className="font-display-wonk text-coral-600">for your pet.</em></>}
          />
          <p className="max-w-sm text-ink-soft lg:pb-3">
            Every visit is designed around your pet&apos;s comfort — whether they&apos;re here for a vaccination, a fresh new look or their favourite treat.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:items-start">
          {serviceCards.map((c, i) => (
            <Card key={c.key} c={c} i={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function Card({ c, i }: { c: ServiceCard; i: number }) {
  const t = theme[c.key];
  const Icon = t.icon;
  const reduce = useReducedMotion();
  return (
    <motion.article
      initial={{ opacity: 0, y: reduce ? 0 : 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.9, ease, delay: i * 0.12 }}
      className={cn(i === 1 && "lg:mt-16", i === 2 && "md:col-span-2 lg:col-span-1")}
    >
      <motion.div
        whileHover={reduce ? undefined : { y: -10 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className={cn(
          "group relative flex h-full flex-col rounded-[var(--radius-card)] p-4 pb-7 shadow-soft transition-shadow duration-500 hover:shadow-lift sm:p-5 sm:pb-8",
          t.card,
        )}
      >
        <div className={cn("relative aspect-[4/3.4] overflow-hidden", t.shape, i === 2 && "md:aspect-[16/8] lg:aspect-[4/3.4]")}>
          <Image
            src={c.image}
            alt={c.imageAlt}
            fill
            sizes="(min-width:1024px) 30vw, (min-width:768px) 50vw, 100vw"
            className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.07]"
          />
          <StockNote className="absolute bottom-3 left-3" />
          {c.key === "groom" && (
            <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-coral px-3 py-1.5 text-xs font-bold text-teal-800 shadow-coral">
              <Truck className="size-3.5" /> Pickup &amp; Drop
            </span>
          )}
        </div>

        <div className="relative px-2 pt-7 sm:px-3">
          <span
            className={cn(
              "absolute -top-7 right-4 grid size-14 place-items-center rounded-2xl shadow-lift transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110",
              t.iconWrap,
            )}
          >
            <Icon className="size-6" strokeWidth={1.8} />
          </span>
          <p className={cn("text-xs font-bold uppercase tracking-[0.22em]", t.label)}>{c.label}</p>
          <h3 className={cn("font-display mt-3 text-[2rem] leading-[1.05]", t.title)}>{c.title}</h3>
          <p className={cn("mt-3 leading-relaxed", t.desc)}>{c.description}</p>

          <ul className="mt-6 flex flex-wrap gap-1.5">
            {c.items.map((s) => (
              <li key={s} className={cn("inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[0.8rem] font-medium", t.chip)}>
                <Check className="size-3 opacity-60" strokeWidth={3} />
                {s}
              </li>
            ))}
          </ul>

          {c.key === "groom" && (
            <div className="mt-6 rounded-2xl bg-teal p-4 text-cream">
              <p className="flex items-center gap-2 text-sm font-bold">
                <Truck className="size-4 text-gold" /> Pet Pickup &amp; Drop Available
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-sage/80">
                In a ventilated, CCTV-equipped pet cart across Bhandup, Mulund, Nahur and Kanjurmarg.
              </p>
            </div>
          )}

          <Link
            href={c.href}
            className={cn(
              "mt-7 inline-flex min-h-12 items-center gap-3 rounded-full py-2 pl-5 pr-2 text-sm font-semibold transition-[gap] duration-300 hover:gap-5",
              t.cta,
            )}
          >
            {c.cta}
            <span className="grid size-8 place-items-center rounded-full bg-cream/20">
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </motion.div>
    </motion.article>
  );
}
