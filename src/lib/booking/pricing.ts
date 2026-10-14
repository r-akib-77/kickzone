import { KICKZONE } from "@/config/kickzone";
import { timeStringToMinutes, to12hDisplay } from "@/lib/booking/availability";

/** Day rate applies before nightStartsAt; night rate at/after it. */
export function isNightStart(start24: string): boolean {
  return (
    timeStringToMinutes(start24) >= timeStringToMinutes(KICKZONE.nightStartsAt)
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
