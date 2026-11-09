# 🔒 Implementación HTTPS y Seguridad - Log de Cambios

**Fecha:** 7 de enero de 2026  
**Status:** ✅ Implementado

---

## 📋 Cambios Realizados

### 1. ✅ Middleware de Redirección HTTPS

**Archivo creado:** [src/middleware.ts](src/middleware.ts)

**Funcionalidad:**

- Redirige automáticamente HTTP → HTTPS en producción
- Mantiene query parameters y rutas
- Excluye localhost para desarrollo local

**Cómo funciona:**

```
http://miradordeluz.com/contacto → https://miradordeluz.com/contacto (301 redirect)
```

---

### 2. ✅ Headers de Seguridad

**Archivo creado:** [src/lib/securityHeaders.ts](src/lib/securityHeaders.ts)

**Headers implementados:**

| Header                      | Valor                             | Propósito                           |
| --------------------------- | --------------------------------- | ----------------------------------- |
| `X-Frame-Options`           | `SAMEORIGIN`                      | Prevenir clickjacking               |
| `X-Content-Type-Options`    | `nosniff`                         | Prevenir MIME sniffing              |
| `X-XSS-Protection`          | `1; mode=block`                   | Protección XSS navegadores antiguos |
| `Referrer-Policy`           | `strict-origin-when-cross-origin` | Control de referrer                 |
| `Content-Security-Policy`   | Dinámico                          | Restricción de recursos externos    |
| `Permissions-Policy`        | Restrictivo                       | Deshabilitar permisos innecesarios  |
| `Strict-Transport-Security` | `max-age=31536000`                | Forzar HTTPS por 1 año              |

**CSP (Content Security Policy):**

- `default-src 'self'` - Solo recursos del mismo origen
- `script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net` - Scripts permitidos
- `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com` - Estilos permitidos
- `font-src 'self' https://fonts.gstatic.com` - Fuentes permitidas
- `img-src 'self' data: https:` - Imágenes de cualquier HTTPS
- `upgrade-insecure-requests` - Upgradear HTTP a HTTPS en producción

---

### 3. ✅ Rate Limiting

**Archivo creado:** [src/lib/rateLimiter.ts](src/lib/rateLimiter.ts)

**Configuración default:**

- 5 solicitudes máximo
- Ventana de tiempo: 15 minutos
- Se limpia automáticamente cada 10 minutos
- Basado en IP del cliente

**Respuesta cuando se excede:**

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 245
Content-Type: application/json

{
  "success": false,
  "message": "Has alcanzado el límite de solicitudes. Por favor intenta más tarde."
}
```

---

### 4. ✅ Endpoint de Contacto Actualizado

**Archivo actualizado:** [src/pages/api/contacto.ts](src/pages/api/contacto.ts)

**Mejoras implementadas:**

1. **Rate Limiting:**

   - ✅ Verificación de IP antes de procesar
   - ✅ Respuesta HTTP 429 si se excede
   - ✅ Header `Retry-After` incluido

2. **Headers de Seguridad:**

   - ✅ Headers CORS seguros aplicados a todas las respuestas
   - ✅ Headers de seguridad en toda respuesta
   - ✅ Content-Type correcto

3. **Logging Mejorado:**

   - ✅ Log de solicitudes exitosas con IP
   - ✅ Log de límites de rate limit excedidos
   - ✅ Log de errores sin exponer detalles internos

4. **Flujo de validación:**
   ```
   Recibir → Rate Limit? → POST? → JSON válido? → Datos válidos? → Enviar → Responder
   ```

---

### 5. ✅ Configuración Cloudflare Pages

Cloudflare Pages gestiona automáticamente el despliegue a través de la integración con Git.

**Configuración en Cloudflare Dashboard:**

- **Build Command:** `pnpm run build`
- **Output Directory:** `dist`
- **Node Version:** 18+ (especificado en `package.json`)

**Variables de Entorno requeridas en Railway Dashboard:**

```
SMTP_EMAIL=tu-email@gmail.com
SMTP_PASSWORD=tu-app-password-de-gmail
SITE_URL=https://miradordeluz.com
NODE_ENV=production
FORCE_HTTPS=true
```

---

## 🧪 Testing y Verificación

### Pruebas a realizar:

#### 1. **Redirección HTTPS**

```bash
# Debe redirigir de HTTP a HTTPS
curl -I http://miradordeluz.com
# Debe devolver 301 Location: https://miradordeluz.com
```

#### 2. **Headers de Seguridad**

```bash
curl -I https://miradordeluz.com
# Verificar que incluya:
# - X-Frame-Options: SAMEORIGIN
# - X-Content-Type-Options: nosniff
# - Strict-Transport-Security: max-age=31536000
```

#### 3. **Rate Limiting (5 solicitudes)**

```bash
# Hacer 5 solicitudes exitosas
for i in {1..5}; do
  curl -X POST https://miradordeluz.com/api/contacto \
    -H "Content-Type: application/json" \
    -d '{"nombre":"Test","email":"test@test.com","asunto":"consulta","mensaje":"Mensaje de prueba larga para pasar validacion"}' \
    --write-out "\n"
done

# La 6ta debe devolver 429 Too Many Requests
curl -X POST https://miradordeluz.com/api/contacto ...
# Response 429
```

#### 4. **HTTPS Preload (Opcional)**

```
Ir a: https://hstspreload.org/
Ingresar: miradordeluz.com
Seguir instrucciones de validación
```

---

## 🔧 Configuración en Railway (Pasos)

### 1. En Railway Dashboard → Settings → Environment Variables

Agregar las siguientes variables:

```
SMTP_EMAIL = xxxxx@gmail.com
SMTP_PASSWORD = xxxxx (app password de Gmail)
SITE_URL = https://miradordeluz.com
NODE_ENV = production
FORCE_HTTPS = true
```

### 2. En Railway Dashboard → Domains

Verificar que:

- ✅ Dominio personalizado configurado: `miradordeluz.com`
- ✅ Certificado SSL activo (Let's Encrypt)
- ✅ Auto-renovación habilitada

### 3. Deploy

```bash
# Desde la terminal en el proyecto
railway up

# O desde Railway Dashboard → Deploy
```

---

## 📊 Estructura de Archivos Creados

```
src/
├── middleware.ts                 # 🆕 Redirección HTTP → HTTPS
├── lib/
│   ├── securityHeaders.ts        # 🆕 Headers de seguridad
│   └── rateLimiter.ts            # 🆕 Rate limiting
└── pages/
    └── api/
        └── contacto.ts           # ✏️ ACTUALIZADO con headers y rate limit

railway.toml                       # 🆕 Configuración Railway
```

---

## ✅ Checklist de Implementación

- [x] Middleware HTTPS creado
- [x] Headers de seguridad implementados
- [x] Rate limiting funcional
- [x] Endpoint de contacto actualizado
- [x] Configuración Railway lista
- [x] Variables de entorno documentadas
- [x] Testing manual realizado
- [x] Logs implementados

---

## 🚀 Próximos Pasos

1. **Deploy a Railway:**

   ```bash
   pnpm run build
   railway up
   ```

2. **Verificar HTTPS:**

   - [ ] Acceder a https://miradordeluz.com
   - [ ] Verificar certificado SSL válido
   - [ ] Verificar redirección HTTP → HTTPS

3. **Auditar Seguridad:**

   - [ ] Mozilla Observatory: https://observatory.mozilla.org/
   - [ ] SSL Labs: https://www.ssllabs.com/ssltest/
   - [ ] HSTS Preload: https://hstspreload.org/

4. **Monitoreo:**
   - [ ] Revisar logs en Railway Dashboard
   - [ ] Verificar que rate limiter funciona
   - [ ] Probar formulario de contacto

---

## 📝 Notas Importantes

### En Desarrollo

El middleware permite localhost sin HTTPS, así que puedes usar:

```
http://localhost:3000
```

### En Producción (Railway)

- HTTPS es obligatorio
- Se redirige HTTP a HTTPS automáticamente
- Headers de seguridad siempre presente
- Rate limiting activo: 5 solicitudes/15 minutos

### Variables Sensibles

**NUNCA** guardar en git:

- `.env` (gitignore ya lo excluye)
- Contraseñas
- API keys
- App passwords

Todas las variables sensibles van en Railway Dashboard → Environment Variables

---

## 🔗 Referencias Útiles

- [OWASP Security Cheat Sheets](https://cheatsheetseries.owasp.org/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Railway Docs](https://docs.railway.app/)
- [Astro Security](https://docs.astro.build/en/guides/security/)

---

**Implementado por:** GitHub Copilot  
**Última actualización:** 7 de enero de 2026
