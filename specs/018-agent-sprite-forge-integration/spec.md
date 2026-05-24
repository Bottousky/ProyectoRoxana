# Feature Specification: Agent Sprite Forge Integration

**Status**: Accepted

## Objetivo

Ordenar el flujo local de skills para que Proyecto Roxana use Spec Kit como metodologia de producto y `agent-sprite-forge` como pack aprobado para assets 2D.

## Alcance

- Eliminar las skills locales de Superpowers para evitar conflictos metodologicos.
- Preservar las skills de Spec Kit instaladas por `.specify/`.
- Instalar `generate2dmap` y `generate2dsprite` desde `0x0funky/agent-sprite-forge`.
- Documentar fuente, licencia, requisitos y reglas de uso.
- Ordenar el flujo de ramas locales en `main` y `develop`.

## Fuera de alcance

- Borrar ramas remotas.
- Generar assets finales.
- Cambiar la implementacion Phaser/React.
- Cambiar la spec activa `017-ohmdal-chapter-01`.

## Decisiones tecnicas

- `main` queda como base estable.
- `develop` queda como rama de integracion activa.
- Las ramas feature son temporales y deben eliminarse despues de integrar.
- Spec Kit mantiene sus skills en `.agents/skills/`.
- Agent Sprite Forge queda instalado en `.agents/skills/generate2dmap` y `.agents/skills/generate2dsprite`.
- Los requisitos Python de Agent Sprite Forge se preservan en `.agents/skills/AGENT_SPRITE_FORGE_REQUIREMENTS.txt`.

## Reglas narrativas

- Las skills de assets no pueden escribir dialogos educativos directos.
- Las referencias visuales y mapas generados deben respetar la separacion entre gameplay Phaser y UI React.
- Ningun asset generado se considera final si la spec activa solo permite placeholders.

## Eventos Phaser <-> React

No aplica. Esta spec cambia tooling y flujo de trabajo, no eventos runtime.

## Criterios de aceptacion

- Solo quedan ramas locales permanentes `main` y `develop`.
- Las skills Superpowers ya no estan versionadas en `.agents/skills/`.
- Las skills Spec Kit siguen presentes.
- `generate2dmap` y `generate2dsprite` estan instaladas con sus referencias y scripts.
- La documentacion del repo ya no indica que Superpowers este integrado.
- La documentacion declara como usar Agent Sprite Forge sin desplazar Spec Kit.
- `npm run lint` pasa.
- `npm run build` pasa.

## QA esperado

- `git branch` muestra solo `main` y `develop`.
- `Get-ChildItem .agents/skills -Directory` muestra skills `speckit-*`, `generate2dmap` y `generate2dsprite`.
- `npm run lint`
- `npm run build`
