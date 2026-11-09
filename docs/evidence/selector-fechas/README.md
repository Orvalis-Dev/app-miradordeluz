# QA del selector de fechas por cabaña

**Resultado:** aprobado sobre el build de la landing y la API Laravel reales, con datos ficticios y SQLite aislado. Las noches ocupadas se ven grises y tachadas antes de elegir fechas. No se pueden seleccionar como entrada, ni se puede elegir una estadía que atraviese una noche ocupada. La salida el día que empieza el bloqueo sigue siendo válida porque no consume esa noche.

## Capturas del calendario

| Captura | Resultado visible |
| --- | --- |
| [Escritorio · Cabaña Nº1](01-calendario-cabana-1-desktop.png) | 17 y 18/11/2026 no disponibles (reserva confirmada de prueba). El clic sobre el 17 no cambió Entrada ni Salida. |
| [Móvil · Cabaña Nº2](02-calendario-cabana-2-mobile.png) | 19 y 20/11/2026 no disponibles (bloqueo manual de prueba). El toque sobre el 19 no cambió Entrada ni Salida. |
| [Escritorio · salida en el límite](03-salida-en-limite-desktop.png) | En la Nº1 se puede elegir entrada 15/11 y salida 17/11. El 17 sigue gris y se destaca como salida. No se puede elegir el 20 como salida desde el 15. |

## Verificación contra el PMS

Se entró desde **Nuestras Cabañas → Ver disponibilidad**. En el build de QA, `PUBLIC_BOOKING_CABIN_IDS={"1":101,"2":102,"3":103,"4":104}` relacionó cada ficha con su ID PMS aunque los nombres fueran distintos. Al renombrar la unidad 101 para moverla al final del listado del PMS, la ficha Nº1 mantuvo los mismos bloqueos y cotizó con ID 101.

| Ficha | ID PMS ficticio | Noches no disponibles (nov. 2026) | Estadía libre (entrada → salida) | Resultado |
| --- | ---: | --- | --- | --- |
| `/reserva/1` | 101 | 17 y 18 | 15 → 17 | Cotización 200 · solicitud 201 |
| `/reserva/2` | 102 | 19 y 20 | 17 → 19 | Cotización 200 · solicitud 201 |
| `/reserva/3` | 103 | 20 y 21 | 18 → 20 | Cotización 200 · solicitud 201 |
| `/reserva/4` | 104 | 23 y 24 | 25 → 27 | Cotización 200 · solicitud 201 |

Se verificó el ID en la cotización y en la solicitud, y el registro de cada solicitud en SQLite como `pending_confirmation`. El GET posterior siguió mostrando libre el rango solicitado: **las solicitudes no retienen noches**. Los objetos de `blocked_ranges` expusieron solo `from` y `to`, sin identificadores de reservas, motivos ni datos de huéspedes.

| Control adicional | Resultado |
| --- | --- |
| Teclado y foco | Las flechas recorren días; Intro en un día ocupado no selecciona; Intro en un día libre sí. |
| Cambio de mes | Av Pág mueve el foco al nuevo mes. Mientras el GET de diciembre está demorado, los días sin verificar no se pueden seleccionar. Al cargar, el 2/12 figura ocupado. Una entrada elegida en diciembre se conserva al retroceder a noviembre y volver. |
| Layout | Se inspeccionaron las capturas de escritorio (1440×1000) y móvil emulado (390×844). No hubo desborde horizontal en 320 px. |
| Constancia e intento | La constancia se conserva en la misma ficha tras recargar. No aparece en otra ficha. Un intento ambiguo solo se puede retomar en su ficha, sin rellenar datos de contacto guardados. |
| Ocupación posterior a la selección | GET de revalidación detectó el bloqueo y no hubo POST de cotización ni de solicitud. |
| Ocupación posterior a la cotización | GET previo al envío detectó el bloqueo; la web mostró un aviso y no hizo POST de solicitud. |
| Ocupación entre el último GET y el POST | El PMS rechazó el POST con HTTP 422. La web mostró un aviso y no se creó una solicitud. |

[Registro HTTP y aserciones sanitizados](evidencia-api.json).

**Entorno y alcance:** 9/11/2026, zona horaria Córdoba; Chromium con build local de Astro y rutas de las cuatro fichas servidas como HTML estático, API PMS `c14874f`, tenant de prueba `smoke-sierra-clara`. Solo se modificó una copia aislada de la base sintética; correo en memoria y solicitudes de navegador a terceros bloqueadas. Sin correos, WhatsApp, pagos ni despliegue. Los IDs de la prueba **no son IDs de producción**.
