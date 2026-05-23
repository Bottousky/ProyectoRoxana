# Ohmdal Chapter 01 Implementation Plan

## Goal

Build the first real playable Ohmdal chapter as a larger, camera-driven map with three connected electricity puzzles and progressive journal updates.

## Architecture

Keep the current separation:

- Phaser: map, movement, camera, collisions, interactables, puzzle state.
- React: dialogue, messages, journal, HUD, mobile controls.
- JSON content: narrative copy, messages, journal blocks.
- Progress store: puzzle completion, recovered object, chapter completion.

## Phase 1 - Scale Redesign And Runtime Preparation

Files:

- Read: `docs/GAME_SCALE_AND_ART_DIRECTION.md`
- Modify: `src/game/constants.ts`
- Modify: `src/game/createRoxanaGame.ts`
- Modify: `src/content/maps/roxana-office.map.json`
- Modify: `src/content/maps/electronics-classroom.map.json`
- Modify: `src/content/maps/roxana-library-hub.map.json`

Tasks:

- [ ] Update `GAME_WIDTH` to `640` and `GAME_HEIGHT` to `360` in `src/game/constants.ts`.
- [ ] Redesign `roxana-office.map.json` to `640x360` (expand size, adjust boundaries, solids, spawn, and decorations coordinates).
- [ ] Redesign `electronics-classroom.map.json` to `640x360` (expand size, adjust tables, walls, and spawn coordinates).
- [ ] Redesign `roxana-library-hub.map.json` to `640x360` (expand vestibulo size, walls, and door positions).
- [ ] Ensure Phaser canvas scales and aligns correctly inside the React container, and verify mobile controls layout.

Acceptance:

- Existing scenes (office, hub, classroom) load natively in `640x360` without distortion.
- Collisions and interactable boundaries remain perfect in all scaled rooms.
- Build and lint pass.

## Phase 2 - New Map Structure

Files:

- Create: `src/content/maps/ohmdal-chapter-01.map.json`
- Create: `src/game/scenes/OhmdalChapter01Scene.ts`
- Modify: `src/game/createRoxanaGame.ts`
- Modify: `src/components/game/GameShell.tsx`
- Modify: `src/game/types/events.ts` if needed

Tasks:

- [ ] Create a `1280x720` placeholder map.
- [ ] Add world bounds.
- [ ] Add camera follow.
- [ ] Add entry zone, service patio, workshop street, plaza, archive gate.
- [ ] Add solid objects and interactables as data.
- [ ] Add room label for `ohmdal_chapter_01`.

Acceptance:

- Player can move across a map larger than the viewport.
- Camera follows player and respects bounds.
- Prompts still work.
- No puzzle logic yet.

## Phase 3 - Puzzle 1: Circuito Abierto

Files:

- Modify: `src/content/maps/ohmdal-chapter-01.map.json`
- Create: `src/components/game/puzzles/OpenCircuitPuzzle.tsx` (React puzzle overlay)
- Modify: `src/content/messages/ohmdal-chapter-01.json`
- Modify: `src/content/journal/ohmdal.json`

Tasks:

- [ ] Add inspectables before the puzzle (updates journal to `material_observation` stage).
- [ ] Add broken bronze line entity in Phaser that triggers `puzzle:start` with ID `ohmdal_circuit_01` on interaction.
- [ ] Implement `OpenCircuitPuzzle` React overlay (drag-and-drop or click to place a conductor wire/segment).
- [ ] Connect `puzzle:fail` to trigger a metaphorical hint dialogue from OHM when player tries wrong materials or submits invalid circuits.
- [ ] On `puzzle:complete`, close overlay, animate electricity flowing through the bronze line, and open the service patio gate.
- [ ] Unlock `ohmdal_closed_circuit` technical entry in the journal.

Acceptance:

- Interactive React overlay works smoothly.
- Visual feedback in Phaser is sequential (current flows -> door opens).
- Journal entry updates to show formalization.

## Phase 4 - Puzzle 2: Conductive Path

Files:

- Modify: `src/content/maps/ohmdal-chapter-01.map.json`
- Create: `src/components/game/puzzles/ConductivePathPuzzle.tsx` (React overlay)
- Modify: `src/content/messages/ohmdal-chapter-01.json`
- Create: `src/content/dialogues/ohmdal-conductive-path-hint.json`
- Modify: `src/content/journal/ohmdal.json`

Tasks:

- [ ] Add workshop automaton in Phaser map.
- [ ] Create React overlay for selecting from three materials (wood, stone, copper) to bridge the conductor route.
- [ ] If wood or stone is chosen, trigger `puzzle:fail` to play OHM's reactive dialogue explaining how wood/stone are quiet/silent.
- [ ] If copper is chosen, resolve the puzzle: play electric glow animation through the copper tape in Phaser, and make the automaton twitch/move.
- [ ] Unlock `ohmdal_conductive_paths` in the journal (formalizing conductivity).

Acceptance:

- Wrong choices show immediate narrative/visual feedback without locking the game.
- Copper choice successfully activates the automaton in Phaser.
- Journal registers the formalization entry.

## Phase 5 - Puzzle 3: Plaza System

Files:

- Modify: `src/content/maps/ohmdal-chapter-01.map.json`
- Create: `src/components/game/puzzles/PlazaSystemPuzzle.tsx` (React overlay)
- Modify: `src/content/messages/ohmdal-chapter-01.json`
- Create: `src/content/dialogues/ohmdal-plaza-restored.json`
- Modify: `src/content/journal/ohmdal.json`

Tasks:

- [ ] Add fountain source, main switch, and distribution lines in Phaser plaza map.
- [ ] Implement synthesis puzzle overlay in React (player must route power from source, through an interactive switch, to the fountain load, and close the loop back to the source).
- [ ] Metaphorical feedback from OHM if the return path is missing or switches are open.
- [ ] On success, trigger energy current loop on the floor, turn on the plaza fountain, and open the archive gate.
- [ ] Emit `world:item-recovered` when player retrieves the Memory Coil inside the archive.

Acceptance:

- Puzzle 3 successfully requires closed circuit and conductive path synthesis.
- The plaza is fully illuminated, and the gate opens upon resolution.

## Phase 6 - Chapter Closing

Files:

- Create: `src/content/dialogues/ohmdal-chapter-01-exit.json`
- Modify: progress store if needed
- Modify: hub return behavior if needed

Tasks:

- [ ] Add recovered object `bobina_memoria_de_ohmdal`.
- [ ] Mark chapter complete.
- [ ] Allow return to Hub.
- [ ] Prepare hook for Hub acknowledging recovered object.

Acceptance:

- Player can finish the chapter.
- State is persistible.
- Hub return is clean.
- Build and lint pass.

## Verification

- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] Desktop keyboard movement.
- [ ] Mobile controls.
- [ ] Camera bounds.
- [ ] All prompts.
- [ ] All dialogues.
- [ ] All journal updates.
- [ ] Puzzle completion order.
- [ ] Return to Hub.
