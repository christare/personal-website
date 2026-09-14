"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type RefObject } from "react";

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

type Choice = { label: string; to: SceneId };

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
  beats: Beat[];
  choices: Choice[];
  ending?: { number: number; name: string; key: EndingKey; grade: "red" | "cyan" | "none" };
  crt?: boolean;
};

const ELLIS = "Ellis";
const ELLIS_IC = "Ellis";
const OPENING_CALL = "Are you there?";

const scenes: Record<SceneId, Scene> = {
  start: {
    id: "start", clip: "compression",
    beats: [
      { kind: "radio", who: ELLIS, text: OPENING_CALL },
      { kind: "sub", text: "One shuttle left. The station is coming apart." },
    ],
    choices: [{ label: "CONTINUE", to: "memory" }],
  },
  memory: {
    id: "memory", clip: "memory",
    beats: [
      { kind: "radio", who: ELLIS, shot: "memory", text: "Carnegie Diner when we land. Coffee and eggs. I'm paying this time." },
      { kind: "you", shot: "empty-seat", text: "Your bag's under the spare seat. I'm not leaving without you." },
    ],
    choices: [{ label: "CONTINUE", to: "corridor" }],
  },
  corridor: {
    id: "corridor", clip: "A",
    beats: [
      { kind: "radio", who: ELLIS, shot: "A", text: "Lab 3 won't take my card. Yours will. Come on." },
      { kind: "radio", who: ELLIS, shot: "A", text: "{name}, my bag's already on your shuttle. You said you'd wait." },
    ],
    choices: [
      { label: "I'm not breaking that promise. I'm coming back.", to: "door" },
      { label: "I'm scared too, Ellis. I'm taking the shuttle.", to: "alone" },
    ],
  },
  alone: {
    id: "alone", clip: "E",
    beats: [
      { kind: "radio", who: ELLIS, shot: "E", text: "{name}? Was that you taking off?" },
      { kind: "radio", who: ELLIS, shot: "empty-seat", text: "The floor's coming up. {name}, pick up. Pick up." },
      { kind: "hud", shot: "shuttle-radio", header: "Radio", lines: ["Signal lost."] },
    ],
    choices: [{ label: "CONTINUE", to: "survivor_alone" }],
  },
  door: {
    id: "door", clip: "B",
    beats: [
      { kind: "radio", who: ELLIS, shot: "B", text: "Hold the release next to the reader. Don't let go." },
      { kind: "hud", shot: "door-control", header: "Door seal", lines: ["Opening it vents the lab."] },
      { kind: "radio", who: ELLIS, shot: "intercom", text: "I know the light's on. That doesn't mean you leave me here." },
    ],
    choices: [
      { label: "I'm opening it. Stay close to me.", to: "released" },
      { label: "Why didn't you tell me about the lockdown?", to: "report" },
    ],
  },
  released: {
    id: "released", clip: "E",
    beats: [
      { kind: "sub", shot: "E", text: "You get Ellis aboard and close the hatch." },
      { kind: "radio", who: ELLIS, shot: "shuttle-radio", text: "Go. Get us clear. You can hate me when we're out." },
      { kind: "you", shot: "shuttle-radio", text: "Sit down. I've got you." },
      { kind: "hud", shot: "cabin-air", header: "Cabin air", lines: ["Contamination detected. Both occupants exposed."] },
      { kind: "payoff", id: "cabin" },
    ],
    choices: [{ label: "[Call for medical help.]", to: "contamination" }],
  },
  report: {
    id: "report", clip: "C", crt: true,
    beats: [
      { kind: "hud", shot: "lab-terminal", header: "Incident log", lines: ["Airborne spread detected in Lab 3."] },
      { kind: "radio", who: ELLIS, shot: "C", text: "That bench was bolted to the floor." },
      { kind: "radio", who: ELLIS, shot: "intercom", text: "I saw the warning. I just needed you to open the door." },
      { kind: "you", shot: "intercom", text: "You lied to me." },
      { kind: "hud", shot: "lab-terminal", header: "CC-2", lines: ["Sealed transfer to shuttle available."] },
      { kind: "you", shot: "capsule-seal", text: "CC-2 has its own air. Can you get inside?" },
      { kind: "radio", who: ELLIS, shot: "intercom", text: "You'd have the only release. Don't send me off in that thing alone." },
    ],
    choices: [
      { label: "Get in CC-2. I'm staying with you.", to: "capsule" },
      { label: "I don't believe you anymore. I'm leaving.", to: "leave" },
    ],
  },
  capsule: {
    id: "capsule", clip: "D",
    beats: [
      { kind: "hud", shot: "D", header: "RNWAY / CC-2", lines: ["Aboard. Seal holding."] },
      { kind: "radio", who: ELLIS_IC, shot: "capsule-seal", text: "It's shut. {name}, I can't open it from here." },
      { kind: "you", shot: "capsule-seal", text: "The seal's holding. Keep talking to me." },
      { kind: "payoff", id: "capsule" },
    ],
    choices: [{ label: "[Launch with CC-2 sealed.]", to: "rescued_departure" }],
  },
  rescued_departure: {
    id: "rescued_departure", clip: "E",
    beats: [
      { kind: "you", shot: "E", text: "Medical, RNWAY shuttle. Two aboard. Possible exposure. One sealed in CC-2." },
      { kind: "radio", who: "Medical", shot: "shuttle-radio", text: "Bay four. Keep the capsule sealed. We're coming to you." },
      { kind: "radio", who: ELLIS_IC, shot: "capsule-seal", text: "{name}? Stay on till they get here. Please." },
      { kind: "you", shot: "shuttle-radio", text: "I'm here." },
    ],
    choices: [{ label: "CONTINUE", to: "rescue" }],
  },
  leave: {
    id: "leave", clip: "E",
    beats: [
      { kind: "you", shot: "E", text: "I wanted to believe you. I can't risk it, Ellis." },
      { kind: "radio", who: ELLIS, shot: "empty-seat", text: "Okay. Leave the channel open." },
      { kind: "hud", shot: "shuttle-radio", header: "Radio", lines: ["Signal lost."] },
    ],
    choices: [{ label: "CONTINUE", to: "survivor_leave" }],
  },
  survivor_alone: {
    id: "survivor_alone", clip: "F",
    ending: { number: 1, name: "SURVIVOR", key: "survivor", grade: "none" },
    beats: [
      { kind: "hud", shot: "F", header: "Halden", lines: ["Station destroyed. No life signs."] },
      { kind: "sub", shot: "empty-seat", text: "Ellis's bag is still under the seat." },
    ],
    choices: [{ label: "Play again", to: "corridor" }],
  },
  survivor_leave: {
    id: "survivor_leave", clip: "F",
    ending: { number: 1, name: "SURVIVOR", key: "survivor", grade: "none" },
    beats: [
      { kind: "hud", shot: "F", header: "Halden", lines: ["Station destroyed. No life signs."] },
      { kind: "sub", shot: "empty-seat", text: "You leave the radio on." },
    ],
    choices: [{ label: "Play again", to: "corridor" }],
  },
  contamination: {
    id: "contamination", clip: "F",
    ending: { number: 2, name: "CONTAMINATION", key: "contamination", grade: "red" },
    beats: [
      { kind: "radio", who: "Medical", shot: "F", text: "RNWAY, stop. We can't let you dock. Your cabin is contaminated." },
      { kind: "sub", shot: "cabin-air", text: "You hold your breath. It doesn't help." },
    ],
    choices: [{ label: "Play again", to: "corridor" }],
  },
  rescue: {
    id: "rescue", clip: "F",
    ending: { number: 3, name: "RESCUE", key: "rescue", grade: "cyan" },
    beats: [
      { kind: "hud", shot: "F", header: "Halden", lines: ["Station destroyed. Shuttle clear."] },
      { kind: "radio", who: ELLIS, shot: "medical-bay", text: "They've locked the bay. You'll wait outside, won't you?" },
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

/* Keep the outgoing frame until the next image or decoded video frame is ready. */
function FilmStage({ videoRef, videoSrc, poster, paused, soundOn, visit, crt, onAudioBlocked, onEnded, onProgress, onReady }: {
  videoRef: RefObject<HTMLVideoElement | null>; videoSrc?: string; poster: string;
  paused: boolean; soundOn: boolean; visit: number; crt: boolean;
  onAudioBlocked: () => void; onEnded: () => void; onProgress: (time: number) => void; onReady: (isVideo: boolean) => void;
}) {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const holdRef = useRef<HTMLCanvasElement | null>(null);
  const initialPoster = useRef(poster);
  const activeVideo = useRef(false);
  const playback = useRef({ paused, soundOn });
  const callbacks = useRef({ onAudioBlocked, onEnded, onProgress, onReady });
  useLayoutEffect(() => { playback.current = { paused, soundOn }; callbacks.current = { onAudioBlocked, onEnded, onProgress, onReady }; });
  useLayoutEffect(() => {
    const video = videoRef.current, img = imageRef.current, hold = holdRef.current;
    if (!video || !img || !hold) return;
    let cancelled = false;
    const outgoing = activeVideo.current && video.readyState >= 2 ? video : img;
    const width = outgoing instanceof HTMLVideoElement ? outgoing.videoWidth : outgoing.naturalWidth;
    const height = outgoing instanceof HTMLVideoElement ? outgoing.videoHeight : outgoing.naturalHeight;
    if (width && height) {
      hold.width = width; hold.height = height;
      hold.getContext("2d")?.drawImage(outgoing, 0, 0);
      hold.style.visibility = "visible";
    }
    video.pause(); video.muted = true; video.style.visibility = "hidden";
    activeVideo.current = false;
    const reveal = (isVideo: boolean) => {
      if (cancelled) return;
      activeVideo.current = isVideo;
      video.style.visibility = isVideo ? "visible" : "hidden";
      img.style.visibility = isVideo ? "hidden" : "visible";
      hold.style.visibility = "hidden";
      callbacks.current.onReady(isVideo);
    };
    const play = () => {
      if (cancelled) return;
      video.muted = !playback.current.soundOn || playback.current.paused;
      if (!playback.current.paused) void video.play().catch((error: DOMException) => {
        if (!cancelled && error.name === "NotAllowedError") callbacks.current.onAudioBlocked();
      });
    };
    const loadStill = () => {
      const next = new window.Image();
      next.onload = () => { if (!cancelled) { img.src = poster; void img.decode().catch(() => {}).then(() => reveal(false)); } };
      next.onerror = () => { if (!cancelled) callbacks.current.onReady(false); };
      next.src = poster;
    };
    const loaded = () => { if (!cancelled) { reveal(true); play(); } };
    video.addEventListener("loadeddata", loaded);
    video.addEventListener("error", loadStill);
    if (videoSrc) {
      video.src = videoSrc;
      video.load();
      play();
    } else {
      video.removeAttribute("src"); video.load();
      loadStill();
    }
    return () => { cancelled = true; video.removeEventListener("loadeddata", loaded); video.removeEventListener("error", loadStill); };
  }, [videoRef, videoSrc, poster, visit]);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !soundOn || paused || !videoSrc;
    if (paused || !videoSrc) video.pause();
    else if (!video.ended) void video.play().catch((error: DOMException) => {
      if (error.name === "NotAllowedError") callbacks.current.onAudioBlocked();
    });
  }, [videoRef, paused, soundOn, videoSrc]);
  return <div className={`ls-media${crt ? " ls-media-feed" : ""}`} aria-hidden>
    <div className="ls-layer">
      {/* eslint-disable-next-line @next/next/no-img-element -- retain the decoded outgoing image during media swaps */}
      <img ref={imageRef} src={initialPoster.current} alt="" className="ls-still" />
      <video ref={videoRef} className="ls-video" muted playsInline preload="auto"
        onEnded={() => callbacks.current.onEnded()} onTimeUpdate={(e) => callbacks.current.onProgress(e.currentTarget.currentTime)} />
      <canvas ref={holdRef} className="ls-frame-hold" />
    </div>
    {crt ? <div className="ls-scanlines" /> : null}
    <div className="ls-grain" /><div className="ls-vignette" />
  </div>;
}

function UtilityIcon({ name }: { name: "sound" | "muted" | "fullscreen" | "restart" | "replay" | "pause" | "play" | "skip" }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {name === "sound" || name === "muted" ? <><path d="M11 5 6 9H3v6h3l5 4V5Z" />{name === "sound" ? <><path d="M15 8a6 6 0 0 1 0 8M18 5a10 10 0 0 1 0 14" /></> : <path d="m16 9 5 6m0-6-5 6" />}</> : null}
    {name === "fullscreen" ? <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" /> : null}
    {name === "restart" || name === "replay" ? <><path d="M3 10a9 9 0 1 1 2 8M3 4v6h6" />{name === "replay" ? <path d="m10 8 6 4-6 4Z" /> : null}</> : null}
    {name === "pause" ? <path d="M8 5v14M16 5v14" /> : null}
    {name === "play" || name === "skip" ? <path d="m6 4 12 8-12 8Z" /> : null}
    {name === "skip" ? <path d="M20 4v16" /> : null}
  </svg>;
}

const TITLE = "LAST SHUTTLE";
type Payoffs = Partial<Record<"cabin" | "capsule", string>>;
const EMPTY_PAYOFFS: Payoffs = {};

export function LastShuttle({ payoffs = EMPTY_PAYOFFS, memoryBridge }: { payoffs?: Payoffs; memoryBridge?: string }) {
  const [titleVisible, setTitleVisible] = useState(true);
  const [playerName, setPlayerName] = useState("");
  const name = playerName.trim().replace(/\s+/g, " ");
  const personalize = (text: string) => text.replaceAll("{name}", name);
  const [sceneId, setSceneId] = useState<SceneId>("start");
  const [visit, setVisit] = useState(0);
  const [beat, setBeat] = useState(0);
  const [endingRevealed, setEndingRevealed] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [found, setFound] = useState<EndingKey[]>([]);
  const [fullscreen, setFullscreen] = useState(false);
  const [hookComplete, setHookComplete] = useState(false);
  const [hookCallVisible, setHookCallVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [memoryExit, setMemoryExit] = useState(false);
  const [bridgeFailed, setBridgeFailed] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [readyMedia, setReadyMedia] = useState("");
  const rootRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const lastInput = useRef(0);

  const scene = useMemo(() => ({ ...scenes[sceneId], beats: scenes[sceneId].beats.filter((b) => b.kind !== "payoff" || Boolean(payoffs[b.id])) }), [sceneId, payoffs]);
  const isStart = sceneId === "start";
  const isHook = isStart && !hookComplete && !titleVisible;
  const playbackPaused = titleVisible || tabHidden || paused || (isStart && hookComplete);
  const last = scene.beats.length - 1;
  const current = scene.beats[beat];
  const done = !isStart && !memoryExit && beat >= last && (!scene.ending || endingRevealed);
  const showEnding = Boolean(scene.ending && endingRevealed);
  const payoffSrc = current?.kind === "payoff" ? payoffs[current.id] : undefined;
  const activeShot = memoryExit ? "memory" : current?.shot ?? scene.clip;
  const meta = clips[activeShot];
  const videoSrc = isStart ? `${MEDIA_BASE}/i_compression.mp4`
    : memoryExit ? memoryBridge
    : payoffSrc?.endsWith(".mp4") ? payoffSrc
    : meta.still || payoffSrc ? undefined : `${MEDIA_BASE}/${meta.file}.mp4`;
  const poster = memoryExit ? `${MEDIA_BASE}/inserts/coffee-rupture.png`
    : payoffSrc ? payoffSrc.replace(/\.mp4$/, ".png") : `${MEDIA_BASE}/${meta.file}.png`;
  const mediaKey = `${visit}:${videoSrc ?? poster}`;
  const mediaReady = readyMedia === mediaKey;
  const choiceVisible = done && scene.choices.length > 1;
  const actionVisible = done && scene.choices.length === 1 && scene.choices[0].label !== "CONTINUE" && !scene.ending;
  const canContinue = !isStart && !choiceVisible && !showEnding && !memoryExit;

  useEffect(() => {
    const upcoming = isStart ? scenes.memory.beats : scene.beats.slice(beat, beat + 4);
    for (const next of upcoming) {
      const shot = clips[next.shot ?? scene.clip];
      const img = new window.Image(); img.src = `${MEDIA_BASE}/${shot.file}.png`;
      void img.decode().catch(() => {});
    }
    if (sceneId === "memory") { const img = new window.Image(); img.src = `${MEDIA_BASE}/inserts/coffee-rupture.png`; }
  }, [scene, beat, isStart, sceneId]);
  useEffect(() => { if (!isStart) headingRef.current?.focus({ preventScroll: true }); }, [sceneId, visit, isStart]);
  useEffect(() => {
    const update = () => setTabHidden(document.hidden);
    update(); document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  useEffect(() => {
    const update = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", update);
    return () => document.removeEventListener("fullscreenchange", update);
  }, []);

  const transition = useCallback((to: SceneId) => {
    const ending = scenes[to].ending;
    if (ending) setFound((f) => f.includes(ending.key) ? f : [...f, ending.key]);
    if (to === "start") { setTitleVisible(true); setHookComplete(false); setHookCallVisible(false); }
    setMemoryExit(false); setSceneId(to); setVisit((v) => v + 1); setBeat(0); setEndingRevealed(false); setPaused(false);
  }, []);
  const finishHook = useCallback(() => { setHookComplete(true); setHookCallVisible(true); setPaused(false); }, []);
  const mediaLoaded = useCallback((isVideo: boolean) => {
    setReadyMedia(mediaKey);
    if (!isVideo && isHook) finishHook();
    if (!isVideo && memoryExit && memoryBridge) setBridgeFailed(true);
  }, [mediaKey, isHook, finishHook, memoryExit, memoryBridge]);
  // The bridge is a single cut initiated by the player, never a timed dialogue beat.
  useEffect(() => {
    if (!memoryExit || (memoryBridge && !bridgeFailed) || !mediaReady || playbackPaused) return;
    const timer = window.setTimeout(() => transition("corridor"), 480);
    return () => window.clearTimeout(timer);
  }, [memoryExit, memoryBridge, bridgeFailed, mediaReady, playbackPaused, transition]);
  const begin = useCallback(() => {
    setTitleVisible(false); setSoundOn(true); lastInput.current = performance.now();
    const video = videoRef.current;
    if (video) { video.currentTime = 0; video.muted = false; void video.play().catch(() => setSoundOn(false)); }
  }, []);
  const advance = useCallback(() => {
    if (titleVisible) { begin(); return; }
    if (isHook) { finishHook(); return; }
    if (isStart || !mediaReady || paused) return;
    const now = performance.now();
    if (now - lastInput.current < 180) return;
    lastInput.current = now;
    if (memoryExit) { transition("corridor"); return; }
    if (beat < last) setBeat((b) => b + 1);
    else if (scene.ending) setEndingRevealed(true);
    else if (sceneId === "memory") setMemoryExit(true);
    else if (scene.choices.length === 1) transition(scene.choices[0].to);
  }, [titleVisible, begin, isHook, finishHook, isStart, mediaReady, paused, memoryExit, transition, beat, last, scene.ending, scene.choices, sceneId]);
  const choose = useCallback((to: SceneId) => { if (!mediaReady) return; lastInput.current = performance.now(); transition(to); }, [mediaReady, transition]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat || e.altKey || e.ctrlKey || e.metaKey || (e.target as HTMLElement)?.closest("input, textarea, select, [contenteditable]")) return;
      if (choiceVisible && /^[1-9]$/.test(e.key)) {
        const choice = scene.choices[Number(e.key) - 1];
        if (choice) { e.preventDefault(); choose(choice.to); }
      } else if ((e.key === " " || e.key === "Enter") && !(e.target as HTMLElement)?.closest("button, a")) { e.preventDefault(); advance(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, choiceVisible, scene.choices, choose]);

  const audioBlocked = useCallback(() => setSoundOn(false), []);
  const toggleSound = useCallback(() => {
    const enabled = !soundOn; setSoundOn(enabled);
    const video = videoRef.current;
    if (!video) return;
    video.muted = !enabled || !videoSrc || playbackPaused;
    if (enabled && videoSrc && !video.ended && !playbackPaused) void video.play().catch(audioBlocked);
  }, [soundOn, videoSrc, playbackPaused, audioBlocked]);
  const togglePause = useCallback(() => {
    setPaused(!paused);
    const video = videoRef.current;
    if (paused && video && videoSrc) { video.muted = !soundOn; void video.play().catch(audioBlocked); }
  }, [paused, videoSrc, soundOn, audioBlocked]);
  const replayWithSound = useCallback(() => {
    setSoundOn(true); setHookComplete(false); setPaused(false);
    const video = videoRef.current;
    if (video) { video.currentTime = 0; video.muted = false; void video.play().catch(audioBlocked); }
  }, [audioBlocked]);
  const onFilmEnded = useCallback(() => {
    if (isHook) finishHook();
    else if (memoryExit) transition("corridor");
  }, [isHook, memoryExit, finishHook, transition]);
  const onFilmProgress = useCallback((time: number) => { if (isHook && time >= 1.1) setHookCallVisible(true); }, [isHook]);
  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void rootRef.current?.requestFullscreen?.().catch(() => {});
  }, []);
  const tone = sceneId === "memory" ? "memory" : sceneId === "door" ? "door" : sceneId === "report" ? "report"
    : sceneId === "capsule" ? "capsule" : sceneId === "rescued_departure" ? "departure"
    : sceneId === "released" || sceneId === "contamination" ? "exposure"
    : sceneId === "rescue" ? "rescue" : sceneId.startsWith("survivor") ? "alone" : "station";
  const rootClass = ["ls-root", `ls-tone-${tone}`, titleVisible ? "ls-root-title" : "", isStart ? "ls-root-intro" : "", isHook ? "ls-root-hook" : "", memoryExit ? "ls-memory-exit" : "", showEnding ? "ls-root-ending" : "", payoffSrc ? "ls-root-payoff" : ""].filter(Boolean).join(" ");

  return <div ref={rootRef} className={rootClass} data-shot={activeShot} data-scene={sceneId} data-beat={beat} data-media-ready={mediaReady}>
    <main className="ls-stage">
      <section className="ls-screen" aria-labelledby="ls-heading" onClick={advance}>
        <FilmStage videoRef={videoRef} videoSrc={videoSrc} poster={poster} paused={playbackPaused} soundOn={soundOn} visit={visit} crt={Boolean(scene.crt) && activeShot === "C"} onAudioBlocked={audioBlocked} onEnded={onFilmEnded} onProgress={onFilmProgress} onReady={mediaLoaded} />
        <h1 id="ls-heading" ref={headingRef} tabIndex={-1} className="ls-sr-only">{isStart ? TITLE : meta.label}</h1>
        {titleVisible ? <button type="button" className="ls-title-screen" aria-label="Begin Last Shuttle with sound" onClick={(e) => { e.stopPropagation(); begin(); }}>
          <span className="ls-title-name">LAST SHUTTLE</span>
          <span className="ls-title-sound">Sound on. Headphones recommended.</span>
          <span className="ls-title-instruction">Click anywhere or press Space to continue.</span>
          <span className="ls-title-credit">By Chris Jereza for Runway · 9/14/26</span>
        </button> : null}
        <div className={`ls-panel${isStart ? " ls-panel-start" : ""}`}>
          {sceneId === "memory" || (sceneId === "corridor" && beat === 0) ? <div className="ls-time-mark">{sceneId === "memory" ? "Four hours earlier" : "Now"}</div> : null}
          {isStart ? <>
            <div className={`ls-reading ls-hook-caption${hookCallVisible || hookComplete ? " is-visible" : ""}`} role="status"><p className="ls-dialogue"><span className="ls-speaker">Ellis: </span>{OPENING_CALL}</p></div>
            <div className={`ls-setup${hookComplete ? " is-visible" : ""}`} inert={!hookComplete} onClick={(e) => e.stopPropagation()}>
              <p className="ls-premise">One shuttle left. The station is coming apart.</p>
              <form className="ls-identify" onSubmit={(e) => { e.preventDefault(); if (name) { lastInput.current = performance.now(); transition("memory"); } }}>
                <label className="ls-sr-only" htmlFor="crew-name">Your name</label>
                <div className="ls-name-row"><input id="crew-name" value={playerName} onChange={(e) => setPlayerName(e.target.value)} maxLength={24} autoComplete="off" required placeholder="Your name" /><button type="submit" disabled={!name}>I'm here.</button></div>
              </form>
            </div>
          </> : null}
          {!isStart && !payoffSrc && current && current.kind !== "payoff" && !showEnding ? <div className={`ls-reading ls-reading-${current.kind}`} key={`${sceneId}-${beat}`} role="status">
            {current.kind === "hud" ? <div className="ls-system"><span className="ls-system-label">{current.header}</span><p>{current.lines.join(" ")}</p></div>
            : <p className="ls-dialogue">{current.kind !== "sub" ? <span className="ls-speaker">{current.kind === "you" ? "You" : current.who}: </span> : null}{personalize(current.text)}</p>}
          </div> : null}
          {choiceVisible || actionVisible ? <div className="ls-response-area" onClick={(e) => e.stopPropagation()}>
            <span className="ls-response-label">{choiceVisible ? "You:" : ""}</span>
            <div className="ls-choices" role="group" aria-label={choiceVisible ? "Your response" : "Your action"} onKeyDown={(e) => {
              if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
              const buttons = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>("button"));
              const currentIndex = buttons.indexOf(document.activeElement as HTMLButtonElement);
              e.preventDefault(); buttons[(currentIndex + (e.key === "ArrowDown" ? 1 : buttons.length - 1)) % buttons.length]?.focus();
            }}>
              {scene.choices.map((choice) => <button key={choice.label} className="ls-choice" type="button" disabled={!mediaReady} onClick={() => choose(choice.to)}>{choice.label}</button>)}
            </div>
          </div> : null}
          {canContinue && !actionVisible ? <button type="button" className="ls-next" aria-label="Continue" disabled={!mediaReady || paused} onClick={(e) => { e.stopPropagation(); advance(); }}><span aria-hidden>›</span></button> : null}
          {showEnding && scene.ending ? <div className="ls-ending" role="status"><h2>{scene.ending.name}</h2><p className="ls-ending-line">{current.kind === "you" ? "You: " : ""}{current.kind !== "hud" && current.kind !== "payoff" ? personalize(current.text) : ""}</p><button type="button" className="ls-choice" onClick={(e) => { e.stopPropagation(); transition("corridor"); }}>Play again</button><div className="ls-credits" aria-label="Credits">{credits.slice(1).map((c) => <p key={c}>{c}</p>)}<p>{found.length} of 3 endings found</p></div></div> : null}
        </div>
      </section>
    </main>
    <footer className="ls-footer">
      <button type="button" className="ls-util" onClick={toggleSound} aria-label={soundOn ? "Mute audio" : "Enable audio"} title={soundOn ? "Mute audio" : "Enable audio"} aria-pressed={soundOn}><UtilityIcon name={soundOn ? "sound" : "muted"} /></button>
      <button type="button" className="ls-util ls-fullscreen" onClick={toggleFullscreen} aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"} title={fullscreen ? "Exit fullscreen" : "Fullscreen"}><UtilityIcon name="fullscreen" /></button>
      {videoSrc && !(isStart && hookComplete) ? <button type="button" className="ls-util" onClick={togglePause} aria-label={paused ? "Resume" : "Pause"} title={paused ? "Resume" : "Pause"}><UtilityIcon name={paused ? "play" : "pause"} /></button> : null}
      {isStart ? <button type="button" className="ls-util" onClick={hookComplete ? replayWithSound : finishHook} aria-label={hookComplete ? "Replay opening with sound" : "Skip opening clip"} title={hookComplete ? "Replay opening with sound" : "Skip opening clip"}><UtilityIcon name={hookComplete ? "replay" : "skip"} /></button>
      : <button type="button" className="ls-util" onClick={() => transition("start")} aria-label="Restart" title="Restart"><UtilityIcon name="restart" /></button>}
    </footer>
  </div>;
}
