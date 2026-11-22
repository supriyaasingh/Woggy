"use client";

import Link from "next/link";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn, ease } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

/* ───────────────────────── Paw print mark ───────────────────────── */
export function Paw({ className, ...props }: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden className={className} {...props}>
      <ellipse cx="32" cy="43" rx="14" ry="12" />
      <ellipse cx="14" cy="27" rx="6.5" ry="8.5" transform="rotate(-18 14 27)" />
      <ellipse cx="25" cy="15" rx="6.5" ry="9" transform="rotate(-6 25 15)" />
      <ellipse cx="39" cy="15" rx="6.5" ry="9" transform="rotate(6 39 15)" />
      <ellipse cx="50" cy="27" rx="6.5" ry="8.5" transform="rotate(18 50 27)" />
    </svg>
  );
}

/* ───────────────────────── Logo ───────────────────────── */
export function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "relative grid size-10 place-items-center rounded-[14px] rotate-[-6deg] transition-transform duration-500 group-hover:rotate-[6deg]",
          light ? "bg-cream text-teal" : "bg-teal text-cream",
        )}
      >
        <Paw className="size-6" />
        <span className="absolute -right-1 -top-1 size-3 rounded-full bg-coral ring-2 ring-cream" />
      </span>
      <span className="leading-none">
        <span
          className={cn(
            "font-display block text-[1.35rem] font-semibold tracking-tight",
            light ? "text-cream" : "text-teal",
          )}
        >
          Doggy<span className="text-coral">·</span>Woggy
        </span>
        <span
          className={cn(
            "mt-1 block text-[0.6rem] font-semibold uppercase tracking-[0.28em]",
            light ? "text-sage/70" : "text-teal/55",
          )}
        >
          Vet · Spa · Store
        </span>
      </span>
    </span>
  );
}

/* ───────────────────────── Buttons ───────────────────────── */
type Variant = "coral" | "teal" | "ghost" | "cream" | "outline-light";
const variants: Record<Variant, string> = {
  coral:
    "bg-coral text-teal-800 shadow-coral hover:bg-[#f49a75] focus-visible:outline-teal",
  teal: "bg-teal text-cream hover:bg-teal-700",
  ghost: "bg-transparent text-teal ring-1 ring-inset ring-teal/20 hover:ring-teal/50 hover:bg-teal/5",
  cream: "bg-cream text-teal hover:bg-white",
  "outline-light": "bg-transparent text-cream ring-1 ring-inset ring-cream/30 hover:bg-cream/10 hover:ring-cream/60",
};

const base =
  "group/btn relative inline-flex min-h-12 select-none items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-[0.95rem] font-semibold tracking-tight transition-[background-color,box-shadow,color] duration-300 cursor-pointer";

function BtnInner({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      <span className="relative z-10">{children}</span>
      {arrow && (
        <span className="relative z-10 grid size-6 place-items-center overflow-hidden rounded-full bg-current/10">
          <ArrowRight className="size-4 transition-transform duration-300 ease-out group-hover/btn:translate-x-[140%]" />
          <ArrowRight className="absolute size-4 -translate-x-[140%] transition-transform duration-300 ease-out group-hover/btn:translate-x-0" />
        </span>
      )}
    </>
  );
}

export function Button({
  variant = "coral",
  arrow,
  className,
  children,
  ...props
}: HTMLMotionProps<"button"> & { variant?: Variant; arrow?: boolean; children: ReactNode }) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(base, variants[variant], className)}
      {...props}
    >
      <BtnInner arrow={arrow}>{children}</BtnInner>
    </motion.button>
  );
}

const MotionLink = motion.create(Link);

export function LinkButton({
  href,
  variant = "coral",
  arrow,
  className,
  children,
  external,
}: {
  href: string;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <MotionLink
      href={href}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(base, variants[variant], className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <BtnInner arrow={arrow}>{children}</BtnInner>
    </MotionLink>
  );
}

/* ───────────────────────── Reveal on scroll ───────────────────────── */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section" | "article";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </Comp>
  );
}

/** Stagger container + item variants */
export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

/* ───────────────────────── Section heading ───────────────────────── */
export function Eyebrow({ children, className, light }: { children: ReactNode; className?: string; light?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.24em]",
        light ? "text-gold" : "text-coral-700",
        className,
      )}
    >
      <Paw className="size-3.5" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  light,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  light?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <Reveal>
        <Eyebrow light={light}>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.06}>
        <h2
          className={cn(
            "font-display mt-4 text-[2.35rem] leading-[1.04] font-medium sm:text-5xl lg:text-[3.6rem]",
            light ? "text-cream" : "text-teal",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "mt-5 text-[1.05rem] leading-relaxed sm:text-lg",
              light ? "text-sage/85" : "text-ink-soft",
              align === "center" && "mx-auto max-w-2xl",
            )}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* Hand-drawn underline that draws itself in */
export function Squiggle({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 300 24" fill="none" preserveAspectRatio="none" aria-hidden className={className}>
      <motion.path
        d="M3 15C40 6 70 4 104 11s58 9 92 2 66-8 101 1"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        initial={{ pathLength: reduce ? 1 : 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease, delay: 0.5 }}
      />
    </svg>
  );
}

/** Wraps a word with an animated squiggle underline. */
export function Underlined({ children, color = "text-coral" }: { children: ReactNode; color?: string }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span className="relative z-10">{children}</span>
      <Squiggle className={cn("absolute -bottom-1.5 left-0 h-3 w-full sm:-bottom-2 sm:h-4", color)} />
    </span>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

/** A small "Illustrative image" note so stock photos are never passed off as the business's own. */
export function StockNote({ className, light }: { className?: string; light?: boolean }) {
  return (
    <span
      className={cn(
        "pointer-events-none rounded-full px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-wider backdrop-blur",
        light ? "bg-teal/50 text-cream/90" : "bg-cream/70 text-teal/70",
        className,
      )}
    >
      Illustrative photo
    </span>
  );
}
