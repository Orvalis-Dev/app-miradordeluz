import { useState, useEffect, useRef, type FC } from "react";

interface SectionHeroIntermedioProps {
  backgroundImage?: string;
  backgroundVideo?: string;
  subheading?: string;
  title?: string;
  overlayOpacity?: "light" | "medium" | "dark" | "darker";
  accentColor?: string;
  hideNavbar?: boolean; // Nueva prop para controlar si se oculta el navbar
  maxHeight?: string; // Altura máxima cuando está expandido (ej: '75vh', '80vh', '100vh')
}

const SectionHeroIntermedio: FC<SectionHeroIntermedioProps> = ({
  backgroundImage = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920",
  backgroundVideo,
  subheading = "CERCA DE TODO",
  title = "Naturaleza & Confort.\nEn el Mirador de la Montaña.",
  overlayOpacity = "medium",
  accentColor = "text-amber-300",
  hideNavbar = true,
  maxHeight = "100vh",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  // Mapear opacidad del overlay
  const overlayClasses = {
    light: "bg-black/20",
    medium: "bg-black/25",
    dark: "bg-black/30",
    darker: "bg-black/40",
  };

  // Intersection Observer para detectar cuando la sección está visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            // Delay para la expansión
            setTimeout(() => {
              setIsExpanded(true);
            }, 100);

            // Reproducir video cuando la sección esté visible
            if (videoRef.current) {
              videoRef.current.play().catch((err) => {
                console.log("Error al reproducir video:", err);
              });
              setHasPlayed(true);
            }
          } else {
            // Solo pausar si el usuario scrollea hacia arriba (sale completamente de la vista)
            // Verificamos si el video ya se reprodujo y si la sección está por encima del viewport
            const rect = entry.boundingClientRect;
            const isScrollingUp = rect.bottom < 0;

            if (isScrollingUp && hasPlayed) {
              setIsInView(false);
              setIsExpanded(false);

              // Pausar video solo cuando sale completamente hacia arriba
              if (videoRef.current) {
                videoRef.current.pause();
              }
              setHasPlayed(false);
            }
          }
        });
      },
      {
        threshold: 0.3, // Se activa cuando el 30% de la sección es visible
        rootMargin: "0px",
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
  }, [hasPlayed]);

  // Efecto para ocultar/mostrar el navbar
  useEffect(() => {
    if (!hideNavbar) return;

    if (isInView) {
      // Agregar clase al body para ocultar navbar
      document.body.classList.add("hide-navbar");
    } else {
      // Remover clase del body
      document.body.classList.remove("hide-navbar");
    }

    // Cleanup al desmontar el componente
    return () => {
      document.body.classList.remove("hide-navbar");
    };
  }, [isInView, hideNavbar]);

  // Convertir saltos de línea en el título
  const renderTitle = () => {
    const lines = title.split("\n");
    return lines.map((line, index) => (
      <span key={index} className="block">
        {line}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      className={`
        relative overflow-hidden mx-auto
        transition-all duration-1000 ease-out
        ${
          isExpanded
            ? "w-full rounded-none shadow-none"
            : "h-[60vh] w-[95%] md:w-[85%] lg:w-[60%] rounded-2xl shadow-2xl"
        }
      `}
      style={{
        height: isExpanded ? maxHeight : undefined,
        minHeight: isExpanded ? maxHeight : undefined,
      }}
    >
      {/* Video de fondo o Imagen de fondo */}
      {backgroundVideo ? (
        <div className="absolute inset-0">
          <video
            id="hero-intermedio-video"
            ref={videoRef}
            className={`
              absolute inset-0 w-full h-full object-cover
              transition-all duration-1000 ease-out
              ${isExpanded ? "scale-100" : "scale-110"}
            `}
            src={backgroundVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="Video del complejo de cabañas y su entorno natural"
          />
          {/* Overlay oscuro */}
          <div
            className={`
              absolute inset-0 transition-opacity duration-1000
              ${overlayClasses[overlayOpacity]}
              ${isExpanded ? "opacity-100" : "opacity-80"}
            `}
          />
        </div>
      ) : (
        <div
          className={`
            absolute inset-0 bg-cover bg-center bg-no-repeat
            transition-all duration-1000 ease-out
            ${isExpanded ? "scale-100" : "scale-110"}
          `}
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: "center center",
          }}
          role="img"
          aria-label="Paisaje de las sierras de Córdoba rodeando el complejo"
        >
          {/* Overlay oscuro */}
          <div
            className={`
              absolute inset-0 transition-opacity duration-1000
              ${overlayClasses[overlayOpacity]}
              ${isExpanded ? "opacity-100" : "opacity-80"}
            `}
          />
        </div>
      )}

      {/* Contenido centrado */}
      <div
        className={`
          absolute inset-0 flex flex-col items-center justify-center text-center px-4
          transition-all duration-1000 delay-200 ease-out
          ${
            isExpanded
              ? "opacity-100 translate-y-0"
              : "opacity-70 translate-y-4"
          }
        `}
      >
        {/* Etiqueta superior */}
        {subheading && (
          <div
            className={`
              mb-4 md:mb-6
              transition-all duration-1000 delay-300 ease-out
              ${
                isExpanded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4"
              }
            `}
          >
            <span
              className={`font-montserrat text-[14px] font-semibold ${accentColor} tracking-[0.2em] uppercase`}
              style={{ textShadow: "0 2px 4px rgba(0,0,0,0.7)" }}
            >
              {subheading}
            </span>
          </div>
        )}

        {/* Título principal */}
        <h2
          className={`
            font-montserrat text-[36px] md:text-[48px] lg:text-[64px] font-bold text-white leading-tight max-w-4xl px-4
            transition-all duration-1000 delay-400 ease-out
            ${
              isExpanded
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-8 scale-95"
            }
          `}
          style={{ textShadow: "0 2px 4px rgba(0,0,0,0.7)" }}
        >
          {renderTitle()}
        </h2>
      </div>
    </section>
  );
};

export default SectionHeroIntermedio;
