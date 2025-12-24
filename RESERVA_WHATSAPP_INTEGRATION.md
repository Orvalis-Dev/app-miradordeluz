# ReservaSummary - Integracion WhatsApp (v4)

## 📱 Nuevo Flujo de Reserva

### Mobile

**Estado Colapsado (Inicial):**
```
┌─────────────────────────────────┐
│ 85.000/noche    [RESERVAR]      │
└─────────────────────────────────┘
```
- ✅ Muestra precio
- ✅ Botón "RESERVAR" en naranja

**Estado Expandido (Click en RESERVAR):**
```
┌─────────────────────────────────┐
│ Beneficios exclusivos...         │
│                                  │
│ Check-in: [calendar picker]      │
│ Check-out: [calendar picker]     │
│ Huéspedes: [selector]            │
│                                  │
│ Seleccioná fechas       —        │
│ Seña (50%)              —        │
│ Saldo                   —        │
│                                  │
│ [Enviar a WhatsApp]    [VERDE]  │
│ Te responderemos...             │
└─────────────────────────────────┘
```

### Desktop (lg breakpoint)

- ✅ Siempre expandido (sin colapso)
- ✅ Comportamiento sticky en la parte superior
- ✅ Panel completo visible

## 🔄 Flujo de Interacción

### Paso 1: Usuario entra a `/reservas?cabana=1`
- Ve descripción de la cabaña
- Ve amenidades
- Al final: Precio + Botón RESERVAR

### Paso 2: Usuario toca "RESERVAR"
- Panel se expande
- Muestra formulario

### Paso 3: Usuario ingresa datos
- Check-in: Selecciona fecha de entrada
- Check-out: Selecciona fecha de salida
- Huéspedes: Elige cantidad de adultos
- Sistema calcula automáticamente:
  - Cantidad de noches
  - Monto total
  - Seña (50%)
  - Saldo (50%)

### Paso 4: Usuario toca "Enviar a WhatsApp"
- Se valida que todos los campos estén completos
- Se genera un mensaje formateado con toda la información
- Se abre WhatsApp con el mensaje pre-llenado
- Se redirige al número: **+54 9 3813 51 3513**

## 💬 Mensaje Enviado a WhatsApp

```
Hola, me gustaría hacer una reserva en Mirador de Luz.

*Datos de la Reserva:*
Cabaña: Cabaña Nº1
Check-in: 2025-02-15
Check-out: 2025-02-18
Noches: 3
Huéspedes: 2 Adultos

*Monto:*
Total: $255.000
Seña (50%): $127.500
Saldo: $127.500

¿Hay disponibilidad?
```

### Características del Mensaje:
- ✅ Nombre de la cabaña
- ✅ Fechas de check-in y check-out
- ✅ Cantidad de noches
- ✅ Cantidad de huéspedes
- ✅ Monto total en pesos argentinos
- ✅ Desglose de seña y saldo
- ✅ Texto formateado para WhatsApp (markdown: `**bold**`)

## 🔧 Cambios Técnicos

### Funciones Agregadas

```typescript
// Genera el mensaje pre-llenado para WhatsApp
const generarMensajeWhatsApp = () => {
  if (!fechaInicio || !fechaFin || nights === 0) {
    alert("Por favor completa todos los campos");
    return null;
  }
  
  const mensaje = `
Hola, me gustaría hacer una reserva...
  `.trim();
  
  return encodeURIComponent(mensaje);
};

// Maneja el click en "Enviar a WhatsApp"
const handleReservar = () => {
  const mensajeEncodificado = generarMensajeWhatsApp();
  if (mensajeEncodificado) {
    window.open(`https://wa.me/5493813513513?text=${mensajeEncodificado}`, "_blank");
  }
};
```

### Botones

| Elemento | Mobile | Desktop |
|----------|--------|---------|
| Header Button | "RESERVAR" (naranja) | Oculto |
| Submit Button | "Enviar a WhatsApp" (verde) | "Enviar a WhatsApp" (verde) |
| Color | `bg-amber-600` | `bg-green-500` |

### URL de WhatsApp

```
https://wa.me/5493813513513?text={mensaje_encoded}
```

- Número: `+54 9 3813 51 3513`
- Mensaje: URL-encoded, pre-llenado con toda la información
- Abre en nueva pestaña: `target="_blank"`

## ✨ Validaciones

**El botón "Enviar a WhatsApp" está deshabilitado si:**
- ❌ No se seleccionó Check-in
- ❌ No se seleccionó Check-out
- ❌ Cantidad de noches es 0
- ❌ Cantidad de huéspedes excede la capacidad

**Cuando está deshabilitado:**
- `disabled:opacity-50` → Aparece más opaco
- No se puede hacer click
- Se muestra alerta: "Por favor completa todos los campos"

## 📊 Estados de Pantalla

### Mobile (< 1024px)

**Colapsado:**
- Altura: `max-h-0` (oculto)
- Solo visible: Header con precio + botón RESERVAR

**Expandido:**
- Altura: `max-h-screen` (visible)
- Se muestra todo el formulario
- Animación: 300ms suave

### Desktop (≥ 1024px)

- Siempre expandido: `lg:block max-h-screen`
- Header RESERVAR oculto: `lg:hidden`
- Sticky en la parte superior: `lg:sticky lg:top-24`

## 🔗 Links y Recursos

- WhatsApp API: `https://www.whatsapp.com/business/links/`
- Encoding URL: `encodeURIComponent(mensaje)`
- Formato de número: `+54 9 3813 51 3513` (Argentina, con código de área)

## Archivos Modificados

- ✅ `src/components/react/ReservaSummary.tsx`

## Testing

```
✅ Mobile:
   - Ver precio + botón RESERVAR
   - Click: Expande formulario
   - Ingresar Check-in, Check-out, Huéspedes
   - Click "Enviar a WhatsApp": Abre WhatsApp
   - Mensaje contiene toda la info
   - Número +54 9 3813 51 3513 aparece

✅ Desktop:
   - Ver panel completo
   - Ingresar datos
   - Click "Enviar a WhatsApp": Abre WhatsApp

✅ Validaciones:
   - Dejar campos vacíos: Botón deshabilitado
   - Ingresar todo: Botón habilitado
```

## Próximos Pasos (Opcional)

Si luego quieres agregar más funcionalidades:
- Guardar conversaciones en base de datos
- Mostrar confirmación después de enviar
- Agregar más cabañas (números diferentes)
- Agregar historial de reservas
- Integrar con calendario de disponibilidad







