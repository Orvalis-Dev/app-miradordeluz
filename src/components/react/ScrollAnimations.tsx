import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { FC } from 'react';

// Registrar el plugin de ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ScrollAnimations: FC = () => {
  const isInitialized = useRef(false);

  useEffect(() => {
    // Evitar inicialización múltiple
    if (isInitialized.current) return;
    isInitialized.current = true;

    // Asegurar que el DOM esté listo
    const initAnimations = () => {
      const hero = document.querySelector('#hero-section');
      const ubicacion = document.querySelector('#ubicacion-section');
      const heroIntermedio = document.querySelector('#hero-intermedio-section');
      const cabanas = document.querySelector('#cabanas-section');
      const videoElement = document.querySelector('#hero-intermedio-video') as HTMLVideoElement;

      // Si no existen los elementos, esperar un poco más
      if (!hero || !ubicacion || !heroIntermedio || !cabanas) {
        setTimeout(initAnimations, 100);
        return;
      }

      // ============================================
      // 1. ANIMACIÓN: Hero → Ubicación (Overlay)
      // ============================================
      ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
        scrub: true,
        onUpdate: (self) => {
          // Oscurecer el hero cuando se hace scroll
          const overlay = hero.querySelector('.hero-overlay');
          if (overlay) {
            gsap.to(overlay, {
              opacity: 0.3 + (self.progress * 0.4), // De 0.3 a 0.7
              duration: 0,
            });
          }
        },
      });

      // Animación de entrada de la sección Ubicación
      gsap.fromTo(
        ubicacion,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ubicacion,
            start: 'top bottom-=100',
            end: 'top center',
            scrub: true,
          },
        }
      );

      // ============================================
      // 2. ANIMACIÓN: Ubicación → Hero Intermedio (Video)
      // ============================================
      
      // El Hero Intermedio ya ocupa 100vh desde el inicio (h-screen)
      // No necesita animación de expansión
      
      // Pin del Hero Intermedio cuando llega a la parte superior
      ScrollTrigger.create({
        trigger: heroIntermedio,
        start: 'top top',
        end: '+=50%',
        pin: true,
        pinSpacing: true,
      });

      // Controlar reproducción del video
      if (videoElement) {
        ScrollTrigger.create({
          trigger: heroIntermedio,
          start: 'top center',
          end: 'bottom top',
          onEnter: () => {
            videoElement.play().catch(err => {
              console.log('Error al reproducir video:', err);
            });
          },
          onLeave: () => {
            videoElement.pause();
          },
          onEnterBack: () => {
            videoElement.play().catch(err => {
              console.log('Error al reproducir video:', err);
            });
          },
          onLeaveBack: () => {
            videoElement.pause();
          },
        });
      }

      // ============================================
      // 3. ANIMACIÓN: Hero Intermedio → Cabañas (Reemplazo)
      // ============================================
      
      // Fade out y blur del Hero Intermedio
      gsap.to(heroIntermedio, {
        opacity: 0,
        filter: 'blur(8px)',
        scrollTrigger: {
          trigger: cabanas,
          start: 'top bottom',
          end: 'top center',
          scrub: true,
        },
      });

      // Entrada de la sección Cabañas desde abajo
      gsap.fromTo(
        cabanas,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: cabanas,
            start: 'top bottom',
            end: 'top center',
            scrub: true,
          },
        }
      );
    };

    // Iniciar animaciones
    if (typeof window !== 'undefined') {
      // Esperar a que el DOM esté completamente cargado
      if (document.readyState === 'complete') {
        setTimeout(initAnimations, 100);
      } else {
        window.addEventListener('load', () => {
          setTimeout(initAnimations, 100);
        });
      }
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return null;
};

export default ScrollAnimations;

