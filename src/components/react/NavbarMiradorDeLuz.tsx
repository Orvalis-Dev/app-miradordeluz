import { useState, useEffect, useRef } from "react";
import type { FC } from "react";
import TermsModal from "./TermsModal";
import useIsMouseInTopEighth from "../../hooks/useIsMouseInTopEighth";
import {
  IconInstagram as InstagramIcon,
  IconWhatsApp as WhatsAppIcon,
  IconMapPin as LocationIcon,
  IconMenu as MenuIcon,
  IconClose,
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
  ubicacion: {
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
        "ubicacion",
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
              className={`flex items-center gap-2 font-montserrat text-xl md:text-2xl font-bold ${estiloActual.logoColor} tracking-wide ${estiloActual.hoverColor} transition-all group`}
            >
              <img
                src="/logo-mirador-luz.webp"
                alt="Logo Mirador de Luz"
                className="w-10 h-10 md:w-12 md:h-12 object-contain group-hover:scale-110 transition-transform"
              />
              <span>Mirador de Luz</span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 mx-4">
            <a
              href="/"
              className={`font-montserrat text-sm font-semibold uppercase tracking-widest ${estiloActual.textColor} ${estiloActual.hoverColor} transition-colors`}
            >
              Inicio
            </a>
            <a
              href="/#cabanas"
              className={`font-montserrat text-sm font-semibold uppercase tracking-widest ${estiloActual.textColor} ${estiloActual.hoverColor} transition-colors`}
            >
              Cabañas
            </a>
            <a
              href="/#servicios"
              className={`font-montserrat text-sm font-semibold uppercase tracking-widest ${estiloActual.textColor} ${estiloActual.hoverColor} transition-colors`}
            >
              Servicios
            </a>
            <a
              href="/galeria"
              className={`font-montserrat text-sm font-semibold uppercase tracking-widest ${estiloActual.textColor} ${estiloActual.hoverColor} transition-colors`}
            >
              Galería
            </a>
            <a
              href="/#ubicacion"
              className={`font-montserrat text-sm font-semibold uppercase tracking-widest ${estiloActual.textColor} ${estiloActual.hoverColor} transition-colors`}
            >
              Ubicación
            </a>
            <a
              href="/contacto"
              className={`font-montserrat text-sm font-semibold uppercase tracking-widest ${estiloActual.textColor} ${estiloActual.hoverColor} transition-colors`}
            >
              Contacto
            </a>
          </div>

          {/* Desktop/Mobile Navigation Right - Siempre igual */}
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
              className={`lg:hidden ${estiloActual.textColor} ${estiloActual.hoverColor} transition-colors`}
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
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <a
              href="/"
              className="flex items-center gap-2"
              onClick={cerrarMenu}
            >
              <img
                src="/logo-mirador-luz.webp"
                alt="Logo Mirador de Luz"
                className="w-8 h-8 object-contain"
              />
              <span className="font-montserrat text-lg font-bold text-gray-900 tracking-tight">
                Mirador de Luz
              </span>
            </a>
            <button
              onClick={cerrarMenu}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label="Cerrar menú"
            >
              <IconClose className="w-6 h-6" />
            </button>
          </div>

          {/* Acción Principal (Botón Reserva) */}
          <div className="px-5 pt-6 pb-2">
            <a
              href="/#cabanas"
              onClick={cerrarMenu}
              className="group w-full bg-orange-500 hover:bg-orange-600 text-white font-montserrat font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-200 transition-all active:scale-[0.98]"
            >
              <span>RESERVAR AHORA</span>
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>

          {/* Links de navegación */}
          <nav className="flex-1 overflow-y-auto pt-4 px-5">
            <ul className="space-y-1">
              <li>
                <a
                  href="/"
                  onClick={cerrarMenu}
                  className="font-montserrat py-3 text-base font-medium text-gray-600 hover:text-orange-500 transition-colors block border-b border-gray-50 uppercase tracking-wide"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="/#cabanas"
                  onClick={cerrarMenu}
                  className="font-montserrat py-4 text-lg font-bold text-gray-900 hover:text-orange-500 transition-colors flex items-center justify-between border-b border-gray-50 uppercase tracking-wider"
                >
                  Nuestras Cabañas
                  <svg
                    className="w-5 h-5 text-gray-300"
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
                  href="/#servicios"
                  onClick={cerrarMenu}
                  className="font-montserrat py-3 text-base font-medium text-gray-600 hover:text-orange-500 transition-colors block border-b border-gray-50 uppercase tracking-wide"
                >
                  Servicios
                </a>
              </li>
              <li>
                <a
                  href="/galeria"
                  onClick={cerrarMenu}
                  className="font-montserrat py-3 text-base font-medium text-gray-600 hover:text-orange-500 transition-colors block border-b border-gray-50 uppercase tracking-wide"
                >
                  Galería
                </a>
              </li>
              <li>
                <a
                  href="/#ubicacion"
                  onClick={cerrarMenu}
                  className="font-montserrat py-3 text-base font-medium text-gray-600 hover:text-orange-500 transition-colors block border-b border-gray-50 uppercase tracking-wide"
                >
                  Ubicación
                </a>
              </li>
              <li>
                <a
                  href="/contacto"
                  onClick={cerrarMenu}
                  className="font-montserrat py-3 text-base font-medium text-gray-600 hover:text-orange-500 transition-colors block border-b border-gray-50 uppercase tracking-wide"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </nav>

          {/* Footer del menú */}
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <p className="text-xs font-montserrat font-semibold text-gray-400 mb-4 uppercase tracking-widest">
              ¿Tienes dudas?
            </p>

            {/* Redes Sociales */}
            <div className="flex items-center gap-4 mb-8">
              <a
                href="https://wa.me/5493813513513"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/complejo_miradordeluz/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 text-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-6 h-6" />
              </a>
              <a
                href="https://www.google.com/maps/place/Mirador+de+Luz/@-31.3730543,-64.5250168,17z/data=!4m6!3m5!1s0x942d65f0c8772fbd:0x4d7f1d8348462d0a!8m2!3d-31.3730589!4d-64.5224419!16s%2Fg%2F11y59brg9t"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                aria-label="Ubicación"
              >
                <LocationIcon className="w-6 h-6" />
              </a>
            </div>

            {/* Link Legal */}
            <button
              onClick={abrirTerminos}
              className="text-[10px] font-montserrat text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-[0.2em] font-medium"
            >
              Términos y Condiciones
            </button>
          </div>
        </div>
      </div>
      {/* Modal de términos */}
      <TermsModal open={mostrarTerminos} onClose={cerrarTerminos} />
    </>
  );
};

export default NavbarMiradorDeLuz;
