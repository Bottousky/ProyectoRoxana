# Feature Specification: Aula Ohmdal + Presala Jugable

**Feature Branch**: `020-aula-ohmdal-presala`

**Status**: Completed

## Objetivo

Consolidar el puente escuela -> Ohmdal del vertical slice con una antesala de Electronica y un umbral jugable de Ohmdal a `640x360`, sosteniendo narrativa indirecta y separacion Phaser/React.

## Alcance

- Crear la spec `020-aula-ohmdal-presala` y apuntar Spec Kit a esta feature.
- Migrar `electronics-classroom.map.json` a `640x360` como antesala escolar de Ohmdal.
- Migrar `ohmdal-threshold.map.json` a `640x360` como primer patio jugable de Ohmdal.
- Mantener eventos y beats del tramo:
  - `electronics_classroom_first_entry`
  - `ohmdal_preview_first_wound`
  - `ohmdal_preview_memory_seen`
  - `ohmdal_automaton_after_preview`
  - `ohmdal_first_puzzle_handoff`
  - `ohmdal_threshold_ohm_first_hint`
  - `ohmdal_first_system_touch`
- Mantener el primer puzzle cerrado como prototipo de handoff dentro de Phaser.
- Generar bundles placeholder/reference para:
  - `public/assets/environment/school/electronics-classroom/`
  - `public/assets/environment/ohmdal/threshold/`

## Fuera de alcance

- Implementar Chapter 01 completo de Ohmdal.
- Implementar los 3 puzzles completos de Spec 017.
- Reescribir puzzle como overlay React en esta fase.
- Backend, login, tienda o persistencia nueva.
- Promover arte IA a final sin spec que lo autorice.

## Decisiones tecnicas

- Se conserva runtime `GAME_WIDTH=640`, `GAME_HEIGHT=360`.
- Los mapas de aula y umbral usan `assetBundle` con estado `placeholder_reference`.
- Se preserva Event Bus tipado como contrato Phaser <-> React.
- Se agrega `spawnPoint` de retorno de Sala 3 en Hub para continuidad espacial.
- En revisita de umbral se evita repetir mensaje completo de llegada.

## Reglas narrativas

- OHM no explica teoria formal en gameplay.
- Dialogos y mensajes guian por observacion, metafora y pregunta implicita.
- La formalizacion queda en bitacora.

## Eventos Phaser <-> React

- `room:entered`
- `dialogue:start`
- `dialogue:complete`
- `memory:start`
- `memory:complete`
- `message:show`
- `journal:entry-updated`
- `puzzle:start`
- `puzzle:state-change`
- `puzzle:complete`
- `analytics:track`

## Criterios de aceptacion

1. Sala 3 abre un aula de Electronica a `640x360` con lectura escolar previa a Ohmdal.
2. El portal del aula obliga preview/memoria antes del primer cruce.
3. El umbral de Ohmdal funciona a `640x360` con OHM, linea rota, puesto, automata y mecanismo.
4. El puzzle cerrado sigue funcionando como prototipo tecnico.
5. Reingresos no repiten secuencias intro completas.
6. UI textual sigue en React/HTML.
7. `npm run lint` y `npm run build` pasan.

## QA esperado

- Desktop:
  - recepcion -> despacho -> bitacora -> Sala 3 -> preview -> umbral
  - colisiones, prompts y regresos consistentes
  - puzzle cerrado inicia y resuelve
- Mobile:
  - controles tactiles legibles en aula y umbral
  - overlays no tapan interacciones criticas
- Narrativo:
  - aula se siente antesala escolar
  - umbral se siente mundo roto en primer contacto
  - sin explicaciones cientificas directas en gameplay
