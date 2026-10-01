// RSS for the writings — no trackers, just the feed.
import { T } from '../../i18n';
import { writings, slugOf } from '../../lib/writings';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export async function GET({ site }: { site: URL }) {
  const t = T.en.writings;
  const base = new URL('/writings/', site).href;
  const items = (await writings('en')).filter((w) => !w.data.draft).map((w) => `<item><title>${esc(w.data.title)}</title><link>${base}${slugOf(w)}/</link><guid>${base}${slugOf(w)}/</guid><pubDate>${w.data.date.toUTCString()}</pubDate><description>${esc(w.data.description || w.data.subtitle || '')}</description></item>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Mutiny — ${esc(t.kicker)}</title><link>${base}</link><description>${esc(t.sub)}</description><language>en</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
