import { describe, expect, test } from "bun:test";
import {
  ApiError, bookingContactErrors, bookingEndpoint, bookingToday, createBookingClient,
  createIdempotencyKey, isSavedReceipt, overlapsStay, receiptWhatsappLink,
  type BookingPayload, type BookingReceipt,
} from "../src/utils/public-booking";

const receipt: BookingReceipt = {
  reference: "WEB-ABCDEFGHIJKL", status: "pending_confirmation", pending_until: "2026-11-09T15:30:00-03:00",
  total: 10000, deposit: 4000, balance: 6000, check_in_time: "15:00", check_out_time: "10:00",
  transfer_instructions: "Solo QA", whatsapp_number: "12025550123",
};

const availability = {
  tenant_name: "QA", check_in_time: "15:00", check_out_time: "10:00",
  cabins: [{ id: 31, name: "Unidad interna de QA", capacity: 4, blocked_ranges: [] }],
};

const stay = { cabin_id: 31, check_in_date: "2026-11-18", check_out_date: "2026-11-20", num_guests: 2 };
const payload: BookingPayload = {
  ...stay,
  price_token: "a".repeat(64),
  client: { name: "Huésped de prueba", dni: "99876543", phone: "+12025550123" },
};

describe("booking público", () => {
  test("deriva la ruta pública desde URL y slug, sin tokens ni credenciales", () => {
    const expected = "https://pms.example.test/api/v1/public/tenants/mirador/booking";
    expect(bookingEndpoint("https://pms.example.test", "mirador")).toBe(expected);
    expect(bookingEndpoint("https://pms.example.test/api/v1/", "mirador")).toBe(expected);
    expect(bookingEndpoint("https://pms.example.test/api", "mirador")).toBe(expected);
    expect(bookingEndpoint("https://token@pms.example.test", "mirador")).toBeNull();
    expect(bookingEndpoint("https://pms.example.test", "../tenant")).toBeNull();
    expect(bookingEndpoint(undefined, "mirador")).toBeNull();
  });

  test("compara noches con salida excluida y fechas del alojamiento", () => {
    const cabin = { id: 31, name: "Cabaña 1", capacity: 4, blocked_ranges: [{ from: "2026-11-14", to: "2026-11-18" }] };
    expect(overlapsStay(cabin, stay)).toBe(false);
    expect(overlapsStay(cabin, { ...stay, check_in_date: "2026-11-17" })).toBe(true);
    expect(overlapsStay(cabin, { check_in_date: "2026-11-12", check_out_date: "2026-11-14" })).toBe(false);
    expect(bookingToday(new Date("2026-11-10T01:00:00Z"))).toBe("2026-11-09");
  });

  test("no exige correo y rechaza documentos y teléfonos inválidos", () => {
    expect(bookingContactErrors(payload.client)).toEqual({});
    expect(bookingContactErrors({ name: " ", dni: "00000000", phone: "abcdefg", email: "inválido" })).toEqual({
      name: expect.any(String), dni: expect.any(String), phone: expect.any(String), email: expect.any(String),
    });
  });

  test("preserva la constancia y construye WhatsApp desde el número del backend, solo con referencia", () => {
    expect(isSavedReceipt({ receipt, stay, cabinName: "Cabaña 1" })).toBe(true);
    expect(isSavedReceipt({ receipt: { ...receipt, pending_until: "no válido" }, stay, cabinName: "Cabaña 1" })).toBe(false);
    const link = new URL(receiptWhatsappLink(receipt)!);
    expect(link.origin).toBe("https://wa.me");
    expect(link.pathname).toBe("/12025550123");
    expect(link.searchParams.get("text")).toContain(receipt.reference);
    expect(link.href).not.toContain(payload.client.dni);
    expect(receiptWhatsappLink({ ...receipt, whatsapp_number: "javascript:alert(1)" })).toBeNull();
  });

  test("envía parámetros por rangos, cotiza en backend y reutiliza cuerpo y clave en reintentos", async () => {
    const calls: { url: string; method?: string; headers: Headers; body?: BodyInit | null; credentials?: RequestCredentials }[] = [];
    const fetcher = (async (url: string, init?: RequestInit) => {
      calls.push({ url, method: init?.method, headers: new Headers(init?.headers), body: init?.body, credentials: init?.credentials });
      return Response.json({ success: true, data: url.endsWith("/requests") ? receipt : url.endsWith("/quote") ? {} : availability });
    }) as typeof fetch;
    const client = createBookingClient("https://pms.example.test/booking", fetcher);
    await client.availability({ from: stay.check_in_date, to: stay.check_out_date });
    await client.quote(stay);
    const key = createIdempotencyKey();
    await client.request(payload, key);
    await client.request(payload, key);
    expect(calls[0].url).toBe("https://pms.example.test/booking?from=2026-11-18&to=2026-11-20");
    expect(calls[1].url).toEndWith("/quote");
    expect(calls[1].body).toBe(JSON.stringify(stay));
    expect(calls[2].url).toEndWith("/requests");
    expect(calls[2].headers.get("Idempotency-Key")).toBe(key);
    expect(calls[3]).toEqual(calls[2]);
    expect(calls[2].headers.has("Authorization")).toBe(false);
    expect(calls[2].credentials).toBe("omit");
  });

  test("rechaza rangos ilegibles y consume sólo intervalos públicos válidos", async () => {
    const decode = (blocked_ranges: unknown) => {
      const fetcher = (async () => Response.json({
        success: true, data: { ...availability, cabins: [{ ...availability.cabins[0], blocked_ranges }] },
      })) as typeof fetch;
      return createBookingClient("https://example.test", fetcher).availability();
    };
    await expect(decode(undefined)).rejects.toBeInstanceOf(ApiError);
    await expect(decode([{ from: "2026-02-30", to: "2026-03-04" }])).rejects.toBeInstanceOf(ApiError);
    await expect(decode([{ from: "2026-11-10", to: "2026-11-10" }])).rejects.toBeInstanceOf(ApiError);
    const result = await decode([{ from: "2026-11-18", to: "2026-11-20", source: "interno", id: 31 }]);
    expect(result.cabins[0].blocked_ranges).toEqual([{ from: "2026-11-18", to: "2026-11-20" }]);
  });

  test("expone 422 como validación y trata 404 como canal deshabilitado", async () => {
    const invalid = (async () => Response.json({ success: false, errors: { price_token: ["Cambió el precio"] } }, { status: 422 })) as typeof fetch;
    await expect(createBookingClient("https://example.test", invalid).request(payload, "test-key-123456789")).rejects.toMatchObject({
      status: 422, message: "Cambió el precio", fields: { price_token: ["Cambió el precio"] },
    });
    const disabled = (async () => Response.json({ success: false }, { status: 404 })) as typeof fetch;
    await expect(createBookingClient("https://example.test", disabled).availability()).rejects.toBeInstanceOf(ApiError);
  });
});
