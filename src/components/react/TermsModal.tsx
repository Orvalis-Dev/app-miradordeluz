import React, { useEffect, useRef } from "react";
import type { FC } from "react";

interface TermsModalProps {
  open: boolean;
  onClose: () => void;
}

const TermsModal: FC<TermsModalProps> = ({ open, onClose }) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
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

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Términos y condiciones - Mirador de Luz"
      className="fixed inset-0 z-[90] flex items-center justify-center p-6"
    >
      {/* Fondo oscuro */}
      <div
        className="fixed inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 max-h-[90vh] w-full sm:w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 overflow-y-auto bg-white rounded-lg shadow-2xl p-8">
        <div className="flex items-start justify-between">
          <h2 className="text-2xl font-bold text-amber-800 flex-1 text-center">
            TÉRMINOS Y CONDICIONES DE RESERVA Y HOSPEDAJE
          </h2>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Cerrar términos y condiciones"
            className="ml-4 text-gray-500 hover:text-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-amber-400 p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <hr className="my-6 border-gray-200" />

        {/* Contenido */}
        <div className="space-y-8 text-gray-700 leading-relaxed pb-4">
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              1. SOBRE LAS RESERVAS
            </h3>
            <p>
              Las reservas en Complejo Mirador de Luz se gestionan de manera
              personalizada. Para confirmar una reserva, se solicitará el pago
              de una seña (porcentaje del total a convenir) mediante
              transferencia bancaria. El saldo restante deberá abonarse al
              momento del ingreso (Check-in) en efectivo o transferencia, salvo
              acuerdo previo diferente. La reserva solo se considera efectiva
              una vez enviado el comprobante de pago y recibido nuestro mensaje
              de confirmación.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              2. POLÍTICA DE CANCELACIÓN Y MODIFICACIONES
            </h3>
            <p>
              Entendemos que pueden surgir imprevistos. Nuestra política es la
              siguiente:
            </p>
            <ul className="list-disc ml-5 mt-3 space-y-2">
              <li>
                Las señas abonadas para confirmar fecha no son reembolsables en
                caso de cancelación por parte del huésped.
              </li>
              <li>
                En caso de aviso con antelación (mínimo 15 días antes de la
                fecha de ingreso), el monto abonado podrá quedar como crédito
                para una futura estadía (sujeto a disponibilidad y tarifas
                vigentes), con una validez de 6 meses.
              </li>
              <li>
                Si el huésped decide retirarse antes de finalizar su estadía
                contratada, no se realizarán devoluciones del monto abonado.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              3. HORARIOS (CHECK-IN / CHECK-OUT)
            </h3>
            <p>
              Para garantizar la limpieza y desinfección adecuada de las
              cabañas:
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <span className="font-bold text-gray-800">
                  • Ingreso (Check-in):
                </span>{" "}
                A partir de las 14:00 hs.
              </li>
              <li>
                <span className="font-bold text-gray-800">
                  • Salida (Check-out):
                </span>{" "}
                Hasta las 10:00 hs.
              </li>
              <li>
                <span className="font-bold text-gray-800">
                  • Late Check-out:
                </span>{" "}
                La permanencia después de las 10:00 hs está sujeta a
                disponibilidad y puede conllevar un costo adicional (medio día).
                Por favor, consultanos con anticipación.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              4. NORMAS DE CONVIVENCIA
            </h3>
            <p>
              Mirador de Luz es un espacio pensado para el relax y la conexión
              con la naturaleza.
            </p>
            <ul className="list-disc ml-5 mt-3 space-y-2">
              <li>
                Se ruega evitar ruidos molestos o música a volumen alto,
                especialmente en horarios de descanso (siesta y noche).
              </li>
              <li>
                Las instalaciones (piscina, asadores, parque) son de uso
                exclusivo para los huéspedes registrados. No se permiten visitas
                sin autorización previa de la administración.
              </li>
              <li>
                El cuidado de las instalaciones es responsabilidad del huésped.
                Cualquier rotura o daño ocasionado por mal uso deberá ser
                abonado antes de la salida.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              5. USO DE LA PISCINA Y SEGURIDAD
            </h3>
            <ul className="list-disc ml-5 mt-3 space-y-2">
              <li>
                El uso de la piscina es bajo responsabilidad exclusiva de los
                huéspedes.
              </li>
              <li>
                <span className="font-bold text-gray-800">
                  Menores de edad:
                </span>{" "}
                Deben estar permanentemente acompañados y supervisados por un
                adulto responsable dentro del recinto de la piscina. El complejo
                no cuenta con servicio de guardavidas.
              </li>
              <li>
                No se permite ingresar con envases de vidrio al sector de
                solárium y piscina.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              6. MASCOTAS
            </h3>
            <p>
              Por cuestiones de higiene y seguridad, no se admiten mascotas en
              el complejo.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              7. OBJETOS PERSONALES
            </h3>
            <p>
              El complejo no se hace responsable por la pérdida, olvido o robo
              de dinero, joyas u objetos de valor que no hayan sido depositados
              en custodia o declarados. Recomendamos cerrar bien su cabaña al
              salir.
            </p>
          </section>
        </div>

        <div className="mt-8 flex justify-center border-t pt-6">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
