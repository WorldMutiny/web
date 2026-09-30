// The manual, split at every "##" into chapters, each one a page. The same
// little Markdown reader as the app's own manual window (manual.js), run at
// build time. The text is Mutiny's tutorial; it is still escaped.
import type { Lang } from '../i18n';
import EN from '../content/manual/en.md?raw';
import ES from '../content/manual/es.md?raw';

export type Chapter = { title: string; slug: string; anchor: string; md: string; html: string };

const REPO = 'https://github.com/worldmutiny/mutiny/blob/main/';
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// GitHub's heading anchors: "10. The assistant (optional)" → "10-the-assistant-optional"
export const ghSlug = (s: string) => s.trim().toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, '').replace(/\s/g, '-');
// a chapter's address: its title without the number, plain ASCII
const urlSlug = (s: string) => s.replace(/^\d+\.\s*/, '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

function inline(text: string, link: (href: string) => string) {
  const codes: string[] = [];
  let s = esc(text).replace(/`([^`]+)`/g, (_, c) => { codes.push(c); return `\u0000${codes.length - 1}\u0000`; });
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
    const to = link(href);
    const ext = /^https?:/.test(to) && !to.includes('worldmutiny.com');
    return `<a href="${to}"${ext ? ' rel="noopener"' : ''}>${label}</a>`;
  })
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?!\w)/g, '$1<em>$2</em>');
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${codes[+i]}</code>`);
}

function render(md: string, link: (href: string) => string) {
  const lines = md.replace(/\r/g, '').split('\n');
  let html = '';
  let i = 0;
  const indentOf = (l: string) => (l.match(/^ */) as RegExpMatchArray)[0].length;
  const isItem = (l: string) => /^\s*(?:[-*]|\d+\.)\s+/.test(l);
  const inl = (t: string) => inline(t, link);

  function list(start: number): string {
    const base = indentOf(lines[start]);
    const ordered = /^\s*\d+\./.test(lines[start]);
    let out = ordered ? '<ol>' : '<ul>';
    while (i < lines.length) {
      const l = lines[i];
      if (!l.trim()) {
        let j = i + 1;
        while (j < lines.length && !lines[j].trim()) j++;
        if (j < lines.length && (indentOf(lines[j]) > base || (isItem(lines[j]) && indentOf(lines[j]) === base))) { i = j; continue; }
        break;
      }
      const ind = indentOf(l);
      if (ind < base) break;
      if (ind === base && isItem(l)) {
        if (out.length > 4 && !out.endsWith('</li>')) out += '</li>';
        out += '<li>' + inl(l.replace(/^\s*(?:[-*]|\d+\.)\s+/, ''));
        i++;
        continue;
      }
      if (ind > base && isItem(l)) { out += list(i); continue; }
      if (ind > base) { out += '<p>' + inl(l.trim()) + '</p>'; i++; continue; }
      break;
    }
    return out + '</li>' + (ordered ? '</ol>' : '</ul>');
  }

  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim()) { i++; continue; }
    let m;
    if ((m = l.match(/^(#{2,3})\s+(.*)$/))) {
      const level = m[1].length;
      html += `<h${level} id="${esc(ghSlug(m[2]))}">${inl(m[2])}</h${level}>`;
      i++;
    } else if (/^---+\s*$/.test(l)) { html += '<hr>'; i++; }
    else if (l.startsWith('>')) {
      let q = '';
      while (i < lines.length && lines[i].startsWith('>')) q += lines[i++].replace(/^>\s?/, '') + ' ';
      html += '<blockquote><p>' + inl(q.trim()) + '</p></blockquote>';
    } else if (l.trim().startsWith('|')) {
      const rows: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) rows.push(lines[i++]);
      const cells = (r: string) => r.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
      const body = rows.filter((r, k) => !(k === 1 && /^\|?\s*:?-+/.test(r.trim())));
      html += '<div class="table"><table><thead><tr>' + cells(body[0]).map((c) => `<th>${inl(c)}</th>`).join('') + '</tr></thead><tbody>' +
        body.slice(1).map((r) => '<tr>' + cells(r).map((c) => `<td>${inl(c)}</td>`).join('') + '</tr>').join('') + '</tbody></table></div>';
    } else if (isItem(l)) {
      html += list(i);
    } else {
      let p = '';
      while (i < lines.length && lines[i].trim() && !/^(#{1,3}\s|>|\||---)/.test(lines[i]) && !isItem(lines[i])) p += lines[i++].trim() + ' ';
      html += '<p>' + inl(p.trim()) + '</p>';
    }
  }
  return html;
}

const cache = new Map<Lang, Chapter[]>();

export function manual(lang: Lang): Chapter[] {
  if (cache.has(lang)) return cache.get(lang)!;
  const md = lang === 'es' ? ES : EN;
  const chapters: Chapter[] = [];
  let cur: Chapter | null = null;
  for (const line of md.replace(/\r/g, '').split('\n')) {
    const h1 = line.match(/^#\s+(.*)$/);
    const h2 = line.match(/^##\s+(.*)$/);
    if (h1 && !cur) { cur = { title: h1[1], slug: '', anchor: ghSlug(h1[1]), md: '', html: '' }; chapters.push(cur); continue; }
    if (h2) { cur = { title: h2[1].replace(/^\d+\.\s*/, ''), slug: urlSlug(h2[1]), anchor: ghSlug(h2[1]), md: '', html: '' }; chapters.push(cur); continue; }
    if (!cur) continue;
    if (/^\*\[(Leer en español|Read in English)\]/.test(line)) continue; // the site has its own switch
    cur.md += line + '\n';
  }
  // where every heading lives, so links between chapters become links between pages
  const base = lang === 'en' ? '/manual/' : '/es/manual/';
  const at = new Map<string, string>();
  chapters.forEach((c) => {
    at.set(c.anchor, base + (c.slug ? c.slug + '/' : ''));
    for (const h of c.md.matchAll(/^###\s+(.*)$/gm)) at.set(ghSlug(h[1]), base + (c.slug ? c.slug + '/' : '') + '#' + ghSlug(h[1]));
  });
  const link = (href: string) => {
    if (href.startsWith('#')) return at.get(decodeURIComponent(href.slice(1))) || href;
    if (/^TUTORIAL_ES\.md/.test(href)) return '/es/manual/';
    if (/^TUTORIAL\.md/.test(href)) return '/manual/';
    if (/^[\w.-]+\.md(#[\w-]+)?$/.test(href)) return REPO + href;
    return href;
  };
  // a rule at the very end of a chapter would sit right on top of the pager's
  for (const c of chapters) c.html = render(c.md, link).replace(/(<hr>)+$/, '');
  cache.set(lang, chapters);
  return chapters;
}
