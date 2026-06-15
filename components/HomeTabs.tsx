"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
  { id: "video", label: "Video" },
  { id: "software", label: "Software" },
  { id: "tare", label: "TARE" },
];

function platformLabel(platform: PortfolioItem["platform"]) {
  if (platform === "youtube") return "YouTube";
  if (platform === "vimeo") return "Vimeo";
  if (platform === "instagram") return "Instagram";
  if (platform === "tiktok") return "TikTok";
  if (platform === "drive") return "Drive";
  return "External";
}

function isPortraitVideo(item: ResolvedPortfolioItem): boolean {
  if (item.platform === "instagram" || item.platform === "tiktok") return true;
  if (item.platform === "youtube") return item.url.includes("/shorts/");
  return false;
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48v-7.15a8.16 8.16 0 005.58 2.18v-3.45a4.85 4.85 0 01-2.41-.88 4.83 4.83 0 01-1.59-3.69z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function VimeoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197a315.065 315.065 0 003.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.263-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.482 4.807z" />
    </svg>
  );
}

function DriveIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.433 22.396l4-6.929H24l-4 6.929H4.433zm3.566-6.929L0 1.604h7.761l7.999 13.863H7.999zm8.299-1L8.535 1.604h7.758L24 14.467h-7.703z" />
    </svg>
  );
}

function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  );
}

function SocialIcon({
  platform,
  className,
}: {
  platform: string;
  className?: string;
}) {
  switch (platform) {
    case "instagram":
      return <InstagramIcon className={className} />;
    case "youtube":
      return <YouTubeIcon className={className} />;
    case "tiktok":
      return <TikTokIcon className={className} />;
    default:
      return <ExternalIcon className={className} />;
  }
}

function PlatformLogo({
  platform,
  className,
}: {
  platform: PortfolioItem["platform"];
  className?: string;
}) {
  switch (platform) {
    case "instagram":
      return <InstagramIcon className={className} />;
    case "tiktok":
      return <TikTokIcon className={className} />;
    case "vimeo":
      return <VimeoIcon className={className} />;
    case "drive":
      return <DriveIcon className={className} />;
    default:
      return <ExternalIcon className={className} />;
  }
}

export type ResolvedSocial = {
  platform: string;
  handle: string;
  url: string;
  count: string;
};

export function HomeTabs(props: {
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
}) {
  const [tab, setTab] = useState<TabId>(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "") as TabId;
      if (hash === "video" || hash === "software" || hash === "tare") return hash;
    }
    return "video";
  });
  const [activeUrl, setActiveUrl] = useState<string | null>(null);

  const embedPanelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    window.history.replaceState(null, "", `#${tab}`);
  }, [tab]);

  useEffect(() => {
    if (!activeUrl || !embedPanelRef.current) return;
    window.requestAnimationFrame(() => {
      embedPanelRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
  }, [activeUrl]);

  function MetaRow({
    item,
    viewLabel,
  }: {
    item: ResolvedPortfolioItem;
    viewLabel: string | null;
  }) {
    return (
      <div className="mt-3 flex gap-0 sm:gap-3">
        <span className="mt-0.5 hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--surface-3)] sm:flex">
          {item.platform === "youtube" ? (
            <YouTubeIcon className="h-[18px] w-[18px] text-[var(--muted)]" />
          ) : (
            <PlatformLogo
              platform={item.platform}
              className="h-[18px] w-[18px] text-[var(--muted)]"
            />
          )}
        </span>
        <div className="min-w-0">
          <p className="line-clamp-3 text-[15px] font-semibold leading-snug text-[var(--ink)] sm:line-clamp-2 sm:text-[17px]">
            {item.title}
          </p>
          <p className="mt-1 truncate text-[13px] text-[var(--muted-soft)] sm:text-[14px]">
            {platformLabel(item.platform)}
            {item.note ? ` · ${item.note}` : ""}
          </p>
          {viewLabel ? (
            <p className="text-[13px] font-medium text-[var(--muted-soft)] sm:text-[14px]">
              {viewLabel}
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  function renderCard(item: ResolvedPortfolioItem): React.ReactNode[] {
    const viewLabel =
      item.viewsLabel ??
      (item.computedViewCount != null
        ? formatViewCount(item.computedViewCount)
        : null);
    const portrait = isPortraitVideo(item);
    const aspectClass = portrait ? "aspect-[9/16]" : "aspect-video";

    /* ── Direct-link card (non-YouTube) ── */
    if (item.platform !== "youtube") {
      return [
        <div key={item.url} className="min-w-0">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full text-left"
          >
            {item.thumbnailUrl ? (
              <div
                className={`relative ${aspectClass} w-full overflow-hidden rounded-xl bg-black`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.thumbnailUrl}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            ) : (
              <div
                className={`relative ${aspectClass} w-full overflow-hidden rounded-xl`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0e0e0c] via-[#131311] to-[#0a0a09]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,250,95,0.10),transparent_70%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(200,250,95,0.05),transparent_70%)]" />
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/[0.08]" />
                <div className="relative flex h-full flex-col justify-between p-3">
                  <span className="self-start rounded bg-[var(--accent-soft)] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--accent)]">
                    Client Sample
                  </span>
                  <div>
                    <p className="line-clamp-2 text-xs font-semibold leading-snug text-white/80">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[10px] font-medium tracking-wide text-white/35">
                      View on {platformLabel(item.platform)} ↗
                    </p>
                  </div>
                </div>
              </div>
            )}
            <MetaRow item={item} viewLabel={viewLabel} />
          </a>
        </div>,
      ];
    }

    /* ── Embeddable card (YouTube) ── */
    const selected = activeUrl === item.url;

    const card = (
      <div key={item.url} className="min-w-0">
        <button
          type="button"
          onClick={() =>
            setActiveUrl((prev) => (prev === item.url ? null : item.url))
          }
          className={[
            "group w-full text-left rounded-xl transition-all duration-200",
            selected ? "ring-2 ring-[var(--accent)]/40" : "",
          ].join(" ")}
        >
          <div
            className={`relative ${aspectClass} w-full overflow-hidden rounded-xl bg-[var(--surface-3)]`}
          >
            {item.thumbnailUrl ? (
              <>
                <Image
                  src={item.thumbnailUrl}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                  sizes={portrait ? "200px" : "(max-width: 639px) 50vw, 320px"}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 sm:h-12 sm:w-12">
                    <svg
                      viewBox="0 0 24 24"
                      fill="white"
                      className="ml-0.5 h-5 w-5 sm:h-6 sm:w-6"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-[var(--surface-3)] to-[var(--surface-4)]">
                <PlatformLogo
                  platform={item.platform}
                  className="h-10 w-10 text-white/50 transition-colors group-hover:text-white/70"
                />
              </div>
            )}
          </div>
          <MetaRow item={item} viewLabel={viewLabel} />
        </button>
      </div>
    );

    if (!selected) return [card];

    return [
      card,
      <div
        key={`embed-${item.url}`}
        ref={embedPanelRef}
        className="col-span-full scroll-mt-20 overflow-hidden pt-1"
      >
        <div className="rounded-xl border border-[var(--line-strong)] bg-[var(--surface-2)] p-3 sm:p-5">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line-strong)] bg-[var(--surface-3)] px-3.5 py-1.5 text-sm font-semibold text-[var(--ink)] transition-colors hover:bg-[var(--surface-4)]"
            >
              View on {platformLabel(item.platform)}
              <span className="text-[var(--muted)]" aria-hidden>
                ↗
              </span>
            </a>
            {viewLabel ? (
              <span className="text-sm text-[var(--muted)]">{viewLabel}</span>
            ) : null}
          </div>

          {item.embeddable && item.embedSrc ? (
            <div
              className={[
                "overflow-hidden rounded-lg",
                portrait ? "portrait-embed-shell" : "aspect-video w-full",
              ].join(" ")}
            >
              {portrait ? (
                <div className="portrait-embed-frame">
                  <iframe
                    title={item.title}
                    src={item.embedSrc}
                    className="h-full w-full border-0"
                    scrolling="no"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : (
                <iframe
                  title={item.title}
                  src={item.embedSrc}
                  className="h-full w-full border-0"
                  scrolling="no"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )}
            </div>
          ) : null}

          {item.note ? (
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              {item.note}
            </p>
          ) : null}
        </div>
      </div>,
    ];
  }

  return (
    <div className="mx-auto w-full max-w-[1800px] px-4 pb-24 pt-10 sm:px-8 sm:pt-14 md:pt-16 lg:px-12 xl:px-16">
      {/* ── Header ── */}
      <header className="mb-10 pt-8 sm:mb-12 sm:pt-12">
        {/* Name row: photo baseline-aligned with name, stats on the right */}
        <div className="flex items-end justify-between gap-4">
          <div className="flex min-w-0 items-end gap-4 sm:gap-6">
            {/* Profile photo */}
            <div className="relative shrink-0">
              <div className="absolute -inset-1.5 rounded-full bg-[var(--accent)]/20 blur-md" />
              <div className="relative h-14 w-14 overflow-hidden rounded-full border border-[var(--line-strong)] bg-[var(--surface)] sm:h-20 sm:w-20">
                <Image
                  src={props.profileImageUrl}
                  alt={props.profileImageAlt}
                  fill
                  className="object-cover scale-[1.35] translate-y-[5%]"
                  style={{ objectPosition: "center 25%" }}
                  sizes="(max-width: 640px) 56px, 80px"
                  priority
                />
              </div>
            </div>
            <h1 className="text-[clamp(2.6rem,6.5vw,8rem)] font-black leading-[0.92] tracking-[-0.04em] text-[var(--ink)]">
              {props.name}
            </h1>
          </div>
          {/* Desktop stats */}
          <div className="hidden shrink-0 gap-8 pb-0.5 sm:flex lg:gap-12">
            {[
              { value: "1.3M+", label: "Total Followers" },
              { value: "500M+", label: "Views / Year" },
              { value: "8+", label: "Years" },
            ].map((st) => (
              <div key={st.label} className="text-right">
                <div className="text-[2rem] font-black leading-none tracking-tight text-[var(--accent)] lg:text-[2.6rem]">
                  {st.value}
                </div>
                <div className="mt-1.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile stats — full width under name row */}
        <div className="mt-3 flex gap-6 sm:hidden">
          {[
            { value: "1.3M+", label: "Followers" },
            { value: "500M+", label: "Views / yr" },
            { value: "8+", label: "Yrs" },
          ].map((st) => (
            <div key={st.label}>
              <div className="text-[1.5rem] font-black leading-none tracking-tight text-[var(--accent)]">
                {st.value}
              </div>
              <div className="mt-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                {st.label}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-6 border-t border-[var(--line-strong)] sm:mt-8" />

        {/* Tagline + logos + socials — full width */}
        <div className="mt-6 sm:mt-8">
          <p className="text-[1.15rem] font-bold text-[var(--ink)] sm:text-[1.4rem]">
            Video Producer, Host, Editor
          </p>

          {/* Company logos — the flex, no label needed */}
          <div className="mt-3 flex gap-2 sm:gap-3">
            {[
              { src: "/logos/BuzzFeed Name Logo.png", alt: "BuzzFeed", bg: "#EF3340", cls: "logo-scale-bf" },
              { src: "/logos/The Verge Name Logo.png", alt: "The Verge", bg: "#1A56DB", cls: "logo-scale-tv" },
              { src: "/logos/Blueprint Name Logo.png", alt: "Blueprint", bg: "#1B3FA0", cls: "logo-scale-bp" },
            ].map((co) => (
              <div
                key={co.alt}
                className="flex flex-1 h-11 items-center justify-center overflow-hidden rounded-xl sm:h-16"
                style={{ backgroundColor: co.bg }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={co.src}
                  alt={co.alt}
                  className={`h-full w-full object-contain ${co.cls}`}
                  style={{ filter: "brightness(0) invert(1)", transform: "scale(var(--ls))" }}
                />
              </div>
            ))}
          </div>

          {/* Platform stat cards */}
          <div className="mt-5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3">
            {props.socials.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-[var(--line-strong)] bg-[var(--surface-2)] px-4 py-3 transition-colors hover:border-[var(--accent)]/40 hover:bg-[var(--surface-3)] sm:px-5 sm:py-4"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/logos/${s.platform}.svg`}
                  alt={s.platform}
                  className="h-7 w-7 shrink-0 object-contain sm:h-9 sm:w-9"
                />
                <div>
                  <div className="text-[1.2rem] font-black leading-none tracking-tight text-[var(--ink)] sm:text-[1.6rem]">
                    {s.count}
                  </div>
                  <div className="mt-1 truncate text-[12px] font-medium text-[var(--muted)] sm:text-[13px]">
                    {s.handle}
                  </div>
                </div>
              </a>
            ))}
            <a
              href={`mailto:${props.email}`}
              className="flex items-center gap-3 rounded-2xl border border-[var(--accent)]/50 bg-[var(--accent-soft)] px-4 py-3 transition-colors hover:bg-[var(--accent)] hover:text-[var(--accent-on)] hover:border-[var(--accent)] group sm:px-5 sm:py-4"
            >
              <MailIcon className="h-6 w-6 shrink-0 text-[var(--accent)] group-hover:text-[var(--accent-on)] sm:h-7 sm:w-7" />
              <div>
                <div className="text-[1rem] font-black leading-none text-[var(--accent)] group-hover:text-[var(--accent-on)] sm:text-[1.1rem]">
                  Hire / Collab
                </div>
                <div className="mt-1 text-[12px] font-medium text-[var(--accent)]/70 group-hover:text-[var(--accent-on)]/70 sm:text-[13px]">
                  {props.email}
                </div>
              </div>
            </a>
          </div>
        </div>
      </header>

      {/* ── Tabs ── */}
      <nav
        className="mb-8 sm:mb-12"
        aria-label="Sections"
      >
        <div className="-mx-4 overflow-x-auto overscroll-x-contain px-4 scrollbar-none sm:mx-0 sm:overflow-visible sm:px-0">
          <div className="flex min-w-max gap-1.5 sm:min-w-0">
            {tabs.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={[
                    "relative shrink-0 cursor-pointer rounded-lg px-5 py-2.5 text-base font-semibold transition-all duration-150 sm:px-6 sm:py-3 sm:text-lg",
                    "min-h-[44px] touch-manipulation",
                    active
                      ? "bg-[var(--surface-3)] text-[var(--ink)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                      : "text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--ink)]",
                  ].join(" ")}
                >
                  {t.label}
                  {active ? (
                    <span
                      className="absolute bottom-0 left-1/2 h-[3px] w-8 -translate-x-1/2 rounded-full bg-[var(--accent)]"
                      aria-hidden
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ── Video Tab ── */}
      {tab === "video" ? (
        <section aria-label="Video" className="space-y-6 sm:space-y-8">
          <div className="space-y-6 sm:space-y-8">
            {props.portfolioSections.map((section) => (
              <section
                key={section.title}
                className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[0_1px_0_rgba(255,255,255,0.03)_inset] sm:p-8"
              >
                <div className="mb-6">
                  <h3 className="flex items-center gap-3 text-[1.6rem] font-bold tracking-tight text-[var(--ink)] sm:text-[2.2rem]">
                    <span
                      className="h-8 w-1.5 rounded-full bg-[var(--accent)] sm:h-10"
                      aria-hidden
                    />
                    {section.title}
                  </h3>
                  {section.description ? (
                    <p className="mt-3 max-w-3xl pl-[18px] text-[15px] leading-relaxed text-[var(--muted)] sm:text-[17px]">
                      {section.description}
                    </p>
                  ) : null}
                </div>

                {(() => {
                  const landscape = section.items.filter(
                    (i) => !isPortraitVideo(i),
                  );
                  const vertical = section.items.filter((i) =>
                    isPortraitVideo(i),
                  );
                  return (
                    <div className="space-y-7 sm:space-y-9">
                      {landscape.length > 0 ? (
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-x-4 gap-y-8 sm:grid-cols-[repeat(auto-fill,minmax(400px,1fr))] sm:gap-x-6 sm:gap-y-12">
                          {landscape.flatMap(renderCard)}
                        </div>
                      ) : null}
                      {vertical.length > 0 ? (
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-x-3 gap-y-7 sm:grid-cols-[repeat(auto-fill,minmax(270px,1fr))] sm:gap-x-6 sm:gap-y-12">
                          {vertical.flatMap(renderCard)}
                        </div>
                      ) : null}
                    </div>
                  );
                })()}
              </section>
            ))}
          </div>

          {/* Skills */}
          <section
            aria-label="Skills"
            className="space-y-5 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-8"
          >
            <h3 className="flex items-center gap-3 text-[1.6rem] font-bold tracking-tight text-[var(--ink)] sm:text-[2.2rem]">
              <span
                className="h-8 w-1.5 rounded-full bg-[var(--accent)] sm:h-10"
                aria-hidden
              />
              Skills
            </h3>
            <ul className="space-y-4">
              {props.software.map((s) => (
                <li
                  key={s.title}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-2)] p-4"
                >
                  <p className="text-sm font-semibold text-[var(--ink)]">
                    {s.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    {s.description}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </section>
      ) : null}

      {/* ── Software Tab ── */}
      {tab === "software" ? (
        <section aria-label="Software Resume" className="max-w-3xl space-y-12">
          {/* Resume header */}
          <header className="space-y-4 border-b border-[var(--line)] pb-8">
            <h2 className="text-[clamp(1.6rem,4vw,2.4rem)] font-bold leading-tight tracking-[-0.02em] text-[var(--ink)]">
              Software Engineer
            </h2>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[var(--muted)]">
              <span>{props.resume.location}</span>
              <a
                href={`mailto:${props.resume.email}`}
                className="transition-colors hover:text-[var(--ink)]"
              >
                {props.resume.email}
              </a>
              <a
                href={`https://${props.resume.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[var(--ink)]"
              >
                LinkedIn ↗
              </a>
            </div>
          </header>

          {/* Experience */}
          <section className="space-y-6">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-soft)]">
              Experience
            </h3>
            <div className="space-y-8">
              {props.resume.experience.map((exp) => (
                <article
                  key={`${exp.company}-${exp.role}`}
                  className="border-l-2 border-[var(--line-strong)] pl-5"
                >
                  <p className="text-sm font-medium text-[var(--muted-soft)]">
                    {exp.period}
                  </p>
                  <h4 className="mt-1 text-lg font-semibold text-[var(--ink)]">
                    {exp.company}
                  </h4>
                  <p className="text-[15px] text-[var(--muted)]">
                    {exp.role}
                  </p>
                  <ul className="mt-3 space-y-2 pl-4 text-sm leading-relaxed text-[var(--muted)]">
                    {exp.bullets.map((b) => (
                      <li
                        key={b}
                        className="list-disc marker:text-[var(--line-strong)]"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          {/* Additional Experience */}
          <section className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-soft)]">
              Additional Experience
            </h3>
            <div className="space-y-3">
              {props.resume.additional.map((item) => (
                <p
                  key={item}
                  className="border-l-2 border-[var(--line)] pl-5 text-sm leading-relaxed text-[var(--muted)]"
                >
                  {item}
                </p>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-soft)]">
              {props.resume.education.title}
            </h3>
            <div className="border-l-2 border-[var(--line)] pl-5">
              <p className="text-base font-semibold text-[var(--ink)]">
                {props.resume.education.lines[0]}
              </p>
              {props.resume.education.lines.slice(1).map((line) => (
                <p
                  key={line}
                  className="mt-1 text-sm leading-relaxed text-[var(--muted)]"
                >
                  {line}
                </p>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-soft)]">
              Skills
            </h3>
            <div className="space-y-4">
              {props.resume.skills.map((group) => (
                <div key={group.title} className="border-l-2 border-[var(--line)] pl-5">
                  <p className="text-sm font-semibold text-[var(--ink)]">
                    {group.title}
                  </p>
                  {group.lines.map((line) => (
                    <p
                      key={line}
                      className="mt-1 text-sm leading-relaxed text-[var(--muted)]"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </section>
        </section>
      ) : null}

      {/* ── TARE Tab ── */}
      {tab === "tare" ? (
        <section aria-label={props.tare.title} className="-mx-4 -mb-24 sm:-mx-6">
          {/* Logo + CTA header */}
          <div className="flex flex-col items-center gap-6 px-4 pb-10 pt-4 sm:px-6">
            <a
              href={props.tare.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <Image
                src={props.tare.logoUrl}
                alt="TARE"
                width={220}
                height={60}
                className="mx-auto h-auto w-[180px] brightness-100 transition-opacity group-hover:opacity-70 sm:w-[220px]"
                priority
              />
            </a>
            <a
              href={props.tare.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] bg-[var(--surface-2)] px-6 py-2.5 text-sm font-medium text-[var(--ink)] transition-colors hover:bg-[var(--surface-3)]"
            >
              tarestudionyc.com
              <span className="text-[var(--muted)]" aria-hidden>↗</span>
            </a>
          </div>

          {/* Full-bleed image gallery */}
          <div className="space-y-1">
            {props.tare.images.map((src) => (
              <div key={src} className="group relative w-full overflow-hidden">
                <Image
                  src={src}
                  alt=""
                  width={1920}
                  height={1080}
                  className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
