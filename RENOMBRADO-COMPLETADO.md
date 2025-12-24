# ✅ Renombrado de Imágenes - Completado

**Fecha:** 22 de Diciembre, 2025  
**Status:** ✅ COMPLETADO

---

## 🎉 ¿Qué se completó?

Se han renombrado exitosamente **todas 158 imágenes** con un formato consistente y profesional:

### Antes → Después

```
IMG_3580.HEIC.webp          →  cabana-1-1.webp
IMG_3581.HEIC.webp          →  cabana-1-2.webp
IMG_3616.HEIC.webp          →  cabana-2-1.webp
IMG_3494 2.HEIC.webp        →  exterior-1.webp
cabaña-4-portada.webp       →  cabana-4-11.webp
```

---

## 📊 Nuevo Inventario

```
📁 cabana-1/     26 imágenes    cabana-1-1.webp   ... cabana-1-26.webp
📁 cabana-2/     46 imágenes    cabana-2-1.webp   ... cabana-2-46.webp
📁 cabana-3/     30 imágenes    cabana-3-1.webp   ... cabana-3-30.webp
📁 cabana-4/     11 imágenes    cabana-4-1.webp   ... cabana-4-11.webp
📁 exterior/     45 imágenes    exterior-1.webp   ... exterior-45.webp
                 ───────────
                  158 TOTAL
```

---

## ✨ Ventajas

✅ **Nombres claros** - Identificas fácilmente de qué cabaña es  
✅ **Secuencia lógica** - Las imágenes están numeradas 1, 2, 3...  
✅ **Profesional** - URLs limpias sin caracteres especiales  
✅ **Fácil programativamente** - Genera URLs con loops fácilmente  
✅ **Mejor SEO** - Nombres descriptivos ayudan al buscador  
✅ **Consistente** - Mismo patrón en todas las carpetas  

---

## 🚀 Cómo Usar

### 1. HTML Simple

```html
<img src="/images/cabana-1/cabana-1-1.webp" alt="Dormitorio">
```

### 2. React

```jsx
<img
  src="/images/cabana-1/cabana-1-5.webp"
  alt="Baño principal"
  loading="lazy"
/>
```

### 3. Loop para generar URLs

```javascript
// Generar todas las imágenes de cabaña 1
for (let i = 1; i <= 26; i++) {
  const url = `/images/cabana-1/cabana-1-${i}.webp`;
  console.log(url);
}

// Output:
// /images/cabana-1/cabana-1-1.webp
// /images/cabana-1/cabana-1-2.webp
// ... hasta cabana-1-26.webp
```

### 4. Array de imágenes

```typescript
const cabana1Images = Array.from(
  { length: 26 },
  (_, i) => `/images/cabana-1/cabana-1-${i + 1}.webp`
);

// Resultado:
// [
//   '/images/cabana-1/cabana-1-1.webp',
//   '/images/cabana-1/cabana-1-2.webp',
//   ...
//   '/images/cabana-1/cabana-1-26.webp'
// ]
```

---

## 📝 Ejemplos Prácticos

### Componente React

```jsx
export function GaleriaCabana({ numeroCabana, totalImages }) {
  const images = Array.from(
    { length: totalImages },
    (_, i) => `/images/cabana-${numeroCabana}/cabana-${numeroCabana}-${i + 1}.webp`
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
<GaleriaCabana numeroCabana={1} totalImages={26} />
<GaleriaCabana numeroCabana={2} totalImages={46} />
```

### Constantes útiles

```typescript
// constants/images.ts

export const CABANAS_CONFIG = {
  1: { nombre: 'Cabaña 1', total: 26 },
  2: { nombre: 'Cabaña 2', total: 46 },
  3: { nombre: 'Cabaña 3', total: 30 },
  4: { nombre: 'Cabaña 4', total: 11 },
} as const;

export function getImageUrl(cabana: number, numero: number) {
  return `/images/cabana-${cabana}/cabana-${cabana}-${numero}.webp`;
}

export function getAllImagesForCabana(cabana: number) {
  const total = CABANAS_CONFIG[cabana].total;
  return Array.from(
    { length: total },
    (_, i) => getImageUrl(cabana, i + 1)
  );
}

// Uso:
const imagenes = getAllImagesForCabana(1); // Todas las 26 imágenes de cabana-1
```

---

## 🔧 Script de Renombrado

Si necesitas renombrar nuevas imágenes en el futuro:

```bash
npm run rename:images
```

El script está en: `scripts/renameImages.js`

---

## 📚 Documentación Relacionada

| Archivo | Propósito |
|---------|-----------|
| **docs/NUEVOS-NOMBRES-IMAGENES.md** | 📖 Guía completa con 7 ejemplos |
| **WEBP-CONVERSION.md** | Conversión HEIC → WebP |
| **docs/EJEMPLOS-IMAGENES.md** | Más ejemplos de código |
| **docs/INTEGRAR-IMAGENES.md** | Cómo integrar en tu app |

---

## 💡 Tips Importantes

### 1. Usa constantes, no hardcodes

```javascript
// ❌ NO HAGAS ESTO
const img1 = '/images/cabana-1/cabana-1-1.webp';
const img2 = '/images/cabana-1/cabana-1-2.webp';
// ... 156 más...

// ✅ HAZ ESTO
const images = Array.from(
  { length: 26 },
  (_, i) => `/images/cabana-1/cabana-1-${i + 1}.webp`
);
```

### 2. Crea funciones helper

```javascript
// ✅ MEJOR
function getCabanaImage(cabana, numero) {
  return `/images/cabana-${cabana}/cabana-${cabana}-${numero}.webp`;
}

// Usa: getCabanaImage(1, 5) → /images/cabana-1/cabana-1-5.webp
```

### 3. Almacena metadata

```typescript
const CABANAS = [
  { id: 1, images: 26, titulo: 'Cabaña Clásica' },
  { id: 2, images: 46, titulo: 'Cabaña Deluxe' },
  { id: 3, images: 30, titulo: 'Cabaña Estándar' },
  { id: 4, images: 11, titulo: 'Cabaña Premium' },
];

// Uso: CABANAS.find(c => c.id === 1).images → 26
```

---

## ✅ Checklist Para Integración

- [ ] Leer `docs/NUEVOS-NOMBRES-IMAGENES.md`
- [ ] Actualizar componentes de galería
- [ ] Crear `data/images.ts` con nuevas URLs
- [ ] Probar con `npm run dev`
- [ ] Verificar que todas las imágenes cargan
- [ ] Hacer commit de los cambios
- [ ] Deploy a producción

---

## 🎯 Próxima Tarea

1. **Abre** `docs/NUEVOS-NOMBRES-IMAGENES.md`
2. **Copia** los ejemplos que necesites
3. **Actualiza** tus componentes
4. **Prueba** localmente
5. **Sube** a producción

---

**¡Todo listo! Tus imágenes están organizadas, optimizadas y listas para usar.** 🚀





