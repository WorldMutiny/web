export default async (a) => {
  await a.eval(`await backToShelf(); library.writingStyle='plotter'; await new Promise(r=>setTimeout(r,500)); document.querySelector('#new-text-btn').click();`);
  await a.wait(1400);
  for (const i of [2, 4, 5, 0]) { await a.eval(`[...document.querySelectorAll('.nt-type')][${i}].click();`); await a.wait(1100); }
  await a.eval(`[...document.querySelectorAll('.nt-form')][2].click();`); await a.wait(1200);
  await a.eval(`document.querySelector('.new-text-modal .m-ok').click();`); await a.wait(2600);
  await a.eval(`document.querySelector('#paper-scroll').scrollTo({top:400,behavior:'smooth'});`); await a.wait(1800);
};
