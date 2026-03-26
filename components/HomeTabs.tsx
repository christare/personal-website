"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { PortfolioItem, PortfolioSection, SoftwareItem } from "@/data/site";
import { formatViewCount } from "@/lib/format";

export type ResolvedPortfolioItem = PortfolioItem & {
  embedSrc: string | null;
  embeddable: boolean;
  computedViewCount: number | null;
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

function itemKey(sectionTitle: string, url: string): string {
  return `${sectionTitle}::${url}`;
}

export function HomeTabs(props: {
  name: string;
  tagline: string;
  intro: string;
  highlights: string[];
  profileImageUrl: string;
  profileImageAlt: string;
  portfolioSections: ResolvedSection[];
  software: SoftwareItem[];
  tare: { title: string; body: string; href: string };
}) {
  const [tab, setTab] = useState<TabId>("video");

  const allItems = useMemo(
    () => props.portfolioSections.flatMap((section) => section.items),
    [props.portfolioSections],
  );

  const firstEmbeddable = allItems.find((item) => item.embeddable) ?? null;
  const [activeUrl, setActiveUrl] = useState<string | null>(
    firstEmbeddable?.url ?? allItems[0]?.url ?? null,
  );

  const activeRowRefs = useRef<Record<string, HTMLLIElement | null>>({});

  useEffect(() => {
    if (tab !== "video" || !activeUrl) return;

    const key = Object.keys(activeRowRefs.current).find((k) =>
      k.endsWith(`::${activeUrl}`),
    );
    if (!key) return;

    const target = activeRowRefs.current[key];
    if (!target) return;

    window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }, [activeUrl, tab]);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-24 pt-10 sm:px-6 sm:pt-16 md:pt-20">
      <header className="mb-10 border-b border-[var(--line)] pb-8 sm:mb-12 sm:pb-10">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-8">
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
          <div className="min-w-0 flex-1 text-center sm:text-left">
            <h1 className="portfolio-serif text-[clamp(2rem,6vw,3.15rem)] font-normal leading-tight tracking-tight text-[var(--ink)]">
              {props.name}
            </h1>
            <p className="mt-2.5 text-sm leading-relaxed tracking-wide text-[var(--muted)] sm:mt-3">
              {props.tagline}
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted)] sm:mx-0">
              {props.intro}
            </p>
            <ul className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
              {props.highlights.map((h) => (
                <li
                  key={h}
                  className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-1 text-[11px] font-medium tracking-wide text-[var(--muted)]"
                >
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <nav className="mb-8 border-b border-[var(--line)] sm:mb-10" aria-label="Sections">
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
        <section aria-label="Video" className="space-y-10">
          <div className="space-y-10">
            {props.portfolioSections.map((section) => (
              <section key={section.title} className="space-y-4">
                <div className="border-b border-[var(--line)] pb-3">
                  <h3 className="portfolio-serif text-xl text-[var(--ink)]">
                    {section.title}
                  </h3>
                  {section.description ? (
                    <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                      {section.description}
                    </p>
                  ) : null}
                </div>
                <ul className="grid gap-3">
                  {section.items.map((item) => {
                    const key = itemKey(section.title, item.url);
                    const selected = activeUrl === item.url;
                    return (
                      <li
                        key={`${section.title}-${item.title}`}
                        ref={(el) => {
                          activeRowRefs.current[key] = el;
                        }}
                        className="scroll-mt-24"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setActiveUrl((prev) =>
                              prev === item.url ? null : item.url,
                            );
                          }}
                          className={[
                            "w-full rounded-lg border px-3 py-3 text-left transition-colors sm:px-4",
                            selected
                              ? "border-[var(--accent)] bg-[var(--surface)]"
                              : "border-[var(--line)] bg-transparent hover:bg-[var(--surface)]",
                          ].join(" ")}
                          aria-expanded={selected}
                        >
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                            <span className="pr-2 text-sm leading-relaxed text-[var(--ink)]">
                              {item.title}
                            </span>
                            <div className="flex shrink-0 flex-wrap items-center gap-2 text-[11px] text-[var(--muted)]">
                              <span className="rounded border border-[var(--line)] bg-[var(--surface)] px-2 py-0.5">
                                {platformLabel(item.platform)}
                              </span>
                              {item.viewsLabel ? <span>{item.viewsLabel}</span> : null}
                              <span>{selected ? "Collapse" : "Expand"}</span>
                            </div>
                          </div>
                        </button>

                        {selected ? (
                          <article className="mt-3 space-y-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 sm:p-5">
                            {item.embeddable && item.embedSrc ? (
                              <div className="overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--bg)]">
                                <div className="aspect-video w-full">
                                  <iframe
                                    title={item.title}
                                    src={item.embedSrc}
                                    className="h-full w-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                  />
                                </div>
                              </div>
                            ) : (
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-[44px] items-center rounded-md border border-[var(--line)] bg-[var(--surface)] px-4 text-xs font-medium text-[var(--ink)] transition-colors hover:bg-[var(--bg)]"
                              >
                                Open original on {platformLabel(item.platform)}
                              </a>
                            )}
                            {item.platform === "instagram" ? (
                              <p className="text-xs leading-relaxed text-[var(--muted)]">
                                Prefer the native Instagram experience? Use{" "}
                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="underline decoration-[var(--line)] underline-offset-4 transition-colors hover:text-[var(--ink)]"
                                >
                                  Open original
                                </a>
                                .
                              </p>
                            ) : null}

                            <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
                              <span className="rounded-md border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 font-medium">
                                {platformLabel(item.platform)}
                              </span>
                              {item.viewsLabel ? (
                                <span>{item.viewsLabel}</span>
                              ) : item.computedViewCount != null ? (
                                <span>{formatViewCount(item.computedViewCount)}</span>
                              ) : null}
                            </div>

                            {item.note ? (
                              <p className="text-xs leading-relaxed text-[var(--muted)]">
                                {item.note}
                              </p>
                            ) : null}
                          </article>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
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
