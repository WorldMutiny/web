// After the build: every link that leaves worldmutiny.com opens in a new tab
// (target="_blank", rel="noopener noreferrer"); links within the site stay in
// the same one. Direct downloads (a release's files) stay too: a new tab would
// only flash open and close. Done on the finished HTML so it also reaches the links that
// come from Markdown (the manual, the writings' sources).
import type { AstroIntegration } from 'astro';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OWN = /^https?:\/\/(www\.)?worldmutiny\.com(\/|$)/i;
const DOWNLOAD = /\/releases\/download\//;

export function markExternal(html: string): string {
  return html.replace(/<a\b[^>]*>/gi, (tag) => {
    const href = tag.match(/\shref=("([^"]*)"|'([^']*)')/i);
    const url = href ? (href[2] ?? href[3]) : '';
    if (!/^https?:\/\//i.test(url) || OWN.test(url) || DOWNLOAD.test(url)) return tag;
    let out = tag;
    if (!/\starget=/i.test(out)) out = out.replace(/>$/, ' target="_blank">');
    const rel = out.match(/\srel=("([^"]*)"|'([^']*)')/i);
    if (rel) {
      const words = new Set((rel[2] ?? rel[3]).split(/\s+/).filter(Boolean));
      words.add('noopener'); words.add('noreferrer');
      out = out.replace(rel[0], ` rel="${[...words].join(' ')}"`);
    } else out = out.replace(/>$/, ' rel="noopener noreferrer">');
    return out;
  });
}

async function* htmlFiles(dir: string): AsyncGenerator<string> {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* htmlFiles(p);
    else if (e.name.endsWith('.html')) yield p;
  }
}

export default function externalLinks(): AstroIntegration {
  return {
    name: 'external-links',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        for await (const f of htmlFiles(fileURLToPath(dir))) {
          const html = await readFile(f, 'utf8');
          const out = markExternal(html);
          if (out !== html) await writeFile(f, out);
        }
      }
    }
  };
}
