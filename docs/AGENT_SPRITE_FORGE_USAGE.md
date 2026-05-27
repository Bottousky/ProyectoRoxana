# Agent Sprite Forge Usage - Proyecto Roxana

## Estado

Agent Sprite Forge queda preservado como el pipeline local aprobado para assets 2D. La integracion actual debe seguir siendo subordinada a Spec Kit y a las reglas narrativas del proyecto.

## Pipeline para mapas explorables

Para escenas como recepcion, despacho, aula, umbral y `ohmdal_chapter_01` usar:

- Skill principal: `generate2dmap`
- `map_mode`: `scene_mode`
- `visual_model`: `layered_raster`
- `runtime_object_model`: `y_sorted_props + interactive_scene_objects + scene_hooks`
- `collision_model`: `coarse_shapes + trigger_zones`
- `engine_target`: `Phaser/project-native JSON`

La imagen de mapa no debe ser el mapa jugable completo si hay colisiones, props, pickups o gates. Debe existir metadata separada para props, collision, zones y scene hooks.

## Pipeline para props

Usar `generate2dsprite` para props visibles:

- `one_by_one`: gates, puertas, automatas, fuentes, bobinas, estatuas, objetos narrativos o collision-critical.
- `prop_pack_2x2` o `prop_pack_3x3`: props compactos decorativos de bajo riesgo.
- No usar packs cuadrados para gates, puertas, caminos largos, paredes, fuentes grandes, objetos pickup importantes o piezas que deban alinear collision.

Todos los prompts de sprite deben exigir:

- fondo `#FF00FF`;
- sin texto, UI, labels ni watermark;
- objeto completo centrado;
- margen suficiente;
- estilo clean HD legible, salvo que una spec pida otro estilo.

## Estados permitidos

- `placeholder_reference`: permitido para specs actuales.
- `normalized`: asset procesado y utilizable en runtime, pero no necesariamente final.
- `runtime`: asset integrado y autorizado por spec.

No promover assets IA a arte final salvo que una spec futura lo declare explicitamente.

## Regla de cierre de iteracion

Despues de Spec 026, pausar nuevas features y hacer una depuracion del proyecto:

1. limpiar specs viejas o contradictorias;
2. revisar ramas y estado git;
3. consolidar docs activas;
4. validar flujo `main` / `develop` / feature;
5. definir la proxima spec desde una base limpia.
