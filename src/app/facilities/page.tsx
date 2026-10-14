import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { KICKZONE } from "@/config/kickzone";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Facilities | Kick-Zone Mirpur 12",
  description: "Explore Kick-Zone indoor turf facilities (illustrative demo content).",
};

export default function FacilitiesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <SectionHeading
        kicker="Facilities"
        title={<>EVERYTHING YOUR SQUAD NEEDS.</>}
        sub="Configurable demo facilities — unconfirmed details are illustrative. Call 01973-613818 to verify actual amenities."
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {KICKZONE.facilities.map((f) => (
          <article key={f.title} className="card-hover overflow-hidden rounded-2xl border border-[#2B3237] bg-[#111416]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={f.image} alt={`${f.title} (illustrative stock photo)`} loading="lazy" className="h-48 w-full object-cover" />
            <div className="p-5">
              <h2 className="font-bold text-white">{f.title}</h2>
              <p className="mt-1 text-sm text-[#A5ADB4]">{f.description}</p>
              <span className="mt-3 inline-block rounded-full bg-[#171B1E] px-3 py-1 text-[11px] font-bold text-[#A5ADB4]">
                Demo content — illustrative
              </span>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-8 rounded-2xl border border-[#39FF14]/30 bg-[#111416] p-6 text-center">
        <p className="font-sport text-xl font-black">MATCH DURATION: 1 HOUR 30 MINUTES</p>
        <p className="mt-1 text-sm text-[#A5ADB4]">All sessions are fixed 90-minute slots at {KICKZONE.sessionPriceLabel} (illustrative).</p>
        <Link href="/book" className="btn-neon mt-4 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm">
          Book Your Slot <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
