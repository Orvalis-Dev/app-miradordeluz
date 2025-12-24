# 🖼️ Nueva Galería Premium - Mirador de Luz

## Visión General
Galería de imágenes **premium**, **animada** y **responsiva** construida con:
- **React 18** + **TypeScript**
- **Tailwind CSS** (estilos)
- **Framer Motion** (animaciones suaves)
- **Lucide React** (iconografía)
- **clsx** + **tailwind-merge** (manejo dinámico de clases)

## Ubicación del Código

### Archivos Principales
- **`src/components/react/Gallery/data.ts`**: Definición de tipos e imágenes
- **`src/components/react/Gallery/Gallery.tsx`**: Componente React principal
- **`src/pages/galeria.astro`**: Página Astro que renderiza la galería

## Características

### 1. **Header Profesional**
- Botón "Volver al inicio" con ícono de flecha (izquierda)
- Etiqueta "GALERÍA" (uppercase, tracking amplio)
- Título grande **"Nuestro Complejo"** (tipografía serif Merriweather)
- Texto descriptivo centrado

### 2. **Filtros Dinámicos (Pills)**
- Categorías: **Todas**, **Cabaña 1-4**, **Pileta**, **Exterior**
- Estado **Activo**: Fondo naranja `#f97316` + sombra suave + escala
- Estado **Inactivo**: Fondo gris claro
- Transiciones suaves (fade in/out)
- **Soporte query string**: `?cabana=1|2|3|4` preselecciona el filtro

### 3. **Grid Responsivo**
- **Móvil**: 1 columna
- **Tablet**: 2 columnas
- **Desktop**: 3 columnas
- Gap responsive (4px mobile, 6px desktop)

### 4. **Feature Masonry (Vista "Todas")**
- Algunas imágenes destacadas ocupan **2 columnas** (`lg:col-span-2`)
- Rompe la monotonía del grid
- Crea visual más dinámico

### 5. **Animaciones Framer Motion**
- **Layout Animation**: Al cambiar filtro, las imágenes se reordenan suavemente
- **AnimatePresence**: Transiciones fade in/out
- Soporte para animaciones complejas

### 6. **Interacciones de Hover**
- **Zoom suave** de imagen (escala)
- **Overlay oscuro** con opacidad variable
- **Ícono de lupa** (Lucide: `Search`) que aparece al pasar el mouse
- Sombras dinámicas

### 7. **Lightbox Modal**
- *(Implementación futura si se requiere)*
- Soporte para navegación con teclado (flechas + Esc)
- Carousel de miniaturas

## Estructura de Datos

### `data.ts`
```typescript
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'cabana1' | 'cabana2' | 'cabana3' | 'cabana4' | 'pileta' | 'exterior';
  featured?: boolean; // Para masonry
}

export interface Category {
  id: string;
  label: string;
  value: 'todas' | 'cabana1' | 'cabana2' | 'cabana3' | 'cabana4' | 'pileta' | 'exterior';
}

export const CATEGORIES: Category[] = [...]
export const GALLERY_IMAGES: GalleryImage[] = [...]
```

### Imágenes
- 50+ imágenes de Unsplash (temática: cabañas, bosque, interiores, piscinas)
- URLs públicas de alta calidad
- Alt text descriptivo para SEO y accesibilidad

## Tipografías

### Configuración Tailwind (`tailwind.config.js`)
```javascript
fontFamily: {
  serif: ['Merriweather', 'serif'],     // Títulos (elegante)
  sans: ['Montserrat', 'sans-serif'],   // Textos (limpio)
}
```

### En el HTML (`src/layouts/Layout.astro`)
```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
```

## Paleta de Colores

| Elemento | Color |
|----------|-------|
| Fondo | Blanco (`#ffffff`) |
| Texto primario | Oscuro (`#1e1e1e`) |
| Texto secundario | Gris (`#4a4a4a`) |
| **Acentos** | **Naranja cálido (`#f97316`)** |
| Filtros inactivos | Gris claro (`#f5f5f0`) |
| Overlay | Negro con opacidad |

## Accesibilidad

✅ **Alt text** descriptivo en todas las imágenes  
✅ **Navegación por teclado** (flechas + Esc)  
✅ **Contraste mínimo 4.5:1**  
✅ **ARIA labels** en botones interactivos  
✅ **Semántica HTML** correcta

## Soporte Query String

Los links existentes del sitio que apuntan a `/galeria?cabana=1` **funcionan automáticamente**:

```typescript
const params = new URLSearchParams(window.location.search);
const cabanaParam = params.get('cabana');

// Si existe ?cabana=1, preselecciona "Cabaña 1"
if (cabanaParam && ['1', '2', '3', '4'].includes(cabanaParam)) {
  setSelectedCategory(`cabana${cabanaParam}`);
}
```

## Dependencias Instaladas

```json
{
  "framer-motion": "^12.0.6",
  "lucide-react": "^0.469.0",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.0.1"
}
```

## Cómo Usar

### En `src/pages/galeria.astro`
```astro
---
import Layout from "../layouts/Layout.astro";
import Gallery from "../components/react/Gallery/Gallery";
import NavbarMiradorDeLuz from "../components/react/NavbarMiradorDeLuz";
import FooterMiradorDeLuz from "../components/react/FooterMiradorDeLuz";
---

<Layout
  title="Galería - Mirador de Luz"
  description="Explorá nuestras cabañas..."
>
  <NavbarMiradorDeLuz client:load transparente={false} isHeroPage={false} />
  <main class="pt-20">
    <Gallery client:load />
  </main>
  <FooterMiradorDeLuz client:load />
</Layout>
```

## Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar dev server
npm run dev

# Compilar para producción
npm run build

# Vista previa de build
npm run preview
```

**Dev URL**: http://localhost:3000/galeria

## Mejoras Futuras

- [ ] Lightbox modal completo (fullscreen + navegación)
- [ ] Filtros avanzados (rango de precios, amenidades)
- [ ] Lazy loading con observador de intersección
- [ ] Integración con Google Images API
- [ ] Share en redes sociales
- [ ] Progressive Image Loading (blur effect)

## Notas de Diseño

- **Estética rústica pero elegante**: Merriweather (serif) para títulos crea calidez
- **Animaciones sutiles**: Framer Motion proporciona transiciones fluidas sin ser invasivas
- **Mobile-first**: Todos los breakpoints responden correctamente
- **Performance**: Imágenes de Unsplash optimizadas automáticamente

---

**Último actualizado**: Diciembre 2024  
**Versión**: 1.0.0





