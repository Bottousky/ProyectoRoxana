# Tasks: Recepcion Escuela + Despacho Roxana

## A. Setup de spec

- [x] Actualizar `.specify/feature.json` a `specs/019-recepcion-escuela-despacho-roxana`.
- [x] Crear `spec.md`, `plan.md` y `tasks.md` de la feature `019`.

## B. Runtime y mapas

- [x] Migrar `src/game/constants.ts` a `640x360`.
- [x] Redisenar `src/content/maps/roxana-library-hub.map.json` como recepcion de escuela.
- [x] Ajustar sala principal al boceto: cartelera detras de estatua, doble escalera lateral y Ohmdal en Sala 3.
- [x] Redisenar `src/content/maps/roxana-office.map.json` como despacho explorable.

## C. Escenas y eventos

- [x] Ajustar `HubScene` a beats `school_reception_first_entry` y `roxana_presence_first_echo`.
- [x] Ajustar `RoxanaOfficeScene` para primer ingreso + revisita sin repetir beat completo.
- [x] Extender analytics tipado con `observed_roxana_presence`.
- [x] Actualizar labels y flujo de room events en React.

## D. Contenido narrativo

- [x] Actualizar `roxana-intro.json` con nuevo beat ID.
- [x] Actualizar mensajes de hub y despacho para nuevo layout.
- [x] Consolidar IDs y dependencias en `src/content/narrative/beats.json`.

## E. Verificacion

- [x] `npm run lint`
- [x] `npm run build`
