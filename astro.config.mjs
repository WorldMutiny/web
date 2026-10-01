// worldmutiny.com — English at the root, Spanish under /es/
import { defineConfig } from 'astro/config';
import externalLinks from './src/lib/external-links';

export default defineConfig({
  site: 'https://worldmutiny.com',
  trailingSlash: 'always',
  integrations: [externalLinks()],
  build: { format: 'directory' },
  i18n: { defaultLocale: 'en', locales: ['en', 'es'], routing: { prefixDefaultLocale: false } }
});
