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
    "cabaña-1-portada.webp",
    "cabaña-1-habitacion.webp",
    "cabaña-1-habitacion-1.webp",
    "cabaña-1-habitacion-2.webp",
    "cabaña-1-habitacion-3.webp",
    "cabaña-1-cocina-comedor.webp",
    "cabaña-1-cocina-comedor-2.webp",
    "cabaña-1-comedor.webp",
    "cabaña-1-comedor-2.webp",
    "cabaña-1-comedor-3.webp",
    "cabaña-1-living.webp",
    "cabaña-1-baño.webp",
    "cabaña-1-baño-1.webp",
    "cabaña-1-baño-2.webp",
    "cabaña-1-baño-3.webp",
    "cabaña-1-baño-4.webp",
    "cabaña-1-cochera.webp",
    "cabaña-1-cochera-1.webp",
    "cabaña-1-cochera-2.webp",
  ],
  "2": [
    "cabana-2-1.webp",
    "cabana-2-2.webp",
    "cabana-2-3.webp",
    "cabana-2-4.webp",
    "cabana-2-5.webp",
    "cabana-2-6.webp",
    "cabana-2-7.webp",
    "cabana-2-8.webp",
    "cabana-2-9.webp",
    "cabana-2-10.webp",
    "cabana-2-11.webp",
    "cabana-2-12.webp",
    "cabana-2-13.webp",
    "cabana-2-14.webp",
    "cabana-2-15.webp",
    "cabana-2-16.webp",
    "cabana-2-17.webp",
    "cabana-2-18.webp",
  ],
  "3": [
    "cabaña-3-portada.webp",
    "cabaña-3-portada-1.webp",
    "cabaña-3-habitacion.webp",
    "cabaña-3-habitacion-1.webp",
    "cabaña-3-habitacion-2.webp",
    "cabaña-3-comedor.webp",
    "cabaña-3-comedor-1.webp",
    "cabaña-3-baño.webp",
    "cabaña-3-baño-1.webp",
    "cabaña-3-baño-2.webp",
    "cabaña-3-baño-3.webp",
  ],
  "4": [
    "cabaña-4-portada.webp",
    "cabaña-4-habitacion1.webp",
    "cabaña-4-habitacion1-1.webp",
    "cabaña-4-habitacion2.webp",
    "cabaña-4-habitacion2-1.webp",
    "cabaña-4-comedor-1.webp",
    "cabaña-4-living.webp",
    "cabaña-4-cocina.webp",
    "cabaña-4-antebaño.webp",
    "cabaña-4-asador.webp",
    "cabaña-4-asador-1.webp",
  ],
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
