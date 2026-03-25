import { HomeTabs, type ResolvedVideo } from "@/components/HomeTabs";
import { site, type VideoItem } from "@/data/site";
import { fetchYoutubeViewCounts } from "@/lib/youtube";

function embedSrc(v: VideoItem): string {
  if (!v.externalId.trim()) return "";
  if (v.platform === "youtube") {
    return `https://www.youtube.com/embed/${v.externalId}`;
  }
  return `https://player.vimeo.com/video/${v.externalId}`;
}

function isVideoReady(v: VideoItem): boolean {
  return v.externalId.trim().length > 0;
}

export default async function Home() {
  const youtubeIds = site.videos
    .filter((v) => v.platform === "youtube" && isVideoReady(v))
    .map((v) => v.externalId.trim());

  const youtubeViews = await fetchYoutubeViewCounts(youtubeIds);

  const videos: ResolvedVideo[] = site.videos.map((v) => {
    const ready = isVideoReady(v);
    let viewCount: number | null = null;
    if (ready) {
      if (v.manualViews != null) {
        viewCount = v.manualViews;
      } else if (v.platform === "youtube") {
        const n = youtubeViews[v.externalId.trim()];
        viewCount = Number.isFinite(n) ? n : null;
      }
    }

    return {
      ...v,
      ready,
      viewCount,
      embedSrc: ready ? embedSrc(v) : "",
    };
  });

  return (
    <HomeTabs
      name={site.name}
      tagline={site.tagline}
      profileImageUrl={site.profileImageUrl}
      profileImageAlt={site.profileImageAlt}
      videos={videos}
      software={site.software}
      tare={site.tare}
    />
  );
}
