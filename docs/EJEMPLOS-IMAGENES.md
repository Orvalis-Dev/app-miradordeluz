# 💡 Ejemplos de Uso de Imágenes WebP

## Disponibles

Todas estas imágenes ya están convertidas a WebP:

```
/images/cabana-1/  (26 imágenes)
/images/cabana-2/  (46 imágenes)
/images/cabana-3/  (30 imágenes)
/images/cabana-4/  (11 imágenes)
/images/exterior/  (45 imágenes)
```

---

## 🔗 Referencia de Archivos

### Cabaña 1
```
/images/cabana-1/IMG_3580.HEIC.webp
/images/cabana-1/IMG_3581.HEIC.webp
/images/cabana-1/IMG_3582.HEIC.webp
... (26 total)
```

### Cabaña 2
```
/images/cabana-2/IMG_3616.HEIC.webp
/images/cabana-2/IMG_3617.HEIC.webp
... (46 total)
```

### Cabaña 3
```
/images/cabana-3/IMG_3663.HEIC.webp
/images/cabana-3/IMG_3667.HEIC.webp
... (30 total)
```

### Cabaña 4
```
/images/cabana-4/IMG_3XXX.HEIC.webp
... (11 total)
```

### Exterior
```
/images/exterior/IMG_3494_2.HEIC.webp
/images/exterior/IMG_3495_2.HEIC.webp
... (45 total)
```

---

## 📝 Ejemplos de Código

### 1️⃣ HTML Puro (Más Compatible)

```html
<!-- Imagen simple -->
<img
  src="/images/cabana-1/IMG_3580.HEIC.webp"
  alt="Dormitorio principal de la cabaña 1"
  loading="lazy"
  decoding="async"
/>

<!-- Con dimensiones (mejor performance) -->
<img
  src="/images/cabana-1/IMG_3580.HEIC.webp"
  alt="Vista exterior de la cabaña"
  width="800"
  height="600"
  loading="lazy"
/>

<!-- Picture con fallback JPG -->
<picture>
  <source
    srcSet="/images/cabana-1/IMG_3580.HEIC.webp"
    type="image/webp"
  />
  <source
    srcSet="/images/cabana-1/IMG_3580.HEIC.jpg"
    type="image/jpeg"
  />
  <img
    src="/images/cabana-1/IMG_3580.HEIC.jpg"
    alt="Cabaña 1"
    loading="lazy"
  />
</picture>
```

### 2️⃣ React (Recomendado)

```jsx
export function CabanaGallery() {
  const images = [
    {
      src: '/images/cabana-1/IMG_3580.HEIC.webp',
      alt: 'Dormitorio'
    },
    {
      src: '/images/cabana-1/IMG_3581.HEIC.webp',
      alt: 'Baño'
    },
    {
      src: '/images/cabana-1/IMG_3582.HEIC.webp',
      alt: 'Sala de estar'
    },
  ];

  return (
    <div className="gallery">
      {images.map((img) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          loading="lazy"
          className="gallery-image"
        />
      ))}
    </div>
  );
}
```

### 3️⃣ Astro (Optimizado)

```astro
---
import { Image } from 'astro:assets';

const images = [
  '/images/cabana-1/IMG_3580.HEIC.webp',
  '/images/cabana-1/IMG_3581.HEIC.webp',
  '/images/cabana-1/IMG_3582.HEIC.webp',
];
---

<div class="gallery">
  {images.map((src) => (
    <img
      src={src}
      alt="Cabaña 1"
      loading="lazy"
      class="gallery-image"
    />
  ))}
</div>
```

### 4️⃣ Con Responsive Images

```jsx
export function ResponsiveImage() {
  return (
    <img
      src="/images/cabana-1/IMG_3580.HEIC.webp"
      alt="Cabaña 1"
      srcSet="
        /images/cabana-1/IMG_3580.HEIC.webp 400w,
        /images/cabana-1/IMG_3580.HEIC.webp 800w,
        /images/cabana-1/IMG_3580.HEIC.webp 1200w
      "
      sizes="(max-width: 600px) 100vw,
             (max-width: 1200px) 50vw,
             33vw"
      loading="lazy"
      className="responsive-image"
    />
  );
}
```

### 5️⃣ Con Tailwind CSS

```jsx
export function CabanaCard() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="aspect-square overflow-hidden">
        <img
          src="/images/cabana-1/IMG_3580.HEIC.webp"
          alt="Cabaña 1"
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Cabaña 1</h3>
        <p className="text-gray-600">Ubicada en el bosque</p>
      </div>
    </div>
  );
}
```

### 6️⃣ Galería con Lightbox

```jsx
import { useState } from 'react';

export function GalleryWithLightbox() {
  const [selected, setSelected] = useState(null);
  
  const images = [
    '/images/cabana-1/IMG_3580.HEIC.webp',
    '/images/cabana-1/IMG_3581.HEIC.webp',
    '/images/cabana-2/IMG_3616.HEIC.webp',
  ];

  return (
    <div>
      {/* Thumbnails */}
      <div className="grid grid-cols-3 gap-4">
        {images.map((src) => (
          <button
            key={src}
            onClick={() => setSelected(src)}
            className="cursor-pointer hover:opacity-75"
          >
            <img
              src={src}
              alt="Thumbnail"
              loading="lazy"
              className="w-full h-24 object-cover rounded"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <img
            src={selected}
            alt="Full size"
            className="max-w-4xl max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
```

---

## 🎨 Estilos CSS Recomendados

```css
/* Galería responsiva */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.gallery-image {
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 0.5rem;
}

/* Efecto hover */
.gallery-image {
  transition: transform 0.3s ease, filter 0.3s ease;
}

.gallery-image:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}

/* Carga lazy */
.gallery-image[loading='lazy'] {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
```

---

## 📱 Imágenes por Dispositivo

```jsx
export function ResponsiveGallery() {
  return (
    <>
      {/* Mobile */}
      <div className="block md:hidden">
        <img
          src="/images/cabana-1/IMG_3580.HEIC.webp"
          alt="Cabaña 1"
          className="w-full"
          loading="lazy"
        />
      </div>

      {/* Tablet */}
      <div className="hidden md:grid lg:hidden grid-cols-2 gap-4">
        <img
          src="/images/cabana-1/IMG_3580.HEIC.webp"
          alt="Cabaña 1"
          className="w-full"
          loading="lazy"
        />
        <img
          src="/images/cabana-2/IMG_3616.HEIC.webp"
          alt="Cabaña 2"
          className="w-full"
          loading="lazy"
        />
      </div>

      {/* Desktop */}
      <div className="hidden lg:grid grid-cols-3 gap-4">
        <img
          src="/images/cabana-1/IMG_3580.HEIC.webp"
          alt="Cabaña 1"
          loading="lazy"
        />
        <img
          src="/images/cabana-2/IMG_3616.HEIC.webp"
          alt="Cabaña 2"
          loading="lazy"
        />
        <img
          src="/images/exterior/IMG_3494_2.HEIC.webp"
          alt="Exterior"
          loading="lazy"
        />
      </div>
    </>
  );
}
```

---

## ✅ Checklist

Antes de usar una imagen:

- [ ] Verificar que el archivo `.webp` existe
- [ ] Agregar `alt` text descriptivo
- [ ] Incluir `loading="lazy"` para images below-fold
- [ ] Especificar dimensiones (width/height)
- [ ] Usar rutas absolutas (`/images/...`)
- [ ] Probar en navegadores antiguos

---

## 🚀 Performance Tips

1. **Lazy Loading**: Siempre usar `loading="lazy"` para imágenes que no están en viewport
2. **Dimensiones**: Especificar width/height previene layout shift
3. **Alt Text**: Importante para SEO y accesibilidad
4. **Srcset**: Usar para dispositivos de diferentes resoluciones
5. **WebP**: Es 25-35% más pequeño que JPEG

---

## 📞 Soporte

Cualquier problema con las imágenes:

1. Verifica que el archivo existe: `/images/carpeta/archivo.HEIC.webp`
2. Abre DevTools (F12) → Network → busca la imagen
3. Verifica el estado (200 OK vs 404)
4. Intenta refrescar la caché: Ctrl+Shift+R (Windows) o Cmd+Shift+R (Mac)





