// The writings of one language, newest first. Drafts show while you work on
// the site locally and stay out of the published build (MUTINY_PRODUCTION=1).
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n';

export type Writing = CollectionEntry<'writings'>;

export const slugOf = (w: Writing) => w.data.slug || w.id.replace(/\.md$/, '').split('/').pop()!;
export const minutes = (w: Writing) => Math.max(1, Math.round((w.body || '').split(/\s+/).filter(Boolean).length / 220));
export const showDrafts = process.env.MUTINY_PRODUCTION !== '1';

export async function writings(lang: Lang): Promise<Writing[]> {
  const all = await getCollection('writings', (w) => w.data.lang === lang && (showDrafts || !w.data.draft));
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const longDate = (d: Date, lang: Lang) =>
  d.toLocaleDateString(lang === 'es' ? 'es-MX' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
