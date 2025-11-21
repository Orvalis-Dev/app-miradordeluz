# 🏕️ Section Cabañas Mirador de Luz - Documentación

## Componente de Galería de Cabañas

Sección elegante para mostrar los diferentes tipos de cabañas disponibles en el complejo, con diseño tipo tarjetas (cards) con overlay.

---

## 📦 Ubicación

```
src/components/react/SectionCabanasMiradorDeLuz.tsx
```

---

## 🚀 Uso Básico

### En una página Astro:

```astro
---
import SectionCabanasMiradorDeLuz from '../components/react/SectionCabanasMiradorDeLuz';
---

<SectionCabanasMiradorDeLuz client:load />
```

### Ver ejemplo:

```
http://localhost:4321/ejemplo-cabanas
```

---

## ⚙️ Props Configurables

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `etiqueta` | string | "MIRADOR DE LUZ" | Etiqueta superior pequeña |
| `titulo` | string | "Cabañas" | Título principal |
| `cabanas` | CabanaCard[] | Array default | Array de objetos con datos de cabañas |
| `mostrarBoton` | boolean | true | Mostrar/ocultar botón "Ver todas" |
| `textoBoton` | string | "Ver todas las cabañas" | Texto del botón |
| `onVerTodas` | function | undefined | Callback al hacer click en "Ver todas" |
| `onClickCabana` | function | undefined | Callback al hacer click en una cabaña |

---

## 📝 Estructura de Objeto Cabaña

```typescript
interface CabanaCard {
  id: string;           // ID único
  title: string;        // Nombre: "Cabaña Premium"
  subtitle?: string;    // Etiqueta: "CABAÑAS"
  image: string;        // URL de la imagen
  slug?: string;        // Para navegación: "premium"
}
```

---

## 🎨 Características del Diseño

### 1. **Encabezado**
- ✅ Etiqueta superior: `text-xs` con tracking amplio
- ✅ Título grande y bold: `text-4xl md:text-5xl`
- ✅ Alineado a la izquierda
- ✅ Color gris oscuro

### 2. **Grid de Cabañas**
- ✅ **Mobile**: 1 columna
- ✅ **Tablet**: 2 columnas
- ✅ **Desktop**: 3 columnas (4ta cabaña en segunda fila)
- ✅ Gap uniforme entre cards
- ✅ Altura fija: 320px

### 3. **Cards de Cabañas**
- ✅ Imagen de fondo con `object-cover`
- ✅ Overlay con gradiente oscuro en la parte inferior
- ✅ Texto blanco en esquina inferior izquierda
- ✅ Efecto hover con escala de imagen
- ✅ Sombra que aumenta al hover
- ✅ Cursor pointer
- ✅ Indicador de flecha al hover

### 4. **Botón "Ver Todas"**
- ✅ Borde negro fino
- ✅ Alineado a la derecha
- ✅ Hover invierte colores (fondo negro, texto blanco)
- ✅ Transición suave

---

## 📝 Ejemplos de Uso

### Ejemplo 1: Uso Básico

```astro
<SectionCabanasMiradorDeLuz client:load />
```

---

### Ejemplo 2: Con Imágenes Personalizadas

```tsx
<SectionCabanasMiradorDeLuz 
  client:load
  cabanas={[
    {
      id: '1',
      title: 'Cabaña Premium',
      subtitle: 'CABAÑAS',
      image: '/images/premium.jpg',
      slug: 'premium',
    },
    {
      id: '2',
      title: 'Cabaña Familiar',
      subtitle: 'CABAÑAS',
      image: '/images/familiar.jpg',
      slug: 'familiar',
    },
    {
      id: '3',
      title: 'Cabaña Bosque',
      subtitle: 'CABAÑAS',
      image: '/images/bosque.jpg',
      slug: 'bosque',
    },
    {
      id: '4',
      title: 'Cabaña Mirador',
      subtitle: 'CABAÑAS',
      image: '/images/mirador.jpg',
      slug: 'mirador',
    }
  ]}
/>
```

---

### Ejemplo 3: Con Callbacks Personalizados

```tsx
<SectionCabanasMiradorDeLuz 
  client:load
  onVerTodas={() => {
    console.log('Mostrar todas las cabañas');
    window.location.href = '/cabanas';
  }}
  onClickCabana={(slug) => {
    console.log('Navegando a:', slug);
    window.location.href = `/cabanas/${slug}`;
  }}
/>
```

---

### Ejemplo 4: Sin Botón

```tsx
<SectionCabanasMiradorDeLuz 
  client:load
  mostrarBoton={false}
/>
```

---

### Ejemplo 5: Título Personalizado

```tsx
<SectionCabanasMiradorDeLuz 
  client:load
  etiqueta="COMPLEJO TURÍSTICO"
  titulo="Nuestros Alojamientos"
  textoBoton="Ver todos los alojamientos"
/>
```

---

## 🎨 Estilo Visual

### Fondo
- Color: `bg-stone-50` (beige/gris muy suave)
- Padding vertical: `py-16 md:py-20`

### Cards
- Bordes: `rounded-2xl`
- Sombra: `shadow-md` → `shadow-lg` al hover
- Overlay: Gradiente de negro 70% → transparente
- Altura: `h-[320px]` fija

### Texto en Cards
- Etiqueta: `text-xs` uppercase con tracking
- Título: `text-2xl md:text-3xl` bold
- Color: Blanco
- Posición: Esquina inferior izquierda

### Botón
- Borde: `border border-gray-900`
- Bordes redondeados: `rounded-md`
- Padding: `px-8 py-3`
- Hover: Invierte colores

---

## 📱 Responsividad Detallada

### Mobile (< 768px)
```
┌─────────────┐
│  Cabaña 1   │
├─────────────┤
│  Cabaña 2   │
├─────────────┤
│  Cabaña 3   │
├─────────────┤
│  Cabaña 4   │
└─────────────┘
```

### Tablet (768px - 1024px)
```
┌─────────────┬─────────────┐
│  Cabaña 1   │  Cabaña 2   │
├─────────────┼─────────────┤
│  Cabaña 3   │  Cabaña 4   │
└─────────────┴─────────────┘
```

### Desktop (> 1024px)
```
┌─────────────┬─────────────┬─────────────┐
│  Cabaña 1   │  Cabaña 2   │  Cabaña 3   │
├─────────────┴─────────────┴─────────────┤
│  Cabaña 4   │             │             │
└─────────────┴─────────────┴─────────────┘
```

---

## 🖼️ Imágenes Recomendadas

### Características
- **Resolución**: 800x600px mínimo
- **Aspecto**: Horizontal (4:3 o 16:9)
- **Formato**: JPG o WebP
- **Tamaño**: < 500KB optimizado

### Contenido Sugerido
- **Cabaña Premium**: Exterior moderno, vista amplia
- **Cabaña Familiar**: Espaciosa, acogedora
- **Cabaña Bosque**: Rodeada de árboles
- **Cabaña Mirador**: Vista panorámica

### Bancos de Imágenes
```
Unsplash:
- photo-1587061949409-02df41d5e562 (cabaña moderna)
- photo-1542718610-a1d656d1884c (cabaña madera)
- photo-1449158743715-0a90ebb6d2d8 (cabaña bosque)
- photo-1506905925346-21bda4d32df4 (vista montaña)
```

---

## 🎯 Interactividad

### Click en Card
Por defecto navega a `/cabanas/{slug}`:
```tsx
// Navegación automática
<SectionCabanasMiradorDeLuz client:load />

// Con callback personalizado
<SectionCabanasMiradorDeLuz 
  client:load
  onClickCabana={(slug) => {
    // Tu lógica personalizada
    console.log(slug);
  }}
/>
```

### Click en "Ver Todas"
Por defecto navega a `/cabanas`:
```tsx
// Navegación automática
<SectionCabanasMiradorDeLuz client:load />

// Con callback personalizado
<SectionCabanasMiradorDeLuz 
  client:load
  onVerTodas={() => {
    // Tu lógica personalizada
    window.location.href = '/todas-las-cabanas';
  }}
/>
```

---

## 🔧 Integración con API Laravel

### Fetch de Datos en Tiempo de Build

```astro
---
import SectionCabanasMiradorDeLuz from '../components/react/SectionCabanasMiradorDeLuz';

// Fetch desde la API
const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/api/cabanas`);
const { data: cabanasFromAPI } = await response.json();

// Transformar datos
const cabanas = cabanasFromAPI.map(cabana => ({
  id: cabana.id.toString(),
  title: cabana.nombre,
  subtitle: 'CABAÑAS',
  image: cabana.imagenes.find(img => img.es_principal)?.url || cabana.imagenes[0]?.url,
  slug: cabana.slug,
}));
---

<SectionCabanasMiradorDeLuz 
  client:load
  cabanas={cabanas}
/>
```

---

## 💡 Casos de Uso

### 1. **Landing Page Principal**
```astro
<HeroMiradorDeLuz client:load />
<SectionUbicacionMiradorDeLuz client:load />
<SectionCabanasMiradorDeLuz client:load />
<Footer />
```

### 2. **Página de Cabañas**
```astro
<Header />
<SectionHeroIntermedioMiradorDeLuz 
  title="Nuestras Cabañas"
/>
<SectionCabanasMiradorDeLuz client:load />
<Footer />
```

### 3. **Con Filtros**
```astro
<!-- Agregar filtros arriba -->
<div class="flex gap-4 mb-8">
  <button>Todas</button>
  <button>Familiares</button>
  <button>Premium</button>
</div>

<SectionCabanasMiradorDeLuz 
  client:load
  cabanas={cabanasFilteradas}
/>
```

---

## 🎨 Personalización

### Cambiar Color de Fondo

```tsx
// En el código del componente, cambiar:
className="w-full bg-stone-50"

// A:
className="w-full bg-amber-50"   // Amarillo suave
className="w-full bg-gray-50"     // Gris
className="w-full bg-white"       // Blanco
```

### Cambiar Altura de Cards

```tsx
// En el código:
className="... h-[320px]"

// Cambiar a:
className="... h-[400px]"   // Más alto
className="... h-[280px]"   // Más bajo
```

### Cambiar Grid en Desktop

```tsx
// Actual: 3 columnas
className="grid ... lg:grid-cols-3"

// Cambiar a 4 columnas:
className="grid ... lg:grid-cols-4"

// O 2 columnas:
className="grid ... lg:grid-cols-2"
```

---

## ♿ Accesibilidad

✅ Alt text en imágenes
✅ Contraste adecuado (blanco sobre negro)
✅ Estructura semántica (h2, section)
✅ Cursor pointer en elementos clickeables
✅ Estados hover visibles

---

## 🐛 Troubleshooting

### Las imágenes no cargan

**Solución:**
```tsx
// Verificar rutas:
image: '/images/cabana.jpg'     // ✅ Correcto (en public/)
image: 'images/cabana.jpg'      // ❌ Incorrecto
image: 'https://...'            // ✅ URL completa
```

### El grid no se ve bien

**Solución:**
```tsx
// Asegurarse de tener exactamente 4 cabañas
// O ajustar el grid según cantidad
```

### El overlay es muy oscuro

**Solución:**
```tsx
// En el código, cambiar:
className="... from-black/70"

// A:
className="... from-black/50"   // Más claro
className="... from-black/40"   // Aún más claro
```

---

## 🚀 Performance

### Optimizaciones
- ✅ Lazy loading de imágenes (agregar si necesario)
- ✅ WebP para imágenes más livianas
- ✅ Tamaños apropiados (800x600px)
- ✅ Transiciones CSS puras (sin JS)

### Agregar Lazy Loading

```tsx
<img
  src={cabana.image}
  alt={cabana.title}
  loading="lazy"
  className="..."
/>
```

---

## 📊 Métricas Visuales

- **Padding sección**: 16-20 (4-5rem)
- **Gap entre cards**: 24px (1.5rem)
- **Altura cards**: 320px
- **Bordes redondeados**: 16px (rounded-2xl)
- **Sombra**: md → lg al hover
- **Transición**: 300ms

---

## 🎯 Próximas Mejoras

Ideas para extender:

- [ ] Filtros por tipo de cabaña
- [ ] Búsqueda
- [ ] Precio visible en la card
- [ ] Badge "Disponible" / "Ocupada"
- [ ] Lightbox para ampliar imagen
- [ ] Carrusel de imágenes por cabaña
- [ ] Botón "Reservar" directo en card

---

**Última actualización**: 19/11/2024  
**Versión**: 1.0.0

