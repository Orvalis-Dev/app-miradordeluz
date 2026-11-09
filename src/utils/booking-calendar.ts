import type { BookingCabin } from "./public-booking";

export type BookingDateRange = { from: string; to: string };
export type CalendarSelection = { from: string; to: string };
export type DayStatus = "past" | "outside" | "unknown" | "occupied" | "unreachable" | "entry" | "exit" | "exit-only";

const horizonDays = 365;
const utcDate = (date: string) => new Date(`${date}T00:00:00.000Z`);
const dateKey = (date: Date) => date.toISOString().slice(0, 10);
export const monthStart = (date: string) => `${date.slice(0, 7)}-01`;

export function isBookingDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = utcDate(value);
  return Number.isFinite(date.getTime()) && dateKey(date) === value;
}

export function addDays(value: string, days: number) {
  const date = utcDate(value);
  date.setUTCDate(date.getUTCDate() + days);
  return dateKey(date);
}

export function shiftMonth(value: string, months: number) {
  const date = utcDate(monthStart(value));
  date.setUTCMonth(date.getUTCMonth() + months);
  return dateKey(date);
}

export function moveMonth(value: string, months: number) {
  const first = shiftMonth(value, months);
  const lastDay = Number(addDays(shiftMonth(first, 1), -1).slice(-2));
  return addDays(first, Math.min(Number(value.slice(-2)), lastDay) - 1);
}

export const bookingHorizon = (today: string) => addDays(today, horizonDays);

export function dayOfWeek(value: string) {
  return (utcDate(value).getUTCDay() + 6) % 7;
}

export function monthWeeks(month: string) {
  const offset = dayOfWeek(month);
  const last = Number(addDays(shiftMonth(month, 1), -1).slice(-2));
  return Array.from({ length: Math.ceil((offset + last) / 7) }, (_, row) =>
    Array.from({ length: 7 }, (_, col) => {
      const day = row * 7 + col - offset;
      return day >= 0 && day < last ? addDays(month, day) : null;
    }),
  );
}

const monthFormatter = new Intl.DateTimeFormat("es-AR", { timeZone: "UTC", month: "long", year: "numeric" });
const dateFormatter = new Intl.DateTimeFormat("es-AR", { timeZone: "UTC", dateStyle: "full" });

export const formatCalendarMonth = (value: string) => monthFormatter.format(utcDate(value));
export const formatCalendarDay = (value: string) => dateFormatter.format(utcDate(value));

export function calendarQuery(today: string, month: string, monthCount: number, selected: CalendarSelection): BookingDateRange {
  const horizon = bookingHorizon(today);
  // The horizon is a valid checkout, but has no night of its own.
  const visibleStart = month < today ? today : month >= horizon ? addDays(horizon, -1) : month;
  const visibleEnd = shiftMonth(month, monthCount);
  // Preserve the selected night while paging backwards, even before a checkout exists.
  const selectedEnd = selected.to || (selected.from >= today && selected.from < horizon ? addDays(selected.from, 1) : "");
  const requestedEnd = selectedEnd > visibleEnd ? selectedEnd : visibleEnd;
  return {
    from: selected.from && selected.from >= today && selected.from < visibleStart ? selected.from : visibleStart,
    to: requestedEnd > horizon ? horizon : requestedEnd,
  };
}

export function overlapsNights(blocked: BookingDateRange[], stay: BookingDateRange) {
  return blocked.some((block) => stay.from < block.to && stay.to > block.from);
}

export function canCheckIn(cabin: BookingCabin, coverage: BookingDateRange, day: string) {
  return coverage.from <= day && day < coverage.to &&
    !overlapsNights(cabin.blocked_ranges, { from: day, to: addDays(day, 1) });
}

export function canStay(cabin: BookingCabin, coverage: BookingDateRange, stay: BookingDateRange) {
  return coverage.from <= stay.from && stay.from < stay.to && stay.to <= coverage.to &&
    !overlapsNights(cabin.blocked_ranges, stay);
}

export function calendarDayStatus(
  day: string,
  today: string,
  horizon: string,
  selected: CalendarSelection,
  available: { cabin: BookingCabin; coverage: BookingDateRange } | null,
): DayStatus {
  if (day < today) return "past";
  if (day > horizon) return "outside";
  if (!available || day < available.coverage.from || day > available.coverage.to) return "unknown";
  const { cabin, coverage } = available;
  const occupied = cabin.blocked_ranges.some(({ from, to }) => from <= day && day < to);
  if (selected.from && !selected.to && day > selected.from) {
    if (canStay(cabin, coverage, { from: selected.from, to: day })) return occupied ? "exit-only" : "exit";
    return occupied ? "occupied" : "unreachable";
  }
  if (day === coverage.to) return "outside";
  return occupied ? "occupied" : "entry";
}

export function selectableDay(status: DayStatus) {
  return status === "entry" || status === "exit" || status === "exit-only";
}

export function bookingCabinId(mapping: string | undefined, pageId: string) {
  if (!mapping || !/^[1-9]\d*$/.test(pageId)) return null;
  try {
    const parsed: unknown = JSON.parse(mapping);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    const pairs = Object.entries(parsed);
    const ids = new Set<number>();
    for (const [page, id] of pairs) {
      if (!/^[1-9]\d*$/.test(page) || !Number.isSafeInteger(id) || id <= 0 || ids.has(id)) return null;
      ids.add(id);
    }
    return Object.prototype.hasOwnProperty.call(parsed, pageId) ? (parsed as Record<string, number>)[pageId] : null;
  } catch {
    return null;
  }
}
