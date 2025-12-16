import { type FC } from 'react';

// Icono de comillas
const QuoteIcon: FC = () => (
  <svg
    className="w-8 h-8 text-gray-200"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

// Icono de estrella
const StarIcon: FC<{ filled: boolean }> = ({ filled }) => (
  <svg
    className={`w-4 h-4 md:w-5 md:h-5 ${filled ? 'text-yellow-400' : 'text-gray-200'}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export type Testimonial = {
  text: string;
  highlighted?: string[];
  name: string;
  subtitle?: string;
  avatarUrl?: string;
  rating: number;
};

interface TestimonialCardProps extends Testimonial {
  className?: string;
}

const TestimonialCard: FC<TestimonialCardProps> = ({
  text,
  highlighted = [],
  name,
  subtitle,
  avatarUrl,
  rating,
  className = '',
}) => {
  // Generar array de estrellas (1-5)
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  // Función para obtener la inicial del nombre
  const getInitial = (name: string | undefined): string => {
    if (!name || name.length === 0) return '?';
    return name.charAt(0).toUpperCase();
  };

  // Función para renderizar el texto con palabras resaltadas
  const renderHighlightedText = () => {
    // Mostrar siempre texto plano sin resaltados
    return <span>{text}</span>;
  };

  return (
    <div
      className={`
        bg-white rounded-3xl shadow-lg
        p-4 md:p-5
        w-full max-w-xs
        h-[240px] md:h-[260px]
        flex flex-col
        hover:shadow-xl transition-shadow duration-200
        ${className}
      `}
    >
      {/* Header: Comillas + Estrellas */}
      <div className="flex items-start justify-between mb-3">
        {/* Icono de comillas */}
        <QuoteIcon />

        {/* Estrellas de rating */}
        <div className="flex items-center gap-1">
          {stars.map((star) => (
            <StarIcon key={star} filled={star <= rating} />
          ))}
        </div>
      </div>

      {/* Texto del testimonio */}
      <div className="mt-2 flex-grow overflow-hidden">
        <p className="font-montserrat text-xs md:text-sm font-medium text-[#4A4A4A] leading-relaxed line-clamp-4">
          {renderHighlightedText()}
        </p>
      </div>

      {/* Separador + Info del usuario */}
      <div className="border-t border-gray-100 mt-4 pt-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ring-2 ring-gray-50">
              <span className="font-montserrat text-gray-600 font-semibold text-sm">
                {getInitial(name)}
              </span>
            </div>
          )}

          {/* Nombre + Subtítulo */}
          <div className="flex-1 min-w-0">
            <h4 className="font-montserrat text-sm font-semibold text-[#1E1E1E] truncate">
              {name}
            </h4>
            {subtitle && (
              <p className="font-montserrat text-xs font-medium text-[#4A4A4A] truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;

