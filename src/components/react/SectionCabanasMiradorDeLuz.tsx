import type { FC } from 'react';

interface CabanaCard {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  slug?: string;
}

interface SectionCabanasMiradorDeLuzProps {
  etiqueta?: string;
  titulo?: string;
  cabanas?: CabanaCard[];
  mostrarBoton?: boolean;
  textoBoton?: string;
  onVerTodas?: () => void;
  onClickCabana?: (slug: string) => void;
}

const SectionCabanasMiradorDeLuz: FC<SectionCabanasMiradorDeLuzProps> = ({
  etiqueta = 'MIRADOR DE LUZ',
  titulo = 'Cabañas',
  cabanas = [
    {
      id: '1',
      title: 'Cabaña Premium',
      subtitle: 'CABAÑAS',
      image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800',
      slug: 'premium',
    },
    {
      id: '2',
      title: 'Cabaña Familiar',
      subtitle: 'CABAÑAS',
      image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800',
      slug: 'familiar',
    },
    {
      id: '3',
      title: 'Cabaña Bosque',
      subtitle: 'CABAÑAS',
      image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800',
      slug: 'bosque',
    },
    {
      id: '4',
      title: 'Cabaña Mirador',
      subtitle: 'CABAÑAS',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      slug: 'mirador',
    },
  ],
  mostrarBoton = true,
  textoBoton = 'Ver todas las cabañas',
  onVerTodas,
  onClickCabana,
}) => {
  const handleCardClick = (slug?: string) => {
    if (slug && onClickCabana) {
      onClickCabana(slug);
    } else if (slug) {
      // Navegación por defecto
      window.location.href = `/cabanas/${slug}`;
    }
  };

  const handleVerTodas = () => {
    if (onVerTodas) {
      onVerTodas();
    } else {
      window.location.href = '/cabanas';
    }
  };

  return (
    <section className="w-full bg-stone-50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Encabezado */}
        <div className="mb-12">
          {/* Etiqueta superior */}
          <div className="mb-2">
            <span className="text-xs font-medium text-gray-500 tracking-[0.2em] uppercase">
              {etiqueta}
            </span>
          </div>
          
          {/* Título principal */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            {titulo}
          </h2>
        </div>

        {/* Grid de cabañas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {cabanas.map((cabana) => (
            <div
              key={cabana.id}
              onClick={() => handleCardClick(cabana.slug)}
              className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg 
                       transition-all duration-300 cursor-pointer group h-[320px]"
            >
              {/* Imagen de fondo */}
              <div className="absolute inset-0">
                <img
                  src={cabana.image}
                  alt={cabana.title}
                  className="w-full h-full object-cover transition-transform duration-500 
                           group-hover:scale-105"
                />
              </div>

              {/* Overlay con gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Contenido (texto en la esquina inferior izquierda) */}
              <div className="absolute bottom-0 left-0 p-6 text-white">
                {/* Etiqueta */}
                <div className="mb-1">
                  <span className="text-xs font-medium tracking-[0.15em] uppercase opacity-90">
                    {cabana.subtitle || 'CABAÑAS'}
                  </span>
                </div>
                
                {/* Título de la cabaña */}
                <h3 className="text-2xl md:text-3xl font-bold">
                  {cabana.title}
                </h3>
              </div>

              {/* Indicador hover (opcional) */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 
                            transition-opacity duration-300">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full 
                              flex items-center justify-center">
                  <svg 
                    className="w-5 h-5 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón "Ver todas las cabañas" */}
        {mostrarBoton && (
          <div className="flex justify-end">
            <button
              onClick={handleVerTodas}
              className="border border-gray-900 text-gray-900 px-8 py-3 rounded-md 
                       font-medium hover:bg-gray-900 hover:text-white 
                       transition-all duration-300"
            >
              {textoBoton}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SectionCabanasMiradorDeLuz;

