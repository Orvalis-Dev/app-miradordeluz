import type { FC } from 'react';

interface SectionHeroIntermedioMiradorDeLuzProps {
  backgroundImage?: string;
  backgroundVideo?: string;
  subheading?: string;
  title?: string;
  overlayOpacity?: 'light' | 'medium' | 'dark' | 'darker';
  height?: string;
  accentColor?: string;
}

const SectionHeroIntermedioMiradorDeLuz: FC<SectionHeroIntermedioMiradorDeLuzProps> = ({
  backgroundImage = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920',
  backgroundVideo,
  subheading = 'CERCA DE TODO',
  title = 'Naturaleza & Confort.\nEn el Mirador de la Montaña.',
  overlayOpacity = 'medium',
  height = 'h-[60vh]',
  accentColor = 'text-amber-300',
}) => {
  // Mapear opacidad del overlay
  const overlayClasses = {
    light: 'bg-black/30',
    medium: 'bg-black/50',
    dark: 'bg-black/60',
    darker: 'bg-black/70',
  };

  // Convertir saltos de línea en el título
  const renderTitle = () => {
    const lines = title.split('\n');
    return lines.map((line, index) => (
      <span key={index} className="block">
        {line}
      </span>
    ));
  };

  return (
    <section className={`relative w-full ${height} overflow-hidden`}>
      {/* Video de fondo o Imagen de fondo */}
      {backgroundVideo ? (
        <div className="absolute inset-0">
          <video
            id="hero-intermedio-video"
            className="absolute inset-0 w-full h-full object-cover"
            src={backgroundVideo}
            loop
            muted
            playsInline
            preload="metadata"
          />
          {/* Overlay oscuro */}
          <div className={`absolute inset-0 ${overlayClasses[overlayOpacity]}`} />
        </div>
      ) : (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: 'center center',
          }}
        >
          {/* Overlay oscuro */}
          <div className={`absolute inset-0 ${overlayClasses[overlayOpacity]}`} />
        </div>
      )}

      {/* Contenido centrado */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        {/* Etiqueta superior */}
        {subheading && (
          <div className="mb-4 md:mb-6">
            <span 
              className={`text-xs md:text-sm font-semibold ${accentColor} tracking-[0.25em] uppercase`}
            >
              {subheading}
            </span>
          </div>
        )}

        {/* Título principal */}
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl px-4">
          {renderTitle()}
        </h2>
      </div>
    </section>
  );
};

export default SectionHeroIntermedioMiradorDeLuz;

