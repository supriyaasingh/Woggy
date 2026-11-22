import { Paw } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

const words = ["Healthy Pets", "Happy Pets", "Happy Parents"];

export function Marquee({ tilt = true, tone = "coral" }: { tilt?: boolean; tone?: "coral" | "teal" }) {
  const row = (hidden?: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {Array.from({ length: 4 }).flatMap((_, r) =>
        words.map((w, i) => (
          <span key={`${r}-${i}`} className="flex items-center">
            <span className="font-display px-6 text-3xl font-medium italic sm:px-9 sm:text-5xl">{w}</span>
            <Paw className={cn("size-6 sm:size-8", tone === "coral" ? "text-teal" : "text-coral")} />
          </span>
        )),
      )}
    </div>
  );
  return (
    <div className={cn("relative z-10 py-6", tilt && "-rotate-[1.5deg]")}>
      <div
        className={cn(
          "flex overflow-hidden py-5 sm:py-6",
          tone === "coral" ? "bg-coral text-teal-800" : "bg-teal text-cream",
        )}
        role="marquee"
        aria-label="Healthy pets, happy pets, happy parents"
      >
        <div className="flex animate-marquee motion-reduce:animate-none">
          {row()}
          {row(true)}
        </div>
      </div>
    </div>
  );
}
