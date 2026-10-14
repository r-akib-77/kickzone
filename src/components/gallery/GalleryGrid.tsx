"use client";

import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { KICKZONE } from "@/config/kickzone";

export default function GalleryGrid() {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(() => {
    setIndex((i) => (i === null ? null : (i - 1 + KICKZONE.gallery.length) % KICKZONE.gallery.length));
  }, []);
  const next = useCallback(() => {
    setIndex((i) => (i === null ? null : (i + 1) % KICKZONE.gallery.length));
  }, []);

  useEffect(() => {
    if (index === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, prev, next]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {KICKZONE.gallery.map((g, i) => (
          <button
            key={g.src}
            onClick={() => setIndex(i)}
            className="group overflow-hidden rounded-xl border border-[#2B3237] bg-[#111416]"
            aria-label={`Open photo ${i + 1}: ${g.alt}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={g.src}
              alt={g.alt}
              loading="lazy"
              className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:h-56"
            />
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-[#A5ADB4]">
        Genuine photos from the Kick-Zone turf, Mirpur 12.
      </p>

      {index !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full border border-[#2B3237] bg-[#111416] p-2.5 hover:border-[#39FF14]"
          >
            <X size={20} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous photo"
            className="absolute left-3 rounded-full border border-[#2B3237] bg-[#111416] p-2.5 hover:border-[#39FF14] sm:left-6"
          >
            <ChevronLeft size={22} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={KICKZONE.gallery[index].src}
            alt={KICKZONE.gallery[index].alt}
            className="max-h-[80vh] max-w-[90vw] rounded-xl border border-[#2B3237] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next photo"
            className="absolute right-3 rounded-full border border-[#2B3237] bg-[#111416] p-2.5 hover:border-[#39FF14] sm:right-6"
          >
            <ChevronRight size={22} />
          </button>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-[#111416] px-4 py-1.5 text-xs font-bold">
            {index + 1} / {KICKZONE.gallery.length}
          </p>
        </div>
      )}
    </>
  );
}
