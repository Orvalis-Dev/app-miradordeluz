'use client';

import { useState, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cabanas, type GalleryImage } from '@/data/images';

interface ModalState {
  isOpen: boolean;
  currentImageIndex: number;
  images: GalleryImage[];
}

export function GaleriaConNombres({ cabanaid = 1 }: { cabanaid?: number | string }) {
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    currentImageIndex: 0,
    images: []
  });

  // Obtener datos de la cabaña
  const cabana = useMemo(() => {
    return cabanas.find(c => c.id === cabanaid);
  }, [cabanaid]);

  // Obtener imágenes desde el sistema de archivos dinámicamente
  const images = useMemo(() => {
    if (!cabana) return [];

    // Si ya tiene imágenes cargadas, usarlas
    if (cabana.images.length > 0) {
      return cabana.images;
    }

    // Si no, generar URLs dinámicamente basadas en el número de imágenes
    return Array.from({ length: cabana.totalImages }, (_, i) => ({
      id: i + 1,
      url: `/images/cabana-${cabana.id}/cabana-${cabana.id}-${i + 1}.webp`,
      title: `Imagen ${i + 1}`,
      filename: `cabana-${cabana.id}-${i + 1}.webp`
    }));
  }, [cabana]);

  const openModal = (index: number, imageList: GalleryImage[]) => {
    setModal({
      isOpen: true,
      currentImageIndex: index,
      images: imageList
    });
  };

  const closeModal = () => {
    setModal(prev => ({ ...prev, isOpen: false }));
  };

  const goToPrevious = () => {
    setModal(prev => ({
      ...prev,
      currentImageIndex: (prev.currentImageIndex - 1 + prev.images.length) % prev.images.length
    }));
  };

  const goToNext = () => {
    setModal(prev => ({
      ...prev,
      currentImageIndex: (prev.currentImageIndex + 1) % prev.images.length
    }));
  };

  if (!cabana) {
    return <div className="text-center py-8 text-slate-600">Cabaña no encontrada</div>;
  }

  const currentImage = modal.images[modal.currentImageIndex];

  return (
    <div className="w-full">
      {/* Encabezado */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">{cabana.nombre}</h2>
        <p className="text-slate-600">{images.length} imágenes disponibles</p>
      </div>

      {/* Grid de imágenes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="group relative aspect-square overflow-hidden rounded-lg bg-slate-200 cursor-pointer"
            onClick={() => openModal(index, images)}
          >
            {/* Imagen */}
            <img
              src={image.url}
              alt={image.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
              }}
            />

            {/* Overlay con título */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="text-white font-semibold text-sm">{image.title}</h3>
              <p className="text-white/80 text-xs">{image.filename}</p>
            </div>

            {/* Badge de número */}
            <div className="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              {image.id}/{images.length}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Lightbox */}
      {modal.isOpen && currentImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Botón cerrar */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-full transition-colors z-10"
            aria-label="Cerrar"
          >
            <X size={24} />
          </button>

          {/* Contenedor principal */}
          <div
            className="flex flex-col max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Imagen principal */}
            <div className="relative flex-1 flex items-center justify-center mb-4">
              <img
                src={currentImage.url}
                alt={currentImage.title}
                className="max-h-[70vh] max-w-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />

              {/* Botones de navegación */}
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 text-white hover:bg-white/20 p-3 rounded-full transition-colors"
                aria-label="Anterior"
              >
                <ChevronLeft size={32} />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 text-white hover:bg-white/20 p-3 rounded-full transition-colors"
                aria-label="Siguiente"
              >
                <ChevronRight size={32} />
              </button>
            </div>

            {/* Información de la imagen */}
            <div className="bg-black/50 text-white p-4 rounded-lg mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{currentImage.title}</h3>
                  <p className="text-white/70 text-sm font-mono">{currentImage.filename}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-orange-500">
                    {modal.currentImageIndex + 1}
                  </div>
                  <div className="text-white/70 text-sm">de {modal.images.length}</div>
                </div>
              </div>
            </div>

            {/* Miniaturas */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {modal.images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setModal(prev => ({ ...prev, currentImageIndex: idx }))}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
                    idx === modal.currentImageIndex
                      ? 'ring-2 ring-orange-500 opacity-100'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}





