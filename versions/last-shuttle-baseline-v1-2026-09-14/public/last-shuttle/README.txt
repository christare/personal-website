LAST SHUTTLE

Six integrated Runway videos, each with a PNG poster and fallback:
  a_corridor, b_labdoor, c_lab, d_capsule, e_shuttle, f_exterior

The title uses the intact exterior still. The exterior video plays at endings.
Dialogue advances manually with NEXT, a scene click, Space, or Enter.
Click a typing radio line once to reveal it, then advance.

Development: npm run dev
Production rehearsal: npm run build, then npm run start -- -p 3001
Route: /last-shuttle
Interview walkthrough: runway-interview/INTERVIEW-DEMO.md

Source: components/LastShuttle.tsx
Styles: app/last-shuttle/last-shuttle.css

Nine OpenAI cutaways are preserved in inserts/. The tight cut uses only shared-coffee, empty-seat, and isolation-bay. No people are shown.
Three integrated environmental payoff references: g_feed.png, h_capsule.png, h_cabin.png.
Same-basename MP4 exports take precedence after rebuilding.
Animation prompts: runway-interview/PAYOFF-SHOTS.md
