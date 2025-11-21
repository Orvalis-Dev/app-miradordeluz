import type { FC } from 'react';

interface SectionUbicacionMiradorDeLuzProps {
  etiqueta?: string;
  titulo?: string;
  parrafos?: {
    texto: string;
    destacados?: string[];
  }[];
  fraseDestacada?: string;
  imagenPrincipal?: string;
  imagenSecundaria?: string;
  fondoColor?: string;
}

const SectionUbicacionMiradorDeLuz: FC<SectionUbicacionMiradorDeLuzProps> = ({
  etiqueta = 'MIRADOR DE LUZ – TAFÍ DEL VALLE',
  titulo = 'Ubicado entre montañas y naturaleza, cerca de todo.',
  parrafos = [
    {
      texto: 'Un complejo de cabañas elegante y moderno con una ubicación privilegiada dentro del valle de Tafí. Estamos a pasos de todo; senderos de montaña, lagos cristalinos, el pueblo histórico y los miradores más impresionantes de la región.',
      destacados: ['ubicación privilegiada']
    },
    {
      texto: 'Contamos con todas las comodidades tanto si vienes por turismo o descanso: cabañas totalmente equipadas, desayuno artesanal, piscina climatizada, fogón, sala de estar, y espacios para reuniones y eventos familiares.',
      destacados: ['todas las comodidades', 'cabañas totalmente equipadas']
    },
  ],
  fraseDestacada = '¡Te esperamos para que vivas la experiencia Mirador de Luz!',
  imagenPrincipal = 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800',
  imagenSecundaria = 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=600',
  fondoColor = 'bg-gradient-to-br from-amber-50/30 via-orange-50/20 to-stone-50',
}) => {
  // Función para resaltar palabras específicas en el texto
  const highlightText = (texto: string, destacados: string[] = []) => {
    if (!destacados || destacados.length === 0) {
      return <span>{texto}</span>;
    }

    let partes = [texto];
    
    destacados.forEach(destacado => {
      const nuevasPartes: Array<string | JSX.Element> = [];
      partes.forEach(parte => {
        if (typeof parte === 'string') {
          const regex = new RegExp(`(${destacado})`, 'gi');
          const fragmentos = parte.split(regex);
          fragmentos.forEach((fragmento, idx) => {
            if (fragmento.toLowerCase() === destacado.toLowerCase()) {
              nuevasPartes.push(
                <span key={`${fragmento}-${idx}`} className="text-amber-600 font-semibold">
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
    <section className={`w-full ${fondoColor} relative overflow-hidden`}>
      {/* Textura sutil de fondo (opcional) */}
      <div className="absolute inset-0 opacity-[0.02]" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
           }}
      />

      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-16 md:py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Columna izquierda - Texto */}
          <div className="space-y-6 lg:pr-8">
            {/* Etiqueta superior */}
            <div className="inline-block">
              <span className="text-xs md:text-sm font-semibold text-amber-600 tracking-[0.3em] uppercase">
                {etiqueta}
              </span>
            </div>

            {/* Título principal */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              {titulo}
            </h2>

            {/* Párrafos descriptivos */}
            <div className="space-y-5">
              {parrafos.map((parrafo, index) => (
                <p 
                  key={index}
                  className="text-base md:text-lg text-gray-700 leading-relaxed"
                >
                  {highlightText(parrafo.texto, parrafo.destacados)}
                </p>
              ))}
            </div>

            {/* Frase final destacada */}
            {fraseDestacada && (
              <div className="pt-4">
                <p className="text-lg md:text-xl font-bold text-gray-900">
                  {fraseDestacada}
                </p>
              </div>
            )}
          </div>

          {/* Columna derecha - Imágenes superpuestas */}
          <div className="relative w-full h-[500px] md:h-[600px] lg:h-[650px]">
            {/* Imagen principal (fondo) */}
            <div className="absolute top-0 right-0 w-[85%] h-[75%] lg:w-[90%] lg:h-[70%]">
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={imagenPrincipal}
                  alt="Vista del complejo Mirador de Luz"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Imagen secundaria (superpuesta) */}
            <div className="absolute bottom-0 left-0 w-[70%] h-[55%] lg:w-[65%] lg:h-[50%] z-10">
              <div className="relative w-full h-full rounded-xl overflow-hidden border-4 border-white shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <img
                  src={imagenSecundaria}
                  alt="Cabaña Mirador de Luz"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Decoración adicional (opcional) */}
            <div className="absolute top-[40%] right-[10%] w-32 h-32 bg-amber-400/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-[20%] left-[5%] w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default SectionUbicacionMiradorDeLuz;

