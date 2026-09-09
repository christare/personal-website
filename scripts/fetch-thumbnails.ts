import { site } from "../data/site";
import fs from "fs";
import path from "path";

const THUMBNAILS_DIR = path.join(process.cwd(), "public", "thumbnails");
const MANIFEST_PATH = path.join(process.cwd(), "data", "thumbnails.json");
const FORCE = process.argv.includes("--force");

fs.mkdirSync(THUMBNAILS_DIR, { recursive: true });

function youtubeIdFromUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be") return u.pathname.slice(1).split("?")[0] || null;
    if (host === "youtube.com" || host === "m.youtube.com") {
      if (u.pathname === "/watch") return u.searchParams.get("v");
      if (u.pathname.startsWith("/shorts/")) return u.pathname.split("/")[2] ?? null;
      if (u.pathname.startsWith("/embed/")) return u.pathname.split("/")[2] ?? null;
    }
  } catch { return null; }
  return null;
}

function tiktokIdFromUrl(url: string): string | null {
  return url.match(/\/video\/(\d+)/)?.[1] ?? null;
}

function instagramShortcodeFromUrl(url: string): string | null {
  try {
    const parts = new URL(url).pathname.split("/").filter(Boolean);
    return parts.length >= 2 ? parts[1] : null;
  } catch { return null; }
}

function driveFileIdFromUrl(url: string): string | null {
  return url.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1] ?? null;
}

async function download(srcUrl: string, dest: string): Promise<boolean> {
  try {
    const res = await fetch(srcUrl, { signal: AbortSignal.timeout(12000) });
    if (!res.ok) return false;
    const buf = await res.arrayBuffer();
    if (buf.byteLength < 2000) return false; // reject placeholder images
    fs.writeFileSync(dest, Buffer.from(buf));
    return true;
  } catch { return false; }
}

async function youtubeThumbnail(id: string, dest: string): Promise<boolean> {
  for (const q of ["maxresdefault", "hqdefault", "mqdefault"] as const) {
    if (await download(`https://img.youtube.com/vi/${id}/${q}.jpg`, dest)) {
      const size = fs.statSync(dest).size;
      if (size > 5000) { // real thumbnails are always > 5 KB; grey placeholders are ~2 KB
        console.log(`    ✓ ${q} (${(size / 1024).toFixed(0)} KB)`);
        return true;
      }
    }
  }
  return false;
}

async function tiktokThumbnail(url: string, dest: string): Promise<boolean> {
  try {
    const res = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`, {
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { thumbnail_url?: string };
    if (!data.thumbnail_url) return false;
    return download(data.thumbnail_url, dest);
  } catch { return false; }
}

async function instagramThumbnail(url: string, dest: string): Promise<boolean> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "facebookexternalhit/1.1" },
      signal: AbortSignal.timeout(10000),
      redirect: "follow",
    });
    if (!res.ok) return false;
    const html = await res.text();
    const match =
      html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/) ??
      html.match(/<meta\s+content="([^"]+)"\s+property="og:image"/);
    if (!match?.[1]) return false;
    return download(match[1].replace(/&amp;/g, "&"), dest);
  } catch { return false; }
}

async function driveThumbnail(url: string, dest: string): Promise<boolean> {
  const id = driveFileIdFromUrl(url);
  if (!id) return false;
  for (const size of ["w1280", "w640"]) {
    if (await download(`https://lh3.googleusercontent.com/d/${id}=${size}`, dest)) return true;
  }
  return false;
}

async function main() {
  const existing: Record<string, string> = fs.existsSync(MANIFEST_PATH)
    ? JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"))
    : {};

  const manifest: Record<string, string> = { ...existing };
  const allItems = site.portfolioSections.flatMap((s) => s.items);

  let captured = 0;
  let skipped = 0;
  let failed = 0;

  for (const item of allItems) {
    console.log(`\n[${item.platform}] ${item.title}`);

    let filename: string | null = null;

    if (item.platform === "youtube") {
      const id = youtubeIdFromUrl(item.url);
      if (id) filename = `yt-${id}.jpg`;
    } else if (item.platform === "tiktok") {
      const id = tiktokIdFromUrl(item.url);
      if (id) filename = `tt-${id}.jpg`;
    } else if (item.platform === "instagram") {
      const sc = instagramShortcodeFromUrl(item.url);
      if (sc) filename = `ig-${sc}.jpg`;
    } else if (item.platform === "drive") {
      const id = driveFileIdFromUrl(item.url);
      if (id) filename = `drive-${id}.jpg`;
    }

    if (!filename) {
      console.log("    - no ID extracted, skipping");
      failed++;
      continue;
    }

    const dest = path.join(THUMBNAILS_DIR, filename);
    const localPath = `/thumbnails/${filename}`;

    if (!FORCE && fs.existsSync(dest)) {
      console.log(`    (cached) ${localPath}`);
      manifest[item.url] = localPath;
      skipped++;
      continue;
    }

    let ok = false;
    if (item.platform === "youtube") {
      ok = await youtubeThumbnail(youtubeIdFromUrl(item.url)!, dest);
    } else if (item.platform === "tiktok") {
      ok = await tiktokThumbnail(item.url, dest);
    } else if (item.platform === "instagram") {
      ok = await instagramThumbnail(item.url, dest);
    } else if (item.platform === "drive") {
      ok = await driveThumbnail(item.url, dest);
    }

    if (ok) {
      manifest[item.url] = localPath;
      console.log(`    → ${localPath}`);
      captured++;
    } else {
      console.log("    ✗ fetch failed");
      failed++;
    }
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

  console.log(`\n─────────────────────────────────`);
  console.log(`Captured: ${captured}  Cached: ${skipped}  Failed: ${failed}`);
  console.log(`Manifest: ${MANIFEST_PATH}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
