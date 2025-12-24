# 🖼️ Guía - Nuevos Nombres de Imágenes

**Estado:** ✅ Todas las 158 imágenes han sido renombradas con nombres claros y consistentes.

---

## 📋 Formato de Nombres

Todas las imágenes ahora siguen este patrón:
```
/images/{carpeta}/{carpeta}-{numero}.webp
```

### Ejemplos

```
/images/cabana-1/cabana-1-1.webp      (primera imagen de cabaña 1)
/images/cabana-1/cabana-1-2.webp      (segunda imagen de cabaña 1)
/images/cabana-2/cabana-2-1.webp      (primera imagen de cabaña 2)
/images/exterior/exterior-1.webp      (primera imagen exterior)
```

---

## 📊 Inventario de Imágenes

```
📁 cabana-1/    26 imágenes    cabana-1-1.webp   ... cabana-1-26.webp
📁 cabana-2/    46 imágenes    cabana-2-1.webp   ... cabana-2-46.webp
📁 cabana-3/    30 imágenes    cabana-3-1.webp   ... cabana-3-30.webp
📁 cabana-4/    11 imágenes    cabana-4-1.webp   ... cabana-4-11.webp
📁 exterior/    45 imágenes    exterior-1.webp   ... exterior-45.webp
```

---

## 💻 Ejemplos de Código

### 1. HTML Puro

```html
<img 
  src="/images/cabana-1/cabana-1-1.webp" 
  alt="Dormitorio principal - Cabaña 1"
  loading="lazy"
/>
```

### 2. React - Imagen Individual

```jsx
export function CabanaImage({ cabana, number }) {
  return (
    <img
      src={`/images/cabana-${cabana}/cabana-${cabana}-${number}.webp`}
      alt={`Imagen ${number} - Cabaña ${cabana}`}
      loading="lazy"
      className="w-full h-auto rounded-lg"
    />
  );
}

// Uso:
<CabanaImage cabana={1} number={1} />
<CabanaImage cabana={2} number={5} />
```

### 3. React - Array de Imágenes

```jsx
export function CabanaGallery({ cabana, totalImages }) {
  const images = Array.from({ length: totalImages }, (_, i) => 
    `/images/cabana-${cabana}/cabana-${cabana}-${i + 1}.webp`
  );

  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`Imagen ${idx + 1}`}
          loading="lazy"
          className="w-full aspect-square object-cover rounded-lg"
        />
      ))}
    </div>
  );
}

// Uso:
<CabanaGallery cabana={1} totalImages={26} />
<CabanaGallery cabana={2} totalImages={46} />
```

### 4. Data Array Completo

```typescript
// src/data/images.ts

export const cabanas = [
  {
    id: 1,
    nombre: 'Cabaña 1',
    totalImages: 26,
    images: [
      { id: 1, url: '/images/cabana-1/cabana-1-1.webp', title: 'Imagen 1' },
      { id: 2, url: '/images/cabana-1/cabana-1-2.webp', title: 'Imagen 2' },
      // ... hasta cabana-1-26.webp
    ]
  },
  {
    id: 2,
    nombre: 'Cabaña 2',
    totalImages: 46,
    images: [
      { id: 1, url: '/images/cabana-2/cabana-2-1.webp', title: 'Imagen 1' },
      { id: 2, url: '/images/cabana-2/cabana-2-2.webp', title: 'Imagen 2' },
      // ... hasta cabana-2-46.webp
    ]
  },
  // ... cabana-3, cabana-4, exterior
];
```

### 5. Generador de URLs

```typescript
// Generar todas las URLs de una cabaña
function getImageUrls(cabana: number, totalImages: number): string[] {
  return Array.from(
    { length: totalImages },
    (_, i) => `/images/cabana-${cabana}/cabana-${cabana}-${i + 1}.webp`
  );
}

// Uso:
const cabana1Images = getImageUrls(1, 26);
const cabana2Images = getImageUrls(2, 46);
const exteriorImages = getImageUrls('exterior', 45);
```

### 6. Galería Completa

```jsx
import { useState } from 'react';

export function Gallery() {
  const cabanasData = [
    { id: 1, totalImages: 26 },
    { id: 2, totalImages: 46 },
    { id: 3, totalImages: 30 },
    { id: 4, totalImages: 11 },
  ];

  const [selected, setSelected] = useState(null);

  return (
    <>
      {/* Galería de cabañas */}
      {cabanasData.map(({ id, totalImages }) => (
        <div key={id} className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Cabaña {id}</h2>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            {Array.from({ length: totalImages }, (_, i) => (
              <button
                key={i}
                onClick={() => setSelected({
                  cabana: id,
                  number: i + 1,
                  total: totalImages
                })}
                className="aspect-square overflow-hidden rounded-lg hover:shadow-lg"
              >
                <img
                  src={`/images/cabana-${id}/cabana-${id}-${i + 1}.webp`}
                  alt={`Cabaña ${id} - Imagen ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Modal lightbox */}
      {selected && (
        <Modal image={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}

function Modal({ image, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <img
        src={`/images/cabana-${image.cabana}/cabana-${image.cabana}-${image.number}.webp`}
        alt={`Cabaña ${image.cabana} - Imagen ${image.number}`}
        className="max-w-4xl max-h-[90vh] object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
```

### 7. Carrousel de Imágenes

```jsx
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function ImageCarousel({ cabana, totalImages }) {
  const [current, setCurrent] = useState(0);

  const images = Array.from(
    { length: totalImages },
    (_, i) => `/images/cabana-${cabana}/cabana-${cabana}-${i + 1}.webp`
  );

  const next = () => setCurrent((current + 1) % images.length);
  const prev = () => setCurrent((current - 1 + images.length) % images.length);

  return (
    <div className="relative">
      {/* Imagen actual */}
      <img
        src={images[current]}
        alt={`Imagen ${current + 1}`}
        className="w-full aspect-video object-cover rounded-lg"
      />

      {/* Controles */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white p-2 rounded-full"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white p-2 rounded-full"
      >
        <ChevronRight size={24} />
      </button>

      {/* Contador */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
        {current + 1} / {images.length}
      </div>

      {/* Miniaturas */}
      <div className="flex gap-2 mt-4 overflow-x-auto">
        {images.map((src, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-opacity ${
              idx === current ? 'opacity-100' : 'opacity-60'
            }`}
          >
            <img
              src={src}
              alt={`Miniatura ${idx + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// Uso:
<ImageCarousel cabana={1} totalImages={26} />
```

---

## 🔄 Migración de Datos Antiguos

Si tienes datos con los nombres antiguos (IMG_*.webp), puedes migrar fácilmente:

```javascript
// Función para convertir URLs antiguas a nuevas
function migrateImageUrl(oldUrl) {
  const match = oldUrl.match(/\/images\/(cabana-\d+|exterior)\//);
  if (!match) return oldUrl;

  const folder = match[1];
  const imageName = oldUrl.split('/').pop();
  
  // Aquí necesitarías un mapeo de nombres antiguos a nuevos
  // Esta es una aproximación, puedes personalizar según tus datos
  
  return oldUrl; // O retorna la URL nueva basada en tu lógica
}
```

---

## 🎯 Constantes Útiles

```typescript
// src/constants/images.ts

export const CABANA_COUNTS = {
  'cabana-1': 26,
  'cabana-2': 46,
  'cabana-3': 30,
  'cabana-4': 11,
  'exterior': 45,
} as const;

export const CABANAS = [
  { id: 1, count: 26, name: 'Cabaña 1' },
  { id: 2, count: 46, name: 'Cabaña 2' },
  { id: 3, count: 30, name: 'Cabaña 3' },
  { id: 4, count: 11, name: 'Cabaña 4' },
] as const;

export const getImageUrl = (cabana: string | number, imageNumber: number) =>
  `/images/cabana-${cabana}/cabana-${cabana}-${imageNumber}.webp`;

export const getAllImages = (cabana: string | number) => {
  const count = CABANA_COUNTS[`cabana-${cabana}` as keyof typeof CABANA_COUNTS];
  return Array.from(
    { length: count },
    (_, i) => getImageUrl(cabana, i + 1)
  );
};
```

---

## ✅ Checklist

- [x] Renombrar todas las imágenes
- [ ] Actualizar componentes con nuevas URLs
- [ ] Generar data.ts con nuevos nombres
- [ ] Probar galería
- [ ] Validar que todas las imágenes cargan
- [ ] Actualizar documentación

---

## 💡 Tips

1. **Usa constantes** para los números de imágenes
2. **Crea funciones helpers** para generar URLs
3. **Almacena metadatos** en un archivo JSON
4. **Considera usar** un array generado en lugar de hardcodear URLs
5. **Versioná** cambios en git después de actualizar

---

## 📞 Soporte

Si necesitas renombrar nuevas imágenes:
```bash
npm run rename:images
```

Script: `scripts/renameImages.js`





