# Last Shuttle: interview demo

Aim for two minutes. Keep the game open before the call. Click the title screen to start the compression clip with sound. All dialogue waits for you, including the memory; tap the picture or press Space. The pause icon stops video if you want to talk over it. Subtitles appear whole; a single input advances. Turn sound on before sharing and keep it quiet enough to speak over.

## Opening, 15 seconds

“I made a playable sci-fi story with Runway footage. Your friend is trapped on an infected station. You can leave Ellis, open the lab door, or investigate a safer way out. I wanted to turn generated imagery into something an audience participates in.”

## Play, about 75 seconds

Watch the compression hook → enter your name → I'm here. → click through the coffee memory and call → I'm not breaking that promise. I'm coming back. → Why didn't you tell me about the lockdown? → Get in CC-2. I'm staying with you. → Launch with CC-2 sealed.

Move through the individual dialogue beats between decisions. After the final “Of course,” press CONTINUE once more to show the ending and credits. Let the door, lab feed, and capsule shots breathe for a few seconds. You can talk over a scene without losing a line.

At the incident log: “This is the key choice. The information changes what you can do. The same small set of environments supports three endings.”

At the capsule: “The generated shot already had the capsule sealed and moving on a rail, so I wrote the transfer around that. I adapted the story to the footage instead of describing an action the viewer couldn't see.”

## Educator and content lead payoff, 30 seconds

“The tutorial would start with this playable result, then work backward: one reference image for the visual language, a short shot list, animation, and branching interaction. I'd show a mismatch and the decision that fixed it, not just a sequence of perfect outputs.”

“For YouTube, I'd make one complete build tutorial, cut the strongest decision into a Short, and invite viewers to share which ending they found. I'd judge the lesson by whether viewers can reproduce the workflow, alongside retention and clicks through to the game.”

Suggested video title: “I Made a Playable Sci-Fi Story With AI Video.”

## If asked how it was made

“Runway supplied the original motion shots. OpenAI generated the additional stills and exact references for environmental payoff animations. I directed the concept, selected the footage, and shaped the experience using AI coding tools.”

The interface, branching logic and text run in the browser. Each video uses its original embedded audio; no synthetic score is added. The game makes no live generation calls. Do not claim you manually coded everything or quote generation costs or model settings you have not verified in your Runway history.

## Backup

Use the local game at http://localhost:3001/last-shuttle if the public site is not available. Start it with `npm run sites:build` followed by `npm run sites:start -- --port 3001` from the personal-website folder. Keep a short screen recording of the rescue route available before the interview, using your normal recording setup.

## Visual direction

No people, faces, hands, silhouettes or designed creature. Ellis stays unseen; two coffee mugs, a packed bag, an empty seat and the radio establish the relationship. The memory has a warm frame treatment and an interrupted match cut; present-day scenes use the existing full-frame visual language. Five original motion environments, the supplied capsule and shuttle-vent payoffs, the new compression export (opening and later aftermath), and nine supporting stills are integrated. The old moving-chair clip is no longer used. Dialogue, narration and system records share one reading area with different text styles. No lab cable beat is used. See PAYOFF-SHOTS.md for the integrated payoff assets.


## Restored story

The fuller pre-trim narrative is restored, including the shared plans, promise, access problem, fear, concealed infection, rescue exchange, and different abandonment responses. The lab cable insert remains removed. The two supplied payoff videos and native audio remain integrated.


## Current script

Use `LAST-SHUTTLE-SCREENPLAY-v7.md` for the full dialogue, directions and branches, and `NARRATIVE-REVIEW-v3.md` for the selective response to external feedback. The two added player responses give the lie and the open-door rescue an emotional reply. All four routes and three ending categories remain.

## Final visual addition

Use `final-visual-pack-v5/README.md` and its matched coffee frames for the only proposed remaining Runway render. The current live cut uses the end image for the brief memory interruption. The supplied coffee warp video is integrated, starting at source second 1 with a slow 4.5% push-in and its embedded audio.


## Coffee video drop-in

The matched reference images and prompt in final-visual-pack-v5 still apply. Save the inspected, trimmed final clip at public/last-shuttle/j_memory_bridge.mp4. The next build and publish select it automatically. No component edit is required. The supplied clip is now present; the interrupted-memory still remains the error fallback. If the video cannot play, the image remains the fallback.
