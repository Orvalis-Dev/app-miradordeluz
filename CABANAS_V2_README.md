# SectionCabanasMiradorDeLuzV2

Componente React rediseñado para mostrar las cabañas del complejo con un diseño premium inspirado en hoteles boutique.

---

## 🎨 Diseño

Basado en las imágenes de referencia de Y111 Hotel Córdoba, este componente presenta:

- **Layout Premium**: Imagen grande a la izquierda + Card blanca superpuesta a la derecha
- **Navegación Intuitiva**: Dots verticales sobre la imagen + Flechas opcionales
- **Animaciones Suaves**: Transiciones de 500ms entre cabañas
- **Responsive**: Se adapta perfectamente a mobile, tablet y desktop

---

## 📐 Estructura Visual

### Desktop (lg+)

```
┌────────────────────────────────────────────────────────┐
│                   MIRADOR DE LUZ                       │
│              Nuestras Cabañas                          │
│     Descubre el lugar perfecto para tu escapada...    │
│                                                        │
│  ┌──────────────┐  ┌────────────────────────┐        │
│  │              │  │  Card Blanca Flotante  │        │
│  │              │  │  ┌──────────────────┐  │        │
│  │   Imagen     │  │  │ HASTA 4 PERSONAS │  │        │
│  │   Grande     │  │  │ Cabaña Mirador   │  │        │
│  │   60%        │  │  │                  │  │        │
│  │              │  │  │ Descripción...   │  │        │
│  │   • • • •    │  │  │                  │  │        │
│  │   Dots       │  │  │ 🛏️ Amenity 1    │  │        │
│  │              │  │  │ 📺 Amenity 2    │  │        │
│  │              │  │  │ 🏔️ Amenity 3    │  │        │
│  │              │  │  │                  │  │        │
│  │              │  │  │ [Reservar →]    │  │        │
│  └──────────────┘  └────────────────────────┘        │
│                                                        │
│         ←  [Mirador] [Bosque] [Premium] [Familiar]  → │
└────────────────────────────────────────────────────────┘
```

### Mobile

```
┌──────────────────────┐
│  MIRADOR DE LUZ      │
│  Nuestras Cabañas    │
│  Descripción...      │
├──────────────────────┤
│                      │
│   Imagen Grande      │
│                      │
│   • • • •            │
│   Dots               │
│                      │
└──────────────────────┘
┌──────────────────────┐
│  Card Blanca         │
│  ┌────────────────┐  │
│  │ HASTA 4 PERS.  │  │
│  │ Cabaña Mirador │  │
│  │                │  │
│  │ Descripción... │  │
│  │                │  │
│  │ 🛏️ Amenity 1   │  │
│  │ 📺 Amenity 2   │  │
│  │                │  │
│  │ [Reservar →]   │  │
│  └────────────────┘  │
└──────────────────────┘
```

---

## 🎯 Características Principales

### 0. Header con Título

- **Etiqueta superior**: "MIRADOR DE LUZ"
  - Color ámbar, uppercase, tracking amplio
  - Text-xs → sm responsive

- **Título principal**: "Nuestras Cabañas"
  - Text-3xl → 5xl responsive
  - Font-bold, color gray-900
  - Centrado

- **Descripción**:
  - Texto descriptivo centrado
  - Max-width: 2xl
  - Color gray-600
  - Leading relaxed

### 1. Imagen con Dots de Navegación

- **Imagen a pantalla completa** en su contenedor
- **Altura adaptativa**:
  - Mobile: 380px
  - Tablet: 420px
  - Desktop: 520px
- **Dots verticales** en el lado izquierdo:
  - Posición: `left-6 top-1/2`
  - Activo: Color ámbar con ring
  - Inactivo: Blanco semi-transparente
  - Hover: Blanco opaco

### 2. Card Blanca Flotante

En desktop:
- **Superposición**: `-ml-16` para flotar sobre la imagen
- **Fondo**: Blanco con `shadow-xl`
- **Padding**: `p-6 md:p-8`
- **Bordes**: `rounded-2xl`

En mobile:
- Sin superposición
- Bordes rectos en la parte superior
- Card debajo de la imagen

### 3. Contenido de la Card

#### Etiqueta Superior
```tsx
<span className="text-amber-600 tracking-[0.2em] uppercase">
  HASTA 4 PERSONAS
</span>
```

#### Título de la Cabaña
```tsx
<h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">
  Cabaña Mirador
</h3>
```

#### Descripción
```tsx
<p className="text-gray-700 leading-relaxed">
  La habitación más amplia del complejo...
</p>
```

#### Amenities (Lista de características)
```tsx
<div className="grid grid-cols-1 gap-3">
  {amenities.map(amenity => (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-amber-50">
        {amenity.icon}
      </div>
      <span>{amenity.label}</span>
    </div>
  ))}
</div>
```

#### Botón Reservar
```tsx
<button className="bg-gradient-to-r from-amber-600 to-amber-700 
                   text-white px-6 py-3 rounded-full">
  <span>Reservar</span>
  <span className="w-8 h-8 rounded-full bg-white/20">
    <ArrowRightIcon />
  </span>
</button>
```

### 4. Navegación Entre Cabañas

**Dots sobre la imagen:**
- Click en un dot → Cambia a esa cabaña
- Animación de transición

**Flechas (solo desktop):**
- Flechas izquierda/derecha debajo de la card
- Botones con nombres de las cabañas entre las flechas

**Animaciones:**
```typescript
// Imagen: opacity 0 → 1, translateX
className={`transition-all duration-500 ${
  isTransitioning ? 'opacity-0 translate-x-5' : 'opacity-100 translate-x-0'
}`}

// Card: opacity 0 → 1, translateY
className={`transition-all duration-500 ${
  isTransitioning ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
}`}
```

---

## 🔧 Props del Componente

```typescript
interface SectionCabanasMiradorDeLuzV2Props {
  cabanas?: Cabana[];
  onReservar?: (cabanaId: string) => void;
}

type Cabana = {
  id: string;
  nombre: string;
  etiqueta: string; // "HASTA 4 PERSONAS", "TAMAÑO 60M²"
  descripcion: string;
  amenities: Amenity[];
  imagenUrl: string;
};

type Amenity = {
  icon: ReactNode;
  label: string;
};
```

---

## 📦 Uso

### Uso Básico

```astro
---
import SectionCabanasMiradorDeLuzV2 from '../components/react/SectionCabanasMiradorDeLuzV2';
---

<SectionCabanasMiradorDeLuzV2 client:visible />
```

### Con Datos Personalizados

```astro
---
import SectionCabanasMiradorDeLuzV2 from '../components/react/SectionCabanasMiradorDeLuzV2';

const misCabanas = [
  {
    id: '1',
    nombre: 'Cabaña Deluxe',
    etiqueta: 'HASTA 6 PERSONAS',
    descripcion: 'La cabaña más espaciosa...',
    amenities: [
      { icon: <BedIcon />, label: '3 Dormitorios' },
      { icon: <TvIcon />, label: 'Smart TV 55"' },
    ],
    imagenUrl: '/images/cabanas/deluxe.jpg',
  },
  // ... más cabañas
];
---

<SectionCabanasMiradorDeLuzV2 
  client:visible 
  cabanas={misCabanas}
  onReservar={(id) => console.log('Reservar cabaña:', id)}
/>
```

---

## 🎨 Personalización de Colores

### Colores de Acento

El componente usa una paleta de colores cálidos:

```typescript
// Color principal (etiquetas, dots activos, botón)
text-amber-600
bg-amber-600
from-amber-600 to-amber-700

// Fondo suave para iconos
bg-amber-50

// Rings y halos
ring-amber-500/30
```

Para cambiar el color de acento, buscar y reemplazar:
- `amber-600` → `emerald-600` (verde)
- `amber-700` → `emerald-700`
- `amber-50` → `emerald-50`

### Fondo de la Sección

```tsx
className="bg-stone-50" // Beige muy suave
```

Alternativas:
- `bg-gray-50` - Gris claro
- `bg-zinc-50` - Gris más neutro
- `bg-slate-50` - Gris azulado

---

## 📱 Breakpoints Responsive

```typescript
// Mobile first
h-[380px]           // Mobile
md:h-[420px]        // Tablet
lg:h-[520px]        // Desktop

// Grid layout
grid-cols-1         // Mobile (columna)
lg:grid-cols-[3fr_2fr]  // Desktop (60% imagen, 40% card)

// Card superposición
lg:-ml-16           // Solo desktop

// Texto
text-2xl            // Mobile
md:text-3xl         // Tablet
lg:text-4xl         // Desktop
```

---

## ⚡ Performance

### Optimizaciones

- ✅ **Lazy Loading**: Usar `client:visible` en Astro
- ✅ **Imágenes optimizadas**: WebP recomendado
- ✅ **Transiciones CSS**: GPU accelerated
- ✅ **Estado mínimo**: Solo `activeCabinIndex` y `isTransitioning`

### Recomendaciones

```astro
<!-- Lazy load del componente -->
<SectionCabanasMiradorDeLuzV2 client:visible />

<!-- O con threshold -->
<SectionCabanasMiradorDeLuzV2 client:visible={{ rootMargin: "200px" }} />
```

---

## 🎭 Animaciones

### Transición de Imagen

```css
transition-all duration-500
opacity-0 translate-x-5  → opacity-100 translate-x-0
```

### Transición de Card

```css
transition-all duration-500
opacity-0 translate-y-3  → opacity-100 translate-y-0
```

### Hover en Botón

```css
hover:scale-105
hover:shadow-xl
hover:from-amber-700 hover:to-amber-800
```

---

## 🐛 Troubleshooting

### Las imágenes no se cargan

**Solución:**
- Verificar que las URLs sean válidas
- Para imágenes locales, usar `/images/cabanas/nombre.jpg`
- Agregar imágenes a `public/images/cabanas/`

### Las animaciones se ven entrecortadas

**Solución:**
- Asegurar que las imágenes estén optimizadas
- Usar WebP en lugar de PNG/JPG
- Reducir el tamaño de las imágenes (max 1200px de ancho)

### La card no se superpone en desktop

**Solución:**
- Verificar que se está usando el breakpoint `lg:`
- Comprobar que el grid tenga `lg:grid-cols-[3fr_2fr]`
- Asegurar que la card tenga `lg:-ml-16`

### Los dots no se ven sobre la imagen

**Solución:**
- Verificar z-index: `z-10`
- Agregar más contraste: `bg-white/80` en lugar de `bg-white/60`
- Agregar sombra: `shadow-lg`

---

## 🚀 Mejoras Futuras

Ideas para extender el componente:

- [ ] Galería de múltiples imágenes por cabaña (lightbox)
- [ ] Video como background en lugar de imagen estática
- [ ] Calendario de disponibilidad integrado
- [ ] Comparador de cabañas (checklist de amenities)
- [ ] Vista 360° o tour virtual
- [ ] Filtros por capacidad/precio
- [ ] Sección de "Cabañas similares"

---

## 📚 Ejemplos de Uso

### Ejemplo 1: Landing Page

```astro
<SectionCabanasMiradorDeLuzV2 client:visible />
```

### Ejemplo 2: Página de Cabañas

```astro
---
import { fetchCabanas } from '../utils/api';

const cabanas = await fetchCabanas();
---

<SectionCabanasMiradorDeLuzV2 
  client:visible 
  cabanas={cabanas}
  onReservar={(id) => {
    window.location.href = `/reservas?cabana=${id}`;
  }}
/>
```

### Ejemplo 3: Con Analytics

```astro
<SectionCabanasMiradorDeLuzV2 
  client:visible 
  onReservar={(id) => {
    gtag('event', 'reserva_iniciada', {
      cabana_id: id,
    });
    window.location.href = '/reservas';
  }}
/>
```

---

**Versión:** 1.0.0  
**Fecha:** 20/11/2024  
**Autor:** Mirador de Luz Development Team

