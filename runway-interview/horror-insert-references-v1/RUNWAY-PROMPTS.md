# LAST SHUTTLE — two horror inserts

> RETIRED CREATIVE DIRECTION: do not spend Runway credits on this pack. The user requested major, consequential science-fiction horror sequences. See `../structural-horror-direction-v2/CREATIVE-TREATMENT.md`. These files are retained only as development history.

Four reference PNGs made with the built-in OpenAI image generator. They depict the start and intended end of TWO short shots, not four new scenes. The live game, dialogue and baseline are unchanged. These are production assets awaiting Runway animation and selection.

## How to use the frames

Use the matching START PNG as the image-to-video input. If the selected Runway workflow exposes an end-frame input, use the matching END PNG there. Otherwise, the END PNG is the visual target for judging the output; do not upload a combined contact sheet or expect a single-image workflow to use both frames. Each PNG is a complete 16:9 frame.

Use a short generation; five seconds is sufficient if that duration is offered. Precise timing is an editing decision, not a guarantee from the prompt. Keep only the useful two to four seconds within an existing dialogue or warning beat. Keep the camera fixed so an approaching force or abrupt mechanical movement is legible. Do not extend the game to accommodate unused video.

The prompts use ordinary motion descriptions rather than asking Runway to invent horror imagery. Runway's [image-to-video guide](https://help.runwayml.com/hc/en-us/articles/48324313115155-Image-to-Video-Prompting-Guide) recommends letting the input establish the image and using text for motion. Its [Gen-4 guide](https://help.runwayml.com/hc/en-us/articles/39789879462419-Gen-4-Video-Prompting-Guide) favors simple, positive instructions over negative prompts. Neither images nor prompts guarantee perfect continuity; judge the movement and geometry before integrating a take.

## 01 — Corridor pressure

**Input:** `01-corridor-start.png`  
**End target:** `01-corridor-end.png`  
**Suggested export:** `i_corridor_pressure.mp4`

### Paste this motion prompt

```text
Locked-off camera, continuous shot. A brief still hold. The three large rectangular ceiling panels buckle sharply downward in quick succession from the far end toward the camera. The nearest panel snaps last into a shallow angular crease, releasing a light dust fall. The steel stays rigid, with bolted edges attached. The floor, doors, pipes and intercom stay fixed. Lighting stays steady. Hold on the creased panels as the dust settles.
```

### Placement and purpose

Replace the existing intercom still on the corridor's final line: “My bag's already on your shuttle, {name}. Don't leave without me.” Scope it to this corridor beat, not every intercom shot elsewhere in the story. The event happens in the upper image, above the reading area. Preserve the line, the existing two choices and normal skip controls. Add no dialogue step or mandatory viewing delay.

The corridor remains passable. The event makes the station physically unsafe without establishing whether damage or the unseen infection caused it. It must not reveal something behind a panel, open the lab, or obstruct the rescue route. The final frame holds instead of looping or resetting the damage.

### Choose a take where

- The movement clearly travels from distant panels toward the viewer, with the nearest panel moving last and fastest.
- The panels crease as sheet metal, remain attached, and stop moving. They do not inflate, breathe, melt, grow, or become a body shape.
- The nearest snap is visible at ordinary playback speed; its force comes from acceleration, not a long slow transformation.

If the travelling sequence fails, simplify once using the SAME start image:

```text
Locked-off camera, continuous shot. After a brief still hold, the nearest large rectangular ceiling panel snaps sharply downward into a shallow angular crease. Its bolted perimeter stays attached. A little dust falls and settles. Every other surface remains fixed and the lighting stays steady. Hold on the bent steel.
```

For this fallback, the supplied end target is a material reference only: the farther panels should stay flat. A crisp single event is more useful than a visibly artificial travelling wave. The corridor is the more ambitious of the two generations.

## 02 — Override guard

**Input:** `02-guard-start.png`  
**End target:** `02-guard-end.png`  
**Suggested export:** `j_override_guard.mp4`

### Paste this motion prompt

```text
Locked-off camera, continuous shot. The open transparent protective cover remains still briefly, then snaps downward around its fixed top hinge in one fast rigid motion. It stops closed over the untouched metal lever and settles. The transparent cover stays intact and keeps its shape. The background door remains shut. The indicator remains steady amber. The surrounding corridor stays still and empty.
```

### Placement and purpose

Replace the `door-control` still behind the existing QUARANTINE INTERLOCK warning in the lab-door scene. Keep all three system lines and the following Alex line, “I know what the light means. Just open it.” Keep both choices. This shot uses the existing reading time; it does not become another payoff button or scene.

The closed distant door holds the eye while the foreground guard supplies the sudden movement. The lever must remain in its resting position. The cover merely closes; it does not lock, disable the control, trigger an override, or require a new puzzle. The lab stays sealed until the player's existing choice.

### Choose a take where

- One rigid cover rotates around one fixed hinge. It does not stretch, split, change size or acquire additional hinges.
- The lever stays untouched and is still visible through the closed cover.
- The closure is abrupt enough to register without a camera lunge or an exaggerated effect.

This is the simpler first generation to try: one articulated object, one action. The faint marks on the reference cover are wear and scratches; reject a take that turns them into shattering glass.

## Editing rules for both shots

- Keep the existing scene graph and dialogue. These replace still images; they are not permission to add extra exposition, a timer, a new hazard mechanic, or a new ending.
- Keep the coffee memory, empty-seat endings and final isolation image quiet. The two existing vent/capsule payoff clips stay as they are.
- The useful shape is a short still hold, an abrupt event, then a brief view of its consequence. Trim excess head/tail and slow transformation footage rather than filling time with more text.
- If an export has usable mechanical audio, retain it. Do not layer another scare sting, synthesized score or voice over it. The reference images and these motion prompts do not promise an audio track.
- Preserve ordinary lighting and empty architecture. Reject added characters, silhouettes, anatomical forms, glowing particles, organic growth or a revealed creature. These are selection criteria, not a list to paste into the motion prompt.
- Test the chosen take in the game's actual framing before keeping it. The scare should read above the dialogue area. A failed take should not replace a strong existing still merely because it moves.

Generation provenance for the reference PNGs is in `image-generation-prompts.json`. The retained game snapshot is `versions/last-shuttle-baseline-v1-2026-09-14/` and is untouched.
