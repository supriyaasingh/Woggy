"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import type { ServiceOption } from "@/lib/site";
import { BookingModal } from "./booking-modal";

type BookingCtx = { open: (service?: ServiceOption) => void; close: () => void };
const Ctx = createContext<BookingCtx | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [service, setService] = useState<ServiceOption | undefined>();

  const open = useCallback((s?: ServiceOption) => {
    setService(s);
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <Ctx.Provider value={{ open, close }}>
      {children}
      <BookingModal open={isOpen} onClose={close} initialService={service} />
    </Ctx.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}
