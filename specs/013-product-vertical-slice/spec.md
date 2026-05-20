# Feature Specification: Product Vertical Slice

**Feature Branch**: `codex/alternativas`

**Created**: 2026-05-19

**Status**: Draft

**Input**: User description: "Alinear el estado del proyecto con la vision consolidada: una aventura educativa web donde la escuela funciona como hub, Electronica/Ohmdal es el primer mundo, la bitacora formaliza lo aprendido en dos niveles y el primer objetivo publico es un vertical slice corto, pulido y medible."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Descubrir La Escuela (Priority: P1)

Un jugador nuevo entra a la experiencia, comprende que esta en una escuela abandonada con historia propia, encuentra indicios de Roxana y descubre la bitacora como objeto central de progreso personal.

**Why this priority**: Sin esta introduccion, el proyecto se vuelve una coleccion de puzzles sin identidad narrativa.

**Independent Test**: Puede probarse con una sesion donde el jugador inicia la experiencia, explora la sala principal, llega al despacho y obtiene la bitacora sin necesitar explicaciones externas.

**Acceptance Scenarios**:

1. **Given** un jugador nuevo, **When** inicia la experiencia, **Then** entiende que la escuela es el hub y que antes tuvo vida academica.
2. **Given** que el jugador llega al despacho de Roxana, **When** interactua con la bitacora, **Then** la reconoce como registro personal de conocimiento.
3. **Given** que la bitacora esta vacia, **When** el jugador la obtiene, **Then** queda claro que se completara con lo que el jugador viva y comprenda.

---

### User Story 2 - Resolver El Circuito Dormido (Priority: P1)

Un jugador entra a la antesala de Electronica/Ohmdal y resuelve un problema basado en circuito abierto/cerrado mediante observacion, prueba y feedback del mundo.

**Why this priority**: Este puzzle valida la promesa principal: aprender de rebote por experimentacion, sin clase tradicional.

**Independent Test**: Puede probarse con un jugador que no conozca la explicacion formal y deba activar un mecanismo descubriendo que la energia necesita un camino completo.

**Acceptance Scenarios**:

1. **Given** un mecanismo apagado, **When** el jugador prueba configuraciones incompletas, **Then** el mundo comunica que algo no fluye sin castigar con vidas.
2. **Given** que el jugador cierra el camino correcto, **When** activa el sistema, **Then** el mecanismo despierta y el mundo reacciona de forma clara.
3. **Given** que el puzzle se resuelve, **When** aparece la nueva entrada de bitacora, **Then** la entrada simple resume lo vivido sin sonar a clase.

---

### User Story 3 - Profundizar Sin Bloquear (Priority: P2)

Un jugador puede abrir una version tecnica de la bitacora, ver una formalizacion mas precisa y acceder a videos o ejercicios opcionales sin que eso sea obligatorio para continuar jugando.

**Why this priority**: El proyecto debe servir tanto para curiosidad como para estudio formal, pero el modo estudio no debe invadir el juego.

**Independent Test**: Puede probarse verificando que el jugador puede terminar el primer recorrido sin ver videos, y que tambien puede abrir material tecnico si quiere profundizar.

**Acceptance Scenarios**:

1. **Given** una entrada de bitacora desbloqueada, **When** el jugador elige la vista tecnica, **Then** encuentra explicacion formal, diagramas o formulas cuando correspondan.
2. **Given** una entrada tecnica, **When** el jugador ignora videos y ejercicios, **Then** puede seguir jugando.
3. **Given** un jugador que quiere estudiar, **When** abre los recursos opcionales, **Then** encuentra una ruta clara para profundizar.

---

### User Story 4 - Medir La Validacion (Priority: P3)

El creador del proyecto puede saber si los jugadores empiezan, avanzan, resuelven el primer puzzle, abren la bitacora y terminan la demo.

**Why this priority**: El primer objetivo publico es validar interes y comprension, no monetizar.

**Independent Test**: Puede probarse con una sesion interna donde cada hito principal queda registrado en una lista de eventos esperados.

**Acceptance Scenarios**:

1. **Given** una sesion de juego, **When** el jugador alcanza un hito principal, **Then** ese avance queda disponible para analisis posterior.
2. **Given** que el jugador falla o abandona el puzzle, **When** ocurre ese evento, **Then** el creador puede distinguirlo de una finalizacion exitosa.
3. **Given** que el jugador abre material tecnico o videos, **When** ocurre esa accion, **Then** el creador puede evaluar si la formalizacion interesa.

### Edge Cases

- Si un jugador no lee la bitacora simple, debe poder continuar, pero probablemente le cueste mas reconocer patrones posteriores.
- Si un jugador no entiende el primer puzzle, el mundo y los personajes deben ofrecer pistas indirectas antes de bloquear la experiencia.
- Si el jugador esta en mobile horizontal, la experiencia debe conservar legibilidad y control basico.
- Si un jugador no quiere ver videos, la experiencia debe seguir siendo completa.
- Si un jugador quiere estudiar formalmente, la bitacora tecnica debe ofrecer suficiente precision para no sentirse superficial.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The experience MUST present the school as the persistent central hub and emotional anchor of the project.
- **FR-002**: The experience MUST introduce Roxana as an absent central figure through traces, memories, statue, images or similar non-physical presence.
- **FR-003**: The experience MUST let the player obtain a personal empty bitacora that becomes the record of learned concepts.
- **FR-004**: The experience MUST include a first Electronica/Ohmdal sequence centered on a circuit open/closed discovery.
- **FR-005**: The first puzzle MUST be solvable through observation, experimentation and world feedback, without requiring a formal lecture.
- **FR-006**: Dialogue MUST avoid direct formal explanations of scientific concepts during gameplay.
- **FR-007**: The bitacora MUST provide a simple layer for gameplay recall and a technical layer for formal study.
- **FR-008**: Videos and exercises MUST be optional supports rather than mandatory progression gates.
- **FR-009**: Failure MUST be communicated through world reaction, character reaction or puzzle state, not through lives or hard punishment.
- **FR-010**: The experience MUST track enough progress milestones to evaluate onboarding, puzzle completion, bitacora use and demo completion.
- **FR-011**: The first public target MUST prioritize validation with players over monetization.
- **FR-012**: The vertical slice MUST remain bounded to school introduction, Roxana office, bitacora, Electronica/Ohmdal entry and the first circuit puzzle unless a later spec expands scope.

### Key Entities *(include if feature involves data)*

- **Player Profile**: Represents a player journey, progress, unlocked entries and optional diagnostic knowledge.
- **School Hub**: Represents the central persistent space that changes as the player restores knowledge and life.
- **World Simulation**: Represents a subject-specific world created by past teachers for experimentation.
- **Bitacora Entry**: Represents a learned concept with simple and technical views.
- **Puzzle**: Represents an experimental system with observable state, feedback and completion criteria.
- **Learning Event**: Represents a tracked player action or milestone used to validate interest and comprehension.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At least 80% of first-time testers can obtain the bitacora without external explanation.
- **SC-002**: At least 70% of first-time testers can complete the first circuit puzzle within 10 minutes.
- **SC-003**: At least 60% of testers can describe after playing that a complete path is needed for the mechanism to work.
- **SC-004**: At least 40% of testers voluntarily open either the simple or technical bitacora entry after solving the puzzle.
- **SC-005**: The demo can be completed in 10 to 20 minutes by a first-time player.
- **SC-006**: The first public validation target is 1000 players before prioritizing paid content.

## Assumptions

- The first public vertical slice focuses on Electronica/Ohmdal before any other world.
- The player is a normal student or visitor, not a chosen hero with combat fantasy.
- The initial tone is warm and mysterious, with subtle dystopia rather than explicit sermons.
- The project may use generated visual material, placeholders or hybrid room art as long as the player-facing result is coherent.
- The experience must work without videos, while videos remain useful for formal explanation or guidance.
- Optional study and evaluation features can exist outside the main game flow.
