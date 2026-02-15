# CONTEXTO TÉCNICO: Implementación de Métricas en Orvalis/Mirador

## Información del Proyecto
- **Agencia:** Orvalis Studio.
- **Proyecto:** Mirador de Luz (miradordeluz.com).
- **Stack Tecnológico:** Astro (Static Site Generation) + React (UI Components).
- **Objetivo:** Implementar Google Analytics 4 (GA4) y medición de conversión personalizada.

## Requerimientos Técnicos
1. **Script Global (GA4):**
   - Debe inyectarse en el `<head>` del Layout principal (`src/layouts/Layout.astro` o similar).
   - Debe ser asíncrono y no bloquear el renderizado crítico.
   - El ID de medición (`G-XXXXXXXXXX`) debe ser configurable (idealmente vía variables de entorno o constante).

2. **Componente de Conversión (React):**
   - Necesitamos un componente reutilizable `WhatsAppButton`.
   - **Funcionalidad:** Al hacer click, debe disparar un evento a GA4 (`gtag('event', ...)`) antes de redirigir a WhatsApp.
   - **Evento:** Nombre del evento `click_whatsapp`.
   - **Safety:** Debe verificar que `window.gtag` exista antes de disparar para evitar errores en bloqueadores de anuncios o desarrollo local.

3. **Integración en Astro:**
   - El componente de React debe ser hidratado correctamente usando la directiva `client:load` o `client:visible` para que el evento `onClick` funcione.