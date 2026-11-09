# Mirador de Luz - Landing Page

Esta es la landing page oficial de **Mirador de Luz**, un complejo de cabañas ubicado en Villa Carlos Paz, Córdoba, con vistas privilegiadas al lago San Roque. El sitio está diseñado para ofrecer una experiencia de usuario fluida, visualmente atractiva y optimizada para conversiones a través de WhatsApp.

##  Tecnologías Utilizadas

- **Astro**: Framework principal para un rendimiento excepcional y generación de sitios estáticos (SSG).
- **React**: Utilizado para componentes interactivos como el sistema de reservas y galerías.
- **Tailwind CSS**: Estilizado moderno y responsivo con la última versión (v4).
- **Framer Motion & GSAP**: Animaciones fluidas para mejorar la experiencia visual.
- **Sharp**: Optimización automática de imágenes.
- **Lucide React & React Icons**: Librerías de iconos modernas.

##  Setup e Instalación

Para inicializar y trabajar en este proyecto, se recomienda el uso de **pnpm**.

### Requisitos Previos

- Node.js (versión 18 o superior)
- pnpm

### Pasos para el Setup

1. **Clonar el repositorio:**
   `ash
   git clone <url-del-repositorio>
   cd app-miradordeluz
   `

2. **Instalar dependencias:**
   `ash
   pnpm install
   `

3. **Iniciar servidor de desarrollo:**
   `ash
   pnpm dev
   `

4. **Construir para producción:**
   `ash
   pnpm build
   `

5. **Previsualizar la build:**
   `ash
   pnpm preview
   `

##  Scripts de Optimización

El proyecto cuenta con scripts personalizados para el manejo de recursos:

- \pnpm run convert:webp\: Convierte todas las imágenes de la carpeta \public/images\ a formato WebP para optimizar el rendimiento.
- \pnpm run rename:images\: Renombra imágenes automáticamente siguiendo un patrón organizado.
- \pnpm run generate:images\: Genera automáticamente el archivo de datos \src/data/images.ts\ basándose en el contenido de la carpeta \public\.

##  Documentación Adicional

Para más detalles sobre la arquitectura, consulta:
- [ESTRUCTURA.md](./ESTRUCTURA.md) - Organización de carpetas y detalles técnicos.

## Solicitudes web del PMS

La página de cada cabaña y la entrada `/reservas` usan la misma consulta al PMS. Configurá `PUBLIC_API_URL` (base pública HTTP en desarrollo; HTTPS en despliegue) y `PUBLIC_BOOKING_TENANT_SLUG` en el entorno de build. No agregues credenciales ni un token de cotización a variables públicas. Orvalis habilita el canal por establecimiento en el backend, con un WhatsApp e instrucciones de transferencia verificados. Sin habilitación, la landing ofrece el enlace de contacto habitual.

La consulta obtiene las unidades y rangos ocupados, solicita el precio vigente al PMS y muestra total y seña antes de pedir los datos. El envío no retiene fechas, no procesa pagos y no confirma la estadía. La constancia muestra referencia, vencimiento e instrucciones de transferencia. Abrir WhatsApp es una acción posterior, no un requisito para registrar ni recuperar la referencia. Esta última constancia se conserva en la sesión de la pestaña sin guardar nombre, documento, teléfono o correo del huésped.

Pruebas del adaptador: `bun test tests/public-booking.test.ts`. Para QA usá una API y un establecimiento de prueba con datos de transferencia ficticios; no envíes mensajes de WhatsApp ni hagas transferencias reales.
