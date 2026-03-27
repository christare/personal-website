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
  if (!key) return null;

  try {
    const url = new URL("https://www.googleapis.com/youtube/v3/channels");
    url.searchParams.set("part", "statistics");
    url.searchParams.set("forHandle", handle.replace(/^@/, ""));
    url.searchParams.set("key", key);

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!res.ok) return null;

    const data = (await res.json()) as YoutubeChannelResponse;
    const stats = data.items?.[0]?.statistics;
    if (!stats || stats.hiddenSubscriberCount) return null;
    const raw = stats.subscriberCount;
    return raw != null ? Number.parseInt(raw, 10) : null;
  } catch {
    return null;
  }
}
