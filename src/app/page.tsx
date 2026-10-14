import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { KICKZONE } from "@/config/kickzone";
import {
  QuickBookingWidget,
  AboutSection,
  FacilityHighlights,
  HowItWorks,
  GalleryPreview,
  PricingTeaser,
  LocationContact,
  FinalCTA,
} from "@/components/home/HomeSections";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${KICKZONE.heroImage})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080A0B]/80 via-[#080A0B]/70 to-[#080A0B]" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#39FF14]/40 bg-black/60 px-4 py-1.5 text-xs font-bold text-[#39FF14]">
              <MapPin size={14} /> {KICKZONE.location.full} · Indoor Turf
            </div>
            <h1 className="font-sport mt-4 text-5xl font-black leading-[0.95] sm:text-7xl">
              OWN THE
              <br />
              <span className="text-[#39FF14]">PITCH.</span>
            </h1>
            <p className="font-sport mt-3 text-lg font-bold text-white sm:text-xl">
              Your Game. Your Team. Your Zone.
            </p>
            <p className="mt-3 max-w-lg leading-relaxed text-[#A5ADB4]">
              Book your football session at Kick-Zone, Mirpur 12. Bring your squad,
              choose your preferred time, and get ready to play.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/book"
                className="btn-neon inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm"
              >
                Book Your Slot <ArrowRight size={16} />
              </Link>
              <Link
                href="/facilities"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-black/50 px-8 py-4 text-sm font-bold backdrop-blur hover:border-[#39FF14]"
              >
                Explore the Turf
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[#A5ADB4]">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#39FF14]" /> 90-min sessions
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#39FF14]" /> {KICKZONE.sessionPriceLabel} illustrative
              </span>
              <a href={KICKZONE.phone.telHref} className="flex items-center gap-1.5 font-bold text-white hover:text-[#39FF14]">
                <Phone size={15} /> {KICKZONE.phone.display}
              </a>
            </div>
          </div>
        </div>
      </section>

      <QuickBookingWidget />
      <AboutSection />
      <FacilityHighlights />
      <HowItWorks />
      <GalleryPreview />
      <PricingTeaser />
      <LocationContact />
      <FinalCTA />
    </>
  );
}
