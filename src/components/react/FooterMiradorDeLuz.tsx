import { useState, type FC, type FormEvent } from 'react';

// Iconos de redes sociales y contacto
const InstagramIcon: FC = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const LinkedInIcon: FC = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const WhatsAppIcon: FC = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

const LocationIcon: FC = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
  </svg>
);

const ArrowUpIcon: FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
  </svg>
);

// Tipos
interface RedSocial {
  nombre: 'instagram' | 'linkedin' | 'whatsapp' | 'ubicacion';
  url: string;
}

interface LinkNavegacion {
  texto: string;
  url: string;
}

interface FooterMiradorDeLuzProps {
  logoUrl?: string;
  logoTexto?: string;
  direccion?: string;
  telefono?: string;
  email?: string;
  redesSociales?: RedSocial[];
  linksNavegacion?: LinkNavegacion[];
  mostrarFormularioSuscripcion?: boolean;
  onSubscribe?: (nombre: string, email: string) => void;
  mostrarScrollTop?: boolean;
  textoDerechos?: string;
  logosPartners?: Array<{ nombre: string; url?: string }>;
}

const FooterMiradorDeLuz: FC<FooterMiradorDeLuzProps> = ({
  logoTexto = 'Mirador de Luz',
  direccion = 'Av. Hipólito Yrigoyen 111\nNueva Córdoba, Córdoba, Argentina',
  telefono = '+54 (351) 448-6700',
  email = 'reservas1@y111hotel.com',
  redesSociales = [
    { nombre: 'instagram', url: 'https://instagram.com/miradordeluz' },
    { nombre: 'linkedin', url: 'https://linkedin.com/company/miradordeluz' },
    { nombre: 'whatsapp', url: 'https://wa.me/5493814486700' },
    { nombre: 'ubicacion', url: 'https://maps.google.com' },
  ],
  linksNavegacion = [
    { texto: 'Home', url: '/' },
    { texto: 'Habitaciones', url: '/cabanas' },
    { texto: 'Servicios', url: '/servicios' },
    { texto: 'Eventos', url: '/eventos' },
    { texto: 'Córdoba', url: '/cordoba' },
    { texto: 'Galería', url: '/galeria' },
    { texto: 'Promociones', url: '/promociones' },
    { texto: 'Ubicación', url: '/ubicacion' },
  ],
  mostrarFormularioSuscripcion = true,
  onSubscribe,
  mostrarScrollTop = true,
  textoDerechos = `© ${new Date().getFullYear()} Mirador de Luz. Todos los derechos reservados.`,
  logosPartners = [],
}) => {
  const [nombre, setNombre] = useState('');
  const [emailSuscripcion, setEmailSuscripcion] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (onSubscribe) {
      onSubscribe(nombre, emailSuscripcion);
    } else {
      console.log('Suscripción:', { nombre, email: emailSuscripcion });
    }
    // Limpiar formulario
    setNombre('');
    setEmailSuscripcion('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getIconoRed = (nombre: string) => {
    switch (nombre) {
      case 'instagram':
        return <InstagramIcon />;
      case 'linkedin':
        return <LinkedInIcon />;
      case 'whatsapp':
        return <WhatsAppIcon />;
      case 'ubicacion':
        return <LocationIcon />;
      default:
        return null;
    }
  };

  return (
    <footer className="w-full bg-gradient-to-b from-gray-800 to-gray-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        {/* Grid principal de 4 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Columna 1: Logo + Política */}
          <div className="space-y-6">
            {/* Logo */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                {logoTexto}
              </h2>
            </div>

            {/* Enlace a Política de Sustentabilidad */}
            <a
              href="/politica-sustentabilidad"
              className="inline-block text-gray-300 hover:text-green-400 
                       transition-colors duration-300 text-sm"
            >
              Política de Sustentabilidad
            </a>
          </div>

          {/* Columna 2: Ubicación + Contacto + Redes */}
          <div className="space-y-4">
            {/* Título */}
            <h3 className="text-xl font-semibold text-white mb-2">
              Ubicación
            </h3>

            {/* Dirección */}
            <div className="text-gray-300 text-sm leading-relaxed space-y-1">
              {direccion.split('\n').map((linea, idx) => (
                <p key={idx}>{linea}</p>
              ))}
            </div>

            {/* Teléfono */}
            <div>
              <a
                href={`tel:${telefono.replace(/\s/g, '')}`}
                className="block text-white font-normal hover:text-yellow-300 
                         transition-colors duration-300 text-sm"
              >
                {telefono}
              </a>
            </div>

            {/* Email */}
            <div>
              <a
                href={`mailto:${email}`}
                className="block text-white font-normal hover:text-yellow-300 
                         transition-colors duration-300 text-sm"
              >
                {email}
              </a>
            </div>

            {/* Íconos de redes sociales */}
            <div className="flex gap-3 pt-2">
              {redesSociales.map((red, idx) => (
                <a
                  key={idx}
                  href={red.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-yellow-300 transition-colors duration-300"
                  aria-label={red.nombre}
                >
                  {getIconoRed(red.nombre)}
                </a>
              ))}
            </div>
          </div>

          {/* Columna 3: Explorar */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-2">
              Explorar
            </h3>
            <nav className="space-y-2">
              {linksNavegacion.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  className="block text-gray-300 hover:text-white 
                           transition-colors duration-300 text-sm"
                >
                  {link.texto}
                </a>
              ))}
            </nav>
          </div>

          {/* Columna 4: Suscripción */}
          {mostrarFormularioSuscripcion && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-2">
                Suscripción
              </h3>

              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Input Nombre */}
                <input
                  type="text"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-white text-gray-900 
                           placeholder-gray-500 text-sm rounded
                           focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />

                {/* Input Email */}
                <input
                  type="email"
                  placeholder="Email"
                  value={emailSuscripcion}
                  onChange={(e) => setEmailSuscripcion(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-white text-gray-900 
                           placeholder-gray-500 text-sm rounded
                           focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />

                {/* Texto informativo */}
                <p className="text-xs text-gray-300 leading-relaxed">
                  ¡Dejanos tus datos y recibí todas las promos en tu email!
                </p>

                {/* Botón */}
                <button
                  type="submit"
                  className="w-full px-5 py-2 bg-amber-600 hover:bg-amber-700 
                           text-white font-semibold rounded transition-colors 
                           duration-300 text-sm"
                >
                  Registrarme
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Franja inferior: Logos Partners */}
        <div className="mt-12 pt-8 border-t border-white/10">
          {/* Logos de partners */}
          {logosPartners.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 mb-6">
              {logosPartners.map((partner, idx) => (
                <div
                  key={idx}
                  className="text-xs text-gray-400 hover:text-gray-300 
                           transition-colors duration-300"
                >
                  {partner.url ? (
                    <a href={partner.url} target="_blank" rel="noopener noreferrer">
                      {partner.nombre}
                    </a>
                  ) : (
                    <span>{partner.nombre}</span>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {/* Copyright */}
          <p className="text-sm text-gray-500 text-center">
            {textoDerechos}
          </p>
        </div>
      </div>

      {/* Botón Scroll to Top */}
      {mostrarScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 bg-gray-700/80 hover:bg-gray-600 
                   text-white rounded-full shadow-xl flex items-center justify-center
                   transition-all duration-300 hover:scale-105 z-50 border border-gray-600"
          aria-label="Volver arriba"
        >
          <ArrowUpIcon />
        </button>
      )}
    </footer>
  );
};

export default FooterMiradorDeLuz;

