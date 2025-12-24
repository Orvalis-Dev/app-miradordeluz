# 🔗 Guía de Integración de Imágenes WebP

Ahora que tienes **158 imágenes WebP optimizadas**, aquí te mostramos cómo integrarlas en tu aplicación.

---

## 📱 Imágenes Disponibles

Todas están en `public/images/` con extensión `.webp`:

```
/images/cabana-1/    26 fotos
/images/cabana-2/    46 fotos
/images/cabana-3/    30 fotos
/images/cabana-4/    11 fotos
/images/exterior/    45 fotos
```

**Ejemplo de ruta completa:**
```
/images/cabana-1/IMG_3580.HEIC.webp
```

---

## 🎯 Checklist de Integración

### Componentes a Actualizar

- [ ] `src/components/react/Gallery/Gallery.tsx` - Galería principal
- [ ] `src/components/react/GaleriaMiradorDeLuz.tsx` - Galería alternativa
- [ ] `src/pages/galeria.astro` - Página de galería
- [ ] Otros componentes que muestren imágenes

---

## 📋 Pasos de Integración

### Paso 1: Actualizar Data de Imágenes

**Archivo:** `src/components/react/Gallery/data.ts`

```typescript
export const galleryImages = [
  {
    id: 1,
    cabana: 1,
    url: '/images/cabana-1/IMG_3580.HEIC.webp',
    title: 'Dormitorio Principal',
    category: 'bedroom'
  },
  {
    id: 2,
    cabana: 1,
    url: '/images/cabana-1/IMG_3581.HEIC.webp',
    title: 'Baño',
    category: 'bathroom'
  },
  {
    id: 3,
    cabana: 1,
    url: '/images/cabana-1/IMG_3582.HEIC.webp',
    title: 'Sala de Estar',
    category: 'living'
  },
  // ... más imágenes
];
```

### Paso 2: Actualizar Componentes React

**Patrón de componente optimizado:**

```jsx
import { memo, useState } from 'react';

interface GalleryImageProps {
  src: string;
  alt: string;
  cabana: number;
}

export const GalleryImage = memo(function GalleryImage({
  src,
  alt,
  cabana
}: GalleryImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative aspect-square overflow-hidden rounded-lg bg-slate-200">
      <img
        src={src}
        alt={alt}
        title={`${alt} - Cabaña ${cabana}`}
        loading="lazy"
        decoding="async"
        className={`w-full h-full object-cover transition-all duration-300 ${
          isLoading ? 'blur-sm' : 'blur-0'
        } hover:scale-110`}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-slate-300" />
      )}
    </div>
  );
});
```

### Paso 3: Galería con Lightbox

```jsx
'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export function Gallery({ images }) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const goToPrevious = () => {
    setSelectedIdx((idx) => (idx === null ? 0 : (idx - 1 + images.length) % images.length));
  };

  const goToNext = () => {
    setSelectedIdx((idx) => (idx === null ? 0 : (idx + 1) % images.length));
  };

  return (
    <>
      {/* Grid de imágenes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, idx) => (
          <button
            key={image.id}
            onClick={() => setSelectedIdx(idx)}
            className="relative aspect-square group cursor-pointer"
          >
            <img
              src={image.url}
              alt={image.title}
              loading="lazy"
              className="w-full h-full object-cover rounded-lg group-hover:brightness-75 transition-all"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-sm font-semibold">{image.title}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Modal Lightbox */}
      {selectedIdx !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setSelectedIdx(null)}
        >
          {/* Botón Cerrar */}
          <button
            onClick={() => setSelectedIdx(null)}
            className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded"
          >
            <X size={24} />
          </button>

          {/* Imagen Principal */}
          <div
            className="max-w-4xl max-h-[80vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[selectedIdx].url}
              alt={images[selectedIdx].title}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Controles */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 text-white hover:bg-white/20 p-2 rounded"
          >
            <ChevronLeft size={32} />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 text-white hover:bg-white/20 p-2 rounded"
          >
            <ChevronRight size={32} />
          </button>

          {/* Contador */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded">
            {selectedIdx + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
```

### Paso 4: Página Astro

**Archivo:** `src/pages/galeria.astro`

```astro
---
import Layout from '../layouts/Layout.astro';
import Gallery from '../components/react/Gallery/Gallery.jsx';
import { galleryImages } from '../components/react/Gallery/data';

const title = 'Galería - Mirador de Luz';
const description = 'Explora las hermosas imágenes de nuestras cabañas';
---

<Layout title={title} description={description}>
  <main class="container mx-auto px-4 py-12">
    <div class="mb-12">
      <h1 class="text-4xl font-bold text-slate-900 mb-2">
        Galería
      </h1>
      <p class="text-lg text-slate-600">
        Descubre la belleza de nuestras cabañas y espacios
      </p>
    </div>

    <Gallery 
      client:load 
      images={galleryImages}
    />
  </main>
</Layout>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }
</style>
```

---

## 🎨 Estilos Recomendados

```css
/* Galería responsiva */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 2rem 0;
}

/* Imagen con efecto */
.gallery-image {
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 0.75rem;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
}

.gallery-image:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

/* Placeholder mientras carga */
.gallery-image.loading {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Overlay en hover */
.gallery-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-image:hover .gallery-overlay {
  opacity: 1;
}
```

---

## 📊 Datos de Ejemplo Completo

```typescript
// src/components/react/Gallery/data.ts

export interface GalleryImage {
  id: number;
  cabana: number;
  url: string;
  title: string;
  description: string;
  category: 'bedroom' | 'bathroom' | 'living' | 'kitchen' | 'exterior';
  featured?: boolean;
}

export const galleryImages: GalleryImage[] = [
  // Cabaña 1
  {
    id: 1,
    cabana: 1,
    url: '/images/cabana-1/IMG_3580.HEIC.webp',
    title: 'Dormitorio Principal',
    description: 'Vista de la cama principal con vista al bosque',
    category: 'bedroom',
    featured: true
  },
  {
    id: 2,
    cabana: 1,
    url: '/images/cabana-1/IMG_3581.HEIC.webp',
    title: 'Baño Principal',
    description: 'Baño moderno con ducha y amenities',
    category: 'bathroom'
  },
  {
    id: 3,
    cabana: 1,
    url: '/images/cabana-1/IMG_3582.HEIC.webp',
    title: 'Sala de Estar',
    description: 'Área de estar acogedora con chimenea',
    category: 'living',
    featured: true
  },

  // Cabaña 2
  {
    id: 26,
    cabana: 2,
    url: '/images/cabana-2/IMG_3616.HEIC.webp',
    title: 'Dormitorio - Cabaña 2',
    description: 'Dormitorio espacioso y luminoso',
    category: 'bedroom'
  },
  // ... más imágenes
];

// Filtrar por categoría
export const getImagesByCategory = (category: string) =>
  galleryImages.filter((img) => img.category === category);

// Filtrar por cabaña
export const getImagesByCabana = (cabanaNumber: number) =>
  galleryImages.filter((img) => img.cabana === cabanaNumber);

// Obtener destacadas
export const getFeaturedImages = () =>
  galleryImages.filter((img) => img.featured);
```

---

## 🧪 Testing

Después de integrar, verifica:

```bash
# 1. Las imágenes cargan (DevTools → Network)
# 2. No hay errores 404
# 3. Las imágenes se ven correctamente
# 4. El lighthouse score es alto
```

---

## ⚡ Performance Checklist

- [ ] Todas las imágenes usan `loading="lazy"`
- [ ] Dimensiones (width/height) especificadas
- [ ] Alt text descriptivo
- [ ] Compresión WebP activada
- [ ] Lightbox implementado
- [ ] Responsive design
- [ ] Web Vitals optimizados

---

## 🚀 Próximas Mejoras

1. **Optimización de imagen adaptativa**
   - Diferentes tamaños según dispositivo
   - srcset para resoluciones

2. **Carga progresiva**
   - Blur-up mientras carga
   - Skeleton loaders

3. **Caché**
   - Service workers
   - CDN integration

4. **Analytics**
   - Tracking de imágenes vistas
   - Performance metrics

---

¡Listo! Tu galería con imágenes WebP optimizadas está lista para integrar. 🎉





