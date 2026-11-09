import type { FC, ReactNode } from "react";
import { IconMapPin, IconMountain } from "@components/common/Icons";
import { Sparkles, Waves } from "lucide-react";
import { motion, type Variants } from "framer-motion";

interface SectionUbicacionMiradorDeLuzProps {
  etiqueta?: string;
  titulo?: string;
  parrafos?: {
    texto: string;
    destacados?: string[];
  }[];
  bulletPoints?: {
    icon: ReactNode;
    text: string;
  }[];
  fraseDestacada?: string;
  imagenPrincipal?: string;
  imagenPrincipalLandscape?: string;
  imagenInterior?: string;
  imagenDetalle?: string;
  imagenPrincipalDesktop?: string;
  imagenPrincipalMobile?: string;
  fondoColor?: string;
  /* Clases Tailwind para controlar tamaños/estilos desde quien use el componente */
  tituloClass?: string;
  parrafoClass?: string;
  fraseClass?: string;
  etiquetaClass?: string;
}

// Variantes para animaciones escalonadas
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

const FeatureCard = ({ icon, text }: { icon: ReactNode; text: string }) => (
  <motion.div
    variants={itemVariants}
    className="flex items-center gap-3 md:gap-4 bg-white/70 backdrop-blur-md p-3 md:p-4 pr-4 md:pr-6 rounded-2xl border border-white/50 shadow-sm transition-all hover:bg-white hover:shadow-lg lg:hover:-translate-y-1 group"
  >
    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-amber-50/50 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-amber-100 transition-all duration-300">
      {icon}
    </div>
    <span className="font-montserrat text-[13px] md:text-[16px] font-bold text-[#1E1E1E] leading-tight">
      {text}
    </span>
  </motion.div>
);

const SectionUbicacionMiradorDeLuz: FC<SectionUbicacionMiradorDeLuzProps> = ({
  etiqueta = "VILLA SANTA CRUZ DEL LAGO, CÓRDOBA.",
  titulo = "La paz de las sierras, a un paso de la ciudad.",
  parrafos = [
    {
      texto: `Descubrí el equilibrio perfecto. Disfrutá del silencio y una vista panorámica única, sabiendo que el centro de Villa Carlos Paz está a solo 10 minutos.
              Un complejo nuevo, abierto todo el año y con el sello de confianza que buscás: atendido cálidamente por sus propios dueños.`,
      destacados: ["atendido cálidamente por sus propios dueños", "10 minutos"],
    },
  ],
  bulletPoints = [
    {
      icon: <IconMapPin className="w-5 h-5 text-[#756341]" />,
      text: "A 10 min de Villa Carlos Paz",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#756341]" />,
      text: "Complejo a estrenar",
    },
    {
      icon: <IconMountain className="w-5 h-5 text-[#756341]" />,
      text: "Vista a las sierras",
    },
    {
      icon: <Waves className="w-5 h-5 text-[#756341]" />,
      text: "Piscina / Solarium",
    },
  ],
  fraseDestacada = "¡Te esperamos para que vivas la experiencia Mirador de Luz!",
  imagenPrincipal = "/images/exterior/exterior-30.webp",
  imagenPrincipalLandscape = "/images/gallery/imagen-4-desktop.webp",
  imagenInterior = "/images/cabana-1/cabana-1-habitacion-3-desktop.webp",
  imagenDetalle = "/images/pileta/pileta-10-desktop.webp",
  fondoColor = "bg-gradient-to-br from-amber-50/40 via-orange-50/30 to-rose-50/20",
  tituloClass = "font-montserrat text-3xl md:text-[40px] lg:text-[52px] font-extrabold text-[#1E1E1E] leading-[1.1] tracking-tight",
  parrafoClass = "font-montserrat text-[16px] md:text-[18px] font-medium text-[#4A4A4A] leading-relaxed",
  fraseClass = "font-montserrat text-[18px] md:text-[24px] font-bold text-[#1E1E1E]",
  etiquetaClass = "font-montserrat text-[12px] md:text-[14px] font-bold text-[#756341] tracking-[0.3em] uppercase",
}) => {
  // Versiones mobile de las imágenes
  const imgPrincipalMob = imagenPrincipalLandscape.replace(
    "-desktop",
    "-mobile"
  );
  const imgInteriorMob = imagenInterior.replace("-desktop", "-mobile");
  const imgDetalleMob = imagenDetalle.replace("-desktop", "-mobile");

  // Función para resaltar palabras específicas en el texto
  const highlightText = (texto: string, destacados: string[] = []) => {
    if (!destacados || destacados.length === 0) {
      return <span>{texto}</span>;
    }

    let partes: Array<string | ReactNode> = [texto];

    destacados.forEach((destacado) => {
      const nuevasPartes: Array<string | ReactNode> = [];
      partes.forEach((parte) => {
        if (typeof parte === "string") {
          const regex = new RegExp(`(${destacado})`, "gi");
          const fragmentos = parte.split(regex);
          fragmentos.forEach((fragmento, idx) => {
            if (fragmento.toLowerCase() === destacado.toLowerCase()) {
              nuevasPartes.push(
                <span
                  key={`${fragmento}-${idx}`}
                  className="font-bold text-[#756341] underline decoration-amber-200 decoration-4 underline-offset-2"
                >
                  {fragmento}
                </span>
              );
            } else if (fragmento) {
              nuevasPartes.push(fragmento);
            }
          });
        } else {
          nuevasPartes.push(parte);
        }
      });
      partes = nuevasPartes;
    });

    return <>{partes}</>;
  };

  return (
    <section
      id="ubicacion"
      className={`w-full min-h-screen ${fondoColor} relative overflow-hidden flex items-center py-10 md:py-28`}
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-amber-200/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[40%] bg-rose-100/30 rounded-full blur-[100px]" />
      </div>

      <div className="w-full px-4 md:px-10 lg:px-20 relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center"
        >
          {/* Columna de Texto (Orden 1 en Mobile, Orden 1 en Desktop) */}
          <div className="w-full lg:w-1/2 flex flex-col space-y-10 lg:pr-6">
            <motion.div variants={itemVariants} className="space-y-4">
              <span className={etiquetaClass}>{etiqueta}</span>
              <h2 className={tituloClass}>{titulo}</h2>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              {parrafos.map((parrafo, index) => (
                <div key={index} className="space-y-4">
                  {parrafo.texto.split(/\n\s*\n/).map((parte, idx) => (
                    <p key={idx} className={parrafoClass}>
                      {highlightText(parte, parrafo.destacados)}
                    </p>
                  ))}
                </div>
              ))}
            </motion.div>

            {/* Feature Cards Grid 2x2 en Mobile, Desktop y Tablet */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {bulletPoints.map((point, index) => (
                <FeatureCard key={index} icon={point.icon} text={point.text} />
              ))}
            </div>

            {fraseDestacada && (
              <motion.div variants={itemVariants} className="pt-2">
                <div className="border-l-[6px] md:border-l-[10px] border-amber-400 pl-6 md:pl-8 py-2">
                  <p
                    className={`${fraseClass} italic text-[#333333] leading-relaxed`}
                  >
                    "{fraseDestacada}"
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Columna de Imagen - Bento Grid / Slider en Mobile (Orden 2 en Mobile, Orden 2 en Desktop) */}
          <div className="w-full lg:w-1/2 h-full">
            <div className="flex lg:grid lg:grid-cols-12 lg:grid-rows-12 gap-3 md:gap-4 h-[450px] md:h-162.5 lg:h-175 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
              {/* Foto Principal: Paisaje/Vista (Grande) */}
              <motion.div
                variants={itemVariants}
                className="min-w-full lg:min-w-0 lg:col-span-12 lg:row-span-7 md:lg:col-span-8 md:lg:row-span-12 rounded-4xl md:rounded-[48px] overflow-hidden shadow-2xl relative group snap-center"
              >
                <picture className="w-full h-full">
                  <source media="(max-width: 767px)" srcSet={imgPrincipalMob} />
                  <img
                    src={imagenPrincipalLandscape || imagenPrincipal}
                    alt="Vista panorámica de las sierras desde Mirador de Luz"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                {/* Overlay Scrim (Efecto Gradiente Cinema) */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                {/* Texto sobre imagen Principal */}
                <div className="absolute bottom-6 left-8 md:bottom-10 md:left-10 text-white z-10">
                  <p className="text-[10px] md:text-[11px] font-bold tracking-[0.3em] uppercase text-amber-300/90 mb-1 drop-shadow-sm">
                    El Entorno
                  </p>
                  <p className="text-xl md:text-2xl font-bold tracking-normal drop-shadow-lg">
                    Vistas infinitas
                  </p>
                </div>
              </motion.div>

              {/* Foto Secundaria: Interior (Mediana) */}
              <motion.div
                variants={itemVariants}
                className="min-w-[85%] lg:min-w-0 lg:col-span-6 lg:row-span-5 md:lg:col-span-4 md:lg:row-span-6 rounded-4xl md:rounded-[40px] overflow-hidden shadow-xl relative group snap-center"
              >
                <picture className="w-full h-full">
                  <source media="(max-width: 767px)" srcSet={imgInteriorMob} />
                  <img
                    src={imagenInterior}
                    alt="Interior acogedor de las cabañas"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </motion.div>

              {/* Foto Terciaria: Detalle/Pileta (Pequeña) */}
              <motion.div
                variants={itemVariants}
                className="min-w-[85%] lg:min-w-0 lg:col-span-6 lg:row-span-5 md:lg:col-span-4 md:lg:row-span-6 rounded-4xl md:rounded-[40px] overflow-hidden shadow-xl relative group snap-center"
              >
                <picture className="w-full h-full">
                  <source media="(max-width: 767px)" srcSet={imgDetalleMob} />
                  <img
                    src={imagenDetalle}
                    alt="Detalle de las instalaciones y piscina"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </motion.div>
            </div>

            {/* Dots indicadores para Mobile Slider */}
            <div className="flex lg:hidden justify-center gap-2 mt-4">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <div className="w-2 h-2 rounded-full bg-amber-200" />
              <div className="w-2 h-2 rounded-full bg-amber-200" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SectionUbicacionMiradorDeLuz;
