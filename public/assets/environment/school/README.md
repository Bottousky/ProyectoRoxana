# School Environment Placeholder Assets

Generated with the local Agent Sprite Forge workflow for spec `019-recepcion-escuela-despacho-roxana`.

Status: placeholder/reference only. These files are not approved final art.

## Bundles

- `school-reception/`
  - `school-reception-base.placeholder.png`
  - `school-reception-layered-preview.placeholder.png`
  - `school-reception-props.json`
  - `school-reception-collision.json`
  - `school-reception-zones.json`
  - `school-reception.asset-manifest.json`
  - `props/*/prop.placeholder.png`

- `roxana-office/`
  - `roxana-office-base.placeholder.png`
  - `roxana-office-layered-preview.placeholder.png`
  - `roxana-office-props.json`
  - `roxana-office-collision.json`
  - `roxana-office-zones.json`
  - `roxana-office.asset-manifest.json`
  - `props/*/prop.placeholder.png`

## Contract

- Base images contain foundation/floor art only.
- Runtime props are separate transparent PNGs.
- Collision and trigger zones are structured JSON and mirror current map geometry.
- Layered previews are QA artifacts generated from base + props.
- No visible UI text is embedded in the PNGs.

Phaser still uses `src/content/maps/*.map.json` as the authoritative gameplay source. These bundles are ready for a later rendering pass that replaces vector placeholder drawing with image layers.
