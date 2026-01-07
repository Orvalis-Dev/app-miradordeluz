import { type FC } from "react";
import {
  IconInstagram as InstagramIcon,
  IconFacebook as FacebookIcon,
  IconWhatsApp as WhatsAppIcon,
  IconMapPin as LocationIcon,
  IconPhone as PhoneIcon,
  IconMail as MailIcon,
  IconArrowUp as ArrowUpIcon,
  IconMountain as LogoIcon,
} from "./ui/Icons";

// Tipos
interface RedSocial {
  nombre: "instagram" | "facebook" | "whatsapp" | "ubicacion";
  url: string;
}

interface LinkNavegacion {
  texto: string;
  url: string;
}

interface FooterMiradorDeLuzProps {
  direccion?: string;
  telefono?: string;
  email?: string;
  redesSociales?: RedSocial[];
  linksNavegacion?: LinkNavegacion[];
  mostrarScrollTop?: boolean;
}

const FooterMiradorDeLuz: FC<FooterMiradorDeLuzProps> = ({
  direccion = "Las Orquideas 893, Villa Santa Cruz del Lago, Córdoba, Argentina",
  telefono = "+54 3813 51 3513",
  email = "miradordeluz2019@gmail.com",
  redesSociales = [
    {
      nombre: "instagram",
      url: "https://www.instagram.com/complejo_miradordeluz/",
    },
    {
      nombre: "facebook",
      url: "https://facebook.com/miradordeluz",
    },
    { nombre: "whatsapp", url: "https://wa.me/5493813513513" },
    {
      nombre: "ubicacion",
      url: "https://www.google.com/maps/place/Mirador+de+Luz/@-31.3730543,-64.5250168,17z/data=!4m6!3m5!1s0x942d65f0c8772fbd:0x4d7f1d8348462d0a!8m2!3d-31.3730589!4d-64.5224419!16s%2Fg%2F11y59brg9t?entry=ttu",
    },
  ],
  linksNavegacion = [
    { texto: "Inicio", url: "/" },
    { texto: "Cabañas", url: "/#cabanas" },
    { texto: "Servicios", url: "/#servicios" },
    { texto: "Galería", url: "/galeria" },
    { texto: "Reservar", url: "/#cabanas" },
  ],
  mostrarScrollTop = true,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-slate-900 text-white border-t border-white/5 font-montserrat">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        {/* Contenido Centralizado */}
        <div className="flex flex-col items-center text-center space-y-10">
          {/* 1. Bloque de Marca (Logo + Slogan) */}
          <div className="flex flex-col items-center space-y-4">
            <a
              href="/"
              className="flex items-center gap-3 group transition-transform hover:scale-105"
            >
              <LogoIcon className="w-12 h-12 text-amber-500" />
              <div className="flex flex-col items-start leading-none text-left">
                <span className="text-3xl font-bold tracking-tight">
                  Mirador <span className="text-amber-500">de Luz</span>
                </span>
                <span className="text-[11px] uppercase tracking-[0.3em] text-gray-400 mt-1 font-semibold">
                  Complejo de Cabañas
                </span>
              </div>
            </a>
            <p className="text-gray-400 text-sm font-medium tracking-wide italic">
              "Tu refugio en las sierras de Córdoba."
            </p>
          </div>

          {/* 2. Redes Sociales */}
          <div className="flex gap-6 items-center justify-center">
            {redesSociales.map((red, idx) => {
              const iconMap = {
                instagram: InstagramIcon,
                facebook: FacebookIcon,
                whatsapp: WhatsAppIcon,
                ubicacion: LocationIcon,
              };
              if (red.nombre === "ubicacion") return null;
              const Icono = iconMap[red.nombre as keyof typeof iconMap];

              return Icono ? (
                <a
                  key={idx}
                  href={red.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 hover:bg-amber-500 hover:text-white transition-all duration-300 border border-white/10 group shadow-lg"
                  aria-label={`Ir a ${red.nombre}`}
                >
                  <Icono className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
              ) : null;
            })}
          </div>

          {/* 3. Datos de Contacto (Condensados) */}
          <div className="w-full max-w-4xl pt-2">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0 md:divide-x md:divide-white/10 text-sm font-medium text-gray-300">
              {/* Ubicación */}
              <div className="flex items-center gap-2 md:px-6">
                <LocationIcon className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="md:whitespace-nowrap">
                  Las Orquideas 893, Villa Santa Cruz del Lago
                </span>
              </div>

              {/* Teléfono */}
              <div className="flex items-center gap-2 md:px-6">
                <PhoneIcon className="w-4 h-4 text-amber-500 shrink-0" />
                <a
                  href={`tel:${telefono.replace(/\s/g, "")}`}
                  className="hover:text-amber-500 transition-colors"
                >
                  {telefono}
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2 md:px-6">
                <MailIcon className="w-4 h-4 text-amber-500 shrink-0" />
                <a
                  href={`mailto:${email}`}
                  className="hover:text-amber-500 transition-colors break-all"
                >
                  {email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Barra Inferior (Bottom Bar) */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-4">
            {/* Copyright + Dev */}
            <div className="text-[11px] text-gray-500 font-medium text-center md:text-left tracking-wide">
              © {new Date().getFullYear()} Mirador de Luz. Todos los derechos
              reservados.{" "}
              <span className="opacity-40 ml-1">
                Desarrollado por{" "}
                <a
                  href="https://orvalis.com.ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-500 transition-colors underline underline-offset-2"
                >
                  Orvalis
                </a>
                .
              </span>
            </div>

            {/* Legal Link */}
            <a
              href="/terminos-y-condiciones"
              className="text-[11px] text-gray-400 hover:text-amber-500 transition-colors font-medium underline underline-offset-4 decoration-white/10 tracking-widest uppercase px-2"
            >
              Términos y Condiciones
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Top Button */}
      {mostrarScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-amber-600 hover:bg-amber-500 
                   text-white rounded-full shadow-2xl flex items-center justify-center
                   transition-all duration-300 hover:scale-110 active:scale-95 z-50 group"
          aria-label="Volver arriba"
        >
          <ArrowUpIcon className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        </button>
      )}
    </footer>
  );
};

export default FooterMiradorDeLuz;
