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

Phaser no renderiza dialogos ni bitacora. La comunicacion con React pasa por el Event Bus tipado en `src/game/systems/eventBus.ts`.
