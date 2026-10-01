// from Writing.astro — a file of its own, so the Content-Security-Policy can stay strict
(() => {
// how far through the text you are, as a thin line along the top
  const bar = document.querySelector('.progress i');
  const essay = document.querySelector('.essay');
  const update = () => {
    const r = essay.getBoundingClientRect();
    const done = Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height));
    bar.style.transform = `scaleX(${done})`;
  };
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  update();
})();
