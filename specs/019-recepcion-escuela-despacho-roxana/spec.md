# Feature Specification: Recepcion Escuela + Despacho Roxana

**Feature Branch**: `019-recepcion-escuela-despacho-roxana`

**Status**: Draft

## Objetivo

Consolidar el primer tramo jugable del vertical slice con una recepcion de escuela abandonada y un despacho de Roxana explorable, ambos a resolucion `640x360`, manteniendo el aprendizaje narrativo indirecto y la bitacora como lugar de formalizacion.

## Alcance

- Redisenar `roxana-library-hub.map.json` como recepcion de escuela con acceso prominente al despacho y accesos sellados.
- La sala principal se organiza como hall de planta baja: entrada principal abajo, estatua al centro, cartelera/mostrador detras de la estatua como pared del balcon, doble escalera lateral y acceso al despacho arriba.
- Ohmdal queda asociado a `Sala 3`, la puerta superior derecha; `Sala 1`, `Sala 2` y `Sala 4` permanecen selladas en esta feature.
- Redisenar `roxana-office.map.json` como despacho explorable con pistas de historia ambiental.
- Migrar viewport logico a `640x360`.
- Mantener separacion Phaser/React (mundo en Phaser, UI textual en React).
- Consolidar beats narrativos:
  - `school_reception_first_entry`
  - `roxana_presence_first_echo`
  - `roxana_office_first_entry`
  - `hub_bitacora_found`
- Mantener y extender eventos Phaser <-> React existentes sin acoplar UI al runtime de escena.

## Fuera de alcance

- Implementar puzzles nuevos de Ohmdal.
- Redisenar los cuatro mundos.
- Backend, login, tienda o persistencia nueva.
- Arte final generado con IA.

## Decisiones tecnicas

- `GAME_WIDTH` y `GAME_HEIGHT` pasan a `640x360`.
- Se conserva Event Bus tipado como canal de coordinacion Phaser <-> React.
- La bitacora se desbloquea solo por interaccion intencional con escritorio en despacho.
- El reingreso al despacho no repite el primer beat emocional; usa mensaje de revisita.

## Reglas narrativas

- Roxana/presencias no explican ciencia de forma directa.
- Dialogos de gameplay con preguntas, ecos emocionales y pistas indirectas.
- La formalizacion conceptual queda en bitacora.

## Eventos Phaser <-> React

- `room:entered`
- `interaction:start`
- `dialogue:start`
- `dialogue:complete`
- `message:show`
- `journal:entry-unlocked`
- `journal:open`
- `analytics:track`

## Criterios de aceptacion

1. El juego inicia en recepcion de escuela a `640x360`.
2. Colisiones y prompts funcionan en recepcion y despacho.
3. La presencia de Roxana activa beat inicial y analitica `observed_roxana_presence`.
4. El despacho se abre desde recepcion y comunica historia ambiental por interaccion.
5. La bitacora se desbloquea al inspeccionar el escritorio, no automaticamente.
6. Reingresar al despacho muestra mensaje de revisita, sin repetir primer beat emocional.
7. Al volver desde el despacho, el jugador aparece junto a la puerta del despacho en el hall, no en la entrada principal.
8. Build y lint pasan.

## QA esperado

- Desktop:
  - movimiento con teclado
  - prompts legibles
  - flujo recepcion -> despacho -> recepcion
  - desbloqueo de bitacora y revisita de despacho
- Mobile:
  - controles tactiles funcionales
  - texto legible en dialogo, mensajes y bitacora
  - overlays no tapan interacciones criticas
