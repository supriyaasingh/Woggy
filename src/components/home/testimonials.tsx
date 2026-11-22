"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { cn, ease } from "@/lib/utils";

/**
 * DEMO CONTENT — these are placeholder reviews written for the design preview only.
 * Replace with genuine customer reviews (e.g. from Google Business Profile) before launch.
 */
const demoReviews = [
  {
    quote: "Having the vet, grooming and store in one place makes life so much easier. My dog actually looks forward to his visits now.",
    who: "Sample pet parent",
    pet: "Dog parent · Bhandup",
    service: "Vet + Grooming",
  },
  {
    quote: "The pickup and drop is a lifesaver on busy weekdays. Our cat came home calm, clean and smelling lovely.",
    who: "Sample pet parent",
    pet: "Cat parent · Mulund",
    service: "Grooming pickup",
  },
  {
    quote: "Friendly team who explain everything patiently. It feels like a neighbourhood place that genuinely cares about pets.",
    who: "Sample pet parent",
    pet: "Dog parent · Nahur",
    service: "Consultation",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const reduce = useReducedMotion();
  const go = (d: number) => {
    setDir(d);
    setI((n) => (n + d + demoReviews.length) % demoReviews.length);
  };
  const r = demoReviews[i];

  return (
    <section id="reviews" className="relative overflow-hidden bg-sage-100 py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="Kind words" title={<>Loved by pets. <span className="italic text-coral-600 font-display-wonk">Trusted</span> by parents.</>} />
            <div className="mt-8 flex gap-3 rounded-2xl border border-dashed border-teal/25 bg-cream/70 p-4 text-sm text-ink-soft">
              <Info className="mt-0.5 size-4 shrink-0 text-coral-700" />
              <p>
                <strong className="text-teal">Demo content.</strong> These sample reviews show the layout only and are not from real customers.
                Genuine reviews from Doggy Woggy pet parents will be added here.
              </p>
            </div>
          </div>

          <div className="relative">
            <span aria-hidden className="font-display pointer-events-none absolute -left-1 -top-16 select-none text-[9rem] leading-none text-coral/30 sm:-top-20 sm:text-[11rem]">&ldquo;</span>
            <div className="relative min-h-[19rem] sm:min-h-[17rem]" aria-live="polite">
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <motion.figure
                  key={i}
                  custom={dir}
                  initial={{ opacity: 0, x: reduce ? 0 : dir * 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: reduce ? 0 : dir * -60 }}
                  transition={{ duration: 0.5, ease }}
                  drag={reduce ? false : "x"}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) go(1);
                    else if (info.offset.x > 60) go(-1);
                  }}
                  className="relative cursor-grab rounded-[2rem] bg-white p-8 shadow-soft active:cursor-grabbing sm:p-12"
                >
                  <span className="absolute right-6 top-6 rounded-full bg-gold-200 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-teal">
                    Sample review
                  </span>
                  <blockquote className="font-display mt-4 text-2xl leading-snug text-teal sm:text-[2rem]">
                    &ldquo;{r.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-4">
                    <span className="grid size-12 place-items-center rounded-full bg-sage font-display text-lg text-teal">
                      {r.pet[0]}
                    </span>
                    <span>
                      <span className="block font-semibold text-teal">{r.who}</span>
                      <span className="block text-sm text-ink-soft">{r.pet} · {r.service}</span>
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                {demoReviews.map((_, n) => (
                  <button
                    key={n}
                    onClick={() => { setDir(n > i ? 1 : -1); setI(n); }}
                    aria-label={`Show review ${n + 1}`}
                    aria-current={n === i}
                    className="grid h-11 cursor-pointer place-items-center px-1"
                  >
                    <span className={cn("block h-2 rounded-full transition-all duration-500", n === i ? "w-10 bg-teal" : "w-2 bg-teal/20")} />
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => go(-1)} aria-label="Previous review" className="grid size-12 cursor-pointer place-items-center rounded-full bg-white text-teal shadow-soft transition hover:bg-teal hover:text-cream">
                  <ArrowLeft className="size-5" />
                </button>
                <button onClick={() => go(1)} aria-label="Next review" className="grid size-12 cursor-pointer place-items-center rounded-full bg-teal text-cream shadow-soft transition hover:bg-teal-700">
                  <ArrowRight className="size-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
