// The latest Mutiny release, read from GitHub when the site is built (each
// deploy picks up the newest version). If GitHub can't be reached, the build
// still works and the buttons point at the releases page.

export type Asset = { name: string; url: string; size: number; sha256: string; os: 'linux' | 'mac' | 'windows'; label: string };
export type Release = { version: string; url: string; assets: Asset[] };

const REPO = 'worldmutiny/mutiny';
const RELEASES = `https://github.com/${REPO}/releases`;

function describe(name: string): Pick<Asset, 'os' | 'label'> | null {
  if (/linux-x86_64\.AppImage$/.test(name)) return { os: 'linux', label: 'Linux · x86_64 · AppImage' };
  if (/linux-arm64\.AppImage$/.test(name)) return { os: 'linux', label: 'Linux · ARM64 · AppImage' };
  if (/mac-arm64\.dmg$/.test(name)) return { os: 'mac', label: 'macOS · Apple Silicon' };
  if (/mac-x64\.dmg$/.test(name)) return { os: 'mac', label: 'macOS · Intel' };
  if (/windows-setup\.exe$/.test(name)) return { os: 'windows', label: 'Windows · installer' };
  if (/windows-portable\.exe$/.test(name)) return { os: 'windows', label: 'Windows · portable' };
  return null;
}

let cached: Release | null = null;

export async function latestRelease(): Promise<Release> {
  if (cached) return cached;
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'worldmutiny.com' }
    });
    if (!res.ok) throw new Error('GitHub ' + res.status);
    const r = await res.json();
    const assets: Asset[] = [];
    for (const a of r.assets || []) {
      const d = describe(a.name);
      if (d) assets.push({ name: a.name, url: a.browser_download_url, size: a.size, sha256: String(a.digest || '').replace(/^sha256:/, ''), ...d });
    }
    // the file most people want comes first on each system
    const rank = (a: Asset) => ['x86_64', 'mac-arm64', 'windows-setup', 'linux-arm64', 'mac-x64', 'portable'].findIndex((k) => a.name.includes(k));
    assets.sort((a, b) => rank(a) - rank(b));
    cached = { version: String(r.tag_name).replace(/^v/, ''), url: r.html_url, assets };
  } catch (err) {
    console.warn('[release] falling back to the releases page:', (err as Error).message);
    cached = { version: '', url: RELEASES, assets: [] };
  }
  return cached;
}

export const mb = (bytes: number) => Math.round(bytes / 1048576) + ' MB';
