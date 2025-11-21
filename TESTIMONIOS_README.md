# ⭐ Section Testimonios Mirador de Luz - Documentación

## Componente de Testimonios de Huéspedes

Sección elegante para mostrar opiniones y reseñas de huéspedes en un carrusel interactivo de 4 cards con auto-play, navegación manual y sistema de calificación por estrellas.

---

## 📦 Ubicación

```
src/components/react/SectionTestimoniosMiradorDeLuz.tsx
```

---

## 🚀 Uso Básico

### En una página Astro:

```astro
---
import SectionTestimoniosMiradorDeLuz from '../components/react/SectionTestimoniosMiradorDeLuz';
---

<SectionTestimoniosMiradorDeLuz client:load />
```

### Ver ejemplo:

```
http://localhost:4321/ejemplo-testimonios
```

---

## ⚙️ Props Configurables

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `testimonios` | Testimonio[] | Array default | Array de testimonios |
| `mostrarBoton` | boolean | true | Mostrar/ocultar botón |
| `textoBoton` | string | "Dejanos tu Opinión" | Texto del botón |
| `onClickBoton` | function | undefined | Callback del botón |
| `autoPlayInterval` | number | 4000 | Intervalo de auto-play (ms) |
| `pauseOnHover` | boolean | true | Pausar auto-play al hover |

---

## 📝 Estructura de Testimonio

```typescript
interface Testimonio {
  id: string;           // ID único
  nombre: string;       // "María González"
  fecha: string;        // "7/11/2025"
  comentario: string;   // Texto del testimonio
  rating: number;       // 1-5 estrellas
  avatarUrl?: string;   // URL opcional de avatar
}
```

---

## 🎨 Características del Diseño

### 1. **Carrusel Interactivo con Auto-Play**

**Desktop (≥ 1024px):**
- Muestra 4 cards a la vez
- **Auto-play automático** cada 4 segundos (configurable)
- **Pausa al hacer hover** sobre el carrusel
- Botones de navegación flotantes (← →) más alejados
- Transiciones suaves al deslizar
- Botones deshabilitados en los extremos
- Efecto de escala en hover de botones
- Loop infinito (vuelve al inicio al llegar al final)

**Tablet (768px - 1023px):**
- Grid de 2 columnas
- Todas las cards visibles con scroll

**Mobile (< 768px):**
- Scroll horizontal nativo
- Cards de ancho fijo (280-320px)
- Swipe para navegar

### 2. **Contenido de Cada Card**

**Header:**
- Avatar circular (10x10)
- Nombre en negrita
- Fecha en gris claro

**Rating:**
- Estrellas pequeñas doradas
- Basadas en el rating del testimonio

**Comentario:**
- Texto gris oscuro
- Line-height cómodo
- Tamaño pequeño legible

### 3. **Botones de Navegación**
- Botones circulares flotantes (solo desktop)
- Fondo blanco con sombra
- **Posicionados lejos de las cards** (`-translate-x-16` / `translate-x-16`)
- Efecto hover: escala 110% y sombra más pronunciada
- Deshabilitados automáticamente en extremos
- No interfieren con el auto-play (navegación manual disponible siempre)

### 4. **Botón Inferior**
- Centrado
- Borde negro fino
- Hover con fondo gris claro
- Bordes redondeados

---

## 📝 Ejemplos de Uso

### Ejemplo 1: Uso Básico

```astro
<SectionTestimoniosMiradorDeLuz client:load />
```

Muestra 6 testimonios por defecto con avatares y auto-play cada 4 segundos.

---

### Ejemplo 2: Testimonios Personalizados

```tsx
<SectionTestimoniosMiradorDeLuz 
  client:load
  testimonios={[
    {
      id: '1',
      nombre: 'Juan Pérez',
      fecha: '15/11/2025',
      comentario: 'Excelente lugar, muy recomendable!',
      rating: 5,
      avatarUrl: '/images/avatar1.jpg',
    },
    {
      id: '2',
      nombre: 'María López',
      fecha: '10/11/2025',
      comentario: 'Hermosas cabañas y excelente atención.',
      rating: 5,
    },
    // ... más testimonios
  ]}
/>
```

---

### Ejemplo 3: Con Callback Personalizado

```tsx
<SectionTestimoniosMiradorDeLuz 
  client:load
  textoBoton="Compartí tu experiencia"
  onClickBoton={() => {
    // Abrir modal de formulario
    openReviewModal();
    
    // O redirigir
    window.location.href = '/dejar-opinion';
    
    // O abrir Google Reviews
    window.open('https://g.page/r/...', '_blank');
  }}
/>
```

---

### Ejemplo 4: Sin Botón

```tsx
<SectionTestimoniosMiradorDeLuz 
  client:load
  mostrarBoton={false}
/>
```

---

### Ejemplo 5: Configurar Auto-Play

```tsx
{/* Auto-play más rápido (2 segundos) */}
<SectionTestimoniosMiradorDeLuz 
  client:load
  autoPlayInterval={2000}
/>

{/* Auto-play más lento (6 segundos) */}
<SectionTestimoniosMiradorDeLuz 
  client:load
  autoPlayInterval={6000}
/>

{/* Sin pausa al hacer hover */}
<SectionTestimoniosMiradorDeLuz 
  client:load
  pauseOnHover={false}
/>
```

---

## 🎨 Sistema de Avatares

### Con URL de Avatar
```tsx
{
  avatarUrl: 'https://...'  // Muestra imagen
}
```

### Sin Avatar (Iniciales Automáticas)
```tsx
{
  nombre: 'Juan Pérez'      // Muestra "JP"
}
```

**Colores automáticos:**
- Genera color basado en el nombre
- 8 colores diferentes: azul, verde, púrpura, rosa, índigo, rojo, amarillo, teal

---

## 📱 Responsividad

### Desktop (≥ 1024px)
```
 ←  ┌──────┬──────┬──────┬──────┐  →
    │ C1   │ C2   │ C3   │ C4   │
    └──────┴──────┴──────┴──────┘
```
Carrusel con navegación por botones, 4 cards visibles

### Tablet (768px - 1023px)
```
┌─────────┬─────────┐
│ Card 1  │ Card 2  │
├─────────┼─────────┤
│ Card 3  │ Card 4  │
└─────────┴─────────┘
```
Grid de 2 columnas

### Mobile (< 768px)
```
┌─────────┐ ┌─────────┐ ┌─────────┐
│ Card 1  │ │ Card 2  │ │ Card 3  │ →
└─────────┘ └─────────┘ └─────────┘
```
Scroll horizontal con swipe

---

## ⭐ Sistema de Rating

### Estrellas en Cards
- Dinámicas según `rating` (1-5)
- Tamaño: `w-4 h-4`
- Amarillo dorado para llenas
- Gris claro para vacías
- Ubicadas debajo del nombre y fecha del huésped

```tsx
rating: 5  // ⭐⭐⭐⭐⭐
rating: 4  // ⭐⭐⭐⭐☆
rating: 3  // ⭐⭐⭐☆☆
```

---

## 🔧 Integración con Backend

### Fetch de Testimonios desde API

```astro
---
import SectionTestimoniosMiradorDeLuz from '../components/react/SectionTestimoniosMiradorDeLuz';

// Fetch desde tu API
const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/api/testimonios`);
const { data: testimoniosAPI } = await response.json();

// Transformar datos
const testimonios = testimoniosAPI.map(t => ({
  id: t.id.toString(),
  nombre: t.nombre_cliente,
  fecha: new Date(t.created_at).toLocaleDateString('es-AR'),
  comentario: t.comentario,
  rating: t.rating,
  avatarUrl: t.avatar_url,
}));
---

<SectionTestimoniosMiradorDeLuz 
  client:load
  testimonios={testimonios}
/>
```

---

### Integrar con Google Reviews

```tsx
<SectionTestimoniosMiradorDeLuz 
  client:load
  onClickBoton={() => {
    // Abrir enlace de Google Reviews
    const googleReviewUrl = 'https://g.page/r/TU_PLACE_ID/review';
    window.open(googleReviewUrl, '_blank');
  }}
/>
```

---

## 💡 Casos de Uso

### 1. **Landing Page**
```astro
<HeroMiradorDeLuz client:load />
<SectionUbicacionMiradorDeLuz client:load />
<SectionCabanasMiradorDeLuz client:load />
<SectionTestimoniosMiradorDeLuz client:load />
<Footer />
```

### 2. **Página de Testimonios Dedicada**
```astro
<Header />
<SectionHeroIntermedioMiradorDeLuz 
  title="Lo que dicen nuestros huéspedes"
/>
<SectionTestimoniosMiradorDeLuz 
  client:load
  testimonios={todosLosTestimonios}
/>
<Footer />
```

### 3. **Con Modal de Formulario**
```tsx
const [modalOpen, setModalOpen] = useState(false);

<SectionTestimoniosMiradorDeLuz 
  client:load
  onClickBoton={() => setModalOpen(true)}
/>

{modalOpen && <ModalOpinion onClose={() => setModalOpen(false)} />}
```

---

## 🎨 Personalización

### Cambiar Color de Estrellas

```tsx
// En el código, buscar:
className="text-yellow-400"

// Cambiar a:
className="text-amber-400"   // Ámbar
className="text-orange-400"  // Naranja
className="text-yellow-500"  // Amarillo más oscuro
```

### Cambiar Número de Cards Visibles en Carrusel

Para modificar cuántas cards se muestran a la vez en desktop:

```tsx
// En el código, buscar:
style={{ width: 'calc(25% - 18px)' }}  // 25% = 4 cards (actual)

// Cambiar a:
style={{ width: 'calc(33.33% - 16px)' }}  // 3 cards
style={{ width: 'calc(50% - 12px)' }}     // 2 cards

// Y actualizar la lógica de navegación:
const maxIndex = testimonios.length - 4;  // Cambiar el 4 según las cards visibles
```

### Ocultar Avatares

```tsx
// En el código, comentar o eliminar sección de avatar
// O agregar una prop hideAvatars
```

---

## 🖼️ Servicios de Avatares

### Pravatar (usado por defecto)
```
https://i.pravatar.cc/150?img=12
```
Genera avatares aleatorios realistas

### Alternativas:
```
// UI Avatars (iniciales automáticas)
https://ui-avatars.com/api/?name=Juan+Perez&background=random

// DiceBear (avatares ilustrados)
https://avatars.dicebear.com/api/avataaars/juan.svg

// Gravatar
https://www.gravatar.com/avatar/HASH
```

---

## 📊 Datos de Ejemplo Incluidos

El componente viene con 6 testimonios de ejemplo:

1. **Horacio Di Paolo** - Rating 5
2. **Fabri & Yuli** - Rating 5  
3. **Alejandro Pazos** - Rating 5
4. **Alejandro Lezcano** - Rating 5
5. **Patricia González** - Rating 5
6. **Martín Silva** - Rating 5

Todos con comentarios realistas sobre cabañas.

---

## ♿ Accesibilidad

✅ Alt text en avatares
✅ Contraste adecuado de colores
✅ Estructura semántica
✅ Tamaños de texto legibles
✅ Botones con área de click suficiente

---

## 🐛 Troubleshooting

### Los avatares no cargan

**Solución:**
```tsx
// Usar avatares locales:
avatarUrl: '/images/avatars/usuario1.jpg'

// O placeholders:
avatarUrl: 'https://via.placeholder.com/150'

// O dejar vacío para iniciales
```

### El scroll horizontal no funciona en mobile

**Solución:**
```tsx
// Verificar que esté:
className="overflow-x-auto"

// Y el contenedor interior:
className="flex gap-4"
```

### Las estrellas no se ven

**Solución:**
```tsx
// Verificar que fill="currentColor" esté presente
// Y que text-yellow-400 esté aplicado
```

### Los botones de navegación no aparecen

**Solución:**
```tsx
// Los botones solo se muestran en desktop (lg:block)
// En mobile y tablet, las cards se muestran en grid o scroll
```

### El carrusel no se desliza suavemente

**Solución:**
```tsx
// Verificar las clases de transición:
className="transition-transform duration-500 ease-in-out"

// Y que el transform esté correcto:
style={{ transform: `translateX(-${currentIndex * (100 / 4 + 1.5)}%)` }}
```

### El auto-play no funciona

**Solución:**
```tsx
// Verificar que tengas más de 4 testimonios
// El auto-play solo funciona si hay más cards que las visibles

// Si tienes 4 o menos testimonios, el auto-play no se activa
testimonios.length > 4  // Requerido para auto-play
```

### El auto-play no se pausa al hacer hover

**Solución:**
```tsx
// Verificar que pauseOnHover esté en true (default)
<SectionTestimoniosMiradorDeLuz 
  client:load
  pauseOnHover={true}  // Debe ser true
/>

// Verificar que los eventos de mouse estén en el contenedor correcto
onMouseEnter={handleMouseEnter}
onMouseLeave={handleMouseLeave}
```

---

## 🚀 Performance

### Optimizaciones
- ✅ Lazy loading de avatares (agregar si necesario)
- ✅ Truncar comentarios muy largos
- ✅ Virtualización para muchos testimonios
- ✅ CSS puro para animaciones

### Limitar Comentarios Largos

```tsx
const comentarioCorto = testimonio.comentario.length > 150 
  ? testimonio.comentario.substring(0, 150) + '...'
  : testimonio.comentario;
```

---

## 🎯 Mejoras Futuras

Ideas para extender:

- [x] Carrusel con navegación (implementado)
- [x] Auto-play del carrusel (implementado)
- [x] Pausa en hover (implementado)
- [ ] Indicadores de página (dots)
- [ ] Filtros por rating
- [ ] Animación de entrada
- [ ] "Leer más" para comentarios largos
- [ ] Botón "Verificado" para testimonios reales
- [ ] Integración directa con Google Reviews API
- [ ] Paginación o "Cargar más"
- [ ] Sistema de likes/útil
- [ ] Navegación con teclado (flechas)

---

## 📈 Métricas Visuales

- **Padding sección**: 16-20 (4-5rem)
- **Gap entre cards**: 24px (1.5rem)
- **Padding card**: 24px (1.5rem) desktop, 16px mobile
- **Avatar size**: 40x40px
- **Rating stars grande**: 32x32px
- **Rating stars pequeño**: 16x16px
- **Bordes card**: rounded-xl (12px)
- **Sombra**: shadow-md → shadow-lg hover

---

## 🎨 Colores Usados

```css
/* Fondo */
bg-stone-50          /* Beige muy suave */

/* Cards */
bg-white             /* Blanco */
border-gray-100      /* Borde sutil */
shadow-md            /* Sombra media */

/* Texto */
text-gray-900        /* Negro suave (nombres) */
text-gray-700        /* Gris oscuro (comentarios) */
text-gray-500        /* Gris medio (fechas) */

/* Estrellas */
text-yellow-400      /* Dorado */
text-gray-300        /* Gris claro (vacías) */

/* Botón */
border-gray-900      /* Borde negro */
hover:bg-gray-100    /* Hover gris claro */
```

---

## 📚 Recursos Externos

### APIs de Reviews
- Google Places API
- Trustpilot API
- Booking.com Reviews
- TripAdvisor API

### Generadores de Avatares
- [Pravatar](https://pravatar.cc/)
- [UI Avatars](https://ui-avatars.com/)
- [DiceBear](https://www.dicebear.com/)
- [Avatars.io](https://avatars.io/)

---

**Última actualización**: 19/11/2024  
**Versión**: 1.0.0

