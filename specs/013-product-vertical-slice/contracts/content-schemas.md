# Contract: Content Schemas

## Purpose

Define the content shapes needed for the first MVP while keeping narrative and educational content out of Phaser scenes.

## Bitacora Entry

Required fields:

- `id`
- `title`
- `scope`: `central` or `world`
- `worldId` optional
- `conceptIds`
- `simple`
- `technical`
- `unlockCondition`

Optional fields:

- `diagrams`
- `videoLinks`
- `exerciseLinks`

Rules:

- `simple` is short, narrative and recall-oriented.
- `technical` may include formulas and formal definitions.
- Videos and exercises are optional resources.

## Dialogue

Required fields:

- `id`
- `speakerId`
- `lines`

Line fields:

- `text`
- `emotion` optional
- `next` optional

Rules:

- Lines can hint, ask, react, or use metaphor.
- Lines must not directly define scientific concepts.

## Room Map

Required fields:

- `id`
- `renderMode`: `tilemap` or `illustrated`
- `tileSize`
- `size`
- `spawn`
- `solids`
- `interactables`

Optional fields:

- `imageLayers`
- `layers`
- `visuals`
- `entities`
- `decorations`

Rules:

- Illustrated rooms still require invisible solids and interactables.
- Foreground image layers may be used for objects that visually cover the player.

## Puzzle

Required fields:

- `id`
- `worldId`
- `type`
- `conceptIds`
- `components`
- `initialState`
- `allowedActions`
- `feedbackRules`
- `successCondition`
- `unlockedJournalEntryIds`

Rules:

- Puzzle data describes rules and content references.
- Phaser systems interpret puzzle data and render feedback.
- React UI must not solve puzzle logic directly.

## Message

Required fields:

- `id`
- `body`
- `tone` optional

Rules:

- Messages are short HUD or inspection feedback.
- Formal explanations belong in bitacora entries, not messages.
