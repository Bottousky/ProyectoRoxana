# Contract: Event Bus

## Purpose

Define new or extended events needed for narrative pacing between Phaser gameplay and React UI.

## Principles

- Phaser emits room, interaction and gameplay events.
- React renders dialogue, portrait UI, memory panels and journal surfaces.
- React emits completion events that Phaser can use to unlock movement or advance a beat.
- Events must be typed in `src/game/types/events.ts`.

## Events

### `room:entered`

Emitted by Phaser when the player enters a narrative room.

Payload:

- `roomId`: `hub`, `electronics_classroom`, `ohmdal_threshold`
- `sourceRoomId` optional
- `firstVisit`: boolean

### `narrative:beat-started`

Emitted when a narrative beat begins.

Payload:

- `beatId`
- `kind`: `dialogue`, `message`, `memory`, `journal_unlock`, `room_transition`, `puzzle_handoff`
- `roomId` optional

### `narrative:beat-completed`

Emitted when a narrative beat has completed.

Payload:

- `beatId`
- `roomId` optional

### `dialogue:start`

Extends the existing event.

Payload:

- `dialogueId`
- `speakerId` optional
- `presentation` optional: `standard` or `portrait`
- `beatId` optional

### `dialogue:complete`

Extends the existing event.

Payload:

- `dialogueId`
- `beatId` optional

### `memory:start`

Emitted by Phaser or React when a memory panel sequence should open.

Payload:

- `memoryId`
- `beatId` optional
- `source`: `statue`, `office`, `classroom`, `portal`, `world`

### `memory:complete`

Emitted by React after finishing or skipping a memory sequence.

Payload:

- `memoryId`
- `beatId` optional
- `skipped`: boolean

### `journal:entry-unlocked`

Existing event remains compatible.

Payload:

- `entryId`
- `source`: `story`, `puzzle`, `diagnostic`
- `beatId` optional

### `puzzle:start`

Existing event remains compatible.

Constraint:

- For `closed_circuit_001`, this event should only fire after the required classroom/preview beat is complete.

### `analytics:track`

Existing event remains compatible.

Payload additions:

- `beatId` optional
- `dialogueId` optional
- `memoryId` optional
