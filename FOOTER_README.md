# 🦶 Footer Mirador de Luz - Documentación

## Componente de Footer Profesional

Footer completo con 3 columnas, información de contacto, navegación, formulario de suscripción y botón scroll-to-top.

---

## 📦 Ubicación

```
src/components/react/FooterMiradorDeLuz.tsx
```

---

## 🚀 Uso Básico

### En una página Astro:

```astro
---
import FooterMiradorDeLuz from '../components/react/FooterMiradorDeLuz';
---

<FooterMiradorDeLuz client:load />
```

### Ver ejemplo:

```
http://localhost:4321/ejemplo-footer
```

---

## ⚙️ Props Configurables

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `logoTexto` | string | "Mirador de Luz" | Texto del logo |
| `direccion` | string | Dirección default | Dirección física (multi-línea con `\n`) |
| `telefono` | string | "+54 (381) 448-6700" | Número de teléfono |
| `email` | string | "reservas@miradordeluz.com" | Email de contacto |
| `redesSociales` | RedSocial[] | Array default | Redes sociales |
| `linksNavegacion` | LinkNavegacion[] | Array default | Links del menú |
| `mostrarFormularioSuscripcion` | boolean | true | Mostrar/ocultar form |
| `onSubscribe` | function | undefined | Callback del formulario |
| `mostrarScrollTop` | boolean | true | Mostrar botón scroll-top |
| `textoDerechos` | string | Copyright auto | Texto de copyright |
| `logosPartners` | Array | [] | Logos de partners |

---

## 📝 Tipos TypeScript

### RedSocial

```typescript
interface RedSocial {
  nombre: 'instagram' | 'linkedin' | 'whatsapp' | 'ubicacion';
  url: string;
}
```

### LinkNavegacion

```typescript
interface LinkNavegacion {
  texto: string;
  url: string;
}
```

### LogoPartner

```typescript
interface LogoPartner {
  nombre: string;
  url?: string;
}
```

---

## 🎨 Diseño del Footer

### **Layout de 3 Columnas**

```
┌─────────────────────────────────────────────────┐
│  Fondo degradado oscuro (gray-800 → gray-900)   │
│                                                 │
│  ┌──────────┬──────────────┬────────────────┐  │
│  │ Columna 1│  Columna 2   │   Columna 3    │  │
│  ├──────────┼──────────────┼────────────────┤  │
│  │ Logo     │ Ubicación    │ Explorar       │  │
│  │          │              │                │  │
│  │ Política │ Dirección    │ • Home         │  │
│  │          │              │ • Cabañas      │  │
│  │          │ Teléfono     │ • Servicios    │  │
│  │          │              │ ...            │  │
│  │          │ Email        │                │  │
│  │          │              │ ───────────    │  │
│  │          │ 🔗 Redes     │ Suscripción    │  │
│  │          │              │ [Nombre]       │  │
│  │          │              │ [Email]        │  │
│  │          │              │ [Registrarme]  │  │
│  └──────────┴──────────────┴────────────────┘  │
│                                                 │
│  ───────────────────────────────────────────   │
│  © 2025 Mirador     [Logos Partners]      ↑   │
└─────────────────────────────────────────────────┘
```

---

## 🎨 Características del Diseño

### 1. **Columna 1: Logo + Política**
- Logo/Nombre en texto grande y bold
- Link a "Política de Sustentabilidad"
- Colores: blanco para logo, gris claro para link
- Hover: link cambia a verde

### 2. **Columna 2: Ubicación + Contacto**
- Título "Ubicación"
- Dirección multi-línea
- Teléfono clickeable (tel:)
- Email clickeable (mailto:)
- Íconos de redes sociales
- Colores destacados: amarillo para contactos

### 3. **Columna 3: Explorar + Suscripción**

**Sección Explorar:**
- Lista vertical de links de navegación
- Hover: verde
- Espaciado uniforme

**Formulario de Suscripción:**
- 2 inputs: Nombre y Email
- Fondo oscuro con borde claro
- Placeholder gris
- Botón amarillo/naranja
- Texto informativo pequeño

### 4. **Franja Inferior**
- Borde superior sutil
- Copyright a la izquierda
- Logos de partners a la derecha
- Responsive: columna en mobile

### 5. **Botón Scroll to Top**
- Posición fija (bottom-right)
- Circular con ícono de flecha
- Hover: cambio de color y escala
- Smooth scroll animado

---

## 📝 Ejemplos de Uso

### Ejemplo 1: Uso Básico

```astro
<FooterMiradorDeLuz client:load />
```

Usa todos los valores por defecto.

---

### Ejemplo 2: Personalizar Información de Contacto

```tsx
<FooterMiradorDeLuz 
  client:load
  direccion="Ruta Provincial N° 307, Km 58
Tafí del Valle, Tucumán, Argentina"
  telefono="+54 (381) 448-6700"
  email="info@miradordeluz.com"
/>
```

---

### Ejemplo 3: Redes Sociales Personalizadas

```tsx
<FooterMiradorDeLuz 
  client:load
  redesSociales={[
    { nombre: 'instagram', url: 'https://instagram.com/miradordeluz' },
    { nombre: 'whatsapp', url: 'https://wa.me/5493814486700' },
    { nombre: 'ubicacion', url: 'https://maps.google.com/?q=Mirador+de+Luz' },
  ]}
/>
```

---

### Ejemplo 4: Links de Navegación Personalizados

```tsx
<FooterMiradorDeLuz 
  client:load
  linksNavegacion={[
    { texto: 'Inicio', url: '/' },
    { texto: 'Cabañas', url: '/cabanas' },
    { texto: 'Galería', url: '/galeria' },
    { texto: 'Experiencias', url: '/experiencias' },
    { texto: 'Contacto', url: '/contacto' },
  ]}
/>
```

---

### Ejemplo 5: Con Callback de Suscripción

```tsx
<FooterMiradorDeLuz 
  client:load
  onSubscribe={(nombre, email) => {
    // Enviar a API
    fetch('/api/suscripciones', {
      method: 'POST',
      body: JSON.stringify({ nombre, email }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    // Mostrar confirmación
    alert(`¡Gracias ${nombre}! Te suscribiste con ${email}`);
  }}
/>
```

---

### Ejemplo 6: Con Logos de Partners

```tsx
<FooterMiradorDeLuz 
  client:load
  logosPartners={[
    { nombre: 'Digital Córdoba', url: 'https://...' },
    { nombre: 'Cámara de Turismo' },
    { nombre: 'AFNC', url: 'https://...' },
  ]}
/>
```

---

### Ejemplo 7: Sin Formulario de Suscripción

```tsx
<FooterMiradorDeLuz 
  client:load
  mostrarFormularioSuscripcion={false}
/>
```

---

### Ejemplo 8: Sin Botón Scroll to Top

```tsx
<FooterMiradorDeLuz 
  client:load
  mostrarScrollTop={false}
/>
```

---

## 🎨 Paleta de Colores

```css
/* Fondo */
bg-gradient-to-b from-gray-800 to-gray-900

/* Textos */
text-white                /* Títulos y textos principales */
text-gray-300            /* Textos secundarios */
text-gray-400            /* Textos auxiliares */

/* Acentos */
text-yellow-400          /* Teléfono y email */
text-green-400           /* Hover en links */

/* Formulario */
bg-gray-700              /* Inputs background */
border-gray-500          /* Inputs border */
bg-yellow-500            /* Botón */

/* Botón Scroll Top */
bg-gray-700              /* Normal */
bg-yellow-500            /* Hover */
```

---

## 📱 Responsividad

### Desktop (≥ 768px)
```
┌──────────┬──────────────┬────────────────┐
│ Columna 1│  Columna 2   │   Columna 3    │
└──────────┴──────────────┴────────────────┘
```
Grid de 3 columnas con gap grande

### Mobile (< 768px)
```
┌────────────────────┐
│    Columna 1       │
├────────────────────┤
│    Columna 2       │
├────────────────────┤
│    Columna 3       │
└────────────────────┘
```
Columnas apiladas verticalmente

---

## 🔧 Integración con Backend

### Conectar Formulario de Suscripción

```astro
---
import FooterMiradorDeLuz from '../components/react/FooterMiradorDeLuz';

const handleSuscripcion = async (nombre: string, email: string) => {
  try {
    const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/api/suscripciones`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email }),
    });
    
    if (response.ok) {
      alert('¡Suscripción exitosa!');
    }
  } catch (error) {
    console.error('Error en suscripción:', error);
  }
};
---

<FooterMiradorDeLuz 
  client:load
  onSubscribe={handleSuscripcion}
/>
```

---

## 🌟 Íconos de Redes Sociales

### Incluidos en el Componente

- ✅ **Instagram**: Logo completo SVG
- ✅ **LinkedIn**: Logo completo SVG
- ✅ **WhatsApp**: Logo completo SVG
- ✅ **Ubicación**: Pin de mapa SVG
- ✅ **Scroll Top**: Flecha hacia arriba SVG

### Estilos de los Íconos

```css
- Tamaño: w-6 h-6
- Color base: blanco
- Hover: amarillo (text-yellow-400)
- Transición suave
```

---

## 💡 Casos de Uso

### 1. **Landing Page Completa**

```astro
<Layout>
  <Header />
  <HeroMiradorDeLuz client:load />
  <SectionUbicacionMiradorDeLuz client:load />
  <SectionCabanasMiradorDeLuz client:load />
  <SectionTestimoniosMiradorDeLuz client:visible />
  <FooterMiradorDeLuz client:load />
</Layout>
```

---

### 2. **Página Interna**

```astro
<Layout>
  <Header />
  <main>
    <!-- Contenido de la página -->
  </main>
  <FooterMiradorDeLuz client:load />
</Layout>
```

---

### 3. **Con Google Analytics en Formulario**

```tsx
<FooterMiradorDeLuz 
  client:load
  onSubscribe={(nombre, email) => {
    // Enviar evento a Google Analytics
    if (window.gtag) {
      window.gtag('event', 'suscripcion', {
        event_category: 'newsletter',
        event_label: email,
      });
    }
    
    // Enviar a backend
    // ...
  }}
/>
```

---

## 🎨 Personalización Avanzada

### Cambiar Color del Botón de Suscripción

```tsx
// En el código, buscar:
className="bg-yellow-500 hover:bg-yellow-600"

// Cambiar a:
className="bg-green-500 hover:bg-green-600"   // Verde
className="bg-orange-500 hover:bg-orange-600" // Naranja
```

---

### Agregar Más Redes Sociales

Para agregar nuevos íconos, extender la función `getIconoRed`:

```tsx
const getIconoRed = (nombre: string) => {
  switch (nombre) {
    case 'facebook':
      return <FacebookIcon />;
    case 'twitter':
      return <TwitterIcon />;
    // ... casos existentes
  }
};
```

---

### Cambiar Degradado del Fondo

```tsx
// Actual:
className="bg-gradient-to-b from-gray-800 to-gray-900"

// Opciones:
className="bg-gradient-to-b from-gray-700 to-gray-800"  // Más claro
className="bg-gradient-to-b from-slate-800 to-slate-900" // Slate
className="bg-gray-900"                                   // Sólido
```

---

## ♿ Accesibilidad

✅ Links con texto descriptivo  
✅ Inputs con placeholders claros  
✅ Botones con `aria-label`  
✅ Contraste WCAG AA+  
✅ Navegación por teclado  
✅ Links externos con `rel="noopener noreferrer"`  

---

## 🐛 Troubleshooting

### El botón scroll-to-top no aparece

**Solución:**
```tsx
// Verificar que la prop esté en true
<FooterMiradorDeLuz 
  client:load
  mostrarScrollTop={true}
/>

// Verificar que haya scroll en la página (altura > viewport)
```

---

### Los íconos de redes no se ven

**Solución:**
```tsx
// Verificar que el nombre sea válido:
redesSociales={[
  { nombre: 'instagram', url: '...' },  // ✅ Correcto
  { nombre: 'ig', url: '...' },         // ❌ Incorrecto
]}
```

---

### El formulario no se envía

**Solución:**
```tsx
// Verificar el callback:
<FooterMiradorDeLuz 
  client:load
  onSubscribe={(nombre, email) => {
    console.log('Datos recibidos:', { nombre, email });
  }}
/>

// Abrir la consola del navegador para ver el log
```

---

### La dirección no hace saltos de línea

**Solución:**
```tsx
// Usar \n para saltos de línea:
direccion="Línea 1\nLínea 2\nLínea 3"

// El componente procesará los \n automáticamente
```

---

## 🚀 Performance

### Optimizaciones Aplicadas

- ✅ Componente React optimizado
- ✅ Estados mínimos (solo formulario)
- ✅ SVGs inline (no cargas externas)
- ✅ Transiciones CSS puras
- ✅ Scroll suave nativo

---

## 📊 Métricas Visuales

- **Padding sección**: py-12 md:py-16 (3-4rem)
- **Gap entre columnas**: 10 / 16 (2.5 / 4rem)
- **Altura botón**: py-2 (0.5rem)
- **Inputs height**: py-2 (0.5rem)
- **Scroll button size**: 48x48px
- **Íconos redes**: 24x24px

---

## 🎯 Mejoras Futuras

Ideas para extender:

- [ ] Newsletter con confirmación por email
- [ ] Mapa interactivo en "Ubicación"
- [ ] Cambio de idioma (i18n)
- [ ] Links a redes con contadores (followers)
- [ ] Formulario de contacto rápido
- [ ] FAQ colapsable en footer
- [ ] Certificaciones y premios

---

## 📚 Recursos Externos

### APIs Útiles

- **Mailchimp API**: Para newsletter
- **SendGrid**: Email transaccional
- **Google Maps API**: Mapa de ubicación
- **WhatsApp Business API**: Chat integrado

---

**Última actualización**: 19/11/2024  
**Versión**: 1.0.0

