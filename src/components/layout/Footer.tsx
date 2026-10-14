import Link from "next/link";
import { Phone, Facebook, Instagram, MapPin } from "lucide-react";
import { KICKZONE } from "@/config/kickzone";
import { formatBDT } from "@/lib/booking/pricing";

export default function Footer() {
  return (
    <footer className="border-t border-[#2B3237] bg-[#111416]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/kickzone-logo.jpg"
              alt="Kick-Zone logo"
              className="h-10 w-10 rounded-lg object-cover"
            />
            <span className="font-sport text-lg font-black">
              KICK<span className="text-neon">-ZONE</span>
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-[#A5ADB4]">
            Outdoor football turf at {KICKZONE.location.full}. Bring your squad,
            pick a 90-minute slot, and own the pitch.
          </p>
          <p className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
            Demo website — illustrative prices &amp; hours. Call to confirm.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Explore</h3>
          <ul className="mt-3 space-y-2 text-sm text-[#A5ADB4]">
            <li><Link href="/book" className="hover:text-[#39FF14]">Book a slot</Link></li>
            <li><Link href="/facilities" className="hover:text-[#39FF14]">Facilities</Link></li>
            <li><Link href="/pricing" className="hover:text-[#39FF14]">Pricing</Link></li>
            <li><Link href="/gallery" className="hover:text-[#39FF14]">Gallery</Link></li>
            <li><Link href="/contact" className="hover:text-[#39FF14]">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm text-[#A5ADB4]">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-[#39FF14]" />
              {KICKZONE.location.full}
            </li>
            <li>
              <a href={KICKZONE.phone.telHref} className="flex items-center gap-2 hover:text-[#39FF14]">
                <Phone size={16} className="text-[#39FF14]" /> {KICKZONE.phone.display}
              </a>
            </li>
            <li className="flex gap-3 pt-1">
              <a href={KICKZONE.socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="rounded-lg border border-[#2B3237] p-2 hover:border-[#39FF14] hover:text-[#39FF14]">
                <Facebook size={18} />
              </a>
              <a href={KICKZONE.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-lg border border-[#2B3237] p-2 hover:border-[#39FF14] hover:text-[#39FF14]">
                <Instagram size={18} />
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Match duration</h3>
          <div className="mt-3 rounded-xl border border-[#2B3237] bg-[#171B1E] p-4">
            <p className="font-sport text-2xl font-black text-[#39FF14]">90 MIN</p>
            <p className="text-sm text-[#A5ADB4]">Match Duration: 1 Hour 30 Minutes</p>
            <p className="mt-1 text-sm font-bold text-white">Day {formatBDT(KICKZONE.daySessionPriceBDT)} · Night {formatBDT(KICKZONE.nightSessionPriceBDT)} <span className="font-normal text-[#A5ADB4]">/ session (illustrative)</span></p>
            <Link href="/book" className="btn-neon mt-3 block rounded-full px-4 py-2.5 text-center text-sm">
              Book Your Slot
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-[#2B3237] py-5 text-center text-xs text-[#A5ADB4]">
        © {new Date().getFullYear()} {KICKZONE.businessName}, {KICKZONE.location.short}. Demo only — no real booking is created on this site.
      </div>
    </footer>
  );
}
