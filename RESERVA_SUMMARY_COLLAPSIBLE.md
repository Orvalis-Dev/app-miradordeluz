# Componente ReservaSummary - Colapsable (v3)

## Cambios Implementados

### 📱 Comportamiento Mobile

**Estado Colapsado (por defecto):**
- Solo muestra el **precio/noche**
- Incluye una **flechita ↓** para expandir
- Ocupa mínimo espacio en la parte inferior
- Fondo blanco con bordes redondeados en la parte superior

**Estado Expandido:**
- Al hacer click en la flechita → Se despliega todo el formulario
- Se muestra:
  - Precio/noche
  - Check-in (calendar picker)
  - Check-out (calendar picker)
  - Selector de huéspedes
  - Resumen de precios (Total, Seña 50%, Saldo)
  - Botón "Verificar disponibilidad"

### 💻 Comportamiento Desktop (lg breakpoint)

- **Siempre expandido** (no hay estado colapsado)
- Se mantiene **sticky** en la parte superior (`top-24`)
- Ancho normal del panel lateral
- Funciona igual que antes

## Estructura Técnica

### Estado React

```typescript
const [isExpanded, setIsExpanded] = useState<boolean>(false);
```

### Estructura HTML

```html
<div class="fixed lg:static bottom-0 left-0 right-0 lg:sticky lg:top-24">
  <!-- Header: Precio + Flechita (solo en mobile) -->
  <button class="w-full bg-white rounded-t-2xl p-4 shadow-lg flex items-center justify-between lg:hidden">
    <!-- Precio -->
    <!-- Flechita (rotatable) -->
  </button>

  <!-- Contenido: Formulario completo (colapsable en mobile) -->
  <div class="transition-all duration-300 lg:block max-h-0 lg:max-h-screen isExpanded ? max-h-screen">
    <!-- Formulario completo -->
  </div>
</div>
```

### Clases Tailwind Clave

| Propiedad | Desktop | Mobile |
|-----------|---------|--------|
| Posicionamiento | `lg:sticky lg:top-24` | `fixed bottom-0` |
| Visibilidad | Siempre visible | Colapsable |
| Header | `hidden lg:block` | `lg:hidden` |
| Contenido | `lg:block max-h-screen` | `max-h-0 / max-h-screen` |
| Altura | Normal | Animada (300ms) |

### Animaciones

**Flechita (Chevron):**
```typescript
className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
```
- ✅ Rota 180° cuando se expande
- ✅ Transición suave (300ms)

**Contenido:**
```typescript
className={`overflow-hidden transition-all duration-300 ${
  isExpanded ? "max-h-screen" : "max-h-0 lg:max-h-screen"
}`}
```
- ✅ `max-h-0` → Colapsado (oculto)
- ✅ `max-h-screen` → Expandido (visible)
- ✅ `overflow-hidden` → Evita que se vea contenido cortado

## Padding Inferior

Se agregó padding inferior a la página en mobile:
```html
<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start pb-32 lg:pb-0">
```

**Efecto:**
- En mobile: `pb-32` (128px) para que el contenido no quede cubierto por el panel
- En desktop: `lg:pb-0` (sin padding extra)

## Flujo de Interacción

### Mobile
1. **Usuario ve**: Precio (85.000/noche) + Flechita ↓
2. **Usuario toca flechita**: Panel se expande ↑
3. **Usuario ingresa**: Check-in, Check-out, Huéspedes
4. **Panel muestra**: Total, Seña, Saldo
5. **Usuario toca**: "Verificar disponibilidad"

### Desktop
1. Usuario ve todo el panel siempre visible
2. Comportamiento sin cambios

## Testing

```
✅ Mobile (< 1024px):
   - Al cargar: Solo precio visible con flechita
   - Click en flechita: Expande con animación suave
   - Click nuevamente: Se colapsa
   - Contenido no cubierto: pb-32 funciona

✅ Desktop (≥ 1024px):
   - Panel siempre visible (sticky)
   - Flechita no visible (lg:hidden)
   - Comportamiento normal
```

## Archivos Modificados

- ✅ `src/components/react/ReservaSummary.tsx`
- ✅ `src/pages/reservas.astro` (agregado `pb-32`)

## Beneficios UX

- 📱 **Mobile-first**: No ocupa espacio innecesario
- 🎯 **Focus**: Usuario enfocado en descripción/amenidades primero
- 🎨 **Elegante**: Animaciones suaves y transiciones
- ♿ **Accesible**: Botones clickeables, aria-labels
- 🚀 **Performance**: Transiciones CSS (no JS intensivo)







