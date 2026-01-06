import type { FC, ReactNode } from "react";

interface SectionUbicacionMiradorDeLuzProps {
  etiqueta?: string;
  titulo?: string;
  parrafos?: {
    texto: string;
    destacados?: string[];
  }[];
  bulletPoints?: {
    icon: string;
    text: string;
  }[];
  fraseDestacada?: string;
  imagenPrincipal?: string;
  fondoColor?: string;
  /* Clases Tailwind para controlar tamaños/estilos desde quien use el componente */
  tituloClass?: string;
  parrafoClass?: string;
  fraseClass?: string;
  etiquetaClass?: string;
}

const SectionUbicacionMiradorDeLuz: FC<SectionUbicacionMiradorDeLuzProps> = ({
  etiqueta = "VILLA SANTA CRUZ DEL LAGO, CORDOBA.",
  titulo = "Ubicado entre montañas y naturaleza, cerca de todo.",
  parrafos = [
    {
      texto: `"Mirador de Luz" es un complejo de cabañas atendido por sus propios dueños, diseñado para quienes buscan tranquilidad y confort en las sierras.

Disfrutá de la cercanía a los principales atractivos turísticos, en un entorno natural inmejorable y con atención personalizada.`,
      destacados: ['"Mirador de Luz"'],
    },
  ],
  bulletPoints = [
    { icon: "📍", text: "A 5 min de Villa Carlos Paz" },
    { icon: "🆕", text: "Complejo a estrenar" },
    { icon: "⛰️", text: "Vista a las sierras" },
  ],
  fraseDestacada = "¡Te esperamos para que vivas la experiencia Mirador de Luz!",
  imagenPrincipal = "/images/cabana-2/cabana-2-2.webp",
  fondoColor = "bg-gradient-to-br from-amber-50/30 via-orange-50/20 to-stone-50",
  tituloClass = "font-montserrat text-[28px] md:text-[32px] lg:text-[42px] font-extrabold text-[#1E1E1E] leading-tight",
  parrafoClass = "font-montserrat text-[16px] md:text-[18px] font-medium text-[#4A4A4A] leading-relaxed",
  fraseClass = "font-montserrat text-[18px] md:text-[22px] font-bold text-[#1E1E1E] italic",
  etiquetaClass = "font-montserrat text-[10px] md:text-[14px] font-bold text-[#A8936D] tracking-[0.2em] uppercase",
}) => {
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
                  className="font-semibold text-[#A8936D]"
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
      id="ubicacion-section"
      className={`w-full min-h-screen ${fondoColor} relative overflow-hidden flex items-center`}
    >
      {/* Textura sutil de fondo (opcional) */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="w-full px-4 md:px-10 lg:px-20 py-16 md:py-24 lg:py-32 relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          {/* Título para Mobile (aparece arriba de la imagen) */}
          <div className="w-full lg:hidden mb-4 space-y-4">
            <div className="inline-block">
              <span className={etiquetaClass}>{etiqueta}</span>
            </div>
            <h2 className={tituloClass}>{titulo}</h2>
          </div>

          {/* Columna de Imagen (Orden 2 en Mobile, Orden 2 en Desktop) */}
          <div className="relative w-full lg:w-5/12 lg:order-2 flex items-start group">
            <div className="w-full rounded-[40px] aspect-[4/5] overflow-hidden shadow-2xl transform transition-transform duration-700 hover:scale-[1.02]">
              <img
                src={imagenPrincipal}
                alt="Vista del complejo Mirador de Luz"
                className="w-full h-full object-cover object-center"
                style={{ minHeight: "300px", aspectRatio: "4/5" }}
              />
            </div>

            {/* Decoración sutil tras la imagen */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl -z-10 animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-orange-100/30 rounded-full blur-3xl -z-10" />
          </div>

          {/* Columna de Texto (Orden 3 en Mobile, Orden 1 en Desktop) */}
          <div className="lg:w-7/12 lg:order-1 flex flex-col space-y-8">
            {/* Título para Desktop (oculto en mobile) */}
            <div className="hidden lg:block space-y-6">
              <div className="inline-block">
                <span className={etiquetaClass}>{etiqueta}</span>
              </div>
              <h2 className={tituloClass}>{titulo}</h2>
            </div>

            {/* Párrafos descriptivos */}
            <div className="space-y-6">
              {parrafos.map((parrafo, index) => {
                const partes = parrafo.texto.split(/\n\s*\n/);
                return (
                  <div key={index} className="space-y-5">
                    {partes.map((parte, idx) => (
                      <p key={idx} className={parrafoClass}>
                        {highlightText(parte, parrafo.destacados)}
                      </p>
                    ))}
                  </div>
                );
              })}
            </div>

            {/* Puntos clave (Bullet points) */}
            {bulletPoints && bulletPoints.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 py-4">
                {bulletPoints.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-white/40 backdrop-blur-sm p-3 rounded-2xl border border-white/50 shadow-sm transition-all hover:bg-white/60"
                  >
                    <span className="text-2xl drop-shadow-sm">
                      {point.icon}
                    </span>
                    <span className="font-montserrat text-[14px] md:text-[15px] font-bold text-[#333333]">
                      {point.text}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Frase final destacada */}
            {fraseDestacada && (
              <div className="pt-2">
                <p
                  className={`${fraseClass} border-l-4 border-amber-400 pl-6 py-2`}
                >
                  {fraseDestacada}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionUbicacionMiradorDeLuz;
