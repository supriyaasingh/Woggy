"use client";

import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { Container, SectionHeading, fadeUp, stagger } from "@/components/ui/primitives";

export function ServiceList({
  eyebrow,
  title,
  intro,
  items,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  items: { icon: LucideIcon; title: string; text: string }[];
}) {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />
        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-8%" }}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map(({ icon: Icon, title, text }, i) => (
            <motion.li
              key={title}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-[1.75rem] bg-white p-7 shadow-soft ring-1 ring-teal/5 transition-shadow duration-500 hover:shadow-lift"
            >
              <span className="font-display absolute right-6 top-4 text-6xl text-teal/[0.05]">{String(i + 1).padStart(2, "0")}</span>
              <span className="grid size-14 place-items-center rounded-2xl bg-sage text-teal transition duration-500 group-hover:-rotate-6 group-hover:bg-teal group-hover:text-cream">
                <Icon className="size-6" strokeWidth={1.8} />
              </span>
              <h3 className="font-display mt-6 text-2xl text-teal">{title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{text}</p>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
