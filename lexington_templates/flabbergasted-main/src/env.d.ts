/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly PUBLIC_BLOOM_BASE_API_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}