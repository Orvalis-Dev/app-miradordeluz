# 🏔️ Hero Mirador de Luz - Documentación

## Componente React Hero para Complejo de Cabañas

Componente completo y reutilizable para la sección Hero de un sitio web de cabañas turísticas.

---

## 📦 Instalación

El componente ya está creado en:
```
src/components/react/HeroMiradorDeLuz.tsx
```

---

## 🚀 Uso Básico

### En una página Astro:

```astro
---
import Layout from '../layouts/Layout.astro';
import HeroMiradorDeLuz from '../components/react/HeroMiradorDeLuz';
---

<Layout title="Inicio">
  <HeroMiradorDeLuz client:load />
</Layout>
```

### Ver ejemplo completo:

```
http://localhost:4321/ejemplo-hero
```

---

## ⚙️ Props Configurables

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `titulo` | string | "MIRADOR DE LUZ" | Título principal grande |
| `subtitulo` | string | "COMPLEJO DE CABAÑAS" | Subtítulo pequeño superior |
| `descripcion` | string | "Descansá entre..." | Frase descriptiva |
| `imagenFondo` | string | URL de Unsplash | URL de la imagen de fondo |
| `colorPrimario` | string | "emerald" | Color principal (Tailwind) |
| `colorSecundario` | string | "amber" | Color secundario |
| `colorAccent` | string | "orange" | Color de acento |
| `onSearch` | function | undefined | Callback al buscar reserva |

---

## 📝 Ejemplo con Props Personalizadas

```tsx
<HeroMiradorDeLuz 
  client:load
  titulo="TU REFUGIO EN LAS SIERRAS"
  subtitulo="CABAÑAS DE MONTAÑA"
  descripcion="Experimentá la naturaleza en su máximo esplendor"
  imagenFondo="/images/hero-custom.jpg"
  onSearch={(datos) => {
    console.log('Reserva solicitada:', datos);
    // Redirigir o abrir modal
    window.location.href = `/reservar?adultos=${datos.adultos}&ninos=${datos.ninos}`;
  }}
/>
```

---

## 🎨 Características del Diseño

### Navbar Superior
- ✅ Logo "Mirador de Luz"
- ✅ Selector de idioma (ESP/ENG)
- ✅ Botón "Reservas" con gradiente naranja/amarillo
- ✅ Iconos circulares de redes sociales (Instagram, WhatsApp, Ubicación)
- ✅ Menú hamburguesa
- ✅ Responsive: simplificado en móvil

### Contenido Central
- ✅ Subtítulo en mayúsculas con tracking ancho (color amarillo)
- ✅ Título principal muy grande y bold (blanco)
- ✅ Descripción/frase descriptiva (blanco suave)
- ✅ Animaciones y transiciones suaves

### Buscador de Reservas
- ✅ Contenedor blanco con bordes redondeados
- ✅ Sombra elegante
- ✅ **4 secciones**:
  1. **Fechas**: Input de fecha (check-in/check-out) con ícono calendario
  2. **Adultos**: Contador con botones +/- (mínimo 1)
  3. **Niños**: Contador con botones +/- (mínimo 0)
  4. **Botón Reservar**: Verde con gradiente
- ✅ Layout horizontal en desktop
- ✅ Layout vertical en mobile

### Paleta de Colores
- 🟢 **Verde (Emerald)**: Botones principales, detalles naturales
- 🟡 **Amarillo (Amber)**: Highlights, subtítulos, hover states
- 🟠 **Naranja (Orange)**: Botón de reservas, gradientes cálidos
- ⚪ **Blanco**: Textos principales sobre el overlay
- ⚫ **Negro/50% opacity**: Overlay para legibilidad

---

## 📱 Responsividad

### Desktop (> 1024px)
- Navbar completo con todos los elementos
- Buscador horizontal con separadores verticales
- Título muy grande (text-8xl)

### Tablet (768px - 1024px)
- Navbar simplificado
- Buscador horizontal compacto
- Título grande (text-7xl)

### Mobile (< 768px)
- Solo logo y hamburguesa en navbar
- Buscador vertical con secciones apiladas
- Botón "Reservar" full-width
- Título mediano (text-5xl)

---

## 🎯 Estados Interactivos

### Estados Internos del Componente

```typescript
const [adultos, setAdultos] = useState(2);     // Contador de adultos (min: 1)
const [ninos, setNinos] = useState(0);         // Contador de niños (min: 0)
const [idioma, setIdioma] = useState('ESP');   // Idioma actual
const [fechaInicio, setFechaInicio] = useState('');  // Check-in
const [fechaFin, setFechaFin] = useState('');        // Check-out
```

### Handler de Búsqueda

Al hacer clic en "Reservar":

```typescript
const handleSearch = () => {
  const datos = {
    fechaInicio,
    fechaFin,
    adultos,
    ninos,
  };
  
  console.log('Búsqueda de reserva:', datos);
  
  if (onSearch) {
    onSearch(datos);
  }
};
```

---

## 🔧 Personalización Avanzada

### Cambiar la Imagen de Fondo

```tsx
<HeroMiradorDeLuz 
  client:load
  imagenFondo="/images/mi-cabana.jpg"
/>
```

**Imágenes recomendadas:**
- Resolución mínima: 1920x1080px
- Formato: JPG o WebP optimizado
- Temática: Naturaleza, bosque, montaña, lago

### Integrar con un Sistema de Reservas Real

```tsx
<HeroMiradorDeLuz 
  client:load
  onSearch={async (datos) => {
    try {
      // Llamar a tu API
      const response = await fetch('/api/verificar-disponibilidad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      });
      
      const resultado = await response.json();
      
      if (resultado.disponible) {
        // Redirigir a checkout
        window.location.href = `/checkout?reserva=${resultado.id}`;
      } else {
        // Mostrar mensaje de no disponibilidad
        alert('Lo sentimos, no hay disponibilidad para esas fechas');
      }
    } catch (error) {
      console.error('Error al buscar disponibilidad:', error);
    }
  }}
/>
```

### Cambiar Colores del Tema

Actualmente el componente usa colores de Tailwind CSS. Para cambiar:

**Opción 1**: Editar el archivo directamente y cambiar las clases:
- `emerald-600` → `teal-600`
- `amber-300` → `yellow-300`
- `orange-500` → `red-500`

**Opción 2**: Extender Tailwind config para colores custom:

```javascript
// tailwind.config.mjs
export default {
  theme: {
    extend: {
      colors: {
        'mirador-verde': '#047857',
        'mirador-amarillo': '#FBBF24',
        'mirador-naranja': '#F59E0B',
      }
    }
  }
}
```

---

## 🎨 Íconos de Redes Sociales

El componente incluye íconos inline (SVG). Puedes:

### Opción 1: Usar React Icons (Recomendado)

```bash
npm install react-icons
```

```tsx
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
```

### Opción 2: Mantener los SVG inline (ya implementado)

Los íconos actuales son SVG nativos, no requieren dependencias adicionales.

---

## ♿ Accesibilidad

El componente incluye:

- ✅ `aria-label` en todos los botones interactivos
- ✅ Estados `disabled` visualmente distinguibles
- ✅ Contraste adecuado de colores (WCAG AA)
- ✅ Navegación por teclado funcional
- ✅ Semántica HTML correcta

---

## 🐛 Troubleshooting

### El componente no se ve

**Problema**: Pantalla en blanco o error de hidratación

**Solución**:
```astro
<!-- Asegúrate de usar client:load -->
<HeroMiradorDeLuz client:load />
```

### Los colores no se aplican

**Problema**: Las clases de Tailwind no se generan

**Solución**:
1. Verifica que Tailwind esté configurado
2. Reinicia el servidor de desarrollo
3. Limpia cache: `rm -rf .astro`

### La imagen de fondo no carga

**Problema**: URL de imagen inválida o CORS

**Solución**:
- Usa imágenes locales en `/public/images/`
- O URLs públicas de servicios como Unsplash
- Verifica que la URL sea accesible

---

## 📚 Recursos Adicionales

### Imágenes de Stock Gratuitas

- [Unsplash](https://unsplash.com/s/photos/cabin-nature)
- [Pexels](https://www.pexels.com/search/mountain-cabin/)
- [Pixabay](https://pixabay.com/images/search/cabin/)

**Búsquedas recomendadas:**
- "mountain cabin"
- "forest house"
- "nature lodge"
- "wooden cabin sunset"

### Paletas de Colores Naturales

```css
/* Bosque y naturaleza */
Verde oscuro: #047857 (emerald-700)
Verde medio: #10B981 (emerald-500)
Verde claro: #D1FAE5 (emerald-100)

/* Atardecer y calidez */
Naranja: #F59E0B (amber-500)
Amarillo: #FBBF24 (amber-400)
Dorado: #FCD34D (amber-300)

/* Tierra y madera */
Marrón: #78350F (amber-900)
Beige: #FEF3C7 (amber-50)
```

---

## 🚀 Próximos Pasos

1. **Ver el componente en acción**:
   ```
   http://localhost:4321/ejemplo-hero
   ```

2. **Reemplazar la imagen de fondo**:
   - Agrega tu imagen en `/public/images/hero-mirador.jpg`
   - Actualiza la prop: `imagenFondo="/images/hero-mirador.jpg"`

3. **Integrar con tu API de reservas**:
   - Implementa el callback `onSearch`
   - Conecta con tu backend Laravel

4. **Personalizar colores y textos**:
   - Ajusta las props según tu marca
   - Modifica el navbar con tus redes sociales

---

## 📄 Licencia

Componente creado para el proyecto Mirador de Luz.

---

**Última actualización**: 19/11/2024  
**Versión**: 1.0.0

