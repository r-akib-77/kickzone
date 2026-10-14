"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  ClipboardCheck,
  PartyPopper,
  Phone,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Home,
  TriangleAlert,
} from "lucide-react";
import { KICKZONE } from "@/config/kickzone";
import {
  generateSlotsForDate,
  getDhakaTodayISO,
  toISODate,
  parseISODate,
  weekdayLong,
  dateDisplayLong,
} from "@/lib/booking/availability";
import { getSessionPrice, formatBDT } from "@/lib/booking/pricing";
import { validateCustomer, type ValidationErrors } from "@/lib/booking/validation";
import { generateDemoReference } from "@/lib/booking/demo-reference";
import type { BookingSlot, CustomerDetails, BookingStep } from "@/types/booking";

const EMPTY_CUSTOMER: CustomerDetails = {
  fullName: "",
  phone: "",
  email: "",
  teamName: "",
  playerCount: "",
  notes: "",
};

function Stepper({ step }: { step: BookingStep }) {
  const steps = [
    { n: 1, icon: CalendarIcon, label: "Date" },
    { n: 2, icon: Clock, label: "Slot" },
    { n: 3, icon: User, label: "Details" },
    { n: 4, icon: ClipboardCheck, label: "Review" },
    { n: 5, icon: PartyPopper, label: "Done" },
  ];
  return (
    <ol className="flex items-center justify-center gap-1 sm:gap-2" aria-label="Booking progress">
      {steps.map((s) => {
        const active = step === s.n;
        const done = step > s.n;
        return (
          <li key={s.n} className="flex items-center">
            <div
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-bold sm:px-3.5 sm:py-2 ${
                active
                  ? "bg-[#39FF14] text-black"
                  : done
                    ? "bg-[#159B12]/25 text-[#39FF14]"
                    : "bg-[#171B1E] text-[#A5ADB4]"
              }`}
              aria-current={active ? "step" : undefined}
            >
              <s.icon size={14} />
              <span className="hidden sm:inline">{s.label}</span>
              <span className="sm:hidden">{s.n}</span>
            </div>
            {s.n < 5 && <span className="mx-1 h-px w-3 bg-[#2B3237] sm:w-6" />}
          </li>
        );
      })}
    </ol>
  );
}

function Calendar({
  selectedISO,
  onSelect,
}: {
  selectedISO: string;
  onSelect: (iso: string) => void;
}) {
  const todayISO = getDhakaTodayISO();
  const [viewY, setViewY] = useState(() => parseISODate(selectedISO).y);
  const [viewM0, setViewM0] = useState(() => parseISODate(selectedISO).m0);

  const cells = useMemo(() => {
    const first = new Date(viewY, viewM0, 1);
    const startDay = first.getDay(); // 0 Sun
    const daysInMonth = new Date(viewY, viewM0 + 1, 0).getDate();
    const arr: (number | null)[] = [];
    for (let i = 0; i < startDay; i++) arr.push(null);
    for (let d = 1; d <= daysInMonth; d++) arr.push(d);
    return arr;
  }, [viewY, viewM0]);

  const monthLabel = new Date(viewY, viewM0, 1).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  function prev() {
    const d = new Date(viewY, viewM0 - 1, 1);
    setViewY(d.getFullYear());
    setViewM0(d.getMonth());
  }
  function next() {
    const d = new Date(viewY, viewM0 + 1, 1);
    setViewY(d.getFullYear());
    setViewM0(d.getMonth());
  }

  return (
    <div className="rounded-2xl border border-[#2B3237] bg-[#111416] p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <button onClick={prev} aria-label="Previous month" className="rounded-lg p-2 hover:bg-[#171B1E]">
          <ChevronLeft size={20} />
        </button>
        <p className="font-bold" aria-live="polite">{monthLabel}</p>
        <button onClick={next} aria-label="Next month" className="rounded-lg p-2 hover:bg-[#171B1E]">
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs font-bold text-[#A5ADB4]">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i} className="py-1">{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (d === null) return <span key={`e-${i}`} />;
          const iso = toISODate(viewY, viewM0, d);
          const isPast = iso < todayISO;
          const isToday = iso === todayISO;
          const isSel = iso === selectedISO;
          return (
            <button
              key={iso}
              disabled={isPast}
              onClick={() => onSelect(iso)}
              aria-label={`${d} ${monthLabel}${isSel ? ", selected" : ""}`}
              aria-pressed={isSel}
              className={`aspect-square rounded-lg text-sm font-bold transition-colors ${
                isSel
                  ? "bg-[#39FF14] text-black"
                  : isPast
                    ? "cursor-not-allowed text-[#2B3237]"
                    : isToday
                      ? "border border-[#39FF14] text-[#39FF14] hover:bg-[#39FF14]/10"
                      : "text-white hover:bg-[#171B1E]"
              }`}
            >
              {d}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-[#A5ADB4]">
        Today (Asia/Dhaka) is highlighted. Past dates are disabled. All times shown in Asia/Dhaka.
      </p>
    </div>
  );
}

export default function BookingFlow() {
  const [step, setStep] = useState<BookingStep>(1);
  const [dateISO, setDateISO] = useState<string>(() => getDhakaTodayISO());
  const [slot, setSlot] = useState<BookingSlot | null>(null);
  const [customer, setCustomer] = useState<CustomerDetails>(EMPTY_CUSTOMER);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [triedNext, setTriedNext] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [reference, setReference] = useState("");

  const slots = useMemo(() => generateSlotsForDate(dateISO), [dateISO]);
  const availableCount = slots.filter((s) => s.status === "available").length;

  // Recalculate availability when date changes; clear slot selection
  useEffect(() => {
    setSlot(null);
  }, [dateISO]);

  const price = getSessionPrice();

  function canGoStep2() {
    return !!dateISO;
  }
  function canGoStep3() {
    return !!slot && slot.status === "available";
  }

  function handleDetailsNext() {
    const e = validateCustomer(customer);
    setErrors(e);
    setTriedNext(true);
    if (Object.keys(e).length === 0) setStep(4);
  }

  function handleConfirm() {
    const e = validateCustomer(customer);
    if (Object.keys(e).length > 0) {
      setErrors(e);
      setStep(3);
      return;
    }
    if (!slot || !dateISO) return;
    setConfirming(true);
    // Simulated loading, no network request
    setTimeout(() => {
      setReference(generateDemoReference());
      setConfirming(false);
      setStep(5);
    }, 1200);
  }

  function resetAll() {
    // Clear in-memory state only (no persistent storage used anywhere)
    setStep(1);
    setDateISO(getDhakaTodayISO());
    setSlot(null);
    setCustomer(EMPTY_CUSTOMER);
    setErrors({});
    setTriedNext(false);
    setReference("");
    setConfirming(false);
  }

  return (
    <div>
      <Stepper step={step} />

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <h2 className="font-sport text-xl font-black">STEP 1 — SELECT DATE</h2>
                <p className="mt-1 text-sm text-[#A5ADB4]">Choose your match day. Availability recalculates per date (demo data).</p>
                <div className="mt-4">
                  <Calendar selectedISO={dateISO} onSelect={setDateISO} />
                </div>
                <button
                  disabled={!canGoStep2()}
                  onClick={() => setStep(2)}
                  className="btn-neon mt-4 flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm disabled:opacity-40 sm:w-auto"
                >
                  Continue to slots <ArrowRight size={16} />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <h2 className="font-sport text-xl font-black">STEP 2 — CHOOSE A 90-MIN SLOT</h2>
                <p className="mt-1 text-sm text-[#A5ADB4]">
                  {dateDisplayLong(dateISO)} · {weekdayLong(dateISO)} · Match Duration: 1 Hour 30 Minutes ·{" "}
                  {availableCount} available (demo)
                </p>
                <p className="mt-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
                  Demo availability only — not live or connected to the actual turf schedule.
                </p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label="Time slots">
                  {slots.map((s) => {
                    const disabled = s.status !== "available";
                    const selected = slot?.start === s.start;
                    return (
                      <button
                        key={s.start}
                        role="radio"
                        aria-checked={selected}
                        disabled={disabled}
                        onClick={() => setSlot(s)}
                        className={`rounded-xl border p-3 text-left transition-all ${
                          selected
                            ? "border-[#39FF14] bg-[#39FF14]/10 shadow-[0_0_18px_rgba(57,255,20,0.25)]"
                            : disabled
                              ? "cursor-not-allowed border-[#2B3237] bg-[#111416] opacity-50"
                              : "border-[#2B3237] bg-[#111416] hover:border-[#39FF14]/60"
                        }`}
                      >
                        <span className="flex items-center justify-between">
                          <span className={`text-sm font-black ${selected ? "text-[#39FF14]" : "text-white"}`}>
                            {s.startDisplay} – {s.endDisplay}
                          </span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                              s.status === "available"
                                ? "bg-[#39FF14] text-black"
                                : "bg-[#2B3237] text-[#A5ADB4]"
                            }`}
                          >
                            {s.status === "available" ? "Available" : s.status === "past" ? "Past" : "Booked"}
                          </span>
                        </span>
                        <span className="mt-1 block text-xs text-[#A5ADB4]">90 min · ends {s.endDisplay}</span>
                      </button>
                    );
                  })}
                </div>
                {slots.length === 0 && (
                  <p className="mt-4 rounded-xl border border-[#2B3237] bg-[#111416] p-4 text-sm text-[#A5ADB4]">
                    No slots fit within closing time for this configuration.
                  </p>
                )}
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <button onClick={() => setStep(1)} className="flex items-center justify-center gap-2 rounded-full border border-[#2B3237] px-6 py-3 text-sm font-bold hover:border-white">
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button
                    disabled={!canGoStep3()}
                    onClick={() => setStep(3)}
                    className="btn-neon flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm disabled:opacity-40"
                  >
                    Continue to details <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <h2 className="font-sport text-xl font-black">STEP 3 — YOUR DETAILS</h2>
                <p className="mt-1 text-sm text-[#A5ADB4]">
                  Validated in your browser only. Nothing is sent or stored anywhere.
                </p>
                <div className="mt-4 rounded-2xl border border-[#2B3237] bg-[#111416] p-4 sm:p-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-sm font-bold">Full name *</span>
                      <input
                        value={customer.fullName}
                        onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                        placeholder="e.g. Tanvir Ahmed"
                        autoComplete="name"
                        className="mt-1 w-full rounded-xl border border-[#2B3237] bg-[#171B1E] px-4 py-3 text-sm text-white placeholder:text-[#5b656d] focus:border-[#39FF14]"
                      />
                      {errors.fullName && <span className="mt-1 block text-xs text-red-400">{errors.fullName}</span>}
                    </label>
                    <label className="block">
                      <span className="text-sm font-bold">Phone *</span>
                      <input
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                        placeholder="01XXXXXXXXX"
                        inputMode="tel"
                        autoComplete="tel"
                        className="mt-1 w-full rounded-xl border border-[#2B3237] bg-[#171B1E] px-4 py-3 text-sm text-white placeholder:text-[#5b656d] focus:border-[#39FF14]"
                      />
                      {errors.phone && <span className="mt-1 block text-xs text-red-400">{errors.phone}</span>}
                    </label>
                    <label className="block">
                      <span className="text-sm font-bold">Email (optional)</span>
                      <input
                        value={customer.email}
                        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                        placeholder="you@example.com"
                        inputMode="email"
                        autoComplete="email"
                        className="mt-1 w-full rounded-xl border border-[#2B3237] bg-[#171B1E] px-4 py-3 text-sm text-white placeholder:text-[#5b656d] focus:border-[#39FF14]"
                      />
                      {errors.email && <span className="mt-1 block text-xs text-red-400">{errors.email}</span>}
                    </label>
                    <label className="block">
                      <span className="text-sm font-bold">Team name (optional)</span>
                      <input
                        value={customer.teamName}
                        onChange={(e) => setCustomer({ ...customer, teamName: e.target.value })}
                        placeholder="e.g. Mirpur Strikers"
                        className="mt-1 w-full rounded-xl border border-[#2B3237] bg-[#171B1E] px-4 py-3 text-sm text-white placeholder:text-[#5b656d] focus:border-[#39FF14]"
                      />
                      {errors.teamName && <span className="mt-1 block text-xs text-red-400">{errors.teamName}</span>}
                    </label>
                    <label className="block">
                      <span className="text-sm font-bold">Players (optional)</span>
                      <input
                        value={customer.playerCount}
                        onChange={(e) => setCustomer({ ...customer, playerCount: e.target.value })}
                        placeholder="e.g. 10"
                        inputMode="numeric"
                        className="mt-1 w-full rounded-xl border border-[#2B3237] bg-[#171B1E] px-4 py-3 text-sm text-white placeholder:text-[#5b656d] focus:border-[#39FF14]"
                      />
                      {errors.playerCount && <span className="mt-1 block text-xs text-red-400">{errors.playerCount}</span>}
                    </label>
                    <label className="block">
                      <span className="text-sm font-bold">Notes (optional)</span>
                      <input
                        value={customer.notes}
                        onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                        placeholder="Anything we should know?"
                        className="mt-1 w-full rounded-xl border border-[#2B3237] bg-[#171B1E] px-4 py-3 text-sm text-white placeholder:text-[#5b656d] focus:border-[#39FF14]"
                      />
                      {errors.notes && <span className="mt-1 block text-xs text-red-400">{errors.notes}</span>}
                    </label>
                  </div>
                  {triedNext && Object.keys(errors).length > 0 && (
                    <p className="mt-3 text-xs text-red-400">Please fix the highlighted fields.</p>
                  )}
                </div>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <button onClick={() => setStep(2)} className="flex items-center justify-center gap-2 rounded-full border border-[#2B3237] px-6 py-3 text-sm font-bold hover:border-white">
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button onClick={handleDetailsNext} className="btn-neon flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm">
                    Review booking <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="s4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <h2 className="font-sport text-xl font-black">STEP 4 — REVIEW</h2>
                <p className="mt-1 text-sm text-[#A5ADB4]">Check everything before confirming your demo booking.</p>
                <div className="mt-4 rounded-2xl border border-[#2B3237] bg-[#111416] p-5">
                  <dl className="grid gap-3 text-sm sm:grid-cols-2">
                    <div><dt className="text-[#A5ADB4]">Date</dt><dd className="font-bold">{slot ? dateDisplayLong(dateISO) : "—"}</dd></div>
                    <div><dt className="text-[#A5ADB4]">Weekday</dt><dd className="font-bold">{weekdayLong(dateISO)}</dd></div>
                    <div><dt className="text-[#A5ADB4]">Start</dt><dd className="font-bold text-[#39FF14]">{slot?.startDisplay}</dd></div>
                    <div><dt className="text-[#A5ADB4]">End</dt><dd className="font-bold text-[#39FF14]">{slot?.endDisplay}</dd></div>
                    <div><dt className="text-[#A5ADB4]">Duration</dt><dd className="font-bold">1 hour 30 minutes (fixed)</dd></div>
                    <div><dt className="text-[#A5ADB4]">Price</dt><dd className="font-bold">{formatBDT(price)} <span className="font-normal text-[#A5ADB4]">illustrative</span></dd></div>
                    <div><dt className="text-[#A5ADB4]">Name</dt><dd className="font-bold">{customer.fullName || "—"}</dd></div>
                    <div><dt className="text-[#A5ADB4]">Phone</dt><dd className="font-bold">{customer.phone || "—"}</dd></div>
                    {customer.email && <div><dt className="text-[#A5ADB4]">Email</dt><dd className="font-bold">{customer.email}</dd></div>}
                    {customer.teamName && <div><dt className="text-[#A5ADB4]">Team</dt><dd className="font-bold">{customer.teamName}</dd></div>}
                    {customer.playerCount && <div><dt className="text-[#A5ADB4]">Players</dt><dd className="font-bold">{customer.playerCount}</dd></div>}
                    {customer.notes && <div className="sm:col-span-2"><dt className="text-[#A5ADB4]">Notes</dt><dd className="font-bold">{customer.notes}</dd></div>}
                  </dl>
                </div>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <button onClick={() => setStep(3)} className="flex items-center justify-center gap-2 rounded-full border border-[#2B3237] px-6 py-3 text-sm font-bold hover:border-white">
                    <ArrowLeft size={16} /> Edit details
                  </button>
                  <button
                    onClick={handleConfirm}
                    disabled={confirming}
                    className="btn-neon flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm disabled:opacity-60"
                  >
                    {confirming ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                        Confirming demo…
                      </>
                    ) : (
                      <>Confirm demo booking</>
                    )}
                  </button>
                </div>
                <p className="mt-2 text-xs text-[#A5ADB4]">No request is sent. No data leaves your browser.</p>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div key="s5" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                <div className="mx-auto max-w-lg rounded-3xl border border-[#39FF14]/40 bg-[#111416] p-6 sm:p-8">
                  <PartyPopper size={36} className="mx-auto text-[#39FF14]" />
                  <h2 className="font-sport mt-3 text-2xl font-black sm:text-3xl">DEMO BOOKING CONFIRMED</h2>
                  <p className="mt-1 text-sm text-[#A5ADB4]">Reference <span className="font-mono font-bold text-white">{reference}</span></p>
                  <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-left">
                    <TriangleAlert size={18} className="mt-0.5 shrink-0 text-amber-300" />
                    <p className="text-xs font-bold leading-relaxed text-amber-200">
                      DEMO ONLY — Your slot has not been reserved. No booking has been sent to Kick-Zone. Contact 01973-613818 to confirm an actual booking.
                    </p>
                  </div>
                  <dl className="mt-4 grid gap-2 rounded-xl bg-[#171B1E] p-4 text-left text-sm">
                    <div className="flex justify-between"><dt className="text-[#A5ADB4]">Date</dt><dd className="font-bold">{dateDisplayLong(dateISO)} ({weekdayLong(dateISO)})</dd></div>
                    <div className="flex justify-between"><dt className="text-[#A5ADB4]">Time</dt><dd className="font-bold">{slot?.startDisplay} – {slot?.endDisplay}</dd></div>
                    <div className="flex justify-between"><dt className="text-[#A5ADB4]">Duration</dt><dd className="font-bold">1 hour 30 minutes</dd></div>
                    <div className="flex justify-between"><dt className="text-[#A5ADB4]">Price</dt><dd className="font-bold">{formatBDT(price)} (illustrative)</dd></div>
                    <div className="flex justify-between"><dt className="text-[#A5ADB4]">Name</dt><dd className="font-bold">{customer.fullName}</dd></div>
                    <div className="flex justify-between"><dt className="text-[#A5ADB4]">Phone</dt><dd className="font-bold">{customer.phone}</dd></div>
                  </dl>
                  <div className="mt-5 flex flex-col gap-2">
                    <button onClick={resetAll} className="btn-neon flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm">
                      <RotateCcw size={16} /> Start another demo booking
                    </button>
                    <div className="flex gap-2">
                      <Link href="/" className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#2B3237] px-4 py-3 text-sm font-bold hover:border-white">
                        <Home size={16} /> Home
                      </Link>
                      <a href={KICKZONE.phone.telHref} className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#2B3237] px-4 py-3 text-sm font-bold hover:border-[#39FF14] hover:text-[#39FF14]">
                        <Phone size={16} /> Call Kick-Zone
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Summary sidebar */}
        <aside className="h-fit rounded-2xl border border-[#2B3237] bg-[#111416] p-5 lg:sticky lg:top-20" aria-label="Booking summary">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#A5ADB4]">Booking summary</h3>
          <div className="mt-3 space-y-2 text-sm">
            <p><span className="text-[#A5ADB4]">Date: </span><span className="font-bold">{dateDisplayLong(dateISO)}</span></p>
            <p><span className="text-[#A5ADB4]">Slot: </span><span className="font-bold">{slot ? `${slot.startDisplay} – ${slot.endDisplay}` : "Not selected"}</span></p>
            <p><span className="text-[#A5ADB4]">Duration: </span><span className="font-bold">1 Hour 30 Minutes</span></p>
            <p><span className="text-[#A5ADB4]">Price: </span><span className="font-bold text-[#39FF14]">{formatBDT(price)}</span> <span className="text-xs text-[#A5ADB4]">illustrative</span></p>
          </div>
          <div className="mt-4 rounded-xl bg-[#171B1E] p-3 text-xs leading-relaxed text-[#A5ADB4]">
            Fixed {KICKZONE.bookingDurationMinutes}-minute sessions only. Hours {KICKZONE.openingTime}–{KICKZONE.closingTime} (illustrative). Availability is demo data.
          </div>
          <a href={KICKZONE.phone.telHref} className="mt-3 flex items-center justify-center gap-2 rounded-full border border-[#2B3237] px-4 py-2.5 text-sm font-bold hover:border-[#39FF14]">
            <Phone size={15} /> {KICKZONE.phone.display}
          </a>
        </aside>
      </div>
    </div>
  );
}
