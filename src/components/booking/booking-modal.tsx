"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Cat,
  Check,
  ClipboardCopy,
  Dog,
  Info,
  MessageCircle,
  X,
} from "lucide-react";
import { serviceOptions, site, whatsappUrl, type ServiceOption } from "@/lib/site";
import { cn, ease } from "@/lib/utils";
import { Paw } from "@/components/ui/primitives";

type Form = {
  petName: string;
  petType: "Dog" | "Cat" | "";
  service: ServiceOption | "";
  date: string;
  ownerName: string;
  phone: string;
  message: string;
};
type Errors = Partial<Record<keyof Form, string>>;

const empty: Form = { petName: "", petType: "", service: "", date: "", ownerName: "", phone: "", message: "" };
const steps = ["Your pet", "Visit", "Your details"] as const;

const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

function validate(step: number, f: Form): Errors {
  const e: Errors = {};
  if (step === 0) {
    if (!f.petName.trim()) e.petName = "Please tell us your pet's name.";
    if (!f.petType) e.petType = "Please choose dog or cat.";
  }
  if (step === 1) {
    if (!f.service) e.service = "Please pick the service you need.";
    if (!f.date) e.date = "Please choose a preferred date.";
    else if (f.date < todayISO()) e.date = "Please choose today or a future date.";
  }
  if (step === 2) {
    if (f.ownerName.trim().length < 2) e.ownerName = "Please enter your name.";
    const digits = f.phone.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "");
    if (!/^[6-9]\d{9}$/.test(digits)) e.phone = "Enter a valid 10-digit mobile number.";
  }
  return e;
}

function buildMessage(f: Form) {
  const date = f.date
    ? new Date(f.date + "T00:00").toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })
    : "";
  return [
    `Hello Doggy Woggy! 🐾 I'd like to book a visit.`,
    ``,
    `• Owner: ${f.ownerName.trim()}`,
    `• Phone: ${f.phone.trim()}`,
    `• Pet: ${f.petName.trim()} (${f.petType})`,
    `• Service: ${f.service}`,
    `• Preferred date: ${date}`,
    f.message.trim() ? `• Note: ${f.message.trim()}` : "",
  ]
    .filter((l, i, a) => !(l === "" && i === a.length - 1))
    .join("\n");
}

export function BookingModal({
  open,
  onClose,
  initialService,
}: {
  open: boolean;
  onClose: () => void;
  initialService?: ServiceOption;
}) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  // Reset + preselect service whenever the modal opens
  useEffect(() => {
    if (open) {
      setStep(0);
      setDone(false);
      setErrors({});
      setCopied(false);
      setForm((f) => ({ ...empty, petName: f.petName, petType: f.petType, service: initialService ?? "" }));
    }
  }, [open, initialService]);

  // Scroll lock, Escape to close, focus management
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const sbw = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    html.style.paddingRight = `${sbw}px`;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialogRef.current) {
        const els = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!els.length) return;
        const first = els[0], last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => dialogRef.current?.querySelector<HTMLElement>("input, button[data-autofocus]")?.focus(), 350);
    return () => {
      html.style.overflow = "";
      html.style.paddingRight = "";
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
      prev?.focus?.();
    };
  }, [open, onClose]);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const next = () => {
    const e = validate(step, form);
    setErrors(e);
    if (Object.keys(e).length) {
      const firstKey = Object.keys(e)[0];
      dialogRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }
    if (step < steps.length - 1) {
      setDir(1);
      setStep((s) => s + 1);
    } else {
      setDone(true);
      const url = whatsappUrl(buildMessage(form));
      if (url) window.open(url, "_blank", "noopener,noreferrer");
    }
  };
  const back = () => {
    setDir(-1);
    setStep((s) => Math.max(0, s - 1));
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(buildMessage(form));
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable — summary is visible on screen anyway */
    }
  };

  const slide = {
    enter: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * -40 }),
  };

  const waLink = whatsappUrl(buildMessage(form));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.button
            aria-label="Close booking"
            tabIndex={-1}
            className="absolute inset-0 cursor-default bg-teal-800/55 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: reduce ? 0 : 60, scale: reduce ? 1 : 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduce ? 0 : 40, scale: reduce ? 1 : 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="relative flex max-h-[94dvh] w-full max-w-[860px] flex-col overflow-hidden rounded-t-[2rem] bg-cream shadow-2xl sm:rounded-[2rem] md:grid md:grid-cols-[300px_1fr]"
          >
            {/* Side panel */}
            <aside className="relative hidden overflow-hidden bg-teal p-8 text-cream md:flex md:flex-col">
              <Paw className="absolute -bottom-10 -right-10 size-48 rotate-[-20deg] text-teal-700" />
              <Paw className="absolute top-24 -left-6 size-16 rotate-[25deg] text-teal-700/70" />
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">Book a visit</p>
              <p className="font-display mt-4 text-3xl leading-tight">Let&apos;s plan your pet&apos;s happy day.</p>
              <p className="mt-4 text-sm leading-relaxed text-sage/80">
                Share a few details and the Doggy Woggy team can confirm a time that suits you.
              </p>
              <ol className="relative mt-auto space-y-3 pt-10">
                {steps.map((s, i) => (
                  <li key={s} className="flex items-center gap-3 text-sm">
                    <span
                      className={cn(
                        "grid size-7 place-items-center rounded-full text-xs font-bold transition-colors duration-300",
                        i < step || done ? "bg-gold text-teal" : i === step ? "bg-coral text-teal-800" : "bg-teal-700 text-sage/60",
                      )}
                    >
                      {i < step || done ? <Check className="size-3.5" strokeWidth={3} /> : i + 1}
                    </span>
                    <span className={i === step && !done ? "font-semibold" : "text-sage/70"}>{s}</span>
                  </li>
                ))}
              </ol>
            </aside>

            {/* Main */}
            <div className="flex min-h-0 flex-col">
              <header className="flex items-start justify-between gap-4 px-6 pt-6 sm:px-8 sm:pt-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral-700">
                    {done ? "All set" : `Step ${step + 1} of ${steps.length}`}
                  </p>
                  <h2 id={titleId} className="font-display mt-1 text-2xl text-teal sm:text-[1.9rem]">
                    {done ? "Your enquiry is ready" : ["Who are we caring for?", "What does your pet need?", "How can we reach you?"][step]}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="grid size-11 shrink-0 place-items-center rounded-full bg-teal/5 text-teal transition hover:bg-teal/10 cursor-pointer"
                  aria-label="Close"
                >
                  <X className="size-5" />
                </button>
              </header>

              {/* progress */}
              <div className="mx-6 mt-5 h-1.5 overflow-hidden rounded-full bg-teal/10 sm:mx-8">
                <motion.div
                  className="h-full rounded-full bg-coral"
                  animate={{ width: done ? "100%" : `${((step + 1) / steps.length) * 100}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                />
              </div>

              <div className="relative min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-6 py-6 sm:px-8">
                <AnimatePresence mode="wait" custom={dir} initial={false}>
                  {done ? (
                    <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease }}>
                      <div className="flex items-center gap-4">
                        <motion.span
                          initial={{ scale: 0, rotate: -30 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                          className="grid size-14 shrink-0 place-items-center rounded-2xl bg-sage text-teal"
                        >
                          <Check className="size-7" strokeWidth={2.5} />
                        </motion.span>
                        <p className="text-ink-soft">
                          {waLink ? (
                            <>WhatsApp should have opened with your details. Just press <strong>send</strong> so the team receives it.</>
                          ) : (
                            <>Thanks, {form.ownerName.split(" ")[0] || "friend"}! Here&apos;s your enquiry summary for <strong>{form.petName}</strong>.</>
                          )}
                        </p>
                      </div>

                      {!waLink && (
                        <div className="mt-5 flex gap-3 rounded-2xl border border-gold/60 bg-gold-200/50 p-4 text-sm text-ink">
                          <Info className="mt-0.5 size-4 shrink-0 text-coral-700" />
                          <p>
                            <strong>Demo mode:</strong> this preview isn&apos;t connected to the clinic yet, so nothing has been sent.
                            Once the verified WhatsApp number is added to <code className="rounded bg-cream px-1">src/lib/site.ts</code>, this button will open WhatsApp with the message below already filled in.
                          </p>
                        </div>
                      )}

                      <pre className="mt-5 whitespace-pre-wrap rounded-2xl bg-white p-5 font-sans text-sm leading-relaxed text-ink shadow-soft ring-1 ring-teal/5">
                        {buildMessage(form)}
                      </pre>

                      <div className="mt-5 flex flex-wrap gap-3">
                        {waLink ? (
                          <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#1f9d55] px-6 font-semibold text-white transition hover:bg-[#188447]">
                            <MessageCircle className="size-4" /> Open WhatsApp again
                          </a>
                        ) : (
                          <button
                            onClick={copy}
                            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-teal px-6 font-semibold text-cream transition hover:bg-teal-700 cursor-pointer"
                          >
                            {copied ? <Check className="size-4" /> : <ClipboardCopy className="size-4" />}
                            {copied ? "Copied!" : "Copy summary"}
                          </button>
                        )}
                        <button onClick={onClose} className="inline-flex min-h-12 items-center rounded-full px-6 font-semibold text-teal ring-1 ring-teal/20 transition hover:bg-teal/5 cursor-pointer">
                          Done
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={step}
                      custom={dir}
                      variants={slide}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.32, ease }}
                      className="space-y-5"
                    >
                      {step === 0 && (
                        <>
                          <Field label="Pet's name" error={errors.petName} htmlFor="petName">
                            <input id="petName" name="petName" value={form.petName} onChange={(e) => set("petName", e.target.value)} placeholder="e.g. Bruno" autoComplete="off" className={inputCls(!!errors.petName)} aria-invalid={!!errors.petName} />
                          </Field>
                          <Field label="Your pet is a…" error={errors.petType}>
                            <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Pet type">
                              {(["Dog", "Cat"] as const).map((t) => {
                                const Icon = t === "Dog" ? Dog : Cat;
                                const active = form.petType === t;
                                return (
                                  <button
                                    key={t}
                                    type="button"
                                    name="petType"
                                    role="radio"
                                    aria-checked={active}
                                    onClick={() => set("petType", t)}
                                    className={cn(
                                      "relative flex min-h-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 bg-white font-semibold transition-colors",
                                      active ? "border-teal text-teal" : "border-transparent text-ink-soft ring-1 ring-teal/10 hover:ring-teal/30",
                                    )}
                                  >
                                    {active && (
                                      <motion.span layoutId="pet-check" className="absolute right-2.5 top-2.5 grid size-5 place-items-center rounded-full bg-teal text-cream">
                                        <Check className="size-3" strokeWidth={3} />
                                      </motion.span>
                                    )}
                                    <Icon className="size-8" strokeWidth={1.6} />
                                    {t}
                                  </button>
                                );
                              })}
                            </div>
                          </Field>
                        </>
                      )}

                      {step === 1 && (
                        <>
                          <Field label="Service required" error={errors.service}>
                            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Service required">
                              {serviceOptions.map((s) => {
                                const active = form.service === s;
                                return (
                                  <button
                                    key={s}
                                    type="button"
                                    name="service"
                                    role="radio"
                                    aria-checked={active}
                                    onClick={() => set("service", s)}
                                    className={cn(
                                      "min-h-11 cursor-pointer rounded-full px-4 text-sm font-semibold transition-colors",
                                      active ? "bg-teal text-cream" : "bg-white text-ink-soft ring-1 ring-teal/15 hover:ring-teal/40",
                                    )}
                                  >
                                    {s}
                                  </button>
                                );
                              })}
                            </div>
                          </Field>
                          <Field label="Preferred date" error={errors.date} htmlFor="date" hint="The team will confirm an available time with you.">
                            <input id="date" name="date" type="date" min={todayISO()} value={form.date} onChange={(e) => set("date", e.target.value)} className={inputCls(!!errors.date)} aria-invalid={!!errors.date} />
                          </Field>
                        </>
                      )}

                      {step === 2 && (
                        <>
                          <Field label="Your name" error={errors.ownerName} htmlFor="ownerName">
                            <input id="ownerName" name="ownerName" value={form.ownerName} onChange={(e) => set("ownerName", e.target.value)} autoComplete="name" placeholder="Full name" className={inputCls(!!errors.ownerName)} aria-invalid={!!errors.ownerName} />
                          </Field>
                          <Field label="Phone number" error={errors.phone} htmlFor="phone">
                            <div className="relative">
                              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-teal/60">+91</span>
                              <input id="phone" name="phone" type="tel" inputMode="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel-national" placeholder="10-digit mobile" className={cn(inputCls(!!errors.phone), "pl-14")} aria-invalid={!!errors.phone} />
                            </div>
                          </Field>
                          <Field label="Anything we should know?" htmlFor="message" optional>
                            <textarea id="message" name="message" rows={3} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Breed, age, symptoms, grooming preferences…" className={cn(inputCls(false), "resize-none py-3")} />
                          </Field>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {!done && (
                <footer className="flex items-center justify-between gap-3 border-t border-teal/10 px-6 py-4 sm:px-8">
                  <button
                    onClick={back}
                    disabled={step === 0}
                    className="inline-flex min-h-12 items-center gap-2 rounded-full px-4 font-semibold text-teal transition hover:bg-teal/5 disabled:invisible cursor-pointer"
                  >
                    <ArrowLeft className="size-4" /> Back
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={next}
                    data-autofocus
                    className="inline-flex min-h-12 items-center gap-2 rounded-full bg-coral px-7 font-semibold text-teal-800 shadow-coral transition-colors hover:bg-[#f49a75] cursor-pointer"
                  >
                    {step === steps.length - 1 ? (site.whatsapp ? "Send via WhatsApp" : "Prepare enquiry") : "Continue"}
                    <ArrowRight className="size-4" />
                  </motion.button>
                </footer>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const inputCls = (err: boolean) =>
  cn(
    "w-full min-h-12 rounded-2xl bg-white px-4 text-base text-ink placeholder:text-ink-soft/50 outline-none ring-1 transition focus:ring-2",
    err ? "ring-coral-600 focus:ring-coral-600" : "ring-teal/15 focus:ring-teal",
  );

function Field({
  label,
  error,
  htmlFor,
  hint,
  optional,
  children,
}: {
  label: string;
  error?: string;
  htmlFor?: string;
  hint?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 flex items-baseline justify-between text-sm font-semibold text-teal">
        {label}
        {optional && <span className="text-xs font-medium text-ink-soft/60">Optional</span>}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            role="alert"
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 text-sm font-medium text-coral-700"
          >
            {error}
          </motion.p>
        ) : hint ? (
          <p className="mt-2 text-xs text-ink-soft/70">{hint}</p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
