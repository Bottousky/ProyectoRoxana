# Ohmdal Chapter 01 Implementation Plan

## Goal

Build the first real playable Ohmdal chapter as a larger, camera-driven map with three connected electricity puzzles and progressive journal updates.

## Architecture

Keep the current separation:

- Phaser: map, movement, camera, collisions, interactables, puzzle state.
- React: dialogue, messages, journal, HUD, mobile controls.
- JSON content: narrative copy, messages, journal blocks.
- Progress store: puzzle completion, recovered object, chapter completion.

## Phase 1 - Scale Decision And Runtime Preparation

Files:

- Read: `docs/GAME_SCALE_AND_ART_DIRECTION.md`
- Modify: `src/game/constants.ts`
- Modify: `src/game/createRoxanaGame.ts`
- Modify: `src/game/entities/Player.ts`
- Possibly modify scenes using `GAME_WIDTH` / `GAME_HEIGHT`

Tasks:

- [ ] Introduce explicit constants for viewport and legacy rooms.
- [ ] Decide whether `384x216` remains only for legacy scenes.
- [ ] Add support for a `640x360` viewport.
- [ ] Ensure canvas still fits responsive React frame.
- [ ] Ensure mobile controls still work.

Acceptance:

- Existing scenes still open.
- Build and lint pass.
- No narrative/content behavior changes yet.

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
- Create/modify: puzzle system file if needed
- Modify: `src/content/messages/ohmdal-chapter-01.json`
- Modify: `src/content/journal/ohmdal.json`

Tasks:

- [ ] Add inspectables before the puzzle.
- [ ] Add broken bronze line, switch, mechanism and return segment.
- [ ] Emit `journal:entry-updated` for `system_observation`.
- [ ] Complete puzzle when continuity is restored.
- [ ] Reveal `post_restoration` stage.

Acceptance:

- Puzzle is understandable through world feedback.
- No school-style instruction appears in dialogue.
- Journal updates after observation and completion.

## Phase 4 - Puzzle 2: Conductive Path

Files:

- Modify: `src/content/maps/ohmdal-chapter-01.map.json`
- Modify: `src/content/messages/ohmdal-chapter-01.json`
- Create: `src/content/dialogues/ohmdal-conductive-path-hint.json`
- Modify: `src/content/journal/ohmdal.json`

Tasks:

- [ ] Add workshop automaton.
- [ ] Add three possible path/material objects.
- [ ] Make only one or two valid based on continuity/conductive identity.
- [ ] Add OHM hint dialogue that does not directly explain conductivity.
- [ ] Unlock `ohmdal_conductive_paths`.

Acceptance:

- Player can infer solution from visual/message feedback.
- Wrong choices produce world reaction, not failure/game over.
- Journal gives formalization after interaction.

## Phase 5 - Puzzle 3: Plaza System

Files:

- Modify: `src/content/maps/ohmdal-chapter-01.map.json`
- Modify: `src/content/messages/ohmdal-chapter-01.json`
- Create: `src/content/dialogues/ohmdal-plaza-restored.json`
- Modify: `src/content/journal/ohmdal.json`

Tasks:

- [ ] Add source, switch, load/fountain and return path.
- [ ] Require using what player learned in puzzles 1 and 2.
- [ ] Open archive gate on completion.
- [ ] Emit `world:item-recovered` after archive interaction.

Acceptance:

- Puzzle 3 feels like synthesis, not new mechanic overload.
- The plaza changes visually after restoration.
- Archive becomes accessible.

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
