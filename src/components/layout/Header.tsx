"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { KICKZONE } from "@/config/kickzone";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/book", label: "Book" },
  { href: "/facilities", label: "Facilities" },
  { href: "/pricing", label: "Pricing" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[#2B3237] bg-[#080A0B]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label="Kick-Zone home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/kickzone-logo.jpg"
            alt="Kick-Zone logo"
            className="h-10 w-10 rounded-lg object-cover"
          />
          <span className="font-sport text-lg font-black tracking-tight">
            KICK<span className="text-neon">-ZONE</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-semibold transition-colors hover:text-[#39FF14] ${
                  active ? "text-[#39FF14]" : "text-[#A5ADB4]"
                }${l.href === "/book" ? " animate-nav-blink" : ""}`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={KICKZONE.phone.telHref}
            className="flex items-center gap-1.5 text-sm font-semibold text-[#A5ADB4] hover:text-white"
          >
            <Phone size={16} />
            {KICKZONE.phone.display}
          </a>
          <Link
            href="/book"
            className="btn-neon rounded-full px-5 py-2.5 text-sm"
          >
            Book Your Slot
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-white hover:bg-[#171B1E] md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-[#2B3237] bg-[#111416] px-4 py-4 md:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-semibold ${
                    active
                      ? "bg-[#171B1E] text-[#39FF14]"
                      : "text-[#A5ADB4] hover:bg-[#171B1E] hover:text-white"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className="btn-neon mt-2 rounded-full px-5 py-3 text-center text-sm"
            >
              Book Your Slot
            </Link>
            <a
              href={KICKZONE.phone.telHref}
              className="mt-1 flex items-center justify-center gap-2 rounded-full border border-[#2B3237] px-5 py-3 text-sm font-semibold text-white"
            >
              <Phone size={16} /> {KICKZONE.phone.display}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
