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

function platformTone(platform: PortfolioItem["platform"]) {
  return "border-white/12 bg-white/[0.04] text-zinc-200";
}

function itemKey(sectionTitle: string, url: string): string {
  return `${sectionTitle}::${url}`;
}

function isPortraitVideo(item: ResolvedPortfolioItem): boolean {
  if (item.platform === "instagram" || item.platform === "tiktok") return true;
  if (item.platform === "youtube") {
    return item.url.includes("/shorts/");
  }
  return false;
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
  resume: {
    location: string;
    email: string;
    linkedin: string;
    experience: ResumeExperience[];
    additional: string[];
    education: ResumeSection;
    skills: ResumeSection[];
  };
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
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

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
    <div className="mx-auto w-full max-w-6xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14 md:pt-16">
      <header className="-mx-4 mb-10 border-y border-[var(--line)] bg-[var(--surface)]/72 px-4 pb-8 pt-6 sm:-mx-6 sm:mb-12 sm:px-6 sm:pb-10 sm:pt-7">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-8">
          <div className="relative h-[5.5rem] w-[5.5rem] shrink-0 overflow-hidden rounded-full border border-[var(--line-strong)] bg-[var(--surface)] sm:h-28 sm:w-28">
            <Image
              src={props.profileImageUrl}
              alt={props.profileImageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 88px, 112px"
              priority
            />
          </div>
          <div className="min-w-0 flex-1 px-3 text-center sm:px-0 sm:pr-8 sm:text-left">
            <h1 className="portfolio-serif text-[clamp(2rem,6vw,3.2rem)] font-normal leading-tight tracking-tight text-[var(--ink)]">
              {props.name}
            </h1>
            <p className="mt-2.5 text-sm leading-relaxed tracking-[0.01em] text-[var(--muted)] sm:mt-3">
              {props.tagline}
            </p>
            <ul className="mt-5 flex flex-wrap justify-center gap-2 pl-1 sm:pl-0 sm:justify-start">
              {props.highlights.map((h) => (
                <li
                  key={h}
                  className="rounded-full border border-[var(--line)] bg-[var(--surface-2)] px-3 py-1 text-[11px] font-medium tracking-wide text-[var(--muted)]"
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
            {props.portfolioSections.map((section, index) => (
              <section
                key={section.title}
                className={[
                  "space-y-4 -mx-4 px-4 py-4 sm:-mx-6 sm:px-6",
                  index % 2 === 0 ? "bg-[var(--surface-2)]/45" : "bg-[var(--surface-3)]/32",
                ].join(" ")}
              >
                <div className="border-b border-[var(--line)] pb-3 pl-1 sm:pl-0">
                  <h3 className="portfolio-serif text-2xl text-[var(--ink)]">
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
                            "w-full rounded-xl border px-3 py-3 text-left transition-colors sm:px-4",
                            selected
                              ? "border-[var(--line-strong)] bg-[var(--surface-3)]"
                              : "border-[var(--line)] bg-[var(--surface)]/40 hover:bg-[var(--surface-2)]",
                          ].join(" ")}
                          aria-expanded={selected}
                        >
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                            <span className="pr-2 text-[15px] font-medium leading-relaxed text-[var(--ink)]">
                              {item.title}
                            </span>
                            <div className="flex shrink-0 flex-wrap items-center gap-2 text-[11px] text-[var(--muted)]">
                              <span
                                className={[
                                  "rounded-full border px-2.5 py-1 font-medium",
                                  platformTone(item.platform),
                                ].join(" ")}
                              >
                                {platformLabel(item.platform)}
                              </span>
                              {item.viewsLabel ? (
                                <span className="rounded-full border border-[var(--line)] px-2.5 py-1 text-[var(--muted)]">
                                  {item.viewsLabel}
                                </span>
                              ) : null}
                              <span>{selected ? "Collapse" : "Expand"}</span>
                            </div>
                          </div>
                        </button>

                        {selected ? (
                          <article className="mt-3 space-y-4 rounded-xl bg-[var(--surface-2)]/60 p-3 sm:p-4">
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex min-h-[44px] items-center rounded-md border border-[var(--line-strong)] bg-[var(--surface-3)] px-4 text-xs font-semibold tracking-wide text-[var(--ink)] transition-colors hover:bg-black"
                            >
                              View on {platformLabel(item.platform)}
                              <span className="ml-2 text-[var(--muted)]" aria-hidden>↗</span>
                            </a>

                            {item.embeddable && item.embedSrc ? (
                              <div
                                className={[
                                  "overflow-hidden",
                                  isPortraitVideo(item)
                                    ? "portrait-embed-shell -mx-4 sm:mx-auto"
                                    : "-mx-4 sm:-mx-5",
                                ].join(" ")}
                              >
                                <div
                                  className={
                                    isPortraitVideo(item)
                                      ? "portrait-embed-frame"
                                      : "aspect-video w-full"
                                  }
                                >
                                  <iframe
                                    title={item.title}
                                    src={item.embedSrc}
                                    className="h-full w-full"
                                    scrolling="no"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                  />
                                </div>
                              </div>
                            ) : null}

                            <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
                              <span
                                className={[
                                  "rounded-full border px-2.5 py-1 font-medium",
                                  platformTone(item.platform),
                                ].join(" ")}
                              >
                                {platformLabel(item.platform)}
                              </span>
                              {item.viewsLabel ? (
                                <span className="rounded-full border border-[var(--line)] px-2.5 py-1">
                                  {item.viewsLabel}
                                </span>
                              ) : item.computedViewCount != null ? (
                                <span className="rounded-full border border-[var(--line)] px-2.5 py-1">
                                  {formatViewCount(item.computedViewCount)}
                                </span>
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

          <section aria-label="Skills" className="space-y-5 border-t border-[var(--line)] pt-10">
            <h3 className="portfolio-serif text-2xl text-[var(--ink)]">Skills</h3>
            <ul className="space-y-4">
              {props.software.map((s) => (
                <li
                  key={s.title}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface)]/50 p-4"
                >
                  <p className="text-sm font-semibold text-[var(--ink)]">{s.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    {s.description}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </section>
      ) : null}

      {tab === "software" ? (
        <section aria-label="Software Resume" className="space-y-8">
          <header className="space-y-2 border-b border-[var(--line)] pb-5">
            <h2 className="portfolio-serif text-3xl text-[var(--ink)]">Software Resume</h2>
            <p className="text-sm text-[var(--muted)]">
              {props.resume.location} · {props.resume.email} · {props.resume.linkedin}
            </p>
          </header>

          <section className="space-y-5">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
              Experience
            </h3>
            <div className="space-y-4">
              {props.resume.experience.map((exp) => (
                <article
                  key={`${exp.company}-${exp.role}`}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface)]/55 p-4"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h4 className="text-base font-semibold text-[var(--ink)]">
                      {exp.company} · {exp.role}
                    </h4>
                    <span className="text-xs text-[var(--muted)]">{exp.period}</span>
                  </div>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--muted)]">
                    {exp.bullets.map((b) => (
                      <li key={b} className="list-disc pl-1 marker:text-[var(--line-strong)]">
                        {b}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
              Additional Experience
            </h3>
            <ul className="space-y-2 text-sm leading-relaxed text-[var(--muted)]">
              {props.resume.additional.map((item) => (
                <li key={item} className="list-disc pl-1 marker:text-[var(--line-strong)]">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
              {props.resume.education.title}
            </h3>
            <div className="space-y-1 text-sm leading-relaxed text-[var(--muted)]">
              {props.resume.education.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
              Skills
            </h3>
            <div className="space-y-3">
              {props.resume.skills.map((group) => (
                <div key={group.title} className="rounded-xl border border-[var(--line)] bg-[var(--surface)]/40 p-4">
                  <p className="text-sm font-semibold text-[var(--ink)]">{group.title}</p>
                  {group.lines.map((line) => (
                    <p key={line} className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </section>
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
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-lg border border-[var(--line-strong)] bg-[var(--surface-3)] px-5 text-sm font-semibold tracking-wide text-[var(--ink)] transition-colors hover:bg-black sm:w-auto sm:min-h-0 sm:justify-start sm:px-6 sm:py-3.5"
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
