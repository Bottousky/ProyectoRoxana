# Puzzle Design Rules

## Principios

- El aprendizaje ocurre por exploracion y patron, no por exposicion directa.
- Los puzzles deben tener feedback visual claro dentro de Phaser.
- La UI React puede mostrar bitacora, inventario o notas, pero no debe resolver el puzzle por el jugador.

## Arquitectura

- Las reglas de puzzle viven fuera de escenas grandes.
- Phaser adapta estado a sprites, colisiones y efectos.
- React recibe eventos de progreso o lectura mediante el Event Bus.

## Contenido

- No hardcodear textos explicativos dentro de escenas.
- Las pistas narrativas viven en JSON de dialogo.
- Las explicaciones formales viven en JSON de bitacora.

## IA

Los materiales analizados sobre IA sirven para producir referencias visuales, personajes, assets y escenas, pero no reemplazan el diseno pedagogico del puzzle.

Cada puzzle necesita su propia spec con regla jugable, feedback, criterios de aceptacion y prueba de lectura.
