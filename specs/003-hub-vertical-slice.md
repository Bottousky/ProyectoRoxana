# Spec 003 - Hub Vertical Slice

## Objetivo

Definir el siguiente paso para convertir el Hub placeholder en una zona navegable inicial conectada con Ohmdal.

## Alcance propuesto

- Mapa Hub placeholder reemplazable por Tiled.
- Punto de entrada del jugador.
- Roxana como NPC guia central.
- Portal o salida hacia Ohmdal.
- Prompt contextual al acercarse a objetos interactivos.
- Eventos tipados para cambio de escena o mundo.

## Fuera de alcance

- Arte final.
- Cinematicas.
- Guardado persistente.
- Sistema completo de inventario.

## Criterios de aceptacion

- El Hub se mantiene jugable en 384x216.
- React sigue renderizando texto y paneles.
- Phaser solo emite eventos para UI y transiciones.
- El mapa puede ser reemplazado sin reescribir la UI.
