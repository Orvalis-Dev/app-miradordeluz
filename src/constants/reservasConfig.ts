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
    "cabana-1-baño-3",
    "cabana-1-cochera",
    "cabana-1-cochera-1",
    "cabana-1-entrada",
    "cabana-1-entrada-2",
    "cabana-1-bano-ducha-inodoro",
    "cabana-1-bano-lavabo-ducha",
    "cabana-1-exterior-galeria",
  ],
  "2": [
    "cabana-2-1",
    "cabana-2-2",
    "cabana-2-3",
    "cabana-2-4",
    "cabana-2-5",
    "cabana-2-6",
    "cabana-2-7",
    "cabana-2-8",
    "cabana-2-10",
    "cabana-2-11",
    "cabana-2-12",
    "cabana-2-13",
    "cabana-2-14",
    "cabana-2-15",
    "cabana-2-16",
    "cabana-2-17",
    "cabana-2-18",
    "cabana-2-19",
    "cabana-2-20",
    "cabana-2-22",
    "cabana-2-23",
    "cabana-2-24",
    "cabana-2-25",
    "cabana-2-26",
    "cabana-2-27",
    "cabana-2-28",
    "cabana-2-29",
    "cabana-2-30",
    "cabana-2-31",
    "cabana-2-32",
    "cabana-2-33",
    "cabana-2-34",
    "cabana-2-35",
    "cabana-2-36",
    "cabana-2-37",
    "cabana-2-38",
    "cabana-2-39",
  ],
  "3": [
    "cabana-3-1",
    "cabana-3-2",
    "cabana-3-3",
    "cabana-3-4",
    "cabana-3-5",
    "cabana-3-7",
    "cabana-3-8",
    "cabana-3-9",
    "cabana-3-10",
    "cabana-3-11",
    "cabana-3-12",
    "cabana-3-16",
    "cabana-3-17",
    "cabana-3-19",
    "cabana-3-20",
    "cabana-3-21",
    "cabana-3-22",
    "cabana-3-23",
    "cabana-3-24",
    "cabana-3-25",
    "cabana-3-26",
    "cabana-3-27",
    "cabana-3-28",
    "cabana-3-29",
    "cabana-3-30",
    "cabana-3-31",
    "cabana-3-32",
    "cabana-3-33",
    "cabana-3-34",
  ],
  "4": [
    "cabana-4-1",
    "cabana-4-2",
    "cabana-4-3",
    "cabana-4-4",
    "cabana-4-5",
    "cabana-4-6",
    "cabana-4-7",
    "cabana-4-8",
    "cabana-4-9",
    "cabana-4-10",
    "cabana-4-11",
    "cabana-4-12",
    "cabana-4-13",
    "cabana-4-14",
    "cabana-4-15",
    "cabana-4-16",
  ],
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
