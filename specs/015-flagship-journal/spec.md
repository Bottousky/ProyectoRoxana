# Feature Specification: Flagship Journal

**Feature Branch**: `codex/mvp-vertical-slice`

**Created**: 2026-05-20

**Status**: Draft

**Input**: User description: "Crear una spec propia para la bitacora flagship. Debe centrarse en Ohmdal, pero sentar las bases para todo lo esperado de la bitacora. La bitacora es central de la experiencia y no debe sentirse como MVP pobre: debe abrir como un cuaderno real, con animaciones de pagina, sensacion de hoja, trazos que parecen dibujarse, formulas, cuentas, graficos y entradas que aparecen por capas mientras el jugador explora y restaura sistemas. Quedan fuera por ahora editor libre, escritura manual, drag-and-drop y cuaderno sandbox."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Abrir Una Bitacora Que Se Siente Central (Priority: P1)

Como jugador, quiero abrir la bitacora y sentir que estoy manipulando un cuaderno real, valioso y vivo, para que la experiencia de aprendizaje se sienta parte del mundo y no una pantalla de texto separada del juego.

**Why this priority**: La bitacora es una pieza identitaria del proyecto. Si se siente administrativa o provisoria, se degrada una de las promesas mas fuertes del juego.

**Independent Test**: Puede probarse abriendo la bitacora desde el recorrido inicial y verificando apertura, cierre, doble pagina, navegacion y sensacion visual general sin depender del resto de los mundos.

**Acceptance Scenarios**:

1. **Given** el jugador desbloqueo la bitacora en el prologo, **When** la abre, **Then** aparece como un cuaderno fisico con presencia visual, transicion cuidada y lectura clara.
2. **Given** la bitacora esta abierta, **When** el jugador navega sus paginas, **Then** percibe una experiencia de libro/cuaderno y no una lista de paneles planos.
3. **Given** el jugador juega en desktop o mobile horizontal, **When** abre la bitacora, **Then** la experiencia conserva legibilidad y no tapa de forma confusa controles o informacion critica.

---

### User Story 2 - Ver Una Entrada De Ohmdal Construirse Por Capas (Priority: P1)

Como jugador, quiero que la entrada de Ohmdal se complete progresivamente mientras observo, pruebo y restauro el mundo, para sentir que la bitacora entiende lo que vivi y no que me entrega una leccion terminada.

**Why this priority**: La progresion por capas es la clave que une juego, narrativa y formalizacion. Sin eso, la bitacora pierde su magia y vuelve a parecer contenido desbloqueado sin relacion con la experiencia.

**Independent Test**: Puede probarse recorriendo el slice de Ohmdal y verificando que una misma entrada gane observaciones, esquemas y formalizacion en momentos distintos del recorrido.

**Acceptance Scenarios**:

1. **Given** el jugador ve por primera vez el umbral o sistema de Ohmdal, **When** la bitacora se actualiza, **Then** aparece una primera capa breve y no la entrada completa.
2. **Given** el jugador interactua con un sistema que casi responde, **When** la bitacora se actualiza de nuevo, **Then** suma una relacion nueva o un esquema relevante.
3. **Given** el jugador completa la primera restauracion del sistema, **When** vuelve a abrir la bitacora, **Then** encuentra una version ampliada de la entrada con cierre narrativo y capa tecnica opcional.

---

### User Story 3 - Entender Sin Que El Juego Explique De Mas (Priority: P2)

Como jugador, quiero que la bitacora mezcle texto, formulas, cuentas, diagramas y anotaciones visuales, para comprender mejor lo vivido sin romper el tono misterioso ni caer en una clase frontal.

**Why this priority**: La bitacora tiene que ser el lugar donde la precision formal aparece con belleza y sentido, no una simple transcripcion textual del gameplay.

**Independent Test**: Puede probarse con una sola entrada de Ohmdal que combine nota narrativa, croquis, marcas manuscritas, formula y capa tecnica.

**Acceptance Scenarios**:

1. **Given** una entrada de Ohmdal ya tiene varias capas desbloqueadas, **When** el jugador la inspecciona, **Then** encuentra mas de un tipo de contenido visual o academico.
2. **Given** el jugador solo quiere seguir jugando, **When** abre la entrada, **Then** puede captar la capa simple sin verse obligado a estudiar la capa tecnica.
3. **Given** el jugador quiere profundizar, **When** expande o navega la parte tecnica, **Then** puede acceder a formulas, relaciones y graficos legibles y coherentes.

---

### User Story 4 - Contar Con Una Base Reusable Para Futuras Entradas (Priority: P3)

Como equipo del proyecto, queremos que la entrada flagship de Ohmdal defina un sistema reutilizable para futuras bitacoras, para no resolver desde cero cada nueva pagina o mundo.

**Why this priority**: La bitacora va a crecer mucho y necesita una base reusable, pero esa base tiene que nacer a partir de una entrada concreta y de alta calidad, no de una abstraccion vacia.

**Independent Test**: Puede probarse revisando que la spec defina estructura de entrada, tipos de bloque, estados de reveal y eventos de actualizacion sin depender de contenido exclusivo de Ohmdal.

**Acceptance Scenarios**:

1. **Given** la entrada flagship de Ohmdal esta especificada, **When** se revisa su estructura, **Then** se puede distinguir claramente entre experiencia visual, contenido, capas y desencadenantes.
2. **Given** otro mundo necesite una entrada futura, **When** se toma esta spec como base, **Then** la estructura se puede reutilizar sin heredar detalles obligatorios solo de electronica.

### Edge Cases

- Si el jugador abre la bitacora antes de haber desbloqueado capas suficientes, la pagina debe sentirse intencionalmente incompleta y no rota o vacia por error.
- Si el jugador completa eventos de Ohmdal en orden no esperado dentro del slice, la bitacora debe seguir mostrar la mejor capa disponible sin perder coherencia.
- Si una formula o grafico aun no tiene version final, debe existir una representacion placeholder elegante y legible.
- Si el jugador reabre muchas veces la misma entrada, la animacion no debe volverse lenta ni obstaculizar la consulta rapida.
- Si el jugador esta en mobile horizontal, la pagina debe priorizar lectura y navegacion por encima del realismo de hoja extrema.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The journal MUST be presented as a diegetic notebook/book experience rather than a plain text panel or administrative modal.
- **FR-002**: The journal MUST open and close through a dedicated transition that communicates physical presence and narrative importance.
- **FR-003**: The journal MUST support a double-page reading mode for its flagship presentation.
- **FR-004**: The journal MUST support page navigation that feels like moving through a notebook, including an intentional page transition between spreads.
- **FR-005**: The journal MUST preserve readability on desktop and mobile horizontal layouts while keeping a notebook identity.
- **FR-006**: The flagship Ohmdal entry MUST reveal its content progressively across multiple gameplay beats instead of appearing complete at once.
- **FR-007**: The flagship Ohmdal entry MUST include at least four reveal stages: first impression, system observation, relation/pattern recognition, and post-restoration completion.
- **FR-008**: Each reveal stage MUST be tied to an explicit gameplay or narrative trigger rather than only to manual page navigation.
- **FR-009**: The journal MUST support both a simple reading layer and a technical/formal layer within the same entry.
- **FR-010**: The simple layer MUST summarize lived experience in short, readable, non-school-like language.
- **FR-011**: The technical layer MUST support formal content such as formulas, counts, diagrams, labels, or graphs without replacing the simple layer.
- **FR-012**: The flagship Ohmdal entry MUST support more than one content block type, including narrative text and at least two of the following: handwritten annotation, formula, schematic, graph, illustration, or callout.
- **FR-013**: The system MUST support content blocks appearing with a drawn-in or progressively revealed effect when appropriate to the beat.
- **FR-014**: The journal MUST keep content definition separate from gameplay scene logic so entries, layers, and reveal triggers can be maintained outside Phaser scenes.
- **FR-015**: The feature MUST define the event contract used to open the journal, unlock an entry, unlock a reveal stage, and close/return to gameplay.
- **FR-016**: The feature MUST define a reusable entry structure that future worlds can adopt even if their visual tone or academic content differ from Ohmdal.
- **FR-017**: The journal MUST allow the player to reopen an already unlocked entry and see all layers currently earned without replaying the reveal sequence in full every time.
- **FR-018**: The journal MUST define graceful placeholders for unfinished illustrations, graphs, or formulas so the flagship flow remains shippable before final art.

### Narrative Requirements

- **NR-001**: The journal should feel like a sensitive artifact of the school that understands and organizes what the player has lived.
- **NR-002**: The journal should never feel like it is grading or lecturing the player.
- **NR-003**: The flagship Ohmdal entry should make the player feel "ah, this is what I just discovered" rather than "I received a lesson."
- **NR-004**: The reveal of the journal should reinforce mystery, craft, and care, not generic fantasy magic.
- **NR-005**: The Ohmdal entry should preserve the world's voice: mechanisms almost waking, paths interrupted, and knowledge recovered through observation.

### Experience Requirements

- **ER-001**: Opening the journal should feel premium and memorable even in the MVP.
- **ER-002**: The notebook illusion should remain strong without requiring freeform editing or sandbox behavior.
- **ER-003**: The player should be able to consult the journal quickly after the first wow moment without long forced animation every time.
- **ER-004**: Page composition should feel crafted and varied, not like repeated cards dropped on a paper texture.

### Out Of Scope

- Freeform journal editing by the player.
- Handwriting input by mouse, touch, or stylus.
- Drag-and-drop interactions inside the journal.
- Sandbox notebook behavior.
- Final content production for other worlds beyond lightweight structural reuse.
- Backend, cloud sync, social sharing, or account systems for the journal.

### Key Entities *(include if feature involves data)*

- **Journal Shell**: The visual and navigational notebook container, including cover, spread, page transitions, and open/close states.
- **Journal Entry**: A multi-page or single-spread unit of content tied to a world, concept, or discovery.
- **Reveal Stage**: A progressive content layer unlocked by a specific gameplay or narrative event.
- **Content Block**: A typed unit within a page, such as narrative text, annotation, formula, schematic, graph, illustration, or callout.
- **Simple Layer**: The journal layer that summarizes lived experience in short, narratively coherent language.
- **Technical Layer**: The layer that formalizes the same discovery through notation, diagrams, formulas, or explicit relations.
- **Journal Trigger**: A gameplay or narrative event that opens the journal, unlocks an entry, or advances a reveal stage.
- **Journal Placeholder Asset**: A temporary but intentional representation of an unfinished visual or academic block.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time player can open the journal and understand within 10 seconds that it is a notebook/book artifact rather than a generic modal or menu.
- **SC-002**: The flagship Ohmdal entry reveals at least four distinct stages across the slice and each stage is tied to a defined trigger.
- **SC-003**: In manual QA, the journal experience on desktop and mobile horizontal remains readable without breaking the notebook framing.
- **SC-004**: In manual QA, the flagship Ohmdal entry contains at least three different block types and clearly separates simple reading from technical expansion.
- **SC-005**: A returning player can reopen the flagship entry and access already-earned layers in under 5 seconds without replaying every reveal animation in full.
- **SC-006**: Content, reveal stages, and triggers for the flagship entry are discoverable in structured content artifacts and not embedded as opaque strings in scene code.
- **SC-007**: The journal's first-use experience is memorable enough that internal reviewers describe it as a core part of the game rather than auxiliary UI.

## Assumptions

- The flagship implementation focuses on a single hero entry for Ohmdal while defining reusable structures for future entries.
- The journal lives in the React/UI layer above gameplay and is triggered from gameplay through explicit events.
- Final freeform tooling for content authoring is out of scope; entries may initially be authored through structured local content files.
- The project may use placeholders for illustrations or diagrams as long as they preserve composition, readability, and emotional intent.
- The journal must feel close to endgame quality in experience, even if its internal authoring tools remain intentionally simple during the MVP.

## Technical Decisions

- Phaser remains responsible for emitting journal-related events, while React owns notebook presentation, page composition, and layered reveal rendering.
- The flagship entry should be modeled in a data-driven way so reveal stages, block types, and page content can evolve without hardcoding text inside scenes.
- The feature should support formulas, diagrams, and graphic marks as first-class content types rather than flattening them into a single text blob.
- Premium page feel is a product requirement, but the implementation must remain compatible with mobile horizontal constraints and controllable performance.

## Expected Phaser <-> React Events

- `journal:open` when gameplay or the player requests the notebook.
- `journal:close` when the player exits the notebook and gameplay regains focus.
- `journal:entry-unlocked` when a new entry becomes available.
- `journal:entry-updated` when an existing entry gains a new reveal stage.
- `journal:stage-revealed` when a specific stage completes its visible reveal.
- `journal:page-changed` when the player navigates to another spread or page.
- `journal:layer-toggled` when the player expands or collapses technical content.
- `analytics:track` for first open, repeat open, stage reveal, page turn, technical layer expansion, and entry completion.

## QA Expected

- Desktop browser QA of the first unlock/open experience.
- Mobile horizontal QA of readability, navigation, and page composition.
- Verify the flagship Ohmdal entry updates across its reveal stages in the expected beats.
- Verify reopened entries show earned content without forcing the full reveal sequence every time.
- Verify the simple layer remains readable without opening technical details.
- Verify technical blocks remain legible and visually integrated with the notebook framing.
