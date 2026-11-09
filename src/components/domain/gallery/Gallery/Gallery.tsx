import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

interface GalleryImage {
  srcDesktop: string;
  srcMobile: string;
  alt: string;
  title: string;
}

const PREMIUM_IMAGES: GalleryImage[] = [
  {
    srcDesktop: "/images/gallery/imagen-1-desktop.webp",
    srcMobile: "/images/gallery/imagen-1-mobile.webp",
    alt: "Vista aérea del complejo Mirador de Luz",
    title: "Nuestro Complejo",
  },
  {
    srcDesktop: "/images/gallery/imagen-2-desktop.webp",
    srcMobile: "/images/gallery/imagen-2-mobile.webp",
    alt: "Piscina principal con vista a las sierras",
    title: "Piscina y Relax",
  },
  {
    srcDesktop: "/images/gallery/imagen-3-desktop.webp",
    srcMobile: "/images/gallery/imagen-3-mobile.webp",
    alt: "Todas las comodidades de las cabañas",
    title: "Todas las comodidades",
  },
  {
    srcDesktop: "/images/gallery/imagen-4-desktop.webp",
    srcMobile: "/images/gallery/imagen-4-mobile.webp",
    alt: "Detalle del dormitorio principal",
    title: "Confort Superior",
  },
  {
    srcDesktop: "/images/gallery/imagen-5-desktop.webp",
    srcMobile: "/images/gallery/imagen-5-mobile.webp",
    alt: "Área de estar con ventanales panorámicos",
    title: "Vistas Únicas",
  },
  {
    srcDesktop: "/images/gallery/imagen-6-desktop.webp",
    srcMobile: "/images/gallery/imagen-6-mobile.webp",
    alt: "Estacionamiento amplio y seguro",
    title: "Estacionamiento",
  },
  {
    srcDesktop: "/images/gallery/imagen-7-desktop.webp",
    srcMobile: "/images/gallery/imagen-7-mobile.webp",
    alt: "Exterior de las cabañas en armonía con la naturaleza",
    title: "Arquitectura",
  },
  {
    srcDesktop: "/images/gallery/imagen-8-desktop.webp",
    srcMobile: "/images/gallery/imagen-8-mobile.webp",
    alt: "Jardines y espacios verdes del complejo",
    title: "Naturaleza",
  },
  {
    srcDesktop: "/images/gallery/imagen-9-desktop.webp",
    srcMobile: "/images/gallery/imagen-9-mobile.webp",
    alt: "Confort en cualquier momento del dia",
    title: "Confort a cualquier hora",
  },
  {
    srcDesktop: "/images/gallery/imagen-10-desktop.webp",
    srcMobile: "/images/gallery/imagen-10-mobile.webp",
    alt: "Detalles de decoración y estilo",
    title: "Diseño",
  },
  {
    srcDesktop: "/images/gallery/imagen-11-desktop.webp",
    srcMobile: "/images/gallery/imagen-11-mobile.webp",
    alt: "Baño moderno con terminaciones de calidad",
    title: "Calidad",
  },
  {
    srcDesktop: "/images/gallery/imagen-12-desktop.webp",
    srcMobile: "/images/gallery/imagen-12-mobile.webp",
    alt: "Vistas a las sierras desde el balcón",
    title: "Panorámicas",
  },
  {
    srcDesktop: "/images/gallery/imagen-13-desktop.webp",
    srcMobile: "/images/gallery/imagen-13-mobile.webp",
    alt: "Área de juegos y recreación",
    title: "Diversión",
  },
  {
    srcDesktop: "/images/gallery/imagen-14-desktop.webp",
    srcMobile: "/images/gallery/imagen-14-mobile.webp",
    alt: "Entorno natural y senderos",
    title: "Exploración",
  },
  {
    srcDesktop: "/images/gallery/imagen-15-desktop.webp",
    srcMobile: "/images/gallery/imagen-15-mobile.webp",
    alt: "Atardecer reflejado en la piscina",
    title: "Experiencia Mirador",
  },
];

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [direction, setDirection] = useState(0);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setIsZoomed(false);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    setIsZoomed(false);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "auto";
    }
  };

  const nextImage = useCallback(
    (e?: React.MouseEvent | React.TouchEvent) => {
      e?.stopPropagation();
      setDirection(1);
      setIsZoomed(false);
      if (selectedIndex !== null) {
        setSelectedIndex((selectedIndex + 1) % PREMIUM_IMAGES.length);
      }
    },
    [selectedIndex]
  );

  const prevImage = useCallback(
    (e?: React.MouseEvent | React.TouchEvent) => {
      e?.stopPropagation();
      setDirection(-1);
      setIsZoomed(false);
      if (selectedIndex !== null) {
        setSelectedIndex(
          (selectedIndex - 1 + PREMIUM_IMAGES.length) % PREMIUM_IMAGES.length
        );
      }
    },
    [selectedIndex]
  );

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(!isZoomed);
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
  }, [selectedIndex, nextImage, prevImage]);

  const variants = {
    enter: {
      opacity: 0,
    },
    center: {
      zIndex: 1,
      opacity: 1,
    },
    exit: {
      zIndex: 0,
      opacity: 0,
    },
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="w-full">
      {/* Grid de Imágenes - Opción A: Retícula Uniforme */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {PREMIUM_IMAGES.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group relative aspect-video cursor-pointer overflow-hidden rounded-lg bg-gray-200 shadow-sm transition-all hover:shadow-xl"
            onClick={() => openLightbox(index)}
          >
            <picture className="block h-full w-full">
              <source media="(max-width: 768px)" srcSet={image.srcMobile} />
              <img
                src={image.srcDesktop}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </picture>
            {/* Overlay al hacer hover */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="bg-white/20 backdrop-blur-md rounded-full p-3 mb-3 scale-0 group-hover:scale-100 transition-transform duration-500">
                <Maximize2 className="text-white" size={24} />
              </div>
              <span className="font-montserrat px-4 text-center text-sm font-semibold tracking-widest text-white uppercase drop-shadow-md">
                {image.title}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence initial={false}>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm px-4 py-8 md:p-10"
            onClick={closeLightbox}
          >
            {/* Cabecera del Lightbox */}
            <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-center z-[110]">
              <div className="text-white">
                <p className="font-montserrat text-lg font-bold">
                  {PREMIUM_IMAGES[selectedIndex].title}
                </p>
                <p className="font-montserrat text-xs text-gray-300">
                  {selectedIndex + 1} / {PREMIUM_IMAGES.length}
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  className="text-white/70 hover:text-white transition-colors cursor-pointer bg-white/10 p-2 rounded-full backdrop-blur-md"
                  onClick={toggleZoom}
                  title={isZoomed ? "Quitar Zoom" : "Ampliar"}
                >
                  {isZoomed ? <ZoomOut size={24} /> : <ZoomIn size={24} />}
                </button>
                <button
                  className="text-white/70 hover:text-white transition-colors cursor-pointer bg-white/10 p-2 rounded-full backdrop-blur-md"
                  onClick={closeLightbox}
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Botón Anterior (Solo Desktop) */}
            <button
              className="absolute left-6 top-1/2 z-[110] -translate-y-1/2 rounded-full bg-white/10 p-4 text-white backdrop-blur-md transition-all hover:bg-white/20 hidden md:flex items-center justify-center cursor-pointer border border-white/10"
              onClick={prevImage}
            >
              <ChevronLeft size={32} />
            </button>

            {/* Botón Siguiente (Solo Desktop) */}
            <button
              className="absolute right-6 top-1/2 z-[110] -translate-y-1/2 rounded-full bg-white/10 p-4 text-white backdrop-blur-md transition-all hover:bg-white/20 hidden md:flex items-center justify-center cursor-pointer border border-white/10"
              onClick={nextImage}
            >
              <ChevronRight size={32} />
            </button>

            {/* Contenedor de Imagen con Swipe */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden touch-none">
              <motion.img
                key={selectedIndex}
                src={PREMIUM_IMAGES[selectedIndex].srcDesktop}
                srcSet={`${PREMIUM_IMAGES[selectedIndex].srcMobile} 768w, ${PREMIUM_IMAGES[selectedIndex].srcDesktop} 1200w`}
                sizes="(max-width: 768px) 100vw, 1200px"
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  opacity: { duration: 0.15 },
                }}
                drag={isZoomed ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  if (isZoomed) return;
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    nextImage();
                  } else if (swipe > swipeConfidenceThreshold) {
                    prevImage();
                  }
                }}
                onClick={(e) => e.stopPropagation()}
                className={`
                  max-h-[75vh] md:max-h-[85vh] w-auto max-w-full rounded-lg object-contain shadow-2xl transition-transform duration-300 cursor-grab active:cursor-grabbing
                  ${
                    isZoomed
                      ? "scale-125 md:scale-150 cursor-zoom-out"
                      : "cursor-zoom-in"
                  }
                `}
                onDoubleClick={toggleZoom}
              />
            </div>

            {/* Indicador de Swipe para Mobile */}
            <div className="mt-4 md:hidden text-white/40 text-xs flex flex-col items-center gap-2">
              <div className="flex gap-1">
                {PREMIUM_IMAGES.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all ${
                      i === selectedIndex
                        ? "w-4 bg-amber-500"
                        : "w-1 bg-white/20"
                    }`}
                  />
                ))}
              </div>
              <span>Desliza para navegar</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
