import { useState } from 'react';
import type { FC } from 'react';

// Puedes instalar: npm install react-icons
// O usar estos placeholders SVG

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
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

// Subcomponente: Contador de huéspedes (estilo minimalista)
interface GuestsCounterProps {
  label: string;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
}

const GuestsCounter: FC<GuestsCounterProps> = ({ label, count, onIncrement, onDecrement, min = 0 }) => {
  return (
    <div className="flex flex-col gap-3 py-4 px-8">
      <span className="font-montserrat text-sm text-gray-500 font-medium">{label}</span>
      <div className="flex items-center gap-4">
        <button
          onClick={onDecrement}
          disabled={count <= min}
          className="font-montserrat w-7 h-7 rounded-full border border-gray-300 text-gray-600 
                   flex items-center justify-center text-sm font-light
                   hover:border-gray-400 hover:bg-gray-50 transition-all
                   disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label={`Decrementar ${label}`}
        >
          −
        </button>
        <span className="font-montserrat text-base font-medium text-gray-700 min-w-8 text-center">
          {count}
        </span>
        <button
          onClick={onIncrement}
          className="w-7 h-7 rounded-full border border-gray-300 text-gray-600 
                   flex items-center justify-center text-sm font-light
                   hover:border-gray-400 hover:bg-gray-50 transition-all"
          aria-label={`Incrementar ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
};

// Props del componente principal
interface HeroMiradorDeLuzProps {
  titulo?: string;
  subtitulo?: string;
  descripcion?: string;
  imagenFondo?: string;
  colorPrimario?: string;
  colorSecundario?: string;
  colorAccent?: string;
  mostrarNavbar?: boolean;
  onSearch?: (datos: {
    fechaInicio: string;
    fechaFin: string;
    adultos: number;
    ninos: number;
  }) => void;
}

const HeroMiradorDeLuz: FC<HeroMiradorDeLuzProps> = ({
  titulo = 'MIRADOR DE LUZ',
  subtitulo = 'COMPLEJO DE CABAÑAS',
  descripcion = 'Descansá entre la naturaleza y la luz del amanecer',
  imagenFondo = '/images/hero-principal.jpg',
  mostrarNavbar = false,
  onSearch,
}) => {
  const [adultos, setAdultos] = useState(2);
  const [ninos, setNinos] = useState(0);
  const [idioma, setIdioma] = useState('ESP');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const handleSearch = () => {
    const datos = {
      fechaInicio,
      fechaFin,
      adultos,
      ninos,
    };

    console.log('Búsqueda de reserva:', datos);

    if (onSearch) {
      onSearch(datos);
    }
  };

  const toggleIdioma = () => {
    setIdioma(idioma === 'ESP' ? 'ENG' : 'ESP');
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imagenFondo})` }}
      >
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navbar (opcional - oculto por defecto si hay navbar fijo) */}
        {mostrarNavbar && (
          <nav className="absolute top-0 left-0 right-0 z-20 px-4 md:px-8 lg:px-16 py-6">
            <div className="flex items-center justify-between">
              {/* Logo / Nombre */}
              <div className="flex items-center">
                <h1 className="font-montserrat text-2xl md:text-3xl font-bold text-white tracking-wide">
                  🏔️ Mirador de Luz
                </h1>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-6">
                {/* Selector de idioma */}
                <button
                  onClick={toggleIdioma}
                  className="font-montserrat text-white font-medium hover:text-amber-300 transition-colors"
                >
                  {idioma === 'ESP' ? 'ESP / ENG' : 'ENG / ESP'}
                </button>

                {/* Botón Reservas */}
                <button className="font-montserrat bg-linear-to-r from-amber-500 to-orange-500 text-white 
                                 px-6 py-2.5 rounded-lg font-semibold uppercase tracking-wide
                                 hover:from-amber-600 hover:to-orange-600 
                                 transform hover:scale-105 transition-all shadow-lg">
                  Reservas
                </button>

                {/* Iconos sociales */}
                <div className="flex items-center gap-3">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 
                             flex items-center justify-center text-white transition-all
                             hover:scale-110"
                    aria-label="Instagram"
                  >
                    <InstagramIcon />
                  </a>
                  <a
                    href="https://wa.me/5493512345678"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 
                             flex items-center justify-center text-white transition-all
                             hover:scale-110"
                    aria-label="WhatsApp"
                  >
                    <WhatsAppIcon />
                  </a>
                  <button
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 
                             flex items-center justify-center text-white transition-all
                             hover:scale-110"
                    aria-label="Ubicación"
                  >
                    <LocationIcon />
                  </button>
                </div>

                {/* Menú hamburguesa */}
                <button
                  className="text-white hover:text-amber-300 transition-colors"
                  aria-label="Menú"
                >
                  <MenuIcon />
                </button>
              </div>

              {/* Mobile: Solo hamburguesa */}
              <button
                className="lg:hidden text-white"
                aria-label="Menú móvil"
              >
                <MenuIcon />
              </button>
            </div>
          </nav>
        )}

        {/* Contenido central */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 pt-32 pb-16">
          {/* Texto central */}
          <div className="text-center mb-8 md:mb-12">
            {/* Subtítulo */}
            <p className="font-montserrat text-[#A8936D] text-[14px] font-semibold tracking-[0.2em] uppercase mb-4">
              {subtitulo}
            </p>

            {/* Título principal */}
            <h2 className="font-montserrat text-[48px] md:text-[64px] lg:text-[80px] font-extrabold text-white mb-4 md:mb-6
                         drop-shadow-2xl leading-tight">
              {titulo}
            </h2>

            {/* Descripción (sin la frase "y la luz del amanecer") */}
            <p className="font-montserrat text-white/90 text-[18px] md:text-[20px] font-medium max-w-2xl mx-auto">
              {descripcion.replace(' y la luz del amanecer', '')}
            </p>
          </div>

          {/* Caja de búsqueda de reservas */}
          <div className="w-full max-w-6xl">
            <div className="flex justify-center mb-8">
              <a
                href="#cabanas"
                className="font-montserrat inline-flex items-center gap-3 bg-amber-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 hover:shadow-lg transition transform"
              >
                Conoce nuestras cabañas
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Elemento de ubicación centrado al fondo del hero */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="inline-flex items-center gap-3 bg-transparent border border-white/20 text-white px-6 py-3 rounded-full shadow-lg backdrop-blur-sm">
          <span className="w-5 h-5 text-amber-500" aria-hidden>
            <LocationIcon />
          </span>
          <span className="font-montserrat font-semibold text-sm">
            Villa Santa Cruz del Lago, Córdoba, Argentina
          </span>
        </div>
      </div>

    </section>
  );
};

export default HeroMiradorDeLuz;

