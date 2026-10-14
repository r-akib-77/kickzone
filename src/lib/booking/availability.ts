import { KICKZONE } from "@/config/kickzone";
import type { BookingSlot } from "@/types/booking";

export function timeStringToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

export function minutesToTimeString(mins: number): string {
  const h = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function to12hDisplay(t24: string): string {
  const [hRaw, mRaw] = t24.split(":");
  let h = Number(hRaw);
  const m = mRaw;
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${m} ${ampm}`;
}

export function addMinutes(t24: string, mins: number): string {
  return minutesToTimeString(timeStringToMinutes(t24) + mins);
}

/** YYYY-MM-DD in Asia/Dhaka */
export function getDhakaTodayISO(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: KICKZONE.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  return parts; // en-CA yields YYYY-MM-DD
}

export function toISODate(y: number, m0: number, d: number): string {
  return `${y}-${String(m0 + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export function parseISODate(iso: string): { y: number; m0: number; d: number } {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m0: m - 1, d };
}

export function weekdayLong(iso: string): string {
  const { y, m0, d } = parseISODate(iso);
  return new Date(y, m0, d).toLocaleDateString("en-GB", { weekday: "long" });
}

export function dateDisplayLong(iso: string): string {
  const { y, m0, d } = parseISODate(iso);
  return new Date(y, m0, d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Deterministic illustrative unavailability per date so availability
 * visibly recalculates when the date changes (demo only, not live).
 * Keeps most of the day open: exactly two demo-booked slots per date.
 */
function illustrativeUnavailableForDate(
  iso: string,
  starts: string[]
): Set<string> {
  const { y, m0, d } = parseISODate(iso);
  const seed = y * 372 + m0 * 31 + d * 7;
  const out = new Set<string>();
  const n = starts.length;
  if (n > 0) {
    out.add(starts[((seed % n) + n) % n]);
    if (n > 1) out.add(starts[(((seed * 3 + 5) % n) + n) % n]);
  }
  return out;
}

export interface TimetableSlot {
  number: number;
  start: string;
  end: string;
  startDisplay: string;
  endDisplay: string;
  startNextDay: boolean;
  endNextDay: boolean;
  isNight: boolean;
}

/** Official 14-slot daily timetable with display + next-day flags. */
export function getDailyTimetable(): TimetableSlot[] {
  const openMin = timeStringToMinutes(KICKZONE.openingTime);
  const nightMin = timeStringToMinutes(KICKZONE.nightStartsAt);
  return KICKZONE.dailySlots.map((s, i) => {
    const startMin = timeStringToMinutes(s.start);
    const endMin = timeStringToMinutes(s.end);
    // Early-morning starts (before opening) run after midnight of the selected date
    const startNextDay = startMin < openMin;
    // Ends at/before midnight wrap to the next day
    const endNextDay = endMin <= startMin;
    return {
      number: i + 1,
      start: s.start,
      end: s.end,
      startDisplay: to12hDisplay(s.start),
      endDisplay: to12hDisplay(s.end),
      startNextDay,
      endNextDay,
      isNight: startMin >= nightMin || startNextDay,
    };
  });
}

/** Build a Date (local) for a given ISO date + "HH:MM" start, optionally next day. */
function slotDateTime(iso: string, t24: string, nextDay = false): Date {
  const { y, m0, d } = parseISODate(iso);
  const base = new Date(y, m0, d);
  if (nextDay) base.setDate(base.getDate() + 1);
  const [h, m] = t24.split(":").map(Number);
  return new Date(base.getFullYear(), base.getMonth(), base.getDate(), h, m, 0, 0);
}

export function generateSlotsForDate(
  isoDate: string,
  now = new Date()
): BookingSlot[] {
  const duration = KICKZONE.bookingDurationMinutes; // fixed 90
  const timetable = getDailyTimetable();
  const starts = timetable.map((t) => t.start);

  const unavailable = illustrativeUnavailableForDate(
    isoDate,
    starts
  );
  // Also force configured examples when they coincide with a timetable start
  for (const s of KICKZONE.illustrativeUnavailableStarts) {
    if (starts.includes(s)) {
      // Only mark on alternating days so it still varies
      const { d } = parseISODate(isoDate);
      if ((d + timeStringToMinutes(s)) % 2 === 0) unavailable.add(s);
    }
  }

  const todayISO = getDhakaTodayISO(now);

  return timetable.map((t) => {
    // Sanity: every configured slot must be exactly 90 minutes
    const startDt = slotDateTime(isoDate, t.start, t.startNextDay);
    const endDt = new Date(startDt.getTime() + duration * 60000);
    let status: BookingSlot["status"] = "available";
    if (unavailable.has(t.start)) status = "unavailable";
    // Disable slots whose end time has already passed (covers today + past dates)
    if (endDt.getTime() <= now.getTime()) status = "past";
    // Past dates handled by calendar disabling; but guard anyway
    if (isoDate < todayISO) status = "past";
    return {
      number: t.number,
      start: t.start,
      end: t.end,
      startDisplay: t.startDisplay,
      endDisplay: t.endDisplay,
      startNextDay: t.startNextDay,
      endNextDay: t.endNextDay,
      status,
    };
  });
}
