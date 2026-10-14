import type { Metadata } from "next";
import Link from "next/link";
import { Check, Clock, Phone, TriangleAlert, Sun, MoonStar } from "lucide-react";
import { KICKZONE } from "@/config/kickzone";
import { formatBDT } from "@/lib/booking/pricing";
import { getDailyTimetable } from "@/lib/booking/availability";

export const metadata: Metadata = {
  title: "Pricing & Slots | Kick-Zone Mirpur 12",
  description:
    "Official Kick-Zone slot chart — 14 fixed 90-minute slots, day ৳2,500, night ৳4,000.",
};

export default function PricingPage() {
  const timetable = getDailyTimetable();
  const daySlots = timetable.filter((t) => t.number <= 7);
  const nightSlots = timetable.filter((t) => t.number > 7);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#39FF14]">Pricing & Slots</p>
      <h1 className="font-sport mt-2 text-center text-3xl font-black sm:text-4xl">DAY & NIGHT RATES.</h1>
      <p className="mt-2 text-center text-[#A5ADB4]">
        14 fixed slots · every booking is exactly 90 minutes — no duration selector.
      </p>

      <div className="mx-auto mt-8 grid max-w-2xl gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-[#2B3237] bg-[#111416] p-8 text-center">
          <p className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#A5ADB4]">
            <Sun size={14} /> Day · Slots 1–7
          </p>
          <p className="font-sport mt-3 text-5xl font-black text-white">
            {formatBDT(KICKZONE.daySessionPriceBDT)}
          </p>
          <p className="mt-1 flex items-center justify-center gap-2 text-sm text-[#A5ADB4]">
            <Clock size={15} /> 6:00 AM – 5:00 PM
          </p>
        </div>
        <div className="rounded-3xl border border-[#39FF14]/40 bg-[#111416] p-8 text-center shadow-[0_0_50px_rgba(57,255,20,0.12)]">
          <p className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#39FF14]">
            <MoonStar size={14} /> Night · Slots 8–14
          </p>
          <p className="font-sport mt-3 text-5xl font-black text-white">
            {formatBDT(KICKZONE.nightSessionPriceBDT)}
          </p>
          <p className="mt-1 flex items-center justify-center gap-2 text-sm text-[#A5ADB4]">
            <Clock size={15} /> 5:00 PM – 3:30 AM
          </p>
        </div>
      </div>

      <h2 className="font-sport mt-10 text-center text-2xl font-black">OFFICIAL SLOT CHART.</h2>
      <div className="mx-auto mt-4 grid max-w-2xl gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#2B3237] bg-[#111416] p-4">
          <p className="flex items-center gap-2 px-2 pb-2 text-sm font-bold text-white">
            <Sun size={15} className="text-[#39FF14]" /> Day — {formatBDT(KICKZONE.daySessionPriceBDT)}
          </p>
          <ul className="space-y-1.5">
            {daySlots.map((s) => (
              <li
                key={s.number}
                className="flex items-center justify-between rounded-lg bg-[#171B1E] px-3 py-2 text-sm"
              >
                <span className="font-black text-[#39FF14]">#{s.number}</span>
                <span className="font-bold text-white">{s.startDisplay} – {s.endDisplay}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-[#39FF14]/30 bg-[#111416] p-4">
          <p className="flex items-center gap-2 px-2 pb-2 text-sm font-bold text-white">
            <MoonStar size={15} className="text-[#39FF14]" /> Night — {formatBDT(KICKZONE.nightSessionPriceBDT)}
          </p>
          <ul className="space-y-1.5">
            {nightSlots.map((s) => (
              <li
                key={s.number}
                className="flex items-center justify-between rounded-lg bg-[#171B1E] px-3 py-2 text-sm"
              >
                <span className="font-black text-[#39FF14]">#{s.number}</span>
                <span className="font-bold text-white">
                  {s.startDisplay} – {s.endDisplay}
                  {(s.startNextDay || s.endNextDay) && (
                    <span className="ml-1 text-[11px] font-normal text-[#A5ADB4]">+1d</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-[#A5ADB4]">
        Slots 12–14 run past midnight. Match Duration: 1 Hour 30 Minutes · per 90-minute session.
      </p>

      <div className="mx-auto mt-6 max-w-2xl overflow-hidden rounded-2xl border border-[#2B3237]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/slot-chart.jpg"
          alt="Kick-Zone official slot details chart — 14 slots, day 2,500 tk, night 4,000 tk"
          className="w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="mx-auto mt-4 max-w-2xl rounded-3xl border border-[#2B3237] bg-[#111416] p-6 text-center">
        <ul className="space-y-2 text-left text-sm">
          {[
            "Full indoor turf access for your squad",
            "Fixed 90-minute slot with auto end-time",
            "Open daily 6:00 AM – 3:30 AM (14 fixed slots)",
            "Demo booking — call to confirm real availability",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2">
              <Check size={16} className="mt-0.5 shrink-0 text-[#39FF14]" />
              <span className="text-[#A5ADB4]">{t}</span>
            </li>
          ))}
        </ul>
        <Link href="/book" className="btn-neon mt-6 block rounded-full px-6 py-3.5 text-sm">
          Book Your Slot
        </Link>
        <a
          href={KICKZONE.phone.telHref}
          className="mt-2 flex items-center justify-center gap-2 rounded-full border border-[#2B3237] px-6 py-3 text-sm font-bold hover:border-[#39FF14]"
        >
          <Phone size={15} /> {KICKZONE.phone.display}
        </a>
      </div>

      <div className="mt-6 flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
        <TriangleAlert size={18} className="mt-0.5 shrink-0 text-amber-300" />
        <p className="text-xs leading-relaxed text-amber-200">
          Official slot-chart prices: {formatBDT(KICKZONE.daySessionPriceBDT)} (day) and {formatBDT(KICKZONE.nightSessionPriceBDT)} (night) per 90-minute session. {KICKZONE.hoursNote}
        </p>
      </div>
    </div>
  );
}
