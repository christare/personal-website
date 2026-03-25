export type VideoItem = {
  title: string;
  platform: "youtube" | "vimeo";
  /** YouTube or Vimeo video id */
  externalId: string;
  /** Public watch URL (for “open on platform”) */
  url: string;
  /** Use when you do not set YOUTUBE_API_KEY or for Vimeo / manual stats */
  manualViews?: number;
};

export type SoftwareItem = {
  title: string;
  description: string;
  href?: string;
};

export const site = {
  name: "Your Name",
  tagline: "Video · software · experiments",

  videos: [
    {
      title: "Sample work (replace)",
      platform: "youtube",
      externalId: "dQw4w9WgXcQ",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ] satisfies VideoItem[],

  software: [
    {
      title: "Project one",
      description: "Short line about what it does.",
      href: "https://github.com",
    },
    {
      title: "Project two",
      description: "Another line; link optional.",
    },
  ] satisfies SoftwareItem[],

  tare: {
    title: "TARE",
    body: "A space for TARE — swap this copy for what you actually want to highlight (research, a series, a label, etc.).",
  },
};
