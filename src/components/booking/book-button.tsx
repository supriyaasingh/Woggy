"use client";

import type { ReactNode } from "react";
import type { ServiceOption } from "@/lib/site";
import { Button } from "@/components/ui/primitives";
import { useBooking } from "./booking-context";

export function BookButton({
  children = "Book an Appointment",
  service,
  variant = "coral",
  arrow = true,
  className,
}: {
  children?: ReactNode;
  service?: ServiceOption;
  variant?: "coral" | "teal" | "ghost" | "cream" | "outline-light";
  arrow?: boolean;
  className?: string;
}) {
  const { open } = useBooking();
  return (
    <Button variant={variant} arrow={arrow} className={className} onClick={() => open(service)} aria-haspopup="dialog">
      {children}
    </Button>
  );
}
