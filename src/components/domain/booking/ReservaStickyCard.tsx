import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AlertCircle, ArrowRight, CalendarDays, CheckCircle2, Clipboard, LoaderCircle } from "lucide-react";
import { IconWhatsApp as WhatsAppIcon } from "@components/common/Icons";
import {
  ApiError, bookingContactErrors, bookingEndpoint, bookingTimezone, bookingToday,
  createBookingClient, createIdempotencyKey, isSavedBookingAttempt, isSavedReceipt, matchingCabinId,
  overlapsStay, receiptWhatsappLink,
  type BookingAvailability, type BookingContact, type BookingPayload, type BookingReview,
  type SavedBookingAttempt, type SavedBookingReceipt,
} from "@utils/public-booking";

interface ReservaStickyCardProps {
  cabanaName?: string;
}

type AvailabilityState = { state: "loading" } | { state: "error"; error: ApiError } | { state: "ready"; data: BookingAvailability };
type Attempt = { payload: BookingPayload; key: string };
type ContactErrors = Partial<Record<keyof BookingContact, string>>;

const endpoint = bookingEndpoint(import.meta.env.PUBLIC_API_URL, import.meta.env.PUBLIC_BOOKING_TENANT_SLUG);
const storageKey = endpoint ? `mirador:booking-receipt:v1:${endpoint}` : null;
const attemptKey = endpoint ? `mirador:booking-attempt:v1:${endpoint}` : null;
const booking = endpoint ? createBookingClient(endpoint) : null;
const blankContact: BookingContact = { name: "", dni: "", phone: "", email: "" };
const money = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 2 });
const field = "min-h-12 w-full min-w-0 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700 disabled:bg-slate-100";
const cta = "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-orange-700 px-4 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-orange-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700 disabled:cursor-not-allowed disabled:bg-slate-400";
const secondaryLink = "text-sm font-semibold text-slate-700 underline underline-offset-4 hover:text-orange-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700";

function readSession<T>(key: string | null, validate: (value: unknown) => value is T): T | null {
  if (!key) return null;
  try {
    const value: unknown = JSON.parse(sessionStorage.getItem(key) ?? "null");
    return validate(value) ? value : null;
  } catch {
    return null;
  }
}

function storeSession(key: string | null, value: SavedBookingReceipt | SavedBookingAttempt | null) {
  if (!key) return;
  try {
    if (value) sessionStorage.setItem(key, JSON.stringify(value));
    else sessionStorage.removeItem(key);
  } catch {
    // The receipt and attempt still stay in memory if storage is unavailable.
  }
}

function dateLabel(value: string) {
  return value.split("-").reverse().join("/");
}

function requestError(error: unknown) {
  return error instanceof ApiError ? error : new ApiError("No pudimos completar la consulta. Volvé a intentar.", 0);
}

function FormNotice({ children }: { children: React.ReactNode }) {
  return <p role="alert" className="flex items-start gap-2 rounded-xl border border-orange-200 bg-orange-50 p-3 text-sm text-orange-950"><AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />{children}</p>;
}

function ContactLink() {
  return <a className={secondaryLink} href="/contacto">Consultar por otro medio</a>;
}

function Receipt({ value, onNew }: { value: SavedBookingReceipt; onNew: () => void }) {
  const { receipt, stay, cabinName } = value;
  const [copyMessage, setCopyMessage] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  const deadlineMs = Date.parse(receipt.pending_until);
  const [expired, setExpired] = useState(() => deadlineMs <= Date.now());
  const whatsapp = receiptWhatsappLink(receipt, expired);
  const deadlineLabel = new Intl.DateTimeFormat("es-AR", { timeZone: bookingTimezone, dateStyle: "medium", timeStyle: "short" }).format(new Date(deadlineMs));
  useEffect(() => {
    const check = () => setExpired(deadlineMs <= Date.now());
    check();
    const remaining = deadlineMs - Date.now();
    const timer = remaining > 0 ? window.setTimeout(check, Math.min(remaining, 2_147_483_647)) : undefined;
    document.addEventListener("visibilitychange", check);
    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", check);
    };
  }, [deadlineMs]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(receipt.reference);
      setCopyMessage("Referencia copiada.");
    } catch {
      ref.current?.select();
      setCopyMessage("Seleccionamos la referencia. Podés copiarla manualmente.");
    }
  }

  return (
    <div className="space-y-5">
      <div role="status" className="space-y-2">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-900"><CheckCircle2 className="size-4" aria-hidden /> Solicitud registrada</p>
        <h2 className="text-xl font-bold tracking-tight text-slate-900">{expired ? "Terminó el plazo indicado en la solicitud" : "Tu estadía está pendiente de confirmación"}</h2>
        <p className="text-sm text-slate-600">{cabinName} · {dateLabel(stay.check_in_date)} a {dateLabel(stay.check_out_date)} · {stay.num_guests} huéspedes.</p>
      </div>
      <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <label className="text-xs font-semibold text-slate-700" htmlFor="booking-reference">Referencia de solicitud</label>
        <div className="flex flex-wrap items-center gap-2">
          <input ref={ref} id="booking-reference" className="min-w-0 flex-1 rounded border-0 bg-transparent p-0 font-mono text-sm font-bold text-slate-900" readOnly value={receipt.reference} />
          <button type="button" onClick={copy} className="inline-flex min-h-10 items-center gap-1 rounded-lg border border-slate-300 bg-white px-2 text-xs font-semibold text-slate-800 hover:bg-slate-100"><Clipboard className="size-4" aria-hidden />Copiar</button>
        </div>
        <p role="status" className="text-xs text-slate-600">{copyMessage}</p>
      </div>
      <dl className="grid grid-cols-2 gap-3 text-sm">
        <div><dt className="text-xs text-slate-600">{expired ? "Seña indicada" : "Seña a transferir"}</dt><dd className="font-bold tabular-nums text-slate-900">{money.format(receipt.deposit)}</dd></div>
        <div><dt className="text-xs text-slate-600">Total acordado</dt><dd className="font-bold tabular-nums text-slate-900">{money.format(receipt.total)}</dd></div>
        <div className="col-span-2"><dt className="text-xs text-slate-600">Vencimiento · hora local</dt><dd className="font-bold text-slate-900">{deadlineLabel}</dd></div>
      </dl>
      {expired ? <FormNotice>El plazo mostrado ya pasó. No transfieras sin consultar antes con el alojamiento e indicá esta referencia.</FormNotice> : receipt.transfer_instructions ? <div className="space-y-1 rounded-xl border border-slate-200 p-4">
        <h3 className="text-sm font-semibold text-slate-900">Datos de transferencia</h3>
        <p className="whitespace-pre-wrap break-words text-sm text-slate-700">{receipt.transfer_instructions}</p>
      </div> : <FormNotice>Los datos de transferencia no están disponibles. Consultá al alojamiento e indicá la referencia antes de pagar.</FormNotice>}
      <p className="text-sm font-medium text-slate-700">La solicitud no retiene las fechas. La disponibilidad se confirma cuando el alojamiento verifica la seña y te avisa por WhatsApp.</p>
      {whatsapp ? <>
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={cta}><WhatsAppIcon className="size-5" />{expired ? "Consultar por WhatsApp" : "Enviar comprobante por WhatsApp"}</a>
        <p className="text-xs text-slate-600">Si WhatsApp no abre, tu solicitud sigue registrada. Guardá la referencia para comunicarte por otro medio.</p>
      </> : <ContactLink />}
      <button type="button" className={secondaryLink} onClick={onNew}>Hacer una nueva consulta</button>
    </div>
  );
}

export default function ReservaStickyCard({ cabanaName }: ReservaStickyCardProps) {
  const id = useId();
  const [availability, setAvailability] = useState<AvailabilityState>({ state: "loading" });
  const [refresh, setRefresh] = useState(0);
  const [cabin, setCabin] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [guests, setGuests] = useState("2");
  const [review, setReview] = useState<BookingReview | null>(null);
  const [contact, setContact] = useState<BookingContact>(blankContact);
  const [contactErrors, setContactErrors] = useState<ContactErrors>({});
  const [error, setError] = useState("");
  const [busy, setBusy] = useState<"quote" | "request" | null>(null);
  const [unresolved, setUnresolved] = useState(false);
  const [result, setResult] = useState<SavedBookingReceipt | null>(null);
  const [recovering, setRecovering] = useState(false);
  const attempt = useRef<Attempt | null>(null);
  const restoredKey = useRef<string | null>(null);
  const actionLock = useRef(false);
  const today = bookingToday();
  const availableCabin = availability.state === "ready" ? availability.data.cabins.find((entry) => String(entry.id) === cabin) : null;

  useEffect(() => {
    const receipt = readSession(storageKey, isSavedReceipt);
    if (receipt) { setResult(receipt); return; }
    const pending = readSession(attemptKey, isSavedBookingAttempt);
    if (!pending) return;
    setReview(pending.review);
    setCabin(String(pending.review.stay.cabin_id));
    setFrom(pending.review.stay.check_in_date);
    setTo(pending.review.stay.check_out_date);
    setGuests(String(pending.review.stay.num_guests));
    restoredKey.current = pending.key;
    setRecovering(true);
  }, []);
  useEffect(() => {
    if (!booking || result) return;
    const abort = new AbortController();
    booking.availability(undefined, abort.signal).then((data) => {
      if (abort.signal.aborted) return;
      setAvailability({ state: "ready", data });
      const preferredId = matchingCabinId(data.cabins, cabanaName);
      if (preferredId != null) setCabin((current) => current || String(preferredId));
    }).catch((failure: unknown) => {
      if (!abort.signal.aborted) setAvailability({ state: "error", error: requestError(failure) });
    });
    return () => abort.abort();
  }, [cabanaName, refresh, result]);

  function clearReview() {
    attempt.current = null;
    restoredKey.current = null;
    storeSession(attemptKey, null);
    setRecovering(false);
    setReview(null);
    setError("");
    setContactErrors({});
  }

  async function checkStay(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!booking || actionLock.current || !availableCabin) return;
    const numGuests = Number(guests);
    if (!from || !to || from < today || to <= from || !Number.isInteger(numGuests) || numGuests < 1 || numGuests > availableCabin.capacity) {
      setError("Revisá las fechas y la capacidad de la cabaña.");
      return;
    }
    const stay = { cabin_id: availableCabin.id, check_in_date: from, check_out_date: to, num_guests: numGuests };
    actionLock.current = true;
    clearReview();
    setBusy("quote");
    try {
      const current = await booking.availability({ from, to });
      const chosen = current.cabins.find((entry) => entry.id === stay.cabin_id);
      if (!chosen || chosen.capacity < numGuests || overlapsStay(chosen, stay)) {
        setError("Esta cabaña no está disponible para esas fechas y cantidad de huéspedes. Probá otras fechas o una unidad distinta.");
        return;
      }
      const quote = await booking.quote(stay);
      if (!quote.is_available) {
        setError("Las fechas dejaron de estar disponibles. Probá otras fechas o una unidad distinta.");
        return;
      }
      setReview({ quote, stay, cabinName: chosen.name });
    } catch (failure) {
      setError(requestError(failure).message);
    } finally {
      actionLock.current = false;
      setBusy(null);
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!booking || !review || actionLock.current) return;
    const cleaned = { name: contact.name.trim(), dni: contact.dni.trim(), phone: contact.phone.trim(), ...(contact.email?.trim() ? { email: contact.email.trim() } : {}) };
    const fields = bookingContactErrors(cleaned);
    setContactErrors(fields);
    if (Object.keys(fields).length && !attempt.current) return;
    actionLock.current = true;
    setBusy("request");
    setError("");
    try {
      const current = attempt.current ?? { payload: { ...review.stay, price_token: review.quote.price_token, client: cleaned }, key: restoredKey.current ?? createIdempotencyKey() };
      attempt.current = current;
      // Persist the key and quote only. The guest re-enters contact data after reload.
      storeSession(attemptKey, { key: current.key, review });
      const receipt = await booking.request(current.payload, current.key);
      const saved = { receipt, cabinName: review.cabinName, stay: review.stay };
      if (!isSavedReceipt(saved)) throw new ApiError("No pudimos leer la constancia de la solicitud.", 0);
      storeSession(storageKey, saved);
      storeSession(attemptKey, null);
      restoredKey.current = null;
      setRecovering(false);
      setResult(saved);
      setReview(null);
      setContact(blankContact);
      setUnresolved(false);
      attempt.current = null;
    } catch (failure) {
      const apiError = requestError(failure);
      if (apiError.status === 422) {
        setUnresolved(false);
        const key = attempt.current?.key ?? restoredKey.current;
        attempt.current = null;
        if (apiError.fields.idempotency_key && key) {
          restoredKey.current = key;
          setRecovering(true);
          setError("La solicitud ya se registró con otros datos. Ingresá exactamente el nombre, documento, teléfono y correo originales para recuperar la referencia, o contactá al alojamiento.");
        } else if (apiError.fields.price_token || apiError.fields.cabin_id) {
          clearReview();
          setError(apiError.message);
        } else {
          if (recovering || unresolved) {
            restoredKey.current = key;
            setRecovering(true);
          } else storeSession(attemptKey, null);
          const validationFields = Object.fromEntries(Object.entries(apiError.fields).filter(([key]) => key.startsWith("client.")).map(([key, messages]) => [key.slice(7), messages[0]]));
          setContactErrors(validationFields);
          setError(apiError.message);
        }
      } else if (apiError.status === 0 || apiError.status >= 500 || apiError.status === 429 || apiError.status < 400 || unresolved) {
        setUnresolved(true);
        setError(`${apiError.message} Reintentá desde este paso: usaremos la misma referencia de envío para no duplicar la solicitud.`);
      } else {
        attempt.current = null;
        if (!recovering) storeSession(attemptKey, null);
        setError(apiError.message);
      }
    } finally {
      actionLock.current = false;
      setBusy(null);
    }
  }

  if (result) return <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:p-6"><Receipt value={result} onNew={() => {
    storeSession(storageKey, null);
    setAvailability({ state: "loading" });
    setResult(null);
  }} /></section>;

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:p-6" aria-labelledby={`${id}-title`}>
      <div className="space-y-2">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-900"><CalendarDays className="size-4" aria-hidden /> Estadías</p>
        <h2 id={`${id}-title`} className="text-xl font-bold tracking-tight text-slate-900">Consultá fechas y precio</h2>
        <p className="text-sm leading-relaxed text-slate-600">Elegí la unidad y las noches. Si hay disponibilidad, podés enviar una solicitud al alojamiento.</p>
      </div>
      {!booking ? <><p className="text-sm text-slate-700">La solicitud en línea no está disponible.</p><ContactLink /></> :
        availability.state === "loading" ? <p role="status" className="flex items-center gap-2 py-3 text-sm text-slate-600"><LoaderCircle className="size-4 animate-spin" aria-hidden />Cargando cabañas…</p> :
        availability.state === "error" ? <div className="space-y-3">
          <FormNotice>{availability.error.message}</FormNotice>
          {availability.error.status !== 404 && availability.error.status !== 403 ? <button className={secondaryLink} type="button" onClick={() => { setAvailability({ state: "loading" }); setRefresh((count) => count + 1); }}>Reintentar consulta</button> : null}
          <div><ContactLink /></div>
        </div> : availability.data.cabins.length === 0 ? <><p className="text-sm text-slate-700">No hay cabañas habilitadas para solicitudes en línea.</p><ContactLink /></> : <>
          {!review ? <form className="space-y-4" onSubmit={checkStay}>
            <div className="space-y-1">
              <label htmlFor={`${id}-cabin`} className="text-sm font-semibold text-slate-800">Cabaña</label>
              <select id={`${id}-cabin`} className={field} required value={cabin} disabled={busy != null} onChange={(event) => { setCabin(event.target.value); setError(""); }}>
                <option value="">Elegí una cabaña</option>
                {availability.data.cabins.map((entry) => <option key={entry.id} value={entry.id}>{entry.name} · hasta {entry.capacity}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-[repeat(2,minmax(0,1fr))] gap-2">
              <div className="min-w-0 space-y-1"><label htmlFor={`${id}-from`} className="text-sm font-semibold text-slate-800">Entrada</label><input id={`${id}-from`} className={field} type="date" required min={today} value={from} disabled={busy != null} onChange={(event) => { setFrom(event.target.value); setError(""); }} /></div>
              <div className="min-w-0 space-y-1"><label htmlFor={`${id}-to`} className="text-sm font-semibold text-slate-800">Salida</label><input id={`${id}-to`} className={field} type="date" required min={from || today} value={to} disabled={busy != null} onChange={(event) => { setTo(event.target.value); setError(""); }} /></div>
            </div>
            <div className="space-y-1">
              <label htmlFor={`${id}-guests`} className="text-sm font-semibold text-slate-800">Huéspedes</label>
              <input id={`${id}-guests`} className={field} type="number" inputMode="numeric" required min="1" max={availableCabin?.capacity ?? 255} value={guests} disabled={busy != null} onChange={(event) => { setGuests(event.target.value); setError(""); }} />
            </div>
            {error ? <FormNotice>{error}</FormNotice> : null}
            <button className={cta} type="submit" disabled={busy != null || !cabin}>{busy === "quote" ? <><LoaderCircle className="size-4 animate-spin" aria-hidden />Consultando…</> : <>Consultar disponibilidad <ArrowRight className="size-4" aria-hidden /></>}</button>
          </form> : <form className="space-y-4" onSubmit={submit}>
            <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-wrap justify-between gap-2">
                <p className="text-sm font-bold text-slate-900">{review.cabinName}</p>
                {!unresolved && !recovering ? <button type="button" className={secondaryLink} disabled={busy != null} onClick={clearReview}>Cambiar fechas</button> : null}
              </div>
              <p className="text-xs text-slate-600">{dateLabel(review.stay.check_in_date)} – {dateLabel(review.stay.check_out_date)} · {review.quote.nights} {review.quote.nights === 1 ? "noche" : "noches"} · {review.stay.num_guests} huéspedes</p>
              <p className="text-xs text-slate-600">Entrada {review.quote.check_in_time} · Salida {review.quote.check_out_time}</p>
              <dl className="grid grid-cols-2 gap-2 border-t border-slate-200 pt-3 text-sm">
                <div><dt className="text-xs text-slate-600">Total</dt><dd className="font-bold tabular-nums text-slate-900">{money.format(review.quote.total)}</dd></div>
                <div><dt className="text-xs text-slate-600">Seña requerida</dt><dd className="font-bold tabular-nums text-slate-900">{money.format(review.quote.deposit)}</dd></div>
              </dl>
              <p className="text-xs text-slate-600">Al solicitar tenés {review.quote.pending_minutes} minutos para seguir las instrucciones. La solicitud no retiene fechas.</p>
            </div>
            {recovering && !unresolved ? <FormNotice>Hay un envío sin verificar en esta pestaña. Volvé a ingresar los datos originales para recuperar su resultado sin duplicarlo.</FormNotice> : null}
            <div className="space-y-3">
              <p className="text-sm font-bold text-slate-900">Datos del responsable</p>
              {([
                { name: "name", label: "Nombre completo", type: "text", autoComplete: "name", maxLength: 255 },
                { name: "dni", label: "Documento", type: "text", autoComplete: "off", maxLength: 20 },
                { name: "phone", label: "Teléfono con código de área", type: "tel", autoComplete: "tel", maxLength: 35 },
                { name: "email", label: "Correo (opcional)", type: "email", autoComplete: "email", maxLength: 255 },
              ] as const).map((input) => <div key={input.name} className="space-y-1">
                <label htmlFor={`${id}-${input.name}`} className="text-sm font-semibold text-slate-800">{input.label}</label>
                <input id={`${id}-${input.name}`} className={field} type={input.type} autoComplete={input.autoComplete} required={input.name !== "email"}
                  maxLength={input.maxLength} value={contact[input.name] ?? ""} disabled={busy != null || unresolved}
                  aria-invalid={Boolean(contactErrors[input.name])} aria-describedby={contactErrors[input.name] ? `${id}-error-${input.name}` : undefined}
                  onChange={(event) => {
                    setContact((previous) => ({ ...previous, [input.name]: event.target.value }));
                    setContactErrors((previous) => ({ ...previous, [input.name]: undefined }));
                  }} />
                {contactErrors[input.name] ? <p id={`${id}-error-${input.name}`} className="text-xs text-orange-950">{contactErrors[input.name]}</p> : null}
              </div>)}
            </div>
            {error ? <FormNotice>{error}</FormNotice> : null}
            <p className="text-xs text-slate-600">Usaremos tus datos para gestionar esta solicitud. Enviar no confirma la reserva ni realiza un pago.</p>
            <button className={cta} type="submit" disabled={busy != null}>{busy === "request" ? <><LoaderCircle className="size-4 animate-spin" aria-hidden />Enviando solicitud…</> : unresolved || recovering ? "Reintentar la misma solicitud" : "Enviar solicitud de reserva"}</button>
          </form>}
          <ContactLink />
        </>}
    </section>
  );
}
