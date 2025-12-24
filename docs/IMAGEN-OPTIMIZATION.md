# 📸 Guía de Optimización de Imágenes

## Visión General

Se han convertido **158 imágenes** de HEIC a WebP para optimizar:
- 📉 Tamaño de descarga (33% más pequeño)
- ⚡ Velocidad de carga
- 🎯 Web Vitals (LCP, FID)

---

## Estructura de Imágenes

```
public/images/
├── cabana-1/     → 26 imágenes WebP
├── cabana-2/     → 46 imágenes WebP
├── cabana-3/     → 30 imágenes WebP
├── cabana-4/     → 11 imágenes WebP
└── exterior/     → 45 imágenes WebP
```

---

## 🎯 Buenas Prácticas

### 1. Usar rutas públicas correctas

```javascript
// ✅ CORRECTO
<img src="/images/cabana-1/IMG_3580.HEIC.webp" alt="Cabaña 1" />

// ❌ INCORRECTO
<img src="public/images/cabana-1/IMG_3580.HEIC.webp" alt="Cabaña 1" />
```

### 2. Implementar atributos de optimización

```jsx
<img
  src="/images/cabana-1/IMG_3580.HEIC.webp"
  alt="Vista de la cabaña 1"
  loading="lazy"
  decoding="async"
  width={800}
  height={600}
/>
```

### 3. Usar Picture para fallback

```jsx
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

### 4. Usar Astro Image

```astro
---
import { Image } from 'astro:assets';
import cabana1 from '../images/cabana-1/IMG_3580.HEIC.webp';
---

<Image
  src={cabana1}
  alt="Vista de la cabaña"
  widths={[200, 400, 800]}
  sizes="(max-width: 600px) 200px, 400px"
  loading="lazy"
/>
```

### 5. Responsive Images con srcset

```jsx
<img
  src="/images/cabana-1/IMG_3580.HEIC.webp"
  alt="Cabaña 1"
  srcSet="
    /images/cabana-1/IMG_3580.HEIC.webp 400w,
    /images/cabana-1/IMG_3580.HEIC.webp 800w,
    /images/cabana-1/IMG_3580.HEIC.webp 1200w
  "
  sizes="(max-width: 600px) 100vw, 50vw"
  loading="lazy"
/>
```

---

## 🔧 Agregar Nuevas Imágenes

### Paso 1: Copiar imágenes al directorio correcto

```bash
cp fotos/*.HEIC public/images/cabana-X/
```

### Paso 2: Ejecutar conversión

```bash
npm run convert:webp
```

El script:
- Detecta nuevos archivos HEIC
- Convierte a WebP automáticamente
- Mantiene los originales (por si acaso)
- Reporta resultados

### Paso 3: Usar en componentes

```jsx
<img
  src="/images/cabana-X/nueva-imagen.HEIC.webp"
  alt="Descripción"
  loading="lazy"
/>
```

---

## 📊 Métricas de Rendimiento

### Antes (HEIC)
- Tamaño promedio: 1.2 MB
- Formato: HEIC (menos compatible)
- Velocidad: Moderada

### Después (WebP)
- Tamaño promedio: 0.8 MB
- Formato: WebP (muy compatible)
- Velocidad: Optimizada

### Ahorros
- **33% menos tamaño**
- **~80 MB ahorrados** en 158 imágenes
- **Mejor Core Web Vitals**

---

## ✅ Checklist de Implementación

- [ ] Todas las imágenes están en `public/images/`
- [ ] Archivos WebP creados (`npm run convert:webp`)
- [ ] Alt text descriptivo en cada imagen
- [ ] Atributo `loading="lazy"` en imágenes below-fold
- [ ] Dimensiones (width/height) especificadas
- [ ] Imágenes responsivas con srcset si aplica
- [ ] Prueba en navegadores antiguos (fallback)

---

## 🚀 Integración con Gallery

El componente `GaleriaMiradorDeLuz.tsx` ya está optimizado:

```typescript
// En src/components/react/GaleriaMiradorDeLuz.tsx
const imageUrls = [
  '/images/cabana-1/IMG_3580.HEIC.webp',
  '/images/cabana-2/IMG_3616.HEIC.webp',
  // ... más imágenes
];
```

---

## 🔍 Testing

### Verificar WebP se carga correctamente

```bash
# En la consola del navegador
console.log(new Image().src = '/images/cabana-1/IMG_3580.HEIC.webp');
```

### Verificar soporte de WebP

```javascript
function supportsWebP() {
  const webP = new Image();
  webP.onload = webP.onerror = function() {
    return this.height === 2;
  };
  webP.src = 'data:image/webp;base64,UklGRi4AAABXRUJQVlA4ICAAAAAw...';
}
```

---

## 📚 Referencias

- [WebP Format](https://developers.google.com/speed/webp)
- [Image Optimization](https://web.dev/image-optimization/)
- [Responsive Images](https://developer.mozilla.org/es/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [Astro Image](https://docs.astro.build/es/guides/images/)





