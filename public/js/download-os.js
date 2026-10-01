// from Home.astro — a file of its own, so the Content-Security-Policy can stay strict
(() => {
// put the visitor's own system first, and say so
  const ua = navigator.userAgent;
  const os = /Mac/i.test(ua) ? 'mac' : /Win/i.test(ua) ? 'windows' : /Linux|X11|CrOS/i.test(ua) ? 'linux' : '';
  const card = os && document.querySelector(`.sys[data-os="${os}"]`);
  if (card) { card.classList.add('mine'); card.parentElement.prepend(card); }
})();
