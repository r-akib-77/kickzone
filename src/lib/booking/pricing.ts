import { KICKZONE } from "@/config/kickzone";
import { timeStringToMinutes, to12hDisplay } from "@/lib/booking/availability";

/** Day rate applies before nightStartsAt; night rate at/after it.
 * Early-morning slots after midnight (before opening) belong to the night. */
export function isNightStart(start24: string): boolean {
  const t = timeStringToMinutes(start24);
  return (
    t >= timeStringToMinutes(KICKZONE.nightStartsAt) ||
    t < timeStringToMinutes(KICKZONE.openingTime)
  );
}

export function getSessionPrice(): number {
  return KICKZONE.daySessionPriceBDT;
}

export function getSessionPriceForStart(start24: string | null | undefined): number {
  if (start24 && isNightStart(start24)) return KICKZONE.nightSessionPriceBDT;
  return KICKZONE.daySessionPriceBDT;
}

export function getSlotRateLabel(start24: string): string {
  return isNightStart(start24) ? "Night slot" : "Day slot";
}

export function getNightStartsDisplay(): string {
  return to12hDisplay(KICKZONE.nightStartsAt);
}

export function formatBDT(amount: number): string {
  return `৳${amount.toLocaleString("en-IN")}`;
}

export function getDurationLabel(): string {
  return KICKZONE.bookingDurationLabel;
}
