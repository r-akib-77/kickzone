"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  Clock,
  MapPin,
  Phone,
  Facebook,
  Instagram,
  ArrowRight,
  Zap,
  ShieldCheck,
  Trophy,
  Timer,
} from "lucide-react";
import { KICKZONE } from "@/config/kickzone";
import { formatBDT } from "@/lib/booking/pricing";
import { SectionHeading } from "@/components/ui/SectionHeading";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
} as const;

export function QuickBookingWidget() {
  return (
    <div className="mx-auto -mt-10 max-w-4xl px-4 sm:px-6">
      <div className="relative z-10 rounded-2xl border border-[#3A444B] bg-[#111416] p-4 shadow-2xl sm:p-5">
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-3 rounded-xl bg-[#171B1E] px-4 py-3">
            <Clock className="shrink-0 text-[#39FF14]" size={20} />
            <div>
              <p className="text-xs uppercase tracking-wider text-[#A5ADB4]">Match Duration</p>
              <p className="text-sm font-bold text-white">1 Hour 30 Minutes · Fixed</p>
            </div>
          </div>
          <div className="flex flex-1 items-center gap-3 rounded-xl bg-[#171B1E] px-4 py-3">
            <CalendarCheck className="shrink-0 text-[#39FF14]" size={20} />
            <div>
              <p className="text-xs uppercase tracking-wider text-[#A5ADB4]">Session price</p>
              <p className="text-sm font-bold text-white">
                Day {formatBDT(KICKZONE.daySessionPriceBDT)} · Night {formatBDT(KICKZONE.nightSessionPriceBDT)}
              </p>
            </div>
          </div>
          <Link
            href="/book"
            className="btn-neon flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm"
          >
            Check Availability <ArrowRight size={16} />
          </Link>
        </div>
        <p className="mt-2 text-center text-xs text-[#A5ADB4]">
          Demo availability only — not connected to the live turf schedule.
        </p>
      </div>
    </div>
  );
}

export function AboutSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <motion.div {...fadeUp}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#39FF14]">About Kick-Zone</p>
          <h2 className="font-sport mt-2 text-3xl font-black sm:text-4xl">
            MIRPUR 12&apos;S HOME FOR SERIOUS FOOTBALL.
          </h2>
          <p className="mt-4 leading-relaxed text-[#A5ADB4]">
            Kick-Zone is an indoor football turf in Mirpur 12, Dhaka — built for
            5v5 and 7v7 battles under lights. Every session is a fixed{" "}
            <span className="font-bold text-white">90-minute (1 hour 30 minutes)</span>{" "}
            match slot. Pick your date, grab your preferred time, and bring your squad.
          </p>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { icon: Timer, label: "90-min sessions" },
              { icon: Zap, label: "Indoor turf" },
              { icon: ShieldCheck, label: "Demo booking" },
            ].map((f) => (
              <div
                key={f.label}
                className="rounded-xl border border-[#2B3237] bg-[#111416] p-3 text-center"
              >
                <f.icon size={20} className="mx-auto text-[#39FF14]" />
                <p className="mt-1 text-xs font-bold text-white">{f.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/book" className="btn-neon rounded-full px-6 py-3 text-sm">
              Book Your Slot
            </Link>
            <Link
              href="/facilities"
              className="rounded-full border border-[#2B3237] px-6 py-3 text-sm font-bold text-white hover:border-[#39FF14]"
            >
              View Facilities
            </Link>
          </div>
        </motion.div>
        <motion.div {...fadeUp} className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={KICKZONE.heroImage}
            alt="Indoor football turf (illustrative stock photo — not the actual Kick-Zone venue)"
            className="h-80 w-full rounded-2xl border border-[#2B3237] object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-4 left-4 rounded-xl bg-[#080A0B]/90 px-4 py-3 backdrop-blur">
            <p className="font-sport text-xl font-black text-[#39FF14]">OWN THE PITCH</p>
            <p className="text-xs text-[#A5ADB4]">Mirpur 12 · Dhaka · Indoor turf</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function FacilityHighlights() {
  const items = KICKZONE.facilities.slice(0, 3);
  return (
    <section className="border-y border-[#2B3237] bg-[#111416]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading
          kicker="Why Kick-Zone"
          title={<>BUILT FOR THE BEAUTIFUL GAME.</>}
          sub="Illustrative demo facilities — actual amenities may differ. Call 01973-613818 to confirm."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {items.map((f, i) => (
            <motion.div
              key={f.title}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-hover rounded-2xl border border-[#2B3237] bg-[#171B1E] p-5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.image} alt={f.title} className="h-40 w-full rounded-xl object-cover" loading="lazy" />
              <h3 className="mt-4 font-bold text-white">{f.title}</h3>
              <p className="mt-1 text-sm text-[#A5ADB4]">{f.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/facilities" className="inline-flex items-center gap-2 text-sm font-bold text-[#39FF14] hover:underline">
            Explore all facilities <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    { n: "01", t: "Pick a date", d: "Open the booking calendar and choose your match day. Past dates are disabled." },
    { n: "02", t: "Choose a 90-min slot", d: "Every slot is fixed at 1 hour 30 minutes with auto-calculated end times." },
    { n: "03", t: "Add your details", d: "Name + phone required. Team, players and notes are optional. All validated in-browser." },
    { n: "04", t: "Review & confirm (demo)", d: "Review your session, confirm, and get a demo reference. No real slot is reserved." },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading kicker="How booking works" title={<>FROM KICKOFF TO CONFIRMATION.</>} />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <motion.div key={s.n} {...fadeUp} transition={{ duration: 0.45, delay: i * 0.07 }} className="rounded-2xl border border-[#2B3237] bg-[#111416] p-5">
            <p className="font-sport text-3xl font-black text-[#39FF14]">{s.n}</p>
            <h3 className="mt-2 font-bold text-white">{s.t}</h3>
            <p className="mt-1 text-sm text-[#A5ADB4]">{s.d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function GalleryPreview() {
  const imgs = KICKZONE.gallery.slice(0, 4);
  return (
    <section className="border-y border-[#2B3237] bg-[#111416]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#39FF14]">Gallery</p>
            <h2 className="font-sport mt-2 text-3xl font-black">FEEL THE TURF.</h2>
            <p className="mt-1 text-sm text-[#A5ADB4]">Illustrative stock photos — not the actual venue.</p>
          </div>
          <Link href="/gallery" className="hidden items-center gap-2 rounded-full border border-[#2B3237] px-5 py-2.5 text-sm font-bold hover:border-[#39FF14] sm:inline-flex">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {imgs.map((g) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={g.src} src={g.src} alt={g.alt} loading="lazy" className="h-48 w-full rounded-xl border border-[#2B3237] object-cover" />
          ))}
        </div>
        <Link href="/gallery" className="btn-neon mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm sm:hidden">
          View Gallery <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}

export function PricingTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading
        kicker="Pricing"
        title={<>DAY & NIGHT SESSIONS.</>}
        sub="Fixed 90-minute football turf sessions. Day rate before 5 PM, night rate from 5 PM. Illustrative demo prices."
      />
      <div className="mx-auto mt-8 max-w-md">
        <div className="rounded-2xl border border-[#39FF14]/40 bg-[#111416] p-6 text-center shadow-[0_0_40px_rgba(57,255,20,0.12)]">
          <Trophy size={28} className="mx-auto text-[#39FF14]" />
          <h3 className="font-sport mt-3 text-xl font-black">FOOTBALL TURF SESSION</h3>
          <p className="mt-1 flex items-center justify-center gap-2 text-sm text-[#A5ADB4]">
            <Clock size={14} /> Match Duration: 1 Hour 30 Minutes
          </p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between rounded-xl bg-[#171B1E] px-4 py-3">
              <span className="text-sm font-bold text-white">Day <span className="font-normal text-[#A5ADB4]">· before 5 PM</span></span>
              <span className="font-sport text-xl font-black text-[#39FF14]">{formatBDT(KICKZONE.daySessionPriceBDT)}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-[#171B1E] px-4 py-3">
              <span className="text-sm font-bold text-white">Night <span className="font-normal text-[#A5ADB4]">· from 5 PM</span></span>
              <span className="font-sport text-xl font-black text-[#39FF14]">{formatBDT(KICKZONE.nightSessionPriceBDT)}</span>
            </div>
          </div>
          <p className="mt-2 text-xs text-[#A5ADB4]">{KICKZONE.priceNote}</p>
          <Link href="/book" className="btn-neon mt-5 block rounded-full px-6 py-3 text-sm">
            Book Your Slot
          </Link>
          <Link href="/pricing" className="mt-2 block text-sm font-bold text-[#A5ADB4] hover:text-white">
            View pricing details
          </Link>
        </div>
      </div>
    </section>
  );
}

export function LocationContact() {
  return (
    <section className="border-t border-[#2B3237] bg-[#111416]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#39FF14]">Find us</p>
          <h2 className="font-sport mt-2 text-3xl font-black">MIRPUR 12, DHAKA.</h2>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex items-center gap-3 rounded-xl border border-[#2B3237] bg-[#171B1E] px-4 py-3">
              <MapPin size={18} className="text-[#39FF14]" />
              <span>{KICKZONE.location.full}</span>
            </li>
            <li>
              <a href={KICKZONE.phone.telHref} className="flex items-center gap-3 rounded-xl border border-[#2B3237] bg-[#171B1E] px-4 py-3 hover:border-[#39FF14]">
                <Phone size={18} className="text-[#39FF14]" />
                <span className="font-bold">{KICKZONE.phone.display} — tap to call</span>
              </a>
            </li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a href={KICKZONE.socials.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-[#2B3237] px-4 py-2.5 text-sm font-bold hover:border-[#39FF14]">
              <Facebook size={16} /> Facebook
            </a>
            <a href={KICKZONE.socials.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-[#2B3237] px-4 py-2.5 text-sm font-bold hover:border-[#39FF14]">
              <Instagram size={16} /> Instagram
            </a>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-[#2B3237]">
          <iframe
            title="Kick-Zone Mirpur 12 map"
            src="https://www.google.com/maps?q=Mirpur+12+Dhaka+Bangladesh&output=embed"
            className="h-72 w-full"
            loading="lazy"
          />
          <a
            href={KICKZONE.location.mapsSearchUrl}
            target="_blank"
            rel="noreferrer"
            className="block bg-[#171B1E] px-4 py-3 text-center text-sm font-bold text-[#39FF14] hover:underline"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-[#39FF14]/30 bg-gradient-to-br from-[#111416] to-[#0c1a0b] p-8 text-center sm:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#39FF14]">Ready when you are</p>
        <h2 className="font-sport mx-auto mt-2 max-w-xl text-3xl font-black leading-tight sm:text-5xl">
          OWN THE PITCH.
        </h2>
        <p className="mx-auto mt-2 max-w-md text-[#A5ADB4]">
          Your Game. Your Team. Your Zone. Pick a 90-minute slot at Kick-Zone, Mirpur 12.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/book" className="btn-neon rounded-full px-8 py-3.5 text-sm">
            Book Your Slot
          </Link>
          <a href={KICKZONE.phone.telHref} className="rounded-full border border-[#2B3237] bg-[#080A0B] px-8 py-3.5 text-sm font-bold hover:border-[#39FF14]">
            Call {KICKZONE.phone.display}
          </a>
        </div>
        <p className="mt-3 text-xs text-[#A5ADB4]">Demo site — online booking is illustrative only.</p>
      </div>
    </section>
  );
}
