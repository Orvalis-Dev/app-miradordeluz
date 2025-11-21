# 🏔️ Hero Intermedio - Documentación

## Componente de Separador Visual con Imagen de Fondo

Sección tipo "hero" de altura media, ideal para separar contenido y crear impacto visual entre secciones de la página.

---

## 📦 Ubicación

```
src/components/react/SectionHeroIntermedioMiradorDeLuz.tsx
```

---

## 🚀 Uso Básico

### En una página Astro:

```astro
---
import SectionHeroIntermedioMiradorDeLuz from '../components/react/SectionHeroIntermedioMiradorDeLuz';
---

<SectionHeroIntermedioMiradorDeLuz client:load />
```

### Ver ejemplos:

```
http://localhost:4321/ejemplo-hero-intermedio
```

---

## ⚙️ Props Configurables

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `backgroundImage` | string | URL Unsplash | URL de la imagen de fondo |
| `subheading` | string | "CERCA DE TODO" | Etiqueta pequeña superior |
| `title` | string | "Naturaleza & Confort..." | Título principal (usa \n para saltos) |
| `overlayOpacity` | 'light' \| 'medium' \| 'dark' \| 'darker' | 'medium' | Opacidad del overlay |
| `height` | string | 'h-[60vh]' | Altura del hero (clases Tailwind) |
| `accentColor` | string | 'text-amber-300' | Color de la etiqueta superior |

---

## 🎨 Características del Diseño

### 1. **Imagen de Fondo**
- ✅ Ancho completo (`w-full`)
- ✅ `bg-cover` y `bg-center`
- ✅ Altura configurable (default: 60vh)
- ✅ `object-cover` para mantener proporciones

### 2. **Overlay Oscuro**
- ✅ 4 niveles de opacidad:
  - `light`: 30% negro
  - `medium`: 50% negro (default)
  - `dark`: 60% negro
  - `darker`: 70% negro

### 3. **Contenido Centrado**
- ✅ Centrado vertical y horizontal perfecto
- ✅ `flex items-center justify-center`
- ✅ Responsive y adaptable

### 4. **Etiqueta Superior (Subheading)**
- ✅ Texto pequeño (`text-xs md:text-sm`)
- ✅ Mayúsculas con tracking amplio
- ✅ Color configurable (default: amarillo/ámbar)

### 5. **Título Principal**
- ✅ Grande y bold (`text-3xl → text-6xl`)
- ✅ Blanco con legibilidad perfecta
- ✅ Soporte para múltiples líneas con `\n`
- ✅ Responsive en todos los tamaños

---

## 📝 Ejemplos de Uso

### Ejemplo 1: Uso Básico

```astro
<SectionHeroIntermedioMiradorDeLuz client:load />
```

**Resultado:**
- Imagen de montañas
- "CERCA DE TODO" en amarillo
- "Naturaleza & Confort.\nEn el Mirador de la Montaña."

---

### Ejemplo 2: Personalizado Completo

```astro
<SectionHeroIntermedioMiradorDeLuz 
  client:load
  backgroundImage="/images/lago-san-roque.jpg"
  subheading="MIRADOR DE LUZ"
  title="Desconectá de la rutina.\nReconectá con la naturaleza."
  overlayOpacity="dark"
  height="h-[70vh]"
  accentColor="text-emerald-300"
/>
```

---

### Ejemplo 3: Múltiples Héroes en Secuencia

```astro
<!-- Hero principal -->
<HeroMiradorDeLuz client:load />

<!-- Contenido -->
<section>...</section>

<!-- Hero intermedio 1 -->
<SectionHeroIntermedioMiradorDeLuz 
  client:load
  title="Cabañas equipadas.\nComodidad garantizada."
/>

<!-- Más contenido -->
<section>...</section>

<!-- Hero intermedio 2 -->
<SectionHeroIntermedioMiradorDeLuz 
  client:load
  backgroundImage="/images/otra-vista.jpg"
  title="Actividades para todos.\nExperiencias inolvidables."
/>
```

---

## 🎨 Combinaciones de Colores

### Amarillo/Naranja (Cálido)
```tsx
accentColor="text-amber-300"    // Amarillo suave
accentColor="text-orange-300"   // Naranja suave
accentColor="text-yellow-200"   // Amarillo muy claro
```

### Verde (Natural)
```tsx
accentColor="text-emerald-300"  // Verde esmeralda
accentColor="text-teal-300"     // Verde azulado
accentColor="text-lime-300"     // Verde lima
```

### Neutros
```tsx
accentColor="text-gray-200"     // Gris claro
accentColor="text-white"        // Blanco puro
```

---

## 📐 Alturas Recomendadas

```tsx
// Bajo (separador sutil)
height="h-[40vh]"

// Medio (default, equilibrado)
height="h-[60vh]"

// Alto (impactante)
height="h-[80vh]"

// Pantalla completa
height="h-screen"

// Fijo en píxeles
height="h-[500px]"
```

---

## 🎯 Niveles de Overlay

### Light (30%)
```tsx
overlayOpacity="light"
```
Usar cuando la imagen es oscura o quieres más visibilidad de la foto.

### Medium (50%) - Default
```tsx
overlayOpacity="medium"
```
Balance perfecto para la mayoría de casos.

### Dark (60%)
```tsx
overlayOpacity="dark"
```
Ideal para imágenes muy claras o con mucho detalle.

### Darker (70%)
```tsx
overlayOpacity="darker"
```
Máximo contraste, casi monocromático.

---

## 📱 Responsividad

| Pantalla | Subheading | Título | Altura |
|----------|------------|--------|--------|
| **Mobile** | text-xs | text-3xl | Mantiene proporción |
| **Tablet** | text-sm | text-5xl | Mantiene proporción |
| **Desktop** | text-sm | text-6xl | Mantiene proporción |

---

## 💡 Casos de Uso

### 1. **Separador de Secciones**
```astro
<section>Sobre Nosotros</section>
<SectionHeroIntermedioMiradorDeLuz title="Nuestras Cabañas" />
<section>Galería de Cabañas</section>
```

### 2. **Destacar Servicios**
```astro
<SectionHeroIntermedioMiradorDeLuz 
  subheading="SERVICIOS"
  title="Todo lo que necesitás.\nY más."
/>
```

### 3. **Llamado a la Acción Visual**
```astro
<SectionHeroIntermedioMiradorDeLuz 
  subheading="RESERVÁ HOY"
  title="Tu próxima aventura.\nEmpieza acá."
  overlayOpacity="darker"
/>
```

### 4. **Entre Galería de Fotos**
```astro
<GaleriaFotos />
<SectionHeroIntermedioMiradorDeLuz 
  title="Más que un lugar.\nUna experiencia."
/>
<Testimonios />
```

---

## 🖼️ Imágenes Recomendadas

### Características Ideales
- **Resolución**: 1920x1080px mínimo
- **Aspecto**: Horizontal panorámico
- **Contenido**: 
  - Paisajes amplios
  - Vista desde altura
  - Montañas, lagos, bosques
  - Cabañas en entorno natural

### Composición
- ✅ Evitar texto o detalles importantes en el centro
- ✅ Horizonte centrado o en regla de tercios
- ✅ Colores no muy saturados (el overlay los oscurecerá)

### Bancos de Imágenes
```
Unsplash:
- photo-1506905925346-21bda4d32df4 (montañas)
- photo-1542718610-a1d656d1884c (cabañas)
- photo-1587061949409-02df41d5e562 (naturaleza)

Pexels:
- "mountain cabin view"
- "forest landscape"
- "cabin nature aerial"
```

---

## 🎨 Tipografía y Legibilidad

### Mejores Prácticas

1. **Título no muy largo**
   - Máximo 2-3 líneas
   - 5-8 palabras por línea

2. **Contraste**
   - Siempre usar overlay
   - Texto blanco sobre oscuro

3. **Tamaños**
   - Mobile: Reducir a text-2xl o text-3xl
   - Desktop: Hasta text-6xl o text-7xl

---

## 🔧 Personalización Avanzada

### Cambiar Posición del Contenido

Modificar en el código:

```tsx
// Arriba
<div className="absolute inset-0 flex flex-col items-center justify-start pt-20">

// Abajo
<div className="absolute inset-0 flex flex-col items-center justify-end pb-20">

// Izquierda
<div className="absolute inset-0 flex flex-col items-start justify-center pl-20">
```

### Agregar Botón

```tsx
{/* Después del título */}
<div className="mt-8">
  <button className="bg-amber-500 text-white px-8 py-3 rounded-lg">
    Descubrir más
  </button>
</div>
```

### Animaciones al Scroll

```tsx
// Instalar: npm install framer-motion
import { motion } from 'framer-motion';

<motion.h2
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  {renderTitle()}
</motion.h2>
```

---

## ♿ Accesibilidad

✅ Contraste adecuado con overlay
✅ Tamaños de texto legibles
✅ Estructura semántica (h2)
✅ Responsive en todos los dispositivos

---

## 🎯 Integración en Landing Page

### Estructura Típica

```astro
---
import HeroMiradorDeLuz from '../components/react/HeroMiradorDeLuz';
import SectionUbicacionMiradorDeLuz from '../components/react/SectionUbicacionMiradorDeLuz';
import SectionHeroIntermedioMiradorDeLuz from '../components/react/SectionHeroIntermedioMiradorDeLuz';
---

<Layout>
  <!-- Hero principal -->
  <HeroMiradorDeLuz client:load />
  
  <!-- Sobre nosotros -->
  <SectionUbicacionMiradorDeLuz client:load />
  
  <!-- Hero intermedio -->
  <SectionHeroIntermedioMiradorDeLuz 
    client:load
    title="Experiencias únicas.\nRecuerdos eternos."
  />
  
  <!-- Cabañas -->
  <section id="cabanas">...</section>
  
  <!-- Hero intermedio -->
  <SectionHeroIntermedioMiradorDeLuz 
    client:load
    backgroundImage="/images/otra-vista.jpg"
    title="Todo listo para vos.\nSolo traé las ganas."
  />
  
  <!-- Contacto -->
  <section>...</section>
</Layout>
```

---

## 🐛 Troubleshooting

### La imagen no se ve

**Solución:**
```tsx
// Usar rutas absolutas:
backgroundImage="/images/hero.jpg"  // En public/images/

// O URLs completas:
backgroundImage="https://..."
```

### El texto no se lee bien

**Solución:**
```tsx
// Aumentar opacidad del overlay:
overlayOpacity="darker"

// O agregar sombra al texto (en el código):
className="text-shadow-lg"
```

### El título no hace salto de línea

**Solución:**
```tsx
// Usar \n en el string:
title="Primera línea.\nSegunda línea."

// NO usar <br/> directamente
```

---

## 📊 Performance

- ✅ **Imagen optimizada**: Usa WebP cuando sea posible
- ✅ **Lazy loading**: Considerar para héroes más abajo en la página
- ✅ **CSS puro**: Solo Tailwind, sin JS innecesario

---

## 🎨 Variantes Creativas

### Con Gradiente en lugar de Imagen

```tsx
// En lugar de backgroundImage, usar:
style={{ 
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
}}
```

### Con Video de Fondo

```tsx
<video 
  autoPlay 
  loop 
  muted 
  className="absolute inset-0 w-full h-full object-cover"
>
  <source src="/videos/montanas.mp4" type="video/mp4" />
</video>
```

---

**Última actualización**: 19/11/2024  
**Versión**: 1.0.0

