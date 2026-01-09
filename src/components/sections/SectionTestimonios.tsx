import { useState, useRef, useEffect, type FC } from "react";
import { motion } from "framer-motion";
import TestimonialCard, {
  type Testimonial,
} from "@components/common/TestimonialCard";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, FreeMode } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
    id: "0",
    name: "Barby Herrera",
    date: "Hace un año",
    text: "La mejor experiencia que se pueden llevar es visitando este hermoso complejo , tuvimos la oportunidad que nos reciba su dueño mariano , despejo todas nuestras dudas y estuvo atento n todo momento q lo necesitamos . La vista del complejo es una de las cosas más linda que te puede pasar , la comidad de las cabañas excelente y todo muy nuevo y bien equipado . Volvéremos muy pronto 😍",
    rating: 5,
  },
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
  autoPlayInterval = 3000,
  pauseOnHover = true,
  googleReviewUrl,
}) => {
  // Configuración de Swiper
  const swiperOptions = {
    modules: [Navigation, Pagination, Autoplay, FreeMode],
    spaceBetween: 20,
    speed: 600,
    centeredSlides: false,
    loop: true,
    autoplay: {
      delay: autoPlayInterval,
      disableOnInteraction: false,
      pauseOnMouseEnter: pauseOnHover,
    },
    pagination: {
      clickable: true,
      el: ".swiper-pagination-custom",
      renderBullet: (index: number, className: string) => {
        return `<span class="${className} w-2 h-2 rounded-full bg-gray-300 transition-all duration-300 animate-all"></span>`;
      },
    },
    navigation: {
      prevEl: ".swiper-button-prev-custom",
      nextEl: ".swiper-button-next-custom",
    },
    breakpoints: {
      // Mobile
      320: {
        slidesPerView: 1.1,
        spaceBetween: 15,
        centeredSlides: true,
      },
      // Tablet
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
        centeredSlides: false,
      },
      // Desktop
      1024: {
        slidesPerView: 4,
        spaceBetween: 24,
        centeredSlides: false,
      },
    },
  };

  const handleClickBoton = () => {
    if (onClickBoton) {
      onClickBoton();
    } else if (googleReviewUrl) {
      window.open(googleReviewUrl, "_blank", "noopener,noreferrer");
    } else {
      console.log("Abrir formulario de opinión");
    }
  };

  // Calcular rating promedio
  const averageRating = testimonios.length
    ? testimonios.reduce((s, t) => s + (t.rating || 0), 0) / testimonios.length
    : 5;
  const averageDisplay = (Math.round(averageRating * 10) / 10).toFixed(1);

  return (
    <section className="w-full bg-linear-to-br from-stone-50 via-stone-100 to-stone-50 py-16 md:py-20 min-h-200">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Cabecera: título + rating + navegación desktop */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center md:text-left flex-1"
          >
            <h2 className="font-montserrat text-[36px] md:text-[48px] lg:text-[56px] font-extrabold text-[#1E1E1E] leading-tight mb-4">
              Experiencias de <br className="hidden lg:block" /> Nuestros
              Huéspedes
            </h2>
            <p className="font-montserrat text-[14px] md:text-[16px] font-medium text-[#4A4A4A] leading-relaxed max-w-xl mx-auto md:mx-0">
              Descubrí lo que dicen quienes ya vivieron la experiencia en
              nuestras cabañas
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col items-center md:flex-row md:items-center gap-6 md:gap-10"
          >
            {/* Rating Display */}
            <div className="flex items-center gap-6">
              <div className="text-[56px] md:text-[64px] font-extrabold text-[#0B1220] -tracking-tighter leading-none">
                {averageDisplay}
              </div>
              <div className="flex flex-col items-start justify-center">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(averageRating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-[#4a4a4a] mt-1 font-medium whitespace-nowrap">
                  {testimonios.length} opiniones en Google
                </span>
              </div>
            </div>

            {/* Separador vertical sutil para desktop */}
            <div className="hidden md:block w-px h-12 bg-stone-200" />

            {/* Navegación Desktop - Solo visible en pantallas grandes */}
            <div className="hidden md:flex items-center gap-3">
              <button className="swiper-button-prev-custom w-12 h-12 rounded-full bg-white border border-stone-200 shadow-sm flex items-center justify-center text-[#1E1E1E] transition-all duration-300 hover:text-orange-500 hover:border-orange-500 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-30 disabled:cursor-default">
                <ChevronLeftIcon />
              </button>
              <button className="swiper-button-next-custom w-12 h-12 rounded-full bg-white border border-stone-200 shadow-sm flex items-center justify-center text-[#1E1E1E] transition-all duration-300 hover:text-orange-500 hover:border-orange-500 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-30 disabled:cursor-default">
                <ChevronRightIcon />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Carrusel de testimonios con Swiper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="relative mb-12 group"
        >
          <Swiper
            {...swiperOptions}
            grabCursor={true}
            className="testimonios-swiper pb-12! px-4!"
          >
            {testimonios.map((testimonio) => (
              <SwiperSlide key={testimonio.id} className="h-auto py-4">
                <TestimonialCard
                  text={testimonio.text}
                  name={testimonio.name}
                  avatarUrl={testimonio.avatarUrl}
                  rating={testimonio.rating}
                  date={testimonio.date}
                  isLocalGuide={testimonio.isLocalGuide}
                  reviewsCount={testimonio.reviewsCount}
                  isNew={testimonio.isNew}
                  className="h-full mx-auto"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Paginación personalizada - visible en mobile */}
          <div className="swiper-pagination-custom flex justify-center gap-2 mt-4 md:hidden transition-all duration-300"></div>
        </motion.div>

        {/* Botón de acción final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center gap-8"
        >
          <button
            onClick={handleClickBoton}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#0B1220] text-white font-bold shadow-lg transition-all duration-300 hover:bg-[#1a253a] hover:scale-105 active:scale-95"
            aria-label={textoBoton}
          >
            <svg
              className="w-6 h-6 transition-transform group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            {textoBoton}
          </button>
        </motion.div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .swiper-pagination-custom .swiper-pagination-bullet-active {
          background-color: #f97316 !important;
          width: 24px !important;
        }
      `,
        }}
      />
    </section>
  );
};

export default SectionTestimonios;
