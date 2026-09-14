# LAST SHUTTLE
## Complete branching screenplay — Dialogue Pass V2

September 14, 2026 · Creative direction: Chris Jereza

This is the complete current script, exported from the game after the dialogue pass. Dialogue, captions, system records, choice labels and destinations below match the implementation. Direction paragraphs explain the existing images and dramatic purpose; they are not additional on-screen lines.

### Review brief

Read this as a short film with consequential forks. Evaluate scene necessity, natural speech, subtext, escalation, emotional causality and payoff as rigorously as a linear screenplay. Do not excuse weak writing because it is interactive. Separate line edits from structural proposals. The current pass preserves every scene, beat slot, shot assignment, branch destination and ending from BASELINE V1. Only words, text styling, and a two-second corridor trim changed.

### Fixed story and production rules

- Halden Station is being destroyed. The player has the last shuttle. Alex, a friend and crewmate, is trapped in Lab 3.
- Alex is infected and has concealed the result out of fear of abandonment. The infection is airborne. Opening the laboratory and sharing cabin air exposes both people.
- A sealed capsule with independent air can travel through an enclosed rail to the shuttle while the lab door remains shut. The seal holds on the rescue route.
- A medical carrier accepts a sealed transfer but refuses docking when both occupants are exposed. No cure, confirmed death by infection, countdown, new escape route, or monster lore is established.
- No people, faces, hands, silhouettes, anatomy, or designed creature are shown. Alex's identity is deliberately open.
- The two new payoff videos are the sealed capsule flex and the shuttle vent. The lab uses the original camera/chair footage.

### Presentation and reading conventions

**ALEX / MEDICAL CARRIER** = in-world speech presented as radio subtitles. **YOU** = the player's spoken line. *NARRATION* = an authored action or observation, not a spoken line. **SYSTEM** = literal interface information; it stays factual.

Choice sentences express the player's intended response. Square brackets mark silent actions. Choice text is not a newly recorded voice line; its selection causes the stated next scene. Small explanatory text makes the consequence legible. Buttons labeled CONTINUE, BEGIN and Play again are navigation rather than additional moral decisions.

There are currently no performed dialogue recordings. The videos retain their own embedded audio. The script's performance notes guide a reading or future voice direction, not audio already added to the game. Only the visible clip plays sound; there is no synthetic score. Stills do not introduce new sound.

All reading stays in one bottom area. Radio speech is upright with a warm speaker label; player speech has a cool YOU label; narration is italic; system records are monospaced. Choices use sentence case. The memory has a warm inset frame and explicit FOUR HOURS EARLIER label; present scenes are labeled NOW.

The player enters a first name, substituted for **{name}**. Dialogue advances manually; a click first finishes a typing line and a subsequent click advances. Same-shot beats hold the same media layer rather than restarting it. Videos play once and hold their final frame. Payoffs clear dialogue.

### Complete route map

```text
00 TITLE → 01 MEMORY → 02 CORRIDOR
  ├─ Leave silently → 03A ALONE → 04A SURVIVOR (uninformed abandonment)
  └─ Return → 03B DOOR
       ├─ Open the door → 04B RELEASED → 05B CONTAMINATION
       └─ Read the log → 04C REPORT
            ├─ Leave → 05C LEAVE → 06C SURVIVOR (informed abandonment)
            └─ Use capsule → 05D CAPSULE → 06D DEPARTURE → 07D RESCUE
```

Four playable routes, three ending categories. There is no in-story undo or loop. Play again returns to 02 CORRIDOR; Restart returns to 00 TITLE.

---

## 00. TITLE / EXT. HALDEN STATION — PRESENT

**Scene ID:** `start`

**Dramatic purpose:** Orient the player without making Alex explain the premise.

**Beat 1.** CUT TO: Exterior of Halden Station. On the title screen only, hold the intact PNG; at endings play the existing destruction video. Asset: `f_exterior.mp4`.

*NARRATION:* The station is being destroyed. You have the last shuttle.

**Beat 2.** HOLD the same image. 

*NARRATION:* Alex, your friend and crewmate, is still inside.

**CONTINUE / ACTION:**

- **BEGIN** → **01 INT. STATION GALLEY / SHUTTLE — FOUR HOURS EARLIER** (`memory`).

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

**CONTINUE / ACTION:**

- **[Answer Alex.]** → **02 INT. SERVICE CORRIDOR — PRESENT** (`corridor`).

---

## 02. INT. SERVICE CORRIDOR — PRESENT

**Scene ID:** `corridor`

**Dramatic purpose:** Alex tests whether the player is still there, names a physical obstacle, then invokes the promise. The player may avoid learning more.

**Beat 1.** CUT TO: Moving shot through the empty service corridor. The first two seconds of the source clip have been removed; picture and embedded audio begin together. Asset: `a_corridor.mp4`.

**ALEX**

> {name}? You're still here, right?

**Beat 2.** CUT TO: A wall intercom beside the sealed corridor door. It stands in for the unseen person at the other end. Asset: `inserts/intercom.png`.

**ALEX**

> I'm locked in the lab. My keycard keeps flashing red.

**Beat 3.** HOLD the same image. 

**ALEX**

> You promised you'd wait. Please. I'm still in here.

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

> Something's moving in here. Please come back. I need you.

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

**Ending designation:** 1 of 3 — SURVIVOR. This label is shown on entering the ending scene; credits and replay appear after its final beat.

**Beat 1.** CUT TO: Exterior of Halden Station. On the title screen only, hold the intact PNG; at endings play the existing destruction video. Asset: `f_exterior.mp4`.

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

> I can hear you. Please, just open the door.

**Beat 2.** CUT TO: Close insert of the guarded override lever and warning light. Untouched hardware makes the impending action legible. Asset: `inserts/door-control.png`.

**SYSTEM — QUARANTINE INTERLOCK**

```text
LAB 3 SEALED
OVERRIDE RELEASES LAB AIR
INCIDENT LOG AVAILABLE
```

**Beat 3.** CUT TO: A wall intercom beside the sealed corridor door. It stands in for the unseen person at the other end. Asset: `inserts/intercom.png`.

**ALEX**

> I know what the light means. I don't want to die in here.

**PLAYER CHOICE — select one:**

- **I'm getting you out.** — Open the door. Release the lab air. → **04B INT. SHUTTLE — ALEX BROUGHT ABOARD** (`released`).
- **Wait. Let me check what happened.** — Read the incident log. Keep the door sealed. → **04C LAB 3 TERMINAL / REMOTE FEED — PRESENT** (`report`).

---

## 04B. INT. SHUTTLE — ALEX BROUGHT ABOARD

**Scene ID:** `released`

**Dramatic purpose:** Alex tries to postpone an explanation. The air warning exposes what that postponement has cost both occupants.

**Beat 1.** CUT TO: The shuttle cockpit and departure footage. Occupants remain outside the frame. Asset: `e_shuttle.mp4`.

*NARRATION:* You get Alex aboard and close the hatch.

**Beat 2.** CUT TO: Close insert of the shuttle radio controls and speaker. Asset: `inserts/shuttle-radio.png`.

**ALEX · SEAT 2**

> Just get us out of here. I'll explain. I promise.

**Beat 3.** CUT TO: Close insert of the damp shared-air grille and red indicator. Asset: `inserts/cabin-air.png`.

**SYSTEM — CABIN AIR**

```text
AIRBORNE ORGANISM DETECTED
EXPOSURE: BOTH OCCUPANTS
```

**Beat 4 — FULL-FRAME PAYOFF.** Cut to `h_cabin.mp4`. The damp grille flexes and droplets move toward the lens. The threat remains unseen. Clear the dialogue and system panel. Play the clip once with its embedded audio; pause and mute the underlying shot.

**CONTINUE / ACTION:**

- **[Call for medical help.]** → **05B EXT. HALDEN STATION / INT. SHUTTLE — DOCKING REFUSED** (`contamination`).

---

## 05B. EXT. HALDEN STATION / INT. SHUTTLE — DOCKING REFUSED

**Scene ID:** `contamination`

**Dramatic purpose:** The station is gone, the carrier will not admit them, and the player cannot undo exposure by holding their breath. The script does not confirm a death.

**Ending designation:** 2 of 3 — CONTAMINATION. This label is shown on entering the ending scene; credits and replay appear after its final beat.

**Beat 1.** CUT TO: Exterior of Halden Station. On the title screen only, hold the intact PNG; at endings play the existing destruction video. Asset: `f_exterior.mp4`.

**MEDICAL CARRIER**

> Stay where you are. We can't let you dock.

**Beat 2.** CUT TO: Close insert of the damp shared-air grille and red indicator. Asset: `inserts/cabin-air.png`.

*NARRATION:* You hold your breath. It doesn't help.

**CONTINUE / ACTION:**

- **Play again** → **02 INT. SERVICE CORRIDOR — PRESENT** (`corridor`).

---

## 04C. LAB 3 TERMINAL / REMOTE FEED — PRESENT

**Scene ID:** `report`

**Dramatic purpose:** Evidence changes the problem from a locked door to infection. Alex admits concealment. A sealed transfer offers a way to help without sharing air.

**Beat 1.** CUT TO: Close insert of the quarantine terminal. The game supplies legible records as system text. Asset: `inserts/lab-terminal.png`.

**SYSTEM — INCIDENT LOG**

```text
ALEX: INFECTED
TRANSMISSION: AIRBORNE
DO NOT OPEN THE LAB
```

**Beat 2.** CUT TO: The existing remote laboratory camera shot, including the chair movement. No cable insert and no visible creature. Asset: `c_lab.mp4`.

**ALEX**

> Can you see the room? Tell me you're seeing this.

**Beat 3.** CUT TO: A wall intercom beside the sealed corridor door. It stands in for the unseen person at the other end. Asset: `inserts/intercom.png`.

**ALEX**

> I saw the result. I thought you'd leave if I told you.

**Beat 4.** CUT TO: Close insert of the quarantine terminal. The game supplies legible records as system text. Asset: `inserts/lab-terminal.png`.

**SYSTEM — SEALED TRANSFER**

```text
CC-2: INDEPENDENT AIR SUPPLY
ENCLOSED RAIL TO SHUTTLE: ONLINE
LAB DOOR REMAINS CLOSED
```

**Beat 5.** CUT TO: The locking clamp, continuous gasket and steady green light. The capsule is opaque and sealed. Asset: `inserts/capsule-seal.png`.

**YOU**

> Can you reach that capsule?

**Beat 6.** CUT TO: A wall intercom beside the sealed corridor door. It stands in for the unseen person at the other end. Asset: `inserts/intercom.png`.

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

**Ending designation:** 1 of 3 — SURVIVOR. This label is shown on entering the ending scene; credits and replay appear after its final beat.

**Beat 1.** CUT TO: Exterior of Halden Station. On the title screen only, hold the intact PNG; at endings play the existing destruction video. Asset: `f_exterior.mp4`.

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

**Ending designation:** 3 of 3 — RESCUE. This label is shown on entering the ending scene; credits and replay appear after its final beat.

**Beat 1.** CUT TO: Exterior of Halden Station. On the title screen only, hold the intact PNG; at endings play the existing destruction video. Asset: `f_exterior.mp4`.

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
