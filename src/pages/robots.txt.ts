import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  const robotsTxt = `
# Permisos para robots (indexadores)
User-agent: *
Allow: /

# Bloquear APIs y componentes internos que no son páginas
Disallow: /api/
Disallow: /_image
Disallow: /components/
Disallow: /admin/
Disallow: /stats/

# Reglas especificas para bots comunes
User-agent: Googlebot
Allow: /

# Sitemap para descubrimiento de contenido
Sitemap: https://miradordeluz.com/sitemap-index.xml
`.trim();

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
