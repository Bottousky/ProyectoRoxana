# Contract: Analytics Events

## Purpose

Track whether the new narrative bridge improves pacing and whether players reach the first Ohmdal puzzle after the aula/world preview.

## Events

### `entered_electronics_classroom`

When the player first enters the Electronics aula.

Fields:

- `roomId`: `electronics_classroom`
- `firstVisit`: boolean

### `viewed_ohmdal_preview`

When the player sees the classroom/world preview beat.

Fields:

- `beatId`
- `roomId`

### `started_portrait_dialogue`

When a portrait-mode dialogue opens.

Fields:

- `dialogueId`
- `speakerId`
- `beatId` optional

### `completed_portrait_dialogue`

When a portrait-mode dialogue finishes.

Fields:

- `dialogueId`
- `speakerId`
- `beatId` optional

### `started_memory_sequence`

When a memory panel sequence opens.

Fields:

- `memoryId`
- `beatId` optional
- `source`

### `completed_memory_sequence`

When a memory panel sequence completes.

Fields:

- `memoryId`
- `beatId` optional
- `skipped`: boolean

### `started_puzzle_after_narrative_bridge`

When the first Ohmdal puzzle starts after required narrative beats.

Fields:

- `puzzleId`
- `requiredBeatIds`: string array

## Privacy

- Do not store raw dialogue text.
- Do not store personally identifiable data.
- LocalStorage-only analytics remain acceptable for MVP validation.
