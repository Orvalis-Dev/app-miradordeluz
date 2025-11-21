# 📍 Section Ubicación Mirador de Luz - Documentación

## Componente de Presentación del Lugar

Sección elegante de dos columnas para presentar la ubicación y características del complejo de cabañas.

---

## 📦 Ubicación del Archivo

```
src/components/react/SectionUbicacionMiradorDeLuz.tsx
```

---

## 🚀 Uso Básico

### En una página Astro:

```astro
---
import Layout from '../layouts/Layout.astro';
import SectionUbicacionMiradorDeLuz from '../components/react/SectionUbicacionMiradorDeLuz';
---

<Layout title="Nosotros">
  <SectionUbicacionMiradorDeLuz client:load />
</Layout>
```

### Ver ejemplo completo:

```
http://localhost:4321/ejemplo-ubicacion
```

---

## ⚙️ Props Configurables

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `etiqueta` | string | "MIRADOR DE LUZ..." | Etiqueta superior pequeña |
| `titulo` | string | "Ubicado entre..." | Título principal H2 |
| `parrafos` | array | [...] | Array de objetos con texto y destacados |
| `fraseDestacada` | string | "¡Te esperamos..." | Frase final en negrita |
| `imagenPrincipal` | string | URL Unsplash | URL imagen grande |
| `imagenSecundaria` | string | URL Unsplash | URL imagen superpuesta |
| `fondoColor` | string | gradient | Clases Tailwind para fondo |

---

## 📝 Estructura de Props Detallada

### Párrafos con Destacados

```typescript
parrafos={[
  {
    texto: 'Un complejo con una ubicación privilegiada...',
    destacados: ['ubicación privilegiada']  // Palabras a resaltar en amarillo
  },
  {
    texto: 'Contamos con todas las comodidades...',
    destacados: ['todas las comodidades']
  }
]}
```

Las palabras en `destacados` se mostrarán en **color amarillo** (`text-amber-600`) y en **negrita**.

---

## 🎨 Características del Diseño

### Columna Izquierda (Texto)

✅ **Etiqueta superior**
- Mayúsculas con tracking amplio
- Color amarillo/naranja (`text-amber-600`)
- Tamaño pequeño

✅ **Título principal**
- Muy grande y bold (text-4xl → text-6xl)
- Color gris oscuro (`text-gray-900`)
- Responsive

✅ **Párrafos descriptivos**
- 2-3 párrafos con line-height cómodo
- Palabras destacadas en amarillo automáticamente
- Tamaño responsive

✅ **Frase final**
- En negrita (`font-bold`)
- Separada con padding superior

### Columna Derecha (Imágenes)

✅ **Imagen principal**
- Ocupa 85-90% del ancho
- Posicionada arriba-derecha
- Bordes redondeados
- Sombra elegante

✅ **Imagen secundaria (superpuesta)**
- Ocupa 65-70% del ancho
- Posicionada abajo-izquierda
- **Borde blanco grueso** (4px)
- **Sombra marcada** (shadow-2xl)
- Efecto hover con scale

✅ **Decoraciones**
- Círculos difuminados de fondo
- Colores sutiles amarillo/verde
- Profundidad visual

---

## 📱 Responsividad

### Desktop (> 1024px)
```
┌──────────────┬──────────────┐
│   TEXTO      │   IMÁGENES   │
│              │  ┌────────┐  │
│   Etiqueta   │  │ Grande │  │
│   Título     │  │        │  │
│   Párrafos   │  └────────┘  │
│   Frase      │   ┌──────┐   │
│              │   │Pequeña│   │
└──────────────┴───└──────┘───┘
```

### Mobile (< 1024px)
```
┌──────────────┐
│   TEXTO      │
│   Etiqueta   │
│   Título     │
│   Párrafos   │
│   Frase      │
└──────────────┘
┌──────────────┐
│  ┌────────┐  │
│  │ Grande │  │
│  │        │  │
│  └────────┘  │
│   ┌──────┐   │
│   │Pequeña│   │
│   └──────┘   │
└──────────────┘
```

---

## 🎨 Paleta de Colores

### Fondo
```css
bg-gradient-to-br from-amber-50/30 via-orange-50/20 to-stone-50
```
Degradado muy sutil: beige → naranja claro → piedra

### Texto
- **Etiqueta**: `text-amber-600` (naranja/amarillo)
- **Título**: `text-gray-900` (gris muy oscuro)
- **Párrafos**: `text-gray-700` (gris medio)
- **Destacados**: `text-amber-600 font-semibold` (amarillo bold)

### Imágenes
- **Borde**: `border-white border-4`
- **Sombras**: `shadow-xl` y `shadow-2xl`

---

## 💡 Ejemplos de Uso

### Ejemplo 1: Uso Básico (Default)

```tsx
<SectionUbicacionMiradorDeLuz client:load />
```

### Ejemplo 2: Personalizado Completo

```tsx
<SectionUbicacionMiradorDeLuz 
  client:load
  etiqueta="MIRADOR DE LUZ – VILLA CARLOS PAZ"
  titulo="Tu refugio en las sierras, cerca de todo."
  parrafos={[
    {
      texto: 'Un complejo moderno con una ubicación privilegiada en el corazón de las sierras. Estamos a minutos de todo: el lago San Roque, el centro de la ciudad y los mejores miradores.',
      destacados: ['ubicación privilegiada', 'corazón de las sierras']
    },
    {
      texto: 'Nuestras cabañas totalmente equipadas cuentan con todas las comodidades: cocina completa, WiFi, TV por cable, parrilla, piscina y estacionamiento privado.',
      destacados: ['cabañas totalmente equipadas', 'todas las comodidades']
    },
    {
      texto: 'Ofrecemos servicios de desayuno artesanal, room service, espacios para eventos y un equipo disponible las 24 horas para hacer tu estadía perfecta.'
    }
  ]}
  fraseDestacada="¡Vení a vivir la experiencia Mirador de Luz!"
  imagenPrincipal="/images/complejo-vista.jpg"
  imagenSecundaria="/images/cabana-interior.jpg"
  fondoColor="bg-gradient-to-br from-emerald-50/20 via-teal-50/10 to-stone-50"
/>
```

### Ejemplo 3: Solo con Texto Personalizado

```tsx
<SectionUbicacionMiradorDeLuz 
  client:load
  titulo="Naturaleza, confort y tranquilidad."
  parrafos={[
    {
      texto: 'Desconectá de la rutina en nuestro refugio de montaña.',
      destacados: ['refugio de montaña']
    }
  ]}
  fraseDestacada="Tu lugar ideal para descansar."
/>
```

---

## 🔧 Personalización Avanzada

### Cambiar el Fondo

```tsx
// Beige cálido
fondoColor="bg-amber-50"

// Verde natural
fondoColor="bg-emerald-50"

// Degradado personalizado
fondoColor="bg-gradient-to-r from-yellow-50 to-orange-50"

// Imagen de fondo
fondoColor="bg-[url('/images/texture.png')] bg-cover"
```

### Modificar Tamaños de Imágenes

En el código del componente:

```tsx
{/* Imagen principal más grande */}
<div className="absolute top-0 right-0 w-[95%] h-[80%]">

{/* Imagen secundaria más pequeña */}
<div className="absolute bottom-0 left-0 w-[60%] h-[45%]">
```

### Cambiar Colores de Destacados

```tsx
// En el return del highlightText:
<span className="text-emerald-600 font-semibold">
  {fragmento}
</span>

// O crear una prop:
colorDestacado?: string;
// Usar: className={`${colorDestacado} font-semibold`}
```

---

## 🎯 Función de Resaltado Automático

El componente incluye una función `highlightText()` que automáticamente resalta palabras específicas:

```typescript
const highlightText = (texto: string, destacados: string[] = []) => {
  // Busca cada palabra en 'destacados'
  // La reemplaza con un <span> amarillo y bold
  // Retorna el texto con JSX mixto
}
```

**Ejemplo:**
```typescript
texto: 'Un lugar con ubicación privilegiada'
destacados: ['ubicación privilegiada']

Resultado:
"Un lugar con <span className='text-amber-600 font-semibold'>ubicación privilegiada</span>"
```

---

## ♿ Accesibilidad

✅ Estructura semántica con `<section>` y `<h2>`
✅ Alt text en imágenes
✅ Contraste de colores adecuado
✅ Tamaños de texto legibles
✅ Line-height cómodo para lectura

---

## 🖼️ Imágenes Recomendadas

### Imagen Principal
- **Resolución**: 800x600px mínimo
- **Aspecto**: Horizontal (4:3 o 16:9)
- **Contenido**: Vista amplia del complejo, paisaje, exterior

### Imagen Secundaria
- **Resolución**: 600x450px mínimo
- **Aspecto**: Horizontal
- **Contenido**: Detalle de cabaña, interior, amenity

### Ejemplos de URLs:
```
Unsplash (gratuitas):
- Complejo: https://images.unsplash.com/photo-1587061949409-02df41d5e562
- Cabaña: https://images.unsplash.com/photo-1542718610-a1d656d1884c
- Naturaleza: https://images.unsplash.com/photo-1506905925346-21bda4d32df4
```

---

## 🎨 Variantes de Diseño

### Variante 1: Fondo con Textura

```tsx
fondoColor="bg-stone-100"
// + agregar en el contenedor:
style={{ 
  backgroundImage: `url('/images/paper-texture.jpg')`,
  backgroundSize: 'cover'
}}
```

### Variante 2: Sin Degradado

```tsx
fondoColor="bg-amber-50"
```

### Variante 3: Más Verde (Natural)

```tsx
fondoColor="bg-gradient-to-br from-emerald-50/40 via-teal-50/30 to-stone-50"
```

---

## 🐛 Troubleshooting

### Las imágenes no se ven

**Problema**: URLs incorrectas o CORS

**Solución**:
```tsx
// Usar imágenes locales:
imagenPrincipal="/images/principal.jpg"  // en public/images/

// O URLs públicas completas:
imagenPrincipal="https://..."
```

### Los destacados no funcionan

**Problema**: Palabras no coinciden exactamente

**Solución**:
```tsx
// Asegúrate de que coincidan:
texto: 'ubicación privilegiada'
destacados: ['ubicación privilegiada']  // ✅ Correcto

destacados: ['ubicacion']  // ❌ No coincide
```

### El layout se rompe en mobile

**Problema**: Imágenes muy grandes

**Solución**:
```tsx
// En el código, usar tamaños relativos:
className="w-[85%] h-[75%]"  // ✅ Porcentajes
className="w-[600px]"          // ❌ Píxeles fijos
```

---

## 🚀 Integración en la Landing Page

### Opción 1: Después del Hero

```astro
---
import HeroMiradorDeLuz from '../components/react/HeroMiradorDeLuz';
import SectionUbicacionMiradorDeLuz from '../components/react/SectionUbicacionMiradorDeLuz';
---

<HeroMiradorDeLuz client:load />
<SectionUbicacionMiradorDeLuz client:load />
```

### Opción 2: En página "Nosotros"

```astro
---
// src/pages/nosotros.astro
import SectionUbicacionMiradorDeLuz from '../components/react/SectionUbicacionMiradorDeLuz';
---

<Layout title="Sobre Nosotros">
  <SectionUbicacionMiradorDeLuz client:load />
  <!-- Más secciones -->
</Layout>
```

---

## 📊 Performance

- ✅ **Lazy loading**: Imágenes con loading="lazy" (agregar si necesario)
- ✅ **Optimización**: Usar WebP para imágenes
- ✅ **CSS**: Solo Tailwind utilities (no CSS adicional)
- ✅ **JS**: Mínimo JavaScript, solo React para interactividad

---

## 📚 Recursos Adicionales

### Bancos de Imágenes Gratuitas

- [Unsplash - Cabañas](https://unsplash.com/s/photos/cabin)
- [Pexels - Montañas](https://www.pexels.com/search/mountain-cabin/)
- [Pixabay - Naturaleza](https://pixabay.com/images/search/cabin-nature/)

### Búsquedas Recomendadas
- "mountain cabin exterior"
- "wooden house nature"
- "cozy cabin interior"
- "cabin forest view"

---

## ✨ Próximas Mejoras

Ideas para extender el componente:

- [ ] Animaciones al scroll (Framer Motion)
- [ ] Lightbox para ampliar imágenes
- [ ] Galería con más de 2 imágenes
- [ ] Video en lugar de imagen principal
- [ ] Parallax effect en imágenes
- [ ] Carrusel de testimonios

---

**Última actualización**: 19/11/2024  
**Versión**: 1.0.0

