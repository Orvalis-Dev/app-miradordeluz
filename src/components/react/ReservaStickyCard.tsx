import React from "react";
import { IconWhatsApp as WhatsAppIcon } from "./ui/Icons";

interface ReservaStickyCardProps {
  cabanaName: string;
}

const ReservaStickyCard: React.FC<ReservaStickyCardProps> = ({
  cabanaName,
}) => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Hola! Me gustaría consultar disponibilidad y tarifas para la ${cabanaName}.`
    );
    window.open(`https://wa.me/5493813513513?text=${message}`, "_blank");
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 lg:p-8 sticky top-32">
      <h3 className="text-slate-900 font-montserrat font-bold text-lg mb-4">
        Consultar Disponibilidad y Tarifas
      </h3>

      <p className="text-slate-600 text-sm leading-relaxed mb-6">
        Para ofrecerte la mejor tarifa actualizada y confirmar disponibilidad en
        tiempo real según tus fechas, gestionamos todas nuestras reservas de
        forma personalizada.
      </p>

      <div className="flex flex-col gap-3 mb-8">
        <div className="flex items-center gap-2.5 text-slate-700 text-sm font-semibold">
          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="w-3.5 h-3.5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <span>Confirmación inmediata</span>
        </div>
        <div className="flex items-center gap-2.5 text-slate-700 text-sm font-semibold">
          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="w-3.5 h-3.5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <span>Atención 24/7</span>
        </div>
      </div>

      <button
        onClick={handleWhatsAppClick}
        className="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-montserrat font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-orange-200 transition-all mb-4 group"
      >
        <WhatsAppIcon className="w-6 h-6 fill-current" />
        <span className="text-base">CONSULTAR POR WHATSAPP</span>
      </button>

      <p className="text-slate-400 text-xs text-center font-medium italic">
        Respuesta rápida. Hablás directo con los dueños, sin comisiones.
      </p>
    </div>
  );
};

export default ReservaStickyCard;
