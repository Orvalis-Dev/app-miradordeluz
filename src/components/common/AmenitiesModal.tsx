import { type FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface AmenitiesModalProps {
  amenities: string[];
  cabaName?: string;
  variant?: "circle" | "button";
}

const AmenitiesModal: FC<AmenitiesModalProps> = ({
  amenities,
  cabaName,
  variant = "circle",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {variant === "circle" ? (
        <button
          type="button"
          onClick={openModal}
          aria-label="Ver todas las amenidades"
          className="flex flex-col items-center gap-3 text-center"
        >
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="font-montserrat text-sm md:text-base font-medium text-[#1E1E1E]">
            Más
          </div>
        </button>
      ) : (
        <button
          onClick={openModal}
          className="font-montserrat inline-flex items-center gap-2 px-6 py-3 border-2 border-slate-900 text-slate-900 font-bold rounded-xl hover:bg-slate-900 hover:text-white transition-all duration-300 group"
        >
          Ver todos los servicios
          <svg
            className="w-5 h-5 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <h2 className="text-2xl font-montserrat font-bold text-slate-900">
                  Todos los servicios {cabaName && `- ${cabaName}`}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-slate-500" />
                </button>
              </div>

              {/* Body */}
              <div className="p-8 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {amenities.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-slate-700 font-montserrat"
                    >
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                      <span className="text-base font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-10 p-6 bg-slate-50 rounded-2xl">
                  <h3 className="font-bold text-slate-900 mb-2">
                    Información Adicional
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Nuestro complejo ofrece limpieza día por medio (09:00 a
                    12:00 hs) y asesoramiento turístico personalizado para que
                    aproveches al máximo tu estadía en las Sierras.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AmenitiesModal;
