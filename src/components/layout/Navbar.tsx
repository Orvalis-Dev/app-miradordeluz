import { useState, useEffect, useRef } from "react";
import type { FC } from "react";
import { isMenuOpen } from "../../stores/uiStore"; // Store UI global
import TermsModal from "@components/common/TermsModal";
import { WhatsAppButton } from "@components/common/WhatsAppButton";
import {
  IconInstagram as InstagramIcon,
  IconWhatsApp as WhatsAppIcon,
  IconMapPin as LocationIcon,
  IconMenu as MenuIcon,
  IconClose,
  IconChevronDown,
} from "@components/common/Icons";

interface NavbarMiradorDeLuzProps {
  variant?: "glass" | "solid-navy" | "transparent";
  showReservaButton?: boolean;
  logoSrc?: string;
}

const NavbarMiradorDeLuz: FC<NavbarMiradorDeLuzProps> = ({
  variant,
  showReservaButton = true,
  logoSrc,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAlwaysScrolled, setIsAlwaysScrolled] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [cabanasAbierto, setCabanasAbierto] = useState(false);
  const [mostrarTerminos, setMostrarTerminos] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkPath = () => {
      const path = window.location.pathname;
      setCurrentPath(path);
      setIsAlwaysScrolled(
        path.includes("/contacto") || path.includes("/galeria"),
      );
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    checkPath();
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Inicializar

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const shouldHaveScrolledStyle = isScrolled || isAlwaysScrolled;

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
    isMenuOpen.set(!menuAbierto);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
    isMenuOpen.set(false);
  };

  const abrirTerminos = () => {
    setMenuAbierto(false);
    setMostrarTerminos(true);
  };

  const cerrarTerminos = () => {
    setMostrarTerminos(false);
  };

  // Prevenir scroll del body cuando el menú está abierto
  const previousOverflowRef = useRef<string | null>(null);
  useEffect(() => {
    if (menuAbierto) {
      previousOverflowRef.current = document.body.style.overflow ?? "";
      document.body.style.overflow = "hidden";
    } else {
      if (previousOverflowRef.current !== null) {
        document.body.style.overflow = previousOverflowRef.current;
        previousOverflowRef.current = null;
      } else {
        document.body.style.overflow = "";
      }
    }
    return () => {
      if (previousOverflowRef.current !== null) {
        document.body.style.overflow = previousOverflowRef.current;
        previousOverflowRef.current = null;
      } else {
        document.body.style.overflow = "";
      }
    };
  }, [menuAbierto]);

  const isContactPage =
    currentPath.includes("/contacto") || variant === "solid-navy";

  const navBaseClass =
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 md:px-8 lg:px-16";

  let scrolledClass = "";
  let textColor = "";
  let logoColor = "";

  if (isContactPage) {
    scrolledClass = "bg-slate-900 shadow-md py-2 md:py-3";
    textColor = "text-white";
    logoColor = "text-white";
  } else if (shouldHaveScrolledStyle) {
    scrolledClass = "bg-white/90 backdrop-blur-md shadow-md py-2 md:py-3";
    textColor = "text-gray-900";
    logoColor = "text-gray-900";
  } else {
    scrolledClass = "bg-transparent py-4 md:py-6";
    textColor = "text-white";
    logoColor = "text-white";
  }

  return (
    <>
      <nav className={`${navBaseClass} ${scrolledClass}`}>
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo / Nombre */}
          <div className="flex items-center">
            <a
              href="/"
              className={`flex items-center gap-2 font-montserrat font-bold ${logoColor} tracking-wide transition-all group`}
            >
              <img
                src={logoSrc || "/logo-mirador-luz.webp"}
                alt="Logo Mirador de Luz"
                className={`object-contain transition-all duration-300 ${
                  shouldHaveScrolledStyle
                    ? "w-8 h-8 md:w-10 md:h-10"
                    : "w-10 h-10 md:w-12 md:h-12"
                } group-hover:scale-110`}
              />
              <span
                className={`transition-all duration-300 ${
                  shouldHaveScrolledStyle
                    ? "text-sm md:text-xl"
                    : "text-base md:text-2xl"
                }`}
              >
                Mirador de Luz
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links - Hidden on Mobile */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 mx-4">
            {[
              { label: "Cabañas", href: "/#cabanas" },
              { label: "Galería", href: "/galeria" },
              { label: "Contacto", href: "/contacto" },
            ].map((link) => {
              const isActive =
                currentPath === link.href ||
                (link.href !== "/" && currentPath.includes(link.href));

              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative group font-montserrat text-xs xl:text-sm font-semibold uppercase tracking-widest ${textColor} transition-colors py-1`}
                >
                  {link.label}
                  <span
                    className={`absolute left-0 bottom-0 h-0.5 bg-orange-500 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </a>
              );
            })}
          </div>

          {/* Right Action Area (Mobile & Desktop) */}
          <div className="flex items-center gap-3 md:gap-4">
            {showReservaButton && (
              <a
                href="/#cabanas"
                className={`font-montserrat bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white 
                         px-3 md:px-6 py-1.5 md:py-2.5 rounded-lg font-bold uppercase tracking-wider text-[10px] md:text-sm
                         transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-orange-500/40 hover:-translate-y-1 whitespace-nowrap`}
              >
                RESERVAR
              </a>
            )}

            {/* Menú Hamburguesa */}
            <button
              onClick={toggleMenu}
              className={`lg:hidden ${textColor} hover:text-orange-500 transition-colors p-2`}
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
        className={`fixed top-0 right-0 h-full w-full max-w-xs bg-slate-900 z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          menuAbierto ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header del menú con logo y botón cerrar */}
          <div className="flex items-center justify-between p-5 border-b border-white/10">
            <a
              href="/"
              className="flex items-center gap-2"
              onClick={cerrarMenu}
            >
              <img
                src={logoSrc || "/logo-mirador-luz.webp"}
                alt="Logo Mirador de Luz"
                className="w-8 h-8 object-contain"
              />
              <span className="font-montserrat text-lg font-bold text-white tracking-tight">
                Mirador de Luz
              </span>
            </a>
            <button
              onClick={cerrarMenu}
              className="text-white/80 hover:text-white transition-colors p-1"
              aria-label="Cerrar menú"
            >
              <IconClose className="w-6 h-6" />
            </button>
          </div>

          {/* Acción Principal (Botón Reserva) */}
          {showReservaButton && (
            <div className="px-5 pt-6 pb-2">
              <a
                href="/#cabanas"
                onClick={cerrarMenu}
                className="group w-full bg-orange-700 hover:bg-orange-800 text-white font-montserrat font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-950/20 transition-all active:scale-[0.98]"
              >
                <span className="uppercase tracking-wider">RESERVAR</span>
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
          )}

          {/* Links de navegación */}
          <nav className="flex-1 overflow-y-auto pt-4 px-5">
            <ul className="space-y-1">
              <li>
                <a
                  href="/"
                  onClick={cerrarMenu}
                  className={`font-montserrat py-4 text-lg font-bold transition-colors flex items-center justify-between border-b border-white/5 uppercase tracking-wider ${
                    currentPath === "/" || currentPath === ""
                      ? "text-orange-500"
                      : "text-white hover:text-orange-500"
                  }`}
                >
                  INICIO
                </a>
              </li>
              <li>
                <button
                  onClick={() => setCabanasAbierto(!cabanasAbierto)}
                  className={`w-full font-montserrat py-4 text-lg font-bold transition-colors flex items-center justify-between border-b border-white/5 uppercase tracking-wider ${
                    currentPath.includes("reserva-cabana")
                      ? "text-orange-500"
                      : "text-white hover:text-orange-500"
                  }`}
                >
                  CABAÑAS
                  <IconChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      cabanasAbierto ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    cabanasAbierto
                      ? "max-h-64 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <ul className="pl-6 py-2 space-y-1">
                    {[1, 2, 3, 4].map((n) => {
                      const path = `/reserva/${n}`;
                      const isActive = currentPath === path;
                      return (
                        <li key={n}>
                          <a
                            href={path}
                            onClick={cerrarMenu}
                            className={`block py-3 font-montserrat text-sm font-medium transition-colors ${
                              isActive
                                ? "text-orange-400"
                                : "text-slate-500 hover:text-orange-400"
                            }`}
                          >
                            Cabaña {n}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
              <li>
                <a
                  href="/galeria"
                  onClick={cerrarMenu}
                  className={`font-montserrat py-4 text-lg font-bold transition-colors flex items-center justify-between border-b border-white/5 uppercase tracking-wider ${
                    currentPath.includes("/galeria")
                      ? "text-orange-500"
                      : "text-white hover:text-orange-500"
                  }`}
                >
                  GALERÍA
                </a>
              </li>
              <li>
                <a
                  href="/contacto"
                  onClick={cerrarMenu}
                  className={`font-montserrat py-4 text-lg font-bold transition-colors flex items-center justify-between border-b border-white/5 uppercase tracking-wider ${
                    currentPath.includes("/contacto")
                      ? "text-orange-500"
                      : "text-white hover:text-orange-500"
                  }`}
                >
                  CONTACTO
                </a>
              </li>
            </ul>
          </nav>

          {/* Footer del menú */}
          <div className="p-6 bg-slate-950 border-t border-white/10">
            <p className="text-xs font-montserrat font-semibold text-slate-300 mb-4 uppercase tracking-widest text-center md:text-left">
              ¿Tienes dudas?
            </p>

            {/* Redes Sociales */}
            <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
              <WhatsAppButton
                className="w-12 h-12 bg-white/5 text-white hover:text-orange-500 rounded-full flex items-center justify-center border border-white/10 hover:border-orange-500/50 transition-all group"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </WhatsAppButton>
              <a
                href="https://www.instagram.com/complejo_miradordeluz/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/5 text-white hover:text-orange-500 rounded-full flex items-center justify-center border border-white/10 hover:border-orange-500/50 transition-all group"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.google.com/maps/place/Mirador+de+Luz/@-31.3730543,-64.5250168,17z/data=!4m6!3m5!1s0x942d65f0c8772fbd:0x4d7f1d8348462d0a!8m2!3d-31.3730589!4d-64.5224419!16s%2Fg%2F11y59brg9t"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/5 text-white hover:text-orange-500 rounded-full flex items-center justify-center border border-white/10 hover:border-orange-500/50 transition-all group"
                aria-label="Ubicación"
              >
                <LocationIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
            </div>

            {/* Link Legal */}
            <div className="text-center md:text-left">
              <button
                onClick={abrirTerminos}
                className="text-[10px] font-montserrat text-slate-300 hover:text-white transition-colors uppercase tracking-[0.2em] font-medium"
              >
                Términos y Condiciones
              </button>
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
