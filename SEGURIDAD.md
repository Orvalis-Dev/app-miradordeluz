# 🔒 Documentación de Seguridad - Mirador del Luz

## Propósito

Este documento detalla todas las medidas de seguridad implementadas y recomendadas para la landing page de Mirador del Luz alojada en Cloudflare Pages. Incluye configuración de HTTPS, protección contra vulnerabilidades comunes, validación de datos y best practices de seguridad.

**Última actualización:** Enero 2026  
**Entorno:** Cloudflare Pages  
**Stack:** Astro + React + Cloudflare Workers

---

## 📋 Tabla de Contenidos

1. [HTTPS y Transport Security](#https-y-transport-security)
2. [Configuración de Cloudflare Pages](#configuración-de-cloudflare-pages)
3. [Headers de Seguridad](#headers-de-seguridad)
4. [Validación y Sanitización de Datos](#validación-y-sanitización-de-datos)
5. [Protección contra Vulnerabilidades](#protección-contra-vulnerabilidades)
6. [Variables de Entorno](#variables-de-entorno)
7. [Rate Limiting y Protección DDoS](#rate-limiting-y-protección-ddos)
8. [Logging y Monitoreo](#logging-y-monitoreo)
9. [Compilación y Despliegue Seguro](#compilación-y-despliegue-seguro)
10. [Checklist de Seguridad](#checklist-de-seguridad)

---

## 🔐 HTTPS y Transport Security

### ✅ Implementación Actual

La página está configurada para servirse con HTTPS desde Cloudflare Pages. El sitio es accesible en `https://miradordeluz.com`.

### 🔧 Configuración en Astro

```javascript
// astro.config.mjs (ACTUAL)
export default defineConfig({
  site: "https://miradordeluz.com", // ✅ URL con HTTPS obligatorio
  output: "hybrid",
  adapter: cloudflare({
    imageService: "compile",
  }),
  // ... resto de configuración
});
```

### ⚙️ Configuración en Cloudflare Pages

Cloudflare Pages gestiona automáticamente el despliegue y la seguridad básica:

1. **HTTPS Forzado:** Cloudflare redirige automáticamente todo el tráfico HTTP a HTTPS por defecto.
2. **Ciclo de vida:** Se dispara con cada `git push` a la rama `main`.
3. **Build Command:** `pnpm run build`
4. **Output Directory:** `dist`

### 📋 Redirección HTTP → HTTPS

En Cloudflare Pages, no es necesario un middleware manual para esto, ya que se configura desde el dashboard de Cloudflare o viene activo por defecto.

### 🔗 HSTS (HTTP Strict Transport Security)

Cloudflare maneja HSTS a nivel de red (Edge). Se recomienda activarlo en el dashboard de Cloudflare:
**Websites > SSL/TLS > Edge Certificates > HSTS**.
"Strict-Transport-Security",
"max-age=31536000; includeSubDomains; preload"
);

// Resto del código...
};

````

### 📌 Verificación HSTS Preload

Registrar el sitio en HSTS Preload list:

- Ir a: https://hstspreload.org/
- Ingresar: `miradordeluz.com`
- Seguir las instrucciones para validación

---

## ☁️ Configuración de Cloudflare Pages

### Variables de Entorno (Environment Variables)

En el panel de Cloudflare (Settings > Functions > Environment variables), configurar las siguientes variables:

```plaintext
# 🔐 CRÍTICAS
NODE_ENV=production
FORCE_HTTPS=true

# 📧 Email (Nodemailer)
SMTP_EMAIL=tu-email@gmail.com
SMTP_PASSWORD=tu-app-password-de-gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587

# 🌐 Sitio
SITE_URL=https://miradordeluz.com

# 🛡️ Seguridad
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
````

### Archivo `.env` Local (NUNCA commitear)

```plaintext
# .env (solo local, NO incluir en git)
NODE_ENV=development
SMTP_EMAIL=tu-email@gmail.com
SMTP_PASSWORD=tu-app-password
```

### .gitignore (Verificar que incluya)

```gitignore
# 🔐 Variables de entorno
.env
.env.local
.env.*.local

# 📦 Dependencies
node_modules/

# 🏗️ Build
dist/
build/

# 🔧 IDE
.vscode/
.idea/
*.swp
*.swo
```

### Certificado SSL/TLS en Railway

Railway proporciona automáticamente certificados SSL/TLS gratuitos vía Let's Encrypt:

1. ✅ Por defecto, Railway provisiona certificados automáticamente
2. ✅ Se renuevan automáticamente cada 60-90 días
3. ✅ Cubren el dominio personalizado y www
4. Verificar en Railway Dashboard → Settings → Domains

---

## 🛡️ Headers de Seguridad

### Configuración Global en Astro

**Crear archivo `src/lib/securityHeaders.ts`:**

```typescript
export const securityHeaders = {
  // Prevenir clickjacking
  "X-Frame-Options": "SAMEORIGIN",

  // Prevenir MIME sniffing
  "X-Content-Type-Options": "nosniff",

  // Protección XSS (navegadores antiguos)
  "X-XSS-Protection": "1; mode=block",

  // Referrer Policy
  "Referrer-Policy": "strict-origin-when-cross-origin",

  // Content Security Policy (ver sección específica)
  "Content-Security-Policy": getCSPHeader(),

  // Permisos del navegador
  "Permissions-Policy": [
    "camera=()",
    "microphone=()",
    "geolocation=()",
    "usb=()",
    "magnetometer=()",
    "gyroscope=()",
    "accelerometer=()",
  ].join(", "),
};

function getCSPHeader(): string {
  const isDev = process.env.NODE_ENV === "development";

  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "connect-src 'self' https:",
    "frame-ancestors 'none'",
    isDev ? "" : "upgrade-insecure-requests",
  ]
    .filter(Boolean)
    .join("; ");
}
```

### Aplicar Headers en Endpoints API

**En `src/pages/api/contacto.ts`:**

```typescript
import { securityHeaders } from "../../lib/securityHeaders";

export const POST: APIRoute = async ({ request, response }) => {
  // Aplicar headers de seguridad
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value as string);
  });

  // Headers adicionales para API
  response.headers.set(
    "Access-Control-Allow-Origin",
    "https://miradordeluz.com"
  );
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  response.headers.set("X-Content-Type-Options", "application/json");

  // Validación y procesamiento...
};
```

---

## ✅ Validación y Sanitización de Datos

### Estado Actual

✅ **YA IMPLEMENTADO** en `src/pages/api/contacto.ts`:

- Sanitización de strings (escape HTML)
- Validación de tipos
- Validación de formato de email
- Límites de longitud
- Validación de asuntos permitidos

### Mejoras Adicionales Recomendadas

**Crear archivo `src/lib/validators.ts`:**

```typescript
import DOMPurify from "isomorphic-dompurify";

/**
 * Validar y sanitizar datos del formulario
 */
export function validateContactForm(data: unknown) {
  if (typeof data !== "object" || data === null) {
    throw new Error("Datos inválidos");
  }

  const obj = data as Record<string, unknown>;

  const validated = {
    nombre: validateNombre(obj.nombre),
    email: validateEmail(obj.email),
    asunto: validateAsunto(obj.asunto),
    mensaje: validateMensaje(obj.mensaje),
  };

  return validated;
}

function validateNombre(value: unknown): string {
  if (typeof value !== "string") throw new Error("Nombre inválido");

  const nombre = value.trim();
  if (nombre.length < 3 || nombre.length > 100) {
    throw new Error("Nombre debe tener entre 3 y 100 caracteres");
  }

  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/.test(nombre)) {
    throw new Error("Nombre contiene caracteres inválidos");
  }

  return DOMPurify.sanitize(nombre, { ALLOWED_TAGS: [] });
}

function validateEmail(value: unknown): string {
  if (typeof value !== "string") throw new Error("Email inválido");

  const email = value.toLowerCase().trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw new Error("Formato de email inválido");
  }

  if (email.length > 254) {
    throw new Error("Email muy largo");
  }

  return email;
}

function validateAsunto(value: unknown): string {
  const validSubjects = ["consulta", "reserva", "disponibilidad", "otro"];

  if (typeof value !== "string" || !validSubjects.includes(value)) {
    throw new Error("Asunto inválido");
  }

  return value;
}

function validateMensaje(value: unknown): string {
  if (typeof value !== "string") throw new Error("Mensaje inválido");

  const mensaje = value.trim();
  if (mensaje.length < 10 || mensaje.length > 5000) {
    throw new Error("Mensaje debe tener entre 10 y 5000 caracteres");
  }

  return DOMPurify.sanitize(mensaje, { ALLOWED_TAGS: [] });
}
```

**Instalar dependencia:**

```bash
pnpm add isomorphic-dompurify
```

---

## 🛡️ Protección contra Vulnerabilidades

### 1. XSS (Cross-Site Scripting)

**Medidas implementadas:**

- ✅ Sanitización en backend
- ✅ Sanitización en frontend (React components)
- ✅ Content Security Policy
- ✅ Headers X-XSS-Protection

**Verificación adicional en componentes React:**

```typescript
// ❌ NUNCA hacer
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ SIEMPRE hacer
<div>{userInput}</div> // React escapa automáticamente
```

### 2. CSRF (Cross-Site Request Forgery)

**Token CSRF en formularios:**

**Crear `src/lib/csrf.ts`:**

```typescript
import crypto from "crypto";

const csrfTokens = new Map<string, { token: string; expires: number }>();

export function generateCSRFToken(): string {
  const token = crypto.randomBytes(32).toString("hex");
  const expires = Date.now() + 1000 * 60 * 60; // 1 hora

  csrfTokens.set(token, { token, expires });
  return token;
}

export function verifyCSRFToken(token: string): boolean {
  const record = csrfTokens.get(token);

  if (!record || record.expires < Date.now()) {
    csrfTokens.delete(token);
    return false;
  }

  csrfTokens.delete(token);
  return true;
}

// Limpiar tokens expirados cada 5 minutos
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of csrfTokens.entries()) {
    if (value.expires < now) {
      csrfTokens.delete(key);
    }
  }
}, 1000 * 60 * 5);
```

### 3. SQL Injection

- ✅ No aplicable: Proyecto estático sin BD
- ✅ Si en futuro se agrega BD, usar prepared statements
- ✅ Nunca concatenar strings en queries

### 4. Información Disclosure

**No exponer detalles en errores:**

```typescript
// ❌ NUNCA en producción
console.error(error.message); // Puede contener rutas del servidor

// ✅ SIEMPRE en producción
try {
  // código...
} catch (error) {
  console.error("Error procesando solicitud"); // Genérico
  return new Response(
    JSON.stringify({
      success: false,
      message: "Hubo un error. Por favor, intenta nuevamente.",
    }),
    { status: 500 }
  );
}
```

### 5. Dependency Vulnerabilities

**Auditar dependencias regularmente:**

```bash
# Verificar vulnerabilidades
pnpm audit

# Actualizar dependencias seguras
pnpm update

# Revisar y actualizar manualmente
pnpm outdated
```

---

## 🔑 Variables de Entorno

### Configuración Segura

**Nunca guardar en código:**

```typescript
// ❌ NUNCA
const API_KEY = "sk_live_abcdef123456";

// ✅ SIEMPRE
const API_KEY = process.env.SMTP_PASSWORD;
if (!API_KEY) {
  throw new Error("SMTP_PASSWORD no está configurada");
}
```

### Variables Sensibles en Cloudflare

En Cloudflare Dashboard → Pages → Settings → Functions:

```
SMTP_EMAIL=xxxxx@gmail.com          (App password, NO contraseña Gmail)
SMTP_PASSWORD=xxxxx                 (16 caracteres generados por Gmail)
SITE_URL=https://miradordeluz.com
NODE_ENV=production
FORCE_HTTPS=true
```

### Validación en Inicio

**En `src/pages/api/contacto.ts`:**

```typescript
function validateEnvironment() {
  const required = ["SMTP_EMAIL", "SMTP_PASSWORD", "SMTP_HOST"];

  for (const env of required) {
    if (!process.env[env]) {
      throw new Error(`Variable de entorno requerida no encontrada: ${env}`);
    }
  }
}

// Llamar en cada endpoint
export const POST: APIRoute = async (context) => {
  try {
    validateEnvironment();
    // ... resto del código
  } catch (error) {
    // ...
  }
};
```

---

## 🚫 Rate Limiting y Protección DDoS

### Rate Limiting en API de Contacto

**Crear `src/lib/rateLimiter.ts`:**

```typescript
interface RateLimitStore {
  ip: string;
  count: number;
  resetTime: number;
}

const requestStore = new Map<string, RateLimitStore>();

export function checkRateLimit(
  ip: string,
  maxRequests: number = 5,
  windowMs: number = 15 * 60 * 1000 // 15 minutos
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = requestStore.get(ip);

  if (!record || record.resetTime < now) {
    // Nueva ventana de tiempo
    const newRecord: RateLimitStore = {
      ip,
      count: 1,
      resetTime: now + windowMs,
    };
    requestStore.set(ip, newRecord);
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime: newRecord.resetTime,
    };
  }

  if (record.count < maxRequests) {
    record.count++;
    return {
      allowed: true,
      remaining: maxRequests - record.count,
      resetTime: record.resetTime,
    };
  }

  return {
    allowed: false,
    remaining: 0,
    resetTime: record.resetTime,
  };
}

// Limpiar registros expirados cada 10 minutos
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of requestStore.entries()) {
    if (value.resetTime < now) {
      requestStore.delete(key);
    }
  }
}, 1000 * 60 * 10);
```

### Usar Rate Limiter en API

**En `src/pages/api/contacto.ts`:**

```typescript
import { checkRateLimit } from "../../lib/rateLimiter";

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const ip = clientAddress || "unknown";
  const rateLimit = checkRateLimit(ip, 5, 15 * 60 * 1000);

  if (!rateLimit.allowed) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Has alcanzado el límite de solicitudes. Intenta más tarde.",
      }),
      {
        status: 429,
        headers: {
          "Retry-After": Math.ceil(
            (rateLimit.resetTime - Date.now()) / 1000
          ).toString(),
        },
      }
    );
  }

  // Continuar con validación y envío...
};
```

### Protección DDoS en Railway

Railway tiene protección DDoS incorporada, pero se puede potenciar:

1. **Cloudflare (RECOMENDADO)**

   - Registrar dominio en Cloudflare
   - Cambiar nameservers
   - Activar Cloudflare DDoS Protection (Free tier incluye protección básica)
   - En Railway: apuntar CNAME a dominio Cloudflare

2. **Configuración en Railway**
   - Habilitar "Auto-Scaling" para distribuir carga
   - Configurar límites de memoria y CPU

---

## 📊 Logging y Monitoreo

### Logging Seguro

**Crear `src/lib/logger.ts`:**

```typescript
interface LogEntry {
  timestamp: string;
  level: "info" | "warn" | "error";
  message: string;
  ip?: string;
  endpoint?: string;
  userAgent?: string;
}

export function logRequest(entry: LogEntry) {
  // En producción, guardar en archivo o servicio de logging
  const log = {
    ...entry,
    timestamp: new Date().toISOString(),
  };

  // ✅ Mostrar en consola
  console.log(JSON.stringify(log));

  // En futuro: enviar a servicio como Sentry, DataDog, etc.
}

// Ejemplo de uso
export function logContactFormSubmission(ip: string, email: string) {
  logRequest({
    level: "info",
    message: "Formulario de contacto enviado",
    ip,
    endpoint: "/api/contacto",
    userAgent: "user-agent-aquí",
  });
}

export function logSecurityEvent(
  level: "warn" | "error",
  message: string,
  details?: any
) {
  logRequest({
    level,
    message: `[SEGURIDAD] ${message}`,
    ...details,
  });
}
```

### Monitoreo en Railway

Railway proporciona logs automáticos:

1. Railway Dashboard → Logs
2. Filtrar por nivel (Info, Warn, Error)
3. Buscar por palabras clave
4. Exportar logs para análisis

**Integración con servicios externos (opcional):**

```typescript
// Sentry (para error tracking)
// Datadog (para APM)
// LogRocket (para session replay)
```

---

## 🏗️ Compilación y Despliegue Seguro

### Build Script en package.json

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "deploy": "pnpm run build && railway up",
    "audit": "pnpm audit",
    "audit:fix": "pnpm audit --fix"
  }
}
```

### Dockerfile Seguro (si es necesario)

**Crear `Dockerfile` en raíz:**

```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app
COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Ejecutar como usuario no-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --chown=nodejs:nodejs package.json .

USER nodejs

EXPOSE 3000

CMD ["node", "./dist/server/entry.mjs"]
```

### Checklist Pre-Despliegue

- [ ] Ejecutar `pnpm audit` sin vulnerabilidades críticas
- [ ] Verificar todas las variables de entorno configuradas
- [ ] Probar endpoints en local: `pnpm run preview`
- [ ] HTTPS funciona correctamente
- [ ] Formulario de contacto se sanitiza y valida
- [ ] Headers de seguridad están presentes
- [ ] Revisar logs en Railway por errores
- [ ] Probar en incógnito/privada para limpiar caché

---

## 📋 Checklist de Seguridad

### 🔐 HTTPS & Transport

- [ ] Sitio accesible solo via HTTPS
- [ ] Redireccionamiento HTTP → HTTPS activo
- [ ] Certificado SSL válido (Let's Encrypt)
- [ ] HSTS preload registrado
- [ ] Header `Strict-Transport-Security` presente

### 🛡️ Headers de Seguridad

- [ ] `X-Frame-Options: SAMEORIGIN`
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `X-XSS-Protection: 1; mode=block`
- [ ] `Content-Security-Policy` configurado
- [ ] `Referrer-Policy` configurado
- [ ] `Permissions-Policy` restrictivo

### ✅ Validación de Datos

- [ ] Sanitización de inputs en frontend
- [ ] Validación en backend (no confiar en cliente)
- [ ] Límites de longitud en strings
- [ ] Validación de formato (email, etc.)
- [ ] Escape de caracteres especiales

### 🔑 Variables de Entorno

- [ ] `.env` no está en git
- [ ] Variables sensibles en Railway
- [ ] Validación de variables requeridas al inicio
- [ ] Errores no exponen valores de variables

### 🚫 Rate Limiting

- [ ] Formulario de contacto tiene rate limit
- [ ] IP del cliente se registra
- [ ] Response HTTP 429 para límite excedido
- [ ] Header `Retry-After` presente

### 📊 Logging & Monitoreo

- [ ] Errores se registran (sin exponer detalles internos)
- [ ] Acceso a API se registra
- [ ] Eventos de seguridad se registran
- [ ] Logs disponibles en Railway Dashboard

### 📦 Dependencias

- [ ] `pnpm audit` ejecutado regularmente
- [ ] Vulnerabilidades críticas solucionadas
- [ ] Lock file (`pnpm-lock.yaml`) en git
- [ ] Node.js versión LTS en uso

### 🌐 Railway Configuration

- [ ] Dominio personalizado configurado
- [ ] Certificado SSL auto-renovado
- [ ] Variables de entorno protegidas
- [ ] Auto-scaling configurado
- [ ] Backups habilitados (si es necesario)

### 📝 Documentación

- [ ] Este archivo está actualizado
- [ ] Equipo conoce el procedimiento de actualización
- [ ] Contacto de seguridad documentado
- [ ] Plan de respuesta ante incidentes definido

---

## 🚨 Respuesta ante Incidentes de Seguridad

### Si hay brecha de seguridad:

1. **Inmediato:**

   - Pausar el servicio si es crítico
   - Notificar al equipo
   - Iniciar investigación

2. **Corto plazo:**

   - Identificar causa raíz
   - Implementar fix
   - Auditar logs para determinar alcance

3. **Mediano plazo:**

   - Deploy del fix
   - Comunicar a usuarios si es necesario
   - Documentar el incidente

4. **Largo plazo:**
   - Post-mortem
   - Mejoras preventivas
   - Actualizar esta documentación

---

## 📚 Referencias y Recursos

### Estándares de Seguridad

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheets](https://cheatsheetseries.owasp.org/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)

### Herramientas de Testing

- [OWASP ZAP](https://www.zaproxy.org/) - Pruebas de seguridad
- [Mozilla Observatory](https://observatory.mozilla.org/) - Auditar headers
- [SSL Labs](https://www.ssllabs.com/ssltest/) - Auditar SSL/TLS

### Railway Docs

- [Railway Environment Variables](https://docs.railway.app/reference/variables)
- [Railway Domains & SSL](https://docs.railway.app/guides/expose-your-app)
- [Railway Best Practices](https://docs.railway.app/guides/public-api)

### Astro Security

- [Astro Security Guide](https://docs.astro.build/en/guides/security/)
- [Content Security Policy in Astro](https://docs.astro.build/en/guides/configuring-astro/#configuring-astro)

---

## 📞 Contacto de Seguridad

Para reportar vulnerabilidades de seguridad:

- **Email:** seguridad@miradordeluz.com (crear si es necesario)
- **Respuesta esperada:** 24-48 horas
- **No hacer público:** Reportes debe ser confidencial hasta fix

---

## 📜 Versión del Documento

| Versión | Fecha     | Cambios                                      |
| ------- | --------- | -------------------------------------------- |
| 1.0     | Ene 2026  | Versión inicial - HTTPS, headers, validación |
| 1.1     | (Próxima) | (Por definir)                                |

---

**Última revisión:** 7 de enero de 2026  
**Responsable:** Equipo de Desarrollo  
**Próxima revisión:** Antes de cada deploy
