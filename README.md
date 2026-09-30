<p align="center"><img src="public/logo.svg" alt="Mutiny" width="420"></p>

# worldmutiny.com

The home of [Mutiny](https://github.com/worldmutiny/mutiny): a free, open-source writing app for essays and ideas. **Words start mutinies.**

A static [Astro](https://astro.build) site, English at the root and Spanish under `/es/`, in Mutiny's own themes. No cookies and no trackers; visits are counted with Cloudflare Web Analytics.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
```

- Every word is in `src/i18n.ts`. The manifesto there is the same text as [MANIFESTO.md](https://github.com/worldmutiny/mutiny/blob/main/MANIFESTO.md) in the app's repo; keep them in step.
- The download buttons read the latest release from GitHub when the site is built.
- The logo and icon come from the app's `brand/` folder (made by `scripts/make-brand.py` there).
- Pushing to `main` deploys to Cloudflare Pages (`.github/workflows/deploy.yml`), with `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as repository secrets.

MIT licensed. Made by Maxx Darko and the mutineers.
