# Plan de Implementacion: Aula Ohmdal + Presala Jugable

## Fase 1 - Setup de spec

Archivos:

- `specs/020-aula-ohmdal-presala/spec.md`
- `specs/020-aula-ohmdal-presala/plan.md`
- `specs/020-aula-ohmdal-presala/tasks.md`
- `.specify/feature.json`

Tareas:

- Registrar alcance y criterios de aceptacion de feature 020.
- Apuntar Spec Kit a `specs/020-aula-ohmdal-presala`.

## Fase 2 - Mapas + placeholders

Archivos:

- `src/content/maps/electronics-classroom.map.json`
- `src/content/maps/ohmdal-threshold.map.json`
- `public/assets/environment/school/electronics-classroom/*`
- `public/assets/environment/ohmdal/threshold/*`
- `public/assets/environment/school/README.md`
- `public/assets/environment/ohmdal/README.md`

Tareas:

- Migrar aula de Electronica a `640x360` como antesala escolar.
- Migrar umbral de Ohmdal a `640x360` como primer patio jugable.
- Agregar `assetBundle` de estado `placeholder_reference` en ambos mapas.
- Generar manifests/metadata placeholder para base, props, colision y zonas.

## Fase 3 - Escenas y continuidad

Archivos:

- `src/game/scenes/ElectronicsClassroomScene.ts`
- `src/game/scenes/ElectronicsThresholdScene.ts`
- `src/content/maps/roxana-library-hub.map.json`

Tareas:

- Mantener flujo memoria -> cruce -> puzzle sin overlays React para puzzle.
- Agregar spawn de retorno al Hall para continuidad espacial con Sala 3.
- Evitar repeticion de llegada completa al umbral en revisita.
- Ajustar visuales de puzzle a escala del nuevo umbral.

## Fase 4 - Contratos narrativos y analytics

Archivos:

- `src/content/worlds/electronics-classroom.json`
- `src/content/analytics/events.json`

Tareas:

- Ajustar cues narrativos de aula/umbral si hace falta para coherencia.
- Sincronizar listado de analytics con eventos realmente emitidos.

## Verificacion

- `npm run lint`
- `npm run build`
- `git diff --check`
