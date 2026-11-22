"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { CalendarHeart, MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/site";
import { useBooking } from "@/components/booking/booking-context";

/**
 * Floating quick-contact button. Opens WhatsApp when a verified number is configured,
 * otherwise opens the booking enquiry form.
 */
export function QuickContact() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  const { open } = useBooking();
  useMotionValueEvent(scrollY, "change", (v) => setShow(v > 500));
  const wa = whatsappUrl("Hello Doggy Woggy! I have a question about my pet.");

  const cls =
    "fixed bottom-5 right-4 z-40 flex min-h-14 items-center gap-2 rounded-full pl-4 pr-5 font-semibold shadow-lift sm:bottom-7 sm:right-7";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
        >
          {wa ? (
            <a href={wa} target="_blank" rel="noopener noreferrer" className={`${cls} bg-[#1f9d55] text-white`}>
              <MessageCircle className="size-5" /> <span>WhatsApp us</span>
            </a>
          ) : (
            <button onClick={() => open()} className={`${cls} cursor-pointer bg-teal text-cream ring-4 ring-cream/60`} aria-haspopup="dialog">
              <span className="relative grid size-8 place-items-center rounded-full bg-coral text-teal-800">
                <CalendarHeart className="size-4" />
                <span className="absolute inset-0 animate-ping rounded-full bg-coral/50 [animation-iteration-count:3]" />
              </span>
              <span>Book a visit</span>
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
