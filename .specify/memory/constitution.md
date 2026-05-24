# Proyecto Roxana Constitution

## Core Principles

### I. Spec First

Every meaningful feature starts from a written spec before implementation. Specs must define the problem, player-facing behavior, out-of-scope items, architecture boundaries, acceptance criteria, and QA expectations.

Implementation work must trace back to an active spec. If a feature changes direction, update the spec before changing the code.

### II. Phaser Owns Gameplay, React Owns Text UI

Phaser is responsible for the playable world: maps, player, NPCs, collision, interactables, visual puzzle feedback, cameras, and gameplay events.

React is responsible for text-heavy and interface-heavy surfaces: dialogue, journal, HUD, inventory, menus, mobile controls, future login, future progression UI, and future external links.

Dense narrative text, journal content, educational explanations, and menus must not be rendered inside Phaser.

### III. Narrative Learning, Not Lecturing

Proyecto Roxana is an educational narrative game, but gameplay dialogue must not feel like a classroom lecture.

Roxana and guide characters ask questions, react emotionally, suggest observation, and use metaphor. Formal explanations live in the journal, not in character dialogue.

Any spec that adds dialogue, journal entries, puzzles, or world content must preserve this split.

### IV. Small Vertical Slices

Build in thin, playable increments. A slice is acceptable when it can be opened in browser, moved through, interacted with, and verified against criteria.

Avoid broad systems that are not needed by the current spec. Do not add backend, login, store, final assets, or extra worlds unless the active spec explicitly includes them.

### V. AI-Assisted, Human-Directed Production

AI may help explore, document, prompt, generate references, and prepare asset variants, but the spec and project rules remain authoritative.

AI-generated assets must have a declared function, visual identity rules, scale constraints, and acceptance criteria. If a spec only allows placeholders, final assets must not be added.

## Technical Constraints

- Main app: Next.js, React, TypeScript, Tailwind CSS, Zustand.
- Gameplay runtime: Phaser.
- Aspect ratio: 16:9.
- The historical prototype uses a 384x216 logical viewport and 16-unit base grid. These values are compatibility context, not a permanent production mandate.
- Active feature specs must declare their own logical viewport, world/map size, camera behavior, and design grid. For the current Ohmdal chapter spec, the target logical viewport is 640x360, chapter maps may be larger than the viewport, and the design grid reference is 32 units.
- Phaser canvas must scale to its container without distortion.
- Communication between Phaser and React must use typed events.
- Narrative content should live in `src/content`, not inside Phaser scenes.
- No backend, login, store, or final production assets until a spec explicitly introduces them.

## Development Workflow

1. Start or update a spec.
2. Clarify ambiguous requirements before planning.
3. Create a technical plan only after the spec is clear.
4. Break the plan into tasks.
5. Implement only the tasks required by the spec.
6. Run QA gates:
   - `npm run lint`
   - `npm run build`
   - browser verification for playable UI changes
7. Keep docs and specs in sync with meaningful changes.

## Governance

This constitution supersedes ad-hoc implementation preferences. When it conflicts with a feature request, the feature spec must explicitly call out the exception and justify it.

Changes to the constitution require a documented update in `.specify/memory/constitution.md` and should be reflected in `agents.md` or project docs when they affect day-to-day work.

**Version**: 1.1.0 | **Ratified**: 2026-05-13 | **Last Amended**: 2026-05-24
