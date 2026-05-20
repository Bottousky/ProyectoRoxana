# Research: Product Vertical Slice

## Decision: Keep The MVP As A Room-Based Web Adventure

**Rationale**: The product promise depends on narrative exploration, puzzle feedback, bitacora formalization, and web distribution. A room-based adventure limits asset scope, supports mobile landscape, and gives each educational moment a clear stage.

**Alternatives considered**:

- Open RPG map: rejected for scope, collision, asset, and content burden.
- Pure point-and-click web story: rejected because it weakens the "systems you can experiment with" promise.
- Standalone downloadable game: rejected for early distribution and integration friction.

## Decision: Keep Phaser + React As The Runtime Split

**Rationale**: Phaser already owns the playable canvas and can handle movement, collisions, interactables, camera, and puzzle feedback. React already owns text-heavy surfaces, which is critical for readable dialogue, bitacora, mobile controls, videos, exercises, and future account UI.

**Alternatives considered**:

- All UI in Phaser: rejected because long educational text and responsive UI become harder to maintain.
- Godot export to web: rejected for this MVP because the existing project is web-first and already has React integration.
- No game engine: rejected because puzzle feedback, camera, movement, and collisions would be rebuilt by hand.

## Decision: Allow Illustrated Room Backgrounds With Invisible Collisions

**Rationale**: The creator is solo, has no art team, and needs a visually attractive slice quickly. Generated room backgrounds plus collision and hotspot layers can produce coherent scenes faster than a complete premium tileset, while still preserving gameplay contracts.

**Alternatives considered**:

- Full handcrafted tileset first: rejected for initial scope and production risk.
- Pure placeholder rectangles: rejected as the public validation slice needs enough atmosphere to communicate the fantasy.
- 3D/voxel pivot: deferred to visual spikes; not a blocker for this MVP.

## Decision: Use Data-Driven Content Without Building An Editor

**Rationale**: Dialogue, bitacora, rooms, puzzles, messages, and analytics should be inspectable and maintainable as content. A visual editor would slow down the MVP and create a second product before the core experience is validated.

**Alternatives considered**:

- Hardcode chapter flow in Phaser scenes: rejected because it violates content separation and makes future chapters harder.
- Build an authoring tool now: rejected because the team is one person and the first slice can be authored in JSON/TS.

## Decision: Start With Local Progress, Design For Future Cloud Sync

**Rationale**: The user wants cloud progress eventually, but MVP implementation should not be blocked by auth/backend. Local progress is enough for first validation and can mirror future data entities.

**Alternatives considered**:

- Supabase auth from day one: deferred to a later spec because login is not required to validate the first educational loop.
- No persistence at all: rejected because bitacora unlocks and completed puzzle state are central to the product identity.

## Decision: Track A Small Analytics Event Set

**Rationale**: The first product question is whether players start, understand the first puzzle, open bitacora entries, and finish. A compact event set is enough to guide iteration without creating analytics noise.

**Alternatives considered**:

- Full learning telemetry: rejected for MVP complexity.
- No analytics: rejected because success criteria require measuring completion, bitacora use, and player validation.

## Decision: Treat Videos And Exercises As Optional Study Supports

**Rationale**: The game must be complete without videos. Optional study supports let the project serve curiosity-first players and more formal learners without turning gameplay into a class.

**Alternatives considered**:

- Require videos to progress: rejected because it would make the game a course wrapper.
- Avoid videos entirely: rejected because the creator's teaching strength and future content platform are important differentiators.
