"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Container, Eyebrow, StockNote } from "@/components/ui/primitives";
import { cn, ease } from "@/lib/utils";

export function PageHero({
  eyebrow,
  crumb,
  title,
  intro,
  image,
  imageAlt,
  actions,
  tone = "sage",
}: {
  eyebrow: string;
  crumb: string;
  title: ReactNode;
  intro: string;
  image: string;
  imageAlt: string;
  actions?: ReactNode;
  tone?: "sage" | "gold" | "teal";
}) {
  const reduce = useReducedMotion();
  const bg = { sage: "bg-sage", gold: "bg-gold-200", teal: "bg-sage-100" }[tone];
  return (
    <section className={cn("grain relative -mt-20 overflow-hidden pb-16 pt-32 sm:pb-24 lg:pt-36", bg)}>
      <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm font-medium text-teal/60">
            <Link href="/" className="hover:text-teal">Home</Link>
            <ChevronRight className="size-3.5" />
            <span className="text-teal" aria-current="page">{crumb}</span>
          </motion.nav>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: reduce ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.08 }}
            className="font-display mt-4 text-[2.8rem] leading-[1] font-medium text-teal sm:text-6xl lg:text-7xl"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft"
          >
            {intro}
          </motion.p>
          {actions && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.3 }} className="mt-9 flex flex-col gap-3 sm:flex-row">
              {actions}
            </motion.div>
          )}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 1.06, clipPath: reduce ? "inset(0 round 2rem)" : "inset(12% 10% 12% 10% round 2rem)" }}
          animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0% round 2rem)" }}
          transition={{ duration: 1.2, ease }}
          className="relative aspect-[5/4] overflow-hidden rounded-[2rem] rounded-tl-[9rem] shadow-lift"
        >
          <Image src={image} alt={imageAlt} fill priority sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
          <StockNote className="absolute bottom-3 right-3" />
        </motion.div>
      </Container>
    </section>
  );
}
