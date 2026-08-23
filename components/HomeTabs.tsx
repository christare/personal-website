"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type {
  PortfolioItem,
  PortfolioSection,
  ResumeExperience,
  ResumeSection,
  SoftwareItem,
} from "@/data/site";
import { formatViewCount } from "@/lib/format";

export type ResolvedPortfolioItem = PortfolioItem & {
  embedSrc: string | null;
  embeddable: boolean;
  computedViewCount: number | null;
  thumbnailUrl: string | null;
};

type ResolvedSection = Omit<PortfolioSection, "items"> & {
  items: ResolvedPortfolioItem[];
};

type TabId = "video" | "software" | "tare";

const tabs: { id: TabId; label: string }[] = [
  { id: "video", label: "Videos" },
  { id: "software", label: "Engineering" },
  { id: "tare", label: "TARE" },
];

function platformLabel(platform: PortfolioItem["platform"]) {
  if (platform === "youtube") return "YouTube";
  if (platform === "vimeo") return "Vimeo";
  if (platform === "instagram") return "Instagram";
  if (platform === "tiktok") return "TikTok";
  if (platform === "drive") return "Google Drive";
  return "External";
}

function isPortraitVideo(item: ResolvedPortfolioItem) {
  return (
    item.platform === "instagram" ||
    item.platform === "tiktok" ||
    (item.platform === "youtube" && item.url.includes("/shorts/"))
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.5v13l10-6.5-10-6.5Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export type ResolvedSocial = {
  platform: string;
  handle: string;
  url: string;
  count: string;
};

export type ClientBrief = {
  eyebrow: string;
  title: string;
  description: string;
  formats: {
    number: string;
    title: string;
    description: string;
    prices?: { range: string; detail: string }[];
    references: { label: string; url: string }[];
  }[];
};

type HomeTabsProps = {
  name: string;
  tagline: string;
  intro: string;
  highlights: string[];
  socials: ResolvedSocial[];
  email: string;
  profileImageUrl: string;
  profileImageAlt: string;
  portfolioSections: ResolvedSection[];
  software: SoftwareItem[];
  resume: {
    location: string;
    email: string;
    linkedin: string;
    experience: ResumeExperience[];
    additional: string[];
    education: ResumeSection;
    skills: ResumeSection[];
  };
  tare: { title: string; href: string; logoUrl: string; images: string[] };
  clientBrief?: ClientBrief;
};

function VideoCard({
  item,
  playing,
  onToggle,
}: {
  item: ResolvedPortfolioItem;
  playing: boolean;
  onToggle: () => void;
}) {
  const portrait = isPortraitVideo(item);
  const viewLabel =
    item.viewsLabel ??
    (item.computedViewCount != null
      ? formatViewCount(item.computedViewCount)
      : null);
  const canPlayHere = item.embeddable && Boolean(item.embedSrc);
  const mediaClass = portrait ? "aspect-[9/16]" : "aspect-video";
  const playerSrc = item.embedSrc
    ? `${item.embedSrc}${item.embedSrc.includes("?") ? "&" : "?"}autoplay=1&rel=0`
    : null;

  return (
    <article className="video-card group min-w-0">
      <div className={`video-media relative ${mediaClass}`}>
        {playing && playerSrc ? (
          <>
            <iframe
              src={playerSrc}
              title={item.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            <button
              type="button"
              onClick={onToggle}
              className="player-close"
              aria-label={`Close ${item.title}`}
            >
              Close
            </button>
          </>
        ) : canPlayHere ? (
          <button
            type="button"
            onClick={onToggle}
            className="absolute inset-0 block h-full w-full cursor-pointer text-left"
            aria-label={`Play ${item.title}`}
          >
            {item.thumbnailUrl ? (
              // Social CDN hosts rotate, so portfolio thumbnails use the browser image loader.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.thumbnailUrl}
                alt=""
                className="video-thumbnail h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <span className="absolute inset-0 bg-[var(--surface-2)]" />
            )}
            <span className="play-button"><PlayIcon /></span>
          </button>
        ) : (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 block"
            aria-label={`View ${item.title} on ${platformLabel(item.platform)}`}
          >
            {item.thumbnailUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.thumbnailUrl} alt="" className="video-thumbnail h-full w-full object-cover" loading="lazy" />
            ) : (
              <span className="external-placeholder">
                <span>{platformLabel(item.platform)}</span>
                <ArrowIcon />
              </span>
            )}
            <span className="external-badge"><ArrowIcon /></span>
          </a>
        )}
      </div>

      <div className="pt-3">
        <h3 className="line-clamp-2 text-[15px] font-semibold leading-[1.35] text-[var(--ink)] sm:text-base">
          {item.title}
        </h3>
        <p className="mt-1 text-[13px] leading-5 text-[var(--muted)]">
          {platformLabel(item.platform)}{viewLabel ? ` · ${viewLabel}` : ""}
        </p>
        {item.note ? <p className="line-clamp-2 text-[13px] leading-5 text-[var(--muted-soft)]">{item.note}</p> : null}
      </div>
    </article>
  );
}

export function HomeTabs(props: HomeTabsProps) {
  const [tab, setTab] = useState<TabId>("video");
  const [playingUrls, setPlayingUrls] = useState<string[]>([]);
  const portfolioByUrl = new Map(
    props.portfolioSections.flatMap((section) => section.items).map((item) => [item.url, item]),
  );
  const clientReferenceUrls = new Set(
    props.clientBrief?.formats.flatMap((format) => format.references.map((reference) => reference.url)) ?? [],
  );
  const displayedPortfolioSections = props.clientBrief
    ? props.portfolioSections
        .map((section) => ({
          ...section,
          items: section.items.filter((item) => !clientReferenceUrls.has(item.url)),
        }))
        .filter((section) => section.items.length > 0)
    : props.portfolioSections;

  useEffect(() => {
    const fromHash = window.location.hash.replace("#", "") as TabId;
    if (tabs.some((item) => item.id === fromHash)) setTab(fromHash);
  }, []);

  useEffect(() => {
    window.history.replaceState(null, "", `#${tab}`);
  }, [tab]);

  function togglePlayer(url: string) {
    setPlayingUrls((current) =>
      current.includes(url)
        ? current.filter((playingUrl) => playingUrl !== url)
        : [...current, url],
    );
  }

  return (
    <div className="min-h-screen">
      <header className="site-header">
        <a href="#video" onClick={() => setTab("video")} className="brand" aria-label="Chris Jereza home">
          <span className="brand-mark">CJ</span>
          <span className="hidden sm:block">Chris Jereza</span>
        </a>
        <nav className="header-tabs" aria-label="Portfolio sections">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={tab === item.id ? "active" : ""}
              aria-current={tab === item.id ? "page" : undefined}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <a className="contact-button" href={`mailto:${props.email}`}>
          <MailIcon />
          <span className="hidden sm:inline">Get in touch</span>
        </a>
      </header>

      <main className="site-shell">
        <section className="profile-panel" aria-labelledby="profile-title">
          <div className="profile-photo">
            <Image
              src={props.profileImageUrl}
              alt={props.profileImageAlt}
              fill
              className="scale-[1.32] translate-y-[5%] object-cover"
              style={{ objectPosition: "center 25%" }}
              sizes="(max-width: 640px) 88px, 128px"
              priority
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="eyebrow">Producer · Editor · Host · Engineer</p>
            <h1 id="profile-title">{props.name}</h1>
            <p className="profile-intro">{props.intro}</p>
            <div className="credential-row" aria-label="Selected experience">
              <span>BuzzFeed</span><span>The Verge</span><span>Blueprint</span>
            </div>
          </div>

          <dl className="proof-grid">
            <div><dt>Audience</dt><dd>1.4M+</dd></div>
            <div><dt>Annual views</dt><dd>500M+</dd></div>
            <div><dt>Experience</dt><dd>8+ years</dd></div>
          </dl>
        </section>

        <div className="social-strip" aria-label="Social profiles">
          {props.socials.map((social) => (
            <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/logos/${social.platform}.svg`} alt="" />
              <span><strong>{social.count}</strong><small>{social.handle}</small></span>
              <ArrowIcon />
            </a>
          ))}
        </div>

        {tab === "video" && props.clientBrief ? (
          <section className="client-brief" aria-labelledby="client-brief-title">
            <div className="client-brief-heading">
              <div>
                <p className="eyebrow">{props.clientBrief.eyebrow}</p>
                <h2 id="client-brief-title">{props.clientBrief.title}</h2>
              </div>
              <p>{props.clientBrief.description}</p>
            </div>

            <div className="client-format-list">
              {props.clientBrief.formats.map((format) => {
                const samples = format.references
                  .map((reference) => portfolioByUrl.get(reference.url) ?? null)
                  .filter((item): item is ResolvedPortfolioItem => Boolean(item));
                const portraitOnly = samples.length > 0 && samples.every(isPortraitVideo);

                return (
                  <article key={format.number} className="client-format">
                    <div className="client-format-header">
                      <span className="client-format-number">{format.number}</span>
                      <div className="client-format-copy">
                        <h3>{format.title}</h3>
                        <p>{format.description}</p>
                      </div>
                      {format.prices ? (
                        <div className="client-format-prices">
                          {format.prices.map((price) => (
                            <div className="client-price" key={`${price.range}-${price.detail}`}>
                              <strong>{price.range}</strong>
                              <span>{price.detail}</span>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>

                    <div className={`client-format-video-grid${portraitOnly ? " portrait" : ""}`}>
                      {samples.map((item) => (
                        <VideoCard
                          key={item.url}
                          item={item}
                          playing={playingUrls.includes(item.url)}
                          onToggle={() => togglePlayer(item.url)}
                        />
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}

        {tab === "video" ? (
          <section className="content-stack" aria-label="Video work">
            {props.clientBrief ? (
              <section className="portfolio-archive-intro" aria-labelledby="additional-work-title">
                <div>
                  <p className="eyebrow">Additional portfolio</p>
                  <h2 id="additional-work-title">More work</h2>
                </div>
                <p>
                  Broader editorial, branded, viral, and independent work. These are
                  portfolio examples—not additional CIS format options.
                </p>
              </section>
            ) : null}

            {displayedPortfolioSections.map((section) => {
              const landscape = section.items.filter((item) => !isPortraitVideo(item));
              const portrait = section.items.filter(isPortraitVideo);
              return (
                <section key={section.title} className="work-section">
                  <div className="section-heading">
                    <div>
                      <h2>{section.title}</h2>
                      {section.description ? <p>{section.description}</p> : null}
                    </div>
                    <span>{section.items.length} videos</span>
                  </div>
                  {landscape.length ? (
                    <div className="landscape-grid">
                      {landscape.map((item) => (
                        <VideoCard key={item.url} item={item} playing={playingUrls.includes(item.url)} onToggle={() => togglePlayer(item.url)} />
                      ))}
                    </div>
                  ) : null}
                  {portrait.length ? (
                    <div className="portrait-grid">
                      {portrait.map((item) => (
                        <VideoCard key={item.url} item={item} playing={playingUrls.includes(item.url)} onToggle={() => togglePlayer(item.url)} />
                      ))}
                    </div>
                  ) : null}
                </section>
              );
            })}

            <section className="skills-panel" aria-labelledby="video-skills">
              <div><p className="eyebrow">Capabilities</p><h2 id="video-skills">From pitch to publish.</h2></div>
              <div className="skills-grid">
                {props.software.map((skill) => (
                  <article key={skill.title}><h3>{skill.title}</h3><p>{skill.description}</p></article>
                ))}
              </div>
            </section>
          </section>
        ) : null}

        {tab === "software" ? (
          <section className="resume-layout" aria-label="Engineering resume">
            <aside>
              <p className="eyebrow">Engineering</p>
              <h2>Systems built for real-world complexity.</h2>
              <p>{props.resume.location}</p>
              <a href={`mailto:${props.resume.email}`}>{props.resume.email}</a>
              <a href={`https://${props.resume.linkedin}`} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowIcon /></a>
            </aside>
            <div className="resume-content">
              <section>
                <p className="resume-label">Experience</p>
                {props.resume.experience.map((experience) => (
                  <article key={`${experience.company}-${experience.role}`} className="experience-item">
                    <div><h3>{experience.company}</h3><p>{experience.role}</p></div>
                    <time>{experience.period}</time>
                    <ul>{experience.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                  </article>
                ))}
              </section>
              <section className="resume-section">
                <p className="resume-label">Additional experience</p>
                {props.resume.additional.map((item) => <p key={item}>{item}</p>)}
              </section>
              <section className="resume-section">
                <p className="resume-label">{props.resume.education.title}</p>
                {props.resume.education.lines.map((line) => <p key={line}>{line}</p>)}
              </section>
              <section className="resume-section">
                <p className="resume-label">Skills</p>
                <div className="resume-skills">
                  {props.resume.skills.map((group) => (
                    <article key={group.title}><h3>{group.title}</h3>{group.lines.map((line) => <p key={line}>{line}</p>)}</article>
                  ))}
                </div>
              </section>
            </div>
          </section>
        ) : null}

        {tab === "tare" ? (
          <section className="tare-panel" aria-label={props.tare.title}>
            <div className="tare-intro">
              <Image src={props.tare.logoUrl} alt="TARE" width={220} height={60} priority />
              <p>A creative studio built for sharp ideas, strong stories, and work people actually want to watch.</p>
              <a href={props.tare.href} target="_blank" rel="noopener noreferrer">Visit TARE <ArrowIcon /></a>
            </div>
            <div className="tare-gallery">
              {props.tare.images.map((src) => <Image key={src} src={src} alt="" width={1920} height={1080} sizes="100vw" />)}
            </div>
          </section>
        ) : null}
      </main>

      <footer><p>Chris Jereza · New York City</p><a href={`mailto:${props.email}`}>{props.email}</a></footer>
    </div>
  );
}
