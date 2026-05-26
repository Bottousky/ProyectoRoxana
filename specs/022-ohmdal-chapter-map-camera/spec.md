# Feature Specification: Ohmdal Chapter Map + Camera

**Feature Branch**: `021-generate-room-art`

**Status**: Completed

## Objetivo

Abrir el capitulo jugable de Ohmdal con un mapa mas grande que el viewport, camara de seguimiento y zonas explorables antes de los puzzles hibridos.

## Alcance

- Crear `ohmdal-chapter-01.map.json` con tamano `1280x720`.
- Crear `OhmdalChapter01Scene` con:
  - world bounds;
  - camara follow del jugador;
  - prompts e interactuables de exploracion;
  - puerta de regreso al hall.
- Redirigir el portal del aula de Electronica hacia `OhmdalChapter01Scene`.
- Mantener el umbral viejo como escena de compatibilidad temporal (sin borrarlo).

## Fuera de alcance

- Implementar puzzles 2 y 3.
- Overlay React de puzzle hibrido.
- Arte final.

## Decisiones tecnicas

- Viewport se mantiene en `640x360`.
- Mapa capitulo `1280x720`.
- Gameplay sigue gobernado por JSON map + Event Bus tipado.
- Evento nuevo de analitica: `entered_ohmdal_chapter_01`.

## Criterios de aceptacion

1. Desde el aula se cruza a `OhmdalChapter01Scene`.
2. La camara sigue al jugador y respeta limites.
3. Hay al menos cinco zonas legibles y tres inspectables.
4. Se puede volver al hall desde el capitulo.
5. `npm run lint` y `npm run build` pasan.
