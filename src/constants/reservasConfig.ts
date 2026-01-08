export type ReservaCabanaId = "1" | "2" | "3" | "4";

export type CabanaImage = {
  desktop: string;
  mobile: string;
};

export type ReservaCabanaConfig = {
  id: ReservaCabanaId;
  nombre: string;
  capacidad: number;
  precio_base: number;
  imageFolder: `cabin-${ReservaCabanaId}`;
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
    imageFolder: "cabin-1",
  },
  "2": {
    id: "2",
    nombre: "Cabaña Nº2",
    capacidad: 6,
    precio_base: 110000,
    imageFolder: "cabin-2",
  },
  "3": {
    id: "3",
    nombre: "Cabaña Nº3",
    capacidad: 4,
    precio_base: 98000,
    imageFolder: "cabin-3",
  },
  "4": {
    id: "4",
    nombre: "Cabaña Nº4",
    capacidad: 6,
    precio_base: 135000,
    imageFolder: "cabin-4",
  },
};

const CABANA_IMAGE_FILENAMES: Record<ReservaCabanaId, string[]> = {
  "1": [
    "cabana-1-portada",
    "cabana-1-portada-1",
    "cabana-1-portada-2",
    "cabana-1-portada-3",
    "cabana-1-habitacion",
    "cabana-1-habitacion-1",
    "cabana-1-habitacion-2",
    "cabana-1-habitacion-3",
    "cabana-1-habitacion-4",
    "cabana-1-habitacion-5",
    "cabana-1-cocina",
    "cabana-1-comedor",
    "cabana-1-comedor-1",
    "cabana-1-living",
    "cabana-1-living-1",
    "cabana-1-living-2",
    "cabana-1-living-3",
    "cabana-1-baño",
    "cabana-1-baño-1",
    "cabana-1-baño-2",
    "cabana-1-baño-3",
    "cabana-1-cochera",
    "cabana-1-cochera-1",
    "cabana-1-entrada",
    "cabana-1-entrada-1",
    "cabana-1-entrada-2",
  ],
  "2": Array.from({ length: 46 }, (_, i) => `cabana-2-${i + 1}`),
  "3": Array.from({ length: 30 }, (_, i) => `cabana-3-${i + 1}`),
  "4": Array.from({ length: 10 }, (_, i) => `cabana-4-${i + 1}`),
};

export function isReservaCabanaId(value: string): value is ReservaCabanaId {
  return value === "1" || value === "2" || value === "3" || value === "4";
}

export function getReservaCabanaConfig(id: string) {
  if (!isReservaCabanaId(id)) return null;
  return CABANAS_RESERVA[id];
}

export function getReservaCabanaImages(id: string): CabanaImage[] {
  if (!isReservaCabanaId(id)) return [];
  const folder = CABANAS_RESERVA[id].imageFolder;
  return CABANA_IMAGE_FILENAMES[id].map((baseName) => ({
    desktop: `/images/${folder}/${baseName}-desktop.webp`,
    mobile: `/images/${folder}/${baseName}-mobile.webp`,
  }));
}
