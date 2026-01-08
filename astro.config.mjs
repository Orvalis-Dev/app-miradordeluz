// @ts-check
import { defineConfig } from "astro/config";
import path from "path";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), sitemap()],

  redirects: {
    "/reserva-cabana-1": "/reserva/1",
    "/reserva-cabana-2": "/reserva/2",
    "/reserva-cabana-3": "/reserva/3",
    "/reserva-cabana-4": "/reserva/4",
  },

  output: "static",
  site: "https://miradordeluz.com",

  build: {
    inlineStylesheets: "auto",
  },

  server: {
    port: Number(process.env.PORT ?? 4321),
    host: true,
  },

  prefetch: {
    defaultStrategy: "hover",
    prefetchAll: true,
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
  },
});
