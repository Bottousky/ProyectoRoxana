# Implementation Plan: Product Vertical Slice

**Branch**: `codex/alternativas` | **Date**: 2026-05-19 | **Spec**: `specs/013-product-vertical-slice/spec.md`

**Input**: Feature specification from `specs/013-product-vertical-slice/spec.md`

## Summary

Build the first Roxana MVP around a short, playable web vertical slice: the player discovers the abandoned school hub, reaches Roxana's office, obtains the empty bitacora, enters the Electronica/Ohmdal threshold, solves the first open/closed circuit puzzle, and unlocks simple plus technical bitacora entries.

The implementation keeps the existing Next.js + React + Phaser architecture. Phaser owns the playable world, collisions, interactables, camera, and puzzle feedback. React owns dialogue, bitacora, HUD, mobile controls, study surfaces, and future links. Content remains data-driven in `src/content/**`, with typed contracts for Event Bus, journal entries, puzzle definitions, and analytics milestones.

## Technical Context

**Language/Version**: TypeScript 5 on Next.js 16 and React 19

**Primary Dependencies**: Phaser 4, Tailwind CSS 4, Zustand 5, existing React UI components

**Storage**: Local JSON/TS content in `src/content/**`; local progress via browser storage for MVP; future cloud persistence is out of scope for this feature

**Testing**: `npm run lint`, `npm run build`, manual browser QA on desktop and mobile-horizontal viewport

**Target Platform**: Web desktop and mobile browser, landscape-first gameplay

**Project Type**: Web application with embedded 2D playable runtime

**Performance Goals**: Maintain 60 fps target at gameplay base `512x288`, preserve 16:9 aspect ratio, keep text legible through React/HTML

**Constraints**: No backend, login, store, monetization, four-world expansion, or final production asset commitment in this feature. Dialogue cannot directly explain scientific concepts. Formal explanation must live in the bitacora.

**Scale/Scope**: One vertical slice path: school hub, Roxana office, bitacora acquisition, Electronica/Ohmdal threshold, one circuit puzzle, two-layer bitacora entry, analytics events.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Spec First**: PASS. `specs/013-product-vertical-slice/spec.md` exists and defines user stories, requirements, success criteria, and scope.
- **Phaser Gameplay / React Text UI**: PASS. Gameplay stays in Phaser; dialogue, bitacora, HUD, study links, and controls stay in React.
- **Narrative Learning, Not Lecturing**: PASS. The first electronics concept is discovered through puzzle feedback; formal explanation is in the bitacora.
- **Small Vertical Slices**: PASS. Scope is bounded to one path and one puzzle; future worlds, backend, store, and full content platform are excluded.
- **AI-Assisted, Human-Directed Production**: PASS. Visual production may use generated room art or placeholders, but the spec and acceptance criteria remain authoritative.

## Project Structure

### Documentation (this feature)

```text
specs/013-product-vertical-slice/
|-- spec.md
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   |-- analytics-events.md
|   |-- content-schemas.md
|   `-- event-bus.md
|-- checklists/
|   `-- requirements.md
`-- tasks.md
```

### Source Code (repository root)

```text
src/
|-- app/
|   |-- page.tsx
|   `-- globals.css
|-- components/
|   |-- dialogue/
|   |-- game/
|   |-- hud/
|   `-- journal/
|-- content/
|   |-- dialogues/
|   |-- journal/
|   |-- maps/
|   |-- messages/
|   `-- puzzles/
|-- game/
|   |-- entities/
|   |-- puzzles/
|   |-- scenes/
|   |-- systems/
|   `-- types/
|-- store/
`-- styles/

public/assets/
|-- characters/
|-- environment/
`-- ui/
```

**Structure Decision**: Use the existing single Next.js project. Add feature-specific content and systems under the established `src/content`, `src/game`, `src/components`, and `public/assets` boundaries. Do not introduce a backend, second app, or custom editor for this MVP.

## Phase 0: Research Summary

Research decisions are captured in `research.md`.

Key decisions:

- Room-based web adventure remains the MVP format.
- Phaser + React remains the runtime split.
- Illustrated-room backgrounds with invisible collisions are allowed for MVP if they respect gameplay contracts.
- Content should be data-driven but not require a visual editor yet.
- Progress starts local; cloud account persistence waits for a later spec.
- Analytics are a small milestone list, not a full learning data warehouse.

## Phase 1: Design Summary

Design artifacts:

- `data-model.md`: player progress, school hub, world simulation, bitacora entries, puzzles, learning events, rooms and interactables.
- `contracts/event-bus.md`: Phaser-to-React and React-to-Phaser event expectations.
- `contracts/content-schemas.md`: content shapes for bitacora, puzzle, room, dialogue, and messages.
- `contracts/analytics-events.md`: validation event names and payload rules.
- `quickstart.md`: manual QA route for the MVP.

## Post-Design Constitution Check

- **Spec First**: PASS. Design artifacts trace to `spec.md`.
- **Phaser Gameplay / React Text UI**: PASS. Contracts preserve Event Bus boundaries.
- **Narrative Learning, Not Lecturing**: PASS. Puzzle and dialogue contracts separate indirect guidance from formal bitacora explanation.
- **Small Vertical Slices**: PASS. Data model includes future entities but tasks must implement only the first slice.
- **AI-Assisted, Human-Directed Production**: PASS. Art direction remains constrained by declared gameplay function and QA.

## Complexity Tracking

No constitution violations.
