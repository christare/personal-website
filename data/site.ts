export type VideoItem = {
  title: string;
  platform: "youtube" | "vimeo";
  /** YouTube or Vimeo video id — leave empty to show an open slot */
  externalId: string;
  /** Public watch URL — optional when slot is empty */
  url: string;
  /** Use when YOUTUBE_API_KEY is unset or for Vimeo / platforms without API access */
  manualViews?: number;
};

export type SoftwareItem = {
  title: string;
  description: string;
  href?: string;
};

export const site: {
  name: string;
  tagline: string;
  profileImageUrl: string;
  profileImageAlt: string;
  videos: VideoItem[];
  software: SoftwareItem[];
  tare: { title: string; body: string; href: string };
} = {
  name: "Chris Jereza",
  tagline: "Video · software · TARE",

  /** Resolved via unavatar from Instagram @chrisjereza; replace with /your-photo.jpg if you prefer a local file */
  profileImageUrl: "https://unavatar.io/instagram/chrisjereza",
  profileImageAlt: "Chris Jereza",

  videos: [
    {
      title: "Example — replace with your work",
      platform: "youtube",
      externalId: "YE7VzlLtp-4",
      url: "https://www.youtube.com/watch?v=YE7VzlLtp-4",
    },
    {
      title: "Video 2",
      platform: "youtube",
      externalId: "",
      url: "",
    },
    {
      title: "Video 3",
      platform: "youtube",
      externalId: "",
      url: "",
    },
    {
      title: "Video 4",
      platform: "youtube",
      externalId: "",
      url: "",
    },
    {
      title: "Video 5",
      platform: "youtube",
      externalId: "",
      url: "",
    },
  ],

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
  ],

  tare: {
    title: "TARE",
    body: "TARE Studio NYC — creative studio work and collaborations.",
    href: "https://tarestudionyc.com",
  },
};
