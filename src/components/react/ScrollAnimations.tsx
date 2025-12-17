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

      // Respetar usuarios con reducción de movimiento
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set([ubicacion, cabanas], { clearProps: 'all' });
        gsap.set(heroIntermedio, { opacity: 1, filter: 'none' });
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
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: 'power2.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: ubicacion,
            start: 'top bottom-=100',
            end: 'top center',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );

      // ============================================
      // 2. ANIMACIÓN: Ubicación → Hero Intermedio (Video)
      // ============================================

      // El Hero Intermedio se "ancla" durante la transición con Cabañas.
      // Importante: NO usamos un pin corto (+=50%) porque se suelta en mitad
      // de la entrada de Cabañas y genera un "arrastre" visual no deseado.

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

      // Transición deseada:
      // - Mientras Cabañas entra: el hero intermedio permanece fijo (pin) y solo cambia visualmente (blur/opacidad)
      // - Luego, cuando Cabañas ocupa el viewport: el scroll vuelve a ser "normal" y el hero se va por scroll natural
      const heroToCabanasTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroIntermedio,
          start: 'top top',
          endTrigger: cabanas,
          end: 'top top',
          scrub: true,
          pin: heroIntermedio,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Cabañas sube desde abajo como "capa" encima del hero anclado
      heroToCabanasTl.fromTo(
        cabanas,
        { y: 50, autoAlpha: 0 },
        { y: -100, autoAlpha: 1, ease: 'none', immediateRender: false },
        0
      );

      // Hero intermedio: solo efecto visual (sin mover su posición)
      heroToCabanasTl.to(
        heroIntermedio,
        { opacity: 0.1, filter: 'blur(12px)', ease: 'none' },
        0
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

