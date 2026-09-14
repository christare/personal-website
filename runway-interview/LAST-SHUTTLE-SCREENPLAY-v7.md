# LAST SHUTTLE

## Complete branching screenplay. Title and Coffee Pass V7

September 14, 2026. Creative direction: Chris Jereza

Exported from the current game. All 14 scene IDs, branch destinations and ending categories match V6. All non-intro beat kinds and shots remain intact. Only the two introductory explanations were condensed into a single premise. V1, V3, V4, V5 and V6 remain preserved.

### Presentation

A minimal title screen shows LAST SHUTTLE, a sound recommendation, click/Space instructions, and a quiet Chris Jereza / Runway / 9-14-26 credit. The first click or Space starts the compression clip and enables audio directly from the gesture. Ellis: “Are you there?” appears at 1.1 seconds and stays anchored in the same reading position while the name form fades in beneath it. The only premise is “One shuttle left. The station is coming apart.” The response to name entry is “I'm here.” No title stack, station status, duplicate input label or privacy aside appears.

Every dialogue beat is manual, including both memory lines and the corridor. Click or Space advances one beat; the instruction appears once on the title screen. The small chevron is a Continue button. The two-response choices are explicitly labeled You, with no redundant consequence descriptions or visible numbers. Arrow keys and number shortcuts remain available. Video plays once and holds its final frame, never advancing dialogue. Player-initiated memory interruption is the only short automatic transition.

Speaker names sit inline with speech. Ellis is warm white with an amber name; the player's lines and responses use cool blue plus the explicit You label. Narration is italic. System information is one readable sentence, not a stack of all-caps labels. There is no persistent panel background or blur. Text shadows and the full-frame vignette support contrast. System records use monospaced text, a small uppercase heading and a thin rule; dialogue remains proportional and inline. The reading origin remains fixed as controls appear. Only the active beat is displayed. Final lines precede the ending and credits.

The media player holds the actual outgoing frame until the next still or video is decoded. It does not reset the beat index or briefly replay the scene's default shot. Source changes retain one audio element. Videos carry their existing embedded sound; stills are silent. Audio activation runs directly in a user gesture. Physical iPhone Safari still needs a device check.

The coffee memory is warm and marked Four hours earlier. The return is marked Now. The supplied coffee warp clip links them, starting at source second 1. It runs 7.096 seconds with a slow 4.5% push-in and its original embedded audio. Its warm-to-damaged color transition remains intact. Adding public/last-shuttle/j_memory_bridge.mp4 automatically selects the video at the next build and deployment, with no component edit or missing-file request. Failed playback falls back to the image. The two supplied reference frames and Runway prompt from V5 still apply. The user supplied the coffee footage. No additional generation was required.

Reference principles: [Skyrim's official manual, dialogue section](https://cdn.akamai.steamstatic.com/steam/apps/72850/manuals/skyrim_gfw_manual-07.pdf) separates character speech from selectable player responses. [Xbox subtitle guidance](https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/104) supports inline speaker identification, supplementary color, readable contrast and short subtitle blocks. This game has no visible speaker to position text beside, so its reading area remains stable in the lower middle of the frame.

### Fixed story

Halden Station is being destroyed. The player has the last shuttle; Ellis is trapped in Lab 3 and has concealed a warning about airborne spread. The log does not diagnose Ellis personally. Opening the lab releases its air. A sealed capsule can travel to the shuttle while the door stays closed. A medical carrier accepts sealed transfer and refuses an exposed cabin. Personal infection remains uncertain on the sealed route. Shared-cabin exposure is confirmed only after the open-door branch. The cause of the architectural distortion remains unexplained. No new lore, countdown, failure state or rescue cost is introduced.

### Branch map

00 COLD OPEN + NAME → 01 MEMORY → 02 CORRIDOR

- Leave before investigating → 03A ALONE → 04A SURVIVOR: uninformed abandonment.
- Return → 03B DOOR → open → 04B RELEASED → 05B CONTAMINATION.
- Return → 03B DOOR → investigate → 04C REPORT → leave → 05C LEAVE → 06C SURVIVOR: informed abandonment.
- Return → 03B DOOR → investigate → 04C REPORT → capsule → 05D CAPSULE → 06D DEPARTURE → 07D RESCUE.

Four routes, three ending categories. The promise, concealment, shared-air consequence and final medical handoff are preserved.

---

## 00. COLD OPEN / INT. LAB 3 . PRESENT

**Scene ID:** `start`

**Dramatic purpose:** An impossible structural movement establishes the threat before setup. Ellis calls after the impact. Then the frame holds for one premise and name entry, with the caller anchored.

**Beat 1.** CUT TO: Empty laboratory architecture distorts violently. Source seconds 2.0–4.8; action begins inside the first second of this edit. The image remains an unexplained event, not proof that Ellis has died. Asset: `i_compression.mp4`.

**Ellis**

> Are you there?

**Beat 2.** HOLD the same image. 

*NARRATION:* One shuttle left. The station is coming apart.

**CONTINUE / ACTION:**

- **CONTINUE** → **01 INT. STATION GALLEY / SHUTTLE . FOUR HOURS EARLIER** (`memory`).

---

## 01. INT. STATION GALLEY / SHUTTLE . FOUR HOURS EARLIER

**Scene ID:** `memory`

**Dramatic purpose:** Give the player a mundane shared future and a promise that later choices can honor or break. Keep this ordinary, not portentous.

**Beat 1.** CUT TO: Two used mugs in the empty galley. A warm, inset frame identifies this as a memory. Asset: `inserts/shared-coffee.png`.

**Ellis**

> Carnegie Diner when we land. Coffee and eggs. I'm paying this time.

**Beat 2.** CUT TO: An empty shuttle passenger seat, an open harness, Ellis's packed bag and the blue mug. No portrait or personal photograph. Asset: `inserts/empty-seat.png`.

**YOU**

> Your bag's under the spare seat. I'm not leaving without you.

**MEMORY INTERRUPTION:** after the promise, cut back to the matching galley image with its background compressed into steel planes. Play j_memory_bridge.mp4, trimmed from source second 1 with a slow 4.5% push-in. Clear subtitles, preserve the twist and embedded audio, then cut to 02 CORRIDOR / NOW. The original 0.48-second still remains an error fallback. No new dialogue, branch or pathogen lore is introduced.

---

## 02. INT. SERVICE CORRIDOR . PRESENT

**Scene ID:** `corridor`

**Dramatic purpose:** After the cold-open call, Ellis names a physical obstacle, then invokes the bag already waiting aboard. The tone moves from practical frustration to fear of being left. The player may avoid learning more.

**Beat 1.** CUT TO: Moving shot through the empty service corridor. The first two seconds of the source clip have been removed; picture and embedded audio begin together. Asset: `a_corridor.mp4`.

**Ellis**

> Lab 3 won't take my card. Yours will. Come on.

**Beat 2.** HOLD the same image. 

**Ellis**

> {name}, my bag's already on your shuttle. You said you'd wait.

**PLAYER CHOICE . select one:**

- **I'm not breaking that promise. I'm coming back.** → **03B INT. LAB 3 ACCESS . PRESENT** (`door`).
- **I'm scared too, Ellis. I'm taking the shuttle.** → **03A INT. SHUTTLE . DEPARTING WITHOUT ELLIS** (`alone`).

---

## 03A. INT. SHUTTLE . DEPARTING WITHOUT ELLIS

**Scene ID:** `alone`

**Dramatic purpose:** The departure becomes real to Ellis while the player hears the danger escalating. There is no response from the player on this route.

**Beat 1.** CUT TO: The shuttle cockpit and departure footage. Occupants remain outside the frame. Asset: `e_shuttle.mp4`.

**Ellis**

> {name}? Was that you taking off?

**Beat 2.** CUT TO: An empty shuttle passenger seat, an open harness, Ellis's packed bag and the blue mug. No portrait or personal photograph. Asset: `inserts/empty-seat.png`.

**Ellis**

> The floor's coming up. {name}, pick up. Pick up.

**Beat 3.** CUT TO: Close insert of the shuttle radio controls and speaker. Asset: `inserts/shuttle-radio.png`.

**SYSTEM . Radio**

```text
Signal lost.
```

**CONTINUE / ACTION:**

- **CONTINUE** → **04A EXT. HALDEN STATION / INT. SHUTTLE . AFTER DEPARTURE** (`survivor_alone`).

---

## 04A. EXT. HALDEN STATION / INT. SHUTTLE . AFTER DEPARTURE

**Scene ID:** `survivor_alone`

**Dramatic purpose:** The remembered bag gives the empty seat personal meaning. This is abandonment before investigating.

**Ending designation:** 1 of 3 . SURVIVOR. The label, credits and replay appear only after the player reads the final beat and presses CONTINUE. The final image and line remain visible underneath; no blackout or forced delay is added.

**Beat 1.** CUT TO: Exterior of Halden Station. At endings, play the existing destruction video. Asset: `f_exterior.mp4`.

**SYSTEM . Halden**

```text
Station destroyed. No life signs.
```

**Beat 2.** CUT TO: An empty shuttle passenger seat, an open harness, Ellis's packed bag and the blue mug. No portrait or personal photograph. Asset: `inserts/empty-seat.png`.

*NARRATION:* Ellis's bag is still under the seat.

**CONTINUE / ACTION:**

- **Play again** → **02 INT. SERVICE CORRIDOR . PRESENT** (`corridor`).

---

## 03B. INT. LAB 3 ACCESS . PRESENT

**Scene ID:** `door`

**Dramatic purpose:** Proximity makes the plea harder to ignore. The warning makes opening the door a deliberate risk. Ellis pushes past it.

**Beat 1.** CUT TO: The sealed laboratory door. Existing industrial warning lighting; no one is visible. Asset: `b_labdoor.mp4`.

**Ellis**

> Hold the release next to the reader. Don't let go.

**Beat 2.** CUT TO: Close insert of the guarded override lever and warning light. Untouched hardware makes the impending action legible. Asset: `inserts/door-control.png`.

**SYSTEM . Door seal**

```text
Opening it vents the lab.
```

**Beat 3.** CUT TO: A wall intercom beside the sealed corridor door. It stands in for the unseen person at the other end. Asset: `inserts/intercom.png`.

**Ellis**

> I know the light's on. That doesn't mean you leave me here.

**PLAYER CHOICE . select one:**

- **I'm opening it. Stay close to me.** → **04B INT. SHUTTLE . ELLIS BROUGHT ABOARD** (`released`).
- **Why didn't you tell me about the lockdown?** → **04C LAB 3 TERMINAL / REMOTE FEED . PRESENT** (`report`).

---

## 04B. INT. SHUTTLE . ELLIS BROUGHT ABOARD

**Scene ID:** `released`

**Dramatic purpose:** Ellis tries to postpone an explanation. The player offers ordinary reassurance. The air warning cuts into that kindness and exposes what the concealment has cost both occupants.

**Beat 1.** CUT TO: The shuttle cockpit and departure footage. Occupants remain outside the frame. Asset: `e_shuttle.mp4`.

*NARRATION:* You get Ellis aboard and close the hatch.

**Beat 2.** CUT TO: Close insert of the shuttle radio controls and speaker. Asset: `inserts/shuttle-radio.png`.

**Ellis**

> Go. Get us clear. You can hate me when we're out.

**Beat 3.** HOLD the same image. 

**YOU**

> Sit down. I've got you.

**Beat 4.** CUT TO: Close insert of the damp shared-air grille and red indicator. Asset: `inserts/cabin-air.png`.

**SYSTEM . Cabin air**

```text
Contamination detected. Both occupants exposed.
```

**Beat 5 . FULL-FRAME PAYOFF.** Cut to `h_cabin.mp4`. The damp grille flexes and droplets move toward the lens. The threat remains unseen. Clear the dialogue and system panel. Play the clip once with its embedded audio; pause and mute the underlying shot.

**CONTINUE / ACTION:**

- **[Call for medical help.]** → **05B EXT. HALDEN STATION / INT. SHUTTLE . DOCKING REFUSED** (`contamination`).

---

## 05B. EXT. HALDEN STATION / INT. SHUTTLE . DOCKING REFUSED

**Scene ID:** `contamination`

**Dramatic purpose:** The station is gone, the carrier will not admit them, and the player cannot undo exposure by holding their breath. The script does not confirm a death.

**Ending designation:** 2 of 3 . CONTAMINATION. The label, credits and replay appear only after the player reads the final beat and presses CONTINUE. The final image and line remain visible underneath; no blackout or forced delay is added.

**Beat 1.** CUT TO: Exterior of Halden Station. At endings, play the existing destruction video. Asset: `f_exterior.mp4`.

**Medical**

> RNWAY, stop. We can't let you dock. Your cabin is contaminated.

**Beat 2.** CUT TO: Close insert of the damp shared-air grille and red indicator. Asset: `inserts/cabin-air.png`.

*NARRATION:* You hold your breath. It doesn't help.

**CONTINUE / ACTION:**

- **Play again** → **02 INT. SERVICE CORRIDOR . PRESENT** (`corridor`).

---

## 04C. LAB 3 TERMINAL / REMOTE FEED . PRESENT

**Scene ID:** `report`

**Dramatic purpose:** Evidence changes the problem from a locked door to possible airborne danger. Ellis admits concealment and starts to excuse it; the player names the risk Ellis was willing to impose on them. A sealed transfer offers a way to help without sharing air, but the relationship has changed.

**Beat 1.** CUT TO: Close insert of the quarantine terminal. The game supplies legible records as system text. Asset: `inserts/lab-terminal.png`.

**SYSTEM . Incident log**

```text
Airborne spread detected in Lab 3.
```

**Beat 2.** CUT TO: The aftermath of the opening distortion, from a later portion of the same Runway export. No repeated impact, chair insert or visible creature. Asset: `i_lab_aftermath.mp4`.

**Ellis**

> That bench was bolted to the floor.

**Beat 3.** CUT TO: A wall intercom beside the sealed corridor door. It stands in for the unseen person at the other end. Asset: `inserts/intercom.png`.

**Ellis**

> I saw the warning. I just needed you to open the door.

**Beat 4.** HOLD the same image. 

**YOU**

> You lied to me.

**Beat 5.** CUT TO: Close insert of the quarantine terminal. The game supplies legible records as system text. Asset: `inserts/lab-terminal.png`.

**SYSTEM . CC-2**

```text
Sealed transfer to shuttle available.
```

**Beat 6.** CUT TO: The locking clamp, continuous gasket and steady green light. The capsule is opaque and sealed. Asset: `inserts/capsule-seal.png`.

**YOU**

> CC-2 has its own air. Can you get inside?

**Beat 7.** CUT TO: A wall intercom beside the sealed corridor door. It stands in for the unseen person at the other end. Asset: `inserts/intercom.png`.

**Ellis**

> You'd have the only release. Don't send me off in that thing alone.

**PLAYER CHOICE . select one:**

- **Get in CC-2. I'm staying with you.** → **05D INT. SHUTTLE CARGO . SEALED TRANSFER** (`capsule`).
- **I don't believe you anymore. I'm leaving.** → **05C INT. SHUTTLE . LEAVING AFTER THE WARNING** (`leave`).

---

## 05C. INT. SHUTTLE . LEAVING AFTER THE WARNING

**Scene ID:** `leave`

**Dramatic purpose:** The player now knowingly rejects a possible rescue. Ellis asks for a smaller mercy: keep the connection.

**Beat 1.** CUT TO: The shuttle cockpit and departure footage. Occupants remain outside the frame. Asset: `e_shuttle.mp4`.

**YOU**

> I wanted to believe you. I can't risk it, Ellis.

**Beat 2.** CUT TO: An empty shuttle passenger seat, an open harness, Ellis's packed bag and the blue mug. No portrait or personal photograph. Asset: `inserts/empty-seat.png`.

**Ellis**

> Okay. Leave the channel open.

**Beat 3.** CUT TO: Close insert of the shuttle radio controls and speaker. Asset: `inserts/shuttle-radio.png`.

**SYSTEM . Radio**

```text
Signal lost.
```

**CONTINUE / ACTION:**

- **CONTINUE** → **06C EXT. HALDEN STATION / INT. SHUTTLE . AFTER THE LAST TRANSMISSION** (`survivor_leave`).

---

## 06C. EXT. HALDEN STATION / INT. SHUTTLE . AFTER THE LAST TRANSMISSION

**Scene ID:** `survivor_leave`

**Dramatic purpose:** The player leaves the radio on after leaving Ellis behind. Same survival result as the early exit, different moral and emotional context.

**Ending designation:** 1 of 3 . SURVIVOR. The label, credits and replay appear only after the player reads the final beat and presses CONTINUE. The final image and line remain visible underneath; no blackout or forced delay is added.

**Beat 1.** CUT TO: Exterior of Halden Station. At endings, play the existing destruction video. Asset: `f_exterior.mp4`.

**SYSTEM . Halden**

```text
Station destroyed. No life signs.
```

**Beat 2.** CUT TO: An empty shuttle passenger seat, an open harness, Ellis's packed bag and the blue mug. No portrait or personal photograph. Asset: `inserts/empty-seat.png`.

*NARRATION:* You leave the radio on.

**CONTINUE / ACTION:**

- **Play again** → **02 INT. SERVICE CORRIDOR . PRESENT** (`corridor`).

---

## 05D. INT. SHUTTLE CARGO . SEALED TRANSFER

**Scene ID:** `capsule`

**Dramatic purpose:** The objective changes from escaping a room to trusting a barrier. A human question about the lock precedes a physical test of that barrier.

**Beat 1.** CUT TO: The opaque containment capsule and its transfer hardware. The person inside is never shown. Asset: `d_capsule.mp4`.

**SYSTEM . RNWAY / CC-2**

```text
Aboard. Seal holding.
```

**Beat 2.** CUT TO: The locking clamp, continuous gasket and steady green light. The capsule is opaque and sealed. Asset: `inserts/capsule-seal.png`.

**Ellis**

> It's shut. {name}, I can't open it from here.

**Beat 3.** HOLD the same image. 

**YOU**

> The seal's holding. Keep talking to me.

**Beat 4 . FULL-FRAME PAYOFF.** Cut to `h_capsule.mp4`. The sealed capsule end plate flexes under pressure. The clamp and gasket stay shut; the green light remains on. Clear the dialogue and system panel. Play the clip once with its embedded audio; pause and mute the underlying shot.

**CONTINUE / ACTION:**

- **[Launch with CC-2 sealed.]** → **06D INT. SHUTTLE . IN TRANSIT** (`rescued_departure`).

---

## 06D. INT. SHUTTLE . IN TRANSIT

**Scene ID:** `rescued_departure`

**Dramatic purpose:** Clear procedural radio traffic gives way to Ellis asking whether the personal connection is still there. The player answers directly.

**Beat 1.** CUT TO: The shuttle cockpit and departure footage. Occupants remain outside the frame. Asset: `e_shuttle.mp4`.

**YOU**

> Medical, RNWAY shuttle. Two aboard. Possible exposure. One sealed in CC-2.

**Beat 2.** CUT TO: Close insert of the shuttle radio controls and speaker. Asset: `inserts/shuttle-radio.png`.

**Medical**

> Bay four. Keep the capsule sealed. We're coming to you.

**Beat 3.** CUT TO: The locking clamp, continuous gasket and steady green light. The capsule is opaque and sealed. Asset: `inserts/capsule-seal.png`.

**Ellis**

> {name}? Stay on till they get here. Please.

**Beat 4.** CUT TO: Close insert of the shuttle radio controls and speaker. Asset: `inserts/shuttle-radio.png`.

**YOU**

> I'm here.

**CONTINUE / ACTION:**

- **CONTINUE** → **07D EXT. HALDEN STATION / INT. MEDICAL ISOLATION . LATER** (`rescue`).

---

## 07D. EXT. HALDEN STATION / INT. MEDICAL ISOLATION . LATER

**Scene ID:** `rescue`

**Dramatic purpose:** Return to the opening promise in an ordinary request to wait. Survival is secured; the relationship is the last beat.

**Ending designation:** 3 of 3 . RESCUE. The label, credits and replay appear only after the player reads the final beat and presses CONTINUE. The final image and line remain visible underneath; no blackout or forced delay is added.

**Beat 1.** CUT TO: Exterior of Halden Station. At endings, play the existing destruction video. Asset: `f_exterior.mp4`.

**SYSTEM . Halden**

```text
Station destroyed. Shuttle clear.
```

**Beat 2.** CUT TO: The sealed capsule beyond an isolation partition. An empty waiting chair on the observer side. The room is unstaffed in the image. Asset: `inserts/isolation-bay.png`.

**Ellis**

> They've locked the bay. You'll wait outside, won't you?

**Beat 3.** HOLD the same image. 

**YOU**

> Of course.

**CONTINUE / ACTION:**

- **Play again** → **02 INT. SERVICE CORRIDOR . PRESENT** (`corridor`).

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
4. Does the informed-abandonment branch feel different from leaving before reading the warning?
5. Does the open-door branch communicate both a compassionate impulse and the cost of Ellis's concealment?
6. Is sealed rescue too obviously the correct answer once the transfer appears? Propose a cost or ambiguity separately; do not quietly rewrite the current mechanics.
7. Which necessary off-screen actions would become confusing if their narration were deleted? Which captions can disappear because the image already carries them?
8. Do the three final images and final lines leave distinct feelings? Identify any line that is trying too hard to be quotable.
9. Can the connection between infection and environmental movement remain unsettling without additional monster lore?
10. Give a line-level pass first. Put all new scenes, facts, sounds, deaths, loops and mechanics in a clearly separate proposal.

The preserved prior version is **LAST SHUTTLE . BASELINE V1**, under `versions/last-shuttle-baseline-v1-2026-09-14/`. Do not alter it.
