export default async (a) => {
  await a.eval(`await backToShelf(); library.writingStyle='pantser'; await new Promise(r=>setTimeout(r,400)); [...document.querySelectorAll('.shelf .book')].find(b=>/city/i.test(b.textContent))?.click(); await new Promise(r=>setTimeout(r,1400)); document.querySelector('#paper-scroll').scrollTop=0; document.querySelector('#side-pane').classList.add('open'); document.querySelector('#nav-pane').classList.add('open');`);
  await a.wait(1400);
  for (const th of ['blackgold', 'black-arch', 'matrix', 'tokyo-night', 'city-783', 'mutiny']) {
    await a.eval(`library.appearance='${th}'; await applyAppearance();`); await a.wait(1300);
  }
  await a.eval(`library.pageTheme='paper'; applyFonts();`); await a.wait(1400);
  await a.eval(`library.pageTheme='night'; applyFonts(); document.querySelector('#nav-pane').classList.remove('open');`); await a.wait(700);
};
