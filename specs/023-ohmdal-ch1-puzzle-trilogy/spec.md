# Spec 023 - Ohmdal Chapter 1 Puzzle Trilogy

## Objetivo

Implementar el loop jugable completo de 3 puzzles en `ohmdal_chapter_01` con overlays React y reaccion narrativa en Phaser, sin explicaciones cientificas directas en dialogo.

## Alcance

- Tres estaciones de puzzle en el mapa de `ohmdal_chapter_01`.
- Secuencia obligatoria Puzzle 1 -> Puzzle 2 -> Puzzle 3.
- Overlay React para resolver cada puzzle y emitir `puzzle:fail` / `puzzle:complete`.
- Reacciones Phaser: mensajes, bloqueos narrativos y habilitacion de siguiente estacion.
- Actualizacion de bitacora por etapas (`material_observation`, `working_path`, `formalization`).

## Fuera de alcance

- Arte final de puzzles.
- Backend, progreso remoto o monetizacion.

## Reglas narrativas

- OHM y Roxana no dan definiciones formales.
- Las pistas son observacionales y metaforicas.
- La formalizacion vive en bitacora.

## Eventos Phaser <-> React

- Phaser emite `puzzle:start`.
- React muestra overlay y emite `puzzle:fail` o `puzzle:complete`.
- Phaser reacciona a eventos y desbloquea el siguiente nodo.

## Criterios de aceptacion

1. El jugador puede completar 3 puzzles secuenciales en Ohmdal chapter 1.
2. La UI de puzzle vive en React (no dentro de Phaser como UI textual).
3. El avance de bitacora se actualiza por etapas.
4. `npm run lint` y `npm run build` pasan.
