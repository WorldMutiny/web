# The "See it in action" clips

Recorded from the real app, driven over the Chrome DevTools Protocol.

1. Start Mutiny from source with `--remote-debugging-port=9229` and a throwaway library (`MUTINY_LIBRARY_DIR`, `MUTINY_USER_DATA`).
2. Evaluate `setup.js` in the page (with `window.__sample` set to this folder's `city-en.md`): English first run, the Mutiny theme, Cerebras as the assistant, the sample essay.
3. `node rec.mjs /abs/path/ch1-write.mjs ch1-write`, and so on for each channel. Each writes `<name>.webm`, `<name>.mp4` and a poster frame; copy them to `public/clips/`.

The assistant's waits are recorded at 1/8 speed, so they play as a time-lapse.
