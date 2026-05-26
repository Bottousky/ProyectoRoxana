# Feature Specification: Visual Blockout Runtime

**Feature Branch**: `021-generate-room-art`

**Status**: Completed

## Objetivo

Usar los bundles placeholder de Agent Sprite Forge como arte funcional visible en runtime para mejorar lectura espacial sin promoverlos a arte final.

## Alcance

- Cargar previews placeholder de recepcion, despacho, aula de Electronica y umbral de Ohmdal.
- Mostrar el preview como fondo visual de cada escena Phaser.
- Mantener colisiones, prompts e interactables gobernados por `src/content/maps/*.map.json`.
- Mantener overlays textuales en React.
- Documentar ruta de specs posterior.

## Fuera de alcance

- Arte final.
- Generar nuevos assets con IA.
- Cambiar puzzles o progresion.
- Reemplazar mapas JSON por imagenes.

## Decisiones tecnicas

- Cada `assetBundle` puede declarar `previewImage`.
- `PreloadScene` carga las imagenes de preview con keys derivadas de `mapData.id`.
- Las escenas dibujan el preview debajo de decoraciones y solidos debug.
- El preview es referencia visual; la autoridad gameplay sigue siendo el JSON.

## Reglas narrativas

- No aplica contenido narrativo nuevo.
- Los visuales no deben introducir texto dentro de Phaser.

## Eventos Phaser <-> React

No se agregan eventos nuevos.

## Criterios de aceptacion

1. Las cuatro escenas usan preview placeholder visible si existe.
2. Si una imagen falta, la escena cae al fondo procedural anterior.
3. Colisiones, prompts y eventos siguen funcionando igual.
4. Los assets siguen marcados como `placeholder_reference`.
5. `npm run lint` y `npm run build` pasan.

## QA esperado

- Recorrer recepcion -> despacho -> recepcion.
- Recorrer recepcion -> Sala 3 -> preview -> umbral.
- Confirmar que el jugador no atraviesa solidos.
- Confirmar que prompts y UI React siguen legibles.
