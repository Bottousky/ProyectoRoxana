# Spec 026 - Agent Sprite Forge Ohmdal Prop Baseline

## Objetivo

Cerrar la ultima iteracion de produccion antes de la depuracion con una base clara para usar Agent Sprite Forge en `ohmdal_chapter_01`: mapa layered raster, props separados por zona, metadata de collision/zones y prompts listos para generar assets reales en una pasada posterior.

## Alcance

- Definir el pipeline correcto de Agent Sprite Forge para Proyecto Roxana.
- Ampliar el bundle visual de `ohmdal/chapter-01`.
- Crear metadata de props por zonas: arrival, service patio, workshop street, plaza, archive.
- Crear metadata de collision, zones y scene hooks del chapter 1.
- Mantener todos los assets como `placeholder_reference`.

## Fuera de alcance

- Arte final.
- Nuevos puzzles.
- Nueva narrativa.
- Integracion de runtime y-sorted props; el runtime actual sigue usando `previewImage` + geometry JSON.

## Decisiones Agent Sprite Forge

- `generate2dmap`
  - `map_mode`: `scene_mode`
  - `visual_model`: `layered_raster`
  - `runtime_object_model`: `y_sorted_props + interactive_scene_objects + scene_hooks`
  - `collision_model`: `coarse_shapes + trigger_zones`
  - `engine_target`: `Phaser/project-native JSON`
  - `visual_asset_source`: `procedural_placeholder` por ahora; `image_gen` en la futura pasada de arte.
- `generate2dsprite`
  - Usar `one_by_one` para gates, automatas, fuente, bobina y objetos con collision exacta.
  - Usar `prop_pack_2x2` solo para props compactos decorativos.
  - No mezclar puertas, gates, caminos largos o collision-critical objects en packs cuadrados.

## Criterios de aceptacion

1. El manifest de chapter 1 referencia props, collision, zones y scene hooks.
2. Cada prop planificado declara zona, estrategia de generacion y estado placeholder.
3. Las reglas de uso quedan documentadas para la depuracion posterior.
4. `npm run lint` y `npm run build` pasan.
