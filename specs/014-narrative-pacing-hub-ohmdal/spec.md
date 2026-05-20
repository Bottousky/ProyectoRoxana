# Feature Specification: Narrative Pacing Hub Ohmdal

**Feature Branch**: `codex/mvp-vertical-slice`

**Created**: 2026-05-20

**Status**: Draft

**Input**: User description: "Refinar el ritmo narrativo del recorrido inicial. El jugador debe atravesar entrada al hub, estatua de Roxana, despacho, bitacora, aula/sala de Electronica y recien ahi el ingreso al mundo Ohmdal. Cada aula correspondiente a un mundo funciona como antesala: cambia paleta, sonido, personajes o presencias del mundo y previsualiza rapidamente que algo no esta bien. Evitar saltar de golpe al puzzle. Explorar dialogos con retrato para NPCs y momentos ilustrados tipo recuerdo/cinematica para escenas importantes, inspirados en recursos narrativos de RPGs clasicos pero con identidad propia. Dejar arte final para mas adelante."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Recorrer El Prologo Sin Salto Brusco (Priority: P1)

Como jugador nuevo, quiero entrar a la escuela, reconocer la estatua de Roxana, encontrar la bitacora y llegar al aula de Electronica antes de entrar al mundo, para sentir que el primer puzzle surge de una historia y no aparece como un ejercicio aislado.

**Why this priority**: Es el problema central detectado: la experiencia actual entra demasiado rapido al puzzle de Ohmdal y pierde misterio, expectativa y contexto emocional.

**Independent Test**: Se puede probar completando solo el recorrido Hub -> estatua -> despacho -> bitacora -> aula de Electronica -> umbral de Ohmdal, sin necesitar arte final ni puzzles nuevos.

**Acceptance Scenarios**:

1. **Given** un jugador inicia una partida nueva, **When** entra por la puerta sur del hub, **Then** el primer recorrido disponible lo orienta hacia la estatua, el despacho de Roxana y la bitacora antes de presentar Ohmdal como destino.
2. **Given** el jugador encuentra la bitacora, **When** vuelve o avanza hacia la sala de Electronica, **Then** el juego comunica que la sala/aula es una antesala distinta del mundo, no el mundo completo.
3. **Given** el jugador cruza desde el aula de Electronica hacia Ohmdal, **When** aparece el primer sistema roto, **Then** el puzzle se siente como consecuencia de una situacion narrativa ya presentada.

---

### User Story 2 - Sentir El Aula Como Umbral De Mundo (Priority: P1)

Como jugador, quiero que el aula de Electronica anticipe visual y narrativamente Ohmdal, para entender que cada sala de la escuela contiene una puerta hacia un mundo-simulacion con identidad propia.

**Why this priority**: La arquitectura narrativa del producto depende de que el hub no sea solo un menu con puertas. Cada aula debe tener atmosfera, promesa y deterioro propio.

**Independent Test**: Se puede probar visitando solo el aula de Electronica y verificando que contiene senales claras de Ohmdal y de que algo esta mal.

**Acceptance Scenarios**:

1. **Given** el jugador entra al aula de Electronica, **When** observa el espacio, **Then** percibe un cambio de paleta, ambiente y objetos respecto del hub.
2. **Given** el jugador explora el aula, **When** interactua con elementos principales, **Then** recibe indicios narrativos de mecanismos dormidos, energia interrumpida o presencia de un automata/guia.
3. **Given** el jugador aun no entro a Ohmdal, **When** mira el acceso al mundo, **Then** ve una previsualizacion breve de que el mundo existe y esta descompuesto.

---

### User Story 3 - Conversar Con NPCs Con Presencia Visual (Priority: P2)

Como jugador, quiero que las conversaciones relevantes con Roxana, OHM u otros NPCs tengan retratos o composicion de dialogo mas expresiva, para sentir presencia de personaje sin perder el mapa ni la jugabilidad.

**Why this priority**: Las imagenes de referencia muestran una solucion fuerte para dar personalidad: mundo visible, retrato grande y caja de dialogo legible. Esto puede elevar la narrativa sin requerir animaciones complejas.

**Independent Test**: Se puede probar con una conversacion de Roxana o OHM usando placeholder de retrato y caja de dialogo React, sin arte final.

**Acceptance Scenarios**:

1. **Given** el jugador inicia una conversacion importante con un NPC, **When** aparece el dialogo, **Then** se muestra una composicion con retrato o presencia visual diferenciada y texto legible.
2. **Given** la conversacion ocurre dentro del juego, **When** el dialogo esta activo, **Then** el mapa queda visible o sugerido de fondo y la UI no tapa informacion critica.
3. **Given** el jugador juega en mobile horizontal, **When** aparece el dialogo con retrato, **Then** el texto sigue siendo comodo de leer y los controles no compiten con la caja.

---

### User Story 4 - Ver Recuerdos Importantes Como Escenas Ilustradas (Priority: P3)

Como jugador, quiero que los momentos importantes de historia aparezcan como recuerdos breves o laminas ilustradas, para recibir lore y emocion sin convertir el juego en una clase o una pared de texto.

**Why this priority**: Las escenas tipo recuerdo permiten contar caida, pasado de Roxana, origen de los mundos o abandono de la escuela con mas fuerza que dialogos largos.

**Independent Test**: Se puede probar con un recuerdo placeholder de Roxana o del aula de Electronica, usando 2 o 3 placas ilustradas temporales y texto minimo.

**Acceptance Scenarios**:

1. **Given** el jugador activa un momento narrativo importante, **When** inicia el recuerdo, **Then** ve una secuencia breve de imagenes/placas con texto corto.
2. **Given** el recuerdo termina, **When** el jugador vuelve al control, **Then** la escena jugable conserva continuidad espacial y emocional con lo mostrado.
3. **Given** el recuerdo usa placeholders, **When** se reemplace por arte final en el futuro, **Then** la estructura narrativa y criterios de lectura siguen siendo validos.

### Edge Cases

- Si el jugador intenta ir directo al aula/mundo antes de encontrar la bitacora, el juego debe responder con una pista narrativa breve, no con un bloqueo arbitrario.
- Si el jugador cierra rapido un dialogo, la informacion critica debe quedar recuperable en bitacora o mensajes de entorno.
- Si el jugador revisita el aula de Electronica, no debe repetirse toda la introduccion completa; debe haber estados de primera visita y revisita.
- Si un retrato o placa ilustrada final no existe aun, debe usarse placeholder intencional sin bloquear el flujo.
- Si la pantalla es mobile horizontal pequena, retratos y escenas deben priorizar legibilidad sobre espectacularidad.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The experience MUST define a narrative path from hub entry to Roxana statue, Roxana office, bitacora discovery, Electronics classroom, and Ohmdal threshold before the first Ohmdal puzzle is presented.
- **FR-002**: The Electronics classroom MUST exist as a distinct pre-world room/aula between the hub and Ohmdal.
- **FR-003**: The Electronics classroom MUST communicate a different mood from the hub through at least three of the following: palette shift, ambient text, sound cue placeholder, world-specific object, dormant mechanism, guide presence, portal preview, or environmental deterioration.
- **FR-004**: The first Ohmdal puzzle MUST be delayed until after the player has received at least one narrative cue that the world is damaged or interrupted.
- **FR-005**: Important NPC conversations MUST support a presentation mode with character portrait or equivalent large visual presence, speaker name, dialogue text, and player advance control.
- **FR-006**: Dialogue presentation MUST remain legible and usable on desktop and mobile horizontal viewports.
- **FR-007**: Important story moments MUST support a lightweight illustrated memory/cinematic mode composed of one or more panels, captions, and a clear return to gameplay.
- **FR-008**: Gameplay dialogue MUST obey the Roxana narrative rule: no direct scientific explanations, formulas, school-like definitions, or UI instructions spoken by characters.
- **FR-009**: Formal explanation unlocked by the narrative sequence MUST remain in the bitacora, with simple and technical layers when relevant.
- **FR-010**: Revisiting already-seen narrative beats MUST use shortened or alternate content to avoid forcing the same introduction repeatedly.
- **FR-011**: The feature MUST define content IDs for dialogues, environmental messages, memory panels, and transitions so narrative content can remain separate from gameplay logic.
- **FR-012**: The feature MUST define analytics events for entering the Electronics classroom, viewing the Ohmdal preview, starting an NPC portrait dialogue, viewing a memory panel, skipping/finishing a memory, and starting the first puzzle after the narrative bridge.

### Narrative Requirements

- **NR-001**: The aula is not the world; it is the school-side threshold that hints at the world.
- **NR-002**: Ohmdal should be introduced as a place with its own wound before it becomes a puzzle board.
- **NR-003**: Roxana should frame mystery and memory, not explain electricity.
- **NR-004**: OHM/guide of Ohmdal should appear as a presence of the world, not as a tutorial teacher.
- **NR-005**: The player should feel "I crossed into something important" before being asked to solve anything.

### Out Of Scope

- Final illustrated art assets.
- Final character portraits.
- New backend, login, shop, or cloud persistence.
- Full implementation of all four world classrooms.
- New educational concepts beyond the existing first closed-circuit idea.
- Long cinematic production or complex animation system.

### Key Entities *(include if feature involves data)*

- **Narrative Beat**: A step in the prologue route, such as statue encounter, office discovery, bitacora unlock, classroom entry, portal preview, or puzzle handoff.
- **Classroom Threshold**: A room connected to the hub that previews a world through mood, objects, guide presence, and portal access.
- **NPC Portrait Dialogue**: A dialogue presentation state with speaker, portrait placeholder, text, current line, and completion behavior.
- **Memory Panel Sequence**: A short illustrated/captioned narrative moment used for important story beats.
- **Revisit State**: Saved or session-level knowledge that determines whether a player sees full introduction content or abbreviated return content.
- **Narrative Analytics Event**: A tracked moment used to understand pacing, drop-off, and whether players reach the puzzle after the story bridge.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time player can complete the narrative route from hub entry to first Ohmdal puzzle start in 3 to 7 minutes without external explanation.
- **SC-002**: The first Ohmdal puzzle is not reachable before at least one classroom/world preview beat has occurred.
- **SC-003**: In manual QA, the Electronics classroom is distinguishable from the hub by at least three visible or textual cues even with placeholder art.
- **SC-004**: In desktop and mobile horizontal QA, dialogue text remains readable without overlapping gameplay controls or critical interaction prompts.
- **SC-005**: A revisiting player can re-enter the Electronics classroom and reach the puzzle handoff without replaying the entire introduction.
- **SC-006**: Narrative content for the feature is discoverable in content files/spec artifacts and not embedded as opaque text inside gameplay scene code.

## Assumptions

- The first implementation may use placeholder portraits, placeholder memory panels, simple sound labels, palette overlays, and blockout rooms.
- The current MVP still focuses on Hub + Ohmdal; other aulas may be represented only by locked doors or references.
- The tone follows `docs/ROXANA_VOICE_AND_VISUAL_GUIDE.md`.
- Existing Phaser/React separation remains valid: gameplay spaces and interactions live in Phaser; dialog, memory panels, bitacora and UI surfaces live in React.
- The Pokemon-style references are inspiration for composition and pacing only; the final visual language must be original to Roxana.

## Technical Decisions

- Phaser emits narrative and interaction events; React renders dialogue, portrait layout, memory panels, bitacora and overlays.
- Narrative content lives in structured content files, not hardcoded in Phaser scenes.
- Placeholder assets are acceptable when they preserve layout, pacing and acceptance criteria.
- The classroom/threshold should be implemented in a way that can be reused for future world aulas.

## Expected Phaser <-> React Events

- `room:entered` for entering the Electronics classroom.
- `dialogue:start` for portrait-enabled NPC dialogue.
- `dialogue:complete` for returning control or advancing the narrative beat.
- `memory:start` for illustrated memory/cinematic panels.
- `memory:complete` for returning control and optionally unlocking bitacora content.
- `journal:entry-unlocked` for bitacora entries generated by the prologue route.
- `analytics:track` for narrative pacing events.
- `puzzle:started` only after the classroom/preview bridge has completed.

## QA Expected

- Desktop browser playthrough from new game to first puzzle handoff.
- Mobile horizontal playthrough from new game to first puzzle handoff.
- Verify first-visit and revisit behavior.
- Verify text readability for dialogue portrait mode.
- Verify memory panel sequence can be skipped or advanced without losing required information.
- Verify no gameplay dialogue directly explains the closed-circuit concept.
