import type { Metadata } from "next";
import Image from "next/image";
import styles from "./cis.module.css";

const shareImage =
  "https://chris-jereza-portfolio.chrisnjereza.chatgpt.site/thumbnails/yt-uUW0rLfgg2g.jpg";

export const metadata: Metadata = {
  title: "CIS × Chris Jereza — Creative Formats",
  description: "Format options and reference work for the CIS content collaboration.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "CIS × Chris Jereza — Creative Formats",
    description: "Format options and reference work for the CIS content collaboration.",
    type: "website",
    images: [{ url: shareImage, width: 1280, height: 720, alt: "We Tested ChatGPT 5.6 For A Month" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CIS × Chris Jereza — Creative Formats",
    description: "Format options and reference work for the CIS content collaboration.",
    images: [shareImage],
  },
};

type WorkItem = {
  title: string;
  note: string;
  href: string;
  image: string;
};

const formats: {
  number: string;
  title: string;
  description: string;
  work: WorkItem[];
}[] = [
  {
    number: "01",
    title: "Security rap",
    description: "Original song or verse built around one topic, product, or campaign.",
    work: [
      {
        title: "Keeper Security Rap",
        note: "Client campaign",
        href: "https://www.instagram.com/p/DYS3FRTqodh/",
        image: "/thumbnails/ig-DYS3FRTqodh.jpg",
      },
      {
        title: "Sola Security Rap",
        note: "Client campaign",
        href: "https://www.instagram.com/p/DZF9FzRKQrU/",
        image: "/thumbnails/ig-DZF9FzRKQrU.jpg",
      },
      {
        title: "Hydden Security Rap",
        note: "Client campaign",
        href: "https://www.instagram.com/p/DVfHBG8Kixa/",
        image: "/thumbnails/ig-DVfHBG8Kixa.jpg",
      },
    ],
  },
  {
    number: "02",
    title: "Product or technical explainer",
    description: "Hosted test, walkthrough, or story centered on one technical idea.",
    work: [
      {
        title: "We Tested ChatGPT 5.6 For A Month",
        note: "Technical test",
        href: "https://youtu.be/uUW0rLfgg2g",
        image: "/thumbnails/yt-uUW0rLfgg2g.jpg",
      },
      {
        title: "How I Passed The Google Coding Interviews",
        note: "Technical explainer",
        href: "https://www.youtube.com/watch?v=ksZ2wFRZ3gM",
        image: "/thumbnails/yt-ksZ2wFRZ3gM.jpg",
      },
      {
        title: "Futuristic Self-Driving Cruise Vehicle",
        note: "Product story",
        href: "https://www.youtube.com/watch?v=sDIRjNzHDvM",
        image: "/thumbnails/yt-sDIRjNzHDvM.jpg",
      },
    ],
  },
  {
    number: "03",
    title: "Founder or organization profile",
    description: "A hosted profile built around a person, team, or organization.",
    work: [
      {
        title: "He Made A Drink That Prevents Hangover Symptoms",
        note: "Founder profile",
        href: "https://www.youtube.com/watch?v=45kYpBJEC1w",
        image: "/thumbnails/yt-45kYpBJEC1w.jpg",
      },
      {
        title: "What to Expect at a Muay Thai Class",
        note: "Organization profile",
        href: "https://drive.google.com/file/d/1xkHsvXqYAS3c0kdW_ZaIXN0lQpuLsDzx/view?usp=sharing",
        image: "/thumbnails/drive-1xkHsvXqYAS3c0kdW_ZaIXN0lQpuLsDzx.jpg",
      },
    ],
  },
  {
    number: "04",
    title: "Hosted interview or expert breakdown",
    description: "A structured conversation, reaction, or breakdown with an expert.",
    work: [
      {
        title: "Uber CEO Interview — Decoder",
        note: "Hosted interview",
        href: "https://www.youtube.com/watch?v=NRIF-DfMsQ0&t=3s",
        image: "/thumbnails/yt-NRIF-DfMsQ0.jpg",
      },
      {
        title: "GM CEO Interview — Decoder",
        note: "Hosted interview",
        href: "https://www.youtube.com/watch?v=GIr_oscnob4&t=922s",
        image: "/thumbnails/yt-GIr_oscnob4.jpg",
      },
    ],
  },
];

function WorkCard({ item }: { item: WorkItem }) {
  return (
    <a className={styles.workCard} href={item.href} target="_blank" rel="noopener noreferrer">
      <span className={styles.workImage}>
        <Image src={item.image} alt="" fill sizes="(max-width: 720px) 100vw, 33vw" />
        <span>Open ↗</span>
      </span>
      <span className={styles.workMeta}>
        <small>{item.note}</small>
        <strong>{item.title}</strong>
      </span>
    </a>
  );
}

export default function CisPage() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <a href="/" className={styles.identity}>
          <span>CJ</span>
          <strong>Chris Jereza</strong>
        </a>
        <p>CIS / Creative options</p>
        <a href="mailto:chris@chrisjereza.io">chris@chrisjereza.io</a>
      </nav>

      <header className={styles.header}>
        <p>CIS × Chris Jereza</p>
        <h1>Format options</h1>
        <span>
          Reference work for choosing the creative direction. Once we select the
          format and scope, I&apos;ll confirm the exact price.
        </span>
      </header>

      <section className={styles.formats}>
        {formats.map((format) => (
          <article key={format.number} className={styles.format}>
            <div className={styles.formatHeader}>
              <span>{format.number}</span>
              <div>
                <h2>{format.title}</h2>
                <p>{format.description}</p>
              </div>
            </div>
            <div className={styles.workGrid}>
              {format.work.map((item) => <WorkCard key={item.href} item={item} />)}
            </div>
          </article>
        ))}
      </section>

      <section className={styles.nextStep}>
        <p>Next step</p>
        <h2>
          Choose a format—or references to combine—and I&apos;ll send the specific
          creative, deliverables, timeline, and price.
        </h2>
        <a href="mailto:chris@chrisjereza.io">chris@chrisjereza.io ↗</a>
      </section>

      <footer className={styles.footer}>
        <span>Chris Jereza · New York City</span>
        <a href="/">Full portfolio ↗</a>
      </footer>
    </main>
  );
}
