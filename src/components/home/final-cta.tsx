"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Container, LinkButton, Paw, StockNote } from "@/components/ui/primitives";
import { BookButton } from "@/components/booking/book-button";
import { ease } from "@/lib/utils";

export function FinalCta() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.45], reduce ? [1, 1] : [0.92, 1]);
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);

  return (
    <section className="relative pb-24 pt-8 sm:pb-32">
      <Container>
        <motion.div ref={ref} style={{ scale }} className="relative overflow-hidden rounded-[2.5rem] bg-teal text-cream">
          <div className="grid lg:grid-cols-[1.1fr_1fr]">
            <div className="relative z-10 p-8 py-14 sm:p-14 lg:p-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease }}
              >
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-gold">
                  <Paw className="size-3.5" /> Let&apos;s get started
                </span>
                <h2 className="font-display mt-5 text-[2.6rem] leading-[1] font-medium sm:text-6xl lg:text-[4.4rem]">
                  More Love.
                  <br />
                  More Care.
                  <br />
                  <span className="italic text-coral font-display-wonk">More Happy Tails.</span>
                </h2>
                <p className="mt-7 max-w-md text-lg leading-relaxed text-sage/85">
                  Your pet deserves the very best. Let&apos;s make every day a little happier.
                </p>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <BookButton className="!min-h-14 sm:!px-8">Book an Appointment</BookButton>
                  <LinkButton href="/#contact" variant="outline-light" className="!min-h-14">
                    Get in Touch
                  </LinkButton>
                </div>
              </motion.div>
            </div>

            <div className="relative min-h-[22rem] lg:min-h-full">
              <motion.div style={{ y: imgY }} className="absolute -inset-y-[10%] inset-x-0">
                <Image src="/images/cat-puppy-grass.jpg" alt="A cat and a puppy relaxing together on the grass" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-b from-teal via-teal/0 to-transparent lg:bg-gradient-to-r lg:from-teal lg:via-teal/0 lg:via-25%" />
              <StockNote light className="absolute bottom-4 right-4" />
            </div>
          </div>

          {/* decorative paws */}
          {[
            "left-[46%] top-10 size-10 rotate-12 text-teal-700",
            "left-[8%] bottom-6 size-16 -rotate-12 text-teal-700/70",
          ].map((c, i) => (
            <Paw key={i} aria-hidden className={`pointer-events-none absolute hidden lg:block ${c}`} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
