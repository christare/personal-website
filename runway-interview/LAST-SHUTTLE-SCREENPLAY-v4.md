# LAST SHUTTLE

## Complete branching screenplay — Opening Cut V4

September 14, 2026 · Creative direction: Chris Jereza

This script is exported from the current scene graph. All choices, destinations, endings and post-opening dialogue match V3. The new compression export replaces the old lab/chair coverage and supplies the cold open. V3 and BASELINE V1 remain preserved.

### Presentation

The film opens immediately on the 2.8-second compression edit, with its embedded audio. ALEX: “Are you there?” appears after the impact, at 1.1 seconds. The video plays once and holds for name entry. The two premise lines below appear together here, not as extra dialogue steps.

After name entry: warm memory, 3.2 seconds per line; then present corridor, 3.8 and 4.0 seconds. Captions appear whole. The same corridor video continues across both lines. The first consequential choice arrives after about 17.4 seconds of film, plus name entry, transitions and loading. Pause/resume and skip are available; switching away pauses this sequence. No timed choice.

After the first choice, the existing manual dialogue controls resume. Click or Space reveals a typing line, then advances. The final line always precedes the ending label and credits. Play again returns to the corridor; Restart includes the cold open.

There are no performed dialogue recordings. ALEX, YOU and MEDICAL CARRIER are readable dialogue; SYSTEM is literal interface information; NARRATION is an authored observation. Square-bracketed choices are silent actions. Only the current video plays its embedded sound. No added score.

No people, faces, hands, silhouettes or designed creature are shown. Memory has a warm inset frame and FOUR HOURS EARLIER label; present scenes are marked NOW. Speech, player speech, narration and system records retain distinct typography in one reading area.

### Fixed story

Halden Station is being destroyed. The player has the last shuttle; Alex is trapped in Lab 3 and has concealed an airborne infection. Opening the lab releases its air. A sealed capsule can travel to the shuttle while the door stays closed. A medical carrier accepts sealed transfer and refuses an exposed cabin. The cause of the architectural distortion remains unexplained. No new lore, countdown, failure state or rescue cost is introduced.

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

**Dramatic purpose:** An impossible structural movement establishes the threat before setup. Alex calls after the impact. Then the frame holds for the title, premise and name entry.

**Beat 1.** CUT TO: Empty laboratory architecture distorts violently. Source seconds 2.0–4.8; action begins inside the first second of this edit. The image remains an unexplained event, not proof that Alex has died. Asset: `i_compression.mp4`.

**ALEX**

> Are you there?

**Beat 2.** HOLD the same image. 

*NARRATION:* The station is being destroyed. You have the last shuttle.

**Beat 3.** HOLD the same image. 

*NARRATION:* Alex, your friend and crewmate, is still inside.

**CONTINUE / ACTION:**

- **CONTINUE** → **01 INT. STATION GALLEY / SHUTTLE — FOUR HOURS EARLIER** (`memory`).

---

## 01. INT. STATION GALLEY / SHUTTLE — FOUR HOURS EARLIER

**Scene ID:** `memory`

**Dramatic purpose:** Give the player a mundane shared future and a promise that later choices can honor or break. Keep this ordinary, not portentous.

**Beat 1.** CUT TO: Two used mugs in the empty galley. A warm, inset frame identifies this as a memory. Asset: `inserts/shared-coffee.png`.

**ALEX**

> Breakfast tomorrow. My treat. Somewhere with actual coffee.

**Beat 2.** CUT TO: An empty shuttle passenger seat, an open harness, Alex's packed bag and the blue mug. No portrait or personal photograph. Asset: `inserts/empty-seat.png`.

**YOU**

> Your bag's on the shuttle. I'll wait for you there.

**AUTOMATIC CUT** to 02 CORRIDOR after the second line. No Answer Alex button.

---

## 02. INT. SERVICE CORRIDOR — PRESENT

**Scene ID:** `corridor`

**Dramatic purpose:** After the cold-open call, Alex names a physical obstacle, then invokes the bag already waiting aboard. The tone moves from practical frustration to fear of being left. The player may avoid learning more.

**Beat 1.** CUT TO: Moving shot through the empty service corridor. The first two seconds of the source clip have been removed; picture and embedded audio begin together. Asset: `a_corridor.mp4`.

**ALEX**

> I'm stuck in the lab. The reader won't take my card.

**Beat 2.** HOLD the same image. 

**ALEX**

> My bag's already on your shuttle, {name}. Don't leave without me.

**PLAYER CHOICE — select one:**

- **I can't leave Alex here.** — Go back. Your keycard can override the lab door. → **03B INT. LAB 3 ACCESS — PRESENT** (`door`).
- **[Say nothing. Head for the shuttle.]** — Launch alone. Leave Alex behind. → **03A INT. SHUTTLE — DEPARTING WITHOUT ALEX** (`alone`).

---

## 03A. INT. SHUTTLE — DEPARTING WITHOUT ALEX

**Scene ID:** `alone`

**Dramatic purpose:** The departure becomes real to Alex while the player hears the danger escalating. There is no response from the player on this route.

**Beat 1.** CUT TO: The shuttle cockpit and departure footage. Occupants remain outside the frame. Asset: `e_shuttle.mp4`.

**ALEX**

> {name}? Was that you taking off?

**Beat 2.** CUT TO: An empty shuttle passenger seat, an open harness, Alex's packed bag and the blue mug. No portrait or personal photograph. Asset: `inserts/empty-seat.png`.

**ALEX**

> Something's moving in here. {name}, come back.

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

**Beat 2.** CUT TO: An empty shuttle passenger seat, an open harness, Alex's packed bag and the blue mug. No portrait or personal photograph. Asset: `inserts/empty-seat.png`.

*NARRATION:* Alex's bag is still under the seat.

**CONTINUE / ACTION:**

- **Play again** → **02 INT. SERVICE CORRIDOR — PRESENT** (`corridor`).

---

## 03B. INT. LAB 3 ACCESS — PRESENT

**Scene ID:** `door`

**Dramatic purpose:** Proximity makes the plea harder to ignore. The warning makes opening the door a deliberate risk. Alex pushes past it.

**Beat 1.** CUT TO: The sealed laboratory door. Existing industrial warning lighting; no one is visible. Asset: `b_labdoor.mp4`.

**ALEX**

> You're there. Okay. The release is on your side.

**Beat 2.** CUT TO: Close insert of the guarded override lever and warning light. Untouched hardware makes the impending action legible. Asset: `inserts/door-control.png`.

**SYSTEM — QUARANTINE INTERLOCK**

```text
LAB 3 SEALED
OVERRIDE RELEASES LAB AIR
INCIDENT LOG AVAILABLE
```

**Beat 3.** CUT TO: A wall intercom beside the sealed corridor door. It stands in for the unseen person at the other end. Asset: `inserts/intercom.png`.

**ALEX**

> I know what the light means. Just open it.

**PLAYER CHOICE — select one:**

- **I'm getting you out.** — Open the door. Release the lab air. → **04B INT. SHUTTLE — ALEX BROUGHT ABOARD** (`released`).
- **Wait. Let me check what happened.** — Read the incident log. Keep the door sealed. → **04C LAB 3 TERMINAL / REMOTE FEED — PRESENT** (`report`).

---

## 04B. INT. SHUTTLE — ALEX BROUGHT ABOARD

**Scene ID:** `released`

**Dramatic purpose:** Alex tries to postpone an explanation. The player offers ordinary reassurance. The air warning cuts into that kindness and exposes what the concealment has cost both occupants.

**Beat 1.** CUT TO: The shuttle cockpit and departure footage. Occupants remain outside the frame. Asset: `e_shuttle.mp4`.

*NARRATION:* You get Alex aboard and close the hatch.

**Beat 2.** CUT TO: Close insert of the shuttle radio controls and speaker. Asset: `inserts/shuttle-radio.png`.

**ALEX · SEAT 2**

> Just get us out of here. I'll explain. I promise.

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

> Stay where you are. We can't let you dock.

**Beat 2.** CUT TO: Close insert of the damp shared-air grille and red indicator. Asset: `inserts/cabin-air.png`.

*NARRATION:* You hold your breath. It doesn't help.

**CONTINUE / ACTION:**

- **Play again** → **02 INT. SERVICE CORRIDOR — PRESENT** (`corridor`).

---

## 04C. LAB 3 TERMINAL / REMOTE FEED — PRESENT

**Scene ID:** `report`

**Dramatic purpose:** Evidence changes the problem from a locked door to infection. Alex admits concealment and starts to excuse it; the player names the risk Alex was willing to impose on them. A sealed transfer offers a way to help without sharing air, but the relationship has changed.

**Beat 1.** CUT TO: Close insert of the quarantine terminal. The game supplies legible records as system text. Asset: `inserts/lab-terminal.png`.

**SYSTEM — INCIDENT LOG**

```text
ALEX: INFECTED
TRANSMISSION: AIRBORNE
DO NOT OPEN THE LAB
```

**Beat 2.** CUT TO: The aftermath of the opening distortion, from a later portion of the same Runway export. No repeated impact, chair insert or visible creature. Asset: `i_lab_aftermath.mp4`.

**ALEX**

> Tell me you're seeing this.

**Beat 3.** CUT TO: A wall intercom beside the sealed corridor door. It stands in for the unseen person at the other end. Asset: `inserts/intercom.png`.

**ALEX**

> I saw the result. I was going to tell you, I just—

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

> Can you reach that capsule?

**Beat 7.** CUT TO: A wall intercom beside the sealed corridor door. It stands in for the unseen person at the other end. Asset: `inserts/intercom.png`.

**ALEX**

> Yeah. Keep talking while I do it.

**PLAYER CHOICE — select one:**

- **Get in the capsule. I'll bring you over.** — Use the sealed transfer. Keep the air separate. → **05D INT. SHUTTLE CARGO — SEALED TRANSFER** (`capsule`).
- **I need to get out of here.** — Leave Alex behind. Launch alone. → **05C INT. SHUTTLE — LEAVING AFTER THE DIAGNOSIS** (`leave`).

---

## 05C. INT. SHUTTLE — LEAVING AFTER THE DIAGNOSIS

**Scene ID:** `leave`

**Dramatic purpose:** The player now knowingly rejects a possible rescue. Alex asks for a smaller mercy: keep the connection.

**Beat 1.** CUT TO: The shuttle cockpit and departure footage. Occupants remain outside the frame. Asset: `e_shuttle.mp4`.

**YOU**

> Alex. I'm sorry. I'm leaving.

**Beat 2.** CUT TO: An empty shuttle passenger seat, an open harness, Alex's packed bag and the blue mug. No portrait or personal photograph. Asset: `inserts/empty-seat.png`.

**ALEX**

> Okay. Just don't hang up.

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

**Dramatic purpose:** The player leaves the radio on after leaving Alex behind. Same survival result as the early exit, different moral and emotional context.

**Ending designation:** 1 of 3 — SURVIVOR. The label, credits and replay appear only after the player reads the final beat and presses CONTINUE. The final image and line remain visible underneath; no blackout or forced delay is added.

**Beat 1.** CUT TO: Exterior of Halden Station. At endings, play the existing destruction video. Asset: `f_exterior.mp4`.

**SYSTEM — HALDEN STATION**

```text
SCUTTLE COMPLETE
NO FURTHER LIFE SIGNS
```

**Beat 2.** CUT TO: An empty shuttle passenger seat, an open harness, Alex's packed bag and the blue mug. No portrait or personal photograph. Asset: `inserts/empty-seat.png`.

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

**ALEX · INTERCOM**

> Is it locked? I can't tell from in here.

**Beat 3.** HOLD the same image. 

**YOU**

> It's locked. I've got a green light.

**Beat 4 — FULL-FRAME PAYOFF.** Cut to `h_capsule.mp4`. The sealed capsule end plate flexes under pressure. The clamp and gasket stay shut; the green light remains on. Clear the dialogue and system panel. Play the clip once with its embedded audio; pause and mute the underlying shot.

**CONTINUE / ACTION:**

- **[Launch with Alex.]** → **06D INT. SHUTTLE — IN TRANSIT** (`rescued_departure`).

---

## 06D. INT. SHUTTLE — IN TRANSIT

**Scene ID:** `rescued_departure`

**Dramatic purpose:** Clear procedural radio traffic gives way to Alex asking whether the personal connection is still there. The player answers directly.

**Beat 1.** CUT TO: The shuttle cockpit and departure footage. Occupants remain outside the frame. Asset: `e_shuttle.mp4`.

**YOU**

> Medical, this is the Halden shuttle. Two aboard. One infected, in a sealed capsule.

**Beat 2.** CUT TO: Close insert of the shuttle radio controls and speaker. Asset: `inserts/shuttle-radio.png`.

**MEDICAL CARRIER**

> Bring them to isolation bay four. Keep that capsule shut.

**Beat 3.** CUT TO: The locking clamp, continuous gasket and steady green light. The capsule is opaque and sealed. Asset: `inserts/capsule-seal.png`.

**ALEX · INTERCOM**

> {name}? Don't turn this off yet.

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

**ALEX · MEDICAL BAY**

> They won't let me out yet. Will you wait outside?

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
2. Does the ordinary memory earn concern for Alex without assigning a face, gender or elaborate history?
3. Track Alex's tactics: checking for a response, requesting help, invoking the promise, overriding hesitation, concealing, admitting, asking for connection. Where do these repeat without developing?
4. Does the informed-abandonment branch feel different from leaving before learning the diagnosis?
5. Does the open-door branch communicate both a compassionate impulse and the cost of Alex's concealment?
6. Is sealed rescue too obviously the correct answer once the transfer appears? Propose a cost or ambiguity separately; do not quietly rewrite the current mechanics.
7. Which necessary off-screen actions would become confusing if their narration were deleted? Which captions can disappear because the image already carries them?
8. Do the three final images and final lines leave distinct feelings? Identify any line that is trying too hard to be quotable.
9. Can the connection between infection and environmental movement remain unsettling without additional monster lore?
10. Give a line-level pass first. Put all new scenes, facts, sounds, deaths, loops and mechanics in a clearly separate proposal.

The preserved prior version is **LAST SHUTTLE — BASELINE V1**, under `versions/last-shuttle-baseline-v1-2026-09-14/`. Do not alter it.
