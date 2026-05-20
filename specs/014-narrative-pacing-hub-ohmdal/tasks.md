# Tasks: Narrative Pacing Hub Ohmdal

**Input**: Design documents from `specs/014-narrative-pacing-hub-ohmdal/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: No automated TDD requested. Manual QA tasks are included in Polish.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare shared content/type surfaces for narrative pacing work.

- [x] T001 Add narrative and memory event payload types in `src/game/types/events.ts`
- [x] T002 [P] Add narrative analytics event names in `src/game/types/analytics.ts`
- [x] T003 [P] Add content README for memory panel sequences in `src/content/memories/README.md`
- [x] T004 [P] Add placeholder asset README for portraits and memory panels in `public/assets/narrative/README.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before user story implementation.

**CRITICAL**: No user story work can begin until this phase is complete.

- [x] T005 Extend progress state for narrative beats and visited rooms in `src/game/types/progress.ts`
- [x] T006 Update local progress helpers for narrative beat and visited room state in `src/game/systems/progressStore.ts`
- [x] T007 Extend Zustand UI state for active memory panel sequence in `src/store/useGameStore.ts`
- [x] T008 Add memory content loading support in `src/components/game/GameShell.tsx`
- [x] T009 Update analytics storage to accept beat/dialogue/memory metadata in `src/game/systems/analytics.ts`
- [x] T010 [P] Define shared narrative beat content in `src/content/narrative/beats.json`

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Recorrer El Prologo Sin Salto Brusco (Priority: P1) MVP

**Goal**: Route first-time players through hub entry, Roxana statue, office, bitacora, Electronics classroom, and Ohmdal handoff before the puzzle.

**Independent Test**: Start fresh, move through the hub route, and verify the puzzle cannot start before the required narrative bridge.

### Implementation for User Story 1

- [x] T011 [US1] Update hub map interactable flow for statue, office, bitacora and Electronics door in `src/content/maps/roxana-library-hub.map.json`
- [x] T012 [P] [US1] Add first-visit and revisit hub narrative messages in `src/content/messages/hub.json`
- [x] T013 [P] [US1] Add Roxana prologue dialogue beats in `src/content/dialogues/roxana-intro.json`
- [x] T014 [US1] Gate Electronics classroom access behind required prologue beat state in `src/game/scenes/HubScene.ts`
- [x] T015 [US1] Emit narrative beat and analytics events for statue, office, bitacora and classroom handoff in `src/game/scenes/HubScene.ts`
- [ ] T016 [US1] Update journal unlock behavior for bitacora discovery in `src/components/journal/JournalPanel.tsx`
- [x] T017 [US1] Wire narrative beat completion listeners in `src/components/game/GameShell.tsx`
- [ ] T018 [US1] Manually verify Hub -> statue -> office -> bitacora -> Electronics classroom handoff using `specs/014-narrative-pacing-hub-ohmdal/quickstart.md`

**Checkpoint**: User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Sentir El Aula Como Umbral De Mundo (Priority: P1)

**Goal**: Add an Electronics classroom/aula that previews Ohmdal through palette, objects, guide presence, deterioration and portal/world preview before the first puzzle.

**Independent Test**: Enter the Electronics classroom and verify at least three mood cues distinguish it from the hub before puzzle start.

### Implementation for User Story 2

- [x] T019 [P] [US2] Add Electronics classroom map data in `src/content/maps/electronics-classroom.map.json`
- [x] T020 [P] [US2] Add classroom threshold content data in `src/content/worlds/electronics-classroom.json`
- [x] T021 [P] [US2] Add classroom-specific messages and revisit text in `src/content/messages/electronics-classroom.json`
- [x] T022 [P] [US2] Add Ohmdal preview dialogue or ambient beat in `src/content/dialogues/ohmdal-intro.json`
- [x] T023 [US2] Implement `ElectronicsClassroomScene` with player, interactables, mood cues and portal preview in `src/game/scenes/ElectronicsClassroomScene.ts`
- [x] T024 [US2] Register `ElectronicsClassroomScene` in `src/game/createRoxanaGame.ts`
- [x] T025 [US2] Change hub Electronics door to start `ElectronicsClassroomScene` instead of direct Ohmdal threshold in `src/game/scenes/HubScene.ts`
- [x] T026 [US2] Gate first Ohmdal puzzle start behind classroom preview beat in `src/game/scenes/ElectronicsClassroomScene.ts`
- [x] T027 [US2] Update HUD room naming for Electronics classroom in `src/components/hud/HudOverlay.tsx`
- [ ] T028 [US2] Manually verify classroom threshold cues and puzzle handoff using `specs/014-narrative-pacing-hub-ohmdal/quickstart.md`

**Checkpoint**: User Stories 1 and 2 should both work and the puzzle should no longer start abruptly.

---

## Phase 5: User Story 3 - Conversar Con NPCs Con Presencia Visual (Priority: P2)

**Goal**: Support important NPC conversations with a portrait-style React dialogue presentation.

**Independent Test**: Trigger a portrait-enabled Roxana or OHM dialogue and verify readable text on desktop and mobile horizontal.

### Implementation for User Story 3

- [x] T029 [P] [US3] Extend dialogue content shape for `presentation` and `portraitId` in `src/game/types/events.ts`
- [x] T030 [P] [US3] Add portrait metadata to Roxana and OHM dialogue JSON in `src/content/dialogues/roxana-intro.json` and `src/content/dialogues/ohmdal-intro.json`
- [x] T031 [US3] Implement portrait layout mode in `src/components/dialogue/DialogueBox.tsx`
- [x] T032 [US3] Add responsive portrait dialogue styling in `src/components/dialogue/DialogueBox.tsx`
- [x] T033 [US3] Emit portrait dialogue analytics on open/complete in `src/components/dialogue/DialogueBox.tsx`
- [ ] T034 [US3] Manually verify portrait dialogue readability on desktop and mobile horizontal using `specs/014-narrative-pacing-hub-ohmdal/quickstart.md`

**Checkpoint**: Portrait dialogue is usable independently of memory panels.

---

## Phase 6: User Story 4 - Ver Recuerdos Importantes Como Escenas Ilustradas (Priority: P3)

**Goal**: Support lightweight illustrated memory panel sequences for important story moments, using placeholders.

**Independent Test**: Trigger one memory sequence, advance/skip it, and return to gameplay with continuity.

### Implementation for User Story 4

- [x] T035 [P] [US4] Add memory sequence content for Roxana or Ohmdal preview in `src/content/memories/ohmdal-preview.json`
- [x] T036 [P] [US4] Add memory sequence TypeScript types in `src/game/types/memory.ts`
- [x] T037 [US4] Implement `MemoryPanelOverlay` in `src/components/memory/MemoryPanelOverlay.tsx`
- [x] T038 [US4] Wire `memory:start` and `memory:complete` events in `src/components/game/GameShell.tsx`
- [x] T039 [US4] Trigger the first memory panel sequence from the classroom or statue beat in `src/game/scenes/ElectronicsClassroomScene.ts`
- [x] T040 [US4] Emit memory analytics and optional journal unlock on completion in `src/components/memory/MemoryPanelOverlay.tsx`
- [ ] T041 [US4] Manually verify memory panel advance, skip and return-to-gameplay behavior using `specs/014-narrative-pacing-hub-ohmdal/quickstart.md`

**Checkpoint**: Memory panel structure exists with placeholders and can later receive final art.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Validate the full narrative bridge and keep docs/specs aligned.

- [ ] T042 [P] Update MVP notes with the classroom-before-world pacing decision in `docs/MVP_IMPLEMENTATION_NOTES.md`
- [ ] T043 [P] Update vertical slice notes with the new first-play route in `docs/VERTICAL_SLICE_0_1.md`
- [ ] T044 Review all new gameplay dialogue for no direct scientific explanation in `src/content/dialogues/roxana-intro.json` and `src/content/dialogues/ohmdal-intro.json`
- [x] T045 Run `npm run lint`
- [x] T046 Run `npm run build`
- [ ] T047 Perform desktop browser playthrough from fresh state using `specs/014-narrative-pacing-hub-ohmdal/quickstart.md`
- [ ] T048 Perform mobile horizontal browser playthrough using `specs/014-narrative-pacing-hub-ohmdal/quickstart.md`
- [ ] T049 Update task statuses in `specs/014-narrative-pacing-hub-ohmdal/tasks.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Setup completion and blocks all user stories.
- **US1 (Phase 3)**: Depends on Foundational.
- **US2 (Phase 4)**: Depends on Foundational; should follow US1 for final route integration.
- **US3 (Phase 5)**: Depends on Foundational and can proceed after basic dialogue content exists.
- **US4 (Phase 6)**: Depends on Foundational and benefits from US2 classroom trigger points.
- **Polish (Phase 7)**: Depends on all desired stories.

### User Story Dependencies

- **US1**: Required MVP pacing route.
- **US2**: Required to make the aula/world threshold real.
- **US3**: Can be implemented after US1/US2 content IDs exist, but is not required to prove the route.
- **US4**: Can be implemented after classroom or statue trigger points exist.

### Parallel Opportunities

- T002, T003 and T004 can run in parallel.
- T010 can run in parallel with progress/store work after event types exist.
- US1 content tasks T012 and T013 can run in parallel.
- US2 content tasks T019, T020, T021 and T022 can run in parallel.
- US3 metadata task T030 can run in parallel with layout implementation after T029.
- US4 content/types tasks T035 and T036 can run in parallel.
- Polish docs T042 and T043 can run in parallel.

## Parallel Example: User Story 2

```text
Task: "Add Electronics classroom map data in src/content/maps/electronics-classroom.map.json"
Task: "Add classroom threshold content data in src/content/worlds/electronics-classroom.json"
Task: "Add classroom-specific messages and revisit text in src/content/messages/electronics-classroom.json"
Task: "Add Ohmdal preview dialogue or ambient beat in src/content/dialogues/ohmdal-intro.json"
```

## Implementation Strategy

### MVP First

1. Complete Setup and Foundational tasks.
2. Complete US1 and US2.
3. Stop and validate the first-play route before implementing portrait and memory polish.

### Incremental Delivery

1. US1: route no longer jumps directly into puzzle.
2. US2: aula/threshold makes Ohmdal feel like a world entrance.
3. US3: portrait dialogue improves NPC presence.
4. US4: memory panels add story weight to key moments.

### Notes

- Keep final art out of scope.
- Prefer placeholder panels/portraits with strong layout over weak final-looking art.
- Keep formal explanations in the bitacora.
- Avoid hardcoding narrative prose in Phaser scenes.


