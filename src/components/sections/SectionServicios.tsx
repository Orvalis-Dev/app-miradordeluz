import { type FC, type ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiWifi,
  FiCoffee,
  FiClock,
  FiEye,
  FiLayers,
  FiPlus,
  FiTv,
  FiWind,
  FiDivide,
  FiBell,
  FiSun,
  FiVideo,
} from "react-icons/fi";
import { GiBarbecue, GiPineTree, GiBed, GiCooler } from "react-icons/gi";
import {
  MdOutlinePool,
  MdGarage,
  MdEmergency,
  MdLightMode,
  MdHotTub,
  MdBeachAccess,
} from "react-icons/md";
import { FaUtensils, FaFireExtinguisher, FaBed } from "react-icons/fa6";
import { PiOvenDuotone, PiFanDuotone } from "react-icons/pi";
import { TbAirConditioning } from "react-icons/tb";

// Iconos base (monocromo)
const WifiIcon: FC = () => <FiWifi className="w-6 h-6" aria-hidden />;

const CoffeeIcon: FC = () => <FiCoffee className="w-6 h-6" aria-hidden />;

const CarIcon: FC = () => <MdGarage className="w-6 h-6" aria-hidden />;

const BedIcon: FC = () => <FaBed className="w-6 h-6" aria-hidden />;

const AirConditioningIcon: FC = () => (
  <TbAirConditioning className="w-6 h-6" aria-hidden />
);

const ClockIcon: FC = () => <FiClock className="w-6 h-6" aria-hidden />;

// Icons representativos para instalaciones (monocromo: stroke=currentColor)
const PoolIcon: FC = () => <MdOutlinePool className="w-8 h-8" aria-hidden />;

const HotTubIcon: FC = () => <MdHotTub className="w-8 h-8" aria-hidden />;

const SunIcon: FC = () => <FiSun className="w-8 h-8" aria-hidden />;

const CameraIcon: FC = () => <FiVideo className="w-6 h-6" aria-hidden />;

const UmbrellaIcon: FC = () => (
  <MdBeachAccess className="w-6 h-6" aria-hidden />
);

const ViewIcon: FC = () => <FiEye className="w-8 h-8" aria-hidden />;

const GrillIcon: FC = () => <GiBarbecue className="w-8 h-8" aria-hidden />;

const DeckIcon: FC = () => <FiLayers className="w-8 h-8" aria-hidden />;

const PanoramaIcon: FC = () => <FiLayers className="w-8 h-8" aria-hidden />;

const TreeIcon: FC = () => <GiPineTree className="w-8 h-8" aria-hidden />;

const PlusIcon: FC = () => <FiPlus className="w-6 h-6" aria-hidden />;

// Icons adicionales solicitados (monocromo)
const TVIcon: FC = () => <FiTv className="w-6 h-6" aria-hidden />;

const ACIcon: FC = () => <FiWind className="w-6 h-6" aria-hidden />;

const FanIcon: FC = () => <PiFanDuotone className="w-6 h-6" aria-hidden />;

const StoveIcon: FC = () => <FaUtensils className="w-6 h-6" aria-hidden />;

const FridgeIcon: FC = () => <GiCooler className="w-6 h-6" aria-hidden />;

const MicrowaveIcon: FC = () => (
  <PiOvenDuotone className="w-6 h-6" aria-hidden />
);

const CleaningIcon: FC = () => <FaBed className="w-6 h-6" aria-hidden />;

const BeddingIcon: FC = () => <GiBed className="w-6 h-6" aria-hidden />;

const TowelsIcon: FC = () => <FiLayers className="w-6 h-6" aria-hidden />;

const BreakfastIcon: FC = () => <FiCoffee className="w-6 h-6" aria-hidden />;

const FireExtIcon: FC = () => (
  <FaFireExtinguisher className="w-6 h-6" aria-hidden />
);

const EmergencyLightIcon: FC = () => (
  <MdLightMode className="w-6 h-6" aria-hidden />
);

const MedicalIcon: FC = () => <MdEmergency className="w-6 h-6" aria-hidden />;

const DifferentialIcon: FC = () => <FiDivide className="w-6 h-6" aria-hidden />;

const AlarmIcon: FC = () => <FiBell className="w-6 h-6" aria-hidden />;

// Tipos
export interface Servicio {
  id: string;
  icon?: ReactNode;
  titulo: string;
  descripcion: string;
  colorAccent?: "green" | "amber" | "orange";
}

export interface Instalacion {
  id: string;
  titulo: string;
  descripcion?: string;
  icon?: ReactNode;
}

interface SectionServiciosProps {
  servicios?: Servicio[];
  instalaciones?: Instalacion[];
  imagenesInstalaciones?: string[];
  mostrarCTA?: boolean;
  textoCTA?: string;
  onClickCTA?: () => void;
}

const SectionServicios: FC<SectionServiciosProps> = ({
  servicios = [
    {
      id: "1",
      icon: <WifiIcon />,
      titulo: "WiFi",
      descripcion: "Conexión en todo el predio",
      colorAccent: "green",
    },
    {
      id: "2",
      icon: <CarIcon />,
      titulo: "Cochera",
      descripcion: "Espacio semi cubierto para tu vehículo",
      colorAccent: "green",
    },
    {
      id: "3",
      icon: <PoolIcon />,
      titulo: "Pileta",
      descripcion: "Disfruta del sol y el agua",
      colorAccent: "amber",
    },
    {
      id: "4",
      icon: <BedIcon />,
      titulo: "Ropa blanca",
      descripcion: "Toallas y sábanas incluidas",
      colorAccent: "amber",
    },
    {
      id: "5",
      icon: <AirConditioningIcon />,
      titulo: "Climatización",
      descripcion: "Aire acondicionado frío/calor",
      colorAccent: "orange",
    },
    {
      id: "6",
      icon: <GrillIcon />,
      titulo: "Asador",
      descripcion: "Zona de parrilla individual",
      colorAccent: "amber",
    },
  ],
  instalaciones = [],
  imagenesInstalaciones = [
    "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800",
  ],
  mostrarCTA = true,
  textoCTA = "Ver todos los servicios",
  onClickCTA,
}) => {
  // Función para obtener color de acento
  const getAccentColor = (color?: "green" | "amber" | "orange") => {
    // Usar tonos grises neutros en vez de acentos de color
    const colors = {
      green: "bg-stone-100 text-stone-700",
      amber: "bg-stone-100 text-stone-700",
      orange: "bg-stone-100 text-stone-700",
    };
    return colors[color || "green"];
  };

  const handleClickCTA = () => {
    if (onClickCTA) {
      onClickCTA();
    } else {
      // Abrir modal de servicios
      setIsModalOpen(true);
    }
  };

  // Estado del modal "Ver más"
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  return (
    <section className="bg-stone-50 py-20 pt-0 md:py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Encabezado de la sección */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Etiqueta pequeña */}
          <div className="mb-4">
            <span className="font-montserrat text-[14px] font-semibold text-[#756341] tracking-[0.2em] uppercase">
              SERVICIOS & INSTALACIONES
            </span>
          </div>

          {/* Título principal */}
          <h2 className="font-montserrat text-[36px] md:text-[48px] lg:text-[56px] font-extrabold text-[#1E1E1E] mb-4">
            Todo lo que necesitás para desconectar
          </h2>

          {/* Subtítulo */}
          <p className="font-montserrat text-[16px] md:text-[18px] font-medium text-[#4A4A4A] leading-relaxed max-w-3xl mx-auto">
            Disfrutá del confort de nuestras cabañas totalmente equipadas y de
            los espacios comunes pensados para que tu estadía sea perfecta.
            Naturaleza, comodidad y atención personalizada en cada detalle.
          </p>
        </motion.div>

        {/* Bloque de Servicios (selección con íconos y link a modal) */}
        <div className="mb-16 md:mb-20">
          {/* Grilla de iconos representativos - UX mejorada: 2 columnas en mobile, 3 en desktop */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:max-w-4xl lg:mx-auto gap-y-8 md:gap-y-12 gap-x-4 py-8 px-2 justify-items-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {servicios.slice(0, 6).map((servicio) => (
              <motion.div
                key={servicio.id}
                className="flex flex-col items-center gap-3 w-full max-w-[140px] md:max-w-[160px] text-center"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      ease: [0.33, 1, 0.68, 1],
                    },
                  },
                }}
              >
                <div
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center ${getAccentColor(
                    servicio.colorAccent,
                  )}`}
                >
                  {servicio.icon || <BedIcon />}
                </div>
                <div className="font-montserrat text-sm md:text-base font-medium text-[#1E1E1E] w-full px-1">
                  {servicio.titulo}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Call To Action */}
        {mostrarCTA && (
          <motion.div
            className="text-center mt-12 md:mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p className="font-montserrat text-[16px] font-medium text-[#4A4A4A] mb-4">
              ¿Querés saber más sobre nuestras cabañas?
            </p>
            <button
              onClick={handleClickCTA}
              aria-haspopup="dialog"
              className="font-montserrat inline-flex items-center px-8 py-3 rounded-full border-2 border-gray-800 text-sm font-semibold text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
            >
              {textoCTA}
            </button>
          </motion.div>
        )}
        {/* Modal "Ver más" - lista completa de servicios e instalaciones */}
        <AnimatePresence>
          {isModalOpen && (
            <div
              className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-4"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-servicios-title"
            >
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                onClick={closeModal}
                aria-hidden="true"
              />

              {/* Dialogo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                className="relative z-10 w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden"
              >
                <div className="flex items-center justify-between p-6 border-b">
                  <h3
                    id="modal-servicios-title"
                    className="font-montserrat text-xl font-semibold text-[#1E1E1E]"
                  >
                    ¿Qué ofrece este alojamiento?
                  </h3>
                  <button
                    onClick={closeModal}
                    aria-label="Cerrar"
                    className="p-2 rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#756341]"
                  >
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
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

                <div className="p-0 max-h-[80vh] overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:divide-x divide-stone-100 items-start">
                    {/* Columna 1: Instalaciones y Servicios */}
                    <div className="p-6 md:p-8 space-y-10">
                      {/* INSTALACIONES */}
                      <section>
                        <h4 className="font-montserrat text-[12px] font-bold text-[#756341] tracking-[0.2em] uppercase mb-6 h-[20px] flex items-center">
                          INSTALACIONES
                        </h4>
                        <div className="space-y-0">
                          {[
                            { id: "parque", titulo: "Espacio verde", Icon: TreeIcon },
                            { id: "pileta", titulo: "Pileta", Icon: PoolIcon },
                            {
                              id: "hidro",
                              titulo: "Hidromasaje",
                              Icon: HotTubIcon,
                            },
                            {
                              id: "solarium",
                              titulo: "Solárium",
                              Icon: SunIcon,
                            },
                            { id: "cochera", titulo: "Cochera semi cubierta", Icon: CarIcon },
                            { id: "asador", titulo: "Asador", Icon: GrillIcon },
                          ].map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-4 py-2 border-b border-stone-50 last:border-0 group"
                            >
                              <div className="w-8 h-8 flex items-center justify-center text-stone-600 group-hover:text-[#756341] transition-colors">
                                <item.Icon />
                              </div>
                              <span className="font-montserrat text-[15px] font-medium text-[#333]">
                                {item.titulo}
                              </span>
                            </div>
                          ))}
                        </div>
                      </section>

                      {/* SERVICIOS */}
                      <section>
                        <h4 className="font-montserrat text-[12px] font-bold text-[#756341] tracking-[0.2em] uppercase mb-6 h-[20px] flex items-center">
                          SERVICIOS
                        </h4>
                        <div className="space-y-0">
                          {[
                            {
                              id: "limpieza",
                              titulo: "Limpieza",
                              Icon: CleaningIcon,
                            },
                            {
                              id: "ropa",
                              titulo: "Ropa blanca",
                              Icon: BeddingIcon,
                            },
                            {
                              id: "wifi",
                              titulo: "Wifi",
                              Icon: WifiIcon,
                            },
                            {
                              id: "reposeras",
                              titulo: "Reposeras",
                              Icon: TowelsIcon,
                            },
                            {
                              id: "sombrilla",
                              titulo: "Sombrilla y sillas",
                              Icon: UmbrellaIcon,
                            },
                          ].map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-4 py-2 border-b border-stone-50 last:border-0 group"
                            >
                              <div className="w-8 h-8 flex items-center justify-center text-stone-600 group-hover:text-[#756341] transition-colors">
                                <item.Icon />
                              </div>
                              <span className="font-montserrat text-[15px] font-medium text-[#333]">
                                {item.titulo}
                              </span>
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>

                    {/* Columna 2: Equipamientos y Seguridad */}
                    <div className="p-6 md:p-8 space-y-10 bg-stone-50/50 min-h-full">
                      {/* EQUIPAMIENTOS */}
                      <section>
                        <h4 className="font-montserrat text-[12px] font-bold text-[#756341] tracking-[0.2em] uppercase mb-6 h-[20px] flex items-center">
                          EQUIPAMIENTOS
                        </h4>
                        <div className="space-y-0">
                          {[
                            {
                              id: "tv",
                              titulo: 'Smart TV 32"',
                              Icon: TVIcon,
                            },
                            {
                              id: "ac",
                              titulo: "Aire acondicionado frío/calor",
                              Icon: ACIcon,
                            },
                            {
                              id: "fan",
                              titulo: "Ventilador portátil",
                              Icon: FanIcon,
                            },
                            {
                              id: "cocina",
                              titulo: "Cocina completa",
                              Icon: StoveIcon,
                            },
                            {
                              id: "heladera",
                              titulo: "Heladera",
                              Icon: FridgeIcon,
                            },
                            {
                              id: "micro",
                              titulo: "Microondas",
                              Icon: MicrowaveIcon,
                            },
                          ].map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-4 py-2 border-b border-stone-100 last:border-0 group"
                            >
                              <div className="w-8 h-8 flex items-center justify-center text-stone-600 group-hover:text-[#756341] transition-colors">
                                <item.Icon />
                              </div>
                              <span className="font-montserrat text-[15px] font-medium text-[#333]">
                                {item.titulo}
                              </span>
                            </div>
                          ))}
                        </div>
                      </section>

                      {/* SEGURIDAD */}
                      <section>
                        <h4 className="font-montserrat text-[12px] font-bold text-[#756341] tracking-[0.2em] uppercase mb-6 h-[20px] flex items-center">
                          SEGURIDAD
                        </h4>
                        <div className="space-y-0">
                          {[
                            {
                              id: "matafuegos",
                              titulo: "Matafuegos",
                              Icon: FireExtIcon,
                            },
                            {
                              id: "luz",
                              titulo: "Luz de emergencia",
                              Icon: EmergencyLightIcon,
                            },
                            {
                              id: "dif",
                              titulo: "Disyuntor diferencial",
                              Icon: DifferentialIcon,
                            },
                            {
                              id: "camaras",
                              titulo: "Cámaras de seguridad",
                              Icon: CameraIcon,
                            },
                          ].map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-4 py-2 border-b border-stone-100 last:border-0 group"
                            >
                              <div className="w-8 h-8 flex items-center justify-center text-stone-600 group-hover:text-[#756341] transition-colors">
                                <item.Icon />
                              </div>
                              <span className="font-montserrat text-[15px] font-medium text-[#333]">
                                {item.titulo}
                              </span>
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SectionServicios;
