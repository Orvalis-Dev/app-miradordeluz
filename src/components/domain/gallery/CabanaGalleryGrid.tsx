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
  const [mobileScrollIndex, setMobileScrollIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [direction, setDirection] = useState(0);

  const containerRef = React.useRef<HTMLDivElement>(null);

  // Manejar scroll en mobile para actualizar los puntos
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.offsetWidth;
    const newIndex = Math.round(scrollLeft / width);
    if (newIndex !== mobileScrollIndex) {
      setMobileScrollIndex(newIndex);
    }
  };

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
      {/* DESKTOP GALLERY (Airbnb Style) */}
      <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 h-[450px] lg:h-[550px] rounded-2xl overflow-hidden relative">
        {/* Main Image (Big) */}
        <div
          className="col-span-2 row-span-2 relative cursor-pointer group overflow-hidden"
          onClick={() => openModal(0)}
        >
          <img
            src={images[0]}
            alt={`${cabanaName} 1`}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        {/* Small Images */}
        {images.slice(1, 5).map((img, idx) => (
          <div
            key={idx}
            className="relative cursor-pointer group overflow-hidden"
            onClick={() => openModal(idx + 1)}
          >
            <img
              src={img}
              alt={`${cabanaName} ${idx + 2}`}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

            {/* "See More" Button on the last small image */}
            {idx === 3 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(0);
                }}
                className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-slate-900 px-4 py-2 rounded-lg font-bold text-sm shadow-lg border border-slate-200 flex items-center gap-2 hover:bg-white transition-all transform hover:scale-105 active:scale-95"
              >
                <Grid size={18} />
                <span>Ver las {images.length} fotos</span>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* MOBILE GALLERY (Carousel Snap) */}
      <div className="md:hidden relative group">
        <div
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide rounded-xl"
          onScroll={handleScroll}
        >
          {images.map((img, idx) => (
            <div
              key={idx}
              className="min-w-full snap-start aspect-[4/3] relative"
              onClick={() => openModal(idx)}
            >
              <img
                src={img}
                alt={`${cabanaName} ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Counter inside image */}
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-bold border border-white/10">
                {idx + 1} / {images.length}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 pointer-events-none">
          {images.slice(0, Math.min(images.length, 8)).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === mobileScrollIndex
                  ? "bg-white w-4 shadow-sm"
                  : "bg-white/40"
              }`}
            />
          ))}
        </div>
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
                <p className="font-montserrat text-xs text-gray-300">
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
