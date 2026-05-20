# Data Model: Product Vertical Slice

## PlayerProgress

Represents the current player's journey through the MVP.

Fields:

- `playerId`: local or future cloud identifier.
- `completedScenes`: ordered list of completed major scenes.
- `unlockedJournalEntries`: list of bitacora entry IDs.
- `completedPuzzles`: list of puzzle IDs.
- `diagnosticKnowledge`: optional list of concepts the player already knows.
- `lastRoomId`: last known playable room.

Validation:

- Entry and puzzle IDs must reference existing content.
- Progress must tolerate missing optional diagnostics.

State transitions:

- `new` -> `bitacora_found` -> `electronics_entered` -> `closed_circuit_completed` -> `demo_finished`.

## SchoolHub

Represents the persistent central space and its restoration state.

Fields:

- `hubId`
- `visualState`: `abandoned`, `recognizable`, `recomposed` or later equivalents.
- `availableRooms`
- `statueState`
- `restorationMilestones`

Validation:

- Initial MVP starts in a mostly abandoned state.
- Restoration must be triggered by completed learning or narrative milestones, not arbitrary UI actions.

## Room

Represents a playable location.

Fields:

- `roomId`
- `title`
- `kind`: `hub`, `office`, `threshold`, `puzzle`
- `renderMode`: `tilemap` or `illustrated`
- `imageLayers`
- `solids`
- `interactables`
- `spawn`
- `exitTargets`

Validation:

- Solids and interactables must fit the room bounds.
- Text-heavy interactions must point to dialogue, journal, or message content rather than inline strings except short prompts.

## Interactable

Represents a player-facing object or zone.

Fields:

- `id`
- `kind`: `dialogue`, `journal`, `inspect`, `blocked_gate`, `portal`, `puzzle`
- `bounds`
- `prompt`
- `payload`

Validation:

- Payload must match the kind.
- Portal and puzzle interactables must not bypass required narrative milestones unless explicitly allowed.

## WorldSimulation

Represents one subject-specific simulation world.

Fields:

- `worldId`
- `name`
- `subject`
- `guideId`
- `recommendedConcepts`
- `chapters`

Validation:

- MVP includes only Electronica/Ohmdal as an active world.
- Other worlds may exist as locked or narrative references, not full playable content.

## Puzzle

Represents an experimental system with state, feedback, and completion criteria.

Fields:

- `puzzleId`
- `worldId`
- `title`
- `conceptIds`
- `components`
- `initialState`
- `allowedActions`
- `feedbackRules`
- `successCondition`
- `failureFeedback`
- `unlockedJournalEntries`
- `analyticsEvents`

Validation:

- The first puzzle must be solvable without reading a formal explanation.
- Failure feedback must be non-punitive.
- Formal concept wording belongs in the unlocked bitacora entry, not in puzzle dialogue.

## CircuitComponent

Represents an element inside an electronics puzzle.

Fields:

- `componentId`
- `type`: `source`, `conductor`, `switch`, `load`, `break`, `connector`
- `state`
- `connections`
- `position`

Validation:

- The first puzzle's success condition requires a closed path from source to load.
- Components must be visually and interactively distinguishable enough for experimentation.

## BitacoraEntry

Represents a concept entry unlocked by play.

Fields:

- `entryId`
- `scope`: `central` or `world`
- `worldId`
- `conceptIds`
- `title`
- `simple`
- `technical`
- `diagrams`
- `videoLinks`
- `exerciseLinks`
- `unlockCondition`

Validation:

- `simple` must be short, narrative, and useful for recall.
- `technical` may contain formal vocabulary, formulas, diagrams, and study links.
- Videos and exercises are optional.

## Dialogue

Represents narrative conversation content.

Fields:

- `dialogueId`
- `speakerId`
- `lines`
- `unlockCondition`
- `completionEffects`

Validation:

- Gameplay dialogue must ask, suggest, react, or hint.
- Dialogue must not directly define scientific concepts.

## LearningEvent

Represents a validation event.

Fields:

- `eventName`
- `timestamp`
- `sessionId`
- `roomId`
- `puzzleId`
- `entryId`
- `metadata`

Validation:

- Events must not require personal information for MVP.
- Event names must come from the approved analytics contract.
