export type GalleryCategory =
  | "all"
  | "cabana1"
  | "cabana2"
  | "cabana3"
  | "cabana4"
  | "pileta"
  | "exterior";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: Exclude<GalleryCategory, "all">;
  featured?: boolean;
}

export const CATEGORIES: Array<{ id: GalleryCategory; label: string }> = [
  { id: "all", label: "Todas" },
  { id: "cabana1", label: "Cabaña 1" },
  { id: "cabana2", label: "Cabaña 2" },
  { id: "cabana3", label: "Cabaña 3" },
  { id: "cabana4", label: "Cabaña 4" },
  { id: "pileta", label: "Pileta" },
  { id: "exterior", label: "Exterior" },
];

// Mapeo de imágenes locales desde /public/images/cabana-X/
export const GALLERY_IMAGES: GalleryImage[] = [
  // Cabaña 1
  {
    id: "cabana1-01",
    src: "/images/cabana-1/cabaña-1-portada.webp",
    alt: "Portada de Cabaña 1 - Mirador de Luz",
    title: "Entrada Principal",
    category: "cabana1",
  },
  {
    id: "cabana1-02",
    src: "/images/cabana-1/cabaña-1-living.webp",
    alt: "Sala de estar con luz natural en Cabaña 1",
    title: "Living Acogedor",
    category: "cabana1",
  },
  {
    id: "cabana1-03",
    src: "/images/cabana-1/cabaña-1-habitacion.webp",
    alt: "Dormitorio principal en Cabaña 1",
    title: "Dormitorio Principal",
    category: "cabana1",
  },
  {
    id: "cabana1-04",
    src: "/images/cabana-1/cabaña-1-habitacion-1.webp",
    alt: "Habitación adicional en Cabaña 1",
    title: "Habitación 2",
    category: "cabana1",
  },
  {
    id: "cabana1-05",
    src: "/images/cabana-1/cabaña-1-habitacion-2.webp",
    alt: "Habitación adicional en Cabaña 1",
    title: "Habitación 3",
    category: "cabana1",
  },
  {
    id: "cabana1-06",
    src: "/images/cabana-1/cabaña-1-habitacion-3.webp",
    alt: "Habitación adicional en Cabaña 1",
    title: "Habitación 4",
    category: "cabana1",
  },
  {
    id: "cabana1-07",
    src: "/images/cabana-1/cabaña-1-comedor.webp",
    alt: "Comedor en Cabaña 1",
    title: "Comedor",
    category: "cabana1",
  },
  {
    id: "cabana1-08",
    src: "/images/cabana-1/cabaña-1-comedor-2.webp",
    alt: "Zona de comedor adicional en Cabaña 1",
    title: "Comedor 2",
    category: "cabana1",
  },
  {
    id: "cabana1-09",
    src: "/images/cabana-1/cabaña-1-comedor-3.webp",
    alt: "Espacio de comedor en Cabaña 1",
    title: "Comedor 3",
    category: "cabana1",
  },
  {
    id: "cabana1-10",
    src: "/images/cabana-1/cabaña-1-cocina-comedor.webp",
    alt: "Cocina integrada con comedor en Cabaña 1",
    title: "Cocina Comedor",
    category: "cabana1",
  },
  {
    id: "cabana1-11",
    src: "/images/cabana-1/cabaña-1-cocina-comedor-2.webp",
    alt: "Cocina completa en Cabaña 1",
    title: "Cocina",
    category: "cabana1",
  },
  {
    id: "cabana1-12",
    src: "/images/cabana-1/cabaña-1-baño.webp",
    alt: "Baño principal en Cabaña 1",
    title: "Baño Principal",
    category: "cabana1",
  },
  {
    id: "cabana1-13",
    src: "/images/cabana-1/cabaña-1-baño-1.webp",
    alt: "Baño adicional en Cabaña 1",
    title: "Baño 2",
    category: "cabana1",
  },
  {
    id: "cabana1-14",
    src: "/images/cabana-1/cabaña-1-baño-2.webp",
    alt: "Baño adicional en Cabaña 1",
    title: "Baño 3",
    category: "cabana1",
  },
  {
    id: "cabana1-15",
    src: "/images/cabana-1/cabaña-1-baño-3.webp",
    alt: "Baño adicional en Cabaña 1",
    title: "Baño 4",
    category: "cabana1",
  },
  {
    id: "cabana1-16",
    src: "/images/cabana-1/cabaña-1-baño-4.webp",
    alt: "Baño adicional en Cabaña 1",
    title: "Baño 5",
    category: "cabana1",
  },
  {
    id: "cabana1-17",
    src: "/images/cabana-1/cabaña-1-cochera.webp",
    alt: "Cochera de Cabaña 1",
    title: "Cochera",
    category: "cabana1",
  },
  {
    id: "cabana1-18",
    src: "/images/cabana-1/cabaña-1-cochera-1.webp",
    alt: "Estacionamiento en Cabaña 1",
    title: "Cochera 2",
    category: "cabana1",
  },
  {
    id: "cabana1-19",
    src: "/images/cabana-1/cabaña-1-cochera-2.webp",
    alt: "Área de estacionamiento en Cabaña 1",
    title: "Cochera 3",
    category: "cabana1",
  },

  // Cabaña 2
  {
    id: "cabana2-01",
    src: "/images/cabana-2/cabaña-2-portada.webp",
    alt: "Portada de Cabaña 2 - Mirador de Luz",
    title: "Fachada Principal",
    category: "cabana2",
  },
  {
    id: "cabana2-02",
    src: "/images/cabana-2/cabana-2-2.webp",
    alt: "Acceso a Cabaña 2",
    title: "Acceso",
    category: "cabana2",
  },
  {
    id: "cabana2-03",
    src: "/images/cabana-2/cabaña-2-living.webp",
    alt: "Sala de estar en Cabaña 2",
    title: "Living",
    category: "cabana2",
  },
  {
    id: "cabana2-04",
    src: "/images/cabana-2/cabaña-2-living-1.webp",
    alt: "Living adicional en Cabaña 2",
    title: "Living 2",
    category: "cabana2",
  },
  {
    id: "cabana2-05",
    src: "/images/cabana-2/cabaña-2-living-2.webp",
    alt: "Área de estar en Cabaña 2",
    title: "Living 3",
    category: "cabana2",
  },
  {
    id: "cabana2-06",
    src: "/images/cabana-2/cabaña-2-living-3.webp",
    alt: "Living luminoso en Cabaña 2",
    title: "Living 4",
    category: "cabana2",
  },
  {
    id: "cabana2-07",
    src: "/images/cabana-2/cabaña-2-habitacion1.webp",
    alt: "Dormitorio principal en Cabaña 2",
    title: "Dormitorio 1",
    category: "cabana2",
  },
  {
    id: "cabana2-08",
    src: "/images/cabana-2/cabaña-2-habitacion1-1.webp",
    alt: "Dormitorio adicional en Cabaña 2",
    title: "Dormitorio 1B",
    category: "cabana2",
  },
  {
    id: "cabana2-09",
    src: "/images/cabana-2/cabaña-2-habitacion2.webp",
    alt: "Dormitorio 2 en Cabaña 2",
    title: "Dormitorio 2",
    category: "cabana2",
  },
  {
    id: "cabana2-10",
    src: "/images/cabana-2/cabaña-2-habitacion2-1.webp",
    alt: "Dormitorio 2 adicional en Cabaña 2",
    title: "Dormitorio 2B",
    category: "cabana2",
  },
  {
    id: "cabana2-11",
    src: "/images/cabana-2/cabaña-2-habitacion2-2.webp",
    alt: "Dormitorio adicional en Cabaña 2",
    title: "Dormitorio 2C",
    category: "cabana2",
  },
  {
    id: "cabana2-12",
    src: "/images/cabana-2/cabaña-2-comedor.webp",
    alt: "Comedor en Cabaña 2",
    title: "Comedor",
    category: "cabana2",
  },
  {
    id: "cabana2-13",
    src: "/images/cabana-2/cabaña-2-comedor-1.webp",
    alt: "Comedor adicional en Cabaña 2",
    title: "Comedor 2",
    category: "cabana2",
  },
  {
    id: "cabana2-14",
    src: "/images/cabana-2/cabaña-2-baño.webp",
    alt: "Baño principal en Cabaña 2",
    title: "Baño Principal",
    category: "cabana2",
  },
  {
    id: "cabana2-15",
    src: "/images/cabana-2/cabaña-2-baño-1.webp",
    alt: "Baño adicional en Cabaña 2",
    title: "Baño 2",
    category: "cabana2",
  },
  {
    id: "cabana2-16",
    src: "/images/cabana-2/cabaña-2-asador.webp",
    alt: "Asador en Cabaña 2",
    title: "Asador",
    category: "cabana2",
  },
  {
    id: "cabana2-17",
    src: "/images/cabana-2/cabaña-2-asador-1.webp",
    alt: "Zona de asado en Cabaña 2",
    title: "Asador 2",
    category: "cabana2",
  },
  {
    id: "cabana2-18",
    src: "/images/cabana-2/cabaña-2-antebaño.webp",
    alt: "Antesala en Cabaña 2",
    title: "Antesala",
    category: "cabana2",
  },

  // Cabaña 3
  {
    id: "cabana3-01",
    src: "/images/cabana-3/cabaña-3-portada.webp",
    alt: "Portada de Cabaña 3 - Mirador de Luz",
    title: "Fachada Principal",
    category: "cabana3",
  },
  {
    id: "cabana3-02",
    src: "/images/cabana-3/cabaña-3-portada-1.webp",
    alt: "Entrada de Cabaña 3",
    title: "Entrada",
    category: "cabana3",
  },
  {
    id: "cabana3-03",
    src: "/images/cabana-3/cabaña-3-habitacion.webp",
    alt: "Dormitorio en Cabaña 3",
    title: "Dormitorio",
    category: "cabana3",
  },
  {
    id: "cabana3-04",
    src: "/images/cabana-3/cabaña-3-habitacion-1.webp",
    alt: "Dormitorio adicional en Cabaña 3",
    title: "Dormitorio 2",
    category: "cabana3",
  },
  {
    id: "cabana3-05",
    src: "/images/cabana-3/cabaña-3-habitacion-2.webp",
    alt: "Dormitorio adicional en Cabaña 3",
    title: "Dormitorio 3",
    category: "cabana3",
  },
  {
    id: "cabana3-06",
    src: "/images/cabana-3/cabaña-3-comedor.webp",
    alt: "Comedor en Cabaña 3",
    title: "Comedor",
    category: "cabana3",
  },
  {
    id: "cabana3-07",
    src: "/images/cabana-3/cabaña-3-comedor-1.webp",
    alt: "Comedor adicional en Cabaña 3",
    title: "Comedor 2",
    category: "cabana3",
  },
  {
    id: "cabana3-08",
    src: "/images/cabana-3/cabaña-3-baño.webp",
    alt: "Baño principal en Cabaña 3",
    title: "Baño Principal",
    category: "cabana3",
  },
  {
    id: "cabana3-09",
    src: "/images/cabana-3/cabaña-3-baño-1.webp",
    alt: "Baño adicional en Cabaña 3",
    title: "Baño 2",
    category: "cabana3",
  },
  {
    id: "cabana3-10",
    src: "/images/cabana-3/cabaña-3-baño-2.webp",
    alt: "Baño adicional en Cabaña 3",
    title: "Baño 3",
    category: "cabana3",
  },
  {
    id: "cabana3-11",
    src: "/images/cabana-3/cabaña-3-baño-3.webp",
    alt: "Baño adicional en Cabaña 3",
    title: "Baño 4",
    category: "cabana3",
  },

  // Cabaña 4
  {
    id: "cabana4-01",
    src: "/images/cabana-4/cabaña-4-portada.webp",
    alt: "Portada de Cabaña 4 - Mirador de Luz",
    title: "Fachada Principal",
    category: "cabana4",
  },
  {
    id: "cabana4-02",
    src: "/images/cabana-4/cabaña-4-living.webp",
    alt: "Sala de estar en Cabaña 4",
    title: "Living",
    category: "cabana4",
  },
  {
    id: "cabana4-03",
    src: "/images/cabana-4/cabaña-4-habitacion1.webp",
    alt: "Dormitorio principal en Cabaña 4",
    title: "Dormitorio 1",
    category: "cabana4",
  },
  {
    id: "cabana4-04",
    src: "/images/cabana-4/cabaña-4-habitacion1-1.webp",
    alt: "Dormitorio adicional en Cabaña 4",
    title: "Dormitorio 1B",
    category: "cabana4",
  },
  {
    id: "cabana4-05",
    src: "/images/cabana-4/cabaña-4-habitacion2.webp",
    alt: "Dormitorio 2 en Cabaña 4",
    title: "Dormitorio 2",
    category: "cabana4",
  },
  {
    id: "cabana4-06",
    src: "/images/cabana-4/cabaña-4-habitacion2-1.webp",
    alt: "Dormitorio 2 adicional en Cabaña 4",
    title: "Dormitorio 2B",
    category: "cabana4",
  },
  {
    id: "cabana4-07",
    src: "/images/cabana-4/cabaña-4-comedor-1.webp",
    alt: "Comedor en Cabaña 4",
    title: "Comedor",
    category: "cabana4",
  },
  {
    id: "cabana4-08",
    src: "/images/cabana-4/cabaña-4-cocina.webp",
    alt: "Cocina en Cabaña 4",
    title: "Cocina",
    category: "cabana4",
  },
  {
    id: "cabana4-09",
    src: "/images/cabana-4/cabaña-4-asador.webp",
    alt: "Asador en Cabaña 4",
    title: "Asador",
    category: "cabana4",
  },
  {
    id: "cabana4-10",
    src: "/images/cabana-4/cabaña-4-asador-1.webp",
    alt: "Zona de asado en Cabaña 4",
    title: "Asador 2",
    category: "cabana4",
  },
  {
    id: "cabana4-11",
    src: "/images/cabana-4/cabaña-4-antebaño.webp",
    alt: "Antesala en Cabaña 4",
    title: "Antesala",
    category: "cabana4",
  },
];
