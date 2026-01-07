import type { MiddlewareHandler } from "astro";

/**
 * Middleware de seguridad para redireccionar HTTP a HTTPS
 * Se aplica a todas las rutas en producción
 */
export const onRequest: MiddlewareHandler = async (context, next) => {
  // En producción (Railway), forzar HTTPS
  if (process.env.NODE_ENV === "production") {
    const request = context.request;
    const url = new URL(request.url);

    // Redirigir HTTP a HTTPS (excepto localhost)
    if (
      url.protocol === "http:" &&
      !url.hostname.includes("localhost") &&
      !url.hostname.includes("127.0.0.1")
    ) {
      return new Response(null, {
        status: 301, // Redirección permanente
        headers: {
          Location: `https://${url.hostname}${url.pathname}${url.search}`,
        },
      });
    }
  }

  // Continuar con el siguiente middleware/handler
  return next();
};
