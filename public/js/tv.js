// from Tv.astro — a file of its own, so the Content-Security-Policy can stay strict.
// Each channel is a scene drawn in HTML. The markup is the scene's poster frame;
// play() resets it to its first moment and acts it out. Time only runs while
// the set is on and in view, so a scene picks up where it was left.
(() => {
  const tv = document.querySelector('.tv');
  if (!tv) return;
  const chans = JSON.parse(tv.dataset.channels);
  const themes = JSON.parse(tv.dataset.themes);
  const stage = tv.querySelector('.stage');
  const scenes = [...stage.querySelectorAll('.scene')];
  const posters = scenes.map((s) => s.innerHTML);
  const ptr = stage.querySelector('.ptr');
  const canvas = tv.querySelector('.static');
  const ctx = canvas.getContext('2d');
  const osd = tv.querySelector('.osd');
  const caption = tv.querySelector('.caption');
  const keys = [...tv.querySelectorAll('.key')];
  const power = tv.querySelector('.power');
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0, on = false, visible = false, noiseUntil = 0, osdTimer = 0;
  tv.classList.add('js');

  // ---------- a clock that stops when nobody is watching ----------
  const STOP = Symbol('stop');
  let clock = 0, last = 0, ticking = false, token = 0, waiters = [];
  const running = () => on && visible;
  function tick(now) {
    if (running()) clock += Math.min(now - last, 100);
    last = now;
    waiters = waiters.filter((w) => {
      if (w.tok !== token || clock >= w.at) { w.res(); return false; }
      return true;
    });
    // stale waiters still get released while paused (tune() kicks); the rest wait for a kick
    ticking = waiters.length > 0 && running();
    if (ticking) requestAnimationFrame(tick);
  }
  function kick() {
    if (ticking) return;
    ticking = true;
    last = performance.now();
    requestAnimationFrame(tick);
  }
  function wait(ms) {
    const tok = token;
    return new Promise((res) => { waiters.push({ at: clock + ms, res, tok }); kick(); })
      .then(() => { if (tok !== token) throw STOP; });
  }

  // ---------- the actor's moves ----------
  const off = (el) => el.classList.add('off');
  const show = (el) => el.classList.remove('off');
  const caret = document.createElement('i');
  caret.className = 'caret';

  // types text into el, a letter at a time, with a typist's rhythm
  async function type(el, text, speed = 42) {
    const node = document.createTextNode('');
    el.append(node, caret);
    for (const ch of text) {
      node.data += ch;
      count();
      await wait(speed * (0.5 + Math.random()) + (/[.,:;!?]/.test(ch) ? speed * 4 : 0));
    }
  }
  // the word counter in the status bar follows what's on the page
  let counter = null, page = null;
  function count() {
    if (counter && page) counter.textContent = page.textContent.split(/\s+/).filter(Boolean).length;
  }
  // where el is on the stage, in percent, so it holds at any size
  function at(el, dx = 0.5, dy = 0.5) {
    const s = stage.getBoundingClientRect(), r = el.getBoundingClientRect();
    return [((r.left - s.left + r.width * dx) / s.width) * 100, ((r.top - s.top + r.height * dy) / s.height) * 100];
  }
  async function point(el, dx, dy, ms = 750) {
    const [x, y] = at(el, dx, dy);
    show(ptr);
    ptr.style.transitionDuration = ms + 'ms';
    ptr.style.left = x + '%';
    ptr.style.top = y + '%';
    await wait(ms + 60);
  }
  async function click(el, dx, dy) {
    await point(el, dx, dy);
    ptr.classList.remove('tap');
    void ptr.offsetWidth;
    ptr.classList.add('tap');
    el.classList.add('press');
    await wait(260);
    el.classList.remove('press');
  }
  // a context menu, opened where the pointer stands
  async function menu(m, item) {
    m.style.left = ptr.style.left;
    m.style.top = ptr.style.top;
    show(m);
    // keep it inside the picture
    const s = stage.getBoundingClientRect(), r = m.getBoundingClientRect();
    if (r.right > s.right) m.style.left = `calc(${ptr.style.left} - ${r.width}px)`;
    if (r.bottom > s.bottom) m.style.top = `calc(${ptr.style.top} - ${r.height}px)`;
    await wait(500);
    await point(item, 0.3, 0.5, 550);
    item.classList.add('hover');
    await wait(250);
    await click(item, 0.3, 0.5);
    off(m);
    item.classList.remove('hover');
  }

  // ---------- the five scenes ----------
  const K = (sc, k) => sc.querySelector(`[data-k="${k}"]`);
  const KS = (sc, p) => [...sc.querySelectorAll(`[data-k^="${p}"]`)].filter((e) => /\d$/.test(e.dataset.k));
  const take = (el) => { const t = el.textContent; el.textContent = ''; return t; };

  const SCENES = {
    async write(sc) {
      const [title, p1, mk, flag, p2, note, nt, empty, m, pick] = ['title', 'p1', 'marked', 'flag', 'p2', 'note', 'notetext', 'empty', 'menu', 'pick'].map((k) => K(sc, k));
      const T = [title, p1, mk, p2, nt].map(take);
      mk.classList.remove('hl');
      [flag, note].forEach(off);
      show(empty);
      count();
      await wait(900);
      await type(title, T[0], 60);
      await wait(500);
      await type(p1, T[1], 34);
      await type(mk, T[2], 34);
      await wait(600);
      // select the phrase and mark it
      await point(mk, 0, 0.55);
      mk.classList.add('sel');
      await point(mk, 1, 0.55, 500);
      await wait(250);
      await click(mk, 0.95, 0.6);
      await menu(m, pick);
      mk.classList.remove('sel');
      mk.classList.add('hl');
      show(flag);
      off(empty);
      show(note);
      await wait(400);
      await type(nt, T[4], 38);
      await wait(500);
      off(ptr);
      await type(p2, T[3], 40);
      await wait(3200);
    },

    async critique(sc) {
      const ss = KS(sc, 's'), ms = KS(sc, 'm'), cards = KS(sc, 'c'), chip = K(sc, 'chip'), m = K(sc, 'menu'), pick = K(sc, 'pick');
      const done = chip.textContent;
      [...ms, ...cards, chip].forEach(off);
      ss.forEach((s) => s.classList.remove('focus'));
      cards.forEach((c) => c.classList.remove('act'));
      await wait(900);
      await click(ss[1], 0.5, 0.5);
      await menu(m, pick);
      off(ptr);
      chip.textContent = chip.dataset.busy;
      chip.classList.add('busy');
      show(chip);
      await wait(2600);
      chip.classList.remove('busy');
      off(chip);
      for (const c of cards) {
        show(ms[+c.dataset.s]);
        await wait(250);
        show(c);
        await wait(700);
      }
      chip.textContent = done;
      show(chip);
      await wait(1200);
      // follow two of them back to the text
      for (const i of [1, 2]) {
        await click(cards[i], 0.6, 0.3);
        cards.forEach((c, j) => c.classList.toggle('act', i === j));
        ss.forEach((s, j) => s.classList.toggle('focus', j === +cards[i].dataset.s));
        await wait(2000);
      }
      off(ptr);
      await wait(1800);
    },

    async versions(sc) {
      const target = K(sc, 'target'), dlg = K(sc, 'dlg'), opts = KS(sc, 'o'), toast = K(sc, 'toast');
      const v = +sc.dataset.pick || 0;
      target.classList.remove('sel');
      [dlg, ...opts, toast].forEach(off);
      await wait(900);
      await point(target, 0, 0.3);
      target.classList.add('sel');
      await point(target, 1, 0.8, 700);
      await wait(400);
      off(ptr);
      show(dlg);
      await wait(1300);
      for (const o of opts) { show(o); await wait(900); }
      await wait(2600);
      const use = K(sc, 'u' + v);
      await point(use, 0.5, 0.5);
      opts[v].classList.add('pick');
      await wait(300);
      await click(use);
      await wait(200);
      off(dlg);
      off(ptr);
      target.classList.remove('sel');
      target.textContent = opts[v].dataset.plain;
      target.classList.add('flash');
      show(toast);
      await wait(4000);
    },

    async templates(sc) {
      const lib = K(sc, 'lib'), nw = K(sc, 'new'), ed = K(sc, 'ed'), dlg = K(sc, 'dlg'), forms = K(sc, 'forms'), ok = K(sc, 'ok');
      const types = KS(sc, 't'), fs = KS(sc, 'f'), lines = KS(sc, 'l');
      [ed, dlg, forms, ...lines].forEach(off);
      [...types, ...fs].forEach((x) => x.classList.remove('on'));
      await wait(900);
      await click(nw);
      show(dlg);
      await wait(700);
      // look around, then pick Essay
      await point(types[2], 0.5, 0.5, 600);
      await wait(300);
      await point(types[5], 0.5, 0.5, 600);
      await wait(300);
      await click(types[0]);
      types[0].classList.add('on');
      show(forms);
      await wait(900);
      await click(fs[0]);
      fs[0].classList.add('on');
      await wait(700);
      await click(ok);
      off(dlg);
      off(lib);
      off(ptr);
      show(ed);
      await wait(600);
      for (const l of lines) { show(l); await wait(420); }
      await wait(4000);
    },

    async themes(sc) {
      const label = K(sc, 'tlabel'), follow = K(sc, 'follow'), wipe = K(sc, 'wipe'), sws = KS(sc, 'w');
      const order = themes.map((_, i) => i);
      off(follow);
      async function wear(i) {
        wipe.classList.remove('go');
        void wipe.offsetWidth;
        wipe.classList.add('go');
        await wait(330);
        sc.setAttribute('data-theme', themes[i].id);
        label.textContent = themes[i].name;
        sws.forEach((s, j) => s.classList.toggle('on', i === j));
        await wait(1900);
      }
      sc.setAttribute('data-theme', themes[0].id);
      sws.forEach((s, j) => s.classList.toggle('on', j === 0));
      await wait(1400);
      for (const i of order.slice(1)) await wear(i);
      await wear(0);
      show(follow);
      await wait(3500);
    }
  };

  async function play(i) {
    const tok = token, sc = scenes[i];
    sc.innerHTML = posters[i];
    sc.removeAttribute('data-theme');
    page = sc.querySelector('.page');
    counter = sc.querySelector('[data-k="count"]');
    off(ptr);
    ptr.style.transitionDuration = '0s';
    ptr.style.left = '72%';
    ptr.style.top = '84%';
    try { await SCENES[sc.dataset.scene](sc); }
    catch (e) { if (e !== STOP) throw e; return; }
    if (tok === token) tune(i + 1);
  }

  // ---------- the set ----------
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
  function tune(i) {
    current = (i + chans.length) % chans.length;
    token++;
    kick();
    const c = chans[current];
    keys.forEach((k, j) => k.setAttribute('aria-pressed', String(j === current)));
    scenes.forEach((s, j) => s.classList.toggle('cur', j === current));
    osd.querySelector('.osd-ch').textContent = 'CH ' + c.n;
    osd.querySelector('.osd-name').textContent = c.name;
    caption.textContent = c.desc;
    burst(380);
    showOsd();
    if (calm) { scenes[current].innerHTML = posters[current]; return; }
    play(current);
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
  }

  keys.forEach((k) => k.addEventListener('click', () => { if (!on) { on = true; tv.classList.add('on'); } tune(+k.dataset.ch); }));
  power.addEventListener('click', () => (on ? powerOff() : powerOn()));

  // with reduced motion the set is simply on, showing still frames
  if (calm) { on = true; tv.classList.add('on'); }

  // turn on when it comes into view; rest when it leaves
  new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    if (visible && !on && !tv.dataset.touched) { tv.dataset.touched = '1'; powerOn(); }
    if (visible) kick();
  }, { threshold: 0.45 }).observe(tv);
})();
