"use client";

import Image from "next/image";
import { useState } from "react";
import type { SoftwareItem, VideoItem } from "@/data/site";
import { formatViewCount } from "@/lib/format";

export type ResolvedVideo = VideoItem & {
  ready: boolean;
  viewCount: number | null;
  embedSrc: string;
};

type TabId = "video" | "software" | "tare";

const tabs: { id: TabId; label: string }[] = [
  { id: "video", label: "Video" },
  { id: "software", label: "Software" },
  { id: "tare", label: "TARE" },
];

function platformLabel(platform: VideoItem["platform"]) {
  return platform === "youtube" ? "YouTube" : "Vimeo";
}

export function HomeTabs(props: {
  name: string;
  tagline: string;
  profileImageUrl: string;
  profileImageAlt: string;
  videos: ResolvedVideo[];
  software: SoftwareItem[];
  tare: { title: string; body: string; href: string };
}) {
  const [tab, setTab] = useState<TabId>("video");

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-24 pt-12 sm:px-6 sm:pt-20 md:pt-24">
      <header className="mb-12 border-b border-[var(--line)] pb-8 sm:mb-14 sm:pb-10">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8">
          <div className="relative h-[5.5rem] w-[5.5rem] shrink-0 overflow-hidden rounded-full border border-[var(--line)] bg-[var(--surface)] shadow-[0_1px_0_rgba(0,0,0,0.04)] sm:h-28 sm:w-28">
            <Image
              src={props.profileImageUrl}
              alt={props.profileImageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 88px, 112px"
              priority
            />
          </div>
          <div className="min-w-0 flex-1 text-center sm:pt-1 sm:text-left">
            <h1 className="portfolio-serif text-[clamp(2rem,6vw,3rem)] font-normal leading-tight tracking-tight text-[var(--ink)]">
              {props.name}
            </h1>
            <p className="mt-2.5 text-sm leading-relaxed tracking-wide text-[var(--muted)] sm:mt-3">
              {props.tagline}
            </p>
          </div>
        </div>
      </header>

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
                    "relative -mb-px shrink-0 px-4 py-3.5 text-sm transition-colors sm:py-3",
                    "min-h-[44px] min-w-[44px] touch-manipulation sm:min-h-0 sm:min-w-0",
                    active
                      ? "font-medium text-[var(--ink)]"
                      : "text-[var(--muted)] hover:text-[var(--ink)]",
                  ].join(" ")}
                >
                  {t.label}
                  {active ? (
                    <span
                      className="absolute inset-x-4 bottom-0 h-px bg-[var(--accent)]"
                      aria-hidden
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {tab === "video" ? (
        <section aria-label="Video" className="space-y-14 sm:space-y-16">
          {props.videos.length === 0 ? (
            <p className="text-sm text-[var(--muted)]">
              Add entries in{" "}
              <code className="text-[var(--ink)]">data/site.ts</code>.
            </p>
          ) : (
            props.videos.map((v, index) => (
              <article
                key={`video-slot-${index}`}
                className="space-y-4"
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--muted)]">
                  Slot {index + 1} of {props.videos.length}
                </p>
                <div className="overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--surface)] shadow-[0_1px_0_rgba(0,0,0,0.04)]">
                  {v.ready && v.embedSrc ? (
                    <div className="aspect-video w-full">
                      <iframe
                        title={v.title}
                        src={v.embedSrc}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 bg-[var(--bg)] px-6 text-center">
                      <span className="text-sm font-medium text-[var(--ink)]">
                        Open slot
                      </span>
                      <span className="max-w-xs text-xs leading-relaxed text-[var(--muted)]">
                        Set <code className="text-[var(--ink)]">externalId</code>{" "}
                        and <code className="text-[var(--ink)]">url</code> in{" "}
                        <code className="text-[var(--ink)]">data/site.ts</code>{" "}
                        for this row.
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-x-4 sm:gap-y-2">
                  <h2 className="min-w-0 text-base font-medium leading-snug text-[var(--ink)] sm:text-lg">
                    {v.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 sm:shrink-0 sm:justify-end">
                    <span className="rounded-md border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 text-[11px] font-medium text-[var(--muted)]">
                      {platformLabel(v.platform)}
                    </span>
                    {v.ready ? (
                      v.viewCount != null ? (
                        <span className="text-xs text-[var(--muted)]">
                          {formatViewCount(v.viewCount)}
                        </span>
                      ) : (
                        <span
                          className="text-xs text-[var(--muted)]"
                          title="Set manualViews in data/site.ts or add YOUTUBE_API_KEY for YouTube"
                        >
                          Views unavailable
                        </span>
                      )
                    ) : (
                      <span className="text-xs text-[var(--muted)]">—</span>
                    )}
                  </div>
                </div>
                {v.ready && v.url.trim() ? (
                  <a
                    href={v.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center text-xs text-[var(--muted)] underline decoration-[var(--line)] underline-offset-4 transition-colors hover:text-[var(--ink)] sm:min-h-0"
                  >
                    Open on {platformLabel(v.platform)}
                  </a>
                ) : null}
              </article>
            ))
          )}
        </section>
      ) : null}

      {tab === "software" ? (
        <section aria-label="Software" className="space-y-8">
          <ul className="space-y-6">
            {props.software.map((s) => (
              <li
                key={s.title}
                className="border-b border-[var(--line)] pb-6 last:border-0"
              >
                {s.href ? (
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block py-1"
                  >
                    <span className="font-medium text-[var(--ink)] decoration-[var(--line)] underline-offset-4 group-hover:underline">
                      {s.title}
                    </span>
                    <span className="ml-1 text-[var(--muted)] opacity-0 transition-opacity group-hover:opacity-100">
                      ↗
                    </span>
                  </a>
                ) : (
                  <span className="font-medium text-[var(--ink)]">{s.title}</span>
                )}
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {s.description}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {tab === "tare" ? (
        <section aria-label={props.tare.title} className="space-y-6">
          <h2 className="sr-only">{props.tare.title}</h2>
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            {props.tare.body}
          </p>
          <a
            href={props.tare.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface)] px-5 text-sm font-medium text-[var(--ink)] shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-colors hover:border-[var(--muted)] hover:bg-[var(--bg)] sm:w-auto sm:min-h-0 sm:justify-start sm:px-6 sm:py-3.5"
          >
            tarestudionyc.com
            <span className="ml-2 text-[var(--muted)]" aria-hidden>
              ↗
            </span>
          </a>
        </section>
      ) : null}
    </div>
  );
}
