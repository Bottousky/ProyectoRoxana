# Proyecto Roxana

Setup inicial web-first para el vertical slice tecnico de Proyecto Roxana.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Zustand
- Phaser

## Scripts

```bash
npm run dev
npm run lint
npm run build
```

## Controles

- Movimiento desktop: WASD o flechas.
- Interaccion desktop: E, Enter o Espacio.
- Movimiento mobile: D-pad React superpuesto.
- Interaccion mobile: boton central `E`.

## Arquitectura

- `src/game`: runtime Phaser, escenas, entidades, sistemas y tipos.
- `src/components`: UI React superpuesta al canvas.
- `src/store`: estado global liviano de UI con Zustand.
- `src/content`: dialogos y bitacora en JSON.
- `docs`: decisiones tecnicas y reglas del vertical slice.
- `specs`: specs SDD que guian cada feature.

Phaser no renderiza dialogos ni bitacora. La comunicacion con React pasa por el Event Bus tipado en `src/game/systems/eventBus.ts`.

## SDD e IA

El proyecto usa Spec Driven Development. Antes de agregar features o assets, crear o actualizar una spec en `specs/`.

GitHub Spec Kit esta instalado en `.specify/` con skills Codex en `.agents/skills/`. Ver `docs/SPECKIT_ADOPTION.md`.

Agent Sprite Forge esta integrado en `.agents/skills/` para generar y procesar assets 2D:

- `$generate2dmap`
- `$generate2dsprite`

Ver `docs/AGENT_SPRITE_FORGE_REVIEW.md`.

La IA se usa como herramienta de direccion creativa bajo reglas versionadas:

- `docs/AI_SOURCE_REVIEW.md`
- `docs/AI_CREATIVE_PIPELINE.md`
- `docs/AI_PROMPTING_RULES.md`
- `docs/PIXEL_ART_AI_RULES.md`

Los PDFs fuente locales quedan fuera del repo.
