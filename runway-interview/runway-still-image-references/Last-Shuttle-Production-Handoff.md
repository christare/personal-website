# LAST SHUTTLE — FINAL BUILD BRIEF

Six Runway clips. Three endings. One HTML page. A roughly two-minute playthrough, controlled entirely by the player.

This brief replaces the earlier versions. Footage and site are still to be made.

## A. Make it in this order

1. Read the story map below.
2. Generate the corridor still in Runway; use it as the visual reference for the other interiors.
3. Generate the other five stills, then animate each selected image for five seconds.
4. While videos render, give this entire brief and the builder instruction in section E to your coding tool.
5. Put the six MP4s and their selected stills in `videos/` beside `index.html`.
6. Test the four routes, then host the folder as a static site.

## B. Story and logic

You are a maintenance tech on Halden Station. An alien organism has escaped containment in Lab 3. Command has ordered the station destroyed. The last evacuation shuttle is ready. Your coworker Alex is trapped in the lab and wants you to open it.

Alex is infected and knows it. Opening the door releases them into shared air. Reading the exterior terminal reveals the infection and a safe transport option: an opaque, human-sized capsule with independent air. Alex can seal themselves inside; an automated, enclosed cargo system transfers the capsule directly to the shuttle. The lab door stays shut.

**No live timer, timed choices, auto-advancing dialogue, or random outcomes.** The evacuation supplies urgency through writing and atmosphere. Checking the report deliberately rewards investigation.

| Screen | Background | Button → next screen |
|---|---|---|
| `start` | F | BEGIN → `corridor` |
| `corridor` | A | GO TO THE SHUTTLE → `alone`; GO TO LAB 3 → `door` |
| `alone` | E | CONTINUE → `survivor_alone` |
| `door` | B | OVERRIDE THE DOOR → `released`; CHECK THE TERMINAL → `report` |
| `released` | E | CONTINUE → `contamination` |
| `report` | C | USE THE CONTAINMENT CAPSULE → `capsule`; LEAVE ALEX BEHIND → `leave` |
| `capsule` | D | ALERT THE MEDICAL CARRIER AND LAUNCH → `rescued_departure` |
| `rescued_departure` | E | CONTINUE → `rescue` |
| `leave` | E | CONTINUE → `survivor_leave` |
| All four ending screens | Black | PLAY AGAIN → `corridor` |

`survivor_alone` and `survivor_leave` are two dialogue variants of the same SURVIVOR ending. There are four routes, three ending categories. Global restart returns to `start`.

## C. Runway workflow and six shots

### Where to click

At [app.runwayml.com](https://app.runwayml.com/), open your workspace.

**Stills:** left sidebar **Tool → Image → model dropdown → Gen-4 Image**. Choose **16:9**, **720p**, **Quantity 1**, aesthetic variation off. Paste an image prompt and click **Generate**. Save the selected result. [Official image instructions](https://help.runwayml.com/hc/en-us/articles/37053594806419-Creating-with-Gen-4-Image)

**References:** in **Tool → Image**, enable **References**, add the corridor still, and save/tag it as `station`. Select it for the other interiors; use `@station` in their prompts. Use it for visual materials and lighting, not identical room layouts. [Official References instructions](https://help.runwayml.com/hc/en-us/articles/40042718905875-Creating-with-Gen-4-Image-References)

**Video:** open **Tool → Video**, select **Gen-4.5**, and drag the selected still into the prompt area. Alternatively find Gen-4.5 through Apps search. Paste the separate motion prompt. Set **5 seconds, 16:9, 24 fps**, standard output; select **Generate**. Download the result using the controls beneath it. [Official video instructions](https://help.runwayml.com/hc/en-us/articles/46974685288467-Creating-with-Gen-4-5)

The documented Gen-4.5 requirement is Standard or higher; five seconds costs 60 credits. Six clips cost **360 credits**, plus **30 credits** for six 720p Gen-4 images: **390 credits before retries**. Confirm the displayed charge and availability in your account. These are the published rates checked September 14, 2026, not a promise about render time or first-pass success. [Video rates](https://help.runwayml.com/hc/en-us/articles/46974685288467-Creating-with-Gen-4-5) · [Image rates](https://help.runwayml.com/hc/en-us/articles/37053594806419-Creating-with-Gen-4-Image)

### Common direction

Industrial sci-fi horror: worn ivory panels, graphite metal, cold cyan practical lights, a few amber indicators. Empty environments. Humans, readable reports, and actions happen through text and optional sound. No generated faces or typography required.

Keep the selected still for every shot as its poster/fallback. Save as JPG or PNG; tell the builder the actual extension. No need to upscale. Fix composition before animating. Keep a result when the required objects are clear and stable; incidental details do not need matching.

### A — CORRIDOR

**Files:** `a_corridor.mp4` + `a_corridor.png` (or `.jpg`).

**Minimum:** empty enclosed station corridor with emergency lighting. No moving doors or people.

**Image prompt:**

```text
Cinematic eye-level view of an empty industrial space-station corridor. Weathered ivory panels, graphite structural ribs, exposed pipes, metal grating floor, cold cyan practical lighting and a single amber emergency lamp. A closed bulkhead at the far end. Restrained haze, deep shadows, believable utilitarian construction, fine film grain. Wide horizontal architectural composition with the passage centered and plain unmarked wall surfaces.
```

**Motion prompt:**

```text
Locked camera. Thin haze drifts slowly along the floor. The amber emergency lamp gently brightens and dims. The corridor structure remains still.
```

### B — SEALED LAB DOOR

**Files:** `b_labdoor.mp4` + matching still.

**Minimum:** one closed opaque door with a small control panel beside it. Alex stays behind the door; do not animate it opening.

**Image prompt:**

```text
Using @station for materials, color and lighting, show a frontal eye-level view of one sealed laboratory bulkhead. Large opaque metal door, heavy locking hardware, worn ivory panels, graphite framing. A small dark control panel sits beside the door with an amber indicator. Unoccupied foreground, cold cyan practical lighting, restrained haze and fine film grain. The door is fully closed. Plain unmarked surfaces, wide horizontal composition.
```

**Motion prompt:**

```text
Locked camera facing the door. The amber indicator slowly pulses. Faint haze drifts near the floor. The door remains closed and motionless.
```

### C — LABORATORY CAMERA FEED

**Files:** `c_lab.mp4` + matching still.

**Minimum:** empty laboratory work area. The camera is a remote feed; the player has not entered the infected room. Alex is outside its field of view. The website overlays the report.

**Image prompt:**

```text
Using @station for materials, color and lighting, show a high-corner security-camera view of an empty laboratory work area aboard the same station. Metal workbench, an overturned stool, graphite equipment cabinets, worn ivory wall panels and dim cyan equipment lights. Deep shadows, muted amber emergency lighting, fine film grain. The unoccupied work area fills the frame, with plain unmarked equipment and a wide horizontal composition.
```

**Motion prompt:**

```text
Fixed security camera. Small equipment indicators blink slowly. A faint haze drifts through the empty work area. All furniture remains still.
```

### D — SEALED TRANSPORT CAPSULE

**Files:** `d_capsule.mp4` + matching still.

**Minimum:** closed opaque adult-sized capsule secured horizontally in a cargo bay. No body, glass window, entry animation or transfer animation. The transfer has already happened when this shot appears.

**Image prompt:**

```text
Using @station for materials, color and lighting, show a sealed human-sized transport capsule secured horizontally to floor rails in a compact shuttle cargo bay. Solid opaque ivory shell, graphite seams, sturdy latches, one small green status light. Three-quarter side view shows the complete length and closed lid. Unoccupied surrounding space, worn industrial metal, cold practical lighting, subtle haze and film grain, wide horizontal composition.
```

**Motion prompt:**

```text
Locked camera. The capsule's green indicator softly glows. A faint trace of vapor drifts near a floor vent. The capsule and latches remain motionless.
```

### E — SHUTTLE COCKPIT

**Files:** `e_shuttle.mp4` + matching still.

**Minimum:** pilot's forward view of controls and a window onto stars. No visible seats or passengers; Alex can be behind the player without contradicting the shot. No station outside the window to match.

**Image prompt:**

```text
Using @station for materials, color and lighting, show the pilot's forward view in a compact evacuation shuttle. A low graphite control console with cyan and amber indicator lights beneath a broad window onto a sparse starfield. Worn ivory framing, physical switches, practical industrial construction, restrained cinematic science-fiction horror and fine film grain. Frame only the forward console and window, plain unmarked instruments, wide horizontal composition.
```

**Motion prompt:**

```text
Locked forward cockpit view. Stars drift very slowly across the window. The instrument lights gently pulse. The cockpit remains steady.
```

### F — STATION EXTERIOR

**Files:** `f_exterior.mp4` + matching still.

**Minimum:** one isolated industrial space station. Used on the title screen only; do not generate an explosion, shuttle launch, or destination vessel.

**Image prompt:**

```text
Cinematic wide exterior of a solitary industrial research station suspended in black space. Graphite central spine, compact ivory habitation modules, exposed trusses, sparse cyan windows and tiny amber warning lights. The curved edge of a dark planet occupies one lower corner. Weathered utilitarian spacecraft design, cold desaturated lighting, deep blacks and fine film grain. Wide horizontal composition with generous empty space surrounding the station.
```

**Motion prompt:**

```text
Locked distant view. The station drifts almost imperceptibly. Small amber lights blink slowly. Its shape and structure remain stable.
```

If a motion result distorts the architecture, retry with only: `Locked camera. A small indicator light slowly pulses. Everything else remains still.` Do not require seamless loops: each clip plays once, then holds its final frame.

## D. Exact screen copy

Speaker labels and uppercase system messages are real HTML text. Square-bracketed notes are instructions, not visible copy. Each screen waits for its button click.

### `start` — F

**LAST SHUTTLE**

You're a maintenance tech on Halden Station. Something escaped containment in Lab 3. Command has ordered the station destroyed.

The last shuttle is ready. Your coworker Alex is still inside.

**BEGIN**

A short interactive sci-fi story. Play at your own pace.

### `corridor` — A

**ALEX · RADIO**

You still there? It's Alex. I'm in Lab 3. The door sealed on me.

Your maintenance access can open it. Please.

**GO TO THE SHUTTLE**

**GO TO LAB 3**

### `alone` — E

You launch. The radio is still on.

**ALEX · RADIO**

Are you coming?

You turn it off.

**CONTINUE**

### `door` — B

**LAB 3 · ACCESS CONTROL**

BIOLOGICAL QUARANTINE ACTIVE

Manual override will break containment.

**ALEX · RADIO**

Override it. Panel's right there. There's no time to check anything. Just open it.

**OVERRIDE THE DOOR**

**CHECK THE TERMINAL**

### `released` — E

You open the lab. Alex follows you to the shuttle.

You launch together.

**ALEX**

Thank you. I thought you were going to leave me.

**CABIN MONITOR**

AIRBORNE ORGANISM DETECTED

**CONTINUE**

### `report` — C

**LAB 3 · REMOTE CAMERA / QUARANTINE LOG**

21:40 — EXPOSURE EVENT

CREW MEMBER: ALEX REYES

STATUS: INFECTED

Do not release into shared air.

**EVACUATION OPTION**

Transport capsule CC-2: available for exposed personnel.

Independent air supply: operational.

Sealed cargo transfer to shuttle: operational.

**ALEX · RADIO**

I know. I saw the log too. I just didn't want you to leave me.

**YOU**

Can you get into the transport capsule?

**ALEX · RADIO**

Yes.

**USE THE CONTAINMENT CAPSULE**

**LEAVE ALEX BEHIND**

### `capsule` — D

Alex seals themselves inside the capsule. You initiate the enclosed cargo transfer.

**SHUTTLE CARGO CONTROL**

CAPSULE RECEIVED

SEAL: INTACT

INDEPENDENT AIR: ACTIVE

**ALEX · INTERCOM**

Is it holding?

**YOU**

It's holding.

**ALERT THE MEDICAL CARRIER AND LAUNCH**

### `rescued_departure` — E

**YOU · RADIO**

Medical carrier, one infected survivor in sealed containment. Request isolated docking.

**MEDICAL CARRIER**

Keep the capsule sealed. We'll be waiting.

**ALEX · INTERCOM**

Thank you for checking.

**CONTINUE**

### `leave` — E

**YOU · RADIO**

Alex. I'm leaving.

**ALEX · RADIO**

Go. It's okay. Go.

You launch. You don't turn the radio off this time.

You listen until it stops.

**CONTINUE**

### `survivor_alone` — black

**STATION DESTRUCTION CONFIRMED**

**ENDING 1 OF 3 — SURVIVOR**

You reach the medical carrier alone.

You never learn why the lab was locked.

**PLAY AGAIN**

### `survivor_leave` — black

**STATION DESTRUCTION CONFIRMED**

**ENDING 1 OF 3 — SURVIVOR**

You reach the medical carrier alone.

The outbreak ends with the station.

So does Alex's chance of rescue.

**PLAY AGAIN**

### `contamination` — black

**STATION DESTRUCTION CONFIRMED**

**ENDING 2 OF 3 — CONTAMINATION**

The carrier refuses docking. Your shuttle is placed in quarantine.

You got Alex out.

You brought the organism with you.

**PLAY AGAIN**

### `rescue` — black

**STATION DESTRUCTION CONFIRMED**

**ENDING 3 OF 3 — RESCUE**

The carrier receives you through an isolated docking bay.

Alex's capsule goes straight to the medical team, still sealed.

Two survivors. Infection contained.

**PLAY AGAIN**

### Shared UI copy

- Header: **LAST SHUTTLE**
- Scene labels: **SERVICE CORRIDOR / LAB 3 ACCESS / LAB 3 REMOTE FEED / SHUTTLE CARGO / SHUTTLE COCKPIT**
- Status: **EVACUATION ACTIVE** before departure; **IN TRANSIT** during departure; **MISSION COMPLETE** at endings.
- Video control: **PAUSE VIDEO / RESUME VIDEO**
- Restart: **RESTART**
- Restart dialog: **Start over?** / **Your current choices will be cleared.** / **KEEP PLAYING** / **START OVER**
- Loading: **Loading scene…**
- Video failure with still: **Video unavailable. Continue with the still image.**
- All media unavailable: **Scene unavailable. You can still continue the story.**
- Retry media: **RETRY VIDEO**
- Ending credit: **Created by Chris Jereza · Visuals generated with Runway**
- Browser title: **Last Shuttle — An Interactive Sci-Fi Story**
- Page description: **An evacuation, a locked laboratory, and a colleague asking for help. Your choices decide who makes it out.**

## E. Paste into the building session

Attach this complete brief and the six MP4s plus their selected stills, then paste:

```text
Build LAST SHUTTLE exactly from the attached brief as one index.html with inline CSS and JavaScript. Use ./videos/ for the six MP4s and matching still images. No framework or build step. It will be served by a static host.

Implement section B as a data-driven scene graph and use all copy in section D verbatim. Four routes, three ending categories; preserve the two survivor variants. Use in-memory scene state. Do not add timers, inventory, random events, save systems, analytics, typewriter effects, auto-advances, or new branches. PLAY AGAIN returns to corridor; confirmed RESTART returns to start.

Open directly on the game title over the station exterior, with BEGIN. Desktop: narrow header, large 16:9 video, readable opaque dark dialogue panel across its lower portion, choices immediately below. Let longer reports extend below the video rather than cover the whole image. Mobile: video above dialogue, buttons stacked. Permit normal scrolling, with no clipped text or offscreen fixed controls.

Use near-black, cool white, muted cyan, amber warnings. Restrained monospace for system labels and readable sans-serif dialogue. Body text at least 16px. No rapid flashes, screen shake, glitch fonts or decorative marketing sections. Add a simple matching favicon and the supplied page metadata.

Videos are muted, autoplay, playsinline; play once and hold the last frame. Use selected stills as posters and fallbacks. Offer pause/resume. Reduced-motion users see stills initially and can opt into playback. Text and buttons appear immediately; never gate choices on media loading. Preload likely next clips without blocking the game. Pause previous video on transition. If media fails, keep all story choices operational and show the supplied fallback copy and retry control.

Keep the first version silent. Use real accessible text and buttons, visible keyboard focus, and move focus to the scene heading when changing nodes. Implement the supplied restart confirmation. Do not add localStorage or an ending collection screen. Only credit assets actually used.

Verify all four routes, both survivor texts, replay, restart/cancel, missing media, keyboard access, reduced motion and phone layout. Tell me which assets are missing rather than inventing completed footage. The final deliverable is a playable site, not a landing page describing the game.
```

Required folder contents:

```text
index.html
videos/a_corridor.mp4
videos/b_labdoor.mp4
videos/c_lab.mp4
videos/d_capsule.mp4
videos/e_shuttle.mp4
videos/f_exterior.mp4
```

Include each matching still in the same folder. If stills are JPG, the code must use JPG paths. Deploy the folder to a static host; if using your existing website, place it at `/last-shuttle/` through its normal deployment workflow. Test the hosted URL, not just a local file preview.

## F. Check before the interview

Run these routes:

1. BEGIN → SHUTTLE → CONTINUE → SURVIVOR, uninformed text.
2. BEGIN → LAB → OVERRIDE → CONTINUE → CONTAMINATION.
3. BEGIN → LAB → TERMINAL → CAPSULE → ALERT AND LAUNCH → CONTINUE → RESCUE.
4. BEGIN → LAB → TERMINAL → LEAVE → CONTINUE → SURVIVOR, informed text.

Check restart and replay reset correctly; terminal reading never opens the lab; the capsule is sealed before transfer; no empty seats contradict passengers; no intact station remains behind destruction text; missing video never blocks a choice; all text can be read and buttons reached on mobile.

Record one rescue playthrough as an interview backup after the site is complete. Keep the selected still, motion prompt and video from one shot ready to show in Runway.

## G. Five-minute presentation

- **0:00–0:20:** “I made a short interactive sci-fi story using six Runway scenes. You decide whether to abandon a colleague, release them, or investigate how to rescue them safely.”
- **0:20–2:00:** Play the rescue route. Let the choices demonstrate the format.
- **2:00–2:45:** Replay the override route to show a different outcome from the same assets.
- **2:45–3:45:** Show one selected still, its motion prompt, and the resulting clip. Explain an actual choice you made in composition or iteration.
- **3:45–4:30:** “I kept Alex on the radio and built the reports as interface text. That let me control the story precisely while using Runway to create the environments and atmosphere.”
- **4:30–5:00:** Explain the scene graph, testing, and how you used coding assistance. Invite them to try another path.

Report the actual time, generation count, tools and revisions you used. Do not present an estimated production time or an untested claim about model limitations as your experience.
