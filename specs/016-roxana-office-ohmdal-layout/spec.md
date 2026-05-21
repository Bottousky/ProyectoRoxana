# Feature Specification: Roxana Office And Ohmdal Layout

**Feature Branch**: `016-roxana-office-ohmdal-layout`

**Created**: 2026-05-20

**Status**: Draft

**Input**: User description: "Mover la exposicion de la estatua al despacho de Roxana, crear un despacho explorable, actualizar dialogos y escena visual de Ohmdal para que sean coherentes con humanos + automatas, y hacer que el primer puzzle sea consecuencia del mundo roto, no algo aparecido."

## User Scenarios & Testing

### User Story 1 - Descubrir El Despacho De Roxana (Priority: P1)

El jugador entra desde la sala principal al despacho de Roxana y entiende, por objetos inspeccionables, que la escuela se abandono por desconexion colectiva y que la bitacora registra experiencias propias.

**Why this priority**: La bitacora y Roxana son el corazon del vertical slice; si aparecen como una escena suelta, la experiencia pierde peso.

**Independent Test**: Desde la sala principal, interactuar con la puerta norte debe llevar a un despacho explorable con al menos tres objetos narrativos y la bitacora desbloqueable.

**Acceptance Scenarios**:

1. **Given** el jugador esta en la sala principal, **When** interactua con la puerta del despacho, **Then** entra a una sala nueva y no se dispara automaticamente la bitacora.
2. **Given** el jugador esta en el despacho, **When** inspecciona notas, mapa y mesa, **Then** recibe fragmentos narrativos separados sin explicacion cientifica directa.
3. **Given** el jugador encuentra la bitacora por primera vez, **When** interactua con la mesa, **Then** se desbloquea la entrada central y puede abrirse la bitacora.

---

### User Story 2 - Reducir La Estatua A Presencia Misteriosa (Priority: P1)

La estatua de Roxana deja de explicar la escuela y funciona como presencia simbolica: una inscripcion breve, inquietante y coherente con que el despacho contiene la informacion importante.

**Why this priority**: Evita duplicar exposicion y corrige el tono inicial.

**Independent Test**: Interactuar con la estatua debe mostrar un dialogo corto que invita a subir al despacho sin explicar puertas, mundos ni bitacora.

**Acceptance Scenarios**:

1. **Given** el jugador observa la estatua, **When** avanza el dialogo, **Then** lee como maximo dos lineas de misterio.
2. **Given** el jugador ya vio la estatua, **When** vuelve a observarla, **Then** no recibe un tutorial encubierto.

---

### User Story 3 - Entrar A Ohmdal Como Mundo Vivo Roto (Priority: P1)

El jugador ve Ohmdal como un mundo habitado por humanos y automatas donde la electricidad fue tratada como magia heredada. La preview muestra su promesa original y su ruptura actual antes del primer puzzle.

**Why this priority**: El primer puzzle solo se siente justo si el mundo ya establecio que los sistemas rotos afectan habitantes y automatismos.

**Independent Test**: Desde el aula de electronica, observar el umbral debe mostrar una escena visual de varios paneles y luego un dialogo de OHM que reconoce que esa vision era lo que Ohmdal debia ser.

**Acceptance Scenarios**:

1. **Given** el jugador observa el portal de Ohmdal por primera vez, **When** completa la preview, **Then** OHM reacciona a la diferencia entre la vision ideal y el presente roto.
2. **Given** el jugador cruza a Ohmdal, **When** llega al primer espacio jugable, **Then** la sala contiene indicios de habitantes, automatas y un sistema roto antes de forzar el puzzle.
3. **Given** el jugador toca el primer sistema, **When** se activa el puzzle, **Then** la bitacora avanza por observacion y el mensaje presenta el problema como una consecuencia del mundo.

### Edge Cases

- Si el jugador intenta entrar a Ohmdal sin bitacora, la puerta debe seguir sugiriendo que falta un registro, no abrirse.
- Si el jugador reentra al despacho despues de encontrar la bitacora, la escena debe permitir consulta y salida sin repetir la secuencia inicial.
- Si la preview de Ohmdal ya fue vista, el portal debe permitir cruzar sin volver a mostrarla automaticamente.
- Si el jugador vuelve al hub desde despacho u Ohmdal, los controles y prompts deben quedar limpios.

## Requirements

### Functional Requirements

- **FR-001**: El sistema MUST incluir un despacho de Roxana como sala explorable separada de la sala principal.
- **FR-002**: El sistema MUST mover la exposicion sobre la escuela, el estado del edificio y la bitacora desde la estatua hacia objetos inspeccionables dentro del despacho.
- **FR-003**: El sistema MUST mantener la estatua como interaccion breve y atmosferica, sin explicar sistemas, puertas ni reglas de progreso.
- **FR-004**: El sistema MUST desbloquear la bitacora central desde el despacho mediante una interaccion intencional del jugador.
- **FR-005**: El sistema MUST permitir volver del despacho a la sala principal.
- **FR-006**: La preview de Ohmdal MUST presentar un mundo habitado por humanos y automatas, con tono de promesa/archivo promocional, y cerrar con una grieta que muestre el presente roto.
- **FR-007**: Los dialogos de OHM MUST estar alineados con el canon actual: automata antiguo, memoria incompleta, habitantes que confunden electricidad con magia y guia por observacion.
- **FR-008**: El primer puzzle de Ohmdal MUST tener preparacion ambiental antes de activarse, incluyendo indicios visuales o mensajes de sistema roto.
- **FR-009**: Las escenas Phaser MUST emitir eventos; los textos narrativos deben vivir en JSON.
- **FR-010**: La implementacion MUST preservar controles desktop/mobile, bloqueo de UI y eventos de bitacora existentes.

### Key Entities

- **Roxana Office**: Sala interior con mesa, bitacora, notas, mapa y salida al hub.
- **Office Interactable**: Objeto del despacho que muestra mensaje o desbloquea bitacora.
- **Ohmdal Preview**: Secuencia visual de recuerdos que muestra el ideal y la ruptura del mundo.
- **Ohmdal Threshold**: Primer espacio jugable de Ohmdal, antesala/patio taller donde el puzzle aparece como problema local.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Un jugador nuevo puede encontrar la bitacora entrando al despacho e interactuando con la mesa en menos de 2 minutos desde el spawn inicial.
- **SC-002**: La estatua tiene como maximo 2 lineas de dialogo y no contiene instrucciones sobre puertas, bitacora o conceptos educativos.
- **SC-003**: La preview de Ohmdal contiene al menos 5 paneles y menciona o muestra humanos, automatas, sistemas cotidianos y ruptura actual.
- **SC-004**: Antes del primer puzzle, el jugador puede inspeccionar al menos 2 indicios del mundo roto que no son el switch ni el mecanismo final.
- **SC-005**: Lint y build completan sin errores.

## Assumptions

- El despacho usara placeholders visuales con el mismo sistema de mapas JSON y dibujo por rectangulos hasta que haya arte final.
- La preview mantiene placeholders genericos; no se agregan assets finales.
- No se implementa todavia un mapa grande completo de Ohmdal; esta feature deja una base de layout y pacing para expandir.
- No se agregan nuevos conceptos educativos formales fuera de la bitacora 015.
