# Spec 025 - Ohmdal Chapter 1 Visual Pass

## Objetivo

Integrar el pass visual placeholder de `ohmdal_chapter_01` en runtime usando el pipeline de Agent Sprite Forge, sin promover arte final.

## Alcance

- Declarar `assetBundle` en `ohmdal-chapter-01.map.json`.
- Preload de preview para chapter 1.
- Manifest y metadatos de placeholder para chapter 1 en `public/assets/environment/ohmdal/chapter-01/`.
- Mantener overlays/jugabilidad de specs 023-024 intactos.

## Fuera de alcance

- Arte final aprobado.
- Rework narrativo.
- Nuevos sistemas de gameplay.

## Criterios de aceptacion

1. `drawMapArtBackground` puede resolver preview del chapter 1.
2. El bundle de chapter 1 queda documentado como `placeholder_reference`.
3. `npm run lint` y `npm run build` pasan.
