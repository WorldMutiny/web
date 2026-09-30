// Bring the manual in from the app's repo: TUTORIAL.md (English) and
// TUTORIAL_ES.md (Spanish) on main. Runs before every build; if GitHub can't
// be reached, the copies already in src/content/manual are used.
import fs from 'node:fs';

const SRC = 'https://raw.githubusercontent.com/worldmutiny/mutiny/main/';
const OUT = new URL('../src/content/manual/', import.meta.url);
for (const [lang, file] of [['en', 'TUTORIAL.md'], ['es', 'TUTORIAL_ES.md']]) {
  try {
    const res = await fetch(SRC + file, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    fs.writeFileSync(new URL(lang + '.md', OUT), await res.text());
    console.log('[manual] ' + file + ' → ' + lang + '.md');
  } catch (err) {
    console.warn('[manual] kept the saved ' + lang + '.md (' + err.message + ')');
  }
}
