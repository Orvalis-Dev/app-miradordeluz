import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site).href;

  const robotsTxt = `
# Permisos generales
User-agent: *
Allow: /

# Bloquear partes privadas
Disallow: /api/
Disallow: /_image
Disallow: /admin/
Disallow: /stats/

# --- BLOQUEO DE INTELIGENCIA ARTIFICIAL (La forma correcta) ---
# Bloquear GPT (ChatGPT)
User-agent: GPTBot
Disallow: /

# Bloquear Google AI (Gemini/Bard) - Ojo: Googlebot sigue entrando para SEO
User-agent: Google-Extended
Disallow: /

# --- FIN BLOQUEO IA ---

# Sitemap
Sitemap: ${sitemapURL}
`.trim();

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
