import { KICKZONE } from "@/config/kickzone";

export function getSessionPrice(): number {
  return KICKZONE.sessionPriceBDT;
}

export function formatBDT(amount: number): string {
  return `৳${amount.toLocaleString("en-IN")}`;
}

export function getDurationLabel(): string {
  return KICKZONE.bookingDurationLabel;
}
