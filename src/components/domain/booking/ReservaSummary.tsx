import React, { useEffect, useMemo, useState } from "react";

interface PriceRange {
  fecha_inicio: string;
  fecha_fin: string;
  precio_por_noche: number;
}

interface Cabana {
  id: string | number;
  nombre: string;
  capacidad: number;
  precio_base?: number;
  caracteristicas?: string[];
}

interface Props {
  cabana: Cabana | null;
  priceRanges: PriceRange[];
}

function parseDateOnly(dateStr: string) {
  return new Date(dateStr + "T00:00:00");
}

function eachNight(start: Date, end: Date) {
  const dates: Date[] = [];
  const cur = new Date(start);
  while (cur < end) {
    dates.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return dates;
}

export default function ReservaSummary({ cabana, priceRanges }: Props) {
  const [fechaInicio, setFechaInicio] = useState<string>("");
  const [fechaFin, setFechaFin] = useState<string>("");
  const [huespedes, setHuespedes] = useState<number>(2);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const capacidad = cabana?.capacidad ?? 1;
  const todayStr = useMemo(() => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  }, []);

  useEffect(() => {
    setHuespedes((prev) => Math.min(prev, capacidad));
  }, [capacidad]);

  const nights = useMemo(() => {
    if (!fechaInicio || !fechaFin) return 0;
    const s = parseDateOnly(fechaInicio);
    const f = parseDateOnly(fechaFin);
    const diff = Math.max(
      0,
      Math.floor((f.getTime() - s.getTime()) / (1000 * 60 * 60 * 24))
    );
    return diff;
  }, [fechaInicio, fechaFin]);

  const pricePerNightList = useMemo(() => {
    if (!fechaInicio || !fechaFin) return [];
    const start = parseDateOnly(fechaInicio);
    const end = parseDateOnly(fechaFin);
    const nightsDates = eachNight(start, end);
    return nightsDates.map((nightDate) => {
      const matching = priceRanges.find((r) => {
        const rs = parseDateOnly(r.fecha_inicio);
        const rf = parseDateOnly(r.fecha_fin);
        return nightDate >= rs && nightDate <= rf;
      });
      return matching ? matching.precio_por_noche : cabana?.precio_base ?? 0;
    });
  }, [fechaInicio, fechaFin, priceRanges, cabana]);

  const montoTotal = pricePerNightList.reduce((s, p) => s + p, 0);
  const montoSenia = Math.round(montoTotal * 0.5);
  const montoSaldo = montoTotal - montoSenia;

  const excedeCapacidad = huespedes > capacidad;

  // Generar mensaje para WhatsApp
  const generarMensajeWhatsApp = () => {
    if (!fechaInicio || !fechaFin || nights === 0) {
      alert("Por favor completa todos los campos");
      return null;
    }

    const mensaje = `
Hola, me gustaría hacer una reserva en Mirador de Luz.

*Datos de la Reserva:*
Cabaña: ${cabana?.nombre}
Check-in: ${fechaInicio}
Check-out: ${fechaFin}
Noches: ${nights}
Huéspedes: ${huespedes} ${huespedes === 1 ? "Adulto" : "Adultos"}

*Monto:*
Total: $${montoTotal.toLocaleString("es-AR")}
Seña (50%): $${montoSenia.toLocaleString("es-AR")}
Saldo: $${montoSaldo.toLocaleString("es-AR")}

¿Hay disponibilidad?
    `.trim();

    return encodeURIComponent(mensaje);
  };

  const handleReservar = () => {
    const mensajeEncodificado = generarMensajeWhatsApp();
    if (mensajeEncodificado) {
      window.open(
        `https://wa.me/5493813513513?text=${mensajeEncodificado}`,
        "_blank"
      );
    }
  };

  return (
    <div className="fixed md:static bottom-0 left-0 right-0 w-full md:w-auto z-40">
      {/* Header colapsable: Precio + Botón CONSULTAR (mobile) */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-white rounded-t-2xl md:rounded-2xl p-5 shadow-lg flex items-center justify-between md:hidden gap-4 border-t-4 border-slate-300"
      >
        <div className="text-left flex-1">
          <div className="text-2xl font-extrabold text-[#1E1E1E]">
            {cabana?.precio_base
              ? cabana.precio_base.toLocaleString("es-AR")
              : "—"}
            <span className="text-sm font-normal text-gray-600">/noche</span>
          </div>
          <div className="mt-1">
            <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-semibold">
              Hasta {capacidad} huéspedes
            </span>
          </div>
        </div>
        <div className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-full font-semibold text-sm whitespace-nowrap transition-colors shadow-md text-center">
          Consultar
        </div>
      </button>

      {/* Contenido expandible: Card destacada */}
      <div
        className={`bg-white md:rounded-3xl p-8 md:p-10 shadow-xl lg:shadow-2xl w-full overflow-hidden transition-all duration-300 border-4 border-slate-200 md:border-slate-300 rounded-t-none md:rounded-3xl md:max-h-none md:overflow-visible ${
          isExpanded ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="flex justify-between items-start mb-6 hidden md:flex">
          <div className="text-3xl font-extrabold text-[#1E1E1E]">
            {cabana?.precio_base
              ? cabana.precio_base.toLocaleString("es-AR")
              : "—"}
            <span className="text-sm font-normal text-gray-600">/noche</span>
          </div>
          <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-semibold">
            Hasta {capacidad} huéspedes
          </span>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-[#1E1E1E]">
                Check-in
              </label>
              <input
                type="date"
                name="fecha_inicio"
                value={fechaInicio}
                min={todayStr}
                onChange={(e) => {
                  setFechaInicio(e.target.value);
                  // if checkout is before new checkin, reset checkout
                  if (
                    fechaFin &&
                    e.target.value &&
                    parseDateOnly(fechaFin) <= parseDateOnly(e.target.value)
                  ) {
                    setFechaFin("");
                  }
                }}
                className="mt-2 w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#1E1E1E]">
                Check-out
              </label>
              <input
                type="date"
                name="fecha_fin"
                value={fechaFin}
                min={
                  fechaInicio
                    ? (() => {
                        const d = parseDateOnly(fechaInicio);
                        d.setDate(d.getDate() + 1);
                        return d.toISOString().split("T")[0];
                      })()
                    : todayStr
                }
                onChange={(e) => setFechaFin(e.target.value)}
                className="mt-2 w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              Huéspedes
              <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">
                Máx. {capacidad}
              </span>
            </label>
            <select
              name="huespedes"
              value={huespedes}
              onChange={(e) => setHuespedes(Number(e.target.value))}
              className="mt-2 w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-slate-500 outline-none"
            >
              {Array.from({ length: capacidad }).map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1} {i + 1 === 1 ? "Adulto" : "Adultos"}
                </option>
              ))}
            </select>
          </div>

          <input
            type="hidden"
            name="cabana_id"
            value={String(cabana?.id ?? "")}
          />
          <input type="hidden" name="monto_total" value={String(montoTotal)} />
          <input type="hidden" name="monto_senia" value={String(montoSenia)} />

          <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200">
            <div className="flex justify-between text-base text-gray-800 mb-3 font-semibold">
              <span>
                {nights > 0 ? `${nights} noches` : "Seleccioná fechas"}
              </span>
              <span className="font-bold text-gray-900">
                {montoTotal ? `$${montoTotal.toLocaleString("es-AR")}` : "—"}
              </span>
            </div>
            <div className="flex justify-between text-base text-gray-700 mb-3 font-medium">
              <span>Seña (50%)</span>
              <span className="font-semibold text-gray-800">
                {montoSenia ? `$${montoSenia.toLocaleString("es-AR")}` : "—"}
              </span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t-2 border-slate-300">
              <span>Saldo (50%)</span>
              <span className="text-gray-900">
                {montoSaldo ? `$${montoSaldo.toLocaleString("es-AR")}` : "—"}
              </span>
            </div>
          </div>

          {excedeCapacidad && (
            <p className="text-sm text-red-600 font-medium">
              La cantidad de huéspedes excede la capacidad máxima ({capacidad}).
            </p>
          )}

          <button
            type="button"
            onClick={handleReservar}
            disabled={
              !fechaInicio || !fechaFin || nights === 0 || excedeCapacidad
            }
            className="w-full bg-slate-700 hover:bg-slate-800 text-white font-bold py-4 rounded-xl mt-6 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl text-base disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.435 5.631 1.436h.006c6.548 0 11.818-5.338 11.821-11.893.001-3.175-1.24-6.159-3.498-8.411z" />
            </svg>
            Enviar a WhatsApp
          </button>
          <p className="text-sm text-gray-600 text-center mt-3">
            Te responderemos en menos de 1 hora
          </p>
        </div>
      </div>
    </div>
  );
}
