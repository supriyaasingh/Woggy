"use client";

import Image from "next/image";
import { animate, motion, useInView, useMotionValue, useMotionValueEvent, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Cctv, Fan, MapPin, Route } from "lucide-react";
import { Container, Eyebrow, Reveal, StockNote, Paw } from "@/components/ui/primitives";
import { BookButton } from "@/components/booking/book-button";
import { ease } from "@/lib/utils";

const features = [
  { icon: Fan, title: "Ventilated pet cart", text: "Fresh airflow keeps your pet comfortable on the way." },
  { icon: Cctv, title: "CCTV-equipped", text: "A camera-monitored cart for extra peace of mind." },
  { icon: Route, title: "Pickup & drop", text: "We collect your pet for grooming and bring them home again." },
];

/* Stylised (not to scale) route — north to south along the Central line suburbs */
const ROUTE = "M70 50 C 170 40, 250 90, 230 150 S 90 210, 110 270 S 300 330, 290 390 S 150 460, 180 520";
const stops = [
  { name: "Mulund", x: 70, y: 50, above: true },
  { name: "Nahur", x: 230, y: 150 },
  { name: "Bhandup", x: 110, y: 270, home: true },
  { name: "Kanjurmarg", x: 290, y: 390 },
];

export function Pickup() {
  return (
    <section id="pickup" className="relative overflow-hidden bg-teal py-24 text-cream sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(#FFF8ED 1.2px, transparent 1.2px)", backgroundSize: "26px 26px" }} />
      <Container className="relative grid items-center gap-16 lg:grid-cols-[1fr_1fr]">
        <div>
          <Reveal><Eyebrow light>Pet pickup &amp; drop</Eyebrow></Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display mt-4 text-[2.5rem] leading-[1.02] font-medium sm:text-6xl">
              Too Busy to Bring Your Pet? <span className="italic text-gold font-display-wonk">We&apos;ll Help!</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-sage/85">
              Work, traffic, a full day — we understand. For grooming appointments, our pet-safe transport can collect your pet from home and
              bring them back fresh and happy.
            </p>
          </Reveal>

          <ul className="mt-10 space-y-3">
            {features.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={0.1 + i * 0.08}>
                <div className="flex items-center gap-4 rounded-2xl bg-teal-700/60 p-4 ring-1 ring-cream/5 transition hover:bg-teal-700">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gold text-teal">
                    <Icon className="size-5" />
                  </span>
                  <span>
                    <span className="block font-semibold">{title}</span>
                    <span className="block text-sm text-sage/75">{text}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.2} className="mt-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-sage/60">Areas we cover</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {stops.map((s) => (
                <span key={s.name} className="inline-flex items-center gap-1.5 rounded-full bg-cream px-4 py-2 text-sm font-semibold text-teal">
                  <MapPin className="size-3.5 text-coral-600" /> {s.name}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-sage/60">Pickup slots and charges are confirmed by the team when you enquire.</p>
          </Reveal>

          <Reveal delay={0.25} className="mt-9">
            <BookButton service="Pickup and drop enquiry">Enquire About Pickup</BookButton>
          </Reveal>
        </div>

        <RouteMap />
      </Container>
    </section>
  );
}

function RouteMap() {
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const inView = useInView(ref, { margin: "-10%" });
  const reduce = useReducedMotion();
  const progress = useMotionValue(0);
  const [pos, setPos] = useState({ x: stops[0].x, y: stops[0].y, a: 0 });
  const [drawn, setDrawn] = useState(false);

  useMotionValueEvent(progress, "change", (v) => {
    const p = pathRef.current;
    if (!p) return;
    const len = p.getTotalLength();
    const pt = p.getPointAtLength(v * len);
    const ahead = p.getPointAtLength(Math.min(len, v * len + 2));
    const a = (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI;
    setPos({ x: pt.x, y: pt.y, a });
  });

  useEffect(() => {
    if (!inView) return;
    setDrawn(true);
    if (reduce) {
      progress.set(0.45);
      return;
    }
    const controls = animate(progress, [0, 1, 0], {
      duration: 14,
      ease: "easeInOut",
      repeat: Infinity,
      delay: 1.2,
    });
    return () => controls.stop();
  }, [inView, reduce, progress]);

  const flip = Math.abs(pos.a) > 90;

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[520px]">
      <div className="relative aspect-[360/560] w-full overflow-hidden rounded-[2rem] bg-teal-800 ring-1 ring-cream/10">
        {/* map texture */}
        <svg viewBox="0 0 360 560" className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <pattern id="blocks" width="44" height="44" patternUnits="userSpaceOnUse" patternTransform="rotate(12)">
              <rect width="44" height="44" fill="none" />
              <rect x="4" y="4" width="36" height="36" rx="7" fill="#1B524B" opacity="0.45" />
            </pattern>
          </defs>
          <rect width="360" height="560" fill="url(#blocks)" />
          {/* green belt */}
          <path d="M-10 0 C 30 120, -20 260, 30 380 S 0 520, -10 560 Z" fill="#2A6A61" opacity="0.5" />
          <path d="M330 0 C 380 100, 340 220, 372 300 L 372 0 Z" fill="#2A6A61" opacity="0.35" />

          {/* road base */}
          <path d={ROUTE} fill="none" stroke="#0D302C" strokeWidth="22" strokeLinecap="round" />
          <motion.path
            ref={pathRef}
            d={ROUTE}
            fill="none"
            stroke="#FFF8ED"
            strokeOpacity="0.85"
            strokeWidth="3"
            strokeDasharray="2 10"
            strokeLinecap="round"
            initial={{ pathLength: reduce ? 1 : 0 }}
            animate={drawn ? { pathLength: 1 } : undefined}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />

          {/* stops */}
          {stops.map((s, i) => (
            <motion.g
              key={s.name}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={drawn ? { opacity: 1, scale: 1 } : undefined}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.4 + i * 0.3 }}
              style={{ transformOrigin: `${s.x}px ${s.y}px` }}
            >
              <circle cx={s.x} cy={s.y} r={s.home ? 15 : 10} fill={s.home ? "#F28B62" : "#F5C66A"} />
              <circle cx={s.x} cy={s.y} r={s.home ? 24 : 17} fill="none" stroke={s.home ? "#F28B62" : "#F5C66A"} strokeOpacity="0.35" strokeWidth="2" />
              <text
                x={"above" in s ? s.x - 6 : s.x + (s.x > 180 ? -30 : 30)}
                y={"above" in s ? s.y - 26 : s.y + 5}
                textAnchor={"above" in s ? "start" : s.x > 180 ? "end" : "start"}
                className="fill-cream text-[15px] font-bold"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                {s.name}
              </text>
              {s.home && (
                <text x={s.x + 30} y={s.y + 22} className="fill-gold text-[10px] font-bold uppercase tracking-[0.18em]" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Doggy Woggy
                </text>
              )}
            </motion.g>
          ))}

          {/* the pet cart */}
          <g transform={`translate(${pos.x} ${pos.y})`}>
            <g transform={`rotate(${flip ? pos.a + 180 : pos.a}) scale(${flip ? -1 : 1} 1) translate(-26 -30)`}>
              <ellipse cx="26" cy="40" rx="24" ry="4" fill="#000" opacity="0.25" />
              <rect x="2" y="8" width="44" height="26" rx="7" fill="#FFF8ED" />
              <path d="M38 8 h4 a6 6 0 0 1 6 6 v14 h-10 z" fill="#F28B62" />
              {/* vents */}
              <rect x="8" y="13" width="3" height="10" rx="1.5" fill="#123F3A" opacity="0.55" />
              <rect x="14" y="13" width="3" height="10" rx="1.5" fill="#123F3A" opacity="0.55" />
              <rect x="20" y="13" width="3" height="10" rx="1.5" fill="#123F3A" opacity="0.55" />
              {/* cctv */}
              <rect x="27" y="3" width="8" height="6" rx="2" fill="#123F3A" />
              <circle cx="35" cy="6" r="1.6" fill="#F28B62" />
              {/* paw */}
              <circle cx="31" cy="21" r="3.2" fill="#F5C66A" />
              <circle cx="27.5" cy="16.5" r="1.3" fill="#F5C66A" />
              <circle cx="31" cy="15.2" r="1.3" fill="#F5C66A" />
              <circle cx="34.5" cy="16.5" r="1.3" fill="#F5C66A" />
              <circle cx="12" cy="35" r="5" fill="#242D29" />
              <circle cx="12" cy="35" r="2" fill="#D8E8D6" />
              <circle cx="38" cy="35" r="5" fill="#242D29" />
              <circle cx="38" cy="35" r="2" fill="#D8E8D6" />
            </g>
          </g>
        </svg>

        <span className="absolute bottom-4 right-4 rounded-full bg-teal/80 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-sage/80 backdrop-blur">
          Illustrative map · not to scale
        </span>
      </div>

      {/* Photo inset */}
      <motion.div
        initial={{ opacity: 0, x: -30, rotate: -8 }}
        whileInView={{ opacity: 1, x: 0, rotate: -4 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease, delay: 0.5 }}
        className="absolute -left-3 bottom-[5%] w-[36%] overflow-hidden rounded-[1.5rem] border-[6px] border-cream shadow-lift sm:-left-8"
      >
        <div className="relative aspect-[3/4]">
          <Image src="/images/transport-car.jpg" alt="A happy dog enjoying a ride, ears in the breeze" fill sizes="220px" className="object-cover" />
          <StockNote className="absolute bottom-2 left-2" />
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute -right-4 -top-4 grid size-16 place-items-center rounded-full bg-coral text-teal-800 shadow-coral"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1, rotate: -12 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.4 }}
      >
        <Paw className="size-8" />
      </motion.div>
    </div>
  );
}
