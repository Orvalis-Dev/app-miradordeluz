import { type FC, useState } from 'react';
import AmenityIcon from './AmenityIcon';

interface AmenitiesModalProps {
  amenities: string[];
  cabaName?: string;
}

const AmenitiesModal: FC<AmenitiesModalProps> = ({ amenities, cabaName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Agregar WiFi si no está en la lista
  const allAmenities = amenities.includes('WiFi') ? amenities : [...amenities, 'WiFi'];

  return (
    <>
      {/* Botón "+" que abre el modal */}
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

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-amenidades-title"
        >
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* Contenido del modal */}
          <div className="relative z-10 w-full max-w-3xl bg-white rounded-xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h3 id="modal-amenidades-title" className="font-montserrat text-xl font-semibold text-[#1E1E1E]">
                {cabaName ? `Amenidades de ${cabaName}` : 'Todas las amenidades'}
              </h3>
              <button
                onClick={closeModal}
                aria-label="Cerrar"
                className="p-2 rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A8936D]"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Contenido */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {allAmenities.map((amenidad, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all">
                    <div className="w-12 h-12 rounded-md bg-stone-100 flex items-center justify-center text-stone-700 shrink-0">
                      <AmenityIcon amenity={amenidad} class="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-montserrat font-semibold text-[#1E1E1E]">{amenidad}</div>
                      <div className="text-sm text-gray-500">Incluido</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Nota adicional */}
              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
                <p className="text-sm text-gray-700">
                  <strong className="font-semibold">Nota:</strong> Todas las amenidades están incluidas en tu estadía sin cargo adicional.
                </p>
              </div>
            </div>

            {/* Footer opcional */}
            <div className="p-6 border-t bg-gray-50">
              <button
                onClick={closeModal}
                className="w-full py-3 px-6 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AmenitiesModal;

