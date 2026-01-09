import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { FC } from "react";

interface TermsModalProps {
  open: boolean;
  onClose: () => void;
}

const TermsModal: FC<TermsModalProps> = ({ open, onClose }) => {
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
          aria-label="Términos y condiciones - Mirador de Luz"
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
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
              <h2 className="text-xl md:text-2xl font-montserrat font-bold text-slate-900 pr-8">
                Términos y Condiciones de Reserva
              </h2>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                aria-label="Cerrar términos y condiciones"
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
                    SOBRE LAS RESERVAS
                  </h3>
                  <p>
                    Las reservas en Complejo Mirador de Luz se gestionan de
                    manera personalizada. Para confirmar una reserva, se
                    solicitará el pago de una seña (50%) mediante transferencia
                    bancaria. El saldo restante deberá abonarse al momento del
                    ingreso (Check-in) en efectivo o transferencia, salvo
                    acuerdo previo diferente. La reserva solo se considera
                    efectiva una vez enviado el comprobante de pago y recibido
                    nuestro mensaje de confirmación.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-800 text-sm">
                      2
                    </span>
                    POLÍTICA DE CANCELACIÓN
                  </h3>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <p className="mb-4">
                      Entendemos que pueden surgir imprevistos. Nuestra política
                      es la siguiente:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex gap-3">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        <span>
                          Las señas abonadas para confirmar fecha no son
                          reembolsables en caso de cancelación por parte del
                          huésped.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        <span>
                          En caso de aviso con antelación (mínimo 15 días antes
                          de la fecha de ingreso), el monto abonado podrá quedar
                          como crédito.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        <span>
                          Si el huésped decide retirarse antes de finalizar su
                          estadía contratada, no se realizarán devoluciones.
                        </span>
                      </li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-800 text-sm">
                      3
                    </span>
                    HORARIOS (CHECK-IN / OUT)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                        Ingreso
                      </span>
                      <p className="text-lg font-bold text-slate-900">
                        Desde las 14:00 hs
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                        Salida
                      </span>
                      <p className="text-lg font-bold text-slate-900">
                        Hasta las 10:00 hs
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-800 text-sm">
                      4
                    </span>
                    NORMAS DE CONVIVENCIA
                  </h3>
                  <p>
                    Mirador de Luz es un espacio pensado para el relax y la
                    conexión con la naturaleza. Se ruega evitar ruidos molestos
                    especialmente en horarios de descanso. Las instalaciones son
                    de uso exclusivo para los huéspedes registrados.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-800 text-sm">
                      5
                    </span>
                    PISCINA Y SEGURIDAD
                  </h3>
                  <p className="text-sm bg-orange-50 text-orange-800 p-4 rounded-xl border border-orange-100">
                    <strong>Importante:</strong> El uso de la piscina es bajo
                    responsabilidad exclusiva de los huéspedes. Menores deben
                    estar permanentemente supervisados. No se permite vidrio en
                    el sector de solárium.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-800 text-sm">
                      6
                    </span>
                    MASCOTAS
                  </h3>
                  <p>
                    Por cuestiones de higiene y seguridad, no se admiten
                    mascotas en el complejo.
                  </p>
                </section>

                <section className="pb-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-800 text-sm">
                      7
                    </span>
                    OBJETOS PERSONALES
                  </h3>
                  <p>
                    El complejo no se hace responsable por pérdida o robo de
                    objetos de valor no declarados. Recomendamos cerrar bien su
                    cabaña al salir.
                  </p>
                </section>
              </div>
            </div>

            {/* Footer con botón de acción (Mismo estilo que AmenitiesModal) */}
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-center sticky bottom-0">
              <button
                onClick={onClose}
                className="w-full md:w-auto px-12 py-3 bg-amber-700 text-white font-bold rounded-xl hover:bg-amber-800 transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
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

export default TermsModal;
