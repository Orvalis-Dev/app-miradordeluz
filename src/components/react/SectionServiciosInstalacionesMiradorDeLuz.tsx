import { type FC, type ReactNode, useState } from 'react';
import { FiWifi, FiCoffee, FiTruck, FiCheck, FiClock, FiEye, FiLayers, FiPlus, FiTv, FiWind, FiDivide, FiAlertCircle, FiBell, FiAlertTriangle } from "react-icons/fi";
import { GiBarbecue, GiFlame, GiPineTree, GiBed, GiCooler } from "react-icons/gi";
import { MdOutlinePool, MdGarage, MdEmergency, MdLightMode } from "react-icons/md";
import { FaUtensils, FaFireExtinguisher, FaBed } from "react-icons/fa6";
import { PiOvenDuotone, PiFanDuotone } from "react-icons/pi";
import { TbAirConditioning } from "react-icons/tb";

// Iconos base (monocromo)
const WifiIcon: FC = () => (
  <FiWifi className="w-6 h-6" aria-hidden />
);

const CoffeeIcon: FC = () => (
  <FiCoffee className="w-6 h-6" aria-hidden />
);

const CarIcon: FC = () => (
  <MdGarage className="w-6 h-6" aria-hidden />
);

const BedIcon: FC = () => (
  <FaBed className="w-6 h-6" aria-hidden />
);

const AirConditioningIcon: FC = () => (
  <TbAirConditioning className="w-6 h-6" aria-hidden />
);

const ClockIcon: FC = () => (
  <FiClock className="w-6 h-6" aria-hidden />
);

// Icons representativos para instalaciones (monocromo: stroke=currentColor)
const PoolIcon: FC = () => (
  <MdOutlinePool className="w-8 h-8" aria-hidden />
);

const ViewIcon: FC = () => (
  <FiEye className="w-8 h-8" aria-hidden />
);

const GrillIcon: FC = () => (
  <GiBarbecue className="w-8 h-8" aria-hidden />
);

const DeckIcon: FC = () => (
  <FiLayers className="w-8 h-8" aria-hidden />
);

const PanoramaIcon: FC = () => (
  <FiLayers className="w-8 h-8" aria-hidden />
);

const TreeIcon: FC = () => (
  <GiPineTree className="w-8 h-8" aria-hidden />
);

const PlusIcon: FC = () => (
  <FiPlus className="w-6 h-6" aria-hidden />
);

// Icons adicionales solicitados (monocromo)
const TVIcon: FC = () => (
  <FiTv className="w-6 h-6" aria-hidden />
);

const ACIcon: FC = () => (
  <FiWind className="w-6 h-6" aria-hidden />
);

const FanIcon: FC = () => (
  <PiFanDuotone className="w-6 h-6" aria-hidden />
);

const StoveIcon: FC = () => (
  <FaUtensils className="w-6 h-6" aria-hidden />
);

const FridgeIcon: FC = () => (
  <GiCooler className="w-6 h-6" aria-hidden />
);

const MicrowaveIcon: FC = () => (
  <PiOvenDuotone className="w-6 h-6" aria-hidden />
);

const CleaningIcon: FC = () => (
  <FaBed className="w-6 h-6" aria-hidden />
);

const BeddingIcon: FC = () => (
  <GiBed className="w-6 h-6" aria-hidden />
);

const TowelsIcon: FC = () => (
  <FiLayers className="w-6 h-6" aria-hidden />
);

const BreakfastIcon: FC = () => (
  <FiCoffee className="w-6 h-6" aria-hidden />
);

const FireExtIcon: FC = () => (
  <FaFireExtinguisher className="w-6 h-6" aria-hidden />
);

const EmergencyLightIcon: FC = () => (
  <MdLightMode className="w-6 h-6" aria-hidden />
);

const MedicalIcon: FC = () => (
  <MdEmergency className="w-6 h-6" aria-hidden />
);

const DifferentialIcon: FC = () => (
  <FiDivide className="w-6 h-6" aria-hidden />
);

const AlarmIcon: FC = () => (
  <FiBell className="w-6 h-6" aria-hidden />
);

// Tipos
export interface Servicio {
  id: string;
  icon?: ReactNode;
  titulo: string;
  descripcion: string;
  colorAccent?: 'green' | 'amber' | 'orange';
}

export interface Instalacion {
  id: string;
  titulo: string;
  descripcion?: string;
  icon?: ReactNode;
}

interface SectionServiciosInstalacionesMiradorDeLuzProps {
  servicios?: Servicio[];
  instalaciones?: Instalacion[];
  imagenesInstalaciones?: string[];
  mostrarCTA?: boolean;
  textoCTA?: string;
  onClickCTA?: () => void;
}

const SectionServiciosInstalacionesMiradorDeLuz: FC<SectionServiciosInstalacionesMiradorDeLuzProps> = ({
  servicios = [
    {
      id: '1',
      icon: <CoffeeIcon />,
      titulo: 'Desayuno incluido.',
      descripcion: 'Comenzá el día con productos regionales y caseros',
      colorAccent: 'amber',
    },
    {
      id: '2',
      icon: <WifiIcon />,
      titulo: 'WiFi',
      descripcion: 'Conexión gratuita en todas las cabañas y espacios comunes',
      colorAccent: 'green',
    },
    {
      id: '3',
      icon: <CarIcon />,
      titulo: 'Estacionamiento.',
      descripcion: 'Espacio seguro dentro del predio para tu vehículo',
      colorAccent: 'green',
    },
    {
      id: '4',
      icon: <BedIcon />,
      titulo: 'Ropa blanca.',
      descripcion: 'Toallas, sábanas y servicio de limpieza incluidos',
      colorAccent: 'amber',
    },
    {
      id: '5',
      icon: <AirConditioningIcon />,
      titulo: 'A/C',
      descripcion: 'Climatización completa para tu confort todo el año',
      colorAccent: 'orange',
    },
    {
      id: '6',
      icon: <ClockIcon />,
      titulo: 'Check in flexible',
      descripcion: 'Horarios adaptados según disponibilidad',
      colorAccent: 'green',
    },
  ],
  instalaciones = [
    {
      id: '1',
      titulo: 'Pileta con solarium',
      descripcion: 'Disfruta del agua y el sol en nuestro espacio renovado',
    },
    {
      id: '2',
      titulo: 'Espacios verdes y miradores',
      descripcion: 'Amplios jardines con vistas panorámicas a las sierras',
    },
    {
      id: '3',
      titulo: 'Quincho y zona de fogón',
      descripcion: 'Perfectos para asados y reuniones al aire libre',
    },
    {
      id: '4',
      titulo: 'Decks y livings exteriores',
      descripcion: 'Espacios de descanso integrados con la naturaleza',
    },
    {
      id: '5',
      titulo: 'Vistas panorámicas',
      descripcion: 'Miradores estratégicos con vista a las montañas',
    },
  ],
  imagenesInstalaciones = [
    'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800',
  ],
  mostrarCTA = true,
  textoCTA = 'Ver fotos',
  onClickCTA,
}) => {
  // Función para obtener color de acento
  const getAccentColor = (color?: 'green' | 'amber' | 'orange') => {
    // Usar tonos grises neutros en vez de acentos de color
    const colors = {
      green: 'bg-stone-100 text-stone-700',
      amber: 'bg-stone-100 text-stone-700',
      orange: 'bg-stone-100 text-stone-700',
    };
    return colors[color || 'green'];
  };

  const handleClickCTA = () => {
    if (onClickCTA) {
      onClickCTA();
    } else {
      // Redirigir a la página de galería
      window.location.href = '/galeria';
    }
  };

  // Estado del modal "Ver más"
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  return (
    <section className="bg-stone-50 py-20 pt-0 md:py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Encabezado de la sección */}
        <div className="text-center mb-12 md:mb-16">
          {/* Etiqueta pequeña */}
          <div className="mb-4">
            <span className="font-montserrat text-[14px] font-semibold text-[#A8936D] tracking-[0.2em] uppercase">
              SERVICIOS & INSTALACIONES
            </span>
          </div>

          {/* Título principal */}
          <h2 className="font-montserrat text-[36px] md:text-[48px] lg:text-[56px] font-extrabold text-[#1E1E1E] mb-4">
            Todo lo que necesitás para desconectar
          </h2>

          {/* Subtítulo */}
          <p className="font-montserrat text-[16px] md:text-[18px] font-medium text-[#4A4A4A] leading-relaxed max-w-3xl mx-auto">
            Disfrutá del confort de nuestras cabañas totalmente equipadas y de los espacios
            comunes pensados para que tu estadía sea perfecta. Naturaleza, comodidad y atención
            personalizada en cada detalle.
          </p>
        </div>

        {/* Bloque de Servicios (selección con íconos y link a modal) */}
        <div className="mb-16 md:mb-20">
          {/* Título del bloque */}
      

          {/* Fila única de iconos representativos (sin wrap) — aumenté tamaño y separación pero sin romper a 2 líneas */}
          <div className="flex items-center justify-center gap-6 md:gap-8 py-6 flex-nowrap overflow-x-auto px-2">
            {servicios.slice(0, 6).map((servicio) => (
              <div key={servicio.id} className="flex flex-col items-center gap-3 w-32 md:w-36 text-center shrink-0">
                <div
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center ${getAccentColor(
                    servicio.colorAccent
                  )}`}
                >
                  {servicio.icon || <BedIcon />}
                </div>
                <div className="font-montserrat text-sm md:text-base font-medium text-[#1E1E1E] truncate whitespace-nowrap max-w-32 md:max-w-36">
                  {servicio.titulo}
                </div>
              </div>
            ))}

            {/* Ítem '+' como séptimo elemento que abre el modal */}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              aria-label="Mostrar todos"
              className="flex flex-col items-center gap-3 w-32 md:w-36 text-center shrink-0"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-stone-100 text-stone-700">
                <PlusIcon />
              </div>
              <div className="font-montserrat text-sm md:text-base font-medium text-[#1E1E1E]">Más</div>
            </button>
          </div>
        </div>

        {/* Call To Action */}
        {mostrarCTA && (
          <div className="text-center mt-12 md:mt-16">
            <p className="font-montserrat text-[16px] font-medium text-[#4A4A4A] mb-4">
              ¿Querés saber más sobre nuestras cabañas?
            </p>
            <button
              onClick={handleClickCTA}
              aria-haspopup="dialog"
              className="font-montserrat inline-flex items-center px-8 py-3 rounded-full border-2 border-gray-800 text-sm font-semibold text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {textoCTA}
            </button>
          </div>
        )}
        {/* Modal "Ver más" - lista completa de servicios e instalaciones */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-servicios-title"
          >
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-40"
              onClick={closeModal}
              aria-hidden="true"
            />

            {/* Dialogo */}
            <div className="relative z-10 w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b">
                <h3 id="modal-servicios-title" className="font-montserrat text-xl font-semibold text-[#1E1E1E]">
                  ¿Qué ofrece este alojamiento?
                </h3>
                <button
                  onClick={closeModal}
                  aria-label="Cerrar"
                  className="p-2 rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A8936D]"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 max-h-[70vh] overflow-y-auto space-y-8">
                {/* 1) INSTALACIONES */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h4 className="font-montserrat text-lg font-semibold">INSTALACIONES</h4>
                  </div>

                  <div className="flex flex-col gap-3">
                    {[
                      { id: 'parque', titulo: 'Parque', Icon: TreeIcon },
                      { id: 'pileta', titulo: 'Pileta', Icon: PoolIcon },
                      { id: 'cochera', titulo: 'Cochera', Icon: CarIcon },
                      { id: 'asador', titulo: 'Asador', Icon: GrillIcon },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-3 bg-white rounded-md shadow-sm w-full">
                        <div className="w-12 h-12 rounded-md bg-stone-100 flex items-center justify-center text-stone-700">
                          <item.Icon />
                        </div>
                        <div className="font-montserrat text-sm font-semibold text-[#1E1E1E]">{item.titulo}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2) EQUIPAMIENTOS */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h4 className="font-montserrat text-lg font-semibold">EQUIPAMIENTOS</h4>
                  </div>

                  <div className="flex flex-col gap-3">
                    {[
                      { id: 'tv', titulo: 'Televisión', Icon: TVIcon },
                      { id: 'ac', titulo: 'Aire Acond./Calefacción', Icon: ACIcon },
                      { id: 'fan', titulo: 'Ventilador', Icon: FanIcon },
                      { id: 'cocina', titulo: 'Cocina', Icon: StoveIcon },
                      { id: 'heladera', titulo: 'Heladera c/Freezer', Icon: FridgeIcon },
                      { id: 'micro', titulo: 'Microondas', Icon: MicrowaveIcon },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-3 bg-white rounded-md shadow-sm w-full">
                        <div className="w-12 h-12 rounded-md bg-stone-100 flex items-center justify-center text-stone-700">
                          <item.Icon />
                        </div>
                        <div className="font-montserrat text-sm font-semibold text-[#1E1E1E]">{item.titulo}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3) SERVICIOS */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h4 className="font-montserrat text-lg font-semibold">SERVICIOS</h4>
                  </div>

                  <div className="flex flex-col gap-3">
                    {[
                      { id: 'limpieza', titulo: 'Servicio de Limpieza', Icon: CleaningIcon },
                      { id: 'ropa', titulo: 'Ropa de cama', Icon: BeddingIcon },
                      { id: 'toallas', titulo: 'Toallas y Toallones', Icon: TowelsIcon },
                      { id: 'wifi', titulo: 'WIFI', Icon: WifiIcon },
                      { id: 'desayuno', titulo: 'Desayuno', Icon: BreakfastIcon },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-3 bg-white rounded-md shadow-sm w-full">
                        <div className="w-12 h-12 rounded-md bg-stone-100 flex items-center justify-center text-stone-700">
                          <item.Icon />
                        </div>
                        <div className="font-montserrat text-sm font-semibold text-[#1E1E1E]">{item.titulo}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4) PROTECCIONES */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h4 className="font-montserrat text-lg font-semibold">PROTECCIONES</h4>
                  </div>

                  <div className="flex flex-col gap-3">
                    {[
                      { id: 'matafuegos', titulo: 'Matafuegos', Icon: FireExtIcon },
                      { id: 'luz', titulo: 'Luz de Emergencia', Icon: EmergencyLightIcon },
                      { id: 'med', titulo: 'Emergencia Médica', Icon: MedicalIcon },
                      { id: 'dif', titulo: 'Disyuntor diferencial', Icon: DifferentialIcon },
                      { id: 'alarma', titulo: 'Alarma', Icon: AlarmIcon },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-3 bg-white rounded-md shadow-sm w-full">
                        <div className="w-12 h-12 rounded-md bg-stone-100 flex items-center justify-center text-stone-700">
                          <item.Icon />
                        </div>
                        <div className="font-montserrat text-sm font-semibold text-[#1E1E1E]">{item.titulo}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SectionServiciosInstalacionesMiradorDeLuz;

