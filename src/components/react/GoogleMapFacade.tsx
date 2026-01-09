import { useState } from "react";

interface GoogleMapFacadeProps {
  iframeSrc: string;
  placeholderImage: string;
  title: string;
}

export default function GoogleMapFacade({
  iframeSrc,
  placeholderImage,
  title,
}: GoogleMapFacadeProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (isLoaded) {
    return (
      <iframe
        src={iframeSrc}
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
        className="w-full h-full rounded-2xl"
      />
    );
  }

  return (
    <div
      className="relative w-full h-[450px] bg-slate-200 cursor-pointer overflow-hidden group rounded-2xl border border-slate-700 shadow-2xl"
      onClick={() => setIsLoaded(true)}
    >
      <img
        src={placeholderImage}
        alt="Mapa estático vista previa"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
        <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg transform transition-transform group-hover:scale-105 flex items-center gap-2 border border-amber-400">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Ver Mapa Interactivo
        </button>
      </div>
    </div>
  );
}
