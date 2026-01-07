import React, { useState, type FormEvent } from "react";
import { Send, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

interface FormData {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}

interface FormErrors {
  nombre?: string;
  email?: string;
  asunto?: string;
  mensaje?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  // Sanitización de strings (limpieza profunda)
  const sanitizeString = (str: string) => {
    return str
      .trim()
      .replace(
        /[&<>"']/g,
        (m) =>
          ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
          }[m] || m)
      )
      .slice(0, 1000);
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    // Nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    } else if (formData.nombre.trim().length < 3) {
      newErrors.nombre = "El nombre debe tener al menos 3 caracteres";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.nombre)) {
      newErrors.nombre = "El nombre solo puede contener letras";
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "El email es obligatorio";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Ingresa un email válido";
    }

    // Asunto
    if (!formData.asunto) {
      newErrors.asunto = "Selecciona un asunto";
    }

    // Mensaje
    if (!formData.mensaje.trim()) {
      newErrors.mensaje = "El mensaje no puede estar vacío";
    } else if (formData.mensaje.trim().length < 10) {
      newErrors.mensaje = "El mensaje es demasiado corto (mín. 10 caracteres)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Limpiar error al escribir
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormErrors];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Check honeypot
    if (honeypot) {
      console.warn("Bot detected via honeypot");
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);

    // NO sanitizar aquí - el servidor lo hará
    // Solo preparamos los datos para enviar al endpoint
    const dataToSend = {
      nombre: formData.nombre,
      email: formData.email,
      asunto: formData.asunto,
      mensaje: formData.mensaje,
    };

    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error al enviar el mensaje");
      }

      // Éxito
      setIsSuccess(true);
      setFormData({ nombre: "", email: "", asunto: "", mensaje: "" });
    } catch (error) {
      console.error("Error enviando el formulario:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Hubo un error al enviar el mensaje. Por favor intenta de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100 flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="font-montserrat text-3xl font-bold text-slate-800 mb-4">
          ¡Mensaje Enviado!
        </h2>
        <p className="text-slate-600 mb-8 max-w-sm">
          Gracias por contactarte con Mirador de Luz. Te responderemos a la
          brevedad posible.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="font-montserrat bg-slate-900 text-white px-8 py-3 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-slate-800 transition-all"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100/50">
      <h2 className="font-montserrat text-3xl font-semibold mb-8 text-slate-900 tracking-tight">
        Envíanos un mensaje
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Honeypot field (hidden from users) */}
        <div className="hidden" aria-hidden="true">
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label
              htmlFor="nombre"
              className="font-montserrat block text-xs font-extrabold text-slate-500 uppercase tracking-widest px-1"
            >
              Nombre completo
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`font-montserrat w-full px-4 py-3 bg-gray-50/50 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none ${
                errors.nombre ? "border-red-500" : "border-gray-200"
              }`}
              placeholder="Tu nombre"
            />
            {errors.nombre && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.nombre}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="font-montserrat block text-xs font-extrabold text-slate-500 uppercase tracking-widest px-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`font-montserrat w-full px-4 py-3 bg-gray-50/50 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none ${
                errors.email ? "border-red-500" : "border-gray-200"
              }`}
              placeholder="tu@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="asunto"
            className="font-montserrat block text-xs font-extrabold text-slate-500 uppercase tracking-widest px-1"
          >
            Asunto
          </label>
          <select
            id="asunto"
            name="asunto"
            value={formData.asunto}
            onChange={handleChange}
            className={`font-montserrat w-full px-4 py-3 bg-gray-50/50 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none ${
              errors.asunto ? "border-red-500" : "border-gray-200"
            }`}
          >
            <option value="">Selecciona una opción</option>
            <option value="consulta">Consulta general</option>
            <option value="reserva">Información sobre reserva</option>
            <option value="disponibilidad">Consultar disponibilidad</option>
            <option value="otro">Otro</option>
          </select>
          {errors.asunto && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.asunto}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="mensaje"
            className="font-montserrat block text-xs font-extrabold text-slate-500 uppercase tracking-widest px-1"
          >
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={4}
            value={formData.mensaje}
            onChange={handleChange}
            maxLength={1000}
            className={`font-montserrat w-full px-4 py-3 bg-gray-50/50 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none resize-none ${
              errors.mensaje ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="¿En qué te podemos ayudar?"
          ></textarea>
          <div className="flex justify-between items-center px-1">
            {errors.mensaje ? (
              <p className="text-red-500 text-xs flex items-center gap-1">
                <AlertCircle size={12} /> {errors.mensaje}
              </p>
            ) : (
              <span></span>
            )}
            <span
              className={`text-[10px] font-bold uppercase tracking-wider ${
                formData.mensaje.length > 950
                  ? "text-orange-500"
                  : "text-slate-400"
              }`}
            >
              {formData.mensaje.length} / 1000
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="font-montserrat w-full bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-[0.2em] transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-1 transform flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              ENVIANDO...
            </>
          ) : (
            <>
              <Send size={18} />
              ENVIAR MENSAJE
            </>
          )}
        </button>
      </form>
    </div>
  );
}
