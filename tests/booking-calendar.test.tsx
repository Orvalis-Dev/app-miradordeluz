import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import BookingCalendar from "../src/components/domain/booking/BookingCalendar";
import {
  bookingCabinId, bookingHorizon, calendarDayStatus, calendarQuery,
  canCheckIn, canStay, monthWeeks, moveMonth, selectableDay,
} from "../src/utils/booking-calendar";

const today = "2026-11-09";
const coverage = { from: today, to: "2026-12-01" };
const none = { from: "", to: "" };
const entering = { from: "2026-11-16", to: "" };
const cabin = { id: 101, name: "Nombre en PMS distinto a la ficha", capacity: 4, blocked_ranges: [
  { from: "2026-11-17", to: "2026-11-19" },
] };
const available = { cabin, coverage };
const status = (day: string, selection = none, data = available) =>
  calendarDayStatus(day, today, bookingHorizon(today), selection, data);

describe("Calendario de estadías", () => {
  test("vincula la ficha a un ID configurado y falla cerrado sin inferir el mismo ID", () => {
    const mapping = '{"1":101,"2":102}';
    expect(bookingCabinId(mapping, "1")).toBe(101);
    expect(bookingCabinId(mapping, "2")).toBe(102);
    for (const config of [mapping, undefined, "", "not JSON", "[1]", '{"101":"101"}', '{"101":0}', '{"101":2.5}', '{"101":5,"2":5}']) {
      expect(bookingCabinId(config, "101")).toBeNull();
    }
    expect(bookingCabinId('{"1":101,"dos":102}', "1")).toBeNull();
  });

  test("pinta como no disponible el intervalo de esa unidad y permite volver a entrar en su último día exclusivo", () => {
    expect(status("2026-11-16")).toBe("entry");
    expect(status("2026-11-17")).toBe("occupied");
    expect(status("2026-11-18")).toBe("occupied");
    expect(status("2026-11-19")).toBe("entry");
    expect(status("2026-11-17", none, { ...available, cabin: { ...cabin, id: 102, blocked_ranges: [] } })).toBe("entry");
  });

  test("distingue la salida de una noche y bloquea todo rango que la atraviesa", () => {
    expect(status("2026-11-17", entering)).toBe("exit-only");
    expect(status("2026-11-18", entering)).toBe("occupied");
    expect(status("2026-11-19", entering)).toBe("unreachable");
    expect(status("2026-11-16", entering)).toBe("entry");
    expect(canStay(cabin, coverage, { ...entering, to: "2026-11-17" })).toBe(true);
    expect(canStay(cabin, coverage, { ...entering, to: "2026-11-19" })).toBe(false);
    expect(canStay(cabin, coverage, { ...entering, to: entering.from })).toBe(false);
    expect(canCheckIn(cabin, coverage, "2026-11-17")).toBe(false);
  });

  test("no supone disponibilidad con consulta pendiente o cobertura insuficiente", () => {
    const horizon = bookingHorizon(today);
    expect(calendarDayStatus("2026-11-11", today, horizon, none, null)).toBe("unknown");
    expect(status("2026-11-08")).toBe("past");
    expect(status("2026-12-02")).toBe("unknown");
    expect(status("2026-12-01")).toBe("outside");
    expect(status("2026-12-01", { from: "2026-11-30", to: "" })).toBe("exit");
    expect(selectableDay("unknown")).toBe(false);
  });

  test("consulta meses explícitos y conserva cobertura de toda selección al navegar", () => {
    expect(calendarQuery(today, "2026-11-01", 1, none)).toEqual(coverage);
    expect(calendarQuery(today, "2026-11-01", 2, none)).toEqual({ from: today, to: "2027-01-01" });
    expect(calendarQuery(today, "2026-12-01", 1, entering)).toEqual({ from: entering.from, to: "2027-01-01" });
    expect(calendarQuery(today, "2026-11-01", 1, { ...entering, to: "2026-12-02" })).toEqual({ from: today, to: "2026-12-02" });
    const futureEntry = { from: "2027-01-21", to: "" };
    const back = calendarQuery(today, "2026-11-01", 1, futureEntry);
    expect(back).toEqual({ from: today, to: "2027-01-22" });
    expect(canCheckIn(cabin, back, futureEntry.from)).toBe(true);
    const horizon = bookingHorizon(today);
    expect(calendarQuery(today, "2027-11-01", 2, entering)).toEqual({ from: entering.from, to: horizon });
  });

  test("navega los días civiles y ordena semanas de lunes a domingo", () => {
    expect(moveMonth("2028-01-31", 1)).toBe("2028-02-29");
    expect(moveMonth("2027-01-31", 1)).toBe("2027-02-28");
    expect(monthWeeks("2026-11-01")[0]).toEqual([null, null, null, null, null, null, "2026-11-01"]);
    expect(monthWeeks("2026-11-01").at(-1)?.[0]).toBe("2026-11-30");
  });

  test("la grilla presenta ocupación anónima, navegación y checkout accesibles", () => {
    const render = (selected: typeof none, data: typeof available | null) => renderToStaticMarkup(
      <BookingCalendar today={today} month="2026-11-01" months={1} onMonthsChange={() => {}} onMonthChange={() => {}}
        selected={selected} onSelect={() => {}} available={data} loading={!data} disabled={false} />,
    );
    const cell = (html: string, day: string) => html.match(new RegExp(`<button[^>]*data-calendar-day="${day}"[^>]*>`))?.[0];
    const initial = render(none, available);
    expect(initial).toContain('role="grid"');
    expect(initial).toContain('aria-label="Mes siguiente"');
    expect(cell(initial, "2026-11-17")).toContain('aria-disabled="true"');
    expect(cell(initial, "2026-11-17")).toContain("bg-slate-200");
    expect(cell(initial, "2026-11-17")).toContain("noche no disponible");
    expect(initial).not.toContain(cabin.name);
    expect(cell(render(entering, available), "2026-11-17")).toContain('aria-disabled="false"');
    expect(cell(render(entering, available), "2026-11-17")).toContain("solo salida");
    expect(cell(render(entering, available), "2026-11-19")).toContain('aria-disabled="true"');
    expect(cell(render(none, null), "2026-11-16")).toContain('aria-disabled="true"');
    expect(cell(render(none, null), "2026-11-16")).toContain("disponibilidad sin verificar");
  });
});
