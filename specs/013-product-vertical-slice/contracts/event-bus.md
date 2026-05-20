# Contract: Event Bus

## Purpose

Define the MVP communication boundary between Phaser gameplay and React UI.

## Principles

- Phaser emits gameplay events.
- React renders text-heavy UI and emits player UI intent.
- Events must be typed in `src/game/types/events.ts`.
- No puzzle should call React components directly.
- No React UI should mutate Phaser scene internals directly.

## Required MVP Events

### `scene:ready`

Emitted by Phaser when a scene is ready.

Payload:

- `scene`: `boot`, `preload`, `hub`, `electronics_threshold`, `electronics_puzzle_closed_circuit`

### `dialogue:start`

Emitted by Phaser when an interactable starts dialogue.

Payload:

- `dialogueId`
- `speakerId`

### `dialogue:complete`

Emitted by React when the current dialogue closes.

Payload:

- `dialogueId`

### `journal:open`

Emitted by Phaser or React to open the bitacora.

Payload:

- `entryId` optional
- `mode` optional: `simple` or `technical`

### `journal:entry-unlocked`

Emitted by gameplay or progression logic when a bitacora entry becomes available.

Payload:

- `entryId`
- `source`: `story`, `puzzle`, `diagnostic`

### `puzzle:start`

Emitted when a puzzle begins.

Payload:

- `puzzleId`
- `worldId`

### `puzzle:state-change`

Emitted when puzzle state changes enough for UI or analytics to know.

Payload:

- `puzzleId`
- `state`: `idle`, `attempted`, `incomplete`, `complete`

### `puzzle:complete`

Emitted when the success condition is reached.

Payload:

- `puzzleId`
- `unlockedJournalEntryIds`

### `analytics:track`

Emitted by game or UI layers to record MVP validation milestones.

Payload:

- `eventName`
- `roomId` optional
- `puzzleId` optional
- `entryId` optional
- `metadata` optional

## Compatibility Notes

Existing events such as `hud:prompt`, `message:show`, `input:virtual-direction`, `input:interact`, `input:back`, `ui:controls-lock`, and current `scene:ready` values should remain compatible unless replaced by a dedicated migration task.
