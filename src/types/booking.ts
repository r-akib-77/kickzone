export type SlotStatus = "available" | "unavailable" | "past";

export interface BookingSlot {
  /** Start time "HH:MM" 24h */
  start: string;
  /** End time "HH:MM" 24h, always start + 90 min */
  end: string;
  /** Display e.g. "8:00 AM" */
  startDisplay: string;
  endDisplay: string;
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
