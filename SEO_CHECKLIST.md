# Checklist de Optimización SEO – Mirador de Luz

> Documento de referencia para revisar y mejorar el posicionamiento en motores de búsqueda. Última actualización: Diciembre 2025.

---

## Metadatos globales y configuración técnica

- [ ] **`astro.config.mjs` – `site`**

  - [ ] Comprobar que `site` apunta al dominio definitivo (`https://miradordeluz.com`).

- [ ] **Layout HTML base (`Layout.astro`)**

  - [ ] `<html lang="es">` configurado correctamente.
  - [ ] `<meta charset="UTF-8" />` presente.
  - [ ] `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` presente.
  - [ ] `<meta name="description" content="...">` dinámico y no vacío.
  - [ ] `<title>` dinámico por página y con sufijo de marca (`… | Mirador de Luz`).
  - [ ] `<link rel="canonical" href="...">` generado usando `Astro.site + Astro.url.pathname`.
  - [ ] Metatags Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:site_name`, `og:type`) configurados.
  - [ ] Metatags Twitter Card (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:url`) configurados.
  - [ ] Verificar que **`og:image` y `twitter:image` apuntan a una imagen real existente**, no a un video ni a una ruta rota.

- [ ] **Favicon y fuentes**

  - [ ] `<link rel="icon" …>` apunta a un favicon existente.
  - [ ] Cargar fuentes externas (Google Fonts) de forma óptima (preconnect correcto, evitar duplicados).

- [ ] **Sitemap y robots**
  - [ ] Generar `sitemap.xml` (idealmente automático desde Astro/integración).
  - [ ] Crear `robots.txt` con:
    - [ ] `User-agent: *`
    - [ ] `Disallow:` vacío (si no hay áreas a bloquear).
    - [ ] `Sitemap: https://miradordeluz.com/sitemap.xml`.

---

## Metadatos por página (on-page)

Para cada página importante (`/`, `/reservas`, `/galeria`, `/contacto`, futuras páginas):

- [ ] **Home (`/`)**

  - [ ] `title`: "Cabañas en Villa Carlos Paz con vista al lago San Roque – Mirador de Luz"
  - [ ] `description`: Descripción clara del complejo, ubicación y servicios (140–160 caracteres).
  - [ ] `og:image`: Imagen representativa del complejo o lago.

- [ ] **Reservas (`/reservas`)**

  - [ ] `title`: "Reservar Cabañas en Villa Carlos Paz – Mirador de Luz"
  - [ ] `description`: Información sobre disponibilidad, cómo reservar y datos de contacto.
  - [ ] `og:image`: Imagen de una cabaña destacada (no un video).

- [ ] **Galería (`/galeria`)**

  - [ ] `title`: "Galería de Cabañas y Complejo – Mirador de Luz"
  - [ ] `description`: Descripción de fotos del complejo, instalaciones y cabañas.
  - [ ] `og:image`: Una foto destacada de la galería.

- [ ] **Contacto (`/contacto`)**

  - [ ] `title`: "Contacto Mirador de Luz – Cabañas en Villa Carlos Paz"
  - [ ] `description`: Formas de contactarse, ubicación, teléfono y email.
  - [ ] `og:image`: Mapa o foto de la ubicación.

- [ ] **Verificación general de metadatos por página**
  - [ ] Cada `title` es único (sin repetir entre páginas).
  - [ ] Cada `description` es única y persuasiva.
  - [ ] `og:title` y `twitter:title` alineados con el `title`.
  - [ ] `og:description` y `twitter:description` coherentes con la descripción.
  - [ ] `og:image` es una URL de imagen válida (no video).

---

## Estructura de contenidos y headings

- [ ] **Un solo `h1` por página**

  - [ ] **Home**: `h1` con algo como "Cabañas en Villa Carlos Paz con vista al lago San Roque – Mirador de Luz"
  - [ ] **Reservas**: `h1` con "Reservar tu Cabana en Villa Carlos Paz"
  - [ ] **Galería**: `h1` con "Galería de Mirador de Luz"
  - [ ] **Contacto**: `h1` con "Contacto Mirador de Luz"
  - [ ] Ningún `h1` está duplicado en la página.

- [ ] **Estructura jerárquica de headings**

  - [ ] `h2` se usa para secciones principales (`Servicios`, `Ubicación`, `Testimonios`, etc.).
  - [ ] `h3` se usa para subsecciones dentro de secciones.
  - [ ] No hay saltos de niveles (ej: `h1` → `h3` sin `h2`).

- [ ] **Contenido textual suficiente**

  - [ ] **Home**: Mínimo 600–800 palabras distribuidas en secciones sobre:
    - [ ] Descripción del complejo y diferenciales.
    - [ ] Ubicación y qué ofrece Villa Carlos Paz.
    - [ ] Servicios y amenidades.
    - [ ] Tipo de huéspedes ideales.
  - [ ] **Reservas**: Explicación sobre cómo reservar, precios orientativos, políticas.
  - [ ] **Galería**: Descripción de categorías de fotos y el complejo.
  - [ ] **Contacto**: Formulario claro, datos de contacto, mapa de ubicación.

- [ ] **Evitar "thin content"**
  - [ ] Ninguna sección crítica tiene solo una frase genérica.
  - [ ] Hay detalles concretos: capacidad de cabañas, servicios, distancias a puntos clave, etc.

---

## SEO local (negocio físico)

- [ ] **Consistencia NAP (Name, Address, Phone)**

  - [ ] Mismo nombre comercial ("Mirador de Luz") en todo el sitio.
  - [ ] Misma dirección exacta en todas las páginas y fuentes (web, Google Business, etc.).
  - [ ] Mismo número de teléfono en `SITE_CONFIG` y en todas las páginas (sin variaciones de prefijo).
  - [ ] Mismo email de contacto en todas las páginas.
  - [ ] Verificar que coincidan exactamente con Google Business Profile (Google Maps).

- [ ] **Enlaces a Google Maps y reseñas**
  - [ ] Link claro y visible a la ubicación en Google Maps (varias páginas si aplica).
  - [ ] Botón/CTA visible y accesible para "Dejar reseña en Google".
  - [ ] URL de reseña correcta y funcional.

---

## Datos estructurados (schema.org / JSON-LD)

- [ ] **LodgingBusiness / LocalBusiness**

  - [ ] Añadir script JSON-LD en el `<head>` del `Layout.astro` o en la home con tipo `LodgingBusiness`:
    - [ ] `@type`: "LodgingBusiness"
    - [ ] `name`: "Mirador de Luz"
    - [ ] `url`: "https://miradordeluz.com"
    - [ ] `address` (calle, ciudad, región, código postal, país).
    - [ ] `telephone`: Número de teléfono.
    - [ ] `email`: Email de contacto.
    - [ ] `geo`: Latitud y longitud (ya disponibles en `SITE_CONFIG.googleMaps.coordinates`).
    - [ ] `image`: URL de una o varias fotos representativas.
    - [ ] `priceRange`: (ej: `"$"`, `"$$"`, o rango aproximado por noche).
    - [ ] `sameAs`: URLs de redes sociales (Facebook, Instagram).

- [ ] **AggregateRating y reseñas**

  - [ ] Si se muestran reseñas de Google, añadir JSON-LD con `aggregateRating`:
    - [ ] `ratingValue`: Promedio de calificación.
    - [ ] `reviewCount`: Cantidad de reseñas.
  - [ ] (Opcional) Incluir algunas reseñas destacadas con tipo `Review`.

- [ ] **BreadcrumbList**

  - [ ] Definir breadcrumbs visuales en páginas secundarias (`Home > Reservas`, `Home > Galería`, etc.).
  - [ ] Añadir JSON-LD `BreadcrumbList` para estas rutas.

- [ ] **FAQPage (si se implementa)**
  - [ ] Crear una sección de preguntas frecuentes (en home o reservas) con dudas tipo:
    - [ ] ¿Cuál es el horario de check-in/out?
    - [ ] ¿Se permiten mascotas?
    - [ ] ¿Cuál es la política de cancelación?
    - [ ] ¿Hay WiFi incluido?
    - [ ] ¿Qué actividades hay cerca?
  - [ ] Añadir JSON-LD `FAQPage` con las Q&A correspondientes.

---

## Imágenes y multimedia

- [ ] **Formato y peso**

  - [ ] Usar formatos optimizados (WebP o similar) para imágenes principales.
  - [ ] Comprimir imágenes para reducir peso sin perder calidad perceptible.
  - [ ] Definir tamaños explícitos (ancho × alto) para imágenes importantes.

- [ ] **Atributos `alt` descriptivos**

  - [ ] Todas las imágenes relevantes tienen `alt` que describa la escena y el valor.
  - [ ] Ejemplos correctos:
    - [ ] "Pileta con vista al lago San Roque en Mirador de Luz"
    - [ ] "Cabaña Los Pinos con jardín en Villa Carlos Paz"
    - [ ] "Interior de cabaña con TV LED y aire acondicionado"
  - [ ] No usar `alt` genéricos como "imagen" o "foto".
  - [ ] `alt=""` solo en imágenes decorativas que no aportan información.

- [ ] **Dimensiones y CLS (Cumulative Layout Shift)**

  - [ ] Definir tamaño o relación de aspecto (aspect-ratio) para evitar saltos de layout.
  - [ ] Héroes y galerías definen alturas explícitas o `aspect-ratio`.
  - [ ] Imágenes responsivas usan `sizes` o breakpoints adecuados.

- [ ] **Videos**

  - [ ] No usar videos como `og:image` (solo imágenes estáticas).
  - [ ] Videos de fondo (hero intermedio) cargan de forma que no bloqueen el LCP.
  - [ ] Los videos están en posiciones inferiores del viewport (no en el primer "fold").
  - [ ] Videos con `loading="lazy"` u optimizaciones de performance.

- [ ] **Migración de imágenes a locales (futuro)**
  - [ ] Plan de reemplazar imágenes de Unsplash con fotos propias del complejo.
  - [ ] Crear una carpeta en `public/images/` para fotos de cabañas, servicios, etc.

---

## Performance y Core Web Vitals

- [ ] **Auditoría de componentes React**

  - [ ] Revisar componentes con `client:load` en la home:
    - [ ] `NavbarMiradorDeLuz` → evaluar si puede ser `client:visible` o `client:idle`.
    - [ ] `HeroMiradorDeLuz` → el texto podría ser Astro; solo React para buscador si es interactivo.
    - [ ] `ScrollAnimations` → depende de GSAP; si es crítico, dejar en `client:load`.
    - [ ] Otras secciones → cambiar a `client:visible` o `client:idle`.
  - [ ] Documentar justificación de cada `client:*` directive.

- [ ] **LCP (Largest Contentful Paint)**

  - [ ] [ ] La imagen o bloque principal del hero carga en < 2.5s.
  - [ ] [ ] Imagen del hero está optimizada (WebP, tamaño adecuado).
  - [ ] [ ] Considerar `preload` para la imagen hero principal.
  - [ ] [ ] No hay JS pesado bloqueando el render inicial.

- [ ] **FID / INP (Interactividad)**

  - [ ] [ ] Minimizar JS en el bundle inicial.
  - [ ] [ ] No ejecutar lógica innecesaria en cliente en el primer render.
  - [ ] [ ] Formularios e interacciones responden en < 100ms.

- [ ] **CLS (Cumulative Layout Shift)**

  - [ ] [ ] Evitar cambios de tamaño tardíos (tipografía, imágenes sin tamaño, anuncios).
  - [ ] [ ] Imágenes tienen `width` y `height` definidos.
  - [ ] [ ] Modales y pop-ups no causan desplazamientos inesperados.

- [ ] **Medición con Lighthouse**

  - [ ] [ ] Ejecutar Lighthouse en mobile y desktop (en Chrome DevTools o PageSpeed Insights).
  - [ ] [ ] Apuntar a > 90 en Performance.
  - [ ] [ ] Apuntar a > 95 en SEO.
  - [ ] [ ] Documentar problemas encontrados y priorizar fixes.
  - [ ] [ ] Re-ejecutar después de optimizaciones para confirmar mejoras.

- [ ] **Testing de rendimiento**
  - [ ] [ ] Probar sitio en conexión 3G lento (Chrome DevTools → Throttling).
  - [ ] [ ] Verificar que contenido crítico carga rápido incluso en conexiones lentas.

---

## Enlazado interno y arquitectura

- [ ] **Enlaces internos claros y contextuales**

  - [ ] [ ] Desde el hero y secciones principales hay enlaces hacia `/reservas`, `/galeria`, `/contacto`.
  - [ ] [ ] Usar anchor text descriptivo en lugar de "clic aquí":
    - [ ] Bien: "Ver todas las cabañas en Villa Carlos Paz"
    - [ ] Mal: "clic aquí", "más información"
  - [ ] [ ] Enlaces en textos descriptivos dentro de secciones, no solo en botones.

- [ ] **Arquitectura lógica**

  - [ ] [ ] Páginas más importantes (home, reservas, galería, contacto) están a máximo 1 clic desde el inicio.
  - [ ] [ ] Se evita anidar contenido crítico demasiados niveles abajo.
  - [ ] [ ] Menú de navegación principal incluye links a páginas clave.

- [ ] **URLs limpias y estables**
  - [ ] [ ] Rutas sin parámetros innecesarios para contenido estático (`/reservas`, no `/reservas?foo=1`).
  - [ ] [ ] Evitar cambios de URLs una vez publicadas (o usar redirects 301).
  - [ ] [ ] Plan futuro para rutas detalladas de cabañas tipo `/cabanas/los-pinos` (mejor para SEO que query params).

---

## Accesibilidad (impacto indirecto en SEO)

- [ ] **Navegación por teclado**

  - [ ] [ ] Todos los elementos interactivos (`<button>`, `<a>`, inputs) son alcanzables por `Tab`.
  - [ ] [ ] Orden de tabulación (`tabindex`) es lógico.
  - [ ] [ ] No hay trampas de foco (especialmente en modales como galería).

- [ ] **Roles, aria-labels y aria-describedby**

  - [ ] [ ] Modales (`GaleriaMiradorDeLuz`) tienen `role="dialog"` y `aria-modal="true"`.
  - [ ] [ ] Botones de cerrar y navegación en la galería están etiquetados con `aria-label`.
  - [ ] [ ] Iconos decorativos tienen `aria-hidden="true"`.
  - [ ] [ ] Elementos ocultos visuales usan `aria-label` si son importantes.

- [ ] **Contraste y legibilidad**

  - [ ] [ ] Contraste mínimo 4.5:1 (WCAG AA) en texto sobre fondos (usar herramientas de contraste).
  - [ ] [ ] Botones principales alcanzan contraste 4.5:1 o superior.
  - [ ] [ ] Tamaños de fuente adecuados en mobile (mínimo ~14–16px) y desktop.

- [ ] **Validación de HTML y accesibilidad**
  - [ ] [ ] Ejecutar W3C Validator o herramienta similar para detectar errores HTML.
  - [ ] [ ] Usar herramienta como WAVE o Axe DevTools para revisar accesibilidad general.

---

## Medición continua y contenido futuro

- [ ] **Google Search Console**

  - [ ] [ ] Sitio verificado en Search Console (GSC).
  - [ ] [ ] Sitemap enviado y sin errores críticos.
  - [ ] [ ] Revisar "Informe de cobertura" para detectar páginas no indexadas.
  - [ ] [ ] Monitorear "Métricas web esenciales" (Core Web Vitals).

- [ ] **Google Analytics / Métricas**

  - [ ] [ ] GA4 (o similar) configurado para medir:
    - [ ] Tráfico orgánico.
    - [ ] Páginas más visitadas.
    - [ ] Conversiones (clic a WhatsApp, consultas, reservas).
    - [ ] Dispositivo y ubicación de visitantes.
  - [ ] [ ] Establecer objetivos clave (formulario contacto, clic reservar, etc.).

- [ ] **Rankings y búsquedas clave**

  - [ ] [ ] Monitorear posiciones de keywords principales:
    - [ ] "cabañas villa carlos paz"
    - [ ] "cabañas villa carlos paz con pileta"
    - [ ] "alojamiento carlos paz"
    - [ ] "cabañas lago san roque"
  - [ ] [ ] Usar herramienta gratuita (GSC, Google Alerts) o de pago (SEMrush, Ahrefs) para tracking.

- [ ] **Estrategia de contenido a futuro**

  - [ ] [ ] Plan para crear secciones o artículos tipo guía:
    - [ ] "Qué hacer en Villa Carlos Paz"
    - [ ] "Consejos para alojarse en cabañas"
    - [ ] "Distancias a puntos de interés" (Sierras Chicas, embalse San Roque, etc.).
  - [ ] [ ] Crear un blog o sección de noticias si es viable.
  - [ ] [ ] Añadir más contenido visual (videos, reels en redes, etc.).

- [ ] **Mantenimiento y actualizaciones**
  - [ ] [ ] Revisar y actualizar contenidos clave (precios, servicios, políticas) cada 6–12 meses.
  - [ ] [ ] Re-ejecutar Lighthouse al menos cada 3 meses para detectar degradación de performance.
  - [ ] [ ] Revisar este checklist cada 6–12 meses a la luz de cambios de Google (Core Updates, nuevas métricas, etc.).

---

## Notas sobre implementación

- **Prioridad Alta** (implementar primero para máximo impacto):

  - Metadatos globales y por página bien configurados.
  - SEO local (NAP consistente).
  - JSON-LD de LodgingBusiness.
  - Imágenes optimizadas con `alt` correcto.
  - Performance (Lighthouse > 90 Performance).

- **Prioridad Media** (implementar en iteraciones posteriores):

  - Ampliación de contenido textual (H1, H2, descripciones).
  - Esquemas adicionales (BreadcrumbList, FAQPage, aggregateRating).
  - Mejora de enlazado interno.

- **Prioridad Baja** (optimizaciones a largo plazo):
  - Estrategia de blog / contenido futuro.
  - Rutas dinámicas para cabañas individuales.
  - Internacionalización o multiidioma.

---

**Última revisión**: Diciembre 2025  
**Próxima revisión recomendada**: Junio 2026
