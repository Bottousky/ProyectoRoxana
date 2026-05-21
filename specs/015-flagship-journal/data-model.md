# Data Model: Flagship Journal

## Journal Shell

Represents the notebook container shown above gameplay.

### Fields

- `isOpen`
- `activeEntryId`
- `activeSpreadIndex`
- `activeLayerMode` (`simple` or `technical`)
- `isAnimating`
- `hasSeenFirstOpen`

### Rules

- Only one entry is actively focused at a time.
- The shell can open without forcing a technical layer.
- Reopening an already known entry should bypass the full hero reveal when appropriate.

## Journal Entry

Represents one notebook entry tied to a world, concept, or discovery.

### Fields

- `id`
- `title`
- `scope`
- `worldId`
- `conceptIds`
- `defaultLayerMode`
- `spreads`
- `revealStages`
- `status`

### Rules

- An entry can exist before all of its reveal stages are unlocked.
- The entry must remain meaningful in partial state.
- The flagship Ohmdal entry is the canonical first implementation.

## Spread

Represents one visible notebook view, typically a two-page spread or a single-page fallback on small layouts.

### Fields

- `id`
- `pageLeft`
- `pageRight`
- `theme`
- `availableLayerModes`

### Rules

- A spread may include both simple and technical blocks, but not all blocks need to appear in both modes.
- A spread can be partially empty by design if later stages fill it.

## Journal Page

Represents one page in the notebook.

### Fields

- `id`
- `pageNumber`
- `backgroundStyle`
- `blockIds`
- `marginNotes`

### Rules

- Pages should preserve paper identity and visual hierarchy.
- A page must remain legible when scaled to mobile horizontal constraints.

## Content Block

Represents one typed content unit inside a page.

### Fields

- `id`
- `type`
- `layerMode`
- `position`
- `visualStyle`
- `content`
- `revealAnimation`
- `requiredStageId`

### Supported Types

- `title`
- `paragraph`
- `annotation`
- `formula`
- `diagram`
- `graph`
- `illustration`
- `callout`
- `divider`

### Rules

- Every block belongs to at least one reveal stage.
- Blocks can be shared conceptually across layer modes but must render intentionally in each mode.
- Placeholder blocks are valid if marked intentional and still readable.

## Reveal Stage

Represents one progressive unlock step in an entry.

### Fields

- `id`
- `entryId`
- `triggerId`
- `summary`
- `unlockedBlockIds`
- `completionBehavior`

### Ohmdal Hero Stage Sequence

1. `first_impression`
2. `system_observation`
3. `pattern_recognition`
4. `post_restoration`
5. `technical_expansion` (optional from first four beats or technical toggle)

### Rules

- Stages should be monotonic: once unlocked, they remain available.
- Stages must correspond to meaningful player experience, not arbitrary reading progress.

## Journal Trigger

Represents the event that opens, unlocks, or advances the journal.

### Fields

- `id`
- `sourceType`
- `sourceId`
- `targetEntryId`
- `targetStageId`

### Rules

- A trigger may unlock a new entry or advance an existing one.
- Trigger definitions must remain separate from scene copy and layout details.

## Layer Mode

Represents how much explicit formal content is being shown.

### Values

- `simple`
- `technical`

### Rules

- `simple` is the default experience for readability and emotional continuity.
- `technical` expands the same discovery rather than replacing it.

## Placeholder Asset

Represents a non-final but intentionally designed visual block.

### Fields

- `id`
- `kind`
- `label`
- `targetFinalAsset`
- `fallbackPresentation`

### Rules

- Placeholders must preserve composition and meaning.
- Placeholders should never read like missing content or broken loading state.
