# Tasks: Aula Ohmdal + Presala Jugable

## A. Setup de spec

- [x] Crear `specs/020-aula-ohmdal-presala/spec.md`.
- [x] Crear `specs/020-aula-ohmdal-presala/plan.md`.
- [x] Crear `specs/020-aula-ohmdal-presala/tasks.md`.
- [x] Actualizar `.specify/feature.json` a spec 020.

## B. Runtime de mapas y bundles

- [x] Redisenar `src/content/maps/electronics-classroom.map.json` a `640x360`.
- [x] Redisenar `src/content/maps/ohmdal-threshold.map.json` a `640x360`.
- [x] Agregar `assetBundle` placeholder en ambos mapas.
- [x] Crear bundle placeholder `public/assets/environment/school/electronics-classroom/`.
- [x] Crear bundle placeholder `public/assets/environment/ohmdal/threshold/`.
- [x] Actualizar READMEs de assets para incluir los nuevos bundles.

## C. Escenas y flujo

- [x] Ajustar retorno desde aula al Hall con spawnpoint de Sala 3.
- [x] Ajustar retorno desde umbral al Hall con spawnpoint de Sala 3.
- [x] Ajustar visuales de puzzle del umbral al nuevo layout.
- [x] Evitar repetir mensaje de llegada completo en revisita de umbral.

## D. Coherencia narrativa/telemetria

- [x] Ajustar `src/content/worlds/electronics-classroom.json` para coherencia de antesala.
- [x] Sincronizar `src/content/analytics/events.json` con eventos emitidos por el runtime.

## E. Verificacion

- [x] `npm run lint`
- [x] `npm run build`
- [x] `git diff --check`
