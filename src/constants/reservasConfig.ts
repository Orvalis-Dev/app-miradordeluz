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
  imageFolder: `cabana-${ReservaCabanaId}`;
};

export const SERVICIOS: string[] = [
  "Heladera",
  "Cocina con horno",
  "Vajilla completa",
  "Tv Led “32” smart",
  "WIFI Alta velocidad",
  "Aire acondicionado Frío/Calor",
  "Ventilador",
  "Ropa blanca",
  "Ropa de cama",
  "Cochera individual",
  "Asador individual",
  "Servicio de Limpieza (Cada 3 días)",
  "Amplia Pileta con solárium húmedo y borde infinito",
  "Hidromasaje",
  "Asesoramiento turístico",
];

export function getServicios(id: string): string[] {
  const isSmallCabana = id === "1" || id === "3";
  const isBigCabana = id === "2" || id === "4";

  const servicios = [
    isBigCabana ? "Heladera con Freezer" : "Heladera",
    "Cocina con horno",
  ];

  if (isBigCabana) {
    servicios.push("Microondas");
  } else {
    // Cabañas 1 y 3 también tienen microondas según descripción
    servicios.push("Microondas");
  }

  servicios.push(
    "Vajilla completa",
    "Tv Led “32” smart",
    "WIFI Alta velocidad",
    "Aire acondicionado Frío/Calor",
    "Ventilador",
    "Ropa blanca",
    "Ropa de cama",
    "Cochera individual",
    "Asador individual",
    "Servicio de Limpieza (Cada 3 días)",
    "Amplia Pileta con solárium húmedo y borde infinito",
    "Hidromasaje",
    "Asesoramiento turístico",
  );

  return servicios;
}

export const CABANAS_RESERVA: Record<ReservaCabanaId, ReservaCabanaConfig> = {
  "1": {
    id: "1",
    nombre: "Cabaña 1",
    capacidad: 4,
    precio_base: 85000,
    imageFolder: "cabana-1",
  },
  "2": {
    id: "2",
    nombre: "Cabaña 2",
    capacidad: 6,
    precio_base: 110000,
    imageFolder: "cabana-2",
  },
  "3": {
    id: "3",
    nombre: "Cabaña 3",
    capacidad: 4,
    precio_base: 98000,
    imageFolder: "cabana-3",
  },
  "4": {
    id: "4",
    nombre: "Cabaña 4",
    capacidad: 6,
    precio_base: 135000,
    imageFolder: "cabana-4",
  },
};

const CABANA_IMAGE_FILENAMES: Record<ReservaCabanaId, string[]> = {
  "1": [
    "cabana-1-portada",
    "cabana-1-portada-1",
    "cabana-1-portada-3",
    "cabana-1-habitacion",
    "cabana-1-habitacion-2",
    "cabana-1-habitacion-3",
    "cabana-1-cocina",
    "cabana-1-comedor",
    "cabana-1-comedor-1",
    "cabana-1-living",
    "cabana-1-living-2",
    "cabana-1-living-3",
    "cabana-1-baño",
    "cabana-1-baño-1",
    "cabana-1-baño-2",
    "cabana-1-baño-3",
    "cabana-1-cochera",
    "cabana-1-cochera-1",
    "cabana-1-entrada",
    "cabana-1-entrada-2",
  ],
  "2": Array.from({ length: 25 }, (_, i) => `cabana-2-${i + 1}`),
  "3": Array.from({ length: 27 }, (_, i) => `cabana-3-${i + 1}`),
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
