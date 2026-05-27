# Agent Sprite Forge Review

## Source reviewed

- Repository: https://github.com/0x0funky/agent-sprite-forge
- Main branch commit inspected: `fff651a89223b044ccfc0b75ed9f3754c6d739b1`
- Review date: 2026-05-24
- Integration status: installed in `.agents/skills/`

## What it is

`agent-sprite-forge` is an agent skill pack for 2D game asset production. Its README describes two main skills:

- `generate2dsprite`: creates sprites, animations, sprite sheets, props, tiles, and UI/game objects.
- `generate2dmap`: creates baked maps, layered raster maps, prop packs, collision/zones metadata, Godot-editable scenes, and raw 2D workflow assets.

For Proyecto Roxana, the strongest fit is not direct final-art production yet. The useful role is preproduction: map layout variants, placeholder tilemaps, visual reference drafts, and asset contract experiments that remain subordinate to the active spec.

## Fit for Proyecto Roxana

Good candidates:

- Generate Ohmdal map drafts from the spec 017 zones: arrival, service patio, workshop street, plaza, archive.
- Export raw map assets, collision/zones metadata, or Godot-oriented references that can be inspected before hand-integration into Phaser/Tiled-style Roxana data.
- Create placeholder props such as bronze lines, silent automata, gates, fountain parts, coils, switches, and conductor route pieces.
- Create mood/reference backgrounds for world direction, not final shipping assets.

Risky candidates:

- Copying generated art directly into `public/` as final assets before a spec authorizes final art.
- Letting a skill decide scientific/narrative content. Roxana dialogue must keep indirect gameplay hints, with formal explanation only in the journal.
- Importing maps without reconciling collision, interaction ids, event bus contracts, and mobile readability.

## Installed files

Installed skills:

- `.agents/skills/generate2dmap`
- `.agents/skills/generate2dsprite`

Preserved metadata:

- `.agents/skills/AGENT_SPRITE_FORGE_LICENSE`
- `.agents/skills/AGENT_SPRITE_FORGE_REQUIREMENTS.txt`

Python processor requirements:

- `numpy>=1.26`
- `Pillow>=10.0`

## Integration rule

Agent Sprite Forge is now the approved local skill pack for 2D asset work. It does not replace Spec Kit or the Roxana narrative rules.

Generated outputs are drafts unless the active spec explicitly promotes them to final assets. Every production use must still satisfy scale, collision, readability, narrative, event id, and placeholder/final-asset rules from the active spec.

## Recommended first experiment

Use `generate2dmap` for a non-final Ohmdal chapter 01 map draft.

Input constraints:

- logical viewport: `640x360`;
- map reference: `1280x720`;
- design grid: `32`;
- top-down 2D, readable for 12+ audience;
- five zones from spec 017;
- no UI text in the map image;
- export preference: raw 2D map assets plus a human-readable layout summary, collision candidates, and zone metadata;
- include collision candidates and interactable ids, but keep final event wiring in Roxana code.

Acceptance for the experiment:

- The output can be compared against `specs/017-ohmdal-chapter-01/spec.md`.
- Collision and interactable proposals are inspectable before implementation.
- No generated asset is treated as final art.
- The result can be discarded without changing runtime code.

## Local usage baseline

The active project-specific usage guide now lives in `docs/AGENT_SPRITE_FORGE_USAGE.md`.
