# Tasks: Product Vertical Slice

**Input**: Design documents from `specs/013-product-vertical-slice/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: No automated TDD suite is required by the spec. Validation tasks use `npm run lint`, `npm run build`, and the manual QA path in `quickstart.md`.

**Organization**: Tasks are grouped by user story so each increment can be implemented and tested independently.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare the MVP content and runtime boundaries without changing product scope.

- [X] T001 Create MVP content folders in `src/content/puzzles/`, `src/content/progress/`, and `src/content/analytics/`
- [X] T002 [P] Create MVP asset placeholder manifest notes in `public/assets/environment/ohmdal/README.md`
- [X] T003 [P] Create MVP implementation notes in `docs/MVP_IMPLEMENTATION_NOTES.md`
- [X] T004 Align active feature reference in `agents.md` with `specs/013-product-vertical-slice/plan.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core typed contracts and shared systems that all stories depend on.

**CRITICAL**: No user story work should begin until this phase is complete.

- [X] T005 Update game event contracts for journal unlocks, puzzle state, analytics, and new scene IDs in `src/game/types/events.ts`
- [X] T006 Update typed event usage if needed for new event payloads in `src/game/systems/eventBus.ts`
- [X] T007 Extend journal entry types for simple and technical layers in `src/game/types/journal.ts`
- [X] T008 Create puzzle domain types for circuit components and puzzle state in `src/game/types/puzzle.ts`
- [X] T009 Create progress domain types for local MVP progress in `src/game/types/progress.ts`
- [X] T010 Create analytics event type definitions from the contract in `src/game/types/analytics.ts`
- [X] T011 Create local progress store helpers in `src/game/systems/progressStore.ts`
- [X] T012 Create analytics tracking adapter with local debug sink in `src/game/systems/analytics.ts`
- [X] T013 Update global game store for bitacora mode, unlocked entries, and puzzle status in `src/store/useGameStore.ts`
- [ ] T014 Update preload or content loading conventions for MVP data files in `src/game/scenes/PreloadScene.ts`

**Checkpoint**: Event, progress, journal, puzzle, and analytics contracts are ready.

---

## Phase 3: User Story 1 - Descubrir La Escuela (Priority: P1) MVP

**Goal**: A new player can discover the abandoned school, identify Roxana as the absent central figure, reach the office, and obtain the empty bitacora.

**Independent Test**: Start the app, explore the hub, interact with Roxana/statue/office, open the bitacora, and confirm no external explanation is needed.

### Implementation for User Story 1

- [X] T015 [P] [US1] Define the MVP school hub room data with Roxana statue, office interactable, solids, and prompts in `src/content/maps/roxana-library-hub.map.json`
- [X] T016 [P] [US1] Add discovery and office dialogue content with indirect guidance in `src/content/dialogues/roxana-intro.json`
- [X] T017 [P] [US1] Add hub inspection and office messages in `src/content/messages/hub.json`
- [X] T018 [P] [US1] Add initial central bitacora entries for empty bitacora and Roxana office in `src/content/journal/central.json`
- [X] T019 [US1] Implement bitacora unlock on office discovery in `src/game/scenes/HubScene.ts`
- [X] T020 [US1] Emit `entered_school`, `opened_roxana_office`, and `found_bitacora` events from hub interactions in `src/game/scenes/HubScene.ts`
- [X] T021 [US1] Update journal UI to show locked, unlocked, empty, and focused states in `src/components/journal/JournalPanel.tsx`
- [X] T022 [US1] Update HUD prompts for school, statue, and office interactions in `src/components/hud/HudOverlay.tsx`
- [X] T023 [US1] Persist bitacora discovery and last room locally through `src/game/systems/progressStore.ts`
- [ ] T024 [US1] Verify US1 against the quickstart discovery path in `specs/013-product-vertical-slice/quickstart.md`

**Checkpoint**: The school discovery slice is playable and independently demoable.

---

## Phase 4: User Story 2 - Resolver El Circuito Dormido (Priority: P1)

**Goal**: A player enters the Electronica/Ohmdal threshold and solves the first open/closed circuit puzzle through experimentation and feedback.

**Independent Test**: Reach the electronics threshold, try an incomplete circuit, observe non-punitive feedback, close the path, and wake the mechanism.

### Implementation for User Story 2

- [X] T025 [P] [US2] Create Electronica/Ohmdal threshold room data in `src/content/maps/ohmdal-threshold.map.json`
- [X] T026 [P] [US2] Create closed-circuit puzzle data in `src/content/puzzles/closed-circuit-001.json`
- [X] T027 [P] [US2] Add Ohmdal guide dialogue with questions and metaphorical hints in `src/content/dialogues/ohmdal-intro.json`
- [X] T028 [P] [US2] Add circuit puzzle feedback messages in `src/content/messages/ohmdal.json`
- [X] T029 [US2] Create reusable circuit puzzle evaluator in `src/game/puzzles/closedCircuitPuzzle.ts`
- [X] T030 [US2] Create electronics threshold scene or route integration in `src/game/scenes/ElectronicsThresholdScene.ts`
- [X] T031 [US2] Load puzzle data and render puzzle components in `src/game/scenes/ElectronicsThresholdScene.ts`
- [X] T032 [US2] Implement incomplete circuit feedback without lives or hard failure in `src/game/scenes/ElectronicsThresholdScene.ts`
- [X] T033 [US2] Implement closed circuit success feedback and mechanism wake state in `src/game/scenes/ElectronicsThresholdScene.ts`
- [X] T034 [US2] Connect hub portal or blocked gate transition to the electronics threshold in `src/game/scenes/HubScene.ts`
- [X] T035 [US2] Emit `entered_electronics_room`, `started_puzzle_closed_circuit`, `failed_puzzle_closed_circuit`, and `completed_puzzle_closed_circuit` in `src/game/scenes/ElectronicsThresholdScene.ts`
- [X] T036 [US2] Persist completed circuit puzzle state in `src/game/systems/progressStore.ts`
- [ ] T037 [US2] Verify US2 against the quickstart puzzle path in `specs/013-product-vertical-slice/quickstart.md`

**Checkpoint**: The first electronics puzzle is playable and independently testable.

---

## Phase 5: User Story 3 - Profundizar Sin Bloquear (Priority: P2)

**Goal**: A player can open simple and technical bitacora views, then optionally access videos or exercises without blocking the game.

**Independent Test**: Complete the first puzzle, open the simple entry, switch to technical view, ignore optional links, and continue.

### Implementation for User Story 3

- [X] T038 [P] [US3] Add world bitacora entry for closed circuit with simple and technical content in `src/content/journal/ohmdal.json`
- [X] T039 [P] [US3] Add optional study resource metadata for video and exercises in `src/content/journal/ohmdal.json`
- [X] T040 [US3] Update journal content loading to include central and world entries in `src/components/journal/JournalPanel.tsx`
- [X] T041 [US3] Add simple/technical segmented view controls in `src/components/journal/JournalPanel.tsx`
- [X] T042 [US3] Unlock the closed-circuit bitacora entry after puzzle completion in `src/game/scenes/ElectronicsThresholdScene.ts`
- [X] T043 [US3] Emit `opened_light_entry`, `opened_formal_entry`, `clicked_video`, and `completed_optional_exercise` from bitacora interactions in `src/components/journal/JournalPanel.tsx`
- [X] T044 [US3] Confirm optional links never block game continuation in `src/store/useGameStore.ts`
- [ ] T045 [US3] Verify US3 against the quickstart bitacora path in `specs/013-product-vertical-slice/quickstart.md`

**Checkpoint**: Bitacora formalization works as optional depth, not a progression wall.

---

## Phase 6: User Story 4 - Medir La Validacion (Priority: P3)

**Goal**: The creator can inspect whether players start, progress, solve the first puzzle, open bitacora entries, and finish the demo.

**Independent Test**: Play the MVP path and confirm each required analytics event is recorded once at the expected trigger point.

### Implementation for User Story 4

- [X] T046 [P] [US4] Create approved analytics event catalog in `src/content/analytics/events.json`
- [X] T047 [US4] Wire `started_game` from app startup in `src/components/game/GameShell.tsx`
- [X] T048 [US4] Wire `opened_bitacora` and journal view events in `src/components/journal/JournalPanel.tsx`
- [X] T049 [US4] Wire `finished_demo` after the MVP completion moment in `src/game/scenes/ElectronicsThresholdScene.ts`
- [X] T050 [US4] Add a development analytics inspector or console summary in `src/game/systems/analytics.ts`
- [X] T051 [US4] Verify the analytics event list against `specs/013-product-vertical-slice/contracts/analytics-events.md`

**Checkpoint**: MVP validation events can be inspected without adding a production analytics vendor.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Validate the full MVP path and keep docs/code aligned.

- [ ] T052 [P] Update implementation notes with final MVP decisions in `docs/MVP_IMPLEMENTATION_NOTES.md`
- [ ] T053 [P] Update vertical slice status after implementation in `docs/VERTICAL_SLICE_0_1.md`
- [ ] T054 Validate narrative rule compliance for all new dialogue in `src/content/dialogues/`
- [ ] T055 Validate desktop browser playthrough against `specs/013-product-vertical-slice/quickstart.md`
- [ ] T056 Validate mobile landscape playthrough against `specs/013-product-vertical-slice/quickstart.md`
- [ ] T057 Run lint validation and address issues in `package.json`
- [ ] T058 Run production build validation and address issues in `package.json`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Setup completion and blocks all user stories.
- **US1 (Phase 3)**: Depends on Foundational.
- **US2 (Phase 4)**: Depends on Foundational and benefits from US1 portal/hub flow.
- **US3 (Phase 5)**: Depends on US2 puzzle completion.
- **US4 (Phase 6)**: Depends on event names from Foundational and can be completed after US1-US3 trigger points exist.
- **Polish (Phase 7)**: Depends on all desired stories.

### User Story Dependencies

- **US1**: MVP starting increment. Can be demoed alone.
- **US2**: Requires the base runtime contracts and a path from hub to electronics.
- **US3**: Requires puzzle completion to unlock the first world bitacora entry.
- **US4**: Requires trigger points from the playable path.

### Parallel Opportunities

- T002 and T003 can run in parallel.
- T015-T018 can run in parallel.
- T025-T028 can run in parallel.
- T038 and T039 can run in parallel.
- T046 can run while US1-US3 implementation proceeds, after T010 and T012 exist.
- T052 and T053 can run in parallel during polish.

---

## Parallel Example: User Story 2

```text
Task: "Create Electronica/Ohmdal threshold room data in src/content/maps/ohmdal-threshold.map.json"
Task: "Create closed-circuit puzzle data in src/content/puzzles/closed-circuit-001.json"
Task: "Add Ohmdal guide dialogue with questions and metaphorical hints in src/content/dialogues/ohmdal-intro.json"
Task: "Add circuit puzzle feedback messages in src/content/messages/ohmdal.json"
```

---

## Implementation Strategy

### MVP First

1. Complete Phase 1 and Phase 2.
2. Complete US1 and validate school + bitacora discovery.
3. Complete US2 and validate the first playable learning loop.
4. Complete US3 and validate bitacora simple/technical depth.
5. Complete US4 once trigger points exist.
6. Run polish and QA.

### Incremental Delivery

1. School discovery demo.
2. Electronics threshold and circuit puzzle demo.
3. Bitacora formalization demo.
4. Analytics and public validation demo.

### Solo Developer Strategy

Work sequentially by phase. Avoid starting visual polish, cloud login, editor tooling, monetization, or additional worlds until the first circuit loop is playable end to end.
