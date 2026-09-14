import fs from 'node:fs';
import ts from 'typescript';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
const root=fileURLToPath(new URL('../', import.meta.url)).replace(/\/$/, '');
const text=fs.readFileSync(root+'/components/LastShuttle.tsx','utf8');
const graph=vm.runInNewContext(ts.transpile(text.slice(text.indexOf('const ELLIS ='),text.indexOf('const credits =')))+';scenes');
const old=JSON.parse(fs.readFileSync(root+'/runway-interview/opening-cut-v4.json','utf8'));
for (const [id, scene] of Object.entries(graph)) {
 const before=old[id];
 if(JSON.stringify(scene.choices.map(c=>c.to))!==JSON.stringify(before.choices.map(c=>c.to))) throw Error('Changed branch '+id);
 if(JSON.stringify(scene.ending)!==JSON.stringify(before.ending)) throw Error('Changed ending '+id);
 if(JSON.stringify(scene.beats.map(b=>[b.kind,b.shot,b.id]))!==JSON.stringify(before.beats.map(b=>[b.kind,b.shot,b.id]))) throw Error('Changed story beat '+id);
}
const shots={
 compression:['i_compression.mp4','Empty laboratory architecture distorts violently. Source seconds 2.0–4.8; action begins inside the first second of this edit. The image remains an unexplained event, not proof that Ellis has died.'],
 A:['a_corridor.mp4','Moving shot through the empty service corridor. The first two seconds of the source clip have been removed; picture and embedded audio begin together.'],
 B:['b_labdoor.mp4','The sealed laboratory door. Existing industrial warning lighting; no one is visible.'],
 C:['i_lab_aftermath.mp4','The aftermath of the opening distortion, from a later portion of the same Runway export. No repeated impact, chair insert or visible creature.'],
 D:['d_capsule.mp4','The opaque containment capsule and its transfer hardware. The person inside is never shown.'],
 E:['e_shuttle.mp4','The shuttle cockpit and departure footage. Occupants remain outside the frame.'],
 F:['f_exterior.mp4','Exterior of Halden Station. At endings, play the existing destruction video.'],
 memory:['inserts/shared-coffee.png','Two used mugs in the empty galley. A warm, inset frame identifies this as a memory.'],
 intercom:['inserts/intercom.png','A wall intercom beside the sealed corridor door. It stands in for the unseen person at the other end.'],
 'door-control':['inserts/door-control.png','Close insert of the guarded override lever and warning light. Untouched hardware makes the impending action legible.'],
 'empty-seat':['inserts/empty-seat.png',"An empty shuttle passenger seat, an open harness, Ellis's packed bag and the blue mug. No portrait or personal photograph."],
 'lab-terminal':['inserts/lab-terminal.png','Close insert of the quarantine terminal. The game supplies legible records as system text.'],
 'capsule-seal':['inserts/capsule-seal.png','The locking clamp, continuous gasket and steady green light. The capsule is opaque and sealed.'],
 'cabin-air':['inserts/cabin-air.png','Close insert of the damp shared-air grille and red indicator.'],
 'shuttle-radio':['inserts/shuttle-radio.png','Close insert of the shuttle radio controls and speaker.'],
 'medical-bay':['inserts/isolation-bay.png','The sealed capsule beyond an isolation partition. An empty waiting chair on the observer side. The room is unstaffed in the image.']
};
const info={
 start:['00','COLD OPEN / INT. LAB 3 — PRESENT','An impossible structural movement establishes the threat before setup. Ellis calls after the impact. Then the frame holds for the title, premise and name entry.'],
 memory:['01','INT. STATION GALLEY / SHUTTLE — FOUR HOURS EARLIER','Give the player a mundane shared future and a promise that later choices can honor or break. Keep this ordinary, not portentous.'],
 corridor:['02','INT. SERVICE CORRIDOR — PRESENT','After the cold-open call, Ellis names a physical obstacle, then invokes the bag already waiting aboard. The tone moves from practical frustration to fear of being left. The player may avoid learning more.'],
 alone:['03A','INT. SHUTTLE — DEPARTING WITHOUT ELLIS','The departure becomes real to Ellis while the player hears the danger escalating. There is no response from the player on this route.'],
 survivor_alone:['04A','EXT. HALDEN STATION / INT. SHUTTLE — AFTER DEPARTURE','The remembered bag gives the empty seat personal meaning. This is abandonment before investigating.'],
 door:['03B','INT. LAB 3 ACCESS — PRESENT','Proximity makes the plea harder to ignore. The warning makes opening the door a deliberate risk. Ellis pushes past it.'],
 released:['04B','INT. SHUTTLE — ELLIS BROUGHT ABOARD','Ellis tries to postpone an explanation. The player offers ordinary reassurance. The air warning cuts into that kindness and exposes what the concealment has cost both occupants.'],
 contamination:['05B','EXT. HALDEN STATION / INT. SHUTTLE — DOCKING REFUSED','The station is gone, the carrier will not admit them, and the player cannot undo exposure by holding their breath. The script does not confirm a death.'],
 report:['04C','LAB 3 TERMINAL / REMOTE FEED — PRESENT','Evidence changes the problem from a locked door to infection. Ellis admits concealment and starts to excuse it; the player names the risk Ellis was willing to impose on them. A sealed transfer offers a way to help without sharing air, but the relationship has changed.'],
 leave:['05C','INT. SHUTTLE — LEAVING AFTER THE DIAGNOSIS','The player now knowingly rejects a possible rescue. Ellis asks for a smaller mercy: keep the connection.'],
 survivor_leave:['06C','EXT. HALDEN STATION / INT. SHUTTLE — AFTER THE LAST TRANSMISSION','The player leaves the radio on after leaving Ellis behind. Same survival result as the early exit, different moral and emotional context.'],
 capsule:['05D','INT. SHUTTLE CARGO — SEALED TRANSFER','The objective changes from escaping a room to trusting a barrier. A human question about the lock precedes a physical test of that barrier.'],
 rescued_departure:['06D','INT. SHUTTLE — IN TRANSIT','Clear procedural radio traffic gives way to Ellis asking whether the personal connection is still there. The player answers directly.'],
 rescue:['07D','EXT. HALDEN STATION / INT. MEDICAL ISOLATION — LATER','Return to the opening promise in an ordinary request to wait. Survival is secured; the relationship is the last beat.']
};
const order=['start','memory','corridor','alone','survivor_alone','door','released','contamination','report','leave','survivor_leave','capsule','rescued_departure','rescue'];
const routes=[['Early departure','start','memory','corridor','alone','survivor_alone'],['Open the door','start','memory','corridor','door','released','contamination'],['Investigate, then leave','start','memory','corridor','door','report','leave','survivor_leave'],['Sealed rescue','start','memory','corridor','door','report','capsule','rescued_departure','rescue']];
let out=`# LAST SHUTTLE

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

`;
for(const id of order){const scene=graph[id];const [num,slug,intent]=info[id];out+=`## ${num}. ${slug}\n\n**Scene ID:** \`${id}\`\n\n**Dramatic purpose:** ${intent}\n\n`;
 if(scene.ending)out+=`**Ending designation:** ${scene.ending.number} of 3 — ${scene.ending.name}. The label, credits and replay appear only after the player reads the final beat and presses CONTINUE. The final image and line remain visible underneath; no blackout or forced delay is added.\n\n`;
 let prev=null;
 for(const [index,b] of scene.beats.entries()){
  if(b.kind==='payoff'){
   const capsule=b.id==='capsule';out+=`**Beat ${index+1} — FULL-FRAME PAYOFF.** Cut to \`${capsule?'h_capsule':'h_cabin'}.mp4\`. ${capsule?'The sealed capsule end plate flexes under pressure. The clamp and gasket stay shut; the green light remains on.':'The damp grille flexes and droplets move toward the lens. The threat remains unseen.'} Clear the dialogue and system panel. Play the clip once with its embedded audio; pause and mute the underlying shot.\n\n`;prev='payoff';continue;
  }
  const shot=b.shot??scene.clip;const [file,desc]=shots[shot];out+=`**Beat ${index+1}.** ${shot===prev?'HOLD the same image.':'CUT TO: '+desc} ${shot!==prev?'Asset: `'+file+'`.':''}\n\n`;prev=shot;
  if(b.kind==='hud')out+=`**SYSTEM — ${b.header}**\n\n\`\`\`text\n${b.lines.join('\n')}\n\`\`\`\n\n`;
  else if(b.kind==='sub')out+=`*NARRATION:* ${b.text}\n\n`;
  else out+=`**${b.kind==='you'?'YOU':b.who}**\n\n> ${b.text}\n\n`;
 }
 if(id==='memory') { out+='**MEMORY INTERRUPTION:** after the promise, cut back to the matching galley image with its background compressed into steel planes. Hold this single dark interruption for 0.48 seconds, clear subtitles, then cut to 02 CORRIDOR / NOW. A future Runway export replaces this image cut through the optional memoryBridge prop. No new dialogue, branch or pathogen lore is introduced.\n\n---\n\n'; continue; }
 out+=scene.choices.length>1?'**PLAYER CHOICE — select one:**\n\n':'**CONTINUE / ACTION:**\n\n';
 for(const c of scene.choices){const dest=info[c.to];out+=`- **${c.label}**${c.detail?' — '+c.detail:''} → **${dest[0]} ${dest[1]}** (\`${c.to}\`).\n`;}
 out+='\n---\n\n';
}
out+=`## Complete path reading order\n\n`+routes.map(([label,...ids])=>`- **${label}:** ${ids.map(id=>info[id][0]).join(' → ')}.`).join('\n')+`\n\n## Questions for an external script reviewer\n\n1. Which exact lines sound authored for the audience rather than spoken to another person? Offer replacements of comparable length.\n2. Does the ordinary memory earn concern for Ellis without assigning a face, gender or elaborate history?\n3. Track Ellis's tactics: checking for a response, requesting help, invoking the promise, overriding hesitation, concealing, admitting, asking for connection. Where do these repeat without developing?\n4. Does the informed-abandonment branch feel different from leaving before learning the diagnosis?\n5. Does the open-door branch communicate both a compassionate impulse and the cost of Ellis's concealment?\n6. Is sealed rescue too obviously the correct answer once the transfer appears? Propose a cost or ambiguity separately; do not quietly rewrite the current mechanics.\n7. Which necessary off-screen actions would become confusing if their narration were deleted? Which captions can disappear because the image already carries them?\n8. Do the three final images and final lines leave distinct feelings? Identify any line that is trying too hard to be quotable.\n9. Can the connection between infection and environmental movement remain unsettling without additional monster lore?\n10. Give a line-level pass first. Put all new scenes, facts, sounds, deaths, loops and mechanics in a clearly separate proposal.\n\nThe preserved prior version is **LAST SHUTTLE — BASELINE V1**, under \`versions/last-shuttle-baseline-v1-2026-09-14/\`. Do not alter it.\n`;
fs.writeFileSync(root+'/runway-interview/LAST-SHUTTLE-SCREENPLAY-v5.md',out);
fs.writeFileSync(root+'/runway-interview/cinematic-pass-v5.json',JSON.stringify(graph,null,2)+'\n');
console.log('V5 exported. All 14 scenes, beat/shot structures, branch destinations and ending categories match V4.');
