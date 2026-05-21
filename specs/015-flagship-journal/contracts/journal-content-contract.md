# Journal Content Contract

## Purpose

Define the authoring contract for flagship journal entries so page composition, reveal stages, and layered reading remain data-driven.

## Entry Shape

Each journal entry must define:

- entry identity
- world/concept association
- spread list
- reveal-stage list
- available layer modes
- block catalog

## Minimum Entry Requirements

Every flagship entry must provide:

- one title or anchor block
- one simple narrative block
- one additional non-textual or semi-graphical block
- at least one reveal stage beyond initial unlock

## Spread Contract

Each spread must declare:

- `id`
- participating pages
- which blocks are visible on the spread
- whether the spread is valid for simple mode, technical mode, or both

## Block Contract

Every block must declare:

- `id`
- `type`
- `requiredStageId`
- `layerMode`
- `content payload`
- `placement metadata`
- `visual treatment metadata`

## Reveal Stage Contract

Every reveal stage must declare:

- `id`
- `triggerId`
- `player-facing summary`
- `blocks unlocked by the stage`

## Ohmdal Hero Entry Baseline

The first Ohmdal hero entry must cover:

- first wonder at the world
- observation of an interrupted path
- note about partial response
- recognition that the path does not return
- technical formalization of the closed path between source and load

## Placeholder Policy

If a final block is not yet produced, the placeholder version must:

- keep the same footprint in the spread
- communicate the intended role of the block
- remain readable and visually integrated

## Non-Goals

This contract does not define:

- freeform editing
- handwriting input
- sandbox notebook interactions
- backend synchronization
