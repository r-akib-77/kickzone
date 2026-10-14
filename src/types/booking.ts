export type SlotStatus = "available" | "unavailable" | "past";

export interface BookingSlot {
  /** Official slot number 1–14 from the Kick-Zone slot chart */
  number: number;
  /** Start time "HH:MM" 24h */
  start: string;
  /** End time "HH:MM" 24h, always start + 90 min */
  end: string;
  /** Display e.g. "8:00 AM" */
  startDisplay: string;
  endDisplay: string;
  /** True when this time falls on the next calendar day vs the selected date */
  startNextDay: boolean;
  endNextDay: boolean;
  status: SlotStatus;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email: string;
  teamName: string;
  playerCount: string;
  notes: string;
}

export interface BookingReview {
  dateISO: string; // YYYY-MM-DD
  weekday: string;
  dateDisplay: string;
  slot: BookingSlot;
  durationLabel: string;
  priceBDT: number;
  customer: CustomerDetails;
  reference: string;
}

export type BookingStep = 1 | 2 | 3 | 4 | 5;
