# Visual Blockout Runtime Plan

## Ruta de specs recomendada

1. `021-visual-blockout-runtime`: hacer visibles los previews placeholder ya generados en runtime sin cambiar gameplay.
2. `022-ohmdal-chapter-map-camera`: crear mapa grande `1280x720`, camara y zonas base del capitulo Ohmdal.
3. `023-ohmdal-puzzle-architecture`: extraer contrato Phaser <-> React para puzzles hibridos y migrar puzzle 1 a overlay.
4. `024-ohmdal-chapter-puzzles`: implementar puzzles 2 y 3, bitacora progresiva y objeto recuperado.
5. `025-vertical-slice-qa-polish`: QA desktop/mobile, ritmo narrativo, textos, balance y cierre de demo.

## Implementacion de 021

- Extender `HubMapData.assetBundle` con `previewImage`.
- Agregar `src/game/systems/mapArt.ts` para keying, preload y dibujo de previews.
- Cargar previews en `PreloadScene`.
- Usar `drawMapArtBackground` en recepcion, despacho, aula y umbral.
- Actualizar mapas con rutas `previewImage`.

## Verificacion

- `npm run lint`
- `npm run build`
- `git diff --check`
