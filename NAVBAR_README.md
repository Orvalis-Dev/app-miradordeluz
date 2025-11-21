# Navbar Fijo - NavbarMiradorDeLuz

Navbar estático y responsive que permanece visible durante todo el scroll con cambio de colores adaptativo según la sección.

---

## 🎯 Características

✅ **Fixed Position** - Permanece en la parte superior durante el scroll  
✅ **Colores Adaptativos** - Cambia de color según el fondo de cada sección  
✅ **Detección de Scroll** - Detecta automáticamente la sección visible  
✅ **Efecto Transparente** - Fondo transparente al inicio del hero  
✅ **Backdrop Blur** - Efecto de desenfoque de fondo  
✅ **Smooth Transition** - Transición suave de 500ms entre estados  
✅ **Responsive** - Diseño adaptado para móvil y desktop  
✅ **Menú Hamburguesa** - Drawer lateral que se desliza desde la derecha  
✅ **Overlay Oscuro** - Backdrop semitransparente cuando el menú está abierto  
✅ **Selector de Idioma** - Toggle ESP/ENG  
✅ **Redes Sociales** - Instagram, WhatsApp, Ubicación (desktop)  
✅ **Botón CTA** - Botón destacado de Reservas  
✅ **Prevención de Scroll** - Bloquea el scroll del body cuando el menú está abierto

---

## 📦 Instalación

El componente ya está incluido en el proyecto:

```tsx
src/components/react/NavbarMiradorDeLuz.tsx
```

---

## 🎨 Uso Básico

### En index.astro

```astro
---
import NavbarMiradorDeLuz from "../components/react/NavbarMiradorDeLuz";
---

<Layout title="Mi Página">
  <!-- Navbar fijo con efecto transparente -->
  <NavbarMiradorDeLuz client:load transparente={true} />
  
  <!-- Resto del contenido -->
  <main>
    <!-- ... -->
  </main>
</Layout>
```

---

## ⚙️ Props

### `transparente` (boolean, opcional)

Controla si el navbar comienza transparente y se vuelve sólido al hacer scroll.

```astro
<!-- Con efecto transparente (recomendado para Hero fullscreen) -->
<NavbarMiradorDeLuz client:load transparente={true} />

<!-- Siempre con fondo sólido -->
<NavbarMiradorDeLuz client:load transparente={false} />

<!-- Por defecto: sin efecto transparente -->
<NavbarMiradorDeLuz client:load />
```

---

## 🎭 Comportamiento

### Cambio de Colores por Sección

El navbar detecta automáticamente qué sección está visible y cambia sus colores para adaptarse al fondo:

#### 🏔️ Hero Section (Fondo Oscuro)
```
Navbar: Transparente → Negro semi-transparente
Texto: Blanco
Hover: Ámbar
Iconos: Fondo blanco semi-transparente
```

#### 📍 Ubicación Section (Fondo Blanco)
```
Navbar: Blanco semi-transparente con blur
Texto: Gris oscuro
Hover: Ámbar oscuro
Iconos: Fondo gris claro
```

#### 🎥 Hero Intermedio (Fondo Video Oscuro)
```
Navbar: Negro semi-transparente con blur
Texto: Blanco
Hover: Ámbar
Iconos: Fondo blanco semi-transparente
```

#### 🏠 Cabañas Section (Fondo Blanco)
```
Navbar: Blanco semi-transparente con blur
Texto: Gris oscuro
Hover: Ámbar oscuro
Iconos: Fondo gris claro
```

#### ⭐ Testimonios Section (Fondo Stone)
```
Navbar: Stone claro con blur
Texto: Gris oscuro
Hover: Ámbar oscuro
Iconos: Fondo gris claro
```

### Transiciones

- **Duración**: 500ms
- **Easing**: ease-in-out (por defecto de Tailwind)
- **Propiedades animadas**: background, color, border

---

## 🎨 Configuración de Colores

### Estructura de Estilos por Sección

```typescript
const estilosPorSeccion: Record<string, SeccionEstilo> = {
  'hero-section': {
    background: 'bg-transparent', // o bg-black/80 después de scroll
    textColor: 'text-white',
    hoverColor: 'hover:text-amber-300',
    logoColor: 'text-white',
    socialBg: 'bg-white/10 hover:bg-white/20',
    buttonGradient: 'from-amber-500 to-orange-500',
  },
  'ubicacion-section': {
    background: 'bg-white/90 backdrop-blur-md shadow-md',
    textColor: 'text-gray-800',
    hoverColor: 'hover:text-amber-600',
    logoColor: 'text-gray-900',
    socialBg: 'bg-gray-200 hover:bg-gray-300',
    buttonGradient: 'from-amber-500 to-orange-500',
  },
  // ... más secciones
};
```

### Personalizar Colores

Para cambiar los colores de una sección, edita el objeto `estilosPorSeccion` en `NavbarMiradorDeLuz.tsx`:

```typescript
'tu-seccion-id': {
  background: 'bg-tu-color/90 backdrop-blur-md',
  textColor: 'text-tu-texto',
  hoverColor: 'hover:text-tu-hover',
  logoColor: 'text-tu-logo',
  socialBg: 'bg-tu-bg hover:bg-tu-hover-bg',
  buttonGradient: 'from-color1 to-color2',
},
```

---

## 🔍 Detección de Secciones

### getBoundingClientRect (Scroll Detection)

El navbar usa **getBoundingClientRect()** para detectar qué sección está más cerca del navbar en tiempo real:

```typescript
const handleScroll = () => {
  // Para cada sección, calcula la distancia al navbar
  const rect = elemento.getBoundingClientRect();
  const distancia = Math.abs(rect.top - 80); // 80px = altura del navbar
  
  // Encuentra la sección más cercana que esté visible
  if (rect.top < window.innerHeight && rect.bottom > 80) {
    // Esta sección está visible
  }
};
```

**Ventajas sobre Intersection Observer:**
- ✅ Funciona perfectamente al hacer scroll hacia arriba
- ✅ Funciona perfectamente al hacer scroll hacia abajo
- ✅ Detecta siempre la sección más cercana al navbar
- ✅ Sin comportamientos extraños en los límites entre secciones

**Cómo funciona:**
1. En cada scroll, revisa todas las secciones
2. Calcula qué sección está más cerca de la posición 80px (debajo del navbar)
3. Solo considera secciones que están visibles en viewport
4. Actualiza los colores del navbar para esa sección

### Secciones Detectadas

El navbar detecta automáticamente estas secciones:

```typescript
const secciones = [
  'hero-section',
  'ubicacion-section',
  'hero-intermedio-section',
  'cabanas-section',
  'testimonios',
];
```

**Importante:** Tus secciones deben tener estos IDs para que el navbar las detecte correctamente.

---

## 🍔 Menú Hamburguesa (Drawer/Sidebar)

### Características del Menú Lateral

El navbar ahora incluye un **menú hamburguesa** que abre un drawer lateral desde la derecha:

#### Estructura del Menú:

```
┌─────────────────────────────┐
│  🏔️ Mirador de Luz      [X] │  ← Header con logo y botón cerrar
├─────────────────────────────┤
│                             │
│  HOME                       │  ← Links de navegación
│  CABAÑAS              →     │
│  SERVICIOS                  │
│  GALERÍA                    │
│  TESTIMONIOS                │
│  UBICACIÓN                  │
│  CONTACTO                   │
│                             │
├─────────────────────────────┤
│  Idioma: ESP                │  ← Footer con info de contacto
│                             │
│  Consultas y Reservas       │
│  📞 +54 (351) 448-6700     │
│                             │
│  WhatsApp                   │
│  💬 +54 351 836-2211       │
└─────────────────────────────┘
```

### Comportamiento del Menú:

1. **Al hacer click en el menú hamburguesa:**
   - El drawer se desliza desde la derecha
   - Aparece un overlay oscuro detrás
   - El scroll del body se bloquea

2. **Para cerrar el menú:**
   - Click en el botón X del header
   - Click en el overlay oscuro
   - Click en cualquier link de navegación

3. **Animaciones:**
   - Transición suave de 300ms
   - Transform translate-x para el deslizamiento
   - Fade-in/out del overlay

### Links en el Menú Lateral

```tsx
// Links principales
HOME → /
CABAÑAS → #cabanas (con flecha →)
SERVICIOS → #servicios
GALERÍA → #galeria
TESTIMONIOS → #testimonios
UBICACIÓN → #ubicacion
CONTACTO → /contacto

// Footer del menú
Teléfono: +54 (351) 448-6700
WhatsApp: +54 351 836-2211
```

### IDs Requeridos

Para que los links internos funcionen, asegúrate de tener estos IDs en tu página:

```astro
<div id="cabanas">...</div>
<div id="servicios">...</div>
<div id="galeria">...</div>
<div id="testimonios">...</div>
<div id="ubicacion">...</div>
```

---

## 🎨 Personalización

### Cambiar Colores

Edita el componente `NavbarMiradorDeLuz.tsx`:

```tsx
// Color del fondo al scrollear
className="bg-black/80 backdrop-blur-md"
// Cambiar a:
className="bg-slate-900/90 backdrop-blur-md"

// Color hover de los links
className="hover:text-amber-300"
// Cambiar a:
className="hover:text-blue-400"
```

### Cambiar Logo

```tsx
<a href="/" className="...">
  🏔️ Mirador de Luz
</a>
```

Reemplazar con imagen:

```tsx
<a href="/" className="...">
  <img src="/images/logo.svg" alt="Mirador de Luz" className="h-8" />
</a>
```

### Cambiar Punto de Activación del Scroll

```tsx
// En useEffect
setScrolled(window.scrollY > 50);  // Activa después de 50px

// Cambiar a 100px
setScrolled(window.scrollY > 100);
```

---

## 🔄 Integración con Hero

### Opción 1: Hero sin Navbar Interno (Recomendado)

```astro
<!-- Navbar fijo global -->
<NavbarMiradorDeLuz client:load transparente={true} />

<!-- Hero sin navbar interno -->
<HeroMiradorDeLuz client:load mostrarNavbar={false} />
```

### Opción 2: Hero con Navbar Interno

```astro
<!-- No usar NavbarMiradorDeLuz -->

<!-- Hero incluye su propio navbar -->
<HeroMiradorDeLuz client:load mostrarNavbar={true} />
```

---

## 📱 Responsive

### Desktop

- Logo a la izquierda
- Selector de idioma (ENG/ESP)
- Botón de Reservas
- Iconos sociales (Instagram, WhatsApp, Ubicación)
- Menú hamburguesa

### Mobile

- Logo a la izquierda
- Selector de idioma compacto
- Botón de Reservas compacto
- Menú hamburguesa
- Sin iconos sociales (se muestran en el footer del menú lateral)

---

## 🎯 Z-Index

El navbar tiene `z-50` para asegurar que siempre esté por encima del contenido:

```tsx
className="fixed top-0 left-0 right-0 z-50"
```

Jerarquía de z-index:

```
Navbar: z-50 (siempre arriba)
Hero: z-10
Secciones: z-1 a z-11
```

---

## ⚡ Performance

### Hidratación

```astro
<NavbarMiradorDeLuz client:load />
```

- **`client:load`**: Necesario porque incluye estado (scroll listener)
- No es pesado, carga rápido

### Optimizaciones

✅ Listener de scroll con cleanup  
✅ Solo actualiza estado cuando cambia (> 50px)  
✅ Transiciones CSS (no JS)  
✅ No re-renderiza innecesariamente

---

## 🎨 Estilo Visual

### Estados del Navbar

#### Transparente (inicial)

```
┌────────────────────────────────────────────┐
│ 🏔️ Mirador    Cabañas  Contacto  [Reservas]│  ← Transparente
└────────────────────────────────────────────┘
```

#### Sólido (después de scroll)

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 🏔️ Mirador    Cabañas  Contacto  [Reservas]┃  ← Negro blur + sombra
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## 🐛 Troubleshooting

### El navbar no cambia de color

**Solución:**
- Verificar que las secciones tengan los IDs correctos:
  - `hero-section`
  - `ubicacion-section`
  - `hero-intermedio-section`
  - `cabanas-section`
  - `testimonios`
- Revisar console por errores
- Verificar que las secciones tengan suficiente altura para ser detectadas

### El navbar tiene colores incorrectos al hacer scroll hacia arriba

**Problema resuelto en v2.1.0:**
- Anteriormente usaba Intersection Observer que no detectaba bien al scrollear hacia arriba
- Ahora usa `getBoundingClientRect()` que detecta la sección más cercana al navbar
- Funciona perfectamente en ambas direcciones de scroll

### El menú lateral no se abre

**Solución:**
- Verificar que el componente tiene `client:load` en Astro
- Revisar console por errores de JavaScript
- Verificar que el z-index del menú (70) y overlay (60) son mayores que otros elementos

### El scroll del body no se bloquea cuando el menú está abierto

**Ya está implementado:**
- El navbar automáticamente agrega `overflow: hidden` al body cuando el menú se abre
- Se restaura al cerrar el menú

### Los links internos no funcionan

**Solución:**
- Verificar que los IDs existen en la página (`#cabanas`, `#testimonios`, etc.)
- Agregar scroll-behavior en CSS global:

```css
html {
  scroll-behavior: smooth;
}
```

### El navbar cubre contenido

**Solución:**
- Agregar padding-top al contenido principal:

```astro
<main class="pt-20">
  <!-- Contenido -->
</main>
```

---

## 🚀 Mejoras Futuras

Ideas para extender el navbar:

- [x] ✅ Menú lateral drawer (implementado)
- [x] ✅ Cambio de color según sección activa (implementado)
- [x] ✅ Prevención de scroll al abrir menú (implementado)
- [ ] Submenu expandible para "CABAÑAS"
- [ ] Indicador de progreso de scroll
- [ ] Animación de entrada al cargar la página
- [ ] Búsqueda integrada en el menú lateral
- [ ] Notificaciones badge en iconos
- [ ] Indicador visual de sección activa en los links del menú
- [ ] Animación del icono hamburguesa (transform a X)

---

## 📚 Ejemplos

### Ejemplo 1: Landing Page

```astro
<NavbarMiradorDeLuz client:load transparente={true} />
<HeroMiradorDeLuz client:load mostrarNavbar={false} />
<SectionCabanasMiradorDeLuz client:visible />
```

### Ejemplo 2: Página Interna

```astro
<NavbarMiradorDeLuz client:load transparente={false} />
<main class="pt-20">
  <h1>Contenido de página</h1>
</main>
```

### Ejemplo 3: Sin Navbar Fijo

```astro
<!-- No incluir NavbarMiradorDeLuz -->
<HeroMiradorDeLuz client:load mostrarNavbar={true} />
```

---

## ✨ CSS Adicional (Opcional)

Para scroll suave a secciones, agregar en `global.css`:

```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px; /* Altura del navbar */
}

/* Ajuste para mobile */
@media (max-width: 768px) {
  html {
    scroll-padding-top: 64px;
  }
}
```

---

**Última actualización:** 20/11/2024  
**Versión:** 3.0.0 (menú hamburguesa lateral)

---

## 📝 Changelog

### v3.0.0 (20/11/2024)
- ✅ Menú hamburguesa con drawer lateral (desliza desde la derecha)
- ✅ Eliminados links del navbar principal
- ✅ Overlay oscuro al abrir menú
- ✅ Prevención de scroll del body cuando el menú está abierto
- ✅ Footer en el menú con información de contacto
- ✅ Animación suave de entrada/salida (300ms)
- ✅ Cierre del menú al hacer click en links o overlay
- ✅ Diseño responsive idéntico en mobile y desktop

### v2.1.0 (20/11/2024)
- ✅ Reemplazado Intersection Observer por getBoundingClientRect
- ✅ Corregido comportamiento al hacer scroll hacia arriba
- ✅ Detección más precisa de la sección activa
- ✅ Sin superposiciones ni colores incorrectos

### v2.0.0 (20/11/2024)
- ✅ Colores adaptativos según sección de fondo
- ✅ 5 esquemas de colores predefinidos
- ✅ Transiciones suaves de 500ms

### v1.0.0 (20/11/2024)
- ✅ Navbar fijo con efecto transparente
- ✅ Responsive design
- ✅ Links de navegación con scroll suave

