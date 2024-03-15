import cloudflare from '@astrojs/cloudflare';
import mdx from "@astrojs/mdx";
import react from '@astrojs/react';

import sitemap from "@astrojs/sitemap";
import svelte from '@astrojs/svelte';
import tailwind from "@astrojs/tailwind";
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'hybrid',
  adapter: cloudflare(),
  markdown: {
    drafts: true,
    shikiConfig: { theme: "css-variables" }
  },
  shikiConfig: {
    wrap: true,
    skipInline: false,
    drafts: true,
  },
  site: 'https://builditwithbloom.com',
  integrations: [tailwind(),   sitemap(), mdx(), svelte(), react()]
});