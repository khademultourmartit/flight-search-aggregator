/** Formats a price as a localized currency string, e.g. "BDT 66,000". */
export function formatPrice(amount: number, currency: string): string {
  return `${currency} ${amount.toLocaleString("en-US")}`;
}

/** Formats minutes as "Xh Ym", e.g. 657 -> "10h 57m". */
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins.toString().padStart(2, "0")}m`;
}

/** Formats an ISO datetime string as a short time, e.g. "16:00". */
export function formatTime(isoDateTime: string): string {
  const date = new Date(isoDateTime);
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Formats an ISO datetime string as a short readable date, e.g. "Fri, 19 Jun 2026". */
export function formatDate(isoDateTime: string): string {
  const date = new Date(isoDateTime);
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/** Returns true if departure and arrival fall on different calendar days. */
export function arrivesNextDay(departureIso: string, arrivalIso: string): boolean {
  const dep = new Date(departureIso);
  const arr = new Date(arrivalIso);
  return (
    dep.getFullYear() !== arr.getFullYear() ||
    dep.getMonth() !== arr.getMonth() ||
    dep.getDate() !== arr.getDate()
  );
}

/** Generates a short, human-friendly booking reference, e.g. "IBX-7K2QF1". */
export function generateBookingReference(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 6; i += 1) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `IBX-${suffix}`;
}
