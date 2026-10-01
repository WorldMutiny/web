// from ManualPage.astro — a file of its own, so the Content-Security-Policy can stay strict
(() => {
// on a phone the chapter list starts folded, so the chapter comes first
  if (matchMedia('(max-width: 860px)').matches) document.querySelector('.toc details')?.removeAttribute('open');
})();
