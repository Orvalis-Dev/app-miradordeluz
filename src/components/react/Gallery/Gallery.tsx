import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
  title: string;
}

const PREMIUM_IMAGES: GalleryImage[] = [
  {
    src: "/images/cabana-1/cabana-1-portada.webp",
    alt: "Vista principal Cabaña 1",
    title: "Cabaña 1",
  },
  {
    src: "/images/cabana-2/cabana-2-1.webp",
    alt: "Vista principal Cabaña 2",
    title: "Cabaña 2",
  },
  {
    src: "/images/cabana-3/cabana-3-1.webp",
    alt: "Vista principal Cabaña 3",
    title: "Cabaña 3",
  },
  {
    src: "/images/cabana-4/cabana-4-1.webp",
    alt: "Vista principal Cabaña 4",
    title: "Cabaña 4",
  },
  {
    src: "/images/pileta/pileta-2.webp",
    alt: "Piscina bajo el sol",
    title: "Nuestra Piscina",
  },
  {
    src: "/images/pileta/pileta-10.webp",
    alt: "Atardecer en la piscina",
    title: "Relax total",
  },
  {
    src: "/images/exterior/exterior-1.webp",
    alt: "Vistas panorámicas de las sierras",
    title: "Vistas Únicas",
  },
  {
    src: "/images/exterior/exterior-12.webp",
    alt: "Parque y jardines",
    title: "Nuestros Jardines",
  },
  {
    src: "/images/cabana-1/cabana-1-living.webp",
    alt: "Interior acogedor",
    title: "Confort Interior",
  },
  {
    src: "/images/cabana-2/cabana-2-10.webp",
    alt: "Dormitorio de ensueño",
    title: "Tu Descanso",
  },
  {
    src: "/images/exterior/exterior-5.webp",
    alt: "Vistas desde el complejo",
    title: "Entorno Natural",
  },
  {
    src: "/images/exterior/exterior-20.webp",
    alt: "Detalles del complejo",
    title: "Cada detalle cuenta",
  },
  {
    src: "/images/pileta/pileta-16.webp",
    alt: "Zona de solárium",
    title: "Solárium",
  },
  {
    src: "/images/exterior/exterior-15.webp",
    alt: "Espacios comunes",
    title: "Naturaleza Pura",
  },
  {
    src: "/images/cabana-3/cabana-3-10.webp",
    alt: "Detalle interior",
    title: "Calidez",
  },
];

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "auto";
    }
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % PREMIUM_IMAGES.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(
        (selectedIndex - 1 + PREMIUM_IMAGES.length) % PREMIUM_IMAGES.length
      );
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <div className="w-full">
      {/* Grid de Imágenes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PREMIUM_IMAGES.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl bg-gray-200 shadow-md transition-shadow hover:shadow-xl"
            onClick={() => openLightbox(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            {/* Overlay al hacer hover */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Maximize2 className="mb-2 text-white" size={32} />
              <span className="font-montserrat px-4 text-center text-sm font-semibold tracking-wider text-white uppercase">
                {image.title}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 md:p-10"
            onClick={closeLightbox}
          >
            {/* Botón Cerrar */}
            <button
              className="absolute top-6 right-6 z-[110] text-white/70 hover:text-white transition-colors cursor-pointer"
              onClick={closeLightbox}
            >
              <X size={40} strokeWidth={1.5} />
            </button>

            {/* Botón Anterior */}
            <button
              className="absolute left-4 top-1/2 z-[110] -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:bg-white/20 hidden md:block text-white cursor-pointer"
              onClick={prevImage}
            >
              <ChevronLeft size={32} />
            </button>

            {/* Botón Siguiente */}
            <button
              className="absolute right-4 top-1/2 z-[110] -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:bg-white/20 hidden md:block text-white cursor-pointer"
              onClick={nextImage}
            >
              <ChevronRight size={32} />
            </button>

            {/* Contenedor de Imagen */}
            <motion.div
              layoutId={`image-${selectedIndex}`}
              className="relative max-h-full max-w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={PREMIUM_IMAGES[selectedIndex].src}
                alt={PREMIUM_IMAGES[selectedIndex].alt}
                className="max-h-[80vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
              />
              <div className="mt-4 text-center">
                <p className="font-montserrat text-lg font-bold text-white">
                  {PREMIUM_IMAGES[selectedIndex].title}
                </p>
                <p className="font-montserrat text-sm text-gray-400">
                  {selectedIndex + 1} / {PREMIUM_IMAGES.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
