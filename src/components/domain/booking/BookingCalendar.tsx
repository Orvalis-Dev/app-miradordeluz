import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight, LoaderCircle } from "lucide-react";
import {
  addDays, bookingHorizon, calendarDayStatus, dayOfWeek, formatCalendarDay,
  formatCalendarMonth, monthStart, monthWeeks, moveMonth, selectableDay, shiftMonth,
  type BookingDateRange, type CalendarSelection, type DayStatus,
} from "@utils/booking-calendar";
import type { BookingCabin } from "@utils/public-booking";

type Props = {
  today: string;
  month: string;
  months: number;
  onMonthsChange: (count: number) => void;
  onMonthChange: (month: string) => void;
  selected: CalendarSelection;
  onSelect: (selected: CalendarSelection) => void;
  available: { cabin: BookingCabin; coverage: BookingDateRange } | null;
  loading: boolean;
  disabled: boolean;
};

const weekdays = [
  ["Lu", "Lunes"], ["Ma", "Martes"], ["Mi", "Miércoles"], ["Ju", "Jueves"],
  ["Vi", "Viernes"], ["Sá", "Sábado"], ["Do", "Domingo"],
] as const;
const focusStyle = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700";
const navStyle = `inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-800 hover:bg-orange-50 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 ${focusStyle}`;
const legend = "inline-flex items-center gap-1.5";
const swatch = "inline-block size-3 shrink-0 rounded-sm border";

const labels: Record<DayStatus, string> = {
  past: "fecha pasada",
  outside: "fuera del período de consulta",
  unknown: "disponibilidad sin verificar",
  occupied: "noche no disponible",
  unreachable: "no se puede salir este día con la entrada elegida",
  entry: "entrada disponible",
  exit: "salida disponible",
  "exit-only": "noche no disponible, solo salida",
};

function dateLabel(date: string) {
  return date ? date.split("-").reverse().join("/") : "Sin elegir";
}

export default function BookingCalendar({
  today, month, months, onMonthsChange, onMonthChange, selected, onSelect, available, loading, disabled,
}: Props) {
  const id = useId();
  const ref = useRef<HTMLElement>(null);
  const moveFocus = useRef(false);
  const [focused, setFocused] = useState("");
  const horizon = bookingHorizon(today);
  const previous = month > monthStart(today);
  const next = shiftMonth(month, months - 1) < monthStart(horizon);
  const afterVisible = shiftMonth(month, months);
  const visibleFrom = month < today ? today : month;
  const active = focused >= visibleFrom && focused < afterVisible && focused <= horizon ? focused
    : selected.from >= visibleFrom && selected.from < afterVisible && selected.from <= horizon ? selected.from : visibleFrom;
  const choosingExit = Boolean(selected.from && !selected.to);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof ResizeObserver === "undefined") return;
    const measure = () => onMonthsChange(element.clientWidth >= 604 ? 2 : 1);
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    measure();
    return () => observer.disconnect();
  }, [onMonthsChange]);

  useEffect(() => {
    if (!moveFocus.current) return;
    moveFocus.current = false;
    ref.current?.querySelector<HTMLButtonElement>(`[data-calendar-day="${active}"]`)?.focus();
  }, [active, month, months]);

  function onDayKey(event: KeyboardEvent<HTMLButtonElement>, day: string) {
    let target: string;
    switch (event.key) {
      case "ArrowLeft": target = addDays(day, -1); break;
      case "ArrowRight": target = addDays(day, 1); break;
      case "ArrowUp": target = addDays(day, -7); break;
      case "ArrowDown": target = addDays(day, 7); break;
      case "Home": target = addDays(day, -dayOfWeek(day)); break;
      case "End": target = addDays(day, 6 - dayOfWeek(day)); break;
      case "PageUp": target = moveMonth(day, event.shiftKey ? -12 : -1); break;
      case "PageDown": target = moveMonth(day, event.shiftKey ? 12 : 1); break;
      default: return;
    }
    event.preventDefault();
    if (target < today) target = today;
    if (target > horizon) target = horizon;
    if (target === day) return;
    moveFocus.current = true;
    setFocused(target);
    if (target < month) onMonthChange(monthStart(target));
    else if (target >= afterVisible) {
      const first = shiftMonth(target, 1 - months);
      onMonthChange(first < monthStart(today) ? monthStart(today) : first);
    }
  }

  function select(day: string, status: DayStatus) {
    if (disabled || !selectableDay(status)) return;
    if (status === "entry") onSelect({ from: day, to: "" });
    else onSelect({ from: selected.from, to: day });
  }

  return (
    <section ref={ref} className="space-y-3" aria-labelledby={`${id}-dates`}>
      <div className="flex min-h-7 items-center justify-between gap-2">
        <h3 id={`${id}-dates`} className="text-sm font-semibold text-slate-800">Fechas de la estadía</h3>
        {selected.from ? <button type="button" onClick={() => onSelect({ from: "", to: "" })} disabled={disabled} className={`min-h-8 rounded text-xs font-semibold text-orange-900 underline underline-offset-4 hover:text-orange-700 disabled:opacity-60 ${focusStyle}`}>Limpiar fechas</button> : null}
      </div>

      <dl className="grid grid-cols-2 divide-x divide-slate-200 rounded-xl border border-slate-200 bg-slate-50 text-sm">
        <div className="px-3 py-2"><dt className="text-xs font-semibold text-slate-600">Entrada</dt><dd className={selected.from ? "font-bold text-slate-900 tabular-nums" : "text-slate-600"}>{dateLabel(selected.from)}</dd></div>
        <div className="px-3 py-2"><dt className="text-xs font-semibold text-slate-600">Salida</dt><dd className={selected.to ? "font-bold text-slate-900 tabular-nums" : "text-slate-600"}>{dateLabel(selected.to)}</dd></div>
      </dl>

      <div className="rounded-xl border border-slate-200 bg-white p-2">
        <div className="mb-1 flex items-center justify-between gap-1">
          <button className={navStyle} type="button" aria-label="Mes anterior" disabled={!previous || disabled} onClick={() => onMonthChange(shiftMonth(month, -1))}><ChevronLeft className="size-4" aria-hidden /></button>
          <p className="text-center text-xs font-bold text-slate-800" aria-live="polite" aria-atomic="true">
            {months === 1 ? <span className="capitalize">{formatCalendarMonth(month)}</span> : <span>Meses de la estadía</span>}
          </p>
          <button className={navStyle} type="button" aria-label="Mes siguiente" disabled={!next || disabled} onClick={() => onMonthChange(shiftMonth(month, 1))}><ChevronRight className="size-4" aria-hidden /></button>
        </div>

        <div className={months === 2 ? "grid grid-cols-2 gap-4" : ""} aria-busy={loading}>
          {Array.from({ length: months }, (_, index) => {
            const currentMonth = shiftMonth(month, index);
            return <table key={currentMonth} className="w-full table-fixed border-separate border-spacing-x-0.5 border-spacing-y-0.5 text-center tabular-nums" role="grid" aria-label={formatCalendarMonth(currentMonth)} aria-describedby={`${id}-instruction ${id}-keyboard`}>
              {months === 2 ? <caption className="pb-1 text-xs font-bold capitalize text-slate-800">{formatCalendarMonth(currentMonth)}</caption> : null}
              <thead><tr>{weekdays.map(([short, name]) => <th key={name} scope="col" aria-label={name} className="pb-0.5 text-[11px] font-semibold text-slate-600">{short}</th>)}</tr></thead>
              <tbody>
                {monthWeeks(currentMonth).map((week, row) => <tr key={row}>
                  {week.map((day, col) => {
                    if (!day) return <td key={col} aria-hidden="true" />;
                    const status = calendarDayStatus(day, today, horizon, selected, available);
                    const start = day === selected.from;
                    const end = day === selected.to;
                    const inStay = Boolean(selected.to && day > selected.from && day < selected.to);
                    const canSelect = !disabled && selectableDay(status);
                    const selectedLabel = start ? ", entrada elegida" : end ? ", salida elegida" : inStay ? ", en la estadía elegida" : "";
                    const dayStyle = end && status === "occupied" ? "bg-slate-200 font-bold text-slate-900 ring-2 ring-inset ring-orange-800"
                      : start || end ? "bg-orange-800 font-bold text-white"
                      : inStay ? "bg-orange-100 font-semibold text-orange-950"
                      : status === "occupied" ? "bg-slate-200 font-semibold text-slate-600 line-through decoration-1"
                      : status === "exit-only" ? "bg-slate-200 font-bold text-slate-800 ring-1 ring-inset ring-orange-700 hover:bg-orange-100"
                      : !selectableDay(status) ? "text-slate-500"
                      : "font-semibold text-slate-800 hover:bg-orange-100 hover:text-orange-950";
                    return <td key={col} role="gridcell" aria-selected={start || end || inStay} className="p-0">
                      <button type="button" data-calendar-day={day} aria-disabled={!canSelect} aria-current={day === today ? "date" : undefined}
                        aria-label={`${formatCalendarDay(day)}, ${labels[status]}${selectedLabel}`}
                        tabIndex={day === active ? 0 : -1}
                        onFocus={() => setFocused(day)}
                        onKeyDown={(event) => onDayKey(event, day)}
                        onClick={() => select(day, status)}
                        className={`block min-h-10 w-full rounded-md text-xs aria-disabled:cursor-not-allowed ${focusStyle} ${dayStyle}`}>
                        {Number(day.slice(-2))}
                      </button>
                    </td>;
                  })}
                </tr>)}
              </tbody>
            </table>;
          })}
        </div>
      </div>

      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] leading-4 text-slate-700" aria-label="Leyenda">
        <span className={legend}><span className={`${swatch} border-slate-300 bg-white`} aria-hidden />Disponible</span>
        <span className={legend}><span className={`${swatch} border-slate-300 bg-slate-200`} aria-hidden />Noche no disponible</span>
        <span className={legend}><span className={`${swatch} border-orange-800 bg-orange-800`} aria-hidden />Elegida</span>
      </div>
      <p id={`${id}-instruction`} role="status" className="text-xs leading-relaxed text-slate-600">
        {loading ? <span className="inline-flex items-center gap-1.5"><LoaderCircle className="size-3 motion-safe:animate-spin" aria-hidden />Actualizando disponibilidad…</span>
          : !available ? "La disponibilidad de estas fechas no está verificada."
          : selected.to ? "Fechas elegidas. Podés consultar el precio o iniciar otra selección."
          : choosingExit ? "Elegí la salida. Si la siguiente noche no está disponible, podés salir ese día."
          : "Elegí la entrada para comenzar. Podés consultar fechas hasta un año desde hoy."}
      </p>
      <p id={`${id}-keyboard`} className="sr-only">Usá las flechas para recorrer las fechas, Re Pág y Av Pág para cambiar de mes, e Intro para elegir.</p>
    </section>
  );
}
