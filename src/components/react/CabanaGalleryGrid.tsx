import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Grid,
  Maximize2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

interface CabanaGalleryGridProps {
  images: string[];
  cabanaName: string;
  cabanaId: string;
}

const CabanaGalleryGrid: React.FC<CabanaGalleryGridProps> = ({
  images,
  cabanaName,
  cabanaId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [direction, setDirection] = useState(0);

  // Bloquear scroll cuando el modal está abierto
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setDirection(0);
    setIsZoomed(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsZoomed(false);
  };

  const nextImage = useCallback(
    (e?: React.MouseEvent | React.TouchEvent) => {
      e?.stopPropagation();
      setDirection(1);
      setIsZoomed(false);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    },
    [images.length]
  );

  const prevImage = useCallback(
    (e?: React.MouseEvent | React.TouchEvent) => {
      e?.stopPropagation();
      setDirection(-1);
      setIsZoomed(false);
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    },
    [images.length]
  );

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(!isZoomed);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, nextImage, prevImage]);

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
      {/* Grid Uniforme (Opción A) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {images.slice(0, 6).map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg bg-gray-200 shadow-sm transition-all hover:shadow-xl"
            onClick={() => openModal(idx)}
          >
            <img
              src={img}
              alt={`${cabanaName} - ${idx + 1}`}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* Overlay al hacer hover */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="bg-white/20 backdrop-blur-md rounded-full p-2 mb-2 scale-0 group-hover:scale-100 transition-transform duration-500">
                <Maximize2 className="text-white" size={24} />
              </div>
            </div>
            {/* Si es la última foto y hay más, mostramos contador */}
            {idx === 5 && images.length > 6 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="text-white text-center">
                  <p className="text-3xl font-bold">+{images.length - 6}</p>
                  <p className="text-sm font-semibold uppercase tracking-wider">
                    Ver todas
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lightbox / Modal Contextual */}
      <AnimatePresence initial={false}>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm px-4 py-8 md:p-10"
            onClick={closeModal}
          >
            {/* Cabecera del Lightbox */}
            <div className="absolute top-0 left-0 right-0 p-4 md:p-8 flex justify-between items-center z-[110]">
              <div className="text-white">
                <p className="font-montserrat text-lg font-bold">
                  {cabanaName}
                </p>
                <p className="font-montserrat text-xs text-gray-400">
                  {currentIndex + 1} / {images.length}
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
                  onClick={closeModal}
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Navegación Desktop */}
            <button
              className="absolute left-6 top-1/2 z-[110] -translate-y-1/2 rounded-full bg-white/10 p-4 text-white backdrop-blur-md transition-all hover:bg-white/20 hidden md:flex items-center justify-center cursor-pointer border border-white/10"
              onClick={prevImage}
            >
              <ChevronLeft size={32} />
            </button>

            <button
              className="absolute right-6 top-1/2 z-[110] -translate-y-1/2 rounded-full bg-white/10 p-4 text-white backdrop-blur-md transition-all hover:bg-white/20 hidden md:flex items-center justify-center cursor-pointer border border-white/10"
              onClick={nextImage}
            >
              <ChevronRight size={32} />
            </button>

            {/* Contenedor de Imagen con Swipe */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden touch-none">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
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
                {images.slice(0, Math.min(images.length, 10)).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all ${
                      i === currentIndex
                        ? "w-4 bg-orange-500"
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
};

export default CabanaGalleryGrid;
