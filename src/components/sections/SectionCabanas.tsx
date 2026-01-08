import type { FC } from "react";
import {
  IconWifi,
  IconTv,
  IconBed,
  IconKitchen,
  IconParking,
  IconMountain,
  IconFire,
} from "@components/common/Icons";
import { cabanas } from "@constants/cabanas";
import type { IconName } from "@constants/cabanas";

const getIcon = (name: IconName) => {
  switch (name) {
    case "wifi":
      return <IconWifi className="w-5 h-5" />;
    case "tv":
      return <IconTv className="w-5 h-5" />;
    case "bed":
      return <IconBed className="w-5 h-5" />;
    case "kitchen":
      return <IconKitchen className="w-5 h-5" />;
    case "parking":
      return <IconParking className="w-5 h-5" />;
    case "mountain":
      return <IconMountain className="w-5 h-5" />;
    case "fire":
      return <IconFire className="w-5 h-5" />;
    default:
      return null;
  }
};

interface SectionCabanasProps {
  onReservar?: (cabanaId: string) => void;
  onVerFotos?: (cabanaId: string) => void;
}

const SectionCabanas: FC<SectionCabanasProps> = ({
  onReservar,
  onVerFotos,
}) => {
  return (
    <section
      className="w-full bg-stone-100 pt-[50px] pb-0"
      id="nuestras-cabanas"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header con título y descripción */}
        <div className="text-center mb-16 md:mb-20">
          <div className="mb-4">
            <span className="font-montserrat text-[14px] font-semibold text-[#8a754e] tracking-[0.2em] uppercase">
              Mirador de Luz
            </span>
          </div>

          <h2 className="font-montserrat text-[36px] md:text-[48px] lg:text-[56px] font-extrabold text-[#1E1E1E] mb-4 md:mb-6">
            Nuestras Cabañas
          </h2>

          <p className="font-montserrat text-[16px] md:text-[18px] font-medium text-[#4A4A4A] leading-relaxed max-w-2xl mx-auto">
            Descubre el lugar perfecto para tu escapada. Todas nuestras cabañas
            cuentan con las comodidades necesarias para una estadía inolvidable.
          </p>
        </div>

        {/* Los bloques de cabañas */}
        <div className="space-y-24">
          {cabanas.map((cabana, index) => {
            const esPar = index % 2 === 0;

            return (
              <div
                key={cabana.id}
                id={cabana.slug}
                className="relative scroll-mt-32"
              >
                <div
                  className={`flex flex-col ${
                    esPar ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-0 relative items-center`}
                >
                  {/* Imagen de la cabaña */}
                  <div
                    className="relative w-full lg:w-[60%] aspect-[3/2] overflow-hidden rounded-3xl group cursor-pointer"
                    onClick={() =>
                      (window.location.href = `/reserva/${cabana.id}`)
                    }
                  >
                    <picture className="w-full h-full">
                      {cabana.imagenDesktop || cabana.imagenMobile ? (
                        <>
                          <source
                            media="(min-width: 768px)"
                            srcSet={cabana.imagenDesktop || cabana.imagenUrl}
                          />
                          <source
                            media="(max-width: 767px)"
                            srcSet={cabana.imagenMobile || cabana.imagenUrl}
                          />
                        </>
                      ) : null}
                      <img
                        src={cabana.imagenUrl}
                        alt={`${cabana.nombre} - Cabaña equipada en Villa Santa Cruz del Lago, Córdoba`}
                        className="w-full h-full object-cover transition-all duration-700 brightness-[0.95] contrast-[1.05] saturate-[1.05] group-hover:scale-105 group-hover:brightness-110 group-hover:contrast-100"
                        loading="lazy"
                        style={
                          {
                            viewTransitionName: `cabin-image-${cabana.id}`,
                          } as React.CSSProperties
                        }
                      />
                    </picture>
                    {/* Overlay de sombra suave (gradiente) para profundidad */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-40" />

                    {/* Overlay al hacer hover para indicar click */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>

                  {/* Card blanca superpuesta */}
                  <div
                    className={`relative w-full lg:w-[45%] z-10 -mt-16 lg:mt-0 mx-4 lg:mx-0 ${
                      esPar ? "lg:-ml-20" : "lg:-mr-20"
                    }`}
                  >
                    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-stone-100 rounded-full font-montserrat text-[11px] md:text-[12px] font-bold text-[#8a754e] tracking-[0.1em] uppercase">
                          {cabana.etiqueta}
                        </span>
                      </div>

                      <h3 className="font-montserrat text-[28px] md:text-[32px] font-bold text-[#1E1E1E] mb-4">
                        <a
                          href={`/reserva-${cabana.slug}`}
                          className="hover:text-amber-700 transition-colors"
                          style={
                            {
                              viewTransitionName: `cabin-title-${cabana.id}`,
                            } as React.CSSProperties
                          }
                        >
                          {cabana.nombre}
                        </a>
                      </h3>

                      <p className="font-montserrat text-[14px] md:text-[16px] font-medium text-[#4A4A4A] leading-[1.7] mb-6">
                        {cabana.descripcion}
                      </p>

                      {/* Amenities en grid 2x2 */}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-6">
                        {cabana.amenities.map((amenity, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 text-gray-700 text-sm"
                          >
                            <span className="text-[#8a754e]">
                              {getIcon(amenity.icon)}
                            </span>
                            <span className="font-montserrat font-medium">
                              {amenity.label}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-gray-100 my-6" />

                      <div className="flex justify-center lg:justify-start">
                        <a
                          href={`/reserva-${cabana.slug}`}
                          className="w-full lg:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-amber-500 text-white font-bold rounded-xl uppercase tracking-widest text-xs transition-all duration-300 shadow-lg hover:bg-gradient-to-r hover:from-amber-600 hover:to-orange-600 hover:shadow-2xl hover:shadow-orange-500/40 hover:-translate-y-1 group"
                        >
                          Ver disponibilidad
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 transform group-hover:translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SectionCabanas;
