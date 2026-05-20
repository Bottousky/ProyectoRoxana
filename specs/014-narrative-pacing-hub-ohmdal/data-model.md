# Data Model: Narrative Pacing Hub Ohmdal

## NarrativeBeat

Represents one step in the first-play route.

Fields:

- `id`: Stable identifier, e.g. `hub_statue_first_echo`.
- `kind`: `dialogue`, `message`, `memory`, `journal_unlock`, `room_transition`, `puzzle_handoff`.
- `requiredBefore`: Optional list of beat IDs that must be complete.
- `completionFlag`: Progress flag set when complete.
- `firstVisitContentId`: Content ID used the first time.
- `revisitContentId`: Optional alternate content ID for revisits.
- `analyticsEvent`: Optional analytics event emitted on start or completion.

Validation:

- `id` must be unique.
- `requiredBefore` must reference existing beat IDs.
- Content IDs must exist in the relevant content collection.

## ClassroomThreshold

Represents the school-side aula connected to a world.

Fields:

- `id`: Stable room ID, e.g. `electronics_classroom`.
- `worldId`: Target world ID, e.g. `ohmdal`.
- `displayName`: Player-facing room name.
- `paletteIntent`: Short description of visual palette shift.
- `ambientIntent`: Short description of audio/atmosphere intent.
- `previewBeatId`: Narrative beat that previews the world.
- `portalInteractableId`: Interactable that leads toward the world.
- `revisitFlag`: Progress flag that tracks first visit.

Validation:

- Must declare at least three mood cues: palette, object, guide/presence, portal preview, deterioration, ambient cue, or message.
- Must not start the first puzzle directly; must route through preview or handoff.

## PortraitDialogue

Extends existing dialogue content with presentation metadata.

Fields:

- `id`: Dialogue ID.
- `speakerId`: Speaker identifier.
- `speakerName`: Display name.
- `portraitId`: Optional portrait placeholder/future asset ID.
- `presentation`: `standard` or `portrait`.
- `lines`: Ordered dialogue lines.
- `onCompleteBeatId`: Optional beat completed when dialogue finishes.

Validation:

- Portrait presentation must include speaker name and at least one line.
- Lines must obey no-lecture narrative rules.

## MemoryPanelSequence

Represents a short illustrated/captioned story moment.

Fields:

- `id`: Sequence ID.
- `title`: Optional internal/player-facing title.
- `panels`: Ordered list of panels.
- `skippable`: Whether player may skip.
- `onCompleteBeatId`: Optional beat completed when sequence finishes.
- `unlockedJournalEntryIds`: Optional bitacora entries unlocked on completion.

Panel fields:

- `id`: Panel ID.
- `imageId`: Placeholder/future asset ID.
- `caption`: Short caption.
- `tone`: Optional mood tag.

Validation:

- Sequence must have 1-5 panels for this feature.
- Captions must be short enough for mobile horizontal.
- Formal educational explanations are not allowed in captions.

## RevisitState

Tracks whether full introductory content should play.

Fields:

- `seenBeatIds`: Beat IDs already completed.
- `visitedRoomIds`: Room IDs already entered.
- `unlockedJournalEntryIds`: Bitacora entries already available.
- `lastNarrativeBeatId`: Optional last completed beat.

Validation:

- Revisit content should never block route completion.
- Missing flags default to first-visit behavior.

## NarrativeAnalyticsEvent

Tracks pacing and drop-off.

Fields:

- `eventName`: Stable analytics event name.
- `roomId`: Optional room ID.
- `beatId`: Optional narrative beat ID.
- `dialogueId`: Optional dialogue ID.
- `memoryId`: Optional memory sequence ID.
- `puzzleId`: Optional puzzle ID.
- `metadata`: Optional structured details.

Validation:

- Events must be non-sensitive.
- Events must not include raw dialogue text.
