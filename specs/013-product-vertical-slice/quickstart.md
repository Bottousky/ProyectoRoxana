# Quickstart: Product Vertical Slice

## Goal

Verify that the MVP path works as a coherent first playable slice: school discovery, Roxana office, bitacora, Electronica/Ohmdal threshold, first circuit puzzle, and bitacora formalization.

## Local Run

```powershell
npm run dev
```

Open the local app in a desktop browser, then repeat key checks in a mobile landscape viewport.

## QA Path

1. Start the game from the home route.
2. Confirm the school hub is readable as an abandoned but meaningful place.
3. Move through the hub and inspect the Roxana statue or equivalent central clue.
4. Reach Roxana's office.
5. Obtain or open the empty bitacora.
6. Confirm the bitacora feels personal and is not required to watch a video.
7. Enter the Electronica/Ohmdal threshold.
8. Start the first circuit puzzle.
9. Try an incomplete circuit configuration and confirm feedback is clear but non-punitive.
10. Complete the circuit path and confirm the mechanism wakes up.
11. Open the simple bitacora entry.
12. Open the technical bitacora entry.
13. Verify videos/exercises are optional.
14. Finish the demo path.

## Expected Checks

- Text-heavy surfaces are React/HTML and remain legible.
- Phaser renders only the playable world and visual feedback.
- Dialogue hints without formal definitions.
- Formal explanation appears in the bitacora technical layer.
- Desktop controls work.
- Mobile landscape controls work.
- Aspect ratio is preserved.
- Progress state survives a refresh if local persistence is implemented for the slice.
- Analytics events can be observed through the MVP analytics sink or debug output.

## Validation Commands

```powershell
npm run lint
npm run build
```

## Manual Success Questions

- Did the player understand that Roxana and the school matter?
- Did the player solve the puzzle through observation instead of being told the answer?
- Did the player understand that a complete path is required for the mechanism to work?
- Did the bitacora feel like a reward and memory aid rather than homework?
- Was the demo short enough to finish in 10 to 20 minutes?
