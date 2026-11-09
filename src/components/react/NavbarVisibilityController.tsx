import { useEffect, type FC } from 'react';

/**
 * Controla la visibilidad global del navbar.
 *
 * Regla de negocio:
 * - El navbar solo debe verse mientras el usuario está en el Hero principal.
 * - En cuanto cualquier otra sección principal entra en el viewport
 *   (Ubicación, Hero Intermedio, Cabañas, Servicios, Testimonios),
 *   el navbar se oculta.
 */
const NavbarVisibilityController: FC = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    // Referencias a las secciones relevantes
    const heroSection = document.getElementById('hero-section');
    const ubicacionSection = document.getElementById('ubicacion');
    const heroIntermedioSection = document.getElementById('hero-intermedio-section');
    const cabanasSection = document.getElementById('cabanas-section');
    const serviciosSection = document.getElementById('servicios');
    const testimoniosSection = document.getElementById('testimonios');

    if (!heroSection) {
      return;
    }

    const blockerSections = [
      ubicacionSection,
      heroIntermedioSection,
      cabanasSection,
      serviciosSection,
      testimoniosSection,
    ].filter(Boolean) as HTMLElement[];

    const NAVBAR_HEIGHT = 80; // px aproximados de altura del navbar

    const updateNavbarVisibility = () => {
      const heroRect = heroSection.getBoundingClientRect();

      // El hero sigue "en pantalla" (alguna parte es visible)
      const heroVisible = heroRect.bottom > 0 && heroRect.top < window.innerHeight;

      // ¿Alguna otra sección principal ya está entrando en el viewport?
      const anyBlockerVisible = blockerSections.some((section) => {
        const rect = section.getBoundingClientRect();
        // Consideramos que la sección ya "tapa" al hero cuando su top
        // alcanza la banda del navbar (NAVBAR_HEIGHT) y aún tiene parte visible.
        return rect.top <= NAVBAR_HEIGHT && rect.bottom > 0;
      });

      // Regla:
      // - Mostrar navbar solo si:
      //   1) El hero está visible
      //   2) Ninguna otra sección lo está tapando en la parte superior
      if (heroVisible && !anyBlockerVisible) {
        document.body.classList.remove('hide-navbar-global');
      } else {
        document.body.classList.add('hide-navbar-global');
      }
    };

    // Ejecutar una vez al montar
    updateNavbarVisibility();

    // Listeners de scroll y resize
    window.addEventListener('scroll', updateNavbarVisibility, { passive: true });
    window.addEventListener('resize', updateNavbarVisibility);

    // Cleanup
    return () => {
      document.body.classList.remove('hide-navbar-global');
      window.removeEventListener('scroll', updateNavbarVisibility);
      window.removeEventListener('resize', updateNavbarVisibility);
    };
  }, []);

  return null; // Este componente no renderiza nada
};

export default NavbarVisibilityController;


