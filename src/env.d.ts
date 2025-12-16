/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_API_URL: string;
  // Google Places API - Variables privadas (solo server-side)
  readonly PRIVATE_GOOGLE_PLACES_API_KEY: string;
  readonly PRIVATE_GOOGLE_PLACE_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

