import { HomeTabs, type ResolvedPortfolioItem } from "@/components/HomeTabs";
import { site, type PortfolioItem } from "@/data/site";
import { fetchYoutubeViewCounts } from "@/lib/youtube";

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

export default async function Home() {
  const youtubeIds = site.portfolioSections
    .flatMap((section) => section.items)
    .filter((item) => item.platform === "youtube")
    .map((item) => youtubeIdFromUrl(item.url))
    .filter((id): id is string => Boolean(id));

  const youtubeViews = await fetchYoutubeViewCounts(youtubeIds);

  const portfolioSections = site.portfolioSections.map((section) => ({
    ...section,
    items: section.items.map((item): ResolvedPortfolioItem => {
      const youtubeId = item.platform === "youtube" ? youtubeIdFromUrl(item.url) : null;
      const itemEmbedSrc = embedSrc(item);
      const computedViewCount =
        youtubeId && youtubeViews[youtubeId] != null ? youtubeViews[youtubeId] : null;

      return {
        ...item,
        embedSrc: itemEmbedSrc,
        embeddable: Boolean(itemEmbedSrc),
        computedViewCount,
      };
    }),
  }));

  return (
    <HomeTabs
      name={site.name}
      tagline={site.tagline}
      intro={site.intro}
      highlights={site.highlights}
      profileImageUrl={site.profileImageUrl}
      profileImageAlt={site.profileImageAlt}
      portfolioSections={portfolioSections}
      software={site.software}
      tare={site.tare}
    />
  );
}
