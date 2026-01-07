import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Grid, Maximize2 } from "lucide-react";

interface CabanaGalleryGridProps {
  images: string[];
  cabanaName: string;
}

const CabanaGalleryGrid: React.FC<CabanaGalleryGridProps> = ({
  images,
  cabanaName,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);

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

  // Sincronizar scroll mobile cuando cambia currentIndex via flechas
  const scrollToImage = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * scrollRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const newIndex = Math.round(container.scrollLeft / container.offsetWidth);
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const nextIdx = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIdx);
    if (!isModalOpen) scrollToImage(nextIdx);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const prevIdx = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIdx);
    if (!isModalOpen) scrollToImage(prevIdx);
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
  }, [isModalOpen]);

  // Tomamos las primeras 5 fotos para la grilla de Desktop
  const displayImages = images.slice(0, 5);
  const remainingCount = images.length;

  return (
    <div className="w-full">
      {/* --- DESKTOP GRID (1+4) --- */}
      <div className="hidden lg:grid grid-cols-4 grid-rows-2 gap-2 h-[500px] rounded-2xl overflow-hidden relative group">
        {/* Foto Principal (Izquierda) */}
        <div
          className="col-span-2 row-span-2 relative cursor-pointer overflow-hidden"
          onClick={() => openModal(0)}
        >
          <img
            src={displayImages[0]}
            alt={`${cabanaName} - 1`}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300" />
        </div>

        {/* 4 Fotos Menores (Derecha) */}
        {displayImages.slice(1).map((img, idx) => (
          <div
            key={idx}
            className="relative cursor-pointer overflow-hidden"
            onClick={() => openModal(idx + 1)}
          >
            <img
              src={img}
              alt={`${cabanaName} - ${idx + 2}`}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300" />
          </div>
        ))}

        {/* Botón Ver Todas */}
        <button
          onClick={() => openModal(0)}
          className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md hover:bg-white text-slate-900 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-lg transition-all active:scale-95"
        >
          <Grid size={18} />
          <span>Ver las {remainingCount} fotos</span>
        </button>
      </div>

      {/* --- MOBILE CAROUSEL --- */}
      <div className="lg:hidden relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
        <div
          ref={scrollRef}
          onScroll={handleMobileScroll}
          className="flex overflow-x-auto snap-x snap-mandatory h-full scrollbar-hide active:cursor-grabbing"
          style={{ scrollBehavior: "auto" }} // auto para touch, smooth para botones
        >
          {images.map((img, idx) => (
            <div
              key={idx}
              className="w-full h-full flex-shrink-0 snap-center cursor-pointer"
              onClick={() => openModal(idx)}
            >
              <img
                src={img}
                alt={`${cabanaName} - ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.slice(0, Math.min(images.length, 8)).map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === idx ? "bg-white w-4" : "bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Buttons */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevImage();
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 backdrop-blur-sm text-white p-2 rounded-full"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextImage();
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 backdrop-blur-sm text-white p-2 rounded-full"
        >
          <ChevronRight size={20} />
        </button>

        {/* Counter */}
        <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-md">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* --- FULLSCREEN MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-4 md:p-8"
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-4 md:p-8 flex justify-between items-center text-white z-[110]">
              <span className="font-montserrat font-bold text-lg md:text-xl">
                {cabanaName}
              </span>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Cerrar"
              >
                <X size={32} />
              </button>
            </div>

            {/* Main Image */}
            <div className="relative w-full max-w-5xl aspect-[16/9] flex items-center justify-center">
              <motion.img
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                src={images[currentIndex]}
                className="max-w-full max-h-full object-contain shadow-2xl"
              />

              {/* Navigation */}
              <button
                onClick={prevImage}
                className="absolute left-0 md:-left-16 p-3 text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <ChevronLeft size={48} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-0 md:-right-16 p-3 text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <ChevronRight size={48} />
              </button>
            </div>

            {/* Footer / Counter */}
            <div className="absolute bottom-8 text-white font-montserrat">
              <span className="text-lg">
                {currentIndex + 1} / {images.length}
              </span>
            </div>

            {/* Thumbnails (Desktop) */}
            <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 gap-2 overflow-x-auto max-w-[80vw] p-2">
              {/* Opicional: Miniaturas */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CabanaGalleryGrid;
