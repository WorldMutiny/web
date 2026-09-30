export default async (a) => {
  await a.eval(`await backToShelf(); await new Promise(r=>setTimeout(r,400)); [...document.querySelectorAll('.shelf .book')].find(b=>/city/i.test(b.textContent))?.click(); await new Promise(r=>setTimeout(r,1500)); document.querySelector('#paper-scroll').scrollTop=0; currentChapterId=book.chapterOrder[0];`);
  await a.wait(1200);
  const run = a.eval(`await critique('section');`);
  await a.wait(1500); a.speed(8);
  await run;
  a.speed(1); await a.wait(600);
  await a.eval(`document.querySelector('#side-pane').classList.add('open');`); await a.wait(1600);
  await a.eval(`const s=stickies.find(x=>x.kind==='critique'); if(s) focusSticky(s.id);`); await a.wait(2200);
  await a.eval(`document.querySelector('#sticky-list').scrollTop=240;`); await a.wait(1600);
};
