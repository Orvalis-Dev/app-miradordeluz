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
