"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
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

  const activeItem = useMemo(() => {
    if (!activeUrl) return null;
    for (const section of props.portfolioSections) {
      const found = section.items.find((i) => i.url === activeUrl);
      if (found) return found;
    }
    return null;
  }, [activeUrl, props.portfolioSections]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14 md:pt-16">
      {/* ── Header ── */}
      <header className="-mx-4 mb-10 border-y border-[var(--line)] bg-gradient-to-b from-[var(--surface)]/80 to-[var(--surface)]/40 px-4 pb-8 pt-6 sm:-mx-6 sm:mb-12 sm:px-6 sm:pb-10 sm:pt-7">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-8">
          <div className="relative shrink-0">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-white/20 via-white/5 to-transparent blur-md" />
            <div className="relative h-[5.5rem] w-[5.5rem] overflow-hidden rounded-full border border-[var(--line-strong)] bg-[var(--surface)] sm:h-28 sm:w-28">
              <Image
                src={props.profileImageUrl}
                alt={props.profileImageAlt}
                fill
                className="object-cover scale-[1.35] translate-y-[5%]"
                style={{ objectPosition: "center 25%" }}
                sizes="(max-width: 640px) 88px, 112px"
                priority
              />
            </div>
          </div>
          <div className="min-w-0 flex-1 px-3 text-center sm:px-0 sm:pr-8 sm:text-left">
            <h1 className="portfolio-serif text-[clamp(2rem,6vw,3.2rem)] font-normal leading-tight tracking-tight text-[var(--ink)]">
              {props.name}
            </h1>
            <p className="mt-1.5 text-base font-medium tracking-wide text-[var(--muted)] sm:mt-2">
              {props.tagline}
            </p>
            {props.intro ? (
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[var(--muted-soft)]">
                {props.intro}
              </p>
            ) : null}

            {/* Social links */}
            <div className="mt-4 flex flex-col items-center gap-2 sm:items-start">
              {props.socials.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[13px] text-[var(--muted-soft)] transition-colors hover:text-[var(--ink)]"
                >
                  <SocialIcon
                    platform={s.platform}
                    className="h-4 w-4"
                  />
                  <span className="font-medium">{s.handle}</span>
                  <span className="text-[var(--muted-soft)]/60">·</span>
                  <span>{s.count}</span>
                </a>
              ))}
              <a
                href={`mailto:${props.email}`}
                className="inline-flex items-center gap-1.5 text-[13px] text-[var(--muted-soft)] transition-colors hover:text-[var(--ink)]"
              >
                <MailIcon className="h-4 w-4" />
                <span>{props.email}</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ── Tabs ── */}
      <nav
        className="mb-8 border-b border-[var(--line)] sm:mb-10"
        aria-label="Sections"
      >
        <div className="-mx-4 overflow-x-auto overscroll-x-contain px-4 scrollbar-none sm:mx-0 sm:overflow-visible sm:px-0">
          <div className="flex min-w-max gap-0 sm:min-w-0">
            {tabs.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={[
                    "relative -mb-px shrink-0 px-5 py-4 text-base transition-colors sm:px-6 sm:py-3.5",
                    "min-h-[48px] min-w-[48px] touch-manipulation sm:min-h-0 sm:min-w-0",
                    active
                      ? "font-semibold text-[var(--ink)]"
                      : "font-medium text-[var(--muted)] hover:text-[var(--ink)]",
                  ].join(" ")}
                >
                  {t.label}
                  {active ? (
                    <span
                      className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]"
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
        <section aria-label="Video" className="space-y-10">
          <div className="space-y-10">
            {props.portfolioSections.map((section, index) => (
              <section
                key={section.title}
                className={[
                  "-mx-4 px-4 py-6 sm:-mx-6 sm:px-6",
                  index % 2 === 0
                    ? "bg-gradient-to-br from-[var(--surface-2)]/50 to-[var(--surface-2)]/20"
                    : "bg-gradient-to-bl from-[var(--surface-3)]/35 to-[var(--surface-3)]/15",
                ].join(" ")}
              >
                <div className="mb-5 pl-1 sm:pl-0">
                  <h3 className="portfolio-serif text-2xl text-[var(--ink)]">
                    {section.title}
                  </h3>
                  {section.description ? (
                    <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                      {section.description}
                    </p>
                  ) : null}
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                  {section.items.flatMap((item) => {
                    const viewLabel =
                      item.viewsLabel ??
                      (item.computedViewCount != null
                        ? formatViewCount(item.computedViewCount)
                        : null);
                    /* ── Direct-link card (non-YouTube) ── */
                    if (item.platform !== "youtube") {
                      const portraitContent =
                        item.platform === "instagram" ||
                        item.platform === "tiktok";

                      return [
                        <div key={item.url} className="min-w-0">
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block w-full rounded-lg text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20"
                          >
                            {item.thumbnailUrl ? (
                              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
                                {portraitContent ? (
                                  <>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                      src={item.thumbnailUrl}
                                      alt=""
                                      aria-hidden
                                      className="absolute inset-0 h-full w-full scale-125 object-cover opacity-40 blur-2xl"
                                      loading="lazy"
                                    />
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                      src={item.thumbnailUrl}
                                      alt=""
                                      className="relative mx-auto h-full object-contain transition-transform duration-200 group-hover:scale-105"
                                      loading="lazy"
                                    />
                                  </>
                                ) : (
                                  <>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                      src={item.thumbnailUrl}
                                      alt=""
                                      className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                                      loading="lazy"
                                    />
                                  </>
                                )}
                                <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5">
                                  <PlatformLogo
                                    platform={item.platform}
                                    className="h-3 w-3 text-white/90"
                                  />
                                  <span className="text-[9px] font-semibold text-white/80">
                                    {platformLabel(item.platform)}
                                  </span>
                                </div>
                                {viewLabel ? (
                                  <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-medium text-white">
                                    {viewLabel}
                                  </span>
                                ) : null}
                              </div>
                            ) : (
                              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                                {/* Layered gradient background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#1e1e24] via-[#2a2535] to-[#1a1a2e]" />
                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(120,80,220,0.18),transparent_70%)]" />
                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(60,140,200,0.12),transparent_70%)]" />
                                {/* Subtle noise texture via border */}
                                <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/[0.08]" />

                                {/* Content */}
                                <div className="relative flex h-full flex-col justify-between p-3">
                                  <span className="self-start rounded bg-white/[0.08] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white/50">
                                    Client Sample
                                  </span>
                                  <div>
                                    <p className="line-clamp-2 text-xs font-semibold leading-snug text-white/80">
                                      {item.title}
                                    </p>
                                    <p className="mt-1 text-[10px] font-medium tracking-wide text-white/35">
                                      View on{" "}
                                      {platformLabel(item.platform)} ↗
                                    </p>
                                  </div>
                                </div>

                                {viewLabel ? (
                                  <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-medium text-white">
                                    {viewLabel}
                                  </span>
                                ) : null}
                              </div>
                            )}
                            <div className="mt-2 px-0.5">
                              <p className="line-clamp-2 text-sm font-medium leading-snug text-[var(--ink)]">
                                {item.title}
                              </p>
                              <p className="mt-0.5 flex items-center text-xs text-[var(--muted-soft)]">
                                <span className="truncate">
                                  {platformLabel(item.platform)}
                                  {item.note ? ` · ${item.note}` : ""}
                                </span>
                                <span
                                  className="ml-1 shrink-0 text-[var(--muted)]"
                                  aria-hidden
                                >
                                  ↗
                                </span>
                              </p>
                            </div>
                          </a>
                        </div>,
                      ];
                    }

                    /* ── Embeddable card (YouTube + Instagram) ── */
                    const selected = activeUrl === item.url;
                    const isYoutube = item.platform === "youtube";

                    const card = (
                      <div key={item.url} className="min-w-0">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveUrl((prev) =>
                              prev === item.url ? null : item.url,
                            )
                          }
                          className={[
                            "group w-full text-left rounded-lg transition-all duration-200",
                            selected
                              ? "ring-2 ring-white/25"
                              : "hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20",
                          ].join(" ")}
                        >
                          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-[var(--surface-3)]">
                            {isYoutube && item.thumbnailUrl ? (
                              <>
                                <Image
                                  src={item.thumbnailUrl}
                                  alt=""
                                  fill
                                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                                  sizes="(max-width: 639px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 sm:h-12 sm:w-12">
                                    <svg viewBox="0 0 24 24" fill="white" className="ml-0.5 h-5 w-5 sm:h-6 sm:w-6">
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
                            {viewLabel ? (
                              <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-medium text-white">
                                {viewLabel}
                              </span>
                            ) : null}
                          </div>
                          <div className="mt-2 px-0.5">
                            <p className="line-clamp-2 text-sm font-medium leading-snug text-[var(--ink)]">
                              {item.title}
                            </p>
                            <p className="mt-0.5 text-xs text-[var(--muted-soft)]">
                              {platformLabel(item.platform)}
                              {item.note ? ` · ${item.note}` : ""}
                            </p>
                          </div>
                        </button>
                      </div>
                    );

                    if (!selected) return [card];

                    const portrait = isPortraitVideo(item);

                    return [
                      card,
                      <div
                        key={`embed-${item.url}`}
                        ref={embedPanelRef}
                        className="col-span-full scroll-mt-20 overflow-hidden pt-1"
                      >
                        <div className="rounded-xl border border-[var(--line)] bg-gradient-to-b from-[var(--surface)]/95 to-[var(--surface)]/70 p-3 sm:p-5">
                          <div className="mb-3 flex flex-wrap items-center gap-3">
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line-strong)] bg-[var(--surface-3)] px-3.5 py-1.5 text-sm font-semibold text-[var(--ink)] transition-colors hover:bg-[var(--surface-4)]"
                            >
                              View on {platformLabel(item.platform)}
                              <span
                                className="text-[var(--muted)]"
                                aria-hidden
                              >
                                ↗
                              </span>
                            </a>
                            {viewLabel ? (
                              <span className="text-sm text-[var(--muted)]">
                                {viewLabel}
                              </span>
                            ) : null}
                          </div>

                          {item.embeddable && item.embedSrc ? (
                            <div
                              className={[
                                "overflow-hidden rounded-lg",
                                portrait
                                  ? "portrait-embed-shell"
                                  : "aspect-video w-full",
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
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* Skills */}
          <section
            aria-label="Skills"
            className="space-y-5 border-t border-[var(--line)] pt-10"
          >
            <h3 className="portfolio-serif text-2xl text-[var(--ink)]">
              Skills
            </h3>
            <ul className="space-y-4">
              {props.software.map((s) => (
                <li
                  key={s.title}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface)]/50 p-4"
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
            <h2 className="portfolio-serif text-[clamp(1.8rem,5vw,2.8rem)] leading-tight text-[var(--ink)]">
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
