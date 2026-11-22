"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { Paw } from "@/components/ui/primitives";

const messages = [
  "Everything your furry family needs, all under one roof.",
  "Vet care · Grooming & spa · Pet store — in Bhandup West",
  "Pet pickup & drop for grooming across Bhandup, Mulund, Nahur & Kanjurmarg",
];

export function AnnouncementBar() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % messages.length), 4800);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <div className="relative z-50 overflow-hidden bg-teal-800 text-cream">
      <div className="mx-auto flex h-10 max-w-[1240px] items-center justify-center gap-2.5 px-4 text-[0.8rem] font-medium sm:text-sm">
        <Paw className="size-3.5 shrink-0 text-gold" />
        <div className="relative h-5 min-w-0 flex-1 overflow-hidden text-center sm:flex-none sm:min-w-[34rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={i}
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 truncate"
            >
              {messages[i]}
            </motion.p>
          </AnimatePresence>
        </div>
        <Sparkles className="hidden size-3.5 shrink-0 text-gold sm:block" />
      </div>
    </div>
  );
}
