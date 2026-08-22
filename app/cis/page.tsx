import type { Metadata } from "next";
import Image from "next/image";
import styles from "./cis.module.css";

const shareImage =
  "https://chris-jereza-portfolio.chrisnjereza.chatgpt.site/thumbnails/yt-uUW0rLfgg2g.jpg";

export const metadata: Metadata = {
  title: "CIS × Chris Jereza — Content Partnership",
  description:
    "A tailored content partnership proposal for the Center for Internet Security from producer, host, editor, and engineer Chris Jereza.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "CIS × Chris Jereza — Content Partnership",
    description:
      "Cybersecurity content people actually want to watch.",
    type: "website",
    images: [
      {
        url: shareImage,
        width: 1280,
        height: 720,
        alt: "We Tested ChatGPT 5.6 For A Month",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CIS × Chris Jereza — Content Partnership",
    description: "Cybersecurity content people actually want to watch.",
    images: [shareImage],
  },
};

type WorkItem = {
  title: string;
  label: string;
  href: string;
  image: string;
};

const securityWork: WorkItem[] = [
  {
    title: "Keeper Security Rap",
    label: "Security campaign",
    href: "https://www.instagram.com/p/DYS3FRTqodh/",
    image: "/thumbnails/ig-DYS3FRTqodh.jpg",
  },
  {
    title: "Sola Security Rap",
    label: "Security campaign",
    href: "https://www.instagram.com/p/DZF9FzRKQrU/",
    image: "/thumbnails/ig-DZF9FzRKQrU.jpg",
  },
  {
    title: "Hydden Security Rap",
    label: "Security campaign",
    href: "https://www.instagram.com/p/DVfHBG8Kixa/",
    image: "/thumbnails/ig-DVfHBG8Kixa.jpg",
  },
];

const formatGroups: {
  number: string;
  eyebrow: string;
  title: string;
  pitch: string;
  cisUse: string;
  work: WorkItem[];
}[] = [
  {
    number: "01",
    eyebrow: "Music-led campaigns",
    title: "Make the security lesson impossible to forget.",
    pitch:
      "Original rap concepts turn technical language into a hook, a story, and a repeatable social format—without flattening the underlying idea.",
    cisUse:
      "For CIS: memorable launches and explainers for the CIS Controls, CIS Benchmarks, emerging threats, or priority security behaviors.",
    work: securityWork,
  },
  {
    number: "02",
    eyebrow: "Technical and product explainers",
    title: "Show the work. Keep the viewer.",
    pitch:
      "Clear, personality-led testing and explainers that make technical systems legible without turning the video into a lecture.",
    cisUse:
      "For CIS: test a security practice, walk through a common misconfiguration, or explain why a safeguard matters in real life.",
    work: [
      {
        title: "We Tested ChatGPT 5.6 For A Month",
        label: "Technical field test",
        href: "https://youtu.be/uUW0rLfgg2g",
        image: "/thumbnails/yt-uUW0rLfgg2g.jpg",
      },
      {
        title: "How I Passed The Google Coding Interviews",
        label: "Technical explainer",
        href: "https://www.youtube.com/watch?v=ksZ2wFRZ3gM",
        image: "/thumbnails/yt-ksZ2wFRZ3gM.jpg",
      },
      {
        title: "Futuristic Self-Driving Cruise Vehicle",
        label: "Product story",
        href: "https://www.youtube.com/watch?v=sDIRjNzHDvM",
        image: "/thumbnails/yt-sDIRjNzHDvM.jpg",
      },
    ],
  },
  {
    number: "03",
    eyebrow: "Human and mission stories",
    title: "Put a person inside the expertise.",
    pitch:
      "Founder, practitioner, and mission-driven profiles that give an audience a reason to care before asking them to absorb the details.",
    cisUse:
      "For CIS: spotlight the people behind community-driven best practices, member impact, or the real-world teams implementing them.",
    work: [
      {
        title: "He Made A Drink That Prevents Hangover Symptoms",
        label: "Founder profile",
        href: "https://www.youtube.com/watch?v=45kYpBJEC1w",
        image: "/thumbnails/yt-45kYpBJEC1w.jpg",
      },
      {
        title: "What to Expect at a Muay Thai Class",
        label: "Immersive profile",
        href: "https://drive.google.com/file/d/1xkHsvXqYAS3c0kdW_ZaIXN0lQpuLsDzx/view?usp=sharing",
        image: "/thumbnails/drive-1xkHsvXqYAS3c0kdW_ZaIXN0lQpuLsDzx.jpg",
      },
    ],
  },
  {
    number: "04",
    eyebrow: "Hosted expert series",
    title: "Let authority feel conversational.",
    pitch:
      "Structured interviews and myth-busting formats that preserve expert credibility while making the conversation accessible and watchable.",
    cisUse:
      "For CIS: threat breakdowns, expert reactions, practical security myths, and interviews with the people shaping safer systems.",
    work: [
      {
        title: "Uber CEO Interview — Decoder",
        label: "Flagship interview",
        href: "https://www.youtube.com/watch?v=NRIF-DfMsQ0&t=3s",
        image: "/thumbnails/yt-NRIF-DfMsQ0.jpg",
      },
      {
        title: "GM CEO Interview — Decoder",
        label: "Flagship interview",
        href: "https://www.youtube.com/watch?v=GIr_oscnob4&t=922s",
        image: "/thumbnails/yt-GIr_oscnob4.jpg",
      },
    ],
  },
];

function WorkCard({ item }: { item: WorkItem }) {
  return (
    <a
      className={styles.workCard}
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className={styles.workImage}>
        <Image src={item.image} alt="" fill sizes="(max-width: 700px) 100vw, 33vw" />
        <span className={styles.watchBadge}>Watch ↗</span>
      </span>
      <span className={styles.workMeta}>
        <small>{item.label}</small>
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
        <p>Prepared for Center for Internet Security</p>
        <a className={styles.navCta} href="mailto:chris@chrisjereza.io">
          Start a conversation
        </a>
      </nav>

      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>CIS × Chris Jereza</p>
          <h1>Cybersecurity content people actually want to watch.</h1>
          <p className={styles.lede}>
            A content partnership combining CIS&apos;s trusted, community-driven
            security expertise with social-native storytelling built to earn—and
            keep—attention.
          </p>
          <div className={styles.heroActions}>
            <a href="#formats">Explore the formats</a>
            <a href="mailto:chris@chrisjereza.io">Discuss a pilot ↗</a>
          </div>
        </div>

        <div className={styles.featuredVideo}>
          <div className={styles.videoFrame}>
            <iframe
              src="https://www.youtube.com/embed/uUW0rLfgg2g?rel=0"
              title="We Tested ChatGPT 5.6 For A Month"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className={styles.featuredCaption}>
            <span>Featured technical story</span>
            <strong>We Tested ChatGPT 5.6 For A Month</strong>
          </div>
        </div>
      </header>

      <section className={styles.fitSection}>
        <p>The fit</p>
        <h2>
          CIS makes the connected world safer through practical, recognized
          security guidance. I make complex ideas clear, human, and memorable.
        </h2>
      </section>

      <dl className={styles.proofBar}>
        <div><dt>Audience built</dt><dd>1.3M+</dd></div>
        <div><dt>Annual views</dt><dd>500M+</dd></div>
        <div><dt>Experience</dt><dd>8+ years</dd></div>
        <div><dt>Selected teams</dt><dd>BuzzFeed · The Verge · Blueprint</dd></div>
      </dl>

      <section id="formats" className={styles.formats}>
        <div className={styles.sectionIntro}>
          <p>Four content lanes</p>
          <h2>Different formats. One editorial standard.</h2>
          <span>
            Each lane can work as a standalone pilot or as part of an ongoing
            series built around CIS priorities.
          </span>
        </div>

        {formatGroups.map((group) => (
          <article key={group.number} className={styles.formatGroup}>
            <div className={styles.formatCopy}>
              <span className={styles.number}>{group.number}</span>
              <p>{group.eyebrow}</p>
              <h3>{group.title}</h3>
              <div className={styles.formatText}>
                <p>{group.pitch}</p>
                <p><strong>{group.cisUse}</strong></p>
              </div>
            </div>
            <div className={styles.workGrid}>
              {group.work.map((item) => <WorkCard key={item.href} item={item} />)}
            </div>
          </article>
        ))}
      </section>

      <section className={styles.pilot}>
        <div>
          <p className={styles.kicker}>Recommended first move</p>
          <h2>Start with one unmistakably CIS pilot.</h2>
        </div>
        <div className={styles.pilotDetails}>
          <article><span>01</span><h3>Choose one priority</h3><p>A Control, Benchmark, emerging threat, or behavior CIS wants more people to understand.</p></article>
          <article><span>02</span><h3>Build the format</h3><p>One hero concept shaped for the audience and platform—not a corporate video cut into smaller pieces.</p></article>
          <article><span>03</span><h3>Ship the system</h3><p>Hero video, social cutdowns, and a repeatable creative language CIS can extend into a series.</p></article>
        </div>
      </section>

      <section className={styles.close}>
        <p>Producer · Editor · Host · Engineer</p>
        <h2>Let&apos;s make trusted security guidance feel native to the internet.</h2>
        <a href="mailto:chris@chrisjereza.io">chris@chrisjereza.io ↗</a>
        <small>Project scope, pricing, and professional references available on request.</small>
      </section>

      <footer className={styles.footer}>
        <span>Chris Jereza · New York City</span>
        <a href="/">View full portfolio ↗</a>
      </footer>
    </main>
  );
}
