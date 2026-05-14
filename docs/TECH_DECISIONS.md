# Technical Decisions

## Stack inicial

- Next.js es la aplicacion principal y expone la ruta web.
- React renderiza HUD, dialogos, bitacora y controles mobile como DOM superpuesto.
- Phaser renderiza el mundo jugable 2D.
- TypeScript se usa en la app, escenas, entidades, sistemas y tipos compartidos.
- Tailwind CSS define la UI.
- Zustand mantiene estado global liviano de UI.

## Resolucion

- Gameplay base: 384x216.
- Tile size: 16x16.
- Aspect ratio: 16:9.
- Phaser usa `Scale.FIT` para escalar al contenedor sin deformar.

## Separacion Phaser / React

Phaser no renderiza dialogos ni bitacora. Las escenas emiten eventos tipados y React decide que UI mostrar.

El Event Bus vive en `src/game/systems/eventBus.ts` y es la frontera explicita entre runtime jugable y UI.

## SDD

El desarrollo sigue Spec Driven Development. Las specs viven en `specs/` y deben existir antes de features nuevas.

## Material IA

Los PDFs locales de IA no son parte del runtime ni del repo. Sus aprendizajes se integran como docs derivados para direccion creativa, prompting, pixel art y assets.
