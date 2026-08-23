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
        "Original song or verse built around one topic, product, or campaign. Final price depends on production level and usage rights.",
      prices: ["$7k–$10k"],
      references: [
        { label: "Keeper", url: "https://www.instagram.com/p/DYS3FRTqodh/" },
        { label: "Sola", url: "https://www.instagram.com/p/DZF9FzRKQrU/" },
        { label: "Hydden", url: "https://www.instagram.com/p/DVfHBG8Kixa/" },
      ],
    },
    {
      number: "02",
      title: "Product or technical explainer",
      description: "Hosted test, walkthrough, or story centered on one technical idea.",
      prices: [
        "$3k–$5k · one-day shoot",
        "$6k–$12k · graphics, sound design, or multi-day production",
        "Custom quote · larger builds",
      ],
      references: [
        { label: "ChatGPT 5.6", url: "https://youtu.be/uUW0rLfgg2g" },
        { label: "Coding interviews", url: "https://www.youtube.com/watch?v=ksZ2wFRZ3gM" },
        { label: "Cruise", url: "https://www.youtube.com/watch?v=sDIRjNzHDvM" },
      ],
    },
    {
      number: "03",
      title: "Founder or organization profile",
      description: "A hosted profile built around a person, team, or organization.",
      references: [
        { label: "Adderall / startup", url: "https://www.youtube.com/watch?v=Q5oDnaYrz3s" },
        { label: "Hangover drink", url: "https://www.youtube.com/watch?v=45kYpBJEC1w" },
        { label: "Muay Thai", url: "https://drive.google.com/file/d/1xkHsvXqYAS3c0kdW_ZaIXN0lQpuLsDzx/view?usp=sharing" },
      ],
    },
    {
      number: "04",
      title: "Hosted interview or expert breakdown",
      description: "A structured conversation, reaction, or breakdown with an expert.",
      references: [
        { label: "Uber CEO", url: "https://www.youtube.com/watch?v=NRIF-DfMsQ0&t=3s" },
        { label: "GM CEO", url: "https://www.youtube.com/watch?v=GIr_oscnob4&t=922s" },
      ],
    },
  ],
};

export default function CisPage() {
  return <PortfolioHome clientBrief={cisBrief} />;
}
