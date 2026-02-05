export type IconName =
  | "wifi"
  | "bed"
  | "fire"
  | "mountain"
  | "tv"
  | "kitchen"
  | "parking";

export type Amenity = {
  label: string;
  icon: IconName;
};

export type Cabana = {
  id: string;
  nombre: string;
  etiqueta: string;
  descripcion: string;
  amenities: Amenity[];
  imagenUrl: string;
  imagenDesktop?: string;
  imagenMobile?: string;
  slug: string;
};

export const cabanas: Cabana[] = [
  {
    id: "1",
    nombre: "Cabaña 1",
    etiqueta: "HASTA 4 PERSONAS",
    descripcion:
      "Diseñada para 4 personas. Combina independencia con todas las comodidades. Incluye asador privado con parrilla individual y cochera semi-cubierta adjunta.",
    amenities: [
      { icon: "wifi", label: "WiFi" },
      { icon: "kitchen", label: "Cocina completa" },
      { icon: "tv", label: 'Smart TV 32"' },
      { icon: "parking", label: "Cochera" },
    ],
    imagenUrl: "/images/cabana-1/cabana-1-portada-2-desktop.webp",
    imagenDesktop: "/images/cabins-home/cabana-1-portada-2-desktop.webp",
    imagenMobile: "/images/cabins-home/cabana-1-portada-2-mobile.webp",
    slug: "cabana-1",
  },
  {
    id: "2",
    nombre: "Cabaña 2",
    etiqueta: "HASTA 6 PERSONAS",
    descripcion:
      "Las unidades más exclusivas para 6 personas. 2 dormitorios definidos y living. Ideales para estadías largas gracias a su equipamiento de cocina superior.",
    amenities: [
      { icon: "bed", label: "2 Dormitorios" },
      { icon: "tv", label: 'Smart TV 32"' },
      { icon: "kitchen", label: "Heladera con Freezer" },
      { icon: "parking", label: "Cochera" },
    ],
    imagenUrl: "/images/cabana-2/cabana-2-1-desktop.webp",
    imagenDesktop: "/images/cabins-home/cabana-2-1-desktop.webp",
    imagenMobile: "/images/cabins-home/cabana-2-1-mobile.webp",
    slug: "cabana-2",
  },
  {
    id: "3",
    nombre: "Cabaña 3",
    etiqueta: "MONOAMBIENTE HASTA 4 PERSONAS",
    descripcion:
      "Opción práctica en planta baja sin escalones, ideal para accesibilidad. Formato monoambiente fluido para 4 personas con cocina completa y asador propio.",
    amenities: [
      { icon: "bed", label: "Cama Matrimonial" },
      { icon: "tv", label: 'Smart TV 32"' },
      { icon: "kitchen", label: "Cocina completa" },
      { icon: "parking", label: "Cochera" },
    ],
    imagenUrl: "/images/cabana-3/cabana-3-3-desktop.webp",
    imagenDesktop: "/images/cabins-home/cabana-3-3-desktop.webp",
    imagenMobile: "/images/cabins-home/cabana-3-3-mobile.webp",
    slug: "cabana-3",
  },
  {
    id: "4",
    nombre: "Cabaña 4",
    etiqueta: "HASTA 6 PERSONAS",
    descripcion:
      "Las unidades más exclusivas para 6 personas. 2 dormitorios definidos y living. Ideales para estadías largas gracias a su equipamiento de cocina superior.",
    amenities: [
      { icon: "bed", label: "2 Dormitorios" },
      { icon: "tv", label: 'Smart TV 32"' },
      { icon: "kitchen", label: "Heladera con Freezer" },
      { icon: "parking", label: "Cochera" },
    ],
    imagenUrl: "/images/exterior/exterior-42-desktop.webp",
    imagenDesktop: "/images/cabins-home/exterior-42-desktop.webp",
    imagenMobile: "/images/cabins-home/exterior-42-mobile.webp",
    slug: "cabana-4",
  },
];
