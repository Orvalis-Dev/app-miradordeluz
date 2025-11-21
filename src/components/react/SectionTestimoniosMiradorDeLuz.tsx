import { useState, useRef, useEffect, type FC } from 'react';

// Iconos de flechas para navegación del carrusel
const ChevronLeftIcon: FC = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon: FC = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

// Componente para renderizar estrellas según rating
const RatingStars: FC<{ rating: number }> = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="flex gap-1">
      {stars.map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

// Tipo de testimonio
export interface Testimonio {
  id: string;
  nombre: string;
  fecha: string;
  comentario: string;
  rating: number;
  avatarUrl?: string;
}

interface SectionTestimoniosMiradorDeLuzProps {
  testimonios?: Testimonio[];
  mostrarBoton?: boolean;
  textoBoton?: string;
  onClickBoton?: () => void;
  autoPlayInterval?: number; // Intervalo en milisegundos (default: 4000)
  pauseOnHover?: boolean; // Pausar auto-play al hacer hover (default: true)
}

const SectionTestimoniosMiradorDeLuz: FC<SectionTestimoniosMiradorDeLuzProps> = ({
  testimonios = [
    {
      id: '1',
      nombre: 'Horacio Di Paolo',
      fecha: '7/11/2025',
      comentario: 'Excelente lugar para descansar. Las cabañas son muy cómodas y la atención es increíble.',
      rating: 5,
      avatarUrl: 'https://i.pravatar.cc/150?img=12',
    },
    {
      id: '2',
      nombre: 'Fabri & Yuli',
      fecha: '4/11/2025',
      comentario: 'Reservamos una cabaña para nuestra escapada de fin de semana. Paisaje increíble y atención excelente. Volveremos pronto!',
      rating: 5,
      avatarUrl: 'https://i.pravatar.cc/150?img=25',
    },
    {
      id: '3',
      nombre: 'Alejandro Pazos',
      fecha: '1/11/2025',
      comentario: 'Hemos venido con un grupo de 30 amigos. Excelente todo. Muy recomendable para grupos grandes.',
      rating: 5,
      avatarUrl: 'https://i.pravatar.cc/150?img=33',
    },
    {
      id: '4',
      nombre: 'Alejandro Lezcano',
      fecha: '31/10/2025',
      comentario: 'Ya tengo mi lugar para quedarme cuando visite Tafí. Hotel increíble... Excelente Atención, Servicio y Habitaciones Confortables.',
      rating: 5,
      avatarUrl: 'https://i.pravatar.cc/150?img=68',
    },
    {
      id: '5',
      nombre: 'Patricia González',
      fecha: '29/10/2025',
      comentario: 'Fuimos en familia y las cabañas son súper cómodas. Ideal para desconectar. La vista es hermosa!',
      rating: 5,
      avatarUrl: 'https://i.pravatar.cc/150?img=45',
    },
    {
      id: '6',
      nombre: 'Martín Silva',
      fecha: '25/10/2025',
      comentario: 'Excelente experiencia. Todo muy limpio y ordenado. El personal muy atento. Definitivamente volveremos.',
      rating: 5,
      avatarUrl: 'https://i.pravatar.cc/150?img=51',
    },
  ],
  mostrarBoton = true,
  textoBoton = 'Dejanos tu Opinión',
  onClickBoton,
  autoPlayInterval = 4000, // 4 segundos por defecto
  pauseOnHover = true,
}) => {
  // Estado del carrusel
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Función para obtener iniciales del nombre
  const getInitials = (nombre: string): string => {
    const names = nombre.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return nombre.substring(0, 2).toUpperCase();
  };

  // Generar color de avatar basado en el nombre
  const getAvatarColor = (nombre: string): string => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-red-500',
      'bg-yellow-500',
      'bg-teal-500',
    ];
    const index = nombre.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const handleClickBoton = () => {
    if (onClickBoton) {
      onClickBoton();
    } else {
      // Comportamiento por defecto: abrir formulario o redirigir
      console.log('Abrir formulario de opinión');
    }
  };

  // Navegación del carrusel
  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    const maxIndex = testimonios.length - 4; // Mostrar 4 cards a la vez
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // Verificar si los botones deben estar deshabilitados
  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex >= testimonios.length - 4;

  // Auto-play del carrusel
  useEffect(() => {
    if (pauseOnHover && isHovered) return; // Pausar si está en hover
    if (testimonios.length <= 4) return; // No auto-play si hay 4 o menos cards

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        // Si llegamos al final, volver al inicio
        if (prev >= testimonios.length - 4) {
          return 0;
        }
        return prev + 1;
      });
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [testimonios.length, autoPlayInterval, isHovered, pauseOnHover]);

  // Handlers para pausar auto-play en hover
  const handleMouseEnter = () => {
    if (pauseOnHover) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) setIsHovered(false);
  };

  return (
    <section className="w-full bg-stone-50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Carrusel de testimonios */}
        <div 
          className="relative mb-10"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Botones de navegación - Desktop */}
          <div className="hidden lg:block">
            {/* Botón anterior - Más alejado */}
            <button
              onClick={handlePrev}
              disabled={isPrevDisabled}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10
                        w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center
                        transition-all duration-300
                        ${
                          isPrevDisabled
                            ? 'opacity-30 cursor-not-allowed'
                            : 'hover:bg-gray-50 hover:shadow-xl hover:scale-110'
                        }`}
              aria-label="Anterior"
            >
              <ChevronLeftIcon />
            </button>

            {/* Botón siguiente - Más alejado */}
            <button
              onClick={handleNext}
              disabled={isNextDisabled}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10
                        w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center
                        transition-all duration-300
                        ${
                          isNextDisabled
                            ? 'opacity-30 cursor-not-allowed'
                            : 'hover:bg-gray-50 hover:shadow-xl hover:scale-110'
                        }`}
              aria-label="Siguiente"
            >
              <ChevronRightIcon />
            </button>
          </div>

          {/* Contenedor del carrusel - Desktop */}
          <div className="hidden lg:block overflow-hidden">
            <div
              ref={carouselRef}
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / 4 + 1.5)}%)`,
              }}
            >
              {testimonios.map((testimonio) => (
                <div
                  key={testimonio.id}
                  className="bg-white rounded-xl shadow-md border border-gray-100 p-6 
                           hover:shadow-lg transition-shadow duration-300 flex-shrink-0"
                  style={{ width: 'calc(25% - 18px)' }}
                >
                  {/* Header: Avatar + Nombre + Fecha */}
                  <div className="flex items-start gap-3 mb-3">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      {testimonio.avatarUrl ? (
                        <img
                          src={testimonio.avatarUrl}
                          alt={testimonio.nombre}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div
                          className={`w-10 h-10 rounded-full ${getAvatarColor(
                            testimonio.nombre
                          )} flex items-center justify-center text-white font-semibold text-sm`}
                        >
                          {getInitials(testimonio.nombre)}
                        </div>
                      )}
                    </div>

                    {/* Nombre y Fecha */}
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {testimonio.nombre}
                      </h4>
                      <p className="text-xs text-gray-500">{testimonio.fecha}</p>
                    </div>
                  </div>

                  {/* Estrellas del testimonio */}
                  <div className="mb-3">
                    <RatingStars rating={testimonio.rating} />
                  </div>

                  {/* Comentario */}
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {testimonio.comentario}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Grid responsive para Tablet */}
          <div className="hidden md:grid lg:hidden md:grid-cols-2 gap-6 mb-10">
            {testimonios.map((testimonio) => (
              <div
                key={testimonio.id}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-6 
                         hover:shadow-lg transition-shadow duration-300"
              >
                {/* Header: Avatar + Nombre + Fecha */}
                <div className="flex items-start gap-3 mb-3">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {testimonio.avatarUrl ? (
                      <img
                        src={testimonio.avatarUrl}
                        alt={testimonio.nombre}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className={`w-10 h-10 rounded-full ${getAvatarColor(
                          testimonio.nombre
                        )} flex items-center justify-center text-white font-semibold text-sm`}
                      >
                        {getInitials(testimonio.nombre)}
                      </div>
                    )}
                  </div>

                  {/* Nombre y Fecha */}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm">
                      {testimonio.nombre}
                    </h4>
                    <p className="text-xs text-gray-500">{testimonio.fecha}</p>
                  </div>
                </div>

                {/* Estrellas del testimonio */}
                <div className="mb-3">
                  <RatingStars rating={testimonio.rating} />
                </div>

                {/* Comentario */}
                <p className="text-sm text-gray-700 leading-relaxed">
                  {testimonio.comentario}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile: Scroll horizontal */}
          <div className="md:hidden overflow-x-auto pb-4 mb-10">
            <div className="flex gap-4" style={{ minWidth: 'min-content' }}>
              {testimonios.map((testimonio) => (
                <div
                  key={testimonio.id}
                  className="bg-white rounded-xl shadow-md border border-gray-100 p-4 
                           min-w-[280px] max-w-[320px] flex-shrink-0"
                >
                  {/* Header: Avatar + Nombre + Fecha */}
                  <div className="flex items-start gap-3 mb-3">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      {testimonio.avatarUrl ? (
                        <img
                          src={testimonio.avatarUrl}
                          alt={testimonio.nombre}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div
                          className={`w-10 h-10 rounded-full ${getAvatarColor(
                            testimonio.nombre
                          )} flex items-center justify-center text-white font-semibold text-sm`}
                        >
                          {getInitials(testimonio.nombre)}
                        </div>
                      )}
                    </div>

                    {/* Nombre y Fecha */}
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {testimonio.nombre}
                      </h4>
                      <p className="text-xs text-gray-500">{testimonio.fecha}</p>
                    </div>
                  </div>

                  {/* Estrellas del testimonio */}
                  <div className="mb-3">
                    <RatingStars rating={testimonio.rating} />
                  </div>

                  {/* Comentario */}
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {testimonio.comentario}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Botón "Dejanos tu Opinión" */}
        {mostrarBoton && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleClickBoton}
              className="inline-flex items-center justify-center px-6 py-3 
                       border border-gray-900 rounded-md text-sm font-medium 
                       text-gray-900 bg-transparent hover:bg-gray-100 
                       transition-colors duration-300"
            >
              {textoBoton}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SectionTestimoniosMiradorDeLuz;

