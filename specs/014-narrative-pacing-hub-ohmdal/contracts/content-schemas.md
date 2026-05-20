# Contract: Content Schemas

## Dialogue Content

Portrait-capable dialogue extends the existing dialogue JSON.

Required fields:

- `id`: string
- `speakerId`: string
- `speakerName`: string
- `presentation`: `standard` or `portrait`
- `lines`: array of lines

Optional fields:

- `portraitId`: string
- `beatId`: string
- `revisitVariantId`: string

Line fields:

- `id`: string
- `text`: string
- `emotion`: optional string

Validation:

- Text must not include formal scientific definitions or formulas in gameplay dialogue.
- Portrait dialogues must remain short enough for mobile readability.

## Memory Sequence Content

Required fields:

- `id`: string
- `panels`: ordered array

Optional fields:

- `title`: string
- `skippable`: boolean
- `onCompleteBeatId`: string
- `unlockedJournalEntryIds`: string array

Panel fields:

- `id`: string
- `imageId`: string
- `caption`: string
- `tone`: optional string

Validation:

- This feature should use 1-5 panels per memory.
- `imageId` may point to a placeholder asset ID.
- Captions should be short and narrative, not explanatory.

## Classroom Threshold Content

Required fields:

- `id`: string
- `worldId`: string
- `displayName`: string
- `moodCues`: array
- `previewBeatId`: string
- `portalInteractableId`: string

Mood cue fields:

- `type`: `palette`, `object`, `guide_presence`, `portal_preview`, `deterioration`, `ambient`, `message`
- `description`: string

Validation:

- At least three mood cues are required for the Electronics classroom.
- The classroom must not be represented as the full world.

## Narrative Beat Content

Required fields:

- `id`: string
- `kind`: string

Optional fields:

- `requiredBefore`: string array
- `contentId`: string
- `revisitContentId`: string
- `completionFlag`: string
- `analyticsEvent`: string

Validation:

- Required dependencies must not form cycles.
- Revisit content must be shorter than first-visit content when both exist.
