// worldmutiny.com — English at the root, Spanish under /es/
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://worldmutiny.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  i18n: { defaultLocale: 'en', locales: ['en', 'es'], routing: { prefixDefaultLocale: false } }
});
