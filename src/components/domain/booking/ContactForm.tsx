import React, { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Send, Loader2, CheckCircle2, RefreshCcw } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa6";

interface ContactFormProps {
  instagram?: string;
  facebook?: string;
  whatsapp?: string;
}

export default function ContactForm({
  instagram = "https://instagram.com/miradordeluz",
  facebook = "https://facebook.com/miradordeluz",
  whatsapp = "https://wa.me/5493813513513",
}: ContactFormProps) {
  const [state, handleSubmit, reset] = useForm("xzdznolb");
  const [attempts, setAttempts] = useState(0);

  // Incrementar intentos cuando el envío es exitoso
  useEffect(() => {
    if (state.succeeded) {
      setAttempts((prev) => prev + 1);
    }
  }, [state.succeeded]);

  if (state.succeeded) {
    return (
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100 flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-2xl font-serif font-medium text-gray-900 mb-2">
          ¡Gracias por contactarnos!
        </h3>
        <p className="text-gray-500 mb-8 max-w-sm font-medium">
          Hemos recibido tu información correctamente. Te responderemos a la brevedad para coordinar tu estadía.
        </p>

        <div className="space-y-6 w-full max-w-xs">
          <div className="pt-6 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              O contactanos más rápido:
            </p>
            
            <div className="flex justify-center gap-5 mb-8">
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-50 text-pink-600 hover:bg-pink-600 hover:text-white transition-all duration-300 shadow-sm"
                title="Instagram"
              >
                <FaInstagram size={22} />
              </a>
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm"
                title="Facebook"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300 shadow-md"
                title="WhatsApp"
              >
                <FaWhatsapp size={24} />
              </a>
            </div>
          </div>

          {attempts < 3 ? (
            <button
              onClick={() => reset()}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 rounded-xl text-gray-600 text-sm font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 group"
            >
              <RefreshCcw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
              <span>Enviar otro formulario ({3 - attempts} restantes)</span>
            </button>
          ) : (
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 italic">
                Has alcanzado el límite de 3 envíos. Si necesitás más ayuda, por favor contactanos por WhatsApp o redes sociales.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100"
    >
      <div className="space-y-6">
        {/* Nombre */}
        <div>
          <label
            htmlFor="nombre"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Nombre completo
          </label>
          <input
            id="nombre"
            type="text"
            name="nombre"
            required
            className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 bg-gray-50/50 hover:bg-white"
            placeholder="Tu nombre"
          />
          <ValidationError
            prefix="Nombre"
            field="nombre"
            errors={state.errors}
            className="text-red-500 text-sm mt-1 block"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 bg-gray-50/50 hover:bg-white"
            placeholder="tu@email.com"
          />
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
            className="text-red-500 text-sm mt-1 block"
          />
        </div>

        {/* Asunto */}
        <div>
          <label
            htmlFor="asunto"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Asunto
          </label>
          <div className="relative">
            <select
              id="asunto"
              name="asunto"
              required
              defaultValue=""
              className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 bg-gray-50/50 hover:bg-white appearance-none cursor-pointer text-gray-700"
            >
              <option value="" disabled>
                Selecciona un asunto
              </option>
              <option value="consulta">Consulta general</option>
              <option value="reserva">Información sobre reserva</option>
              <option value="disponibilidad">Consultar disponibilidad</option>
              <option value="otro">Otro</option>
            </select>
            {/* Custom Arrow */}
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          <ValidationError
            prefix="Asunto"
            field="asunto"
            errors={state.errors}
            className="text-red-500 text-sm mt-1 block"
          />
        </div>

        {/* Mensaje */}
        <div>
          <label
            htmlFor="mensaje"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={4}
            required
            className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 bg-gray-50/50 hover:bg-white resize-none"
            placeholder="Hola, quisiera consultar disponibilidad para..."
          />
          <ValidationError
            prefix="Mensaje"
            field="mensaje"
            errors={state.errors}
            className="text-red-500 text-sm mt-1 block"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={state.submitting}
          className="w-full bg-orange-700 hover:bg-orange-800 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-orange-500/25 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          {state.submitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Enviando...</span>
            </>
          ) : (
            <>
              <span>Enviar Mensaje</span>
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
