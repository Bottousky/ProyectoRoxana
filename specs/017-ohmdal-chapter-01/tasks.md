# Tasks: Ohmdal Chapter 01

## A. Pre-implementation

- [ ] Read `agents.md`.
- [ ] Read `docs/GAME_SCALE_AND_ART_DIRECTION.md`.
- [ ] Read `specs/017-ohmdal-chapter-01/spec.md`.
- [ ] Verify current build before changes.

## B. Scale and camera

- [ ] Introduce viewport constants without deleting legacy assumptions.
- [ ] Decide how old `384x216` scenes are handled.
- [ ] Add world-size-aware player clamp or scene-level clamp.
- [ ] Add camera follow support for larger maps.
- [ ] Validate mobile aspect ratio.

## C. Map

- [ ] Create `ohmdal-chapter-01.map.json`.
- [ ] Add spawn and world size.
- [ ] Add zones: arrival, patio, workshops, plaza, archive.
- [ ] Add solids.
- [ ] Add decorations.
- [ ] Add interactables.
- [ ] Keep all labels/prompts short.

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

## F. Puzzles

- [ ] Puzzle 1: open circuit restoration.
- [ ] Puzzle 2: conductive path / material route.
- [ ] Puzzle 3: plaza system restoration.
- [ ] Add feedback for wrong/incomplete states.
- [ ] Add journal updates.
- [ ] Add puzzle completion events.

## G. Completion

- [ ] Add recovered object/progress beat.
- [ ] Enable archive gate.
- [ ] Enable return to Hub.
- [ ] Prepare Hub acknowledgment hook.

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
