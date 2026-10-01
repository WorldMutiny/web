// Writings: essays and other texts, as Markdown. The fields are the ones
// Mutiny writes with File → Export → Markdown for a Website, so a text goes
// from the app to the site as it is: export it, drop it in src/content/writings.
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const writings = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writings' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    slug: z.string().optional(),
    author: z.string().default('Maxx Darko'),
    date: z.coerce.date(),
    lang: z.enum(['en', 'es']).default('en'),
    // the slug of the same text in the other language, if there is one
    translation: z.string().optional(),
    draft: z.boolean().default(false)
  })
});

export const collections = { writings };
