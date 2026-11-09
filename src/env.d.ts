/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_API_URL?: string;
  readonly PUBLIC_BOOKING_TENANT_SLUG?: string;
  readonly PUBLIC_BOOKING_CABIN_IDS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
