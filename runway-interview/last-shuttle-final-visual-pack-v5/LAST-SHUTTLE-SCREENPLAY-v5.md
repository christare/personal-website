# LAST SHUTTLE

## Complete branching screenplay — Cinematic Pass V5

September 14, 2026 · Creative direction: Chris Jereza

This script is exported from the current scene graph. All scene IDs, beat kinds, shots, branch destinations and ending categories match V4. Spoken copy and choice wording have been refined; Ellis replaces Alex throughout the game. The new compression export replaces the old lab/chair coverage and supplies the cold open. V4, V3 and BASELINE V1 remain preserved. The previous deployment used source b1bf4bf32982308a561cb5747ba0743499db2e3f.

### Presentation

The film opens immediately on the 2.8-second compression edit, with its embedded audio. ELLIS: “Are you there?” appears after the impact, at 1.1 seconds. The video plays once and holds for name entry. “Are you there?” stays on screen while the player types. An explicit Replay opening with sound action can replay the clip without clearing the name. The two premise lines below appear together here, not as extra dialogue steps.

After name entry: warm memory, 3.5 seconds per line; a 0.48-second interrupted-memory image; then present corridor, 3.4 and 3.9 seconds. Captions appear whole. The same corridor video continues across both lines. The first consequential choice arrives after about 17.6 seconds of film, plus name entry, transitions and loading. Pause/resume and skip are available; switching away pauses this sequence. No timed choice.

After the first choice, the existing manual dialogue controls resume. Subtitles appear whole. Click/tap or Space advances. Number keys select a displayed response; arrow keys move between focused responses. There is no typewriter step. The final line always precedes the ending label and credits. Play again returns to the corridor; Restart includes the cold open.

There are no performed dialogue recordings. ELLIS, YOU and MEDICAL CARRIER are readable dialogue; SYSTEM is literal interface information; NARRATION is an authored observation. Square-bracketed choices are silent actions. One persistent video element plays the current clip and its embedded sound. Sound enabling calls play directly inside the tap handler. Stills are silent; the memory animation has not yet been supplied. No added score or performed dialogue. Physical iPhone Safari playback still needs a device check; responsive browser emulation is not that check.

No people, faces, hands, silhouettes or designed creature are shown. Memory has warmer light, a different frame treatment and FOUR HOURS EARLIER label. A single dark structural interruption precedes the explicit NOW cut. Speech sits directly over the image, with a small speaker label; narration is italic; system records remain monospaced. Choices form a compact response list below the subtitles. Images remain behind the UI on mobile. Color and contrast progress from warm memory through cool evacuation, harsher quarantine, depleted abandonment or gentler medical isolation.

### Fixed story

Halden Station is being destroyed. The player has the last shuttle; Ellis is trapped in Lab 3 and has concealed an airborne infection. Opening the lab releases its air. A sealed capsule can travel to the shuttle while the door stays closed. A medical carrier accepts sealed transfer and refuses an exposed cabin. The cause of the architectural distortion remains unexplained. No new lore, countdown, failure state or rescue cost is introduced.

### Branch map

00 COLD OPEN + NAME → 01 MEMORY → 02 CORRIDOR

- Leave silently → 03A ALONE → 04A SURVIVOR: uninformed abandonment.
- Return → 03B DOOR → open → 04B RELEASED → 05B CONTAMINATION.
- Return → 03B DOOR → investigate → 04C REPORT → leave → 05C LEAVE → 06C SURVIVOR: informed abandonment.
- Return → 03B DOOR → investigate → 04C REPORT → capsule → 05D CAPSULE → 06D DEPARTURE → 07D RESCUE.

Four routes, three ending categories. The promise, concealment, shared-air consequence and final medical handoff are preserved.

---

## 00. COLD OPEN / INT. LAB 3 — PRESENT

**Scene ID:** `start`

**Dramatic purpose:** An impossible structural movement establishes the threat before setup. Ellis calls after the impact. Then the frame holds for the title, premise and name entry.

**Beat 1.** CUT TO: Empty laboratory architecture distorts violently. Source seconds 2.0–4.8; action begins inside the first second of this edit. The image remains an unexplained event, not proof that Ellis has died. Asset: `i_compression.mp4`.

**ELLIS**

> Are you there?

**Beat 2.** HOLD the same image. 

*NARRATION:* Halden is being scuttled. Yours is the last shuttle docked.

**Beat 3.** HOLD the same image. 

*NARRATION:* Ellis is still inside Lab 3.

**CONTINUE / ACTION:**

- **CONTINUE** → **01 INT. STATION GALLEY / SHUTTLE — FOUR HOURS EARLIER** (`memory`).

---

## 01. INT. STATION GALLEY / SHUTTLE — FOUR HOURS EARLIER

**Scene ID:** `memory`

**Dramatic purpose:** Give the player a mundane shared future and a promise that later choices can honor or break. Keep this ordinary, not portentous.

**Beat 1.** CUT TO: Two used mugs in the empty galley. A warm, inset frame identifies this as a memory. Asset: `inserts/shared-coffee.png`.

**ELLIS**

> Nico's when we land. Coffee, eggs on toast. My turn to pay.

**Beat 2.** CUT TO: An empty shuttle passenger seat, an open harness, Ellis's packed bag and the blue mug. No portrait or personal photograph. Asset: `inserts/empty-seat.png`.

**YOU**

> Your bag's under the spare seat. I'll wait for you there.

**MEMORY INTERRUPTION:** after the promise, cut back to the matching galley image with its background compressed into steel planes. Hold this single dark interruption for 0.48 seconds, clear subtitles, then cut to 02 CORRIDOR / NOW. A future Runway export replaces this image cut through the optional memoryBridge prop. No new dialogue, branch or pathogen lore is introduced.

---

## 02. INT. SERVICE CORRIDOR — PRESENT

**Scene ID:** `corridor`

**Dramatic purpose:** After the cold-open call, Ellis names a physical obstacle, then invokes the bag already waiting aboard. The tone moves from practical frustration to fear of being left. The player may avoid learning more.

**Beat 1.** CUT TO: Moving shot through the empty service corridor. The first two seconds of the source clip have been removed; picture and embedded audio begin together. Asset: `a_corridor.mp4`.

**ELLIS**

> Lab 3 won't take my card. Yours still has the override.

**Beat 2.** HOLD the same image. 

**ELLIS**

> My bag's under your spare seat, {name}. You said you'd wait.

**PLAYER CHOICE — select one:**

- **I said I'd wait. I'm coming back.** — Go back. Your keycard can override the lab door. → **03B INT. LAB 3 ACCESS — PRESENT** (`door`).
- **If I miss this launch, neither of us gets out.** — Launch alone. Leave Ellis behind. → **03A INT. SHUTTLE — DEPARTING WITHOUT ELLIS** (`alone`).

---

## 03A. INT. SHUTTLE — DEPARTING WITHOUT ELLIS

**Scene ID:** `alone`

**Dramatic purpose:** The departure becomes real to Ellis while the player hears the danger escalating. There is no response from the player on this route.

**Beat 1.** CUT TO: The shuttle cockpit and departure footage. Occupants remain outside the frame. Asset: `e_shuttle.mp4`.

**ELLIS**

> {name}? Was that you taking off?

**Beat 2.** CUT TO: An empty shuttle passenger seat, an open harness, Ellis's packed bag and the blue mug. No portrait or personal photograph. Asset: `inserts/empty-seat.png`.

**ELLIS**

> The benches are coming off the floor. {name}, answer me.

**Beat 3.** CUT TO: Close insert of the shuttle radio controls and speaker. Asset: `inserts/shuttle-radio.png`.

**SYSTEM — COMMS**

```text
CONNECTION LOST
```

**CONTINUE / ACTION:**

- **CONTINUE** → **04A EXT. HALDEN STATION / INT. SHUTTLE — AFTER DEPARTURE** (`survivor_alone`).

---

## 04A. EXT. HALDEN STATION / INT. SHUTTLE — AFTER DEPARTURE

**Scene ID:** `survivor_alone`

**Dramatic purpose:** The remembered bag gives the empty seat personal meaning. This is abandonment before investigating.

**Ending designation:** 1 of 3 — SURVIVOR. The label, credits and replay appear only after the player reads the final beat and presses CONTINUE. The final image and line remain visible underneath; no blackout or forced delay is added.

**Beat 1.** CUT TO: Exterior of Halden Station. At endings, play the existing destruction video. Asset: `f_exterior.mp4`.

**SYSTEM — HALDEN STATION**

```text
SCUTTLE COMPLETE
NO FURTHER LIFE SIGNS
```

**Beat 2.** CUT TO: An empty shuttle passenger seat, an open harness, Ellis's packed bag and the blue mug. No portrait or personal photograph. Asset: `inserts/empty-seat.png`.

*NARRATION:* Ellis's bag is still under the seat.

**CONTINUE / ACTION:**

- **Play again** → **02 INT. SERVICE CORRIDOR — PRESENT** (`corridor`).

---

## 03B. INT. LAB 3 ACCESS — PRESENT

**Scene ID:** `door`

**Dramatic purpose:** Proximity makes the plea harder to ignore. The warning makes opening the door a deliberate risk. Ellis pushes past it.

**Beat 1.** CUT TO: The sealed laboratory door. Existing industrial warning lighting; no one is visible. Asset: `b_labdoor.mp4`.

**ELLIS**

> The override by the reader. Hold it down till the seal breaks.

**Beat 2.** CUT TO: Close insert of the guarded override lever and warning light. Untouched hardware makes the impending action legible. Asset: `inserts/door-control.png`.

**SYSTEM — QUARANTINE INTERLOCK**

```text
LAB 3 SEALED
OVERRIDE RELEASES LAB AIR
INCIDENT LOG AVAILABLE
```

**Beat 3.** CUT TO: A wall intercom beside the sealed corridor door. It stands in for the unseen person at the other end. Asset: `inserts/intercom.png`.

**ELLIS**

> I can see the quarantine light. I'm asking you anyway.

**PLAYER CHOICE — select one:**

- **I'm opening Lab 3. Be ready to run.** — Open the door. Release the lab air. → **04B INT. SHUTTLE — ELLIS BROUGHT ABOARD** (`released`).
- **You knew it was quarantine. What aren't you telling me?** — Read the incident log. Keep the door sealed. → **04C LAB 3 TERMINAL / REMOTE FEED — PRESENT** (`report`).

---

## 04B. INT. SHUTTLE — ELLIS BROUGHT ABOARD

**Scene ID:** `released`

**Dramatic purpose:** Ellis tries to postpone an explanation. The player offers ordinary reassurance. The air warning cuts into that kindness and exposes what the concealment has cost both occupants.

**Beat 1.** CUT TO: The shuttle cockpit and departure footage. Occupants remain outside the frame. Asset: `e_shuttle.mp4`.

*NARRATION:* You get Ellis aboard and close the hatch.

**Beat 2.** CUT TO: Close insert of the shuttle radio controls and speaker. Asset: `inserts/shuttle-radio.png`.

**ELLIS · SEAT 2**

> Clear the docking arm. I'll tell you everything, I promise.

**Beat 3.** HOLD the same image. 

**YOU**

> Sit down. I've got you.

**Beat 4.** CUT TO: Close insert of the damp shared-air grille and red indicator. Asset: `inserts/cabin-air.png`.

**SYSTEM — CABIN AIR**

```text
AIRBORNE ORGANISM DETECTED
EXPOSURE: BOTH OCCUPANTS
```

**Beat 5 — FULL-FRAME PAYOFF.** Cut to `h_cabin.mp4`. The damp grille flexes and droplets move toward the lens. The threat remains unseen. Clear the dialogue and system panel. Play the clip once with its embedded audio; pause and mute the underlying shot.

**CONTINUE / ACTION:**

- **[Call for medical help.]** → **05B EXT. HALDEN STATION / INT. SHUTTLE — DOCKING REFUSED** (`contamination`).

---

## 05B. EXT. HALDEN STATION / INT. SHUTTLE — DOCKING REFUSED

**Scene ID:** `contamination`

**Dramatic purpose:** The station is gone, the carrier will not admit them, and the player cannot undo exposure by holding their breath. The script does not confirm a death.

**Ending designation:** 2 of 3 — CONTAMINATION. The label, credits and replay appear only after the player reads the final beat and presses CONTINUE. The final image and line remain visible underneath; no blackout or forced delay is added.

**Beat 1.** CUT TO: Exterior of Halden Station. At endings, play the existing destruction video. Asset: `f_exterior.mp4`.

**MEDICAL CARRIER**

> Halden, hold outside the docking ring. We can't take contaminated air.

**Beat 2.** CUT TO: Close insert of the damp shared-air grille and red indicator. Asset: `inserts/cabin-air.png`.

*NARRATION:* You hold your breath. It doesn't help.

**CONTINUE / ACTION:**

- **Play again** → **02 INT. SERVICE CORRIDOR — PRESENT** (`corridor`).

---

## 04C. LAB 3 TERMINAL / REMOTE FEED — PRESENT

**Scene ID:** `report`

**Dramatic purpose:** Evidence changes the problem from a locked door to infection. Ellis admits concealment and starts to excuse it; the player names the risk Ellis was willing to impose on them. A sealed transfer offers a way to help without sharing air, but the relationship has changed.

**Beat 1.** CUT TO: Close insert of the quarantine terminal. The game supplies legible records as system text. Asset: `inserts/lab-terminal.png`.

**SYSTEM — INCIDENT LOG**

```text
ELLIS: INFECTED
TRANSMISSION: AIRBORNE
DO NOT OPEN THE LAB
```

**Beat 2.** CUT TO: The aftermath of the opening distortion, from a later portion of the same Runway export. No repeated impact, chair insert or visible creature. Asset: `i_lab_aftermath.mp4`.

**ELLIS**

> That's the bench bolted to the deck.

**Beat 3.** CUT TO: A wall intercom beside the sealed corridor door. It stands in for the unseen person at the other end. Asset: `inserts/intercom.png`.

**ELLIS**

> I read the test. Then the scuttle alarm went off, and I—

**Beat 4.** HOLD the same image. 

**YOU**

> You were going to let me open it.

**Beat 5.** CUT TO: Close insert of the quarantine terminal. The game supplies legible records as system text. Asset: `inserts/lab-terminal.png`.

**SYSTEM — SEALED TRANSFER**

```text
CC-2: INDEPENDENT AIR SUPPLY
ENCLOSED RAIL TO SHUTTLE: ONLINE
LAB DOOR REMAINS CLOSED
```

**Beat 6.** CUT TO: The locking clamp, continuous gasket and steady green light. The capsule is opaque and sealed. Asset: `inserts/capsule-seal.png`.

**YOU**

> Can you reach CC-2? The transfer capsule.

**Beat 7.** CUT TO: A wall intercom beside the sealed corridor door. It stands in for the unseen person at the other end. Asset: `inserts/intercom.png`.

**ELLIS**

> Yeah. It locks from outside. You'd have the release.

**PLAYER CHOICE — select one:**

- **Get in CC-2. I'll stay on the channel.** — Use the sealed transfer. Keep the air separate. → **05D INT. SHUTTLE CARGO — SEALED TRANSFER** (`capsule`).
- **You let me walk up to that door. I'm done.** — Leave Ellis behind. Launch alone. → **05C INT. SHUTTLE — LEAVING AFTER THE DIAGNOSIS** (`leave`).

---

## 05C. INT. SHUTTLE — LEAVING AFTER THE DIAGNOSIS

**Scene ID:** `leave`

**Dramatic purpose:** The player now knowingly rejects a possible rescue. Ellis asks for a smaller mercy: keep the connection.

**Beat 1.** CUT TO: The shuttle cockpit and departure footage. Occupants remain outside the frame. Asset: `e_shuttle.mp4`.

**YOU**

> Ellis. I'm taking the shuttle. I can't bring you.

**Beat 2.** CUT TO: An empty shuttle passenger seat, an open harness, Ellis's packed bag and the blue mug. No portrait or personal photograph. Asset: `inserts/empty-seat.png`.

**ELLIS**

> Okay. Leave the channel open.

**Beat 3.** CUT TO: Close insert of the shuttle radio controls and speaker. Asset: `inserts/shuttle-radio.png`.

**SYSTEM — COMMS**

```text
CONNECTION LOST
```

**CONTINUE / ACTION:**

- **CONTINUE** → **06C EXT. HALDEN STATION / INT. SHUTTLE — AFTER THE LAST TRANSMISSION** (`survivor_leave`).

---

## 06C. EXT. HALDEN STATION / INT. SHUTTLE — AFTER THE LAST TRANSMISSION

**Scene ID:** `survivor_leave`

**Dramatic purpose:** The player leaves the radio on after leaving Ellis behind. Same survival result as the early exit, different moral and emotional context.

**Ending designation:** 1 of 3 — SURVIVOR. The label, credits and replay appear only after the player reads the final beat and presses CONTINUE. The final image and line remain visible underneath; no blackout or forced delay is added.

**Beat 1.** CUT TO: Exterior of Halden Station. At endings, play the existing destruction video. Asset: `f_exterior.mp4`.

**SYSTEM — HALDEN STATION**

```text
SCUTTLE COMPLETE
NO FURTHER LIFE SIGNS
```

**Beat 2.** CUT TO: An empty shuttle passenger seat, an open harness, Ellis's packed bag and the blue mug. No portrait or personal photograph. Asset: `inserts/empty-seat.png`.

*NARRATION:* You leave the radio on.

**CONTINUE / ACTION:**

- **Play again** → **02 INT. SERVICE CORRIDOR — PRESENT** (`corridor`).

---

## 05D. INT. SHUTTLE CARGO — SEALED TRANSFER

**Scene ID:** `capsule`

**Dramatic purpose:** The objective changes from escaping a room to trusting a barrier. A human question about the lock precedes a physical test of that barrier.

**Beat 1.** CUT TO: The opaque containment capsule and its transfer hardware. The person inside is never shown. Asset: `d_capsule.mp4`.

**SYSTEM — CARGO CONTROL**

```text
CAPSULE RECEIVED
ONE OCCUPANT
CABIN AIR ISOLATED
```

**Beat 2.** CUT TO: The locking clamp, continuous gasket and steady green light. The capsule is opaque and sealed. Asset: `inserts/capsule-seal.png`.

**ELLIS · INTERCOM**

> The lid's shut. There's no handle on this side.

**Beat 3.** HOLD the same image. 

**YOU**

> CC-2's green. I'm keeping your air separate.

**Beat 4 — FULL-FRAME PAYOFF.** Cut to `h_capsule.mp4`. The sealed capsule end plate flexes under pressure. The clamp and gasket stay shut; the green light remains on. Clear the dialogue and system panel. Play the clip once with its embedded audio; pause and mute the underlying shot.

**CONTINUE / ACTION:**

- **Launch. Keep CC-2 sealed.** → **06D INT. SHUTTLE — IN TRANSIT** (`rescued_departure`).

---

## 06D. INT. SHUTTLE — IN TRANSIT

**Scene ID:** `rescued_departure`

**Dramatic purpose:** Clear procedural radio traffic gives way to Ellis asking whether the personal connection is still there. The player answers directly.

**Beat 1.** CUT TO: The shuttle cockpit and departure footage. Occupants remain outside the frame. Asset: `e_shuttle.mp4`.

**YOU**

> Medical, Halden shuttle. Two aboard. One infected, sealed in CC-2.

**Beat 2.** CUT TO: Close insert of the shuttle radio controls and speaker. Asset: `inserts/shuttle-radio.png`.

**MEDICAL CARRIER**

> Bay four. Leave CC-2 sealed until our team takes it.

**Beat 3.** CUT TO: The locking clamp, continuous gasket and steady green light. The capsule is opaque and sealed. Asset: `inserts/capsule-seal.png`.

**ELLIS · INTERCOM**

> {name}? Leave the channel open till they take me.

**Beat 4.** CUT TO: Close insert of the shuttle radio controls and speaker. Asset: `inserts/shuttle-radio.png`.

**YOU**

> I'm here.

**CONTINUE / ACTION:**

- **CONTINUE** → **07D EXT. HALDEN STATION / INT. MEDICAL ISOLATION — LATER** (`rescue`).

---

## 07D. EXT. HALDEN STATION / INT. MEDICAL ISOLATION — LATER

**Scene ID:** `rescue`

**Dramatic purpose:** Return to the opening promise in an ordinary request to wait. Survival is secured; the relationship is the last beat.

**Ending designation:** 3 of 3 — RESCUE. The label, credits and replay appear only after the player reads the final beat and presses CONTINUE. The final image and line remain visible underneath; no blackout or forced delay is added.

**Beat 1.** CUT TO: Exterior of Halden Station. At endings, play the existing destruction video. Asset: `f_exterior.mp4`.

**SYSTEM — HALDEN STATION**

```text
SCUTTLE COMPLETE
SHUTTLE CLEAR
```

**Beat 2.** CUT TO: The sealed capsule beyond an isolation partition. An empty waiting chair on the observer side. The room is unstaffed in the image. Asset: `inserts/isolation-bay.png`.

**ELLIS · MEDICAL BAY**

> Bay four's locked. Will you wait outside?

**Beat 3.** HOLD the same image. 

**YOU**

> Of course.

**CONTINUE / ACTION:**

- **Play again** → **02 INT. SERVICE CORRIDOR — PRESENT** (`corridor`).

---

## Complete path reading order

- **Early departure:** 00 → 01 → 02 → 03A → 04A.
- **Open the door:** 00 → 01 → 02 → 03B → 04B → 05B.
- **Investigate, then leave:** 00 → 01 → 02 → 03B → 04C → 05C → 06C.
- **Sealed rescue:** 00 → 01 → 02 → 03B → 04C → 05D → 06D → 07D.

## Questions for an external script reviewer

1. Which exact lines sound authored for the audience rather than spoken to another person? Offer replacements of comparable length.
2. Does the ordinary memory earn concern for Ellis without assigning a face, gender or elaborate history?
3. Track Ellis's tactics: checking for a response, requesting help, invoking the promise, overriding hesitation, concealing, admitting, asking for connection. Where do these repeat without developing?
4. Does the informed-abandonment branch feel different from leaving before learning the diagnosis?
5. Does the open-door branch communicate both a compassionate impulse and the cost of Ellis's concealment?
6. Is sealed rescue too obviously the correct answer once the transfer appears? Propose a cost or ambiguity separately; do not quietly rewrite the current mechanics.
7. Which necessary off-screen actions would become confusing if their narration were deleted? Which captions can disappear because the image already carries them?
8. Do the three final images and final lines leave distinct feelings? Identify any line that is trying too hard to be quotable.
9. Can the connection between infection and environmental movement remain unsettling without additional monster lore?
10. Give a line-level pass first. Put all new scenes, facts, sounds, deaths, loops and mechanics in a clearly separate proposal.

The preserved prior version is **LAST SHUTTLE — BASELINE V1**, under `versions/last-shuttle-baseline-v1-2026-09-14/`. Do not alter it.
