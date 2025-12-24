# 🖼️ Galería con Nombres de Imágenes

**Status:** ✅ COMPLETA Y LISTA PARA USAR

## 📝 ¿Qué se hizo?

Se creó una **galería profesional** que automáticamente:
- ✅ Lee los nombres de las imágenes desde las carpetas
- ✅ Muestra títulos descriptivos (ej: "Portada", "Dormitorio", "Baño")
- ✅ Exhibe nombres de archivos
- ✅ Tiene modal lightbox interactivo
- ✅ Funciona en móvil, tablet y desktop

## 🚀 Cómo Ver la Galería

```bash
# 1. Inicia el servidor de desarrollo
npm run dev

# 2. Abre en tu navegador:
# http://localhost:4321/galeria-nombres
```

¡Eso es todo! La galería debería mostrar todas las imágenes de Cabaña 1 con sus nombres.

## 🎨 Características

### Grid Responsivo
- **Mobile:** 1 columna
- **Tablet:** 2 columnas  
- **Desktop:** 3 columnas

### Información Visible
Cada imagen muestra:
- Título descriptivo (ej: "Portada", "Baño")
- Nombre del archivo
- Número de imagen (ej: "1/25")

### Modal Lightbox
Al hacer click en una imagen:
- ✨ Se abre a pantalla completa
- ➡️ Navega con flechas o botones
- ❌ Cierra con X o click afuera
- 📸 Miniaturas para saltar a cualquier imagen
- ⌨️ Soporta teclado (← → Esc)

### Hover Effects
- 🔍 Zoom automático
- 📋 Overlay con información
- 🏷️ Badge con número

## 📂 Archivos Creados

```
src/
├── data/
│   └── images.ts              ← Datos de todas las cabañas
├── components/react/
│   └── GaleriaConNombres.tsx  ← Componente galería
└── pages/
    └── galeria-nombres.astro  ← Página con todos los tabs

scripts/
└── generateImageData.js       ← Script para generar datos
```

## 💻 Código de Ejemplo

### Usar en otra página

```astro
---
import { GaleriaConNombres } from "@/components/react/GaleriaConNombres";
---

<GaleriaConNombres client:load cabanaid={1} />
```

### Acceder a datos programáticamente

```typescript
import { cabanas, getCabanaById } from '@/data/images';

// Obtener cabaña 1
const cabana = getCabanaById(1);
console.log(cabana.nombre);       // "Cabaña 1"
console.log(cabana.totalImages);  // 25
console.log(cabana.images[0]);    // { id: 1, url: "...", title: "..." }
```

### Usar helpers

```typescript
import { getCabanaById, getImageUrl, getAllCabanaImages } from '@/data/images';

// Obtener URL de imagen específica
const url = getImageUrl(1, 5);  // /images/cabana-1/cabana-1-...webp

// Obtener todas las imágenes de una cabaña
const images = getAllCabanaImages(1);

// Ver estadísticas
const stats = getCabanaStats();
// { totalCabanas: 5, totalImages: 157, ... }
```

## 🔧 Generar Datos Completos

Si necesitas llenar los datos de todas las cabañas:

```bash
npm run generate:images
```

Este script:
1. Lee todas las carpetas en `public/images/`
2. Obtiene los nombres de los archivos
3. Convierte "cabana-1-portada.webp" → "Portada"
4. Genera `src/data/images.ts` con todos los datos

## 📊 Estructura de Datos

### Una imagen:
```typescript
{
  id: 1,
  url: "/images/cabana-1/cabana-1-portada.webp",
  title: "Portada",
  filename: "cabana-1-portada.webp"
}
```

### Una cabaña:
```typescript
{
  id: 1,
  nombre: "Cabaña 1",
  totalImages: 25,
  images: [ /* array de 25 imágenes */ ]
}
```

## ✨ Títulos Automáticos

Los títulos se generan automáticamente de los nombres:

| Nombre del archivo | Título mostrado |
|-------------------|-----------------|
| cabana-1-portada.webp | Portada |
| cabana-1-baño-1.webp | Baño 1 |
| cabana-1-cocina.webp | Cocina |
| cabana-1-habitacion-2.webp | Habitacion 2 |

## 🎯 Próximos Pasos

### 1. Probar la galería básica
```bash
npm run dev
# Abre: http://localhost:4321/galeria-nombres
```

### 2. Generar datos completos (opcional)
```bash
npm run generate:images
```

Esto llenará automáticamente todos los datos de cabana-2, 3, 4, exterior.

### 3. Integrar en navegación principal (opcional)
Agrega un link en el navbar:
```astro
<a href="/galeria-nombres">Galería</a>
```

## 📱 Responsive

La galería se adapta automáticamente:

```
Mobile (< 768px)     →  1 columna
Tablet (768px-1024px) → 2 columnas
Desktop (> 1024px)   →  3 columnas
```

## ♿ Accesibilidad

- ✅ Alt text en todas las imágenes
- ✅ Loading lazy para performance
- ✅ Botones con aria-label
- ✅ Navegación por teclado
- ✅ Contraste suficiente

## 🐛 Solución de Problemas

### Las imágenes no cargan
1. Verifica que existen en `public/images/cabana-1/`
2. Abre DevTools (F12) → Network
3. Busca los errores 404

### Los títulos están en blanco
1. Genera datos: `npm run generate:images`
2. O edita `src/data/images.ts` manualmente

### El modal no aparece
1. Verifica que `client:load` está en la página Astro
2. Abre la consola (F12) para ver errores

## 📞 Soporte

Si tienes problemas:

1. Verifica `src/data/images.ts` tiene datos
2. Comprueba que `public/images/cabana-1/` tiene archivos .webp
3. Abre DevTools → Console para ver errores
4. Intenta: `npm run dev` de nuevo

## 🎉 ¡Listo!

La galería está completamente funcional. Solo:
1. Ejecuta `npm run dev`
2. Abre `http://localhost:4321/galeria-nombres`
3. ¡Disfruta! 🎨





