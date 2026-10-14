import type { Metadata } from "next";
import Link from "next/link";
import { Phone, MapPin, Facebook, Instagram, ArrowRight, Clock } from "lucide-react";
import { KICKZONE } from "@/config/kickzone";

export const metadata: Metadata = {
  title: "Contact | Kick-Zone Mirpur 12",
  description: "Contact Kick-Zone Mirpur 12 Dhaka — phone, socials, map.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#39FF14]">Contact</p>
      <h1 className="font-sport mt-2 text-3xl font-black sm:text-4xl">TALK TO KICK-ZONE.</h1>
      <p className="mt-2 max-w-2xl text-[#A5ADB4]">
        This demo site does not send enquiries anywhere. To make a real booking, call or message Kick-Zone directly.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <div className="rounded-2xl border border-[#2B3237] bg-[#111416] p-5">
            <h2 className="font-sport text-lg font-black">{KICKZONE.businessName}</h2>
            <p className="mt-1 flex items-center gap-2 text-sm text-[#A5ADB4]">
              <MapPin size={16} className="text-[#39FF14]" /> {KICKZONE.location.full}
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm text-[#A5ADB4]">
              <Clock size={16} className="text-[#39FF14]" /> Open daily: 6:00 AM – 3:30 AM
            </p>
            <a
              href={KICKZONE.phone.telHref}
              className="btn-neon mt-4 flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm"
            >
              <Phone size={16} /> Call {KICKZONE.phone.display}
            </a>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <a
                href={KICKZONE.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-[#2B3237] px-4 py-2.5 text-sm font-bold hover:border-[#39FF14]"
              >
                <Facebook size={16} /> Facebook
              </a>
              <a
                href={KICKZONE.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-[#2B3237] px-4 py-2.5 text-sm font-bold hover:border-[#39FF14]"
              >
                <Instagram size={16} /> Instagram
              </a>
            </div>
            <a
              href={KICKZONE.location.mapsSearchUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 block text-center text-sm font-bold text-[#39FF14] hover:underline"
            >
              Open in Google Maps →
            </a>
          </div>
          <Link
            href="/book"
            className="flex items-center justify-center gap-2 rounded-2xl border border-[#39FF14]/40 bg-[#39FF14]/10 px-6 py-4 text-sm font-bold text-[#39FF14] hover:bg-[#39FF14]/15"
          >
            Try the demo booking flow <ArrowRight size={16} />
          </Link>
        </div>
        <div className="overflow-hidden rounded-2xl border border-[#2B3237]">
          <iframe
            title="Kick-Zone Mirpur 12 map"
            src="https://www.google.com/maps?q=Eastern+Housing+Phase-2+Pallabi+Mirpur-12+Dhaka&output=embed"
            className="h-96 w-full"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
