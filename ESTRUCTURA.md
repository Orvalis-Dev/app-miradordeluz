# Estructura del Proyecto y Detalles Técnicos

Este documento detalla la organización de carpetas y las decisiones técnicas tomadas en el desarrollo de **Mirador de Luz**.

## 📂 Organización de Carpetas

- **`/public`**: Contiene todos los recursos estáticos.
  - `/images`: Organizado por categorías (cabaña-1, pileta, exterior, etc.).
  - `/videos`: Recursos de video optimizados.
- **`/src`**: Código fuente del proyecto.
  - **`/components`**:
    - **`/astro`**: Componentes puramente estáticos o de estructura de página.
    - **`/react`**: Componentes interactivos que requieren estado (Reservas, Navbar dinámico, Modales).
  - **`/constants`**: Configuraciones globales del sitio, datos de cabañas y constantes de UI.
  - **`/data`**: Datos autogenerados para las colecciones de imágenes.
  - **`/hooks`**: Hooks personalizados de React para lógica reutilizable.
  - **`/layouts`**: Plantilla base del sitio.
  - **`/pages`**: Rutas del sitio. Incluye rutas dinámicas para cada cabaña y la API.
  - **`/styles`**: Estilos globales usando CSS moderno y Tailwind.
  - **`/utils`**: Funciones de utilidad, formateadores y clientes de API (Google Places).
- **`/scripts`**: Herramientas de automatización para procesamiento de imágenes y generación de datos.

## ⚙️ Detalles Técnicos

### 1. Sistema de Reservas

El sistema de reservas es un componente de React (`ReservaSummary.tsx`) que calcula dinámicamente el precio y los detalles de la estancia, permitiendo al usuario iniciar el proceso directamente hacia WhatsApp con un mensaje preconfigurado.

### 2. Optimización de Imágenes

Se utiliza **Astro Picture** y scripts basados en **Sharp** para asegurar que todas las imágenes servidas estén en formato WebP, con múltiples tamaños (srcset) y Lazy Loading por defecto.

### 3. Animaciones

Se utiliza una combinación de:

- **GSAP**: Para animaciones complejas basadas en scroll y timelines precisos.
- **Framer Motion**: Para interacciones de componentes individuales, micro-interacciones y transiciones de entrada.

### 4. Navegación Inteligente

El `NavbarVisibilityController` gestiona la visibilidad del menú basándose en la posición del scroll y el comportamiento del mouse en la parte superior de la pantalla, mejorando la inmersión del usuario.

### 5. SEO y Performance

- **Core Web Vitals**: Optimizado para obtener puntajes altos en Lighthouse.
- **SEO Automático**: Generación de Open Graph, Twitter Cards y JSON-LD estructural basándose en `SITE_CONFIG`.
