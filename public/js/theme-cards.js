// from Sections.astro — a file of its own, so the Content-Security-Policy can stay strict
(() => {
// the theme cards drive the same switch as the menu's
  document.querySelectorAll('.tcard').forEach((card) => card.addEventListener('click', () => {
    const id = card.dataset.themePick;
    document.documentElement.setAttribute('data-theme', id);
    try { localStorage.setItem('mutiny-theme', id); } catch { /* storage blocked */ }
    mark();
  }));
  function mark() {
    const now = document.documentElement.getAttribute('data-theme');
    document.querySelectorAll('.tcard').forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.themePick === now)));
  }
  mark();
  new MutationObserver(mark).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
})();
