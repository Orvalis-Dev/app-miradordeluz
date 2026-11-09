# Validación local — solicitudes web

Validado en Chromium contra el PMS local (Astro :4338, API :8128), con la integración habilitada únicamente para el establecimiento de QA. Los huéspedes, el número de WhatsApp y los datos bancarios son ficticios. No se abrió WhatsApp ni se hicieron transferencias.

| Evidencia | Verificación |
| --- | --- |
| [01 — Portada, escritorio](01-portada-desktop.png) | La portada, los CTAs de cabañas y la navegación sobrevivieron al merge. Menú visible en el hero y oculto al bajar a cabañas; servicios en cuatro columnas desktop. |
| [02 — Cotización, escritorio](02-cotizacion-desktop.png) | La cabaña de prueba Alerce devuelve ARS 480 por dos noches; seña ARS 192 (40 %), plazo 90 minutos y horarios 15:30/10:30. |
| [03 — Solicitud, escritorio](03-solicitud-desktop.png) | El POST real dio la referencia WEB-C3MPY1SMHCGQ. Muestra instrucciones de transferencia y avisa que no retiene las noches. |
| [04 — Constancia, móvil](04-solicitud-mobile-recargada.png) | Vista de 390 px, sin desborde horizontal. Recargar no pierde la referencia ni exige volver a enviar. |
| [05 — WhatsApp, móvil](05-whatsapp-mobile.png) | La salida a WhatsApp está separada de la creación y el huésped puede copiar la referencia si no abre. |
| [06 — Cotización, móvil](06-cotizacion-mobile.png) | Una segunda cabaña se cotizó a ARS 200 y ARS 80 de seña por una noche, en el mismo formulario adaptable. |
| [07 — Vencimiento activo, móvil](07-vencimiento-activo-mobile.png) | Se acortó a 10 s solo la copia de la constancia en la sesión del navegador. Sin recargar, se ocultaron los datos bancarios y el CTA cambió a «Consultar por WhatsApp». El PMS no fue modificado por esta simulación. |

**Reintento seguro:** se dejó que el PMS completara el alta de la segunda solicitud (HTTP 201) y se descartó la respuesta en el navegador. Se mostró la opción de reintentar. Tras recargar, el formulario pidió reingresar los datos originales; no conservaba contacto del huésped en almacenamiento. Con esos datos devolvió la misma referencia WEB-T8QIRJ56HOS2 y eliminó el intento pendiente local.

**Comandos:** `pnpm install --frozen-lockfile`, `pnpm run build` y `bun test tests/public-booking.test.ts` (6/6). Merge de reconciliación `fba44f6`: mantiene los siete commits locales y los 51 de `origin/dev`, sin reset. Se conservaron las reglas locales de visibilidad del menú en la portada y la grilla 2/4 de servicios sobre la arquitectura Astro/Cloudflare más reciente.
