// from Base.astro — a file of its own, so the Content-Security-Policy can stay strict
(() => {
// the theme menu: pick one and the whole site changes, like the app
    const btn = document.querySelector('.theme-btn');
    const menu = document.querySelector('#theme-menu');
    const mark = () => {
      const now = document.documentElement.getAttribute('data-theme');
      menu?.querySelectorAll('[data-theme-pick]').forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute('data-theme-pick') === now)));
    };
    btn?.addEventListener('click', () => {
      const open = menu.hidden;
      menu.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
      mark();
    });
    menu?.addEventListener('click', (e) => {
      const pick = (e.target).closest('[data-theme-pick]');
      if (!pick) return;
      const id = pick.dataset.themePick;
      document.documentElement.setAttribute('data-theme', id);
      try { localStorage.setItem('mutiny-theme', id); } catch { /* storage blocked */ }
      mark();
    });
    document.addEventListener('click', (e) => {
      if (menu && !menu.hidden && !(e.target).closest('.themes')) { menu.hidden = true; btn?.setAttribute('aria-expanded', 'false'); }
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu && !menu.hidden) { menu.hidden = true; btn?.focus(); } });
})();
