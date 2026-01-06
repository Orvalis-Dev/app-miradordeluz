import { useState, useEffect, useRef } from "react";
import type { FC } from "react";
import TermsModal from "./TermsModal";
import useIsMouseInTopEighth from "../../hooks/useIsMouseInTopEighth";
import {
  IconInstagram as InstagramIcon,
  IconWhatsApp as WhatsAppIcon,
  IconMapPin as LocationIcon,
  IconMenu as MenuIcon,
} from "./ui/Icons";

// Tipos para los estilos de sección
type SeccionEstilo = {
  background: string;
  textColor: string;
  hoverColor: string;
  logoColor: string;
  socialBg: string;
  buttonGradient: string;
};

// Configuración de colores por sección
const estilosPorSeccion: Record<string, SeccionEstilo> = {
  "hero-section": {
    background: "bg-transparent",
    textColor: "text-white",
    hoverColor: "hover:text-amber-300",
    logoColor: "text-white",
    socialBg: "bg-white/10 hover:bg-white/20",
    buttonGradient:
      "from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600",
  },
  "ubicacion-section": {
    background: "bg-white/90 backdrop-blur-md shadow-md",
    textColor: "text-gray-800",
    hoverColor: "hover:text-amber-600",
    logoColor: "text-gray-900",
    socialBg: "bg-gray-200 hover:bg-gray-300",
    buttonGradient:
      "from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600",
  },
  "hero-intermedio-section": {
    background: "bg-black/70 backdrop-blur-md",
    textColor: "text-white",
    hoverColor: "hover:text-amber-300",
    logoColor: "text-white",
    socialBg: "bg-white/10 hover:bg-white/20",
    buttonGradient:
      "from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600",
  },
  "cabanas-section": {
    background: "bg-white/90 backdrop-blur-md shadow-md",
    textColor: "text-gray-800",
    hoverColor: "hover:text-amber-600",
    logoColor: "text-gray-900",
    socialBg: "bg-gray-200 hover:bg-gray-300",
    buttonGradient:
      "from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600",
  },
  testimonios: {
    background: "bg-stone-50/95 backdrop-blur-md shadow-md",
    textColor: "text-gray-800",
    hoverColor: "hover:text-amber-600",
    logoColor: "text-gray-900",
    socialBg: "bg-gray-200 hover:bg-gray-300",
    buttonGradient:
      "from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600",
  },
  default: {
    background: "bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg",
    textColor: "text-white",
    hoverColor: "hover:text-amber-300",
    logoColor: "text-white",
    socialBg: "bg-white/10 hover:bg-white/20",
    buttonGradient:
      "from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600",
  },
};

interface NavbarMiradorDeLuzProps {
  transparente?: boolean;
  /** Si true, el navbar está en la página Hero principal y siempre visible */
  isHeroPage?: boolean;
}

const NavbarMiradorDeLuz: FC<NavbarMiradorDeLuzProps> = ({
  transparente = false,
  isHeroPage = false,
}) => {
  const [seccionActual, setSeccionActual] = useState("hero-section");
  const [scrollY, setScrollY] = useState(0);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [mostrarTerminos, setMostrarTerminos] = useState(false);
  const [mouseOverNavbar, setMouseOverNavbar] = useState(false);

  // Determinar si estamos en la sección Hero (por sección, no por página)
  const isInHeroSection = seccionActual === "hero-section";

  // Inicializar shouldShowNavbar basado en si está en sección Hero o es página Hero
  const [shouldShowNavbar, setShouldShowNavbar] = useState(
    isHeroPage || isInHeroSection
  );

  // Usar el custom hook cuando NO está en sección Hero (ignora isHeroPage)
  const isMouseInTopEighth = useIsMouseInTopEighth(!isInHeroSection);

  // Ref para mantener el timeout entre renders
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Actualizar scroll Y
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Detectar la sección más cercana al top del navbar
      const secciones = [
        "hero-section",
        "ubicacion-section",
        "hero-intermedio-section",
        "cabanas-section",
        "testimonios",
      ];

      let seccionMasCercana = "hero-section";
      let distanciaMasCorta = Infinity;

      secciones.forEach((id) => {
        const elemento = document.getElementById(id);
        if (elemento) {
          const rect = elemento.getBoundingClientRect();
          // Distancia desde el top del navbar (80px) al top de la sección
          const distancia = Math.abs(rect.top - 80);

          // Si la sección está visible y es la más cercana al navbar
          if (rect.top < window.innerHeight && rect.bottom > 80) {
            if (distancia < distanciaMasCorta) {
              distanciaMasCorta = distancia;
              seccionMasCercana = id;
            }
          }
        }
      });

      setSeccionActual(seccionMasCercana);
    };

    // Listener de scroll
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Inicializar

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // useEffect para manejar la visibilidad del navbar basado en mouse y hover
  useEffect(() => {
    console.log("[Navbar] useEffect visibility ejecutado:", {
      isHeroPage,
      seccionActual,
      isInHeroSection,
      isMouseInTopEighth,
      mouseOverNavbar,
    });

    // Si está en la sección hero-section, siempre visible
    if (isInHeroSection) {
      console.log(
        "[Navbar] ✅ En sección Hero (hero-section) - navbar siempre visible"
      );
      setShouldShowNavbar(true);
      return;
    }

    // Si es una página de ejemplo (isHeroPage=false sin secciones), también siempre visible
    if (isHeroPage && seccionActual === "hero-section") {
      console.log("[Navbar] ✅ Página Hero simple - navbar siempre visible");
      setShouldShowNavbar(true);
      return;
    }

    // Si el mouse está en el top o sobre el navbar, mostrar
    if (isMouseInTopEighth || mouseOverNavbar) {
      console.log("[Navbar] Mouse detectado - mostrando navbar");
      setShouldShowNavbar(true);
      // Limpiar timeout pendiente si existe
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
    } else {
      // Ocultar después de 1 segundo si no está cerca del top ni sobre el navbar
      console.log("[Navbar] Mouse fuera - programando ocultación en 1 segundo");
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      hideTimeoutRef.current = setTimeout(() => {
        console.log("[Navbar] ⏱️  Timeout ejecutado - ocultando navbar");
        setShouldShowNavbar(false);
      }, 1000);
    }

    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
    };
  }, [
    isHeroPage,
    isInHeroSection,
    isMouseInTopEighth,
    mouseOverNavbar,
    seccionActual,
  ]);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  const abrirTerminos = () => {
    // cerrar drawer y abrir modal de términos
    setMenuAbierto(false);
    setMostrarTerminos(true);
  };

  const cerrarTerminos = () => {
    setMostrarTerminos(false);
  };

  // Prevenir scroll del body cuando el menú está abierto
  const previousOverflowRef = useRef<string | null>(null);
  useEffect(() => {
    // Guardar el overflow previo y aplicar 'hidden' cuando se abra el menú.
    if (menuAbierto) {
      previousOverflowRef.current = document.body.style.overflow ?? "";
      document.body.style.overflow = "hidden";
    } else {
      // Restaurar solo si habíamos guardado un valor previo.
      if (previousOverflowRef.current !== null) {
        document.body.style.overflow = previousOverflowRef.current;
        previousOverflowRef.current = null;
      } else {
        document.body.style.overflow = "";
      }
    }

    return () => {
      // Al desmontar, restaurar el overflow previo si existe.
      if (previousOverflowRef.current !== null) {
        document.body.style.overflow = previousOverflowRef.current;
        previousOverflowRef.current = null;
      } else {
        document.body.style.overflow = "";
      }
    };
  }, [menuAbierto]);

  // Obtener estilos de la sección actual
  const estiloActual =
    estilosPorSeccion[seccionActual] || estilosPorSeccion.default;

  // Si es página Hero Y está en sección Hero, usar transparente; si NO es página Hero, usar el gradiente del footer
  const backgroundClass =
    isHeroPage && isInHeroSection
      ? "bg-transparent"
      : "bg-gradient-to-b from-gray-800 to-gray-900";

  // Aplicar clase de ocultación si no debe mostrar
  const navClass = `fixed top-0 left-0 right-0 z-50 px-4 md:px-8 lg:px-16 py-4 transition-all duration-500 ${backgroundClass} ${
    !shouldShowNavbar
      ? "opacity-0 pointer-events-none transform -translate-y-full"
      : "opacity-100 pointer-events-auto transform translate-y-0"
  }`;

  const handleMouseEnterNav = () => {
    if (!isHeroPage) {
      setMouseOverNavbar(true);
    }
  };

  const handleMouseLeaveNav = () => {
    if (!isHeroPage) {
      setMouseOverNavbar(false);
    }
  };

  return (
    <>
      <nav
        className={navClass}
        onMouseEnter={handleMouseEnterNav}
        onMouseLeave={handleMouseLeaveNav}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo / Nombre */}
          <div className="flex items-center">
            <a
              href="/"
              className={`font-montserrat text-xl md:text-2xl font-bold ${estiloActual.logoColor} tracking-wide ${estiloActual.hoverColor} transition-colors`}
            >
              🏔️ Mirador de Luz
            </a>
          </div>

          {/* Desktop/Mobile Navigation - Siempre igual */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Botón Reservar (redirecciona a sección Nuestras Cabañas) */}
            <a
              href="/#cabanas"
              className={`font-montserrat bg-gradient-to-r ${estiloActual.buttonGradient} text-white 
                       px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-semibold uppercase tracking-wide text-xs md:text-sm
                       transform hover:scale-105 transition-all shadow-lg`}
            >
              Reservar
            </a>

            {/* Iconos sociales (desktop) */}
            <div className="hidden md:flex items-center gap-2">
              <a
                href="https://www.instagram.com/complejo_miradordeluz/"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-9 h-9 rounded-full ${estiloActual.socialBg} 
                         flex items-center justify-center ${estiloActual.textColor} transition-all
                         hover:scale-110`}
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://wa.me/5493813513513"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-9 h-9 rounded-full ${estiloActual.socialBg} 
                         flex items-center justify-center ${estiloActual.textColor} transition-all
                         hover:scale-110`}
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </a>
              <a
                href="https://www.google.com/maps/place/Mirador+de+Luz/@-31.3730543,-64.5250168,17z/data=!4m6!3m5!1s0x942d65f0c8772fbd:0x4d7f1d8348462d0a!8m2!3d-31.3730589!4d-64.5224419!16s%2Fg%2F11y59brg9t?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-9 h-9 rounded-full ${estiloActual.socialBg} 
                         flex items-center justify-center ${estiloActual.textColor} transition-all
                         hover:scale-110`}
                aria-label="Ubicación en Google Maps"
              >
                <LocationIcon />
              </a>
            </div>

            {/* Menú Hamburguesa */}
            <button
              onClick={toggleMenu}
              className={`${estiloActual.textColor} ${estiloActual.hoverColor} transition-colors`}
              aria-label="Abrir menú"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay oscuro */}
      {menuAbierto && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300"
          onClick={cerrarMenu}
        />
      )}

      {/* Menú lateral (Drawer) */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-xs bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          menuAbierto ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header del menú con logo y botón cerrar */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center justify-center flex-1">
              <span className="font-montserrat text-xl font-bold text-gray-900">
                🏔️ Mirador de Luz
              </span>
            </div>
            <button
              onClick={cerrarMenu}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Cerrar menú"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Links de navegación */}
          <nav className="flex-1 overflow-y-auto py-6 px-4">
            <ul className="space-y-4">
              <li>
                <a
                  href="/"
                  onClick={cerrarMenu}
                  className="font-montserrat text-lg font-semibold text-gray-900 hover:text-amber-600 transition-colors block"
                >
                  HOME
                </a>
              </li>
              <li>
                <a
                  href="#cabanas"
                  onClick={cerrarMenu}
                  className="font-montserrat text-lg font-semibold text-gray-900 hover:text-amber-600 transition-colors flex items-center justify-between"
                >
                  CABAÑAS
                  <svg
                    className="w-5 h-5"
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
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  onClick={cerrarMenu}
                  className="font-montserrat text-lg font-medium text-gray-600 hover:text-amber-600 transition-colors block"
                >
                  SERVICIOS
                </a>
              </li>
              <li>
                <a
                  href="/galeria"
                  onClick={cerrarMenu}
                  className="font-montserrat text-lg font-medium text-gray-600 hover:text-amber-600 transition-colors block"
                >
                  GALERÍA
                </a>
              </li>
              <li>
                <a
                  href="#testimonios"
                  onClick={cerrarMenu}
                  className="font-montserrat text-lg font-medium text-gray-600 hover:text-amber-600 transition-colors block"
                >
                  TESTIMONIOS
                </a>
              </li>
              <li>
                <a
                  href="#ubicacion"
                  onClick={cerrarMenu}
                  className="font-montserrat text-lg font-medium text-gray-600 hover:text-amber-600 transition-colors block"
                >
                  UBICACIÓN
                </a>
              </li>
              <li>
                <a
                  href="/contacto"
                  onClick={cerrarMenu}
                  className="font-montserrat text-lg font-medium text-gray-600 hover:text-amber-600 transition-colors block"
                >
                  CONTACTO
                </a>
              </li>
              <li>
                <button
                  onClick={() => {
                    abrirTerminos();
                  }}
                  className="font-montserrat text-lg text-left w-full font-medium text-gray-600 hover:text-amber-600 transition-colors block"
                  aria-haspopup="dialog"
                >
                  TÉRMINOS Y CONDICIONES
                </button>
              </li>
            </ul>
          </nav>

          {/* Footer del menú - Espacio para logo */}
          <div className="border-t border-gray-200 p-4 flex items-center justify-center">
            {/* TODO: Agregar logo de las cabañas aquí */}
            <div className="w-full h-20 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <span className="text-gray-400 text-xs">Logo de Cabañas</span>
            </div>
          </div>
        </div>
      </div>
      {/* Modal de términos */}
      <TermsModal open={mostrarTerminos} onClose={cerrarTerminos} />
    </>
  );
};

export default NavbarMiradorDeLuz;
