# Tasks: Ohmdal Chapter 01

## A. Pre-implementation

- [ ] Read `agents.md`.
- [ ] Read `docs/GAME_SCALE_AND_ART_DIRECTION.md`.
- [ ] Read `specs/017-ohmdal-chapter-01/spec.md`.
- [ ] Verify current build before changes.

## B. Scale and global redesign

- [ ] Update `GAME_WIDTH` to `640` and `GAME_HEIGHT` to `360` in `src/game/constants.ts`.
- [ ] Redesign `roxana-office.map.json` to `640x360` natively (adjust walls, coordinates, spawn, and decorations).
- [ ] Redesign `electronics-classroom.map.json` to `640x360` natively.
- [ ] Redesign `roxana-library-hub.map.json` to `640x360` natively.
- [ ] Adjust CSS and responsive scaling of Phaser canvas in React wrapper.
- [ ] Validate mobile overlay controls layout.

## C. Map and camera

- [ ] Create `ohmdal-chapter-01.map.json` with dimensions `1280x720`.
- [ ] Set player spawn coordinates and camera tracking with world boundaries.
- [ ] Add zones: arrival, patio, workshops, plaza, archive.
- [ ] Configure solids, decorations, and interactable triggers.

## D. Scene

- [ ] Create `OhmdalChapter01Scene.ts`.
- [ ] Register scene.
- [ ] Emit `room:entered`.
- [ ] Emit analytics events.
- [ ] Implement prompts.
- [ ] Implement interaction dispatch.
- [ ] Implement scene shutdown cleanup.

## E. Content

- [ ] Add `ohmdal-chapter-01.json` messages.
- [ ] Add intro dialogue.
- [ ] Add puzzle hint dialogues.
- [ ] Add chapter exit dialogue.
- [ ] Extend journal content.
- [ ] Ensure no long narrative text is hardcoded in Phaser.

## F. Puzzles (React Overlays & Phaser Reactions)

- [ ] Create React component `OpenCircuitPuzzle.tsx` overlay.
- [ ] Create React component `ConductivePathPuzzle.tsx` overlay.
- [ ] Create React component `PlazaSystemPuzzle.tsx` overlay.
- [ ] Emit `puzzle:start` from Phaser to trigger React overlays and lock controls.
- [ ] Emit `puzzle:fail` from React to trigger OHM's metaphorical reactive hints in Phaser.
- [ ] Emit `puzzle:complete` from React to trigger sequential animations in Phaser (glow lines -> actuation) and restore movement.
- [ ] Integrate 3-phase pedagogical loop with journal updates (`material_observation` at inspection, `formalization` at completion).

## G. Completion

- [ ] Enable archive gate on Puzzle 3 completion.
- [ ] Retrieve `bobina_memoria_de_ohmdal` (emit `world:item-recovered`).
- [ ] Enable return to Hub.
- [ ] Implement Hub progress recognition hook for recovered memory coil.

## H. QA

- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] Desktop movement.
- [ ] Mobile movement.
- [ ] Prompt overlap.
- [ ] UI lock during message/dialogue/journal.
- [ ] Camera bounds.
- [ ] Puzzle order.
- [ ] Re-entry behavior.
