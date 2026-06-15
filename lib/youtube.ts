type YoutubeStatsResponse = {
  items?: Array<{
    id: string;
    statistics?: { viewCount?: string };
  }>;
};

type YoutubeChannelResponse = {
  items?: Array<{
    statistics?: { subscriberCount?: string; hiddenSubscriberCount?: boolean };
  }>;
};

export async function fetchYoutubeViewCounts(
  videoIds: string[],
): Promise<Record<string, number>> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key || videoIds.length === 0) return {};

  const unique = [...new Set(videoIds)];
  const out: Record<string, number> = {};

  // API allows up to 50 ids per request
  for (let i = 0; i < unique.length; i += 50) {
    const chunk = unique.slice(i, i + 50);
    const url = new URL("https://www.googleapis.com/youtube/v3/videos");
    url.searchParams.set("part", "statistics");
    url.searchParams.set("id", chunk.join(","));
    url.searchParams.set("key", key);

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!res.ok) continue;

    const data = (await res.json()) as YoutubeStatsResponse;
    for (const item of data.items ?? []) {
      const raw = item.statistics?.viewCount;
      if (raw != null) out[item.id] = Number.parseInt(raw, 10);
    }
  }

  return out;
}

export async function fetchYoutubeSubscribers(
  handle: string,
): Promise<number | null> {
  const key = process.env.YOUTUBE_API_KEY;

  // Try official API first if key is available
  if (key) {
    try {
      const url = new URL("https://www.googleapis.com/youtube/v3/channels");
      url.searchParams.set("part", "statistics");
      url.searchParams.set("forHandle", handle.replace(/^@/, ""));
      url.searchParams.set("key", key);

      const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
      if (res.ok) {
        const data = (await res.json()) as YoutubeChannelResponse;
        const stats = data.items?.[0]?.statistics;
        if (stats && !stats.hiddenSubscriberCount && stats.subscriberCount != null) {
          return Number.parseInt(stats.subscriberCount, 10);
        }
      }
    } catch {
      // fall through to scrape
    }
  }

  // Fall back to scraping the public channel page
  try {
    const url = `https://www.youtube.com/${handle.startsWith("@") ? handle : "@" + handle}`;
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        "Accept-Language": "en-US,en;q=0.9",
      },
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const html = await res.text();

    // YouTube embeds subscriber count in the ytInitialData blob
    const match = html.match(/"subscriberCountText":\{"simpleText":"([^"]+)"/);
    if (!match?.[1]) return null;

    // Parse e.g. "810K subscribers" → 810000
    const raw = match[1].replace(/\s*subscribers?/i, "").trim();
    const num = parseFloat(raw);
    if (isNaN(num)) return null;
    if (raw.endsWith("K")) return Math.round(num * 1_000);
    if (raw.endsWith("M")) return Math.round(num * 1_000_000);
    if (raw.endsWith("B")) return Math.round(num * 1_000_000_000);
    return Math.round(num);
  } catch {
    return null;
  }
}
