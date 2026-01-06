import { useState, type FC, type FormEvent } from "react";
import {
  IconInstagram as InstagramIcon,
  IconLinkedin as LinkedInIcon,
  IconWhatsApp as WhatsAppIcon,
  IconMapPin as LocationIcon,
  IconArrowUp as ArrowUpIcon,
} from "./ui/Icons";

// Tipos

// Tipos
interface RedSocial {
  nombre: "instagram" | "linkedin" | "whatsapp" | "ubicacion";
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
  logoTexto = "Mirador de Luz",
  direccion = "Las Orquideas 893, X5152 \nVilla Santa Cruz del Lago, CórdobaArgentina",
  telefono = "+54 3813 51 3513",
  email = "miradordeluz2019@gmail.com",
  redesSociales = [
    {
      nombre: "instagram",
      url: "https://www.instagram.com/complejo_miradordeluz/",
    },
    { nombre: "linkedin", url: "https://linkedin.com/company/miradordeluz" },
    { nombre: "whatsapp", url: "https://wa.me/5493813513513" },
    {
      nombre: "ubicacion",
      url: "https://www.google.com/maps/place/Mirador+de+Luz/@-31.3730543,-64.5250168,17z/data=!4m6!3m5!1s0x942d65f0c8772fbd:0x4d7f1d8348462d0a!8m2!3d-31.3730589!4d-64.5224419!16s%2Fg%2F11y59brg9t?entry=ttu",
    },
  ],
  linksNavegacion = [
    { texto: "HOME", url: "/" },
    { texto: "CABAÑAS", url: "/cabanas" },
    { texto: "SERVICIOS", url: "/servicios" },
    { texto: "GALERÍA", url: "/galeria" },
    { texto: "TESTIMONIOS", url: "/testimonios" },
    { texto: "UBICACIÓN", url: "/ubicacion" },
    { texto: "CONTACTO", url: "/contacto" },
  ],
  mostrarFormularioSuscripcion = true,
  onSubscribe,
  mostrarScrollTop = true,
  textoDerechos = `© ${new Date().getFullYear()} Complejo Mirador de Luz. Todos los derechos reservados.`,
  logosPartners = [],
}) => {
  // DEBUG: Verificar el array
  console.log("🔍 FooterMiradorDeLuz - linksNavegacion:", linksNavegacion);
  console.log("🔍 linksNavegacion length:", linksNavegacion?.length);
  console.log("🔍 Primer link:", linksNavegacion?.[0]);

  const [nombre, setNombre] = useState("");
  const [emailSuscripcion, setEmailSuscripcion] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (onSubscribe) {
      onSubscribe(nombre, emailSuscripcion);
    } else {
      console.log("Suscripción:", { nombre, email: emailSuscripcion });
    }
    // Limpiar formulario
    setNombre("");
    setEmailSuscripcion("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-gradient-to-b from-gray-800 to-gray-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 text-center">
        {/* Grid principal de 3 columnas - centrado */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 place-items-center">
          {/* Columna 1: Logo + Política - centrada */}
          <div className="space-y-6 text-center">
            {/* Logo */}
            <div className="flex justify-center">
              <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight text-center">
                {logoTexto}
              </h2>
            </div>

            {/* Enlace a Política de Sustentabilidad */}
            <div className="flex justify-center">
              <a
                href="/terminos-y-condiciones"
                className="font-montserrat inline-block text-gray-300 hover:text-green-400 
                       transition-colors duration-300 text-sm font-medium text-center"
              >
                Términos y Condiciones
              </a>
            </div>
          </div>

          {/* Columna 2: Ubicación + Contacto + Redes - COMO EN LA IMAGEN */}
          <div className="space-y-4">
            {/* Título */}
            <h3 className="font-montserrat text-xl font-semibold text-white mb-2">
              Ubicación
            </h3>

            {/* Dirección - alineada a la izquierda como en la imagen */}
            <div className="font-montserrat text-gray-300 text-sm font-medium leading-relaxed space-y-1">
              {direccion.split("\n").map((linea, idx) => (
                <p key={idx}>{linea}</p>
              ))}
            </div>

            {/* Teléfono - alineado a la izquierda */}
            <div className="space-y-1">
              <p className="font-montserrat text-xs text-gray-400 mb-1">
                Teléfono
              </p>
              <a
                href={`tel:${telefono.replace(/\s/g, "")}`}
                className="font-montserrat block text-white font-medium hover:text-yellow-300 
               transition-colors duration-300 text-sm"
              >
                {telefono}
              </a>
            </div>

            {/* Email - alineado a la izquierda */}
            <div className="space-y-1">
              <p className="font-montserrat text-xs text-gray-400 mb-1">
                Email
              </p>
              <a
                href={`mailto:${email}`}
                className="font-montserrat block text-white font-medium hover:text-yellow-300 
               transition-colors duration-300 text-sm"
              >
                {email}
              </a>
            </div>

            {/* Íconos de redes sociales - centrados abajo */}
            <div className="flex justify-center gap-3 pt-4">
              {redesSociales.map((red, idx) => {
                const Icono =
                  red.nombre === "instagram"
                    ? InstagramIcon
                    : red.nombre === "linkedin"
                    ? LinkedInIcon
                    : red.nombre === "whatsapp"
                    ? WhatsAppIcon
                    : red.nombre === "ubicacion"
                    ? LocationIcon
                    : null;

                return (
                  <a
                    key={idx}
                    href={red.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-yellow-300 transition-colors duration-300 p-2 rounded-md hover:bg-white/10"
                    aria-label={`Ir a ${red.nombre}`}
                  >
                    {Icono && <Icono />}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Columna 3: Suscripción - centrada */}
          {mostrarFormularioSuscripcion && (
            <div className="space-y-4 text-center max-w-sm mx-auto">
              <h3 className="font-montserrat text-xl font-semibold text-white mb-2 text-center">
                Suscripción
              </h3>

              <form
                onSubmit={handleSubmit}
                className="space-y-3 w-full max-w-xs mx-auto"
              >
                {/* Input Nombre */}
                <input
                  type="text"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="font-montserrat w-full px-4 py-2 bg-white text-gray-900 
                           placeholder-gray-500 text-sm rounded font-medium text-center
                           focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />

                {/* Input Email */}
                <input
                  type="email"
                  placeholder="Email"
                  value={emailSuscripcion}
                  onChange={(e) => setEmailSuscripcion(e.target.value)}
                  required
                  className="font-montserrat w-full px-4 py-2 bg-white text-gray-900 
                           placeholder-gray-500 text-sm rounded font-medium text-center
                           focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />

                {/* Texto informativo */}
                <p className="font-montserrat text-xs text-gray-300 leading-relaxed font-medium text-center">
                  ¡Dejanos tus datos y recibí todas las promos en tu email!
                </p>

                {/* Botón */}
                <button
                  type="submit"
                  className="font-montserrat w-full px-5 py-2 bg-amber-600 hover:bg-amber-700 
                           text-white font-semibold rounded transition-colors 
                           duration-300 text-sm text-center"
                >
                  Registrarme
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Franja inferior: Copyright - centrado */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
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
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
          <p className="font-montserrat text-sm text-gray-500 text-center font-medium">
            {textoDerechos}
          </p>
        </div>
      </div>

      {/* Botón Scroll to Top - sin cambios */}
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
