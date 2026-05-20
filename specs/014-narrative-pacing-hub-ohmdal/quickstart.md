# Quickstart: Narrative Pacing Hub Ohmdal

## Goal

Verify the first-play route no longer jumps directly into the Ohmdal puzzle.

Expected route:

1. Enter hub from the south.
2. Encounter Roxana through statue/office/bitacora beats.
3. Enter the Electronics classroom/aula.
4. See a clear Ohmdal preview that something is wrong.
5. Only then start the first Ohmdal puzzle.

## Run

```powershell
npm run dev
```

Open the local app in desktop browser.

## Manual QA - Desktop

1. Start with a fresh local progress state.
2. Enter the hub.
3. Verify the route naturally points to the statue, Roxana office and bitacora.
4. Attempt to go to Electronics before required beats.
5. Verify the response is narrative, not an arbitrary hard block.
6. Complete the required beats.
7. Enter the Electronics classroom.
8. Verify it has at least three cues distinct from the hub.
9. Trigger a portrait-mode dialogue.
10. Trigger or view an Ohmdal preview/memory beat.
11. Start the first puzzle only after the narrative bridge.
12. Revisit the classroom and verify the full intro does not replay.

## Manual QA - Mobile Horizontal

1. Open the app in a mobile horizontal viewport.
2. Repeat the first-play route.
3. Verify portrait dialogue text is readable.
4. Verify memory panel captions are readable.
5. Verify UI overlays do not conflict with mobile controls.
6. Verify aspect ratio remains stable.

## Narrative QA

Check all gameplay dialogue:

- No "esto es un circuito cerrado".
- No formulas.
- No school-like definitions.
- No UI instructions spoken by Roxana or OHM.
- Formal explanation remains in the bitacora.

## Commands

```powershell
npm run lint
npm run build
```
