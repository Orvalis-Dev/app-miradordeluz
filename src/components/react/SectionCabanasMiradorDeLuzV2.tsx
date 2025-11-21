import { useState } from 'react';
import type { FC, ReactNode } from 'react';

// Iconos SVG para amenities
const BedIcon: FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const TvIcon: FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const MountainIcon: FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21L12 3l9 18H3z" />
  </svg>
);

const FireIcon: FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
  </svg>
);

const ArrowRightIcon: FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

// Tipo de datos para amenities
type Amenity = {
  icon: ReactNode;
  label: string;
};

// Tipo de datos para cabañas
type Cabana = {
  id: string;
  nombre: string;
  etiqueta: string;
  descripcion: string;
  amenities: Amenity[];
  imagenUrl: string;
};

// Props del componente
interface SectionCabanasMiradorDeLuzV2Props {
  cabanas?: Cabana[];
  onReservar?: (cabanaId: string) => void;
}

// Datos por defecto de las 4 cabañas
const cabanasDefault: Cabana[] = [
  {
    id: '1',
    nombre: 'Cabaña Mirador',
    etiqueta: 'HASTA 4 PERSONAS',
    descripcion: 'La habitación más amplia del complejo. Cuenta con vista panorámica a las montañas, dos dormitorios y todas las comodidades para una experiencia distinta.',
    amenities: [
      { icon: <BedIcon />, label: 'Cama King Size' },
      { icon: <TvIcon />, label: '2 Smart TV 43"' },
      { icon: <MountainIcon />, label: 'Vista a montañas' },
    ],
    imagenUrl: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=1200',
  },
  {
    id: '2',
    nombre: 'Cabaña Bosque',
    etiqueta: 'TAMAÑO 60M²',
    descripcion: 'Una de las cabañas más confortables del complejo. Cuenta con dos livings amplios para disfrutar de la estadía rodeado de naturaleza.',
    amenities: [
      { icon: <BedIcon />, label: 'Cama King Size' },
      { icon: <TvIcon />, label: '2 Smart TV 43"' },
      { icon: <FireIcon />, label: 'Hogar a leña' },
    ],
    imagenUrl: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200',
  },
  {
    id: '3',
    nombre: 'Cabaña Premium',
    etiqueta: 'HASTA 6 PERSONAS',
    descripcion: 'Perfecta para familias grandes. Tres dormitorios amplios, cocina totalmente equipada y deck privado con parrilla.',
    amenities: [
      { icon: <BedIcon />, label: '3 Dormitorios' },
      { icon: <TvIcon />, label: 'Smart TV 50"' },
      { icon: <MountainIcon />, label: 'Deck privado' },
    ],
    imagenUrl: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200',
  },
  {
    id: '4',
    nombre: 'Cabaña Familiar',
    etiqueta: 'HASTA 5 PERSONAS',
    descripcion: 'Ideal para escapadas en familia. Dos dormitorios, amplio living comedor y fogón exterior para disfrutar las noches estrelladas.',
    amenities: [
      { icon: <BedIcon />, label: '2 Dormitorios' },
      { icon: <FireIcon />, label: 'Fogón exterior' },
      { icon: <MountainIcon />, label: 'Vista panorámica' },
    ],
    imagenUrl: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1200',
  },
];

const SectionCabanasMiradorDeLuzV2: FC<SectionCabanasMiradorDeLuzV2Props> = ({
  cabanas = cabanasDefault,
  onReservar,
}) => {
  const [activeCabinIndex, setActiveCabinIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const cabanaActiva = cabanas[activeCabinIndex];

  const handleCabanaChange = (index: number) => {
    if (index === activeCabinIndex || isTransitioning) return;

    setIsTransitioning(true);
    setActiveCabinIndex(index);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const handleReservar = () => {
    if (onReservar) {
      onReservar(cabanaActiva.id);
    } else {
      window.location.href = '/reservas';
    }
  };

  return (
    <section className="w-full bg-stone-50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header con título y descripción */}
        <div className="text-center mb-12 md:mb-16">
          {/* Etiqueta superior */}
          <div className="mb-4">
            <span className="text-xs md:text-sm font-semibold text-amber-600 tracking-[0.3em] uppercase">
              Mirador de Luz
            </span>
          </div>
          
          {/* Título principal */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Nuestras Cabañas
          </h2>
          
          {/* Descripción */}
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Descubre el lugar perfecto para tu escapada. Todas nuestras cabañas cuentan con las comodidades necesarias para una estadía inolvidable.
          </p>
        </div>
        {/* Bloque principal por cada cabaña */}
        <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-0">
            {/* Columna izquierda: Imagen */}
            <div className="relative h-[380px] md:h-[420px] lg:h-[520px] overflow-hidden">
              {/* Imagen de la cabaña con animación */}
              <img
                key={cabanaActiva.id}
                src={cabanaActiva.imagenUrl}
                alt={cabanaActiva.nombre}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  isTransitioning ? 'opacity-0 translate-x-5' : 'opacity-100 translate-x-0'
                }`}
              />

              {/* Dots de navegación sobre la imagen */}
              <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
                {cabanas.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleCabanaChange(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeCabinIndex
                        ? 'bg-amber-500 w-3 h-3 ring-4 ring-amber-500/30'
                        : 'bg-white/60 hover:bg-white/90'
                    }`}
                    aria-label={`Ver cabaña ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Columna derecha: Card blanca superpuesta */}
            <div className="relative lg:-ml-16 z-10">
              <div
                className={`bg-white rounded-none lg:rounded-2xl lg:shadow-xl p-6 md:p-8 h-full flex flex-col justify-center transition-all duration-500 ${
                  isTransitioning ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
                }`}
              >
                {/* Etiqueta superior */}
                <div className="mb-4">
                  <span className="text-xs md:text-sm font-semibold text-amber-600 tracking-[0.2em] uppercase">
                    {cabanaActiva.etiqueta}
                  </span>
                </div>

                {/* Nombre de la cabaña */}
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {cabanaActiva.nombre}
                </h3>

                {/* Descripción */}
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
                  {cabanaActiva.descripcion}
                </p>

                {/* Amenities */}
                <div className="grid grid-cols-1 gap-3 mb-6">
                  {cabanaActiva.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                        {amenity.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{amenity.label}</span>
                    </div>
                  ))}
                </div>

                {/* Línea divisoria */}
                <div className="border-t border-gray-200 my-6" />

                {/* Botón Reservar */}
                <button
                  onClick={handleReservar}
                  className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-full font-semibold text-sm md:text-base hover:from-amber-700 hover:to-amber-800 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl"
                >
                  <span>Reservar</span>
                  <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <ArrowRightIcon />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navegación con flechas (opcional, desktop) */}
        <div className="hidden lg:flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => handleCabanaChange((activeCabinIndex - 1 + cabanas.length) % cabanas.length)}
            className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-amber-600 hover:shadow-lg transition-all disabled:opacity-50"
            disabled={isTransitioning}
            aria-label="Cabaña anterior"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {cabanas.map((cabana, index) => (
              <button
                key={cabana.id}
                onClick={() => handleCabanaChange(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  index === activeCabinIndex
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cabana.nombre.split(' ')[1]}
              </button>
            ))}
          </div>

          <button
            onClick={() => handleCabanaChange((activeCabinIndex + 1) % cabanas.length)}
            className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-amber-600 hover:shadow-lg transition-all disabled:opacity-50"
            disabled={isTransitioning}
            aria-label="Cabaña siguiente"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SectionCabanasMiradorDeLuzV2;

