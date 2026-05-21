# Implementation Plan: Flagship Journal

**Branch**: `codex/mvp-vertical-slice` | **Date**: 2026-05-20 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/015-flagship-journal/spec.md`

**Note**: This plan covers the flagship journal experience for Ohmdal and the reusable foundation for future journal entries.

## Summary

Build the journal as a premium React overlay that feels like a living notebook rather than a utility panel. The implementation will replace the current right-side article list with a book shell, staged entry reveal, layered page composition, and typed content blocks. The first shipping target is a hero Ohmdal entry that reveals progressively across narrative and puzzle beats while establishing a reusable content model for future worlds.

## Technical Context

**Language/Version**: TypeScript 5, React 19, Next.js 16

**Primary Dependencies**: React, Next.js App Router, Zustand, Phaser 4, Tailwind CSS 4

**Storage**: Local structured content files under `src/content/journal` and local progress state for unlocked entries/stages

**Testing**: `npm run lint`, `npm run build`, browser verification on desktop and mobile horizontal

**Target Platform**: Desktop and mobile horizontal web browsers

**Project Type**: Web application with Phaser gameplay runtime and React UI shell

**Performance Goals**:

- journal first-open feels smooth on mid-range mobile devices;
- page transitions and reveal animations remain responsive;
- opening an already unlocked entry feels near-instant after first-use wow moment.

**Constraints**:

- journal must remain in React, not Phaser;
- typed Phaser <-> React events only;
- no freeform editor, handwriting input, drag-and-drop, or sandbox;
- content must remain data-driven and maintainable outside scene code;
- mobile horizontal readability takes priority over extreme realism in page physics.

**Scale/Scope**:

- one flagship Ohmdal entry for the slice;
- reusable shell and content model for future entries;
- support at least four reveal stages and at least three block types in the hero entry.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Spec First**: Pass. Active feature spec is `015-flagship-journal`.
- **Phaser Owns Gameplay, React Owns Text UI**: Pass. The journal remains a React overlay above gameplay, with Phaser only emitting events.
- **Narrative Learning, Not Lecturing**: Pass. The simple layer summarizes lived experience; formal explanation remains in the technical layer of the journal, not in gameplay dialogue.
- **Small Vertical Slices**: Pass. The feature is scoped to one hero Ohmdal entry plus reusable journal foundation.
- **AI-Assisted, Human-Directed Production**: Pass. The plan allows placeholders where needed, but no final AI art is assumed or required by the implementation.

Post-design re-check: still passes. No constitution exception is needed.

## Project Structure

### Documentation (this feature)

```text
specs/015-flagship-journal/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── journal-content-contract.md
│   └── journal-events-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── app/
├── components/
│   ├── game/
│   ├── hud/
│   ├── dialogue/
│   ├── memory/
│   └── journal/
├── content/
│   ├── journal/
│   ├── narrative/
│   ├── messages/
│   └── analytics/
├── game/
│   ├── scenes/
│   ├── systems/
│   └── types/
├── store/
└── styles/
```

**Structure Decision**: Keep the journal fully inside `src/components/journal` with content definitions under `src/content/journal` and typed contracts in `src/game/types`. Phaser scenes and systems may unlock or update journal state, but they must not own page layout or journal copy.

## Phase 0: Research Highlights

See [research.md](./research.md) for final decisions. The short version:

- Use a React overlay as the journal shell.
- Use structured content blocks instead of flattened text entries.
- Use CSS/SVG composition for page feel and drawn-in effects.
- Add formula support through a dedicated math renderer instead of text or raster images.
- Favor controlled page transitions over heavy physical page simulation in the first slice.

## Phase 1: Design Focus

1. Replace the current `JournalPanel` article list with a book-shell architecture.
2. Expand the current journal data model from `simple`/`technical` strings to staged page content.
3. Introduce reveal-stage progression that can be advanced by gameplay beats.
4. Define the journal event contract and analytics events needed by the flagship flow.
5. Establish one complete Ohmdal hero entry as the canonical template for future worlds.

## Complexity Tracking

No constitution violations or special complexity justifications are required at this stage.
