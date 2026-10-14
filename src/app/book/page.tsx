import type { Metadata } from "next";
import BookingFlow from "@/components/booking/BookingFlow";

export const metadata: Metadata = {
  title: "Book Your Slot | Kick-Zone Mirpur 12",
  description: "Pick a date, choose a 90-minute slot, and confirm your demo booking at Kick-Zone.",
};

export default function BookPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#39FF14]">Booking</p>
      <h1 className="font-sport mt-2 text-3xl font-black sm:text-4xl">BOOK YOUR SLOT.</h1>
      <p className="mt-2 max-w-2xl text-[#A5ADB4]">
        Every session is fixed at <span className="font-bold text-white">1 Hour 30 Minutes</span>. Demo
        availability — call <a href="tel:+8801973613818" className="font-bold text-[#39FF14]">01973-613818</a> for a real booking.
      </p>
      <div className="mt-8">
        <BookingFlow />
      </div>
    </div>
  );
}
