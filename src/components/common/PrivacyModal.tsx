import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { FC } from "react";

interface PrivacyModalProps {
  open: boolean;
  onClose: () => void;
}

const PrivacyModal: FC<PrivacyModalProps> = ({ open, onClose }) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;

    // Enfocar el botón cerrar al abrir
    closeButtonRef.current?.focus();

    // Manejar escape para cerrar
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);

    // Prevenir scroll del body cuando esté abierto
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Política de privacidad - Mirador de Luz"
          className="fixed inset-0 z-[120] flex items-center justify-center p-4"
        >
          {/* Fondo oscuro con Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel con Zoom + Slide (Misma estructura que AmenitiesModal) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
            className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header (Mismo estilo que AmenitiesModal) */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10 w-full">
              <h2 className="text-xl md:text-2xl font-montserrat font-bold text-slate-900 pr-8">
                Política de Privacidad
              </h2>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors flex-shrink-0"
                aria-label="Cerrar política de privacidad"
              >
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>

            {/* Body (Con scroll interno como AmenitiesModal) */}
            <div className="p-8 overflow-y-auto">
              <div className="space-y-8 text-slate-700 font-montserrat leading-relaxed">
                <section>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-800 text-sm">
                      1
                    </span>
                    TUS DATOS ESTÁN SEGUROS
                  </h3>
                  <p>
                    En el <strong>Complejo Mirador de Luz</strong>, valoramos y
                    respetamos tu privacidad. Esta política tiene como objetivo
                    informarte de manera transparente sobre cómo gestionamos la
                    información en nuestro sitio web, garantizando que tus datos
                    personales estén protegidos y se utilicen únicamente para
                    los fines que has autorizado.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-800 text-sm">
                      2
                    </span>
                    USO DE GOOGLE ANALYTICS
                  </h3>
                  <p>
                    Utilizamos <strong>Google Analytics</strong> para recopilar
                    información estadística anónima sobre el uso de nuestro
                    sitio web. Estos datos nos ayudan a entender cómo los
                    visitantes interactúan con nuestras páginas (por ejemplo,
                    qué secciones son más visitadas o cuánto tiempo permanecen
                    en el sitio).
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-600">
                    <li>
                      <strong>Finalidad:</strong> Únicamente estadística y de
                      mejora del servicio.
                    </li>
                    <li>
                      <strong>Datos recopilados:</strong> Dirección IP
                      (anonimizada), tipo de dispositivo, navegador, ubicación
                      general y comportamiento de navegación.
                    </li>
                    <li>
                      <strong>Acceso:</strong> Los informes de métricas son
                      accesibles exclusivamente por la administración del
                      complejo para la toma de decisiones.
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-800 text-sm">
                      3
                    </span>
                    INFORMACIÓN DE CONTACTO
                  </h3>
                  <p>
                    Información personal que nos proporcionas voluntariamente a
                    través de nuestros formularios de contacto, WhatsApp o
                    correo electrónico (como tu nombre, teléfono o dirección de
                    email) es estrictamente confidencial.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-600">
                    <li>
                      No compartimos, vendemos ni alquilamos tu información a
                      terceros.
                    </li>
                    <li>
                      Se utiliza exclusivamente para responder a tus consultas,
                      gestionar tu reserva o enviarte información relevante
                      sobre tu estadía.
                    </li>
                    <li>
                      Toda la comunicación se mantiene en canales seguros y
                      privados entre tú y la administración del complejo.
                    </li>
                  </ul>
                </section>
                <div className="pt-8 border-t border-slate-100 text-center">
                  <p className="text-sm text-slate-500 italic">
                    Última actualización: {new Date().getFullYear()}
                  </p>
                </div>
              </div>
            </div>
            {/* Footer con Botón Cerrar */}
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors"
                aria-label="Entendido, cerrar política de privacidad"
              >
                Entendido
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PrivacyModal;
