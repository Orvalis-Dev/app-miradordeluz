import { useState, useRef, useEffect, type FC } from "react";
import TestimonialCard, { type Testimonial } from "./TestimonialCard";

// Iconos de flechas para navegación del carrusel
const ChevronLeftIcon: FC = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

const ChevronRightIcon: FC = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

// Tipo de testimonio extendido con ID
export interface TestimonioExtendido extends Testimonial {
  id: string;
}

interface SectionTestimoniosProps {
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
    id: "1",
    name: "Agustin incorvaia",
    reviewsCount: "3 opiniones",
    date: "Hace un mes",
    text: "Pasamos unas vacaciones increíbles en el complejo. Las instalaciones son excelentes y cuentan con todas las comodidades necesarias para una estadía perfecta. Los dueños, Mariano y Gigi, fueron súper amables y atentos en todo momento, lo que hizo nuestra experiencia aún mejor. Esperamos poder volver pronto. ¡Totalmente recomendable!",
    rating: 5,
  },
  {
    id: "2",
    name: "Vani Elizabeth",
    isLocalGuide: true,
    reviewsCount: "131 opiniones · 30 fotos",
    date: "Hace 4 meses",
    text: "Hermoso lugar unas vistas increíbles hermosa la pileta. La cabaña muy linda bien equipada todo nuevo y muy limpio. La atención de Mariano muy buena. Super recomendable",
    rating: 5,
  },
  {
    id: "3",
    name: "Mariana Gomez",
    isLocalGuide: true,
    reviewsCount: "23 opiniones · 31 fotos",
    date: "Hace 9 meses",
    text: "Hermoso el lugar!! Las habitaciones cuentan con cada detalle para una excelente estadía, tele, WiFi, cocina equipada, aires acondionado en cada espacio, más ventiladores, sobre todo limpieza y excelente trato de sus dueños, Mariano y Gigi súper atentos, la pileta es hermosa profunda e impecable, y la vista excelente, volveremos sin dudarlo!! Excelente relación precio/calidad.",
    rating: 5,
  },
  {
    id: "4",
    name: "ALAN JHONS",
    reviewsCount: "1 opinión",
    date: "una semana atrás",
    isNew: true,
    text: "EXCELENTE LUGAR MUY TRANQUILO.AMABILIDAD MUY BUENA ATENCION Y SERVICIOS HIGIÉNICO Y CÓMODO RECOMENDABLE.!!! Raul y MARY. 🏖🏖🏝🏡…",
    rating: 5,
  },
  {
    id: "5",
    name: "Micaela Ferrero",
    reviewsCount: "4 opiniones",
    date: "Hace 8 meses",
    text: "Hermosas las cabañas, tienen todas las comodidades para pasar una linda e inolvidable estadía. La vista desde las cabañas y la pileta es única!! Para destacar la atención tanto de Mariano como de Gigi. 100% recomendable!!!",
    rating: 5,
  },
  {
    id: "6",
    name: "Claudia Resnik",
    isLocalGuide: true,
    reviewsCount: "253 opiniones · 502 fotos",
    date: "Hace 4 meses",
    text: "Hermoso lugar para descansar, con una vista privilegiada, súper atentos y cálidos los dueños. Muy recomendable!!!",
    rating: 5,
  },
  {
    id: "7",
    name: "MARIA DEL C. LEDEZMA",
    reviewsCount: "7 opiniones · 1 foto",
    date: "Hace 10 meses",
    text: "Es un lugar privilegiado, ideal para descansar y disfrutar tanto de el paisaje, como de la cabaña, muy cómoda y con todos los servicios. La pileta y el parque hermosos. Y la amabilidad y buena atención de sus dueños. Volveremos sin dudas",
    rating: 5,
  },
];

const SectionTestimonios: FC<SectionTestimoniosProps> = ({
  testimonios = DEFAULT_TESTIMONIOS,
  mostrarBoton = true,
  textoBoton = "Ver todas las opiniones en Google Maps",
  onClickBoton,
  autoPlayInterval = 1000,
  pauseOnHover = true,
  googleReviewUrl,
}) => {
  // Estados
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Limitar testimonios a 5 en mobile (DEFINIR PRIMERO)
  const testimoniosMobile = testimonios.slice(0, 5);
  const maxMobileIndex = Math.max(0, testimoniosMobile.length - 1);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const currentTouch = e.targetTouches[0].clientX;
    const diff = touchStart - currentTouch;

    if (diff > 50) {
      handleMobileNext();
      setTouchStart(null);
    } else if (diff < -50) {
      handleMobilePrev();
      setTouchStart(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  const handleClickBoton = () => {
    if (onClickBoton) {
      onClickBoton();
    } else if (googleReviewUrl) {
      // Abrir Google Maps para dejar una reseña
      window.open(googleReviewUrl, "_blank", "noopener,noreferrer");
    } else {
      console.log("Abrir formulario de opinión");
    }
  };

  // Navegación del carrusel (Desktop/Tablet)
  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 4));
  };

  const handleNext = () => {
    const maxIndex = Math.max(0, testimonios.length - 4);
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 4));
  };

  // Navegación Mobile (un item a la vez)
  const handleMobilePrev = () => {
    setMobileIndex((prev) => Math.max(0, prev - 1));
  };

  const handleMobileNext = () => {
    setMobileIndex((prev) => Math.min(maxMobileIndex, prev + 1));
  };

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex >= testimonios.length - 4;

  const isMobilePrevDisabled = mobileIndex === 0;
  const isMobileNextDisabled = mobileIndex >= maxMobileIndex;

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
      className="w-full bg-gradient-to-br from-stone-50 via-stone-100 to-stone-50 py-16 md:py-10 min-h-screen"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Cabecera: título + rating grande */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-montserrat text-[36px] md:text-[48px] lg:text-[56px] font-extrabold text-[#1E1E1E] mb-2">
            Experiencias de Nuestros Huéspedes
          </h2>
          <p className="font-montserrat text-[14px] md:text-[16px] font-medium text-[#4A4A4A] leading-relaxed max-w-2xl mx-auto mb-6">
            Descubrí lo que dicen quienes ya vivieron la experiencia en nuestras
            cabañas
          </p>

          <div className="flex items-center justify-center gap-6">
            <div className="text-[56px] md:text-[72px] lg:text-[80px] font-extrabold text-[#0B1220] -tracking-tighter">
              {averageDisplay}
            </div>
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(averageRating)
                        ? "text-yellow-400"
                        : "text-gray-200"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-[#6B6B6B] mt-1">
                {testimonios.length} opiniones
              </span>
            </div>
          </div>
        </div>

        {/* Carrusel de testimonios */}
        <div
          className="relative mb-8"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Botones de navegación - Desktop */}
          <div className="hidden lg:block"></div>

          {/* Contenedor del carrusel - Desktop */}
          {/* Desktop: mostrar 4 cards de la página actual */}
          <div className="hidden lg:grid grid-cols-4 gap-6 content-stretch transition-all duration-500">
            {testimonios
              .slice(currentIndex, currentIndex + 4)
              .map((testimonio) => (
                <TestimonialCard
                  key={testimonio.id}
                  text={testimonio.text}
                  name={testimonio.name}
                  avatarUrl={testimonio.avatarUrl}
                  rating={testimonio.rating}
                  date={testimonio.date}
                  isLocalGuide={testimonio.isLocalGuide}
                  reviewsCount={testimonio.reviewsCount}
                  isNew={testimonio.isNew}
                />
              ))}
          </div>

          {/* Grid responsive para Tablet */}
          {/* Tablet: 2 por página (si hay) */}
          <div className="hidden md:grid lg:hidden md:grid-cols-2 gap-4 mb-8 content-stretch">
            {testimonios
              .slice(currentIndex, currentIndex + 2)
              .map((testimonio) => (
                <TestimonialCard
                  key={testimonio.id}
                  className="mx-auto"
                  text={testimonio.text}
                  name={testimonio.name}
                  avatarUrl={testimonio.avatarUrl}
                  rating={testimonio.rating}
                  date={testimonio.date}
                  isLocalGuide={testimonio.isLocalGuide}
                  reviewsCount={testimonio.reviewsCount}
                  isNew={testimonio.isNew}
                />
              ))}
          </div>

          {/* Mobile: Carrusel una card a la vez - Solo 5 testimonios */}
          <div className="md:hidden flex flex-col items-center">
            {/* Card actual - Centrada */}
            <div
              className="mb-8 w-full max-w-xs flex justify-center cursor-grab active:cursor-grabbing"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {testimoniosMobile[mobileIndex] && (
                <TestimonialCard
                  text={testimoniosMobile[mobileIndex].text}
                  name={testimoniosMobile[mobileIndex].name}
                  avatarUrl={testimoniosMobile[mobileIndex].avatarUrl}
                  rating={testimoniosMobile[mobileIndex].rating}
                  date={testimoniosMobile[mobileIndex].date}
                  isLocalGuide={testimoniosMobile[mobileIndex].isLocalGuide}
                  reviewsCount={testimoniosMobile[mobileIndex].reviewsCount}
                  isNew={testimoniosMobile[mobileIndex].isNew}
                />
              )}
            </div>

            {/* Flechas de navegación Mobile sin paginación - Color Naranja */}
            <div className="flex items-center justify-center gap-6 mb-4">
              <button
                onClick={handleMobilePrev}
                disabled={isMobilePrevDisabled}
                className={`flex items-center justify-center transition-all duration-200 ${
                  isMobilePrevDisabled
                    ? "opacity-30 cursor-not-allowed"
                    : "text-orange-500 hover:scale-110"
                }`}
                aria-label="Anterior"
              >
                <ChevronLeftIcon />
              </button>

              <div className="flex gap-1.5">
                {testimoniosMobile.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === mobileIndex ? "bg-orange-500 w-4" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleMobileNext}
                disabled={isMobileNextDisabled}
                className={`flex items-center justify-center transition-all duration-200 ${
                  isMobileNextDisabled
                    ? "opacity-30 cursor-not-allowed"
                    : "text-orange-500 hover:scale-110"
                }`}
                aria-label="Siguiente"
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Controles inferiores */}
        {/* Desktop/Tablet: flechas y página CENTRADOS */}
        <div className="hidden md:flex flex-col items-center gap-8 mt-6">
          <div className="flex items-center gap-6">
            <button
              onClick={handlePrev}
              disabled={isPrevDisabled}
              className={`w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center transition-all duration-200 ${
                isPrevDisabled
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:shadow-md hover:text-orange-500"
              }`}
              aria-label="Anterior"
            >
              <ChevronLeftIcon />
            </button>

            <div className="text-sm font-semibold text-[#1E1E1E] bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="text-orange-500">{currentPage}</span> /{" "}
              {totalPages}
            </div>

            <button
              onClick={handleNext}
              disabled={isNextDisabled}
              className={`w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center transition-all duration-200 ${
                isNextDisabled
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:shadow-md hover:text-orange-500"
              }`}
              aria-label="Siguiente"
            >
              <ChevronRightIcon />
            </button>
          </div>

          <div>
            <button
              onClick={handleClickBoton}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border-2 border-[#0B1220] bg-[#0B1220] text-white font-bold shadow-lg transition-all duration-300 hover:bg-white hover:text-[#0B1220] hover:scale-105"
              aria-label={textoBoton}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              {textoBoton}
            </button>
          </div>
        </div>

        {/* Mobile: Botón alargado al final */}
        <div className="md:hidden mt-4">
          <button
            onClick={handleClickBoton}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl border-2 border-[#0B1220] bg-[#0B1220] text-white font-bold shadow-md transition-all duration-200 active:scale-95"
            aria-label={textoBoton}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            {textoBoton}
          </button>
        </div>
      </div>
    </section>
  );
};

export default SectionTestimonios;
