# Spec 002 - Initial Technical Setup

## Objetivo

Crear la base tecnica del vertical slice de Proyecto Roxana con Next.js, React, TypeScript, Tailwind, Zustand y Phaser.

## Alcance

- Aplicacion Next.js App Router.
- Integracion Phaser dentro de un componente React.
- Escenas `BootScene`, `PreloadScene` y `HubScene`.
- Player placeholder.
- NPC Roxana placeholder.
- Movimiento desktop con WASD y flechas.
- Controles mobile basicos en React.
- Event Bus tipado Phaser <-> React.
- Dialogo React iniciado por evento Phaser.
- Bloqueo de movimiento durante dialogo.
- Bitacora React con boton abrir/cerrar.
- Contenido inicial en JSON.
- Documentacion base en `docs/`.

## Fuera de alcance

- Backend.
- Login.
- Tienda.
- Assets finales.
- Puzzles completos.
- Mapas finales o Tiled.
- Inventario completo.

## Decisiones tecnicas

- Gameplay base: 384x216.
- Tile size: 16x16.
- Aspect ratio: 16:9.
- Phaser usa `Scale.FIT` para escalar sin deformar.
- UI textual en React/HTML superpuesta al canvas.
- Zustand mantiene estado liviano de UI.
- Dialogos y bitacora viven en `src/content`.

## Eventos

- Phaser emite `dialogue:start`.
- React muestra `DialogueBox`.
- React emite `dialogue:complete`.
- Phaser restaura movimiento.
- Phaser emite `hud:prompt`.
- React emite `input:virtual-direction` e `input:interact` desde mobile.

## Criterios de aceptacion

- La app abre en navegador.
- Se ve un canvas Phaser centrado.
- El canvas mantiene 16:9.
- El jugador se mueve con WASD y flechas.
- En mobile aparecen controles tactiles basicos.
- Roxana aparece como placeholder.
- Al interactuar con Roxana se abre un dialogo React legible.
- El jugador no se mueve durante el dialogo.
- Al cerrar o terminar el dialogo, el jugador vuelve a moverse.
- La bitacora abre y cierra desde React.
- Los dialogos no estan hardcodeados dentro de escenas Phaser.
- `npm run lint` pasa.
- `npm run build` pasa.

## QA esperado

- Ejecutar `npm run lint`.
- Ejecutar `npm run build`.
- Abrir `http://localhost:3000`.
- Verificar movimiento, bitacora, dialogo y restauracion de movimiento.
