"use client";

import NextImage, { getImageProps } from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from "react";

/* ------------------------------------------------------------------ */
/*  Media                                                              */
/* ------------------------------------------------------------------ */

type ClipId = "A" | "B" | "C" | "D" | "E" | "F" | "compression" | "memory" | "intercom" | "door-control" | "empty-seat" | "lab-terminal" | "capsule-seal" | "cabin-air" | "medical-bay" | "shuttle-radio";
type BedName = "hum" | "static" | "rumble" | "engine" | "wind";

const MEDIA_BASE = "/last-shuttle";

const clips: Record<ClipId, { file: string; label: string; bed: BedName; still?: boolean }> = {
  A: { file: "a_corridor", label: "SERVICE CORRIDOR", bed: "hum" },
  B: { file: "b_labdoor", label: "LAB 3 ACCESS", bed: "hum" },
  C: { file: "i_lab_aftermath", label: "LAB 3 REMOTE FEED", bed: "static" },
  D: { file: "d_capsule", label: "SHUTTLE CARGO", bed: "rumble" },
  E: { file: "e_shuttle", label: "SHUTTLE COCKPIT", bed: "engine" },
  F: { file: "f_exterior", label: "HALDEN STATION", bed: "wind" },
  compression: { file: "i_compression", label: "HALDEN STATION · LAB 3", bed: "rumble" },
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

/* ------------------------------------------------------------------ */
/*  Scene graph. One beat on screen at a time.                          */
/*  sub   = narration, bottom center, replaces the previous beat        */
/*  you   = your own line, same place, quieter                          */
/*  radio = speech, typed out in the shared reading area               */
/*  hud   = diegetic screen text, replaces the current line             */
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

const ELLIS = "ELLIS";
const ELLIS_IC = "ELLIS · INTERCOM";
const OPENING_CALL = "Are you there?";

const scenes: Record<SceneId, Scene> = {
  start: {
    id: "start", clip: "compression", status: "EVACUATION ACTIVE",
    ticker: "HALDEN STATION · FINAL EVACUATION",
    beats: [
      { kind: "radio", who: ELLIS, text: OPENING_CALL },
      { kind: "sub", text: "Halden is being scuttled. Yours is the last shuttle docked." },
      { kind: "sub", text: "Ellis is still inside Lab 3." },
    ],
    choices: [{ label: "CONTINUE", to: "memory" }],
  },
  memory: {
    id: "memory", clip: "memory", status: "MEMORY",
    ticker: "FOUR HOURS EARLIER · YOUR LAST SHIFT TOGETHER",
    beats: [
      { kind: "radio", who: ELLIS, shot: "memory", text: "Nico's when we land. Coffee, eggs on toast. My turn to pay." },
      { kind: "you", shot: "empty-seat", text: "Your bag's under the spare seat. I'll wait for you there." },
    ],
    choices: [{ label: "CONTINUE", to: "corridor" }],
  },
  corridor: {
    id: "corridor", clip: "A", status: "EVACUATION ACTIVE",
    ticker: "YOUR SHUTTLE IS READY · ELLIS IS STILL IN LAB 3",
    beats: [
      { kind: "radio", who: ELLIS, shot: "A", text: "Lab 3 won't take my card. Yours still has the override." },
      { kind: "radio", who: ELLIS, shot: "A", text: "My bag's under your spare seat, {name}. You said you'd wait." },
    ],
    choices: [
      { label: "I said I'd wait. I'm coming back.", detail: "Go back. Your keycard can override the lab door.", to: "door" },
      { label: "If I miss this launch, neither of us gets out.", detail: "Launch alone. Leave Ellis behind.", to: "alone" },
    ],
  },
  alone: {
    id: "alone", clip: "E", status: "IN TRANSIT",
    ticker: "LAUNCH COMPLETE · ONE ABOARD · ELLIS STILL ON STATION",
    beats: [
      { kind: "radio", who: ELLIS, shot: "E", text: "{name}? Was that you taking off?" },
      { kind: "radio", who: ELLIS, shot: "empty-seat", text: "The benches are coming off the floor. {name}, answer me." },
      { kind: "hud", shot: "shuttle-radio", header: "COMMS", lines: ["CONNECTION LOST"] },
    ],
    choices: [{ label: "CONTINUE", to: "survivor_alone" }],
  },
  door: {
    id: "door", clip: "B", status: "EVACUATION ACTIVE",
    ticker: "LAB 3 · ELLIS IS ON THE OTHER SIDE",
    beats: [
      { kind: "radio", who: ELLIS, shot: "B", text: "The override by the reader. Hold it down till the seal breaks." },
      { kind: "hud", shot: "door-control", header: "QUARANTINE INTERLOCK", lines: ["LAB 3 SEALED", "OVERRIDE RELEASES LAB AIR", "INCIDENT LOG AVAILABLE"] },
      { kind: "radio", who: ELLIS, shot: "intercom", text: "I can see the quarantine light. I'm asking you anyway." },
    ],
    choices: [
      { label: "I'm opening Lab 3. Be ready to run.", detail: "Open the door. Release the lab air.", to: "released" },
      { label: "You knew it was quarantine. What aren't you telling me?", detail: "Read the incident log. Keep the door sealed.", to: "report" },
    ],
  },
  released: {
    id: "released", clip: "E", status: "IN TRANSIT",
    ticker: "TWO ABOARD · CABIN AIR SHARED",
    beats: [
      { kind: "sub", shot: "E", text: "You get Ellis aboard and close the hatch." },
      { kind: "radio", who: "ELLIS · SEAT 2", shot: "shuttle-radio", text: "Clear the docking arm. I'll tell you everything, I promise." },
      { kind: "you", shot: "shuttle-radio", text: "Sit down. I've got you." },
      { kind: "hud", shot: "cabin-air", header: "CABIN AIR", lines: ["AIRBORNE ORGANISM DETECTED", "EXPOSURE: BOTH OCCUPANTS"] },
      { kind: "payoff", id: "cabin" },
    ],
    choices: [{ label: "[Call for medical help.]", to: "contamination" }],
  },
  report: {
    id: "report", clip: "C", status: "EVACUATION ACTIVE", crt: true,
    ticker: "ELLIS IS INFECTED · SHARED AIR IS UNSAFE",
    beats: [
      { kind: "hud", shot: "lab-terminal", header: "INCIDENT LOG", lines: ["ELLIS: INFECTED", "TRANSMISSION: AIRBORNE", "DO NOT OPEN THE LAB"] },
      { kind: "radio", who: ELLIS, shot: "C", text: "That's the bench bolted to the deck." },
      { kind: "radio", who: ELLIS, shot: "intercom", text: "I read the test. Then the scuttle alarm went off, and I—" },
      { kind: "you", shot: "intercom", text: "You were going to let me open it." },
      { kind: "hud", shot: "lab-terminal", header: "SEALED TRANSFER", lines: ["CC-2: INDEPENDENT AIR SUPPLY", "ENCLOSED RAIL TO SHUTTLE: ONLINE", "LAB DOOR REMAINS CLOSED"] },
      { kind: "you", shot: "capsule-seal", text: "Can you reach CC-2? The transfer capsule." },
      { kind: "radio", who: ELLIS, shot: "intercom", text: "Yeah. It locks from outside. You'd have the release." },
    ],
    choices: [
      { label: "Get in CC-2. I'll stay on the channel.", detail: "Use the sealed transfer. Keep the air separate.", to: "capsule" },
      { label: "You let me walk up to that door. I'm done.", detail: "Leave Ellis behind. Launch alone.", to: "leave" },
    ],
  },
  capsule: {
    id: "capsule", clip: "D", status: "EVACUATION ACTIVE",
    ticker: "SEALED TRANSFER · LAB DOOR CLOSED",
    beats: [
      { kind: "hud", shot: "D", header: "CARGO CONTROL", lines: ["CAPSULE RECEIVED", "ONE OCCUPANT", "CABIN AIR ISOLATED"] },
      { kind: "radio", who: ELLIS_IC, shot: "capsule-seal", text: "The lid's shut. There's no handle on this side." },
      { kind: "you", shot: "capsule-seal", text: "CC-2's green. I'm keeping your air separate." },
      { kind: "payoff", id: "capsule" },
    ],
    choices: [{ label: "Launch. Keep CC-2 sealed.", to: "rescued_departure" }],
  },
  rescued_departure: {
    id: "rescued_departure", clip: "E", status: "IN TRANSIT",
    ticker: "TWO ABOARD · ELLIS IN SEALED CONTAINMENT",
    beats: [
      { kind: "you", shot: "E", text: "Medical, Halden shuttle. Two aboard. One infected, sealed in CC-2." },
      { kind: "radio", who: "MEDICAL CARRIER", shot: "shuttle-radio", text: "Bay four. Leave CC-2 sealed until our team takes it." },
      { kind: "radio", who: ELLIS_IC, shot: "capsule-seal", text: "{name}? Leave the channel open till they take me." },
      { kind: "you", shot: "shuttle-radio", text: "I'm here." },
    ],
    choices: [{ label: "CONTINUE", to: "rescue" }],
  },
  leave: {
    id: "leave", clip: "E", status: "IN TRANSIT",
    ticker: "ONE ABOARD · RADIO LINK TO LAB 3",
    beats: [
      { kind: "you", shot: "E", text: "Ellis. I'm taking the shuttle. I can't bring you." },
      { kind: "radio", who: ELLIS, shot: "empty-seat", text: "Okay. Leave the channel open." },
      { kind: "hud", shot: "shuttle-radio", header: "COMMS", lines: ["CONNECTION LOST"] },
    ],
    choices: [{ label: "CONTINUE", to: "survivor_leave" }],
  },
  survivor_alone: {
    id: "survivor_alone", clip: "F", status: "MISSION COMPLETE",
    ticker: "ONE RECOVERED · ELLIS: LOST",
    ending: { number: 1, name: "SURVIVOR", key: "survivor", grade: "none" },
    beats: [
      { kind: "hud", shot: "F", header: "HALDEN STATION", lines: ["SCUTTLE COMPLETE", "NO FURTHER LIFE SIGNS"] },
      { kind: "sub", shot: "empty-seat", text: "Ellis's bag is still under the seat." },
    ],
    choices: [{ label: "Play again", to: "corridor" }],
  },
  survivor_leave: {
    id: "survivor_leave", clip: "F", status: "MISSION COMPLETE",
    ticker: "ONE RECOVERED · ELLIS: LOST",
    ending: { number: 1, name: "SURVIVOR", key: "survivor", grade: "none" },
    beats: [
      { kind: "hud", shot: "F", header: "HALDEN STATION", lines: ["SCUTTLE COMPLETE", "NO FURTHER LIFE SIGNS"] },
      { kind: "sub", shot: "empty-seat", text: "You leave the radio on." },
    ],
    choices: [{ label: "Play again", to: "corridor" }],
  },
  contamination: {
    id: "contamination", clip: "F", status: "MISSION COMPLETE",
    ticker: "DOCKING REFUSED · BOTH OCCUPANTS EXPOSED",
    ending: { number: 2, name: "CONTAMINATION", key: "contamination", grade: "red" },
    beats: [
      { kind: "radio", who: "MEDICAL CARRIER", shot: "F", text: "Halden, hold outside the docking ring. We can't take contaminated air." },
      { kind: "sub", shot: "cabin-air", text: "You hold your breath. It doesn't help." },
    ],
    choices: [{ label: "Play again", to: "corridor" }],
  },
  rescue: {
    id: "rescue", clip: "F", status: "MISSION COMPLETE",
    ticker: "TWO RECOVERED · ELLIS IN MEDICAL ISOLATION",
    ending: { number: 3, name: "RESCUE", key: "rescue", grade: "cyan" },
    beats: [
      { kind: "hud", shot: "F", header: "HALDEN STATION", lines: ["SCUTTLE COMPLETE", "SHUTTLE CLEAR"] },
      { kind: "radio", who: "ELLIS · MEDICAL BAY", shot: "medical-bay", text: "Bay four's locked. Will you wait outside?" },
      { kind: "you", shot: "medical-bay", text: "Of course." },
    ],
    choices: [{ label: "Play again", to: "corridor" }],
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

/* One persistent media element keeps audio permission across scene cuts. */
function FilmStage({ videoRef, videoSrc, poster, paused, soundOn, visit, crt, onAudioBlocked, onEnded, onProgress, onError }: {
  videoRef: RefObject<HTMLVideoElement | null>; videoSrc?: string; poster: string;
  paused: boolean; soundOn: boolean; visit: number; crt: boolean;
  onAudioBlocked: () => void; onEnded: () => void; onProgress: (time: number) => void; onError: () => void;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const [posterFailed, setPosterFailed] = useState<string | null>(null);
  const priorSource = useRef("");
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const newSource = priorSource.current !== `${videoSrc}-${visit}`;
    priorSource.current = `${videoSrc}-${visit}`;
    video.muted = !soundOn || paused || !videoSrc;
    if (!videoSrc || paused || failedSrc === videoSrc) { video.pause(); return; }
    if (video.ended && !newSource) return;
    if (newSource) video.currentTime = 0;
    void video.play().catch((error: DOMException) => {
      if (error.name === "NotAllowedError") onAudioBlocked();
    });
  }, [videoRef, videoSrc, paused, soundOn, visit, failedSrc, onAudioBlocked]);
  return <div className={`ls-media${crt ? " ls-media-feed" : ""}`} aria-hidden>
    <div className="ls-layer">
      {posterFailed !== poster ? <NextImage key={poster} src={poster} alt="" fill sizes="100vw" loading="eager" className="ls-still" onError={() => setPosterFailed(poster)} /> : null}
      <video ref={videoRef} className="ls-video" src={videoSrc} poster={poster}
        style={{ visibility: videoSrc && failedSrc !== videoSrc ? "visible" : "hidden" }}
        muted={!soundOn || paused || !videoSrc} playsInline preload="auto"
        onEnded={onEnded} onTimeUpdate={(e) => onProgress(e.currentTarget.currentTime)}
        onError={() => { if (videoSrc) { setFailedSrc(videoSrc); onError(); } }} />
    </div>
    {crt ? <div className="ls-scanlines" /> : null}
    <div className="ls-grain" /><div className="ls-vignette" />
  </div>;
}

function useOpeningTimer(key: string, duration: number | null, paused: boolean, onComplete: () => void) {
  const clock = useRef({ key: "", remaining: 0 });
  useEffect(() => {
    if (duration === null) return;
    if (clock.current.key !== key) clock.current = { key, remaining: duration };
    if (paused) return;
    const started = performance.now();
    const timer = window.setTimeout(onComplete, clock.current.remaining);
    return () => {
      window.clearTimeout(timer);
      clock.current.remaining = Math.max(0, clock.current.remaining - (performance.now() - started));
    };
  }, [key, duration, paused, onComplete]);
}

const TITLE = "LAST SHUTTLE";
type Payoffs = Partial<Record<"cabin" | "capsule", string>>;
const EMPTY_PAYOFFS: Payoffs = {};

export function LastShuttle({ payoffs = EMPTY_PAYOFFS, memoryBridge }: { payoffs?: Payoffs; memoryBridge?: string }) {
  const [playerName, setPlayerName] = useState("");
  const name = playerName.trim().replace(/\s+/g, " ");
  const personalize = (text: string) => text.replaceAll("{name}", name);
  const [sceneId, setSceneId] = useState<SceneId>("start");
  const [visit, setVisit] = useState(0);
  const [beat, setBeat] = useState(-1);
  const [endingRevealed, setEndingRevealed] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [found, setFound] = useState<EndingKey[]>([]);
  const [cut, setCut] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [hookComplete, setHookComplete] = useState(false);
  const [hookCallVisible, setHookCallVisible] = useState(false);
  const [openingRunning, setOpeningRunning] = useState(true);
  const [openingPaused, setOpeningPaused] = useState(false);
  const [memoryExit, setMemoryExit] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const transitionTimer = useRef<number | undefined>(undefined);
  const transitioning = useRef(false);
  const entryBeat = useRef(0);

  const scene = useMemo(() => ({ ...scenes[sceneId], beats: scenes[sceneId].beats.filter((b) => b.kind !== "payoff" || Boolean(payoffs[b.id])) }), [sceneId, payoffs]);
  const isStart = sceneId === "start";
  const isHook = isStart && !hookComplete;
  const autoOpening = openingRunning && (sceneId === "memory" || sceneId === "corridor");
  const openingActive = isHook || autoOpening;
  const playbackPaused = tabHidden || (openingActive && openingPaused);
  const last = scene.beats.length - 1;
  const current = beat >= 0 ? scene.beats[beat] : null;
  const done = isStart || (!autoOpening && beat >= last && (!scene.ending || endingRevealed));
  const showEnding = Boolean(scene.ending && endingRevealed);
  const payoffSrc = current?.kind === "payoff" ? payoffs[current.id] : undefined;
  const activeShot = memoryExit ? "memory" : current?.shot ?? scene.beats[Math.max(0, beat)]?.shot ?? scene.clip;
  const meta = clips[activeShot];
  const videoSrc = isStart ? `${MEDIA_BASE}/i_compression.mp4`
    : memoryExit ? memoryBridge
    : payoffSrc?.endsWith(".mp4") ? payoffSrc
    : meta.still || payoffSrc ? undefined : `${MEDIA_BASE}/${meta.file}.mp4`;
  const poster = memoryExit ? `${MEDIA_BASE}/inserts/coffee-rupture.png`
    : payoffSrc ? payoffSrc.replace(/\.mp4$/, ".png") : `${MEDIA_BASE}/${meta.file}.png`;

  useEffect(() => {
    const upcoming = isStart ? scenes.memory.beats : scene.beats.slice(Math.max(0, beat), beat + 4);
    for (const next of upcoming) {
      const shot = clips[next.shot ?? scene.clip];
      if (!shot.still) continue;
      const img = new window.Image();
      const { props } = getImageProps({ src: `${MEDIA_BASE}/${shot.file}.png`, alt: "", fill: true, sizes: "100vw" });
      if (props.sizes) img.sizes = props.sizes;
      if (props.srcSet) img.srcset = props.srcSet;
      img.src = props.src;
      void img.decode().catch(() => {});
    }
    if (isStart) {
      const image = new window.Image();
      image.src = `${MEDIA_BASE}/inserts/coffee-rupture.png`;
      void image.decode().catch(() => {});
    }
  }, [scene, beat, isStart]);

  useEffect(() => {
    if (isStart) return;
    const timer = window.setTimeout(() => setBeat(entryBeat.current), 100);
    return () => window.clearTimeout(timer);
  }, [sceneId, visit, isStart]);
  useEffect(() => {
    if (!isStart) headingRef.current?.focus({ preventScroll: true });
  }, [sceneId, visit, isStart]);
  useEffect(() => {
    const update = () => setTabHidden(document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  useEffect(() => {
    const update = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", update);
    return () => document.removeEventListener("fullscreenchange", update);
  }, []);
  useEffect(() => () => window.clearTimeout(transitionTimer.current), []);

  const transition = useCallback((to: SceneId, firstBeat = 0) => {
    if (transitioning.current) return;
    transitioning.current = true;
    setCut(true);
    transitionTimer.current = window.setTimeout(() => {
      transitioning.current = false;
      const ending = scenes[to].ending;
      if (ending) setFound((f) => f.includes(ending.key) ? f : [...f, ending.key]);
      entryBeat.current = firstBeat;
      if (to === "start") {
        setHookComplete(false); setHookCallVisible(false); setOpeningRunning(true); setOpeningPaused(false);
      }
      setMemoryExit(false); setSceneId(to); setVisit((v) => v + 1); setBeat(-1); setEndingRevealed(false); setCut(false);
    }, 120);
  }, []);
  const finishHook = useCallback(() => { setHookComplete(true); setHookCallVisible(true); setOpeningPaused(false); }, []);
  const toggleOpeningPause = useCallback(() => setOpeningPaused((paused) => !paused), []);
  const nextOpeningBeat = useCallback(() => {
    if (transitioning.current) return;
    if (memoryExit) transition("corridor");
    else if (beat < last) setBeat((b) => b + 1);
    else if (sceneId === "memory") setMemoryExit(true);
    else setOpeningRunning(false);
  }, [memoryExit, beat, last, sceneId, transition]);
  const openingDuration = autoOpening && beat >= 0
    ? memoryExit ? memoryBridge ? null : 480 : sceneId === "memory" ? 3500 : beat === 0 ? 3400 : 3900
    : null;
  useOpeningTimer(`${sceneId}-${visit}-${beat}-${memoryExit}`, openingDuration, playbackPaused || cut, nextOpeningBeat);
  const skipOpening = useCallback(() => {
    if (isHook) { finishHook(); return; }
    setOpeningRunning(false); setOpeningPaused(false);
    transition("corridor", scenes.corridor.beats.length - 1);
  }, [isHook, finishHook, transition]);
  const advance = useCallback(() => {
    if (openingActive) { toggleOpeningPause(); return; }
    if (isStart || beat < 0 || transitioning.current) return;
    if (beat < last) setBeat((b) => b + 1);
    else if (scene.ending) setEndingRevealed(true);
  }, [openingActive, toggleOpeningPause, isStart, beat, last, scene.ending]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey || (e.target as HTMLElement)?.closest("input, textarea, select, [contenteditable]")) return;
      if (done && !isStart && scene.choices.length > 1 && /^[1-9]$/.test(e.key)) {
        const choice = scene.choices[Number(e.key) - 1];
        if (choice) { e.preventDefault(); transition(choice.to); }
      } else if ((e.key === " " || e.key === "Enter") && !(e.target as HTMLElement)?.closest("button, a")) {
        e.preventDefault(); advance();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, done, isStart, scene.choices, transition]);

  const audioBlocked = useCallback(() => setSoundOn(false), []);
  const toggleSound = useCallback(() => {
    const enabled = !soundOn;
    setSoundOn(enabled);
    const video = videoRef.current;
    if (!video) return;
    // This must stay inside the tap handler for iOS, not just a React effect.
    video.muted = !enabled || !videoSrc || playbackPaused;
    if (enabled && videoSrc && !video.ended && !playbackPaused && !(isStart && hookComplete)) {
      void video.play().catch(audioBlocked);
    }
  }, [soundOn, videoSrc, playbackPaused, isStart, hookComplete, audioBlocked]);
  const replayWithSound = useCallback(() => {
    setSoundOn(true); setHookComplete(false); setHookCallVisible(false); setOpeningPaused(false);
    const video = videoRef.current;
    if (video) { video.currentTime = 0; video.muted = false; void video.play().catch(audioBlocked); }
  }, [audioBlocked]);
  const onFilmEnded = useCallback(() => {
    if (isHook) finishHook();
    else if (memoryExit) transition("corridor");
  }, [isHook, memoryExit, finishHook, transition]);
  const onFilmProgress = useCallback((time: number) => { if (isHook && time >= 1.1) setHookCallVisible(true); }, [isHook]);
  const onFilmError = useCallback(() => {
    if (isHook) finishHook();
    else if (memoryExit) transition("corridor");
  }, [isHook, memoryExit, finishHook, transition]);
  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void rootRef.current?.requestFullscreen?.().catch(() => {});
  }, []);

  const tone = sceneId === "memory" ? "memory" : sceneId === "door" ? "door" : sceneId === "report" ? "report"
    : sceneId === "released" || sceneId === "contamination" ? "exposure"
    : sceneId === "rescue" ? "rescue" : sceneId.startsWith("survivor") ? "alone" : "station";
  const rootClass = ["ls-root", `ls-tone-${tone}`, isStart ? "ls-root-intro" : "", isHook ? "ls-root-hook" : "", autoOpening ? "ls-root-opening" : "", sceneId === "memory" ? "ls-root-memory" : "", memoryExit ? "ls-memory-exit" : "", cut ? "ls-root-cut" : "", showEnding ? "ls-root-ending" : "", payoffSrc ? "ls-root-payoff" : ""].filter(Boolean).join(" ");

  return <div ref={rootRef} className={rootClass} data-shot={activeShot}>
    <header className="ls-header">
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- unload media and avoid vinext RSC prefetch failure */}
      <a href="/" className="ls-back" aria-label="Back to chrisjereza.io">CJ <span>LAST SHUTTLE</span></a>
      <span className="ls-status">{isStart ? "HALDEN STATION" : sceneId === "memory" ? "HALDEN · OFF SHIFT" : showEnding ? "FLIGHT RECORD" : "EVACUATION ACTIVE"}</span>
    </header>
    <main className="ls-stage">
      <section className="ls-screen" aria-labelledby="ls-heading" onClick={advance}>
        <FilmStage videoRef={videoRef} videoSrc={videoSrc} poster={poster} paused={playbackPaused || cut || (isStart && hookComplete)} soundOn={soundOn} visit={visit} crt={Boolean(scene.crt) && activeShot === "C"} onAudioBlocked={audioBlocked} onEnded={onFilmEnded} onProgress={onFilmProgress} onError={onFilmError} />
        <h1 id="ls-heading" ref={headingRef} tabIndex={-1} className="ls-accessible-heading">{isStart ? TITLE : sceneId === "memory" ? "Four hours earlier" : meta.label}</h1>
        {sceneId === "memory" || (sceneId === "corridor" && autoOpening) ? <div className="ls-time-mark" key={sceneId} aria-hidden><span>{sceneId === "memory" ? "FOUR HOURS EARLIER" : "NOW"}</span><small>{sceneId === "memory" ? "BEFORE THE SCUTTLE ORDER" : "HALDEN · SERVICE CORRIDOR"}</small></div> : null}
        <div className={`ls-panel${isStart ? " ls-panel-start" : ""}${done && !isStart ? " ls-panel-choice" : ""}`} key={`${sceneId}-${visit}`}>
          {isStart && (hookCallVisible || hookComplete) ? <div className="ls-hook-caption" role="status"><span>{ELLIS}</span><p>{OPENING_CALL}</p></div> : null}
          {isStart && hookComplete ? <div className="ls-setup" onClick={(e) => e.stopPropagation()}>
            <form className="ls-identify" onSubmit={(e) => { e.preventDefault(); if (name) transition("memory"); }}>
              <label htmlFor="crew-name">Your first name</label>
              <div className="ls-name-row"><input id="crew-name" value={playerName} onChange={(e) => setPlayerName(e.target.value)} maxLength={24} autoComplete="off" required placeholder="Name" /><button type="submit" disabled={!name || cut} aria-label="Continue">Continue <span aria-hidden>↵</span></button></div>
              <small>Stays in this tab.</small>
            </form>
            <div className="ls-premise">{scene.beats.map((b, i) => b.kind === "sub" ? <p key={i}>{b.text}</p> : null)}</div>
            <button className="ls-replay-sound" type="button" onClick={replayWithSound}>Replay opening with sound</button>
          </div> : null}
          {!isStart && !payoffSrc && current && current.kind !== "payoff" ? <div className={`ls-reading ls-reading-${current.kind}`} key={`${beat}`}>
            {current.kind === "hud" ? <div className="ls-hud" role="status"><div className="ls-hud-header">{current.header}</div>{current.lines.map((line) => <p key={line}>{line}</p>)}</div>
            : <><span className="ls-speaker">{current.kind === "radio" ? current.who : current.kind === "you" ? "YOU" : ""}</span><p className="ls-dialogue" role="status">{personalize(current.text)}</p></>}
          </div> : null}
          {done && !isStart ? <div className="ls-choices" aria-label={scene.choices.length > 1 ? "Choose your response" : "Continue the story"} onKeyDown={(e) => {
            if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
            const buttons = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>("button"));
            const currentIndex = buttons.indexOf(document.activeElement as HTMLButtonElement);
            e.preventDefault(); buttons[(currentIndex + (e.key === "ArrowDown" ? 1 : buttons.length - 1)) % buttons.length]?.focus();
          }}>
            {scene.choices.map((choice, i) => <button key={choice.label} className="ls-choice" type="button" aria-label={choice.label} disabled={cut} onClick={(e) => { e.stopPropagation(); transition(choice.to); }}>
              <span className="ls-choice-key" aria-hidden>{scene.choices.length > 1 ? i + 1 : "↵"}</span><span className="ls-choice-copy"><span>{choice.label}</span>{choice.detail ? <small>{choice.detail}</small> : null}</span>
            </button>)}
          </div> : null}
          {!done && !autoOpening && beat >= 0 ? <button type="button" className="ls-next" aria-label="Continue dialogue" onClick={(e) => { e.stopPropagation(); advance(); }}><kbd>SPACE</kbd> Continue <span aria-hidden>›</span></button> : null}
          {showEnding && scene.ending ? <div className="ls-ending" role="status"><span>ENDING {scene.ending.number} / 3</span><h2>{scene.ending.name}</h2><div className="ls-credits" aria-label="Credits">{credits.slice(1).map((c) => <p key={c}>{c}</p>)}<p>{found.length} of 3 endings found</p></div></div> : null}
        </div>
      </section>
    </main>
    <footer className="ls-footer">
      <button type="button" className="ls-util ls-audio" onClick={toggleSound} aria-pressed={soundOn}>{soundOn ? "Audio on" : "Enable audio"}</button>
      <button type="button" className="ls-util ls-fullscreen" onClick={toggleFullscreen}>{fullscreen ? "Exit fullscreen" : "Fullscreen"}</button>
      {openingActive ? <><button type="button" className="ls-util" onClick={toggleOpeningPause} aria-pressed={openingPaused}>{openingPaused ? "Resume intro" : "Pause intro"}</button><button type="button" className="ls-util" disabled={cut} onClick={skipOpening}>{isHook ? "Skip clip" : "Skip to choice"}</button></> : null}
      {!isStart ? <button type="button" className="ls-util ls-restart" onClick={() => transition("start")}>Restart</button> : null}
    </footer>
  </div>;
}
