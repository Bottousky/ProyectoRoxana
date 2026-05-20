# Research: Narrative Pacing Hub Ohmdal

## Decision: Add An Electronics Classroom Before Ohmdal

**Rationale**: The current route jumps too quickly from the school hub into the Ohmdal puzzle. A classroom threshold gives the player a school-side space that previews the world identity, creates anticipation, and communicates that each hub room is more than a menu door.

**Alternatives considered**:

- Send player directly from hub to Ohmdal puzzle: rejected because it caused the pacing concern this feature addresses.
- Add only more hub dialogue: rejected because it does not establish the aula/world structure strongly enough.
- Build all four classrooms now: rejected because it violates the vertical slice scope.

## Decision: Use React For Portrait Dialogue

**Rationale**: Dialogue is text-heavy and must be legible on desktop and mobile. React already owns dialogue and UI overlays, so a portrait presentation mode can extend the existing dialogue system without moving text rendering into Phaser.

**Alternatives considered**:

- Phaser-rendered dialogue boxes: rejected because project rules keep dense text UI in React.
- Full-screen visual novel mode for every conversation: rejected because it would obscure the playable map too often.
- Simple existing message panel only: rejected because important NPC moments need stronger presence.

## Decision: Use Lightweight Memory Panel Sequences

**Rationale**: Important story beats benefit from illustrated or placeholder panels with short captions. This supports the "recuerdo" idea without requiring final animation, video, or complex cinematics.

**Alternatives considered**:

- Long cutscenes: rejected because they are expensive and slow the MVP.
- Pure dialogue lore dumps: rejected because they fight the desired emotional/visual pacing.
- Immediate final AI art: rejected because this spec only allows placeholders and structure.

## Decision: Gate Puzzle Start Behind Narrative Beat Completion

**Rationale**: The player should not reach the first puzzle until the classroom/Ohmdal preview communicates that something is wrong. A simple narrative beat flag is enough and avoids educational gating.

**Alternatives considered**:

- Lock with a formal quiz/diagnostic: rejected because it feels like school and is out of scope.
- Leave puzzle always accessible: rejected because it preserves the current abrupt entry problem.
- Use inventory item gating: rejected because inventory is not part of the current MVP.

## Decision: Store First-Visit/Revisit State In Existing Progress

**Rationale**: The route needs to avoid replaying full introductions on revisit. Existing local progress is enough for MVP behavior.

**Alternatives considered**:

- Session-only memory: rejected because reloads would replay introductions too often.
- Backend persistence: rejected by current project scope.
- No revisit state: rejected because it breaks acceptance criteria.

## Decision: Keep Sound As Placeholder Metadata

**Rationale**: The aula should specify sound intent, but implementing final audio is not necessary for this slice. Placeholder fields keep direction available for later.

**Alternatives considered**:

- Add final sound assets now: rejected because art/audio finalization is deferred.
- Ignore sound entirely: rejected because the aula mood includes audio direction.
