// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  output: 'static',
  site: 'https://miradordeluz.com',

  redirects: {
    'https://www.miradordeluz.com/:path*': 'https://miradordeluz.com/:path*',
  },
  
  build: {
    inlineStylesheets: 'auto'
  },
  
  prefetch: {
    defaultStrategy: 'hover',
    prefetchAll: true
  },

  vite: {
    plugins: [tailwindcss()]
  }
});
