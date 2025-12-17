import type { FC, ReactNode } from 'react';
import { FiWifi, FiCoffee, FiTruck, FiCheck, FiClock, FiEye, FiLayers, FiPlus, FiTv, FiWind, FiDivide, FiAlertCircle, FiBell, FiAlertTriangle, FiArrowRight } from "react-icons/fi";
import { GiBarbecue, GiFlame, GiPineTree, GiBed, GiCooler } from "react-icons/gi";
import { MdOutlinePool, MdGarage, MdEmergency, MdLightMode } from "react-icons/md";
import { FaUtensils, FaFireExtinguisher, FaBed } from "react-icons/fa6";
import { PiOvenDuotone, PiFanDuotone } from "react-icons/pi";
import { TbAirConditioning } from "react-icons/tb";

// Iconos SVG para amenities
const WifiIcon: FC = () => (
  <FiWifi className="w-6 h-6" aria-hidden />
);

const BedIcon: FC = () => (
  <FaBed className="w-6 h-6" aria-hidden />
);

const FireIcon: FC = () => (
  <FaFireExtinguisher className="w-6 h-6" aria-hidden />
);

const MountainIcon: FC = () => (
  <GiPineTree className="w-6 h-6" aria-hidden />
);

const TvIcon: FC = () => (
  <FiTv className="w-6 h-6" aria-hidden />
);

const KitchenIcon: FC = () => (
  <FaUtensils className="w-6 h-6" aria-hidden />
);

const ArrowRightIcon: FC = () => (
  <FiArrowRight className="w-6 h-6" aria-hidden />
);

const GarageIcon: FC = () => (
  <MdGarage className="w-6 h-6" aria-hidden />
);
// Tipo de datos para amenities
type Amenity = {
  icon: ReactNode;
  label: string;
};

// Tipo de datos para cabañas
type Cabana = {
  id: string;
  nombre: string;
  etiqueta: string;
  descripcion: string;
  amenities: Amenity[];
  imagenUrl: string;
};

// Props del componente
interface SectionCabanasMiradorDeLuzV3Props {
  cabanas?: Cabana[];
  onReservar?: (cabanaId: string) => void;
  onVerFotos?: (cabanaId: string) => void;
  // mantener compatibilidad por si se usa la prop antigua
  onVerDetalles?: (cabanaId: string) => void;
}

// Datos por defecto de las 4 cabañas
const cabanasDefault: Cabana[] = [
  {
    id: '1',
    nombre: 'Cabaña Nº1',
    etiqueta: 'HASTA 4 PERSONAS',
    descripcion: 'Cabaña de facil acceso y hermosa vista a las sierras. Entrada plana y sin escaleras; Living con cama marinera; cocina amplia con comedor; dormitorio matrimonial y/o individual; baño completo y comodo.',
    amenities: [
      { icon: <BedIcon />, label: 'Cama Matrimonial' },
      { icon: <TvIcon />, label: 'Smart TV 43"' },
      { icon: <MountainIcon />, label: 'Vista a montañas' },
      { icon: <GarageIcon />, label: 'Cochera' },
    ],
    imagenUrl: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=1200',
  },
  {
    id: '2',
    nombre: 'Cabaña Nº2',
    etiqueta: 'HASTA 6 PERSONAS',
    descripcion: 'Cabaña más confortable del complejo. Cuenta con 2 dormitorios matrimoniales y/o indiviudales; Living con sofa cama con marinera; cocina amplia con comedor; anta baño y baño completo.',
    amenities: [
      { icon: <BedIcon />, label: ' 2 Dormitorios' },
      { icon: <TvIcon />, label: 'Smart TV 43"' },
      { icon: <KitchenIcon />, label: 'Cocina equipada' },
      { icon: <GarageIcon />, label: 'Cochera' },
    ],
    imagenUrl: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200',
  },
  {
    id: '3',
    nombre: 'Cabaña Nº3',
    etiqueta: 'MONOAMBIENTE HASTA 4 PERSONAS',
    descripcion: 'Cabaña de facil acceso y sin escalones. Cuenta con cama matrimonial y cama marinera; cocina amplica con comedor y baño comodo.',
    amenities: [
      { icon: <BedIcon />, label: 'Cama Matrimonial' },
      { icon: <TvIcon />, label: 'Smart TV 43"' },
      { icon: <KitchenIcon />, label: 'Cocina completa' },
      { icon: <GarageIcon />, label: 'Cochera' },
    ],
    imagenUrl: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200',
  },
  {
    id: '4',
    nombre: 'Cabaña Nº4',
    etiqueta: 'HASTA 6 PERSONAS',
    descripcion: 'Cabaña más confortable del complejo. Cuenta con 2 dormitorios matrimoniales y/o indiviudales; Living con sofa cama con marinera; cocina amplia con comedor; anta baño y baño completo.',
    amenities: [
      { icon: <BedIcon />, label: '2 Dormitorios' },
      { icon: <TvIcon />, label: 'Smart TV 43"' },
      { icon: <KitchenIcon />, label: 'Cocina completa' },
      { icon: <GarageIcon />, label: 'Cochera' },
    ],
    imagenUrl: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1200',
  },
];

const SectionCabanasMiradorDeLuzV3: FC<SectionCabanasMiradorDeLuzV3Props> = ({
  cabanas = cabanasDefault,
  onReservar,
  onVerFotos,
  onVerDetalles,
}) => {
  const handleReservar = (cabanaId: string) => {
    if (onReservar) {
      onReservar(cabanaId);
    } else {
      window.location.href = `/reservas?cabana=${cabanaId}`;
    }
  };
  const handleVerFotos = (cabanaId: string) => {
    // Priorizar prop nueva `onVerFotos`, luego compatibilidad con `onVerDetalles`,
    // y por último redirigir a la galería con filtro por cabana (query param).
    if (onVerFotos) {
      onVerFotos(cabanaId);
    } else if (onVerDetalles) {
      onVerDetalles(cabanaId);
    } else {
      window.location.href = `/galeria?cabana=${encodeURIComponent(cabanaId)}`;
    }
  };

  return (
    <section className="w-full bg-stone-50 pt-[50px] pb-0">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header con título y descripción */}
        <div className="text-center mb-16 md:mb-20">
          {/* Etiqueta superior */}
          <div className="mb-4">
            <span className="font-montserrat text-[14px] font-semibold text-[#A8936D] tracking-[0.2em] uppercase">
              Mirador de Luz
            </span>
          </div>

          {/* Título principal */}
          <h2 className="font-montserrat text-[36px] md:text-[48px] lg:text-[56px] font-extrabold text-[#1E1E1E] mb-4 md:mb-6">
            Nuestras Cabañas
          </h2>

          {/* Descripción */}
          <p className="font-montserrat text-[16px] md:text-[18px] font-medium text-[#4A4A4A] leading-relaxed max-w-2xl mx-auto">
            Descubre el lugar perfecto para tu escapada. Todas nuestras cabañas cuentan con las comodidades necesarias para una estadía inolvidable.
          </p>
        </div>

        {/* Los 4 bloques de cabañas */}
        <div className="space-y-24">
          {cabanas.map((cabana, index) => {
            // Determinar si es par o impar para alternar la dirección
            const esPar = index % 2 === 0;

            return (
              <div key={cabana.id} className="relative">
                {/* Usar flex con dirección alternada */}
                <div className={`flex flex-col ${esPar ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-0 relative items-center`}>
                  {/* Imagen de la cabaña */}
                  <div className="relative w-full lg:w-[60%] h-[360px] md:h-[420px] lg:h-[460px] overflow-hidden rounded-3xl">
                    <img
                      src={cabana.imagenUrl}
                      alt={cabana.nombre}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Card blanca superpuesta */}
                  <div className={`relative w-full lg:w-[45%] z-10 -mt-16 lg:mt-0 mx-4 lg:mx-0 ${esPar ? 'lg:-ml-20' : 'lg:-mr-20'}`}>
                    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                      {/* Etiqueta superior */}
                      <div className="mb-3">
                        <span className="font-montserrat text-[14px] font-semibold text-[#A8936D] tracking-[0.2em] uppercase">
                          {cabana.etiqueta}
                        </span>
                      </div>

                      {/* Nombre de la cabaña */}
                      <h3 className="font-montserrat text-[28px] md:text-[32px] font-bold text-[#1E1E1E] mb-4">
                        {cabana.nombre}
                      </h3>

                      {/* Descripción */}
                      <p className="font-montserrat text-[14px] md:text-[16px] font-medium text-[#4A4A4A] leading-relaxed mb-5">
                        {cabana.descripcion}
                      </p>

                      {/* Amenities en grid 2x2 */}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-5">
                        {cabana.amenities.map((amenity, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-gray-700 text-sm">
                            <span className="text-amber-600">{amenity.icon}</span>
                            <span className="font-montserrat font-medium">{amenity.label}</span>
                          </div>
                        ))}
                      </div>

                      {/* Línea divisoria */}
                      <div className="border-t border-gray-200 my-5" />

                      {/* Botones */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        {/* Botón Reservar */}
                        <button
                          onClick={() => handleReservar(cabana.id)}
                          className="font-montserrat flex-1 inline-flex items-center justify-center gap-2 bg-linear-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-full font-semibold text-sm hover:from-amber-700 hover:to-amber-800 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl"
                        >
                          <span>Reservar</span>
                          <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                            <ArrowRightIcon />
                          </span>
                        </button>

                        {/* Botón Ver fotos */}
                        <button
                          onClick={() => handleVerFotos(cabana.id)}
                          className="font-montserrat flex-1 inline-flex items-center justify-center gap-2 border-2 border-gray-600 text-gray-700 px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-100 transition-all"
                        >
                          <span>Ver fotos</span>
                        </button>
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

export default SectionCabanasMiradorDeLuzV3;

