import type { CustomerDetails } from "@/types/booking";

export interface ValidationErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  teamName?: string;
  playerCount?: string;
  notes?: string;
}

function normalizePhone(phone: string): string {
  return phone.replace(/[\s\-()]/g, "");
}

export function validateCustomer(d: CustomerDetails): ValidationErrors {
  const errors: ValidationErrors = {};

  const name = d.fullName.trim();
  if (!name) errors.fullName = "Full name is required.";
  else if (name.length < 3) errors.fullName = "Enter your full name (min 3 characters).";
  else if (name.length > 80) errors.fullName = "Name is too long (max 80 characters).";

  const phone = normalizePhone(d.phone.trim());
  if (!phone) {
    errors.phone = "Phone number is required.";
  } else if (!/^(01[3-9]\d{8}|\+8801[3-9]\d{8})$/.test(phone)) {
    errors.phone = "Enter a valid Bangladeshi mobile number (e.g. 01XXXXXXXXX).";
  }

  const email = d.email.trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.email = "Enter a valid email address or leave it blank.";
  }

  if (d.teamName.trim().length > 60) {
    errors.teamName = "Team name is too long (max 60 characters).";
  }

  const pc = d.playerCount.trim();
  if (pc) {
    const n = Number(pc);
    if (!Number.isInteger(n) || n < 1 || n > 30) {
      errors.playerCount = "Players must be a whole number between 1 and 30.";
    }
  }

  if (d.notes.trim().length > 500) {
    errors.notes = "Notes are too long (max 500 characters).";
  }

  return errors;
}

export function isValid(errors: ValidationErrors): boolean {
  return Object.keys(errors).length === 0;
}
