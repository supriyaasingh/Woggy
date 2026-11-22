"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useRef, useState, useCallback } from "react";
import { Heart, Stethoscope, Scissors, ShoppingBag } from "lucide-react";
import { Container, LinkButton, Paw, StockNote } from "@/components/ui/primitives";
import { BookButton } from "@/components/booking/book-button";
import { ease } from "@/lib/utils";

const line1 = ["Because", "Every", "Paw"];
const line2 = ["Deserves", "the", "Best", "Care."];

type Print = { id: number; x: number; y: number; r: number; side: 1 | -1 };

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);
  const blobY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-18%"]);

  /* Cursor paw-trail — desktop pointers only, never with reduced motion */
  const [prints, setPrints] = useState<Print[]>([]);
  const last = useRef<{ x: number; y: number } | null>(null);
  const side = useRef<1 | -1>(1);
  const idRef = useRef(0);
  const onMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (reduce || e.pointerType !== "mouse" || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      const prev = last.current;
      if (!prev) { last.current = { x, y }; return; }
      const dx = x - prev.x, dy = y - prev.y;
      if (Math.hypot(dx, dy) < 80) return;
      last.current = { x, y };
      side.current = side.current === 1 ? -1 : 1;
      const r = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      const id = ++idRef.current;
      setPrints((p) => [...p.slice(-9), { id, x, y, r, side: side.current }]);
      setTimeout(() => setPrints((p) => p.filter((q) => q.id !== id)), 1100);
    },
    [reduce],
  );

  const word = (w: string, i: number, extra = "") => (
    <span key={w + i} className="inline-block overflow-hidden pb-[0.12em] align-bottom -mb-[0.12em]">
      <motion.span
        className={`inline-block ${extra}`}
        initial={{ y: reduce ? 0 : "105%", opacity: reduce ? 0 : 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease, delay: 0.15 + i * 0.075 }}
      >
        {w}
      </motion.span>
      &nbsp;
    </span>
  );

  return (
    <section
      ref={ref}
      onPointerMove={onMove}
      className="grain relative -mt-20 overflow-hidden pb-16 pt-32 sm:pb-24 lg:pt-36"
      aria-labelledby="hero-title"
    >
      {/* Background organic shapes */}
      <motion.div style={{ y: blobY }} aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-20 h-[42rem] w-[42rem] rounded-full bg-sage/60 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-gold-200/60 blur-3xl" />
      </motion.div>

      {/* Paw trail */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-20 hidden md:block">
        <AnimatePresence>
          {prints.map((p) => (
            <motion.span
              key={p.id}
              className="absolute text-teal/15"
              style={{ left: p.x, top: p.y, rotate: p.r, x: "-50%", y: "-50%" }}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.5 } }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <Paw className="size-6" style={{ transform: `translateX(${p.side * 12}px)` }} />
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        {/* Copy */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full bg-white/70 py-1.5 pl-1.5 pr-4 text-sm font-semibold text-teal shadow-soft ring-1 ring-teal/5 backdrop-blur"
          >
            <span className="flex -space-x-1.5">
              {[Stethoscope, Scissors, ShoppingBag].map((Icon, i) => (
                <span key={i} className="grid size-7 place-items-center rounded-full bg-teal text-cream ring-2 ring-white">
                  <Icon className="size-3.5" />
                </span>
              ))}
            </span>
            <span className="sm:hidden">Bhandup West, Mumbai</span>
            <span className="hidden sm:inline">Vet · Grooming · Store in Bhandup West</span>
          </motion.div>

          <h1 id="hero-title" className="font-display mt-7 text-[2.9rem] leading-[0.98] font-medium text-teal sm:text-7xl lg:text-[5.4rem] xl:text-[5.9rem]">
            <span className="block">
              {line1.map((w, i) =>
                word(w, i, w === "Paw" ? "font-display-wonk italic text-coral-600" : ""),
              )}
            </span>
            <span className="block">
              {line2.map((w, i) => word(w, i + 3, w === "Best" || w === "Care." ? "relative" : ""))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.75 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl"
          >
            From expert veterinary care to refreshing grooming and everyday essentials, everything your furry family needs is right here.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.9 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <BookButton className="sm:!px-8 !min-h-14 text-base">Book a Visit</BookButton>
            <LinkButton href="#services" variant="ghost" className="!min-h-14 text-base">
              Explore Our Services
            </LinkButton>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-ink-soft"
          >
            {["Dogs & cats welcome", "Pickup & drop for grooming", "Two locations nearby"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Paw className="size-3.5 text-coral" /> {t}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Visual composition */}
        <div className="relative mx-auto w-full max-w-[540px] lg:max-w-none">
          <div className="relative aspect-[4/4.6] w-full">
            {/* gold disc */}
            <motion.div
              aria-hidden
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease, delay: 0.2 }}
              className="absolute -left-4 top-[8%] size-[38%] rounded-full bg-gold"
            />
            {/* main arch image */}
            <motion.div
              initial={{ opacity: 0, scale: reduce ? 1 : 1.08, clipPath: reduce ? "inset(0 0 0 0 round 999px 999px 28px 28px)" : "inset(18% 8% 0% 8% round 999px 999px 28px 28px)" }}
              animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0% round 999px 999px 28px 28px)" }}
              transition={{ duration: 1.3, ease, delay: 0.1 }}
              className="absolute right-0 top-0 h-[92%] w-[78%] overflow-hidden rounded-t-full rounded-b-[28px] bg-sage shadow-lift"
            >
              <motion.div style={{ y: imgY }} className="absolute -inset-x-0 -top-[6%] h-[112%]">
                <Image
                  src="/images/hero-dog.jpg"
                  alt="A happy beagle smiling at the camera"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover object-[50%_40%]"
                />
              </motion.div>
              <StockNote className="absolute left-1/2 top-[14%] -translate-x-1/2" />
            </motion.div>

            {/* cat inset */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 16, delay: 0.7 }}
              className="absolute bottom-0 left-0 aspect-square w-[42%] overflow-hidden rounded-full border-[7px] border-cream shadow-lift"
            >
              <Image src="/images/hero-cat.jpg" alt="A curious black-and-white cat" fill sizes="240px" className="object-cover object-[50%_35%]" />
            </motion.div>

            {/* floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, x: -10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ type: "spring", stiffness: 140, damping: 18, delay: 1.05 }}
              className="absolute left-[4%] top-[50%] z-10 sm:left-[-2%]"
            >
              <motion.div
                animate={reduce ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center gap-3 rounded-2xl bg-white/95 py-3 pl-3 pr-5 shadow-lift ring-1 ring-teal/5 backdrop-blur"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-coral/15 text-coral-600">
                  <Heart className="size-5 fill-current" />
                </span>
                <span className="text-sm leading-tight">
                  <span className="block font-semibold text-teal">Your Pet&apos;s Happiness,</span>
                  <span className="text-ink-soft">Our Priority</span>
                </span>
              </motion.div>
            </motion.div>

            {/* rotating stamp */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 140, damping: 16, delay: 1.2 }}
              className="absolute -right-2 bottom-[2%] z-10 size-28 sm:size-32"
            >
              <motion.svg
                viewBox="0 0 120 120"
                className="absolute inset-0 text-teal"
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                aria-hidden
              >
                <circle cx="60" cy="60" r="58" className="fill-teal" />
                <defs>
                  <path id="stamp-circle" d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0" />
                </defs>
                <text className="fill-cream text-[10.5px] font-bold uppercase tracking-[0.32em]">
                  <textPath href="#stamp-circle">vet care • grooming • pet store •</textPath>
                </text>
              </motion.svg>
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid size-11 place-items-center rounded-full bg-coral text-teal-800">
                  <Paw className="size-6" />
                </span>
              </span>
            </motion.div>

            {/* floating paws */}
            {!reduce &&
              [
                { c: "left-[30%] -top-4 size-7 text-coral/70", d: 0 },
                { c: "right-[-4%] top-[30%] size-5 text-teal/25", d: 1.4 },
                { c: "left-[44%] bottom-[-6%] size-6 text-gold", d: 0.7 },
              ].map((p, i) => (
                <motion.span
                  key={i}
                  aria-hidden
                  className={`absolute ${p.c}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, y: [0, -14, 0], rotate: [-10, 10, -10] }}
                  transition={{ opacity: { delay: 1.3 + p.d * 0.2 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: p.d }, rotate: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: p.d } }}
                >
                  <Paw className="size-full" />
                </motion.span>
              ))}
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.a
        href="#intro"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.3em] text-teal/50 transition hover:text-teal lg:flex"
        aria-label="Scroll to learn more"
      >
        <span className="flex h-10 w-6 justify-center rounded-full border-2 border-current pt-1.5">
          <motion.span
            className="block size-1.5 rounded-full bg-current"
            animate={reduce ? undefined : { y: [0, 14, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        Scroll
      </motion.a>
    </section>
  );
}
