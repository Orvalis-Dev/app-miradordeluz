import { useEffect, type FC } from "react";

/**
 * Observador específico para la sección de ubicación.
 * Añade la clase `hide-navbar-global` al body mientras la sección de ubicación sea visible,
 * forzando así que cualquier `nav`/`header` quede oculto.
 */
const UbicacionObserver: FC = () => {
  useEffect(() => {
    const target = document.getElementById("ubicacion");
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.body.classList.add("hide-navbar-global");
          } else {
            document.body.classList.remove("hide-navbar-global");
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -20% 0px",
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
      document.body.classList.remove("hide-navbar-global");
    };
  }, []);

  return null;
};

export default UbicacionObserver;
