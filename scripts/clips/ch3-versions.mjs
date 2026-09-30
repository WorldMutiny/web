export default async (a) => {
  await a.eval(`document.querySelector('#side-pane').classList.remove('open'); document.activeElement.blur(); const p=[...document.querySelectorAll('.chapter-body p')].find(x=>x.textContent.startsWith('That is not')); p.scrollIntoView({block:'center'}); const t=p.firstChild; const r=document.createRange(); r.setStart(t,0); r.setEnd(t,t.data.length); p.closest('.chapter-body').focus(); getSelection().removeAllRanges(); getSelection().addRange(r);`);
  await a.wait(1200);
  await a.eval(`openVersions();`); await a.wait(1300);
  await a.eval(`document.querySelector('.vs-ask').click();`);
  await a.wait(1200); a.speed(8);
  await a.eval(`for (let i=0;i<120 && !document.querySelector('.vs-row.ai');i++) await new Promise(r=>setTimeout(r,250));`);
  a.speed(1); await a.wait(3200);
  await a.eval(`const u=document.querySelectorAll('.vs-row.ai .vs-use')[1]||document.querySelector('.vs-row.ai .vs-use'); u&&u.click();`);
  await a.wait(2400);
};
