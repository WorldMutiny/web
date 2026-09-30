// Record a scenario from the running Mutiny as a video: frames polled from the
// page (fixed 1280×800 viewport), each timed by how long it really lasted,
// divided by the current speed so the assistant's waits turn into a time-lapse.
//   node rec.mjs <scenario.js> <out-name>
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const [scenarioFile, name] = process.argv.slice(2);
const OUT = new URL('.', import.meta.url).pathname;
const targets = await (await fetch('http://127.0.0.1:9229/json')).json();
const page = targets.find((t) => t.type === 'page' && t.url.includes('index.html'));
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));
let id = 0; const pending = new Map();
ws.addEventListener('message', (m) => { const msg = JSON.parse(m.data); if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); } });
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });

await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false });
const dir = `${OUT}${name}-frames`; fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir);
const frames = []; let speed = 1; let recording = true; let last = Date.now();
async function grab() {
  while (recording) {
    const t0 = Date.now();
    const res = await send('Page.captureScreenshot', { format: 'jpeg', quality: 88 });
    const now = Date.now();
    if (frames.length) frames[frames.length - 1].dur = Math.min((now - last) / 1000 / speed, 2);
    last = now;
    const f = `${dir}/${String(frames.length).padStart(5, '0')}.jpg`;
    fs.writeFileSync(f, Buffer.from(res.result.data, 'base64'));
    frames.push({ f, dur: 0.1 });
    const wait = Math.max(0, (speed > 1 ? 400 : 70) - (Date.now() - t0));
    await new Promise((r) => setTimeout(r, wait));
  }
}
const api = {
  eval: async (expr) => { const r = await send('Runtime.evaluate', { expression: `(async()=>{${expr}})()`, awaitPromise: true, returnByValue: true, userGesture: true }); if (r.result.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails.exception?.description || r.result.exceptionDetails.text)); return r.result.result.value; },
  type: async (text, ms = 38) => { for (const ch of text) { await send('Input.insertText', { text: ch }); await new Promise((r) => setTimeout(r, ms + (ch === ' ' ? 20 : 0) + (/[.,]/.test(ch) ? 90 : 0))); } },
  key: async (key, mods = 0, code) => { const base = { key, code: code || key, windowsVirtualKeyCode: { Enter: 13, Escape: 27 }[key] || key.toUpperCase().charCodeAt(0), modifiers: mods }; await send('Input.dispatchKeyEvent', { type: 'rawKeyDown', ...base }); await send('Input.dispatchKeyEvent', { type: 'keyUp', ...base }); },
  click: async (x, y, button = 'left') => { for (const type of ['mouseMoved', 'mousePressed', 'mouseReleased']) await send('Input.dispatchMouseEvent', { type, x, y, button, clickCount: 1 }); },
  move: async (x, y) => send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y }),
  wait: (ms) => new Promise((r) => setTimeout(r, ms)),
  speed: (s) => { speed = s; }
};
const loop = grab();
const scenario = (await import(scenarioFile)).default;
await scenario(api);
await api.wait(900);
recording = false; await loop;
await send('Emulation.clearDeviceMetricsOverride');
// ffmpeg concat list with each frame's duration
const list = frames.map((fr) => `file '${fr.f}'\nduration ${fr.dur.toFixed(3)}`).join('\n') + `\nfile '${frames[frames.length - 1].f}'\n`;
fs.writeFileSync(`${dir}/list.txt`, list);
const total = frames.reduce((a, fr) => a + fr.dur, 0);
for (const [ext, args] of [['webm', ['-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '38', '-row-mt', '1', '-deadline', 'good']], ['mp4', ['-c:v', 'libx264', '-crf', '27', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart']]]) {
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', `${dir}/list.txt`, '-vf', 'fps=24,scale=960:-2:flags=lanczos', ...args, '-an', `${OUT}${name}.${ext}`]);
}
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', `${OUT}${name}.mp4`, '-vf', 'select=eq(n\\,12)', '-frames:v', '1', `${OUT}${name}-poster.jpg`]);
console.log(JSON.stringify({ name, frames: frames.length, seconds: +total.toFixed(1), webm: fs.statSync(`${OUT}${name}.webm`).size, mp4: fs.statSync(`${OUT}${name}.mp4`).size }));
process.exit(0);
