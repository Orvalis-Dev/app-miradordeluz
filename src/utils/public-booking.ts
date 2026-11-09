export interface BookingCabin {
  id: number;
  name: string;
  capacity: number;
  blocked_ranges: Array<{ from: string; to: string }>;
}

export interface BookingAvailability {
  tenant_name: string;
  check_in_time: string;
  check_out_time: string;
  cabins: BookingCabin[];
}

export interface BookingStay {
  cabin_id: number;
  check_in_date: string;
  check_out_date: string;
  num_guests: number;
}

export interface BookingQuote {
  cabin_id: number;
  check_in: string;
  check_out: string;
  nights: number;
  pending_minutes: number;
  check_in_time: string;
  check_out_time: string;
  total: number;
  deposit: number;
  balance: number;
  is_available: boolean;
  price_token: string;
}

export interface BookingContact {
  name: string;
  dni: string;
  phone: string;
  email?: string;
}

export interface BookingPayload extends BookingStay {
  price_token: string;
  client: BookingContact;
}

export interface BookingReceipt {
  reference: string;
  status: "pending_confirmation";
  pending_until: string;
  total: number;
  deposit: number;
  balance: number;
  check_in_time: string;
  check_out_time: string;
  transfer_instructions: string | null;
  whatsapp_number: string | null;
}

export interface SavedBookingReceipt {
  receipt: BookingReceipt;
  cabinName: string;
  stay: BookingStay;
}

interface ApiEnvelope<T> {
  success: boolean;
  data?: T;
  errors?: Record<string, string[]>;
}

export class ApiError extends Error {
  constructor(message: string, readonly status: number, readonly fields: Record<string, string[]> = {}) {
    super(message);
    this.name = "ApiError";
  }
}

export const bookingTimezone = "America/Argentina/Cordoba";

export function bookingToday(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: bookingTimezone, year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now);
  return ["year", "month", "day"].map((type) => parts.find((part) => part.type === type)?.value).join("-");
}

export function bookingEndpoint(apiUrl: string | undefined, tenantSlug: string | undefined) {
  if (!apiUrl || !tenantSlug || !/^[a-z0-9][a-z0-9-]*$/i.test(tenantSlug)) return null;
  try {
    const url = new URL(apiUrl);
    const local = ["127.0.0.1", "localhost", "[::1]"].includes(url.hostname);
    if ((url.protocol !== "https:" && !(url.protocol === "http:" && local)) || url.username || url.password || url.search || url.hash) return null;
    const path = url.pathname.replace(/\/+$/, "");
    const versioned = path.endsWith("/api/v1") ? path : path.endsWith("/api") ? `${path}/v1` : `${path}/api/v1`;
    return `${url.origin}${versioned}/public/tenants/${encodeURIComponent(tenantSlug)}/booking`;
  } catch {
    return null;
  }
}

async function fetchApi<T>(fetcher: typeof fetch, url: string, init: RequestInit = {}): Promise<T> {
  const controller = new AbortController();
  const timeout = globalThis.setTimeout(() => controller.abort(), 18_000);
  const abort = () => controller.abort();
  init.signal?.addEventListener("abort", abort, { once: true });
  if (init.signal?.aborted) abort();
  try {
    const headers = new Headers(init.headers);
    headers.set("Accept", "application/json");
    if (init.body) headers.set("Content-Type", "application/json");
    const response = await fetcher(url, { ...init, headers, signal: controller.signal, credentials: "omit", cache: "no-store" });
    const parsed = await response.json().catch(() => null) as ApiEnvelope<T> | null;
    if (response.ok && parsed?.success === true && parsed.data != null) return parsed.data;
    if (response.status === 404 || response.status === 403) throw new ApiError("La solicitud en línea no está disponible. Podés hacer una consulta directa.", response.status);
    if (response.status === 429) throw new ApiError("Hay demasiadas consultas por el momento. Esperá un minuto antes de volver a intentar.", 429);
    const errors = parsed?.errors ?? {};
    if (response.status === 422) {
      const first = Object.entries(errors).filter(([field]) => field !== "code").flatMap(([, messages]) => Array.isArray(messages) ? messages : []).find((message) => typeof message === "string");
      throw new ApiError(first ?? "Revisá los datos de la consulta antes de continuar.", 422, errors);
    }
    throw new ApiError("No pudimos completar la consulta. Volvé a intentar.", response.status);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError("No pudimos conectarnos. Revisá tu conexión y volvé a intentar.", 0);
  } finally {
    globalThis.clearTimeout(timeout);
    init.signal?.removeEventListener("abort", abort);
  }
}

export function createBookingClient(endpoint: string, fetcher: typeof fetch = globalThis.fetch.bind(globalThis)) {
  return {
    availability(range?: { from: string; to: string }, signal?: AbortSignal) {
      const query = range ? `?${new URLSearchParams(range)}` : "";
      return fetchApi<BookingAvailability>(fetcher, `${endpoint}${query}`, { signal });
    },
    quote(stay: BookingStay, signal?: AbortSignal) {
      return fetchApi<BookingQuote>(fetcher, `${endpoint}/quote`, { method: "POST", body: JSON.stringify(stay), signal });
    },
    request(payload: BookingPayload, idempotencyKey: string) {
      return fetchApi<BookingReceipt>(fetcher, `${endpoint}/requests`, {
        method: "POST", body: JSON.stringify(payload), headers: { "Idempotency-Key": idempotencyKey },
      });
    },
  };
}

function nameKey(name: string) {
  return name.normalize("NFKD").toLowerCase().replace(/[\u0300-\u036f]/g, "")
    .replace(/\bn(?:[o°])?\.?\s*(?=\d)/g, "").replace(/[^a-z0-9]/g, "");
}

export function matchingCabinId(cabins: BookingCabin[], preferredName: string | undefined) {
  if (!preferredName) return null;
  const matches = cabins.filter((cabin) => nameKey(cabin.name) === nameKey(preferredName));
  return matches.length === 1 ? matches[0].id : null;
}

export function overlapsStay(cabin: BookingCabin, stay: Pick<BookingStay, "check_in_date" | "check_out_date">) {
  return cabin.blocked_ranges.some((block) => stay.check_in_date < block.to && stay.check_out_date > block.from);
}

export function bookingContactErrors(input: BookingContact) {
  const errors: Partial<Record<keyof BookingContact, string>> = {};
  if (!input.name.trim()) errors.name = "Ingresá el nombre completo.";
  if (!/^[a-zA-Z0-9.\-]{5,20}$/.test(input.dni.trim()) || input.dni.trim() === "00000000") {
    errors.dni = "Ingresá un documento válido, de 5 a 20 caracteres.";
  }
  const digits = input.phone.replace(/\D/g, "");
  if (!/^\+?[0-9 ().\-]{7,35}$/.test(input.phone.trim()) || digits.length < 7 || digits.length > 15) {
    errors.phone = "Ingresá un teléfono válido con código de área.";
  }
  if (input.email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) errors.email = "Ingresá un correo válido.";
  return errors;
}

export function createIdempotencyKey(crypto: Crypto = globalThis.crypto) {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function receiptWhatsappLink(receipt: BookingReceipt, expired = false) {
  const number = receipt.whatsapp_number?.replace(/[\s+()\-]/g, "");
  if (!number || !/^[1-9][0-9]{6,14}$/.test(number)) return null;
  const text = expired
    ? `Hola, quisiera consultar por la solicitud ${receipt.reference}. El plazo indicado ya pasó.`
    : `Hola, les envío el comprobante de transferencia para la solicitud ${receipt.reference}.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function isSavedReceipt(value: unknown): value is SavedBookingReceipt {
  if (!value || typeof value !== "object") return false;
  const { receipt, stay, cabinName } = value as Partial<SavedBookingReceipt>;
  return typeof cabinName === "string" && Boolean(
    receipt && /^WEB-[A-Z0-9]{12}$/.test(receipt.reference) &&
    receipt.status === "pending_confirmation" && Number.isFinite(Date.parse(receipt.pending_until)) &&
    Number.isFinite(receipt.total) && Number.isFinite(receipt.deposit) && Number.isFinite(receipt.balance) &&
    typeof receipt.check_in_time === "string" && typeof receipt.check_out_time === "string" &&
    (receipt.transfer_instructions === null || typeof receipt.transfer_instructions === "string") &&
    (receipt.whatsapp_number === null || typeof receipt.whatsapp_number === "string") &&
    stay && Number.isSafeInteger(stay.cabin_id) && Number.isSafeInteger(stay.num_guests) &&
    /^\d{4}-\d{2}-\d{2}$/.test(stay.check_in_date) && /^\d{4}-\d{2}-\d{2}$/.test(stay.check_out_date),
  );
}

export interface BookingReview {
  quote: BookingQuote;
  stay: BookingStay;
  cabinName: string;
}

export interface SavedBookingAttempt {
  key: string;
  review: BookingReview;
}

export function isSavedBookingAttempt(value: unknown): value is SavedBookingAttempt {
  if (!value || typeof value !== "object") return false;
  const { key, review } = value as Partial<SavedBookingAttempt>;
  const quote = review?.quote;
  const stay = review?.stay;
  return Boolean(
    typeof key === "string" && /^[a-zA-Z0-9_.:-]{16,128}$/.test(key) &&
    review && typeof review.cabinName === "string" && quote &&
    /^[a-f0-9]{64}$/.test(quote.price_token) && Number.isFinite(quote.total) && Number.isFinite(quote.deposit) &&
    Number.isFinite(quote.pending_minutes) && Number.isSafeInteger(quote.nights) &&
    typeof quote.check_in_time === "string" && typeof quote.check_out_time === "string" &&
    stay && Number.isSafeInteger(stay.cabin_id) && Number.isSafeInteger(stay.num_guests) &&
    /^\d{4}-\d{2}-\d{2}$/.test(stay.check_in_date) && /^\d{4}-\d{2}-\d{2}$/.test(stay.check_out_date),
  );
}
