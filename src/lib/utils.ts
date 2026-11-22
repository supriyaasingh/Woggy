import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Shared easing + spring presets so every motion feels like one family. */
export const ease = [0.22, 1, 0.36, 1] as const;
export const spring = { type: "spring", stiffness: 260, damping: 30, mass: 0.9 } as const;
export const softSpring = { type: "spring", stiffness: 140, damping: 22 } as const;
