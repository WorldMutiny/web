// First-run + sample essay for recording the clips. Set window.__sample to the
// absolute path of scripts/clips/city-en.md before evaluating this.
(async () => {
  const w = (ms) => new Promise((r) => setTimeout(r, ms));
  const q = (s) => document.querySelector(s);
  q('.fr-lang[data-lang="en"]').click(); await w(400);
  q('#fr-name').value = 'Maxx Darko';
  q('.fr-style-pick[data-style="pantser"]').click(); await w(300);
  q('#fr-kinds-next').click(); await w(400);
  const m = q('#fr-themes .theme-card[data-theme="mutiny"]'); if (m) m.click(); await w(300);
  q('#fr-next').click(); await w(800); q('#fr-ai-off').click(); await w(300);
  q('#fr-done').click(); await w(300); q('#fr-toshelf').click(); await w(900);
  library.appearance = 'mutiny'; library.pageTheme = 'night';
  library.ai = { enabled: true, provider: 'compat', compatPreset: 'cerebras', compatModel: 'gpt-oss-120b' };
  await window.neo.writeLibrary(library); await applyAppearance(); applyFonts();
  const r = await window.neo.importFiles([window.__sample]);
  await addImportedBooks(r, firstEssayShelf()); await w(600);
  return document.querySelectorAll('.shelf .book').length;
})()
