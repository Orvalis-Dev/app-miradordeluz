import { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { isWhatsAppVisible, isMenuOpen } from "../../stores/uiStore";
import { WhatsAppButton } from "./WhatsAppButton";
import { IconWhatsApp } from "./Icons";

export default function GlobalWhatsAppController() {
  const $isWhatsAppVisible = useStore(isWhatsAppVisible);
  const $isMenuOpen = useStore(isMenuOpen);

  useEffect(() => {
    // Función para verificar visibilidad
    const checkVisibility = () => {
      // 1. Ocultar en rutas específicas (Contacto o Reserva directa de cabaña)
      const path = window.location.pathname;
      const isContactPage = path.includes("/contacto");
      const isReservaPage = path.includes("/reserva"); // Cubre /reserva/1, /reserva/2, etc.

      if (isContactPage || isReservaPage) {
        isWhatsAppVisible.set(false);
        return;
      }

      // 2. Ocultar si el footer es visible
      const footer = document.querySelector("footer");
      if (footer) {
        const rect = footer.getBoundingClientRect();
        // Si el top del footer entra en el viewport (window.innerHeight), ocultar botón
        // Usamos un margen de 50px para ocultarlo un poco antes
        const isFooterVisible = rect.top <= window.innerHeight + 50;

        if (isFooterVisible) {
          isWhatsAppVisible.set(false);
          return;
        }
      }

      // Si pasa todas las validaciones, mostrar
      isWhatsAppVisible.set(true);
    };

    // Listeners
    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", checkVisibility);

    // Check inicial
    checkVisibility();

    return () => {
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
    };
  }, []); // Run once on mount

  // Lógica combinada:
  // Ocultar si:
  // - Rutas específicas (contacto/reserva)
  // - Footer visible
  // - Menú hamburguesa abierto
  const shouldShow = $isWhatsAppVisible && !$isMenuOpen;

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-500 ease-in-out transform ${
        shouldShow
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-20 opacity-0 scale-90 pointer-events-none"
      }`}
    >
      <WhatsAppButton
        className="p-4 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#128C7E] transition-all hover:scale-110 flex items-center justify-center group"
        aria-label="Contactar por WhatsApp"
      >
        <IconWhatsApp className="w-8 h-8" />
      </WhatsAppButton>
    </div>
  );
}
