import { useState, useRef, useEffect, type FC } from 'react';
import TestimonialCard, { type Testimonial } from './TestimonialCard';

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

// Tipo de testimonio extendido con ID
export interface TestimonioExtendido extends Testimonial {
  id: string;
}

interface SectionTestimoniosMiradorDeLuzV2Props {
  testimonios?: TestimonioExtendido[];
  mostrarBoton?: boolean;
  textoBoton?: string;
  onClickBoton?: () => void;
  autoPlayInterval?: number;
  pauseOnHover?: boolean;
  /** URL para dejar una reseña en Google Maps */
  googleReviewUrl?: string;
}

// Testimonios de fallback cuando no hay conexión con Google
const DEFAULT_TESTIMONIOS: TestimonioExtendido[] = [
  {
    id: '1',
    name: 'Horacio Di Paolo',
    subtitle: 'Villa Carlos Paz, Córdoba',
    text: 'Excelente lugar para descansar. Las cabañas son muy cómodas y la atención es increíble.',
    rating: 5,
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: '2',
    name: 'Fabri & Yuli',
    subtitle: 'Buenos Aires, Argentina',
    text: 'Reservamos una cabaña para nuestra escapada de fin de semana. Paisaje increíble y atención excelente. Volveremos pronto!',
    rating: 5,
    avatarUrl: 'https://i.pravatar.cc/150?img=25',
  },
  {
    id: '3',
    name: 'Alejandro Pazos',
    subtitle: 'Rosario, Santa Fe',
    text: 'Hemos venido con un grupo de 30 amigos. Excelente todo. Muy recomendable para grupos grandes.',
    rating: 5,
    avatarUrl: 'https://i.pravatar.cc/150?img=33',
  },
  {
    id: '4',
    name: 'Alejandro Lezcano',
    subtitle: 'Tafí del Valle, Tucumán',
    text: 'Ya tengo mi lugar para quedarme cuando visite Tafí. Hotel increíble... Excelente Atención, Servicio y Habitaciones Confortables.',
    rating: 5,
    avatarUrl: 'https://i.pravatar.cc/150?img=68',
  },
  {
    id: '5',
    name: 'Patricia González',
    subtitle: 'Córdoba Capital',
    text: 'Fuimos en familia y las cabañas son súper cómodas. Ideal para desconectar. La vista es hermosa!',
    rating: 5,
    avatarUrl: 'https://i.pravatar.cc/150?img=45',
  },
  {
    id: '6',
    name: 'Martín Silva',
    subtitle: 'Mendoza, Argentina',
    text: 'Excelente experiencia. Todo muy limpio y ordenado. El personal muy atento. Definitivamente volveremos.',
    rating: 5,
    avatarUrl: 'https://i.pravatar.cc/150?img=51',
  },
  {
    id: '7',
    name: 'Sofía Ramírez',
    subtitle: 'San Luis, Argentina',
    text: 'Un lugar mágico en medio de la naturaleza. Las cabañas tienen todo lo necesario. Perfectas para una escapada romántica.',
    rating: 5,
    avatarUrl: 'https://i.pravatar.cc/150?img=47',
  },
  {
    id: '8',
    name: 'Roberto Fernández',
    subtitle: 'La Rioja, Argentina',
    text: 'Instalaciones impecables y el entorno natural es espectacular. Ideal para quienes buscan tranquilidad y confort.',
    rating: 5,
    avatarUrl: 'https://i.pravatar.cc/150?img=58',
  },
  {
    id: '9',
    name: 'Carolina & Diego',
    subtitle: 'Salta, Argentina',
    text: 'Celebramos nuestro aniversario aquí y fue memorable. Atención personalizada y detalles que hacen la diferencia.',
    rating: 5,
    avatarUrl: 'https://i.pravatar.cc/150?img=36',
  },
  {
    id: '10',
    name: 'Lucas Morales',
    subtitle: 'Catamarca, Argentina',
    text: 'La mejor decisión para nuestras vacaciones. Precio justo, excelente ubicación y paisajes inolvidables.',
    rating: 5,
    avatarUrl: 'https://i.pravatar.cc/150?img=62',
  },
];

const SectionTestimoniosMiradorDeLuzV2: FC<SectionTestimoniosMiradorDeLuzV2Props> = ({
  testimonios = DEFAULT_TESTIMONIOS,
  mostrarBoton = true,
  textoBoton = 'Dejanos tu Opinión',
  onClickBoton,
  autoPlayInterval = 1000,
  pauseOnHover = true,
  googleReviewUrl,
}) => {
  // Estados
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Intersection Observer para detectar cuando la sección entra en viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsExpanded(true);
            }, 80);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleClickBoton = () => {
    if (onClickBoton) {
      onClickBoton();
    } else if (googleReviewUrl) {
      // Abrir Google Maps para dejar una reseña
      window.open(googleReviewUrl, '_blank', 'noopener,noreferrer');
    } else {
      console.log('Abrir formulario de opinión');
    }
  };

  // Navegación del carrusel
  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 4));
  };

  const handleNext = () => {
    const maxIndex = Math.max(0, testimonios.length - 4);
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 4));
  };

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex >= testimonios.length - 4;

  // Cambiar el cálculo de totalPages para 4 items por página
  const totalPages = Math.max(1, Math.ceil(testimonios.length / 4));
  const currentPage = Math.min(totalPages, Math.floor(currentIndex / 4) + 1);

  // No auto-play: la navegación ahora es paginada (3 items por página)

  const handleMouseEnter = () => {
    if (pauseOnHover) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) setIsHovered(false);
  };

  // Calcular rating promedio y paginación
  const averageRating = testimonios.length
    ? testimonios.reduce((s, t) => s + (t.rating || 0), 0) / testimonios.length
    : 5;
  const averageDisplay = (Math.round(averageRating * 10) / 10).toFixed(1);

  return (
    <section
      ref={sectionRef}
      className={`
        w-full bg-gradient-to-br from-stone-50 via-stone-100 to-stone-50
        transition-all duration-500 ease-out
        ${isExpanded
          ? 'py-16 md:py-10 min-h-screen'
          : 'py-10 md:py-10'
        }
      `}
    >
      <div
        className={`
          mx-auto transition-all duration-500 ease-out
          ${isExpanded
            ? 'max-w-7xl px-4 md:px-8 opacity-100 scale-100'
            : 'max-w-5xl px-8 md:px-16 opacity-80 scale-97'
          }
        `}
      >
        {/* Cabecera: título + rating grande */}
        <div className={`
          text-center mb-10 md:mb-14
          transition-all duration-500 delay-100 ease-out
          ${isExpanded
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-6'
          }
        `}>
          <h2 className="font-montserrat text-[36px] md:text-[48px] lg:text-[56px] font-extrabold text-[#1E1E1E] mb-2">
            Experiencias de Nuestros Huéspedes
          </h2>
          <p className="font-montserrat text-[14px] md:text-[16px] font-medium text-[#4A4A4A] leading-relaxed max-w-2xl mx-auto mb-6">
            Descubrí lo que dicen quienes ya vivieron la experiencia en nuestras cabañas
          </p>

          <div className="flex items-center justify-center gap-6">
            <div className="text-[56px] md:text-[72px] lg:text-[80px] font-extrabold text-[#0B1220] -tracking-tighter">
              {averageDisplay}
            </div>
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className={`w-5 h-5 ${i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-[#6B6B6B] mt-1">{testimonios.length} opiniones</span>
            </div>
          </div>
        </div>

        {/* Carrusel de testimonios */}
        <div
          className={`
            relative mb-8
            transition-all duration-500 delay-200 ease-out
            ${isExpanded
              ? 'opacity-100 translate-y-0 blur-0'
              : 'opacity-0 translate-y-8 blur-sm'
            }
          `}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Botones de navegación - Desktop */}
          <div className="hidden lg:block">

          </div>

          {/* Contenedor del carrusel - Desktop */}
          {/* Desktop: mostrar 3 cards de la página actual */}
          <div className="hidden lg:grid grid-cols-4 gap-6">
            {testimonios.slice(currentIndex, currentIndex + 4).map((testimonio, index) => (
              <div
                key={testimonio.id}
                className={`
                  transition-all duration-300 ease-out
                  ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                `}
                style={{
                  justifyItems: 'center',
                  transitionDelay: isExpanded ? `${200 + index * 60}ms` : '0ms'
                }}
              >
                <TestimonialCard
                  text={testimonio.text}
                  name={testimonio.name}
                  subtitle={testimonio.subtitle}
                  avatarUrl={testimonio.avatarUrl}
                  rating={testimonio.rating}
                />
              </div>
            ))}
          </div>

          {/* Grid responsive para Tablet */}
          {/* Tablet: 2 por página (si hay) */}
          <div className="hidden md:grid lg:hidden md:grid-cols-2 gap-4 mb-8">
            {testimonios.slice(currentIndex, currentIndex + 2).map((testimonio, index) => (
              <div
                key={testimonio.id}
                className={`
                  flex justify-center
                  transition-all duration-300 ease-out
                  ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                `}
                style={{
                  transitionDelay: isExpanded ? `${200 + index * 80}ms` : '0ms'
                }}
              >
                <TestimonialCard
                  text={testimonio.text}
                  name={testimonio.name}
                  subtitle={testimonio.subtitle}
                  avatarUrl={testimonio.avatarUrl}
                  rating={testimonio.rating}
                />
              </div>
            ))}
          </div>

          {/* Mobile: Scroll horizontal */}
          {/* Mobile: mostrar hasta 1-2 por página (reusar slice) */}
          <div className="md:hidden overflow-x-auto pb-4 mb-8">
            <div className="flex gap-3 px-3">
              {testimonios.slice(currentIndex, currentIndex + 1).map((testimonio, index) => (
                <div
                  key={testimonio.id}
                  className={`
                    flex-shrink-0
                    transition-all duration-300 ease-out
                    ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}
                  `}
                  style={{
                    transitionDelay: isExpanded ? `${200 + index * 80}ms` : '0ms'
                  }}
                >
                  <TestimonialCard
                    text={testimonio.text}
                    name={testimonio.name}
                    subtitle={testimonio.subtitle}
                    avatarUrl={testimonio.avatarUrl}
                    rating={testimonio.rating}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Controles inferiores: flechas, página y CTA negro */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-6">
            <button
              onClick={handlePrev}
              disabled={isPrevDisabled}
              className={`w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center transition-all duration-200 ${isPrevDisabled ? 'opacity-30 cursor-not-allowed' : 'hover:shadow-md'}`}
              aria-label="Anterior"
            >
              <ChevronLeftIcon />
            </button>

            <div className="text-sm text-[#6B6B6B]">
              Página {currentPage} de {totalPages}
            </div>

            <button
              onClick={handleNext}
              disabled={isNextDisabled}
              className={`w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center transition-all duration-200 ${isNextDisabled ? 'opacity-30 cursor-not-allowed' : 'hover:shadow-md'}`}
              aria-label="Siguiente"
            >
              <ChevronRightIcon />
            </button>
          </div>

          <div>
            <button
              onClick={handleClickBoton}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[18px] border-2 border-[#0B1220] bg-[#0B1220] text-white font-semibold shadow transition-all duration-200 hover:brightness-95"
              aria-label={textoBoton}
            >
              {googleReviewUrl && (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              )}
              {textoBoton}
            </button>
          </div>
        </div>

        {/* CTA removido: se elimina botón visible en la parte inferior */}
      </div>
    </section>
  );
};

export default SectionTestimoniosMiradorDeLuzV2;
