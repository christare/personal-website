import { HomeTabs, type ResolvedPortfolioItem } from "@/components/HomeTabs";
import { site, type PortfolioItem } from "@/data/site";
import { formatCount } from "@/lib/format";
import {
  fetchYoutubeViewCounts,
  fetchYoutubeSubscribers,
} from "@/lib/youtube";

function youtubeIdFromUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = u.pathname.slice(1);
      return id || null;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (u.pathname === "/watch") return u.searchParams.get("v");
      if (u.pathname.startsWith("/shorts/")) return u.pathname.split("/")[2] ?? null;
      if (u.pathname.startsWith("/embed/")) return u.pathname.split("/")[2] ?? null;
    }
  } catch {
    return null;
  }
  return null;
}

function vimeoIdFromUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const match = u.pathname.match(/\/(\d+)/);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}

function instagramPathFromUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host !== "instagram.com") return null;

    const parts = u.pathname.split("/").filter(Boolean);
    if (parts.length < 2) return null;
    const kind = parts[0];
    const shortcode = parts[1];
    if (!shortcode) return null;
    if (kind === "reel" || kind === "p" || kind === "tv") {
      return `${kind}/${shortcode}`;
    }
  } catch {
    return null;
  }
  return null;
}

function embedSrc(item: PortfolioItem): string | null {
  if (item.platform === "youtube") {
    const id = youtubeIdFromUrl(item.url);
    return id ? `https://www.youtube.com/embed/${id}` : null;
  }
  if (item.platform === "vimeo") {
    const id = vimeoIdFromUrl(item.url);
    return id ? `https://player.vimeo.com/video/${id}` : null;
  }
  if (item.platform === "instagram") {
    const mediaPath = instagramPathFromUrl(item.url);
    return mediaPath ? `https://www.instagram.com/${mediaPath}/embed` : null;
  }
  return null;
}

async function fetchTikTokThumbnail(url: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`,
      { signal: AbortSignal.timeout(5000) },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { thumbnail_url?: string };
    return data.thumbnail_url ?? null;
  } catch {
    return null;
  }
}

async function fetchInstagramThumbnail(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "facebookexternalhit/1.1" },
      signal: AbortSignal.timeout(8000),
      redirect: "follow",
    });
    if (!res.ok) return null;
    const html = await res.text();
    const match =
      html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/) ??
      html.match(/<meta\s+content="([^"]+)"\s+property="og:image"/);
    if (!match?.[1]) return null;
    return match[1].replace(/&amp;/g, "&");
  } catch {
    return null;
  }
}

function driveFileIdFromUrl(url: string): string | null {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return match?.[1] ?? null;
}

function driveThumbnailUrl(url: string): string | null {
  const id = driveFileIdFromUrl(url);
  return id ? `https://lh3.googleusercontent.com/d/${id}=w640` : null;
}

async function fetchInstagramFollowers(
  handle: string,
): Promise<string | null> {
  try {
    const url = `https://www.instagram.com/${handle.replace(/^@/, "")}/`;
    const res = await fetch(url, {
      headers: { "User-Agent": "facebookexternalhit/1.1" },
      signal: AbortSignal.timeout(8000),
      redirect: "follow",
    });
    if (!res.ok) return null;
    const html = await res.text();
    const match = html.match(
      /<meta\s+property="og:description"\s+content="([^"]+)"/,
    );
    if (!match?.[1]) return null;
    const followerMatch = match[1].match(
      /([\d,.]+[KMB]?)\s*Followers/i,
    );
    if (!followerMatch?.[1]) return null;
    return `${followerMatch[1]} followers`;
  } catch {
    return null;
  }
}

async function fetchExternalThumbnail(
  url: string,
  platform: string,
): Promise<string | null> {
  if (platform === "tiktok") return fetchTikTokThumbnail(url);
  if (platform === "instagram") return fetchInstagramThumbnail(url);
  if (platform === "drive") return driveThumbnailUrl(url);
  return null;
}

export default async function Home() {
  const youtubeIds = site.portfolioSections
    .flatMap((section) => section.items)
    .filter((item) => item.platform === "youtube")
    .map((item) => youtubeIdFromUrl(item.url))
    .filter((id): id is string => Boolean(id));

  const nonYtItems = site.portfolioSections
    .flatMap((s) => s.items)
    .filter(
      (i) => i.platform === "tiktok" || i.platform === "instagram",
    );

  const igSocial = site.socials.find((s) => s.platform === "instagram");
  const ytSocial = site.socials.find((s) => s.platform === "youtube");

  const [youtubeViews, externalThumbnails, igFollowers, ytSubscribers] =
    await Promise.all([
      fetchYoutubeViewCounts(youtubeIds),
      Promise.all(
        nonYtItems.map(async (item) => ({
          url: item.url,
          thumbnail: await fetchExternalThumbnail(item.url, item.platform),
        })),
      ),
      igSocial
        ? fetchInstagramFollowers(igSocial.handle)
        : Promise.resolve(null),
      ytSocial
        ? fetchYoutubeSubscribers(ytSocial.handle)
        : Promise.resolve(null),
    ]);

  const resolvedSocials = site.socials.map((s) => {
    let count: string = s.fallbackCount;
    if (s.platform === "instagram" && igFollowers) {
      count = igFollowers;
    } else if (s.platform === "youtube" && ytSubscribers != null) {
      count = formatCount(ytSubscribers, "subscribers");
    }
    return { platform: s.platform, handle: s.handle, url: s.url, count };
  });

  const thumbnailMap = new Map(
    externalThumbnails.map((r) => [r.url, r.thumbnail]),
  );

  const portfolioSections = site.portfolioSections.map((section) => ({
    ...section,
    items: section.items.map((item): ResolvedPortfolioItem => {
      const youtubeId = item.platform === "youtube" ? youtubeIdFromUrl(item.url) : null;
      const itemEmbedSrc = embedSrc(item);
      const computedViewCount =
        youtubeId && youtubeViews[youtubeId] != null ? youtubeViews[youtubeId] : null;
      const thumbnailUrl =
        item.platform === "youtube" && youtubeId
          ? `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`
          : thumbnailMap.get(item.url) ?? null;

      return {
        ...item,
        embedSrc: itemEmbedSrc,
        embeddable: Boolean(itemEmbedSrc),
        computedViewCount,
        thumbnailUrl,
      };
    }),
  }));

  return (
    <HomeTabs
      name={site.name}
      tagline={site.tagline}
      intro={site.intro}
      highlights={site.highlights}
      socials={resolvedSocials}
      email={site.resume.email}
      profileImageUrl={site.profileImageUrl}
      profileImageAlt={site.profileImageAlt}
      portfolioSections={portfolioSections}
      software={site.software}
      resume={site.resume}
      tare={site.tare}
    />
  );
}
