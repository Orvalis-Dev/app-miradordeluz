import { type FC } from "react";

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
    className={`w-4 h-4 md:w-5 md:h-5 ${
      filled ? "text-yellow-400" : "text-gray-200"
    }`}
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
  date?: string;
  isLocalGuide?: boolean;
  reviewsCount?: string;
  isNew?: boolean;
};

interface TestimonialCardProps extends Testimonial {
  className?: string;
}

const GoogleIcon: FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const TestimonialCard: FC<TestimonialCardProps> = ({
  text,
  highlighted = [],
  name,
  subtitle,
  avatarUrl,
  rating,
  date,
  isLocalGuide,
  reviewsCount,
  isNew,
  className = "",
}) => {
  // Generar array de estrellas (1-5)
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  // Función para obtener la inicial del nombre
  const getInitial = (name: string | undefined): string => {
    if (!name || name.length === 0) return "?";
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
        min-h-[250px] md:min-h-[280px] h-full
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
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1">
            {stars.map((star) => (
              <StarIcon key={star} filled={star <= rating} />
            ))}
          </div>
          {isLocalGuide && (
            <span className="text-[9px] text-orange-600 font-bold uppercase tracking-wider">
              Local Guide
            </span>
          )}
        </div>
      </div>

      {/* Texto del testimonio */}
      <div className="mt-1 flex-grow overflow-hidden">
        <p className="font-montserrat text-xs md:text-sm font-medium text-[#4A4A4A] leading-relaxed line-clamp-5">
          {renderHighlightedText()}
        </p>
      </div>

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
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ring-2 ring-gray-50 flex-shrink-0">
              <span className="font-montserrat text-gray-600 font-semibold text-sm">
                {getInitial(name)}
              </span>
            </div>
          )}

          {/* Nombre + Info de Review */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col">
              <h4 className="font-montserrat text-sm font-semibold text-[#1E1E1E] truncate">
                {name}
              </h4>
              <div className="flex items-center gap-1 flex-wrap">
                <p className="font-montserrat text-[10px] text-gray-400 font-medium">
                  {date}
                </p>
                {isNew && (
                  <span className="text-[9px] text-orange-500 font-bold uppercase ring-1 ring-orange-100 px-1 rounded">
                    Nueva
                  </span>
                )}
              </div>
              <p className="font-montserrat text-[9px] text-gray-400 truncate mt-0.5">
                {reviewsCount}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end opacity-40">
            <GoogleIcon className="w-4 h-4" />
            <span className="text-[7px] font-bold mt-1 uppercase text-right leading-none tracking-tighter">
              Verificada
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
