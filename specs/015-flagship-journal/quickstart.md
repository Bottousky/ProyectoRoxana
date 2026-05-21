# Quickstart: Flagship Journal

## Goal

Verify the flagship journal experience for the Ohmdal slice from unlock to layered consultation.

## Preconditions

- The game boots locally in the browser.
- The player can reach the hub, Roxana office, Electronics classroom, and Ohmdal threshold.
- The journal feature branch content is available locally.

## Manual Flow

1. Start a new session in the hub.
2. Reach the Roxana office and unlock the notebook.
3. Open the journal and verify:
   - it feels like a notebook, not a side panel;
   - first open presentation is intentional;
   - text remains readable.
4. Continue through the Electronics classroom and first Ohmdal beats.
5. After each journal-triggering beat, reopen the notebook and verify:
   - the same entry has progressed;
   - new content appears by stage;
   - previous content remains coherent.
6. Toggle or expand the technical layer and verify:
   - simple reading still works independently;
   - formulas and visual academic blocks appear clearly.
7. Close and reopen the journal after stages are unlocked and verify:
   - the player can consult quickly;
   - the notebook still feels premium;
   - the full first-open reveal is not forced every time.

## QA Focus

- Desktop readability
- Mobile horizontal readability
- Entry stage coherence
- Page navigation feel
- Technical layer clarity
- Visual placeholders feeling intentional rather than broken

## Regression Checks

- Dialogue and memory overlays still work after journal changes.
- Gameplay control correctly locks and unlocks on journal open/close.
- Existing unlocked journal entries still remain accessible.
