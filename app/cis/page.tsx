import type { Metadata } from "next";
import type { ClientBrief } from "@/components/HomeTabs";
import { PortfolioHome } from "@/app/page";

const shareImage =
  "https://chris-jereza-portfolio.chrisnjereza.chatgpt.site/thumbnails/yt-uUW0rLfgg2g.jpg";

export const metadata: Metadata = {
  title: "CIS × Chris Jereza — Creative Formats",
  description: "Format options, pricing, and reference work for CIS.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "CIS × Chris Jereza — Creative Formats",
    description: "Format options, pricing, and reference work for CIS.",
    type: "website",
    images: [{ url: shareImage, width: 1280, height: 720, alt: "We Tested ChatGPT 5.6 For A Month" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CIS × Chris Jereza — Creative Formats",
    description: "Format options, pricing, and reference work for CIS.",
    images: [shareImage],
  },
};

const cisBrief: ClientBrief = {
  eyebrow: "CIS × Chris Jereza",
  title: "Formats + pricing",
  description:
    "References show format and production style only. Final messaging will be tailored to CIS, the selected topic, and the intended audience.",
  formats: [
    {
      number: "01",
      title: "Rappers Teach",
      description:
        "A complete original track and video: custom-produced beat, written and professionally recorded modern rap verse, mixing and mastering, and a lyric/graphics video. Built as an evergreen asset for ads, events, presentations, and campaign use. Final price depends on production level and usage rights.",
      prices: ["$7k–$10k"],
      references: [
        { label: "Keeper", url: "https://www.instagram.com/p/DYS3FRTqodh/" },
        { label: "Sola", url: "https://www.instagram.com/p/DZF9FzRKQrU/" },
        { label: "Hydden", url: "https://www.instagram.com/p/DVfHBG8Kixa/" },
      ],
    },
    {
      number: "02",
      title: "Product or technical profile",
      description: "A clear, hosted piece about a product, topic, framework, or technical idea.",
      prices: [
        "$3k–$5k · one-day shoot",
        "$6k–$10k · scripting, graphics, sound design, or multiple deliverables",
        "$10k–$12k+ · multi-day or technically complex production",
      ],
      references: [
        { label: "ChatGPT 5.6", url: "https://youtu.be/uUW0rLfgg2g" },
        { label: "Coding interviews", url: "https://www.youtube.com/watch?v=ksZ2wFRZ3gM" },
        { label: "Cruise", url: "https://www.youtube.com/watch?v=sDIRjNzHDvM" },
      ],
    },
    {
      number: "03",
      title: "Narrative film or organization profile",
      description: "A story-led film built around a person, organization, mission, or transformation.",
      prices: [
        "$5k–$8k · one-day, one-location story",
        "$8k–$15k · deeper story development or multi-day production",
        "$15k+ · larger documentary-style production",
      ],
      references: [
        { label: "Adderall / startup", url: "https://www.youtube.com/watch?v=Q5oDnaYrz3s" },
        { label: "Hangover drink", url: "https://www.youtube.com/watch?v=45kYpBJEC1w" },
        { label: "Muay Thai", url: "https://drive.google.com/file/d/1xkHsvXqYAS3c0kdW_ZaIXN0lQpuLsDzx/view?usp=sharing" },
      ],
    },
  ],
};

export default function CisPage() {
  return <PortfolioHome clientBrief={cisBrief} />;
}
