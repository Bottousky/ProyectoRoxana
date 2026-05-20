# MVP Implementation Notes

**Active spec**: `specs/013-product-vertical-slice/spec.md`

## Current Direction

The MVP path is:

1. Discover the school hub.
2. Reach Roxana's office.
3. Obtain the empty bitacora.
4. Enter the Electronica/Ohmdal threshold.
5. Solve the first open/closed circuit puzzle.
6. Unlock simple and technical bitacora entries.
7. Record validation events.

## Implementation Rules

- Phaser owns playable world state, collisions, interactables, camera and puzzle feedback.
- React owns dialogue, bitacora, HUD, mobile controls and optional study surfaces.
- Dialogue hints without formal scientific definitions.
- Formal explanation lives in the bitacora technical layer.
- Videos and exercises are optional.
- Progress starts local for this MVP.
- Analytics starts as a local debug sink.
