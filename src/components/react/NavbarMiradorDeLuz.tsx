import { useState, useEffect } from 'react';
import type { FC } from 'react';

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
  'hero-section': {
    background: 'bg-transparent',
    textColor: 'text-white',
    hoverColor: 'hover:text-amber-300',
    logoColor: 'text-white',
    socialBg: 'bg-white/10 hover:bg-white/20',
    buttonGradient: 'from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600',
  },
  'ubicacion-section': {
    background: 'bg-white/90 backdrop-blur-md shadow-md',
    textColor: 'text-gray-800',
    hoverColor: 'hover:text-amber-600',
    logoColor: 'text-gray-900',
    socialBg: 'bg-gray-200 hover:bg-gray-300',
    buttonGradient: 'from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600',
  },
  'hero-intermedio-section': {
    background: 'bg-black/70 backdrop-blur-md',
    textColor: 'text-white',
    hoverColor: 'hover:text-amber-300',
    logoColor: 'text-white',
    socialBg: 'bg-white/10 hover:bg-white/20',
    buttonGradient: 'from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600',
  },
  'cabanas-section': {
    background: 'bg-white/90 backdrop-blur-md shadow-md',
    textColor: 'text-gray-800',
    hoverColor: 'hover:text-amber-600',
    logoColor: 'text-gray-900',
    socialBg: 'bg-gray-200 hover:bg-gray-300',
    buttonGradient: 'from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600',
  },
  'testimonios': {
    background: 'bg-stone-50/95 backdrop-blur-md shadow-md',
    textColor: 'text-gray-800',
    hoverColor: 'hover:text-amber-600',
    logoColor: 'text-gray-900',
    socialBg: 'bg-gray-200 hover:bg-gray-300',
    buttonGradient: 'from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600',
  },
  default: {
    background: 'bg-black/80 backdrop-blur-md shadow-lg',
    textColor: 'text-white',
    hoverColor: 'hover:text-amber-300',
    logoColor: 'text-white',
    socialBg: 'bg-white/10 hover:bg-white/20',
    buttonGradient: 'from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600',
  },
};

// Iconos SVG
const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const LocationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

interface NavbarMiradorDeLuzProps {
  transparente?: boolean;
}

const NavbarMiradorDeLuz: FC<NavbarMiradorDeLuzProps> = ({ transparente = false }) => {
  const [seccionActual, setSeccionActual] = useState('hero-section');
  const [scrollY, setScrollY] = useState(0);
  const [idioma, setIdioma] = useState('ESP');
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Actualizar scroll Y
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Detectar la sección más cercana al top del navbar
      const secciones = [
        'hero-section',
        'ubicacion-section',
        'hero-intermedio-section',
        'cabanas-section',
        'testimonios',
      ];

      let seccionMasCercana = 'hero-section';
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
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Inicializar

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleIdioma = () => {
    setIdioma(idioma === 'ESP' ? 'ENG' : 'ESP');
  };

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  // Prevenir scroll del body cuando el menú está abierto
  useEffect(() => {
    if (menuAbierto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuAbierto]);

  // Obtener estilos de la sección actual
  const estiloActual = estilosPorSeccion[seccionActual] || estilosPorSeccion.default;
  
  // Si está en hero y es transparente, usar transparente al inicio
  const backgroundClass = transparente && seccionActual === 'hero-section' && scrollY < 50
    ? 'bg-transparent'
    : estiloActual.background;

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 lg:px-16 py-4 transition-all duration-500 ${backgroundClass}`}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo / Nombre */}
          <div className="flex items-center">
            <a 
              href="/" 
              className={`text-xl md:text-2xl font-bold ${estiloActual.logoColor} tracking-wide ${estiloActual.hoverColor} transition-colors`}
            >
              🏔️ Mirador de Luz
            </a>
          </div>

          {/* Desktop/Mobile Navigation - Siempre igual */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Selector de idioma */}
            <button
              onClick={toggleIdioma}
              className={`font-medium ${estiloActual.textColor} ${estiloActual.hoverColor} transition-colors text-xs md:text-sm uppercase`}
            >
              {idioma}
            </button>

            {/* Botón Reservas */}
            <a
              href="/reservas"
              className={`bg-gradient-to-r ${estiloActual.buttonGradient} text-white 
                       px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-semibold uppercase tracking-wide text-xs md:text-sm
                       transform hover:scale-105 transition-all shadow-lg`}
            >
              Reservas
            </a>

            {/* Iconos sociales (desktop) */}
            <div className="hidden md:flex items-center gap-2">
              <a
                href="https://instagram.com"
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
                href="https://wa.me/5493512345678"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-9 h-9 rounded-full ${estiloActual.socialBg} 
                         flex items-center justify-center ${estiloActual.textColor} transition-all
                         hover:scale-110`}
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </a>
              <button
                className={`w-9 h-9 rounded-full ${estiloActual.socialBg} 
                         flex items-center justify-center ${estiloActual.textColor} transition-all
                         hover:scale-110`}
                aria-label="Ubicación"
              >
                <LocationIcon />
              </button>
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
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          menuAbierto ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header del menú con logo y botón cerrar */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center justify-center flex-1">
              <span className="text-2xl font-bold text-gray-900">🏔️ Mirador de Luz</span>
            </div>
            <button 
              onClick={cerrarMenu}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Cerrar menú"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Links de navegación */}
          <nav className="flex-1 overflow-y-auto py-8 px-6">
            <ul className="space-y-6">
              <li>
                <a 
                  href="/" 
                  onClick={cerrarMenu}
                  className="text-lg font-semibold text-gray-900 hover:text-amber-600 transition-colors block"
                >
                  HOME
                </a>
              </li>
              <li>
                <a 
                  href="#cabanas" 
                  onClick={cerrarMenu}
                  className="text-lg font-semibold text-gray-900 hover:text-amber-600 transition-colors flex items-center justify-between"
                >
                  CABAÑAS
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </li>
              <li>
                <a 
                  href="#servicios" 
                  onClick={cerrarMenu}
                  className="text-lg font-medium text-gray-600 hover:text-amber-600 transition-colors block"
                >
                  SERVICIOS
                </a>
              </li>
              <li>
                <a 
                  href="#galeria" 
                  onClick={cerrarMenu}
                  className="text-lg font-medium text-gray-600 hover:text-amber-600 transition-colors block"
                >
                  GALERÍA
                </a>
              </li>
              <li>
                <a 
                  href="#testimonios" 
                  onClick={cerrarMenu}
                  className="text-lg font-medium text-gray-600 hover:text-amber-600 transition-colors block"
                >
                  TESTIMONIOS
                </a>
              </li>
              <li>
                <a 
                  href="#ubicacion" 
                  onClick={cerrarMenu}
                  className="text-lg font-medium text-gray-600 hover:text-amber-600 transition-colors block"
                >
                  UBICACIÓN
                </a>
              </li>
              <li>
                <a 
                  href="/contacto" 
                  onClick={cerrarMenu}
                  className="text-lg font-medium text-gray-600 hover:text-amber-600 transition-colors block"
                >
                  CONTACTO
                </a>
              </li>
            </ul>
          </nav>

          {/* Footer del menú - Espacio para logo */}
          <div className="border-t border-gray-200 p-6 flex items-center justify-center">
            {/* TODO: Agregar logo de las cabañas aquí */}
            <div className="w-full h-24 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <span className="text-gray-400 text-sm">Logo de Cabañas</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarMiradorDeLuz;

