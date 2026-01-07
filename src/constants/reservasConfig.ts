export type ReservaCabanaId = "1" | "2" | "3" | "4";

export type ReservaCabanaConfig = {
  id: ReservaCabanaId;
  nombre: string;
  capacidad: number;
  precio_base: number;
  imageFolder: `cabana-${ReservaCabanaId}`;
};

export const SERVICIOS: string[] = [
  "Desayuno",
  "Heladera",
  "Cocina con horno",
  "Vajilla completa",
  "Tv Led “32” smart",
  "WIFI Gratis",
  "Aire acondicionado Frío/Calor",
  "Ventilador",
  "Ropa blanca",
  "Ropa de cama",
  "Cochera individual",
  "Asador individual",
  "Servicio Limpieza (Día x medio 09:00 hs - 12:00 hs)",
  "Amplia Pileta con solárium húmedo y borde infinito",
  "Jacuzzi",
  "Asesoramiento turístico",
];

export const CABANAS_RESERVA: Record<ReservaCabanaId, ReservaCabanaConfig> = {
  "1": {
    id: "1",
    nombre: "Cabaña Nº1",
    capacidad: 4,
    precio_base: 85000,
    imageFolder: "cabana-1",
  },
  "2": {
    id: "2",
    nombre: "Cabaña Nº2",
    capacidad: 6,
    precio_base: 110000,
    imageFolder: "cabana-2",
  },
  "3": {
    id: "3",
    nombre: "Cabaña Nº3",
    capacidad: 4,
    precio_base: 98000,
    imageFolder: "cabana-3",
  },
  "4": {
    id: "4",
    nombre: "Cabaña Nº4",
    capacidad: 6,
    precio_base: 135000,
    imageFolder: "cabana-4",
  },
};

const CABANA_IMAGE_FILENAMES: Record<ReservaCabanaId, string[]> = {
  "1": [
    "cabana-1-portada.webp",
    "cabana-1-portada-1.webp",
    "cabana-1-portada-2.webp",
    "cabana-1-portada-3.webp",
    "cabana-1-habitacion.webp",
    "cabana-1-habitacion-1.webp",
    "cabana-1-habitacion-2.webp",
    "cabana-1-hbitacion-3.webp",
    "cabana-1-habitacion-4.webp",
    "cabana-1-habitacion-5.webp",
    "cabana-1-cocina.webp",
    "cabana-1-comedor.webp",
    "cabana-1-comedor-1.webp",
    "cabana-1-living.webp",
    "cabana-1-living-1.webp",
    "cabana-1-living-2.webp",
    "cabana-1-living-3.webp",
    "cabana-1-baño.webp",
    "cabana-1-baño-1.webp",
    "cabana-1-baño-2.webp",
    "cabana-1-baño-3.webp",
    "cabana-1-cochera.webp",
    "cabana-1-cochera-1.webp",
    "cabana-1-entrada.webp",
    "cabana-1-entrada-1.webp",
    "cabana-1-entrada-2.webp",
  ],
  "2": Array.from({ length: 46 }, (_, i) => `cabana-2-${i + 1}.webp`),
  "3": Array.from({ length: 30 }, (_, i) => `cabana-3-${i + 1}.webp`),
  "4": Array.from({ length: 11 }, (_, i) => `cabana-4-${i + 1}.webp`),
};

export function isReservaCabanaId(value: string): value is ReservaCabanaId {
  return value === "1" || value === "2" || value === "3" || value === "4";
}

export function getReservaCabanaConfig(id: string) {
  if (!isReservaCabanaId(id)) return null;
  return CABANAS_RESERVA[id];
}

export function getReservaCabanaImages(id: string): string[] {
  if (!isReservaCabanaId(id)) return [];
  const folder = CABANAS_RESERVA[id].imageFolder;
  return CABANA_IMAGE_FILENAMES[id].map((f) => `/images/${folder}/${f}`);
}
