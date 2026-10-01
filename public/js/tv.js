// from Tv.astro — a file of its own, so the Content-Security-Policy can stay strict
(() => {
const tv = document.querySelector('.tv');
  const chans = JSON.parse(tv.dataset.channels);
  const video = tv.querySelector('video');
  const canvas = tv.querySelector('.static');
  const ctx = canvas.getContext('2d');
  const osd = tv.querySelector('.osd');
  const caption = tv.querySelector('.caption');
  const keys = [...tv.querySelectorAll('.key')];
  const power = tv.querySelector('.power');
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const webm = video.canPlayType('video/webm; codecs="vp9"') !== '';
  let current = 0, on = false, visible = false, noiseUntil = 0, osdTimer = 0;

  // snow: grey noise on a tiny canvas, blown up by CSS
  function snow() {
    if (performance.now() > noiseUntil) { canvas.classList.remove('live'); return; }
    const img = ctx.createImageData(canvas.width, canvas.height);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.random() * 255 | 0;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    requestAnimationFrame(snow);
  }
  function burst(ms) {
    if (calm) return;
    noiseUntil = performance.now() + ms;
    canvas.classList.add('live');
    requestAnimationFrame(snow);
  }
  function showOsd() {
    osd.classList.add('shown');
    clearTimeout(osdTimer);
    osdTimer = window.setTimeout(() => osd.classList.remove('shown'), 2600);
  }
  function tune(i, play = true) {
    current = (i + chans.length) % chans.length;
    const c = chans[current];
    keys.forEach((k, j) => k.setAttribute('aria-pressed', String(j === current)));
    osd.querySelector('.osd-ch').textContent = 'CH ' + c.n;
    osd.querySelector('.osd-name').textContent = c.name;
    caption.textContent = c.desc;
    video.setAttribute('aria-label', `CH ${c.n} · ${c.name}`);
    video.poster = `/clips/${c.clip}.jpg`;
    video.src = `/clips/${c.clip}.${webm ? 'webm' : 'mp4'}`;
    burst(380);
    showOsd();
    if (play && on) video.play().catch(() => {});
  }
  function powerOn() {
    if (on) return;
    on = true;
    tv.classList.add('on');
    tune(current);
  }
  function powerOff() {
    on = false;
    tv.classList.remove('on');
    video.pause();
  }

  keys.forEach((k) => k.addEventListener('click', () => { if (!on) { on = true; tv.classList.add('on'); } tune(+k.dataset.ch); }));
  power.addEventListener('click', () => (on ? powerOff() : powerOn()));
  video.addEventListener('ended', () => tune(current + 1));

  // turn on when it comes into view; rest when it leaves
  new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    if (visible && !on && !calm && !tv.dataset.touched) { tv.dataset.touched = '1'; powerOn(); }
    else if (visible && on) video.play().catch(() => {});
    else if (!visible) video.pause();
  }, { threshold: 0.45 }).observe(tv);
})();
