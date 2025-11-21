# Animaciones de Scroll con GSAP ScrollTrigger

Este documento describe las animaciones implementadas en la página principal usando GSAP ScrollTrigger.

---

## 📦 Instalación

```bash
npm install gsap
```

---

## 🎬 Animaciones Implementadas

### 1. Hero → Ubicación (Overlay Effect)

**Comportamiento:**
- El Hero se "pinea" (permanece fijo) mientras el usuario hace scroll
- La sección de Ubicación sube desde abajo y se superpone sobre el Hero
- El Hero se oscurece progresivamente (overlay de 30% a 70%)
- Efecto de fade-in en la sección Ubicación

**Técnica:**
- `pin: true` en ScrollTrigger para mantener el Hero fijo
- `scrub: true` para animación fluida sincronizada con scroll
- Animación de opacity en el overlay del Hero
- `translateY` + `opacity` en la sección Ubicación

---

### 2. Ubicación → Hero Intermedio (Video Autoplay Full Screen)

**Comportamiento:**
- El Hero Intermedio ocupa 100% de la pantalla (100vh) desde el inicio
- Se pinea cuando alcanza la parte superior
- El video se reproduce automáticamente al entrar en viewport
- El video se pausa al salir del viewport

**Técnica:**
- Altura fija `h-screen` (100vh) sin animación de expansión
- `pin: true` para mantener la sección cuando llega arriba
- ScrollTrigger `onEnter` / `onLeave` para controlar `video.play()` / `video.pause()`
- Video con propiedades: `loop`, `muted`, `playsInline`

**Requisitos del Video:**
```tsx
<video
  id="hero-intermedio-video"
  loop
  muted
  playsInline
  preload="metadata"
/>
```

---

### 3. Hero Intermedio → Cabañas (Efecto de Reemplazo)

**Comportamiento:**
- El Hero Intermedio se desvanece con fade-out + blur
- La sección Cabañas "empuja" desde abajo reemplazando al Hero
- Transición fluida sincronizada con el scroll

**Técnica:**
- `opacity: 0` + `filter: blur(8px)` en Hero Intermedio
- `translateY(40px) → 0` + `opacity: 0 → 1` en sección Cabañas
- `scrub: true` para sincronización perfecta con velocidad de scroll

---

## 📁 Estructura de Archivos

### Componente Principal de Animaciones

```
src/components/react/ScrollAnimations.tsx
```

Este componente:
- Se inicializa una sola vez
- Registra todas las animaciones GSAP
- Escucha eventos de scroll con ScrollTrigger
- Controla el video del Hero Intermedio
- Se limpia automáticamente al desmontar (cleanup)

### Modificaciones en Componentes Existentes

#### SectionHeroIntermedioMiradorDeLuz.tsx
- ✅ Soporte para video de fondo (`backgroundVideo` prop)
- ✅ Mantiene compatibilidad con imágenes estáticas
- ✅ Video con ID único para GSAP (`#hero-intermedio-video`)

#### index.astro
- ✅ IDs únicos para cada sección:
  - `#hero-section`
  - `#ubicacion-section`
  - `#hero-intermedio-section`
  - `#cabanas-section`
- ✅ Overlay adicional en Hero para efecto de oscurecimiento
- ✅ Z-index correcto para superposición de secciones
- ✅ Importación y uso de `ScrollAnimations` con `client:load`

---

## 🎨 Uso en index.astro

```astro
---
import ScrollAnimations from "../components/react/ScrollAnimations";
import HeroMiradorDeLuz from "../components/react/HeroMiradorDeLuz";
import SectionHeroIntermedioMiradorDeLuz from "../components/react/SectionHeroIntermedioMiradorDeLuz";
// ... otros imports
---

<Layout title="Mirador de Luz">
  <!-- Inicializar animaciones GSAP -->
  <ScrollAnimations client:load />

  <main>
    <!-- 1. Hero con ID y overlay -->
    <div id="hero-section" style="position: relative;">
      <HeroMiradorDeLuz client:load />
      <div class="hero-overlay" style="position: absolute; inset: 0; background: black; opacity: 0.5; pointer-events: none; z-index: 5;"></div>
    </div>

    <!-- 2. Ubicación con ID -->
    <div id="ubicacion-section" style="position: relative; z-index: 10; background: white;">
      <SectionUbicacionMiradorDeLuz client:visible />
    </div>

    <!-- 3. Hero Intermedio con Video -->
    <div id="hero-intermedio-section" style="position: relative; z-index: 9;">
      <SectionHeroIntermedioMiradorDeLuz 
        client:visible 
        backgroundVideo="/videos/VideoCarlosPaz.mp4"
        subheading="MIRADOR DE LUZ"
        title="Experiencia única.\nEntre las montañas."
        overlayOpacity="dark"
        height="h-screen"
      />
    </div>

    <!-- 4. Cabañas con ID -->
    <div id="cabanas-section" style="position: relative; z-index: 11; background: white;">
      <SectionCabanasMiradorDeLuz client:visible />
    </div>
  </main>
</Layout>
```

---

## 🎥 Videos

Los videos deben estar en la carpeta `/public/videos/`:

```
app-miradordeluz/
└── public/
    └── videos/
        ├── VideoCarlosPaz.mp4
        └── LagoSanRoque.mp4
```

### Uso de Video en Hero Intermedio

```tsx
<SectionHeroIntermedioMiradorDeLuz 
  backgroundVideo="/videos/VideoCarlosPaz.mp4"
  // ... otras props
/>
```

---

## ⚡ Performance

### Optimizaciones Implementadas

1. **Hidratación Selectiva:**
   - `ScrollAnimations` con `client:load` (necesario para inicializar GSAP)
   - Otras secciones con `client:visible` (lazy loading)

2. **Video Optimizado:**
   - `preload="metadata"` (no carga todo el video de entrada)
   - `playsInline` para mobile
   - `muted` para permitir autoplay sin interacción

3. **Inicialización Controlada:**
   - Verificación de existencia de elementos DOM
   - Prevención de inicialización múltiple con `useRef`
   - Cleanup automático de ScrollTriggers al desmontar

4. **Animaciones Performantes:**
   - Uso de `transform` y `opacity` (GPU accelerated)
   - `scrub: true` para sincronización fluida
   - No se animan propiedades costosas como `width`, `height` en loop

---

## 🐛 Troubleshooting

### El video no se reproduce

**Solución:**
- Verificar que el archivo existe en `/public/videos/`
- Asegurar que el video tiene formato compatible (MP4 H.264)
- Verificar que `muted` esté presente (requerido para autoplay)
- Revisar console para errores de reproducción

### Las animaciones no funcionan

**Solución:**
- Verificar que GSAP está instalado: `npm list gsap`
- Comprobar que los IDs de secciones existen en el DOM
- Verificar que `ScrollAnimations` tiene `client:load`
- Revisar console para errores de inicialización

### Animaciones entrecortadas

**Solución:**
- Usar `scrub: 1` en lugar de `scrub: true` para más suavidad
- Verificar que no hay animaciones CSS conflictivas
- Reducir complejidad de blur o efectos pesados

---

## 🎯 Personalización

### Cambiar Velocidad de Animaciones

```tsx
// En ScrollAnimations.tsx

// Más lento
scrub: 2

// Más rápido
scrub: 0.5

// Sin scrub (animación independiente del scroll)
scrub: false,
duration: 1
```

### Cambiar Punto de Inicio

```tsx
ScrollTrigger.create({
  trigger: elemento,
  start: 'top center',    // Empieza cuando el top del elemento llega al centro del viewport
  end: 'bottom top',      // Termina cuando el bottom llega al top del viewport
})
```

### Opciones de Start/End

- `"top top"` - parte superior del elemento toca parte superior del viewport
- `"top center"` - parte superior del elemento toca centro del viewport
- `"top bottom"` - parte superior del elemento toca parte inferior del viewport
- `"center center"` - centro del elemento toca centro del viewport
- `"bottom top"` - parte inferior del elemento toca parte superior del viewport

---

## 📊 Estructura de Z-Index

```
Hero: position relative (pinned)
├─ Overlay: z-index 5
├─ Contenido: z-index 10

Ubicación: z-index 10 (se superpone sobre Hero)

Hero Intermedio: z-index 9 (debajo de Ubicación)

Cabañas: z-index 11 (se superpone sobre Hero Intermedio)
```

---

## ✨ Mejoras Futuras

Ideas para extender las animaciones:

- [ ] Parallax en imágenes de fondo
- [ ] Animaciones en elementos individuales (cards, textos)
- [ ] Scroll horizontal en galería de cabañas
- [ ] Transiciones de color en secciones
- [ ] Cursor personalizado que reaccione al scroll
- [ ] Progress bar de scroll
- [ ] Animaciones de entrada más elaboradas (stagger effects)

---

## 📚 Recursos

- [GSAP ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [GSAP ScrollTrigger Demos](https://codepen.io/collection/AEbkkJ)
- [GSAP Cheat Sheet](https://greensock.com/cheatsheet/)

---

**Última actualización:** 20/11/2024  
**Versión:** 1.0.0

