# Plan de Implementacion: Recepcion Escuela + Despacho Roxana

## Fase 1 - Base de feature

Archivos:

- `specs/019-recepcion-escuela-despacho-roxana/spec.md`
- `.specify/feature.json`

Tareas:

- Confirmar alcance y criterios de aceptacion de la feature `019`.
- Apuntar Spec Kit a `specs/019-recepcion-escuela-despacho-roxana`.

## Fase 2 - Escala y mapas

Archivos:

- `src/game/constants.ts`
- `src/content/maps/roxana-library-hub.map.json`
- `src/content/maps/roxana-office.map.json`

Tareas:

- Migrar viewport logico a `640x360`.
- Redisenar recepcion de escuela: entrada principal abajo, presencia central de Roxana, cartelera/mostrador como pared del balcon, doble escalera lateral, `Sala 3` como acceso de Ohmdal y puerta superior al despacho.
- Redisenar despacho: escritorio con bitacora, mapa, notas, cartas, estantes y retorno a recepcion.

## Fase 3 - Escenas y beats

Archivos:

- `src/game/scenes/HubScene.ts`
- `src/game/scenes/RoxanaOfficeScene.ts`
- `src/game/types/events.ts`
- `src/components/game/GameShell.tsx`

Tareas:

- Consolidar beats narrativos de entrada y presencia.
- Emitir analitica minima:
  - `entered_school`
  - `observed_roxana_presence`
  - `opened_roxana_office`
  - `found_bitacora`
- Mantener desbloqueo de bitacora por interaccion intencional.
- Evitar repetir primer beat emocional al reingresar al despacho.

## Fase 4 - Contenido narrativo

Archivos:

- `src/content/dialogues/roxana-intro.json`
- `src/content/messages/hub.json`
- `src/content/messages/roxana-office.json`
- `src/content/narrative/beats.json`

Tareas:

- Ajustar textos para recepcion y despacho.
- Actualizar IDs narrativos y dependencias.
- Mantener narrativa indirecta sin explicacion cientifica directa.

## Verificacion

- `npm run lint`
- `npm run build`
- Recorrido manual recepcion -> despacho -> bitacora -> revisita
