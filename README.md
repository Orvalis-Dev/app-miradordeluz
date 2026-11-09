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

Cada ficha `/reserva/N` fija el calendario y la solicitud a la unidad PMS vinculada a esa ficha. En `/reservas` sin parámetro se puede elegir una unidad habilitada. Configurá `PUBLIC_API_URL` (base pública HTTP en desarrollo; HTTPS en despliegue) y `PUBLIC_BOOKING_TENANT_SLUG` en el entorno de build. No agregues credenciales ni un token de cotización a variables públicas. Orvalis habilita el canal por establecimiento en el backend, con un WhatsApp e instrucciones de transferencia verificados. Sin habilitación, la landing ofrece el enlace de contacto habitual.

Para habilitar las fichas individuales, agregá `PUBLIC_BOOKING_CABIN_IDS` al entorno de build: un objeto JSON de IDs de ficha web a IDs numéricos de unidad en el PMS. Por ejemplo, **sólo para QA**, `PUBLIC_BOOKING_CABIN_IDS='{"1":101,"2":102,"3":103,"4":104}'`. Verificá cada unidad en el establecimiento correcto antes de configurar un despliegue. No hay coincidencia automática por nombre ni por número de ficha. Si el mapa es inválido, falta la entrada de una ficha o la unidad no aparece habilitada, la ficha ofrece contacto y no permite elegir otra unidad.

El calendario usa la fecha local del alojamiento y consulta rangos explícitos de hasta 365 días desde hoy. Sólo permite elegir fechas verificadas por el PMS: las noches no disponibles aparecen en gris, sin indicar motivos. La salida no ocupa una noche; puede coincidir con el comienzo de un período no disponible, pero la estadía no puede atravesarlo. Si la consulta falla no se habilitan fechas desconocidas. La web vuelve a consultar antes de cotizar y antes de un primer envío; el PMS tiene la última palabra y revalida al procesar la solicitud. La cotización vigente del PMS muestra total y seña antes de pedir los datos. El envío no retiene fechas, no procesa pagos y no confirma la estadía. La constancia muestra referencia, vencimiento e instrucciones de transferencia. Abrir WhatsApp es una acción posterior, no un requisito para registrar ni recuperar la referencia. La constancia y los intentos recuperables se guardan en la sesión de la pestaña, separados por unidad en las fichas, sin guardar nombre, documento, teléfono o correo del huésped.

Pruebas del adaptador y del calendario: `bun test`. Para QA usá una API y un establecimiento de prueba con datos de transferencia ficticios; no envíes mensajes de WhatsApp ni hagas transferencias reales.
