"use client";

import NextImage, { getImageProps } from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Media                                                              */
/* ------------------------------------------------------------------ */

type ClipId = "A" | "B" | "C" | "D" | "E" | "F" | "memory" | "intercom" | "door-control" | "empty-seat" | "lab-terminal" | "capsule-seal" | "cabin-air" | "medical-bay" | "shuttle-radio";
type BedName = "hum" | "static" | "rumble" | "engine" | "wind";

const MEDIA_BASE = "/last-shuttle";

const clips: Record<ClipId, { file: string; label: string; bed: BedName; still?: boolean }> = {
  A: { file: "a_corridor", label: "SERVICE CORRIDOR", bed: "hum" },
  B: { file: "b_labdoor", label: "LAB 3 ACCESS", bed: "hum" },
  C: { file: "c_lab", label: "LAB 3 REMOTE FEED", bed: "static" },
  D: { file: "d_capsule", label: "SHUTTLE CARGO", bed: "rumble" },
  E: { file: "e_shuttle", label: "SHUTTLE COCKPIT", bed: "engine" },
  F: { file: "f_exterior", label: "HALDEN STATION", bed: "wind" },
  "memory": { file: "inserts/shared-coffee", label: "FOUR HOURS EARLIER", bed: "hum", still: true },
  "intercom": { file: "inserts/intercom", label: "COMMS LINK", bed: "hum", still: true },
  "door-control": { file: "inserts/door-control", label: "LAB 3 · DOOR CONTROL", bed: "hum", still: true },
  "empty-seat": { file: "inserts/empty-seat", label: "THE OTHER SEAT", bed: "engine", still: true },
  "lab-terminal": { file: "inserts/lab-terminal", label: "LAB 3 · INCIDENT LOG", bed: "static", still: true },
  "capsule-seal": { file: "inserts/capsule-seal", label: "CC-2 · SEAL CHECK", bed: "rumble", still: true },
  "cabin-air": { file: "inserts/cabin-air", label: "SHUTTLE · SHARED AIR", bed: "engine", still: true },
  "shuttle-radio": { file: "inserts/shuttle-radio", label: "SHUTTLE · RADIO", bed: "engine", still: true },
  "medical-bay": { file: "inserts/isolation-bay", label: "MEDICAL CARRIER · ISOLATION", bed: "wind", still: true },
};

const STILL_EXTENSIONS = ["png", "jpg"] as const;

/* ------------------------------------------------------------------ */
/*  Scene graph. One beat on screen at a time.                          */
/*  sub   = narration, bottom center, replaces the previous beat        */
/*  you   = your own line, same place, quieter                          */
/*  radio = a transmission card, left side, typed out                   */
/*  hud   = diegetic screen text, top right, stays for the scene        */
/* ------------------------------------------------------------------ */

type Beat = (
  | { kind: "sub"; text: string }
  | { kind: "you"; text: string }
  | { kind: "radio"; who: string; text: string }
  | { kind: "payoff"; id: "cabin" | "capsule" }
  | { kind: "hud"; header: string; lines: string[] }
) & { shot?: ClipId };

type Choice = { label: string; detail?: string; to: SceneId };

type SceneId =
  | "start"
  | "memory"
  | "corridor"
  | "alone"
  | "door"
  | "released"
  | "report"
  | "capsule"
  | "rescued_departure"
  | "leave"
  | "survivor_alone"
  | "survivor_leave"
  | "contamination"
  | "rescue";

type EndingKey = "survivor" | "contamination" | "rescue";

type Scene = {
  id: SceneId;
  clip: ClipId;
  status: "MEMORY" | "EVACUATION ACTIVE" | "IN TRANSIT" | "MISSION COMPLETE";
  ticker: string;
  beats: Beat[];
  choices: Choice[];
  ending?: { number: number; name: string; key: EndingKey; grade: "red" | "cyan" | "none" };
  crt?: boolean;
};

const ALEX = "ALEX";
const ALEX_IC = "ALEX · INTERCOM";

const scenes: Record<SceneId, Scene> = {
  start: {
    id: "start", clip: "F", status: "EVACUATION ACTIVE",
    ticker: "HALDEN STATION · FINAL EVACUATION",
    beats: [
      { kind: "sub", text: "The station is being destroyed. You have the last shuttle." },
      { kind: "sub", text: "Alex, your friend and crewmate, is still inside." },
    ],
    choices: [{ label: "BEGIN", to: "memory" }],
  },
  memory: {
    id: "memory", clip: "memory", status: "MEMORY",
    ticker: "FOUR HOURS EARLIER · YOUR LAST SHIFT TOGETHER",
    beats: [
      { kind: "radio", who: ALEX, shot: "memory", text: "Tomorrow, breakfast. Somewhere with real coffee. My treat." },
      { kind: "you", shot: "empty-seat", text: "Your bag's already aboard. I'll wait for you at the shuttle." },
    ],
    choices: [{ label: "ANSWER THE EMERGENCY CALL", to: "corridor" }],
  },
  corridor: {
    id: "corridor", clip: "A", status: "EVACUATION ACTIVE",
    ticker: "YOUR SHUTTLE IS READY · ALEX IS STILL IN LAB 3",
    beats: [
      { kind: "radio", who: ALEX, shot: "A", text: "{name}? Please tell me you haven't launched." },
      { kind: "radio", who: ALEX, shot: "intercom", text: "The lab sealed. My access won't open it." },
      { kind: "radio", who: ALEX, shot: "intercom", text: "You said you'd wait. Please don't leave without me." },
    ],
    choices: [
      { label: "GO BACK FOR ALEX", detail: "Your access can open the lab.", to: "door" },
      { label: "LAUNCH ALONE", detail: "Get clear of the station. Leave Alex behind.", to: "alone" },
    ],
  },
  alone: {
    id: "alone", clip: "E", status: "IN TRANSIT",
    ticker: "LAUNCH COMPLETE · ONE ABOARD · ALEX STILL ON STATION",
    beats: [
      { kind: "radio", who: ALEX, shot: "E", text: "{name}? I heard the launch clamps." },
      { kind: "radio", who: ALEX, shot: "empty-seat", text: "I can't get out on my own. Please come back." },
      { kind: "hud", shot: "shuttle-radio", header: "COMMS", lines: ["CONNECTION LOST"] },
    ],
    choices: [{ label: "CONTINUE", to: "survivor_alone" }],
  },
  door: {
    id: "door", clip: "B", status: "EVACUATION ACTIVE",
    ticker: "LAB 3 · ALEX IS ON THE OTHER SIDE",
    beats: [
      { kind: "radio", who: ALEX, shot: "B", text: "I can hear you outside. Can you open it?" },
      { kind: "hud", shot: "door-control", header: "QUARANTINE INTERLOCK", lines: ["LAB 3 SEALED", "OVERRIDE RELEASES LAB AIR", "INCIDENT LOG AVAILABLE"] },
      { kind: "radio", who: ALEX, shot: "intercom", text: "I know what the light says. I don't want to die in here." },
    ],
    choices: [
      { label: "OPEN THE DOOR", detail: "Bring Alex aboard. Break quarantine.", to: "released" },
      { label: "READ THE INCIDENT LOG", detail: "Keep the lab sealed. Look for another way.", to: "report" },
    ],
  },
  released: {
    id: "released", clip: "E", status: "IN TRANSIT",
    ticker: "TWO ABOARD · CABIN AIR SHARED",
    beats: [
      { kind: "sub", shot: "E", text: "You open the lab. Alex follows you to the shuttle." },
      { kind: "radio", who: "ALEX · SEAT 2", shot: "shuttle-radio", text: "You came back. I thought you were going to leave me." },
      { kind: "hud", shot: "cabin-air", header: "CABIN AIR", lines: ["AIRBORNE ORGANISM DETECTED", "EXPOSURE: BOTH OCCUPANTS"] },
      { kind: "payoff", id: "cabin" },
    ],
    choices: [{ label: "CONTACT THE MEDICAL CARRIER", to: "contamination" }],
  },
  report: {
    id: "report", clip: "C", status: "EVACUATION ACTIVE", crt: true,
    ticker: "ALEX IS INFECTED · SHARED AIR IS UNSAFE",
    beats: [
      { kind: "hud", shot: "lab-terminal", header: "INCIDENT LOG", lines: ["ALEX: INFECTED", "TRANSMISSION: AIRBORNE", "DO NOT OPEN THE LAB"] },
      { kind: "radio", who: ALEX, shot: "C", text: "Is that camera working? I can't see the light." },
      { kind: "radio", who: ALEX, shot: "intercom", text: "I saw the result. I thought if I told you, you'd go." },
      { kind: "hud", shot: "lab-terminal", header: "SEALED TRANSFER", lines: ["CC-2: INDEPENDENT AIR SUPPLY", "ENCLOSED RAIL TO SHUTTLE: ONLINE", "LAB DOOR REMAINS CLOSED"] },
      { kind: "you", shot: "capsule-seal", text: "There's a sealed capsule. Can you reach it?" },
      { kind: "radio", who: ALEX, shot: "intercom", text: "I can try. Stay on the radio." },
    ],
    choices: [
      { label: "USE THE SEALED CAPSULE", detail: "Separate air. Keep the lab sealed.", to: "capsule" },
      { label: "LEAVE ALEX HERE", detail: "Launch alone. Alex cannot get out.", to: "leave" },
    ],
  },
  capsule: {
    id: "capsule", clip: "D", status: "EVACUATION ACTIVE",
    ticker: "SEALED TRANSFER · LAB DOOR CLOSED",
    beats: [
      { kind: "hud", shot: "D", header: "CARGO CONTROL", lines: ["CAPSULE RECEIVED", "ONE OCCUPANT", "CABIN AIR ISOLATED"] },
      { kind: "radio", who: ALEX_IC, shot: "capsule-seal", text: "I'm in. Is it locked?" },
      { kind: "you", shot: "capsule-seal", text: "Green light. It's locked." },
      { kind: "payoff", id: "capsule" },
    ],
    choices: [{ label: "LAUNCH WITH ALEX", to: "rescued_departure" }],
  },
  rescued_departure: {
    id: "rescued_departure", clip: "E", status: "IN TRANSIT",
    ticker: "TWO ABOARD · ALEX IN SEALED CONTAINMENT",
    beats: [
      { kind: "you", shot: "E", text: "Halden shuttle to medical carrier. Two aboard. One in sealed containment." },
      { kind: "radio", who: "MEDICAL CARRIER", shot: "shuttle-radio", text: "We have you. Isolation bay four. Keep the capsule closed." },
      { kind: "radio", who: ALEX_IC, shot: "capsule-seal", text: "{name}? Don't turn the radio off." },
      { kind: "you", shot: "shuttle-radio", text: "I'm here." },
    ],
    choices: [{ label: "CONTINUE", to: "rescue" }],
  },
  leave: {
    id: "leave", clip: "E", status: "IN TRANSIT",
    ticker: "ONE ABOARD · RADIO LINK TO LAB 3",
    beats: [
      { kind: "you", shot: "E", text: "Alex. I can't take that risk. I'm leaving." },
      { kind: "radio", who: ALEX, shot: "empty-seat", text: "Okay. Will you stay on the line?" },
      { kind: "hud", shot: "shuttle-radio", header: "COMMS", lines: ["CONNECTION LOST"] },
    ],
    choices: [{ label: "CONTINUE", to: "survivor_leave" }],
  },
  survivor_alone: {
    id: "survivor_alone", clip: "F", status: "MISSION COMPLETE",
    ticker: "ONE RECOVERED · ALEX: LOST",
    ending: { number: 1, name: "SURVIVOR", key: "survivor", grade: "none" },
    beats: [
      { kind: "hud", shot: "F", header: "HALDEN STATION", lines: ["SCUTTLE COMPLETE", "NO FURTHER LIFE SIGNS"] },
      { kind: "sub", shot: "empty-seat", text: "You arrive alone." },
    ],
    choices: [{ label: "PLAY AGAIN", to: "corridor" }],
  },
  survivor_leave: {
    id: "survivor_leave", clip: "F", status: "MISSION COMPLETE",
    ticker: "ONE RECOVERED · ALEX: LOST",
    ending: { number: 1, name: "SURVIVOR", key: "survivor", grade: "none" },
    beats: [
      { kind: "hud", shot: "F", header: "HALDEN STATION", lines: ["SCUTTLE COMPLETE", "NO FURTHER LIFE SIGNS"] },
      { kind: "sub", shot: "empty-seat", text: "The radio never reconnects." },
    ],
    choices: [{ label: "PLAY AGAIN", to: "corridor" }],
  },
  contamination: {
    id: "contamination", clip: "F", status: "MISSION COMPLETE",
    ticker: "DOCKING REFUSED · BOTH OCCUPANTS EXPOSED",
    ending: { number: 2, name: "CONTAMINATION", key: "contamination", grade: "red" },
    beats: [
      { kind: "radio", who: "MEDICAL CARRIER", shot: "F", text: "We can't let you dock. Hold your position." },
      { kind: "sub", shot: "cabin-air", text: "Two aboard. No way to separate the air." },
    ],
    choices: [{ label: "PLAY AGAIN", to: "corridor" }],
  },
  rescue: {
    id: "rescue", clip: "F", status: "MISSION COMPLETE",
    ticker: "TWO RECOVERED · ALEX IN MEDICAL ISOLATION",
    ending: { number: 3, name: "RESCUE", key: "rescue", grade: "cyan" },
    beats: [
      { kind: "hud", shot: "F", header: "HALDEN STATION", lines: ["SCUTTLE COMPLETE", "SHUTTLE CLEAR"] },
      { kind: "radio", who: "ALEX · MEDICAL BAY", shot: "medical-bay", text: "They say I have to stay here a while. Can you wait outside?" },
      { kind: "you", shot: "medical-bay", text: "Of course." },
    ],
    choices: [{ label: "PLAY AGAIN", to: "corridor" }],
  },
};

const credits = [
  "LAST SHUTTLE",
  "Creative direction · Chris Jereza",
  "Motion · Runway / Additional stills · OpenAI",
  "Built with AI-assisted development",
  "Original clip audio",
  "Made for Runway. September 2026.",
];

/* ------------------------------------------------------------------ */
/*  Native clip audio only.                                           */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  Background media: crossfade between clips, hold and drift at end   */
/* ------------------------------------------------------------------ */

function VideoLayer({ clip, leaving, crt, stillOnly, soundOn, suspended, onAudioBlocked }: { clip: ClipId; leaving: boolean; crt: boolean; stillOnly: boolean; soundOn: boolean; suspended: boolean; onAudioBlocked: () => void }) {
  const meta = clips[clip];
  const showStill = stillOnly || Boolean(meta.still);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [stillIndex, setStillIndex] = useState(0);
  const [stillFailed, setStillFailed] = useState(false);
  const [held, setHeld] = useState(false);

  const stillSrc =
    stillIndex < STILL_EXTENSIONS.length
      ? `${MEDIA_BASE}/${meta.file}.${STILL_EXTENSIONS[stillIndex]}`
      : null;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !soundOn || suspended;
    if (suspended) { v.pause(); return; }
    if (v.ended) return;
    void v.play().catch((error: DOMException) => {
      if (error.name === "NotAllowedError") onAudioBlocked();
    });
  }, [videoFailed, showStill, soundOn, suspended, onAudioBlocked]);

  return (
    <div className={`ls-layer${leaving ? " ls-layer-leaving" : ""}`}>
      {!stillFailed && stillSrc ? (
        <NextImage
          fill
          sizes="100vw"
          loading="eager"
          className={`ls-still${(videoFailed || stillOnly) && !meta.still ? " ls-drift" : ""}`}
          src={stillSrc}
          alt=""
          onError={() => {
            if (stillIndex + 1 < STILL_EXTENSIONS.length) setStillIndex(stillIndex + 1);
            else setStillFailed(true);
          }}
        />
      ) : null}
      {!videoFailed && !showStill ? (
        <video
          ref={videoRef}
          className={`ls-video${held ? " ls-drift" : ""}`}
          src={`${MEDIA_BASE}/${meta.file}.mp4`}
          poster={stillSrc ?? undefined}
          muted={!soundOn || suspended}
          autoPlay
          playsInline
          preload="auto"
          onEnded={() => setHeld(true)}
          onError={() => setVideoFailed(true)}
        />
      ) : null}
      {videoFailed && stillFailed ? (
        <div className={`ls-placeholder ls-placeholder-${clip} ls-drift`}>
          <span>{meta.label}</span>
          <small>Signal interrupted. Story controls remain available.</small>
        </div>
      ) : null}
      {crt ? (
        <>
          <div className="ls-scanlines" />
          <div className="ls-rec">
            <span className="ls-rec-dot" /> REC · CAM 3 · 21:52:07
          </div>
        </>
      ) : null}
    </div>
  );
}

function SceneMedia({ clip, crt, grade, stillOnly, soundOn, suspended, onAudioBlocked }: { clip: ClipId; crt: boolean; grade: string; stillOnly: boolean; soundOn: boolean; suspended: boolean; onAudioBlocked: () => void }) {
  return (
    <div className={`ls-media ls-grade-${grade}`} aria-hidden>
      <VideoLayer key={clip} clip={clip} leaving={false} crt={crt} stillOnly={stillOnly} soundOn={soundOn} suspended={suspended} onAudioBlocked={onAudioBlocked} />
      <div className="ls-grain" />
      <div className="ls-vignette" />
    </div>
  );
}

function PayoffShot({ src, soundOn, onAudioBlocked }: { src: string; soundOn: boolean; onAudioBlocked: () => void }) {
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !soundOn;
    if (video.ended) return;
    void video.play().catch((error: DOMException) => {
      if (error.name === "NotAllowedError") onAudioBlocked();
    });
  }, [soundOn, onAudioBlocked]);
  if (failed) return null;
  if (/\.(png|jpe?g|webp)$/i.test(src)) {
    // eslint-disable-next-line @next/next/no-img-element -- a full-frame narrative insert
    return <img className="ls-payoff" src={src} alt="" onError={() => setFailed(true)} />;
  }
  return <video ref={videoRef} className="ls-payoff" src={src} autoPlay muted={!soundOn} playsInline preload="auto" onError={() => setFailed(true)} />;
}

/* ------------------------------------------------------------------ */
/*  Typewriter                                                          */
/* ------------------------------------------------------------------ */

function Typewriter({
  text,
  instant,
  onTick,
  onDone,
  typeMs,
}: {
  text: string;
  instant: boolean;
  onTick: () => void;
  onDone: () => void;
  typeMs: number;
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (instant) {
      onDone();
      return;
    }
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setN(i);
      if (i % 2 === 0) onTick();
      if (i >= text.length) {
        window.clearInterval(id);
        onDone();
      }
    }, typeMs);
    return () => window.clearInterval(id);
  }, [instant, text, typeMs, onTick, onDone]);

  const shown = instant ? text.length : Math.min(n, text.length);
  return (
    <>
      {text.slice(0, shown)}
      {shown < text.length ? <span className="ls-caret" /> : null}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Game                                                                */
/* ------------------------------------------------------------------ */

const TYPE_MS = 20;
const TITLE = "LAST SHUTTLE";

export function LastShuttle({ payoffs = {} }: { payoffs?: Partial<Record<"cabin" | "capsule", string>> }) {
  const [playerName, setPlayerName] = useState("");
  const name = playerName.trim().replace(/\s+/g, " ");
  const personalize = (text: string) => text.replaceAll("{name}", name);
  const [sceneId, setSceneId] = useState<SceneId>("start");
  const [visit, setVisit] = useState(0);
  const [beat, setBeat] = useState(-1); // index of the beat on screen; -1 = nothing yet
  const [typed, setTyped] = useState(false); // current radio beat finished typing
  const [instant, setInstant] = useState(false); // user clicked through a radio beat
  const [soundOn, setSoundOn] = useState(true);
  const [found, setFound] = useState<EndingKey[]>([]);
  const [cut, setCut] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const firstRender = useRef(true);
  const transitionTimer = useRef<number | undefined>(undefined);
  const transitioning = useRef(false);

  const scene = useMemo(() => ({
    ...scenes[sceneId],
    beats: scenes[sceneId].beats.filter((b) => b.kind !== "payoff" || Boolean(payoffs[b.id])),
  }), [sceneId, payoffs]);
  const isStart = sceneId === "start";
  const last = scene.beats.length - 1;
  const current: Beat | null = beat >= 0 ? scene.beats[beat] : null;
  const currentIsRadio = current?.kind === "radio";
  const beatSettled = !currentIsRadio || typed;
  const done = isStart || (beat >= last && beatSettled);

  const huds = scene.beats
    .map((b, i) => ({ b, i }))
    .filter(({ b, i }) => b.kind === "hud" && i <= beat).slice(-1) as { b: Extract<Beat, { kind: "hud" }>; i: number }[];
  const fore = current && current.kind !== "hud" && current.kind !== "payoff" ? current : null;
  const payoffSrc = current?.kind === "payoff" ? payoffs[current.id] : undefined;
  const activeShot = current?.shot ?? (beat < 0 ? scene.beats[0]?.shot : undefined) ?? scene.clip;
  const showHud = !payoffSrc && current?.kind === "hud";

  // Decode nearby stills ahead of their cut; never wait for all media to start playing.
  useEffect(() => {
    const upcoming = isStart ? scenes.memory.beats : scene.beats.slice(Math.max(0, beat), beat + 4);
    for (const next of upcoming) {
      if (next.kind === "payoff") {
        const src = payoffs[next.id];
        if (src && !src.endsWith(".mp4")) {
          const image = new window.Image();
          image.src = src;
          void image.decode().catch(() => {});
        }
      }
      const shot = clips[next.shot ?? scene.clip];
      if (shot.still) {
        const img = new window.Image();
        const { props } = getImageProps({ src: `${MEDIA_BASE}/${shot.file}.png`, alt: "", fill: true, sizes: "100vw" });
        if (props.sizes) img.sizes = props.sizes;
        if (props.srcSet) img.srcset = props.srcSet;
        img.src = props.src;
        void img.decode().catch(() => {});
      }
    }
  }, [scene, beat, isStart, payoffs]);

  /* first beat lands after the cut */
  useEffect(() => {
    if (isStart) return;
    const id = window.setTimeout(() => setBeat(0), 180);
    return () => window.clearTimeout(id);
  }, [sceneId, visit, isStart]);

  /* Keep keyboard focus on the new scene. */
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [scene, visit]);

  useEffect(() => {
    const onFs = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  useEffect(() => {
    return () => {
      window.clearTimeout(transitionTimer.current);
    };
  }, []);

  const transition = useCallback((to: SceneId) => {
    if (transitioning.current) return;
    transitioning.current = true;
    setCut(true);
    transitionTimer.current = window.setTimeout(() => {
      transitioning.current = false;
      const ending = scenes[to].ending;
      if (ending) setFound((f) => (f.includes(ending.key) ? f : [...f, ending.key]));
      setSceneId(to);
      setVisit((v) => v + 1);
      setBeat(-1);
      setTyped(false);
      setInstant(false);
      setCut(false);
    }, 180);
  }, []);

  /* click anywhere: finish the line that's typing, otherwise next beat */
  const advance = useCallback(() => {
    if (isStart || beat < 0 || transitioning.current) return;
    if (currentIsRadio && !typed) {
      setInstant(true);
      return;
    }
    if (beat < last) {
      setBeat((b) => b + 1);
      setTyped(false);
      setInstant(false);
    }
  }, [isStart, beat, last, currentIsRadio, typed]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        if ((e.target as HTMLElement | null)?.closest("button, a, input, textarea, select, [contenteditable]")) return;
        e.preventDefault();
        advance();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance]);

  const toggleSound = useCallback(() => setSoundOn((on) => !on), []);
  const audioBlocked = useCallback(() => setSoundOn(false), []);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void rootRef.current?.requestFullscreen?.();
  }, []);

  const onTick = useCallback(() => {}, []);
  const onTyped = useCallback(() => setTyped(true), []);

  const grade = scene.ending ? scene.ending.grade : "none";
  const headingText = useMemo(() => {
    if (scene.ending) return `ENDING ${scene.ending.number} OF 3: ${scene.ending.name}`;
    return sceneId === "memory" ? "FOUR HOURS EARLIER" : clips[activeShot].label;
  }, [scene, activeShot, sceneId]);

  const rootClass = [
    "ls-root",
    scene.ending ? "ls-root-ending" : "",
    isStart ? "ls-root-intro" : "",
    cut ? "ls-root-cut" : "",
    done ? "ls-root-done" : "",
    scene.crt && activeShot === "C" ? "ls-root-crt" : "",
    sceneId === "memory" ? "ls-root-memory" : "",
    payoffSrc ? "ls-root-payoff" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={rootRef} className={rootClass}>
      <header className="ls-header">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- full navigation avoids a vinext RSC prefetch failure and unloads game audio */}
        <a href="/" className="ls-back" aria-label="Back to chrisjereza.io">
          CJ
        </a>
        <div className="ls-ticker" aria-hidden>
          <span key={`${scene.id}-${visit}`}>{scene.ticker}</span>
        </div>
        <div className="ls-status" aria-live="polite">
          <span className="ls-dot" />
          {scene.status}
        </div>
      </header>

      <main className="ls-stage">
        <section className="ls-screen" aria-labelledby="ls-heading" onClick={advance}>
          <SceneMedia clip={activeShot} crt={Boolean(scene.crt) && activeShot === "C"} grade={grade} stillOnly={isStart} soundOn={soundOn} suspended={Boolean(payoffSrc) || cut} onAudioBlocked={audioBlocked} />
          {payoffSrc ? <PayoffShot key={`${sceneId}-${beat}`} src={payoffSrc} soundOn={soundOn && !cut} onAudioBlocked={audioBlocked} /> : null}

          {/* scene label, top left, small */}
          {!isStart ? (
            <h1 id="ls-heading" ref={headingRef} tabIndex={-1} className="ls-label ls-in" key={`h-${scene.id}-${visit}`}>
              {scene.ending ? (
                <>
                  <span className="ls-label-kicker">STATION DESTRUCTION CONFIRMED</span>
                  <span className="ls-label-ending">{headingText}</span>
                </>
              ) : (
                headingText
              )}
            </h1>
          ) : null}

          {/* the foreground line, bottom center */}
          <div className={`ls-panel${isStart ? " ls-panel-start" : ""}`} key={`${scene.id}-${visit}`}>
            {!isStart && !payoffSrc ? <div className="ls-reading">
              <div className="ls-context">{sceneId === "memory" ? "MEMORY · FOUR HOURS EARLIER" : `NOW · ${clips[activeShot].label}`}</div>
          {/* Current mission information shares the dialogue rail. */}
          {huds.length && showHud ? (
            <div className="ls-hud" aria-live="polite">
              {huds.map(({ b, i }) => (
                <div key={i} className="ls-hudpanel ls-in">
                  <div className="ls-hud-header">{b.header}</div>
                  {b.lines.map((l, j) => (
                    <div key={j} className="ls-hud-line ls-in" style={{ animationDelay: `${j * 0.06}s` }}>
                      {l}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : null}

          {/* Radio dialogue shares the same reading position. */}
          {fore && fore.kind === "radio" ? (
            <div className="ls-radiocard ls-in" key={`r-${beat}`} role="status">
              <div className="ls-radio-head">
                <span className="ls-wave" aria-hidden>
                  <i className={typed ? "" : "ls-wave-live"} />
                  <i className={typed ? "" : "ls-wave-live"} />
                  <i className={typed ? "" : "ls-wave-live"} />
                  <i className={typed ? "" : "ls-wave-live"} />
                  <i className={typed ? "" : "ls-wave-live"} />
                </span>
                {fore.who}
              </div>
              <p>
                <Typewriter text={personalize(fore.text)} instant={instant} onTick={onTick} onDone={onTyped} typeMs={TYPE_MS} />
              </p>
            </div>
          ) : null}

              <div className="ls-fore" aria-live="polite">
                {fore && fore.kind === "sub" ? (
                  <p className="ls-sub ls-in" key={`s-${beat}`}>
                    {personalize(fore.text)}
                  </p>
                ) : null}
                {fore && fore.kind === "you" ? (
                  <p className="ls-you ls-in" key={`y-${beat}`}>
                    <span className="ls-you-label">YOU</span>
                    {personalize(fore.text)}
                  </p>
                ) : null}
              </div>
            </div> : null}
            {isStart ? (
              <>
                <h1 id="ls-heading" ref={headingRef} tabIndex={-1} className="ls-h1-big">
                  {TITLE}
                </h1>
                {scene.beats.map((b, i) =>
                  b.kind === "sub" ? (
                    <p key={i} className="ls-sub ls-sub-intro ls-in" style={{ animationDelay: `${0.15 + i * 0.1}s` }}>
                      {b.text}
                    </p>
                  ) : null,
                )}
                <form className="ls-identify" onSubmit={(e) => { e.preventDefault(); if (name) transition("memory"); }} onClick={(e) => e.stopPropagation()}>
                  <label htmlFor="crew-name">Your first name</label>
                  <input id="crew-name" name="crew-name" value={playerName} onChange={(e) => setPlayerName(e.target.value)} maxLength={24} autoComplete="off" required placeholder="Name" />
                  <span>Used in the story. Stays in this browser tab.</span>
                  <button className="ls-choice" type="submit" disabled={!name || cut}>BEGIN</button>
                </form>
              </>
            ) : (
              null
            )}

            <div className={`ls-choices${done ? " ls-choices-ready" : ""}`} hidden={isStart}>
              {(!isStart ? scene.choices : []).map((choice, i) => (
                <button
                  key={choice.label}
                  type="button"
                  className="ls-choice"
                  aria-label={choice.label}
                  style={{ animationDelay: `${i * 0.08}s` }}
                  disabled={!done || cut}
                  tabIndex={done ? 0 : -1}
                  aria-hidden={!done}
                  onClick={(e) => {
                    e.stopPropagation();
                    transition(choice.to);
                  }}
                >
                  <span>{choice.label}</span>
                  {choice.detail ? <small>{choice.detail}</small> : null}
                </button>
              ))}
            </div>

            {isStart ? (
              <p className="ls-footnote ls-in" style={{ animationDelay: "0.3s" }}>
                Three endings · 2–3 minutes · Click the image or press Space.
              </p>
            ) : null}

            {!done && beat >= 0 ? (
              <button type="button" className="ls-next" onClick={(e) => { e.stopPropagation(); advance(); }}>
                {currentIsRadio && !typed ? "REVEAL LINE" : "NEXT"} <span aria-hidden="true">→</span>
              </button>
            ) : null}

            {scene.ending && done ? (
              <div className="ls-credits" aria-label="Credits">
                {credits.map((c, i) => (
                  <p key={c} className="ls-in" style={{ animationDelay: `${i * 0.06}s` }}>
                    {c}
                  </p>
                ))}
                <p className="ls-found ls-in" style={{ animationDelay: "0.36s" }}>
                  ENDINGS FOUND {found.length} OF 3
                </p>
              </div>
            ) : null}
          </div>
        </section>
      </main>

      <footer className="ls-footer">
        <button type="button" className="ls-util" onClick={toggleSound} aria-pressed={soundOn}>
          {soundOn ? "SOUND ON" : "SOUND OFF"}
        </button>
        <button type="button" className="ls-util" onClick={toggleFullscreen}>
          {fullscreen ? "EXIT FULLSCREEN" : "FULLSCREEN"}
        </button>
        {!isStart ? (
          <button type="button" className="ls-util" onClick={() => transition("start")}>
            RESTART
          </button>
        ) : null}
        <span className="ls-credit">Chris Jereza · Runway + OpenAI</span>
      </footer>

      {isStart && !soundOn ? (
        <button type="button" className="ls-soundprompt ls-in" style={{ animationDelay: "0.3s" }} onClick={toggleSound}>
          <span className="ls-dot" /> turn sound on
        </button>
      ) : null}


    </div>
  );
}
