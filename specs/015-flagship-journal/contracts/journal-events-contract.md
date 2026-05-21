# Journal Events Contract

## Purpose

Define the event-level contract between gameplay systems and the React journal experience.

## Opening And Closing

### `journal:open`

Used when gameplay or player input opens the journal.

Required payload:

- target entry identifier, if any
- desired layer mode, if any

### `journal:close`

Used when the player exits the journal and control returns to gameplay.

Required payload:

- none

## Progression

### `journal:entry-unlocked`

Used when a new entry becomes available for the first time.

Required payload:

- entry identifier
- source category
- optional narrative beat identifier

### `journal:entry-updated`

Used when an existing entry receives a new reveal stage.

Required payload:

- entry identifier
- reveal stage identifier
- source category
- optional beat identifier

### `journal:stage-revealed`

Used when the UI completes the visible reveal of a stage.

Required payload:

- entry identifier
- reveal stage identifier

## Navigation And Layering

### `journal:page-changed`

Used when the player navigates to another spread or page.

Required payload:

- entry identifier
- spread identifier
- page direction or index delta

### `journal:layer-toggled`

Used when the player switches or expands between simple and technical reading.

Required payload:

- entry identifier
- target layer mode

## Analytics Expectations

The journal flow should be able to track at least:

- first journal open
- repeat journal open
- entry unlock
- reveal stage update
- page turn
- technical layer expansion
- entry completion

## Contract Rules

- Gameplay may request journal state changes but must not own journal page layout.
- Journal UI may emit completion and navigation events but must not rewrite gameplay state directly.
- Event names and payloads must stay typed and discoverable in shared game types.
