"use client";

import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { cn, ease } from "@/lib/utils";

type Cat = "Dogs" | "Cats" | "Care" | "Store";
type Shot = { src: string; alt: string; cat: Cat; tall?: boolean; wide?: boolean };

const shots: Shot[] = [
  { src: "/images/g-beach-dog.jpg", alt: "A joyful dog running out of the sea", cat: "Dogs", tall: true },
  { src: "/images/g-kitten-paw.jpg", alt: "A kitten reaching up with one paw", cat: "Cats" },
  { src: "/images/groom-dryer.jpg", alt: "A dog being gently blow-dried after a bath", cat: "Care", wide: true },
  { src: "/images/g-corgi.jpg", alt: "A smiling corgi", cat: "Dogs" },
  { src: "/images/g-cat-gaze.jpg", alt: "A tabby cat with bright green eyes", cat: "Cats", tall: true },
  { src: "/images/vet-stethoscope.jpg", alt: "A stethoscope beside a laptop in a clinic", cat: "Care" },
  { src: "/images/store-bed.jpg", alt: "A dog relaxing in a cosy pet bed", cat: "Store", wide: true },
  { src: "/images/g-maltese.jpg", alt: "A fluffy white dog bounding across grass", cat: "Dogs" },
  { src: "/images/g-kittens.jpg", alt: "Two kittens snuggled in a basket", cat: "Cats" },
  { src: "/images/g-frenchie.jpg", alt: "A French bulldog puppy lying on a yellow backdrop", cat: "Dogs", tall: true },
  { src: "/images/groom-shihtzu.jpg", alt: "A freshly groomed Shih Tzu with a bow", cat: "Care" },
  { src: "/images/g-orange-cat.jpg", alt: "A ginger cat on a mustard backdrop", cat: "Cats" },
  { src: "/images/g-friends.jpg", alt: "A corgi and a terrier running together", cat: "Dogs", wide: true },
  { src: "/images/store-treats.jpg", alt: "Bone-shaped biscuits", cat: "Store" },
];

const filters = ["All", "Dogs", "Cats", "Care", "Store"] as const;

export function Gallery() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const list = useMemo(() => (filter === "All" ? shots : shots.filter((s) => s.cat === filter)), [filter]);

  const go = useCallback(
    (d: number) => setActive((a) => (a === null ? a : (a + d + list.length) % list.length)),
    [list.length],
  );

  useEffect(() => {
    if (active === null) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, go]);

  const current = active !== null ? list[active] : null;

  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Gallery"
            title={<>Tails, whiskers &amp; <span className="italic text-coral-600 font-display-wonk">happy moments.</span></>}
          />
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:px-0" role="tablist" aria-label="Filter gallery">
            {filters.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  "relative min-h-11 shrink-0 cursor-pointer rounded-full px-5 text-sm font-semibold transition-colors",
                  filter === f ? "text-cream" : "text-teal ring-1 ring-teal/15 hover:ring-teal/40",
                )}
              >
                {filter === f && (
                  <motion.span layoutId="gallery-filter" className="absolute inset-0 rounded-full bg-teal" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                <span className="relative">{f}</span>
              </button>
            ))}
          </div>
        </div>

        <LayoutGroup>
          <motion.ul layout className="mt-12 grid grid-flow-dense auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {list.map((s, i) => (
                <motion.li
                  layout={!reduce}
                  key={s.src}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.55, ease, delay: Math.min(i, 8) * 0.035 }}
                  className={cn(s.tall && "row-span-2", s.wide && "col-span-2")}
                >
                  <button
                    onClick={() => setActive(i)}
                    className="group relative block h-full w-full cursor-zoom-in overflow-hidden rounded-[1.4rem] bg-sage"
                    aria-label={`Open image: ${s.alt}`}
                  >
                    <motion.div layoutId={reduce ? undefined : `img-${s.src}`} className="absolute inset-0">
                      <Image src={s.src} alt={s.alt} fill sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw" className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110" />
                    </motion.div>
                    <span className="absolute inset-0 bg-teal-800/0 transition-colors duration-500 group-hover:bg-teal-800/25" />
                    <span className="absolute right-3 top-3 grid size-9 scale-75 place-items-center rounded-full bg-cream text-teal opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100">
                      <Expand className="size-4" />
                    </span>
                    <span className="absolute bottom-3 left-3 rounded-full bg-cream/90 px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-teal opacity-0 transition duration-300 group-hover:opacity-100">
                      {s.cat}
                    </span>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>

          <p className="mt-6 text-sm text-ink-soft">
            Illustrative photography for this preview. Real Doggy Woggy moments from the clinic, salon and store can replace these anytime.
          </p>

          {/* Lightbox */}
          <AnimatePresence>
            {current && (
              <motion.div
                className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-10"
                role="dialog"
                aria-modal="true"
                aria-label="Image viewer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.button
                  aria-label="Close image viewer"
                  className="absolute inset-0 cursor-zoom-out bg-teal-800/90 backdrop-blur-md"
                  onClick={() => setActive(null)}
                />
                <motion.figure className="relative h-[72vh] w-full max-w-5xl" layoutId={reduce ? undefined : `img-${current.src}`} transition={{ type: "spring", stiffness: 220, damping: 30 }}>
                  <Image src={current.src} alt={current.alt} fill sizes="90vw" className="rounded-[1.5rem] object-contain" />
                </motion.figure>
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute bottom-6 left-1/2 w-[90%] -translate-x-1/2 text-center text-sm text-sage">
                  {current.alt} · <span className="text-sage/60">{(active ?? 0) + 1} / {list.length}</span>
                </motion.p>
                <button onClick={() => setActive(null)} className="absolute right-4 top-4 grid size-12 cursor-pointer place-items-center rounded-full bg-cream text-teal" aria-label="Close">
                  <X className="size-5" />
                </button>
                <button onClick={() => go(-1)} className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-cream/90 text-teal sm:left-6" aria-label="Previous image">
                  <ChevronLeft className="size-5" />
                </button>
                <button onClick={() => go(1)} className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-cream/90 text-teal sm:right-6" aria-label="Next image">
                  <ChevronRight className="size-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </Container>
    </section>
  );
}
