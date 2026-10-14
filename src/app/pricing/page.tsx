import type { Metadata } from "next";
import Link from "next/link";
import { Check, Clock, Phone, TriangleAlert } from "lucide-react";
import { KICKZONE } from "@/config/kickzone";
import { formatBDT } from "@/lib/booking/pricing";

export const metadata: Metadata = {
  title: "Pricing | Kick-Zone Mirpur 12",
  description: "Fixed 90-minute football turf session pricing (illustrative demo price).",
};

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#39FF14]">Pricing</p>
      <h1 className="font-sport mt-2 text-center text-3xl font-black sm:text-4xl">ONE SESSION. ONE PRICE.</h1>
      <p className="mt-2 text-center text-[#A5ADB4]">
        Fixed duration — no duration selector. Every booking is exactly 90 minutes.
      </p>

      <div className="mx-auto mt-8 max-w-md rounded-3xl border border-[#39FF14]/40 bg-[#111416] p-8 text-center shadow-[0_0_50px_rgba(57,255,20,0.12)]">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#39FF14]">Football turf session</p>
        <p className="font-sport mt-3 text-5xl font-black text-white">
          {formatBDT(KICKZONE.sessionPriceBDT)}
        </p>
        <p className="mt-1 flex items-center justify-center gap-2 text-sm text-[#A5ADB4]">
          <Clock size={15} /> Match Duration: 1 Hour 30 Minutes
        </p>
        <ul className="mt-5 space-y-2 text-left text-sm">
          {[
            "Full indoor turf access for your squad",
            "Fixed 90-minute slot with auto end-time",
            "Evening floodlit slots (illustrative hours 8 AM – 11 PM)",
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
          Illustrative demo price of {formatBDT(KICKZONE.sessionPriceBDT)} per 90-minute session. This is not
          confirmed as the real Kick-Zone price. {KICKZONE.hoursNote}
        </p>
      </div>
    </div>
  );
}
