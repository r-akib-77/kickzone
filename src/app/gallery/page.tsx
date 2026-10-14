import type { Metadata } from "next";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Gallery | Kick-Zone Mirpur 12",
  description: "Photo gallery (illustrative stock photography).",
};

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <SectionHeading
        kicker="Gallery"
        title={<>FEEL THE TURF.</>}
        sub="Tap any photo for fullscreen lightbox. Use arrow keys or on-screen controls. Esc to close."
      />
      <div className="mt-8">
        <GalleryGrid />
      </div>
    </div>
  );
}
