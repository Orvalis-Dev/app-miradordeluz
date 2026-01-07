/**
 * Headers de seguridad para toda la aplicación
 * Se aplican a endpoints de API y recursos estáticos
 */

export const securityHeaders = {
  // Prevenir clickjacking
  "X-Frame-Options": "SAMEORIGIN",

  // Prevenir MIME sniffing
  "X-Content-Type-Options": "nosniff",

  // Protección XSS (navegadores antiguos)
  "X-XSS-Protection": "1; mode=block",

  // Referrer Policy
  "Referrer-Policy": "strict-origin-when-cross-origin",

  // Content Security Policy
  "Content-Security-Policy": getCSPHeader(),

  // Permisos del navegador - deshabilitar características no necesarias
  "Permissions-Policy": [
    "camera=()",
    "microphone=()",
    "geolocation=()",
    "usb=()",
    "magnetometer=()",
    "gyroscope=()",
    "accelerometer=()",
  ].join(", "),

  // HSTS - Obligar HTTPS durante 1 año
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
};

/**
 * Generar header Content-Security-Policy dinámicamente
 * Más restrictivo en producción, más permisivo en desarrollo
 */
function getCSPHeader(): string {
  const isDev = process.env.NODE_ENV === "development";

  const policies = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net", // React necesita unsafe-eval en dev
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ];

  // En producción, forzar upgrade de conexiones inseguras
  if (!isDev) {
    policies.push("upgrade-insecure-requests");
  }

  return policies.filter(Boolean).join("; ");
}

/**
 * Aplicar headers de seguridad a una Response
 * Uso: applySecurityHeaders(response);
 */
export function applySecurityHeaders(response: Response): Response {
  const newResponse = new Response(response.body, response);

  Object.entries(securityHeaders).forEach(([key, value]) => {
    newResponse.headers.set(key, value as string);
  });

  return newResponse;
}

/**
 * Headers específicos para endpoints de API
 */
export const apiSecurityHeaders = {
  ...securityHeaders,
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400", // 24 horas
};

/**
 * Aplicar headers CORS seguros
 */
export function applyCORSHeaders(
  response: Response,
  allowedOrigin: string = process.env.SITE_URL || "https://miradordeluz.com"
): Response {
  const newResponse = new Response(response.body, response);

  newResponse.headers.set("Access-Control-Allow-Origin", allowedOrigin);
  newResponse.headers.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  newResponse.headers.set("Access-Control-Allow-Headers", "Content-Type");
  newResponse.headers.set("Access-Control-Max-Age", "86400");

  return newResponse;
}
