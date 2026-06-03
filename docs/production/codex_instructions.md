# Codex Instructions — Proyecto Roxana MVP

Antes de escribir código, leer esta documentación en orden:

1. `docs/README.md`
2. `docs/canon/00_manifesto.md`
3. `docs/canon/01_lore_global.md`
4. `docs/canon/02_personajes_globales.md`
5. `docs/worlds/ohmdal/00_world_bible.md`
6. `docs/worlds/ohmdal/01_unidad_1_ley_de_ohm.md`
7. `docs/production/asset_manifest.json`
8. `docs/production/decisions_log.md`
9. `docs/production/open_questions.md`

## Reglas de trabajo

- No inventar lore, personajes, reglas educativas ni eventos narrativos que contradigan `docs/`.
- Si falta información, crear una pregunta en `docs/production/open_questions.md`.
- Si se toma una decisión de diseño, registrarla en `docs/production/decisions_log.md`.
- Implementar primero con placeholders si hace falta, pero dejar el código preparado para reemplazar assets.
- El gameplay debe experimentar conceptos antes de formalizarlos.
- La Ley de Ohm no debe aparecer como fórmula antes del evento de la Puerta de Ohm.
- La bitácora formaliza después de la experiencia jugable.

## Alcance del MVP vertical slice

Implementar una primera versión jugable de Ohmdal Unidad 1:

1. Hall de escuela.
2. Despacho de Roxana y obtención de bitácora.
3. Aula de Electrónica y proyector institucional.
4. Portal a Ohmdal.
5. Plaza apagada.
6. Encuentro con Edda.
7. Puzzle para reactivar a Ohm.
8. Taller de Maese Lumen.
9. Puzzle de piedra de freno.
10. Evento Puerta de Ohm.
11. Mini-puzzles de aplicación.
12. Campana final.
13. Bitácora con formalización de Ley de Ohm.

## Sistemas sugeridos

- `SceneFlowSystem` para avance entre escenas.
- `DialogueSystem` con datos externos.
- `InteractionSystem` para objetos interactivos.
- `JournalSystem` para bitácora.
- `CircuitPuzzleSystem` para tensión, resistencia, corriente y estados.
- `FlagSystem` para progreso narrativo.

## CircuitPuzzleSystem mínimo

Debe poder representar:

- circuito abierto/cerrado;
- tensión `V`;
- resistencia `R`;
- corriente calculada `I = V / R` si el circuito está cerrado;
- umbral mínimo;
- zona correcta;
- umbral de sobrecorriente/fusible.

La UI puede ser inicialmente una aguja, barra o indicador simple.

## Asset pipeline

Usar el manifest:

- `docs/production/asset_manifest.json`

Cuando se generen assets con agent-sprite-forge:

- mapas/habitaciones: `$generate2dmap`;
- personajes, props e íconos: `$generate2dsprite`;
- guardar prompts junto al asset generado;
- actualizar el manifest con archivo, estado y escena.

## Prompt inicial sugerido para Codex

```md
Implementá el scaffolding jugable del vertical slice de Proyecto Roxana según `docs/production/codex_instructions.md`.

No generes assets finales todavía. Usá placeholders geométricos y dejá TODOs vinculados a `docs/production/asset_manifest.json`.

Prioridad: arquitectura mantenible de escenas, diálogos, interacciones, flags, bitácora y puzzles de circuito.
```
