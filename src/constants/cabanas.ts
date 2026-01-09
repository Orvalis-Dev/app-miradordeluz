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
    nombre: "Cabaña Nº1",
    etiqueta: "HASTA 4 PERSONAS",
    descripcion:
      "Cabaña de fácil acceso y hermosa vista a las sierras. Entrada plana y sin escaleras; Living con cama marinera; cocina amplia con comedor; dormitorio matrimonial y/o individual; baño completo y cómodo.",
    amenities: [
      { icon: "bed", label: "Cama Matrimonial" },
      { icon: "tv", label: 'Smart TV 43"' },
      { icon: "mountain", label: "Vista a montañas" },
      { icon: "parking", label: "Cochera" },
    ],
    imagenUrl: "/images/cabana-1/cabana-1-portada-2-desktop.webp",
    imagenDesktop: "/images/cabins-home/cabana-1-portada-2-desktop.webp",
    imagenMobile: "/images/cabins-home/cabana-1-portada-2-mobile.webp",
    slug: "cabana-1",
  },
  {
    id: "2",
    nombre: "Cabaña Nº2",
    etiqueta: "HASTA 6 PERSONAS",
    descripcion:
      "Cabaña más confortable del complejo. Cuenta con 2 dormitorios matrimoniales y/o individuales; Living con sofá cama con marinera; cocina amplia con comedor; ante baño y baño completo.",
    amenities: [
      { icon: "bed", label: "2 Dormitorios" },
      { icon: "tv", label: 'Smart TV 43"' },
      { icon: "kitchen", label: "Cocina equipada" },
      { icon: "parking", label: "Cochera" },
    ],
    imagenUrl: "/images/cabana-2/cabana-2-1-desktop.webp",
    imagenDesktop: "/images/cabins-home/cabana-2-1-desktop.webp",
    imagenMobile: "/images/cabins-home/cabana-2-1-mobile.webp",
    slug: "cabana-2",
  },
  {
    id: "3",
    nombre: "Cabaña Nº3",
    etiqueta: "MONOAMBIENTE HASTA 4 PERSONAS",
    descripcion:
      "Cabaña de fácil acceso y sin escalones. Cuenta con cama matrimonial y cama marinera; cocina amplia con comedor y baño cómodo.",
    amenities: [
      { icon: "bed", label: "Cama Matrimonial" },
      { icon: "tv", label: 'Smart TV 43"' },
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
    nombre: "Cabaña Nº4",
    etiqueta: "HASTA 6 PERSONAS",
    descripcion:
      "Cabaña más confortable del complejo. Cuenta con 2 dormitorios matrimoniales y/o individuales; Living con sofá cama con marinera; cocina amplia con comedor; ante baño y baño completo.",
    amenities: [
      { icon: "bed", label: "2 Dormitorios" },
      { icon: "tv", label: 'Smart TV 43"' },
      { icon: "kitchen", label: "Cocina completa" },
      { icon: "parking", label: "Cochera" },
    ],
    imagenUrl: "/images/exterior/exterior-42-desktop.webp",
    imagenDesktop: "/images/cabins-home/exterior-42-desktop.webp",
    imagenMobile: "/images/cabins-home/exterior-42-mobile.webp",
    slug: "cabana-4",
  },
];
