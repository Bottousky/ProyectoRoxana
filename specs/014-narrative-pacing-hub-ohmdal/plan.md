# Implementation Plan: Narrative Pacing Hub Ohmdal

**Branch**: `codex/mvp-vertical-slice` | **Date**: 2026-05-20 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/014-narrative-pacing-hub-ohmdal/spec.md`

## Summary

Refine the first-play narrative route so the player enters the hub, meets Roxana through the statue/office/bitacora path, enters an Electronics classroom as a school-side threshold, previews Ohmdal as a damaged world, and only then reaches the first puzzle.

The implementation approach keeps gameplay navigation and room interactions in Phaser while React renders text-heavy and cinematic UI: portrait dialogue, memory panels, journal prompts, and overlay presentation. All new narrative content is data-driven and placeholder-friendly; final portraits, final illustrated panels, backend, login, shop, and additional worlds remain out of scope.

## Technical Context

**Language/Version**: TypeScript in a Next.js/React app

**Primary Dependencies**: Next.js, React, Phaser, Tailwind CSS, Zustand

**Storage**: Existing localStorage-based progress/analytics only; no backend

**Testing**: `npm run lint`, `npm run build`, desktop browser playthrough, mobile horizontal browser playthrough

**Target Platform**: Web browser, desktop and mobile horizontal

**Project Type**: Web app with embedded 2D Phaser game and React UI overlays

**Performance Goals**: Maintain responsive 16:9 gameplay, avoid heavy cinematic assets, keep dialogue/memory UI immediate on mobile

**Constraints**:

- Phaser owns playable rooms, player movement, collisions, interactables, puzzle visuals, and gameplay events.
- React owns dialogue, portrait layout, memory panels, journal, HUD, and mobile controls.
- No direct scientific explanations in gameplay dialogue.
- Narrative content must live in `src/content`, not hardcoded inside Phaser scenes.
- Final art assets are out of scope; placeholders are allowed.
- No backend, login, shop, or additional world implementations.

**Scale/Scope**:

- One refined first-play route.
- One Electronics classroom/aula threshold.
- One Ohmdal preview/transition before the existing first puzzle.
- One portrait dialogue presentation mode.
- One memory panel presentation mode.
- Revisit handling for already-seen beats.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. Spec First

Pass. The feature has a dedicated spec with player-facing behavior, scope, out-of-scope items, event boundaries, acceptance criteria, and QA expectations.

### II. Phaser Owns Gameplay, React Owns Text UI

Pass. The plan keeps room traversal, interactables and puzzle handoff in Phaser, while React renders portrait dialogue, memory panels, journal and overlays.

### III. Narrative Learning, Not Lecturing

Pass. The feature explicitly delays the puzzle for narrative context and forbids formal scientific explanation in gameplay dialogue.

### IV. Small Vertical Slices

Pass. Scope is limited to Hub -> Electronics classroom -> Ohmdal handoff and UI presentation modes with placeholders.

### V. AI-Assisted, Human-Directed Production

Pass. The feature allows placeholders and reference-driven direction, but no final AI-generated assets.

## Project Structure

### Documentation (this feature)

```text
specs/014-narrative-pacing-hub-ohmdal/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── content-schemas.md
│   ├── event-bus.md
│   └── analytics-events.md
├── checklists/
│   └── requirements.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── dialogue/
│   │   └── portrait dialogue overlay/presentation updates
│   ├── memory/
│   │   └── memory panel overlay
│   ├── game/
│   │   └── GameShell event wiring
│   └── hud/
│       └── controls/prompt coordination
├── content/
│   ├── dialogues/
│   │   └── hub/electronics/ohmdal narrative dialogue JSON
│   ├── memories/
│   │   └── placeholder memory panel sequence JSON
│   ├── maps/
│   │   └── electronics classroom/threshold map JSON
│   ├── messages/
│   │   └── classroom and preview messages
│   └── analytics/
│       └── narrative pacing event definitions
├── game/
│   ├── scenes/
│   │   └── ElectronicsClassroomScene or threshold refactor
│   ├── systems/
│   │   └── progress/analytics updates
│   └── types/
│       └── narrative, memory and event types
└── store/
    └── narrative UI state updates
```

**Structure Decision**: Extend the existing single Next.js/React/Phaser project. Add a small React `memory` component area if needed, keep new Phaser room logic isolated from existing Hub/Ohmdal puzzle logic, and keep content under `src/content`.

## Complexity Tracking

No constitution violations requiring complexity justification.

## Phase 0: Research

See [research.md](./research.md).

Key decisions:

- Use a React portrait dialogue mode rather than Phaser text.
- Use lightweight React memory panels with placeholder art slots rather than video/canvas cinematics.
- Model the Electronics classroom as a reusable `Classroom Threshold` route between hub and world.
- Gate the first puzzle behind a narrative beat flag, not behind educational assessment.

## Phase 1: Design & Contracts

See:

- [data-model.md](./data-model.md)
- [contracts/event-bus.md](./contracts/event-bus.md)
- [contracts/content-schemas.md](./contracts/content-schemas.md)
- [contracts/analytics-events.md](./contracts/analytics-events.md)
- [quickstart.md](./quickstart.md)

## Post-Design Constitution Check

Pass. The design keeps the required Phaser/React boundary, preserves narrative learning rules, stays within the Hub + Ohmdal vertical slice, and uses placeholders rather than final production art.
