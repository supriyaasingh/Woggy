"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { navLinks, site } from "@/lib/site";
import { cn, ease } from "@/lib/utils";
import { Logo, Paw } from "@/components/ui/primitives";
import { BookButton } from "@/components/booking/book-button";
import { useBooking } from "@/components/booking/booking-context";

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [hash, setHash] = useState("");
  const { open } = useBooking();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [pathname]);

  useEffect(() => setMenu(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = menu ? "hidden" : "";
  }, [menu]);

  const isActive = (href: string) => {
    if (href.includes("#")) return pathname === "/" && hash === href.slice(1);
    if (href === "/") return pathname === "/" && !hash;
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-40 px-3 pt-3 sm:px-5">
        <motion.nav
          aria-label="Main"
          animate={{
            backgroundColor: scrolled || menu ? "rgba(255,248,237,0.86)" : "rgba(255,248,237,0)",
            boxShadow: scrolled && !menu ? "0 10px 40px -18px rgba(18,63,58,0.35)" : "0 0 0 rgba(0,0,0,0)",
            maxWidth: scrolled ? 1180 : 1280,
          }}
          transition={{ duration: 0.45, ease }}
          className={cn(
            "mx-auto flex h-[4.25rem] items-center justify-between gap-4 rounded-full pl-3 pr-2 sm:pl-5",
            (scrolled || menu) && "backdrop-blur-xl ring-1 ring-teal/5",
          )}
        >
          <Link href="/" className="group shrink-0" aria-label="Doggy Woggy home" onClick={() => setHash("")}>
            <Logo />
          </Link>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((l) => {
              const active = isActive(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setHash(l.href.includes("#") ? l.href.slice(l.href.indexOf("#")) : "")}
                    className={cn(
                      "relative block rounded-full px-3.5 py-2 text-[0.9rem] font-semibold transition-colors xl:px-4",
                      active ? "text-teal" : "text-ink-soft hover:text-teal",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-0 rounded-full bg-sage"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{l.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <BookButton className="hidden sm:inline-flex !min-h-11 !px-5 !text-sm" arrow={false}>
              Book an Appointment
            </BookButton>
            <button
              onClick={() => setMenu((m) => !m)}
              aria-expanded={menu}
              aria-controls="mobile-menu"
              aria-label={menu ? "Close menu" : "Open menu"}
              className="relative grid size-12 cursor-pointer place-items-center rounded-full bg-teal text-cream lg:hidden"
            >
              <span className="relative block h-3.5 w-5">
                <motion.span
                  className="absolute left-0 top-0 h-0.5 w-full rounded bg-current"
                  animate={menu ? { top: "50%", rotate: 45, y: "-50%" } : { top: 0, rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease }}
                />
                <motion.span
                  className="absolute left-0 top-1/2 h-0.5 w-3/5 -translate-y-1/2 rounded bg-current"
                  animate={{ opacity: menu ? 0 : 1, x: menu ? 8 : 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5 w-full rounded bg-current"
                  animate={menu ? { bottom: "50%", rotate: -45, y: "50%" } : { bottom: 0, rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease }}
                />
              </span>
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menu && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-30 overflow-y-auto bg-cream pt-28 lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 4.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 4.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 4.5rem)" }}
            transition={{ duration: 0.6, ease }}
          >
            <Paw className="pointer-events-none absolute -bottom-16 -right-12 size-72 rotate-[-18deg] text-sage" />
            <motion.ul
              className="relative px-6"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.18 } } }}
            >
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
                  className="border-b border-teal/10"
                >
                  <Link
                    href={l.href}
                    onClick={() => {
                      setMenu(false);
                      setHash(l.href.includes("#") ? l.href.slice(l.href.indexOf("#")) : "");
                    }}
                    className="group flex items-center justify-between py-4"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="text-xs font-bold text-coral-700">0{i + 1}</span>
                      <span className={cn("font-display text-[2rem] leading-none", isActive(l.href) ? "text-coral-700" : "text-teal")}>
                        {l.label}
                      </span>
                    </span>
                    <ArrowUpRight className="size-5 text-teal/40 transition group-hover:text-teal" />
                  </Link>
                </motion.li>
              ))}
              <motion.li
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
                className="pb-10 pt-8"
              >
                <button
                  onClick={() => {
                    setMenu(false);
                    setTimeout(() => open(), 250);
                  }}
                  className="flex min-h-14 w-full cursor-pointer items-center justify-center rounded-full bg-coral text-lg font-semibold text-teal-800 shadow-coral"
                >
                  Book an Appointment
                </button>
                <p className="mt-6 flex items-start gap-2 text-sm text-ink-soft">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-coral-700" />
                  {site.locations.map((l) => `${l.place}`).join(" · ")} — Bhandup West, Mumbai
                </p>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
