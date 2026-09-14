# LAST SHUTTLE — final visual pass

Only one new Runway render is needed for the proposed final addition. The game already runs with the compression hook, lab aftermath, shuttle contamination and capsule pressure clips. This pack adds the coffee-memory bridge; it does not replace any of those videos or change the branching plot.

## 1. The shot: two cups, a room that loses its depth

- **Start:** `01-coffee-start.png`. The existing warm galley and two mugs, reused without regeneration.
- **End:** `02-coffee-end.png`. Same foreground and camera; the deep galley has compressed into a shallow stack of steel frames. Created with the built-in OpenAI image tool from the existing coffee and compression references.
- The cups stay fixed. The room moves. This is a subjective interruption of the memory, not evidence of an infection in the coffee or a new explanation of the creature.

Use Runway **Animate Frames / Animate with Keyframes**, with the two supplied images in its start/end inputs. Runway documents this app for start/end control; ordinary Gen-4.5 Image to Video uses an initial image and should not be described as guaranteeing this end frame. [Runway's Apps guide](https://help.runwayml.com/hc/en-us/articles/45570040112531-Creating-with-Apps).

Choose 16:9 and the shortest duration the app offers that allows a brief hold, one compression and a settle. The final game edit should keep roughly 1–2 seconds of meaningful motion, not a long setup. Review the displayed app cost before generating; this pack makes no price claim.

**Exact motion prompt:**

> The camera is completely locked. The two mugs, table, towel and chairs remain perfectly fixed. The empty galley behind them violently collapses in depth: rigid steel wall frames fold and slide together like a telescoping industrial bellows, ending in the shallow compressed geometry of the final frame. A short still hold, one abrupt compression, then stillness. Physical steel motion, crisp mass and weight. Continuous shot. Calm coffee surfaces. The room remains empty throughout.

If the app has only frame inputs and no motion-prompt field, use the paired frames there. If you need the prompt as the principal control, use the START image in Gen-4.5 Image to Video; keep the END image as a visual acceptance reference rather than claiming it is a supported second image input. These are alternatives, not instructions to generate both.

Accept the take only if the two mugs remain recognizable and stationary, the background physically compresses, and the camera stays stable. No person, face, hand, creature, blood, new object or magical glow should appear. A clean hard cut is better than spending more credits on a poor morph.

## 2. Placement and edit

The current order is: compression hook → name entry with “Are you there?” held on screen → coffee invitation → packed bag / promise → interrupted coffee image → NOW / service corridor → first moral choice.

The new video replaces ONLY the short interrupted-coffee image between the promise and NOW. Start close to the motion; cut to the corridor as the steel settles. Clear subtitles during this interruption. Keep both memory lines and the bag image. Do not add a new dialogue step, a new decision or a lingering end hold.

The current game uses a single dark 0.48-second cut to the supplied end image. It is an image edit, not a completed Runway animation. No intermittent white strobe or repeating flash is used.

Save the export as:

`runway-interview/runway-exports-video-sept14/coffee-memory-fold.mp4`

After inspecting and trimming the actual take, the game is ready to accept it as `public/last-shuttle/j_memory_bridge.mp4`. Add `memoryBridge="/last-shuttle/j_memory_bridge.mp4"` to the existing `<LastShuttle>` call in `app/last-shuttle/page.tsx`. The integration point already pauses with the intro, allows skipping, and advances on the clip's actual end. It makes no missing-file request before that prop is supplied. Do not point the game at a file that has not been inspected and copied.

Retain the export's embedded sound when usable. If it is silent, keep the hard cut silent instead of stacking an unrelated scare sting. Do not reverse the existing audio to repair a video edit.

## 3. Treatments already implemented

- **Opening:** immediate compression excerpt; no fading title before the impact. After the impact, the caller's line stays visible while the player enters a name. Replay opening with sound preserves the name.
- **Memory:** warm light, a different frame treatment, a clear FOUR HOURS EARLIER marker and the single damaged-memory interruption. The present returns under NOW, in colder steel tones.
- **Dialogue:** whole subtitles over the scene, restrained speaker labels, italic narration and separate monospaced system records. No caption cards or character-by-character typing.
- **Choices:** compact response list, pointer/touch, number shortcuts and arrow-key focus. Choices remain untimed and retain small consequence descriptions.
- **Progression:** modest shot grading. Quarantine gets harder contrast; exposure loses warmth and gains a restrained red cast; abandonment loses color; medical isolation recovers softer neutral light. No constant distortion over every shot.
- **Endings:** the final line stays first. The result and credits appear only on the next input, over the final image. No early moral grade, score screen or automatic replay.
- **Audio:** one persistent video player and direct tap-triggered sound activation. All nine active MP4 files contain H.264 video and AAC audio. Only the current clip plays sound; stills are silent. iOS can require a user gesture, so use Enable audio or Replay opening with sound. [WebKit's playback policy](https://webkit.org/blog/6784/new-video-policies-for-ios/).

## 4. Finish and ship

1. Play the currently published game. All four routes and the existing payoffs are retained.
2. Generate just the coffee bridge from this pair. Save it at the export path above and have the actual take inspected and trimmed before integration.
3. After integration, check the opening once on your actual phone: tap Replay opening with sound, enter a name, and confirm the corridor and a payoff remain audible. A responsive desktop browser is not an iPhone Safari audio test.
4. For an interview demo, use return → investigate → CC-2 for the rescue, then return → open Lab 3 for the contamination contrast. Pause during the introduction if you want to explain a shot.

The previous deployed game is preserved at source commit `b1bf4bf32982308a561cb5747ba0743499db2e3f`. BASELINE V1 and the V3/V4 screenplay files remain untouched. `LAST-SHUTTLE-SCREENPLAY-v5.md` contains the full current script and all branches.
