# Spec 010 - Integracion Visual del Despacho de Roxana

## Objetivo

Reemplazar los placeholders visuales del Hub por assets del `Asset Pack Roxana V1`, manteniendo la arquitectura SDD ya establecida:

- Phaser renderiza mundo, sprites, colisiones e input.
- React renderiza texto, dialogos, bitacora, mensajes e iconos UI.
- Los assets se consumen desde manifests, no desde coordenadas magicas dispersas.

Esta spec parte de:

- `Spec 008 - Roxana Library Hub`;
- `Spec 009 - Asset Contract Pipeline`;
- `docs/ASSET_PACK_ROXANA_V1.md`.

## Alcance

- Cargar `roxana-library.normalized.png` y `roxana.manifest.json`/`roxana-library.manifest.json` desde Phaser.
- Reemplazar los rectangulos de piso, paredes, estanterias, escritorio y portal por assets del object atlas.
- Reemplazar el placeholder de Roxana por spritesheet `32x48`.
- Mantener al player como placeholder salvo que se defina un spritesheet propio.
- Actualizar el mapa semantico para que pueda referenciar `assetId` del manifest.
- Mantener colisiones e interactuables usando datos, no logica hardcodeada.
- Usar iconos UI desde `roxana-icons.normalized.png` solo donde aporte claridad y sin meter texto en canvas.

## Fuera de alcance

- Crear arte final.
- Crear un editor de mapas.
- Migrar a Tiled obligatoriamente.
- Crear inventario completo.
- Crear guardado persistente.
- Crear puzzles de Ohmdal.
- Cambiar narrativa, dialogos o bitacora salvo ajustes menores de contenido.

## Decisiones tecnicas

- Los manifests viven en `public/assets/**`.
- El mapa semantico vive en `src/content/maps/roxana-library-hub.map.json`.
- El runtime debe resolver `assetId` consultando el manifest correspondiente.
- Los objetos visuales pueden seguir teniendo `bounds` para interaccion y `collision` para movimiento.
- El dibujo por `Graphics` debe quedar solo como fallback/debug, no como presentacion principal del Hub.
- Las imagenes `concept` no se cargan en runtime.

## Cambios esperados de datos

El mapa semantico debe evolucionar desde decoraciones con colores hacia objetos con assets:

```json
{
  "id": "desk_journal",
  "assetId": "roxana_desk_repaired",
  "x": 164,
  "y": 62,
  "interaction": {
    "kind": "journal",
    "journalEntryId": "central_hub_libreria"
  }
}
```

Los ids deben existir en:

- `public/assets/environment/library/roxana-library.manifest.json`;
- `public/assets/characters/roxana/roxana.manifest.json`;
- `public/assets/ui/icons/roxana-icons.manifest.json`.

## Cambios esperados de Phaser

- `PreloadScene` carga imagenes normalizadas.
- `HubScene` renderiza tiles/props con `Phaser.GameObjects.Image` o sprites segun el manifest.
- `RoxanaNpc` usa spritesheet y animacion `idle_down` por defecto.
- Futuro movimiento animado de Roxana queda preparado, pero no es obligatorio.
- Colisiones siguen resolviendose con el sistema actual por rectangulos.
- Prompts, dialogos, bitacora y mensajes siguen en React.

## Cambios esperados de React

- `HudOverlay` puede usar icono de bitacora desde UI sheet si se implementa un helper CSS de sprites.
- `MobileControls` puede usar iconos de interactuar/atras si no reduce legibilidad.
- No se debe reemplazar texto funcional por iconos sin accesibilidad.

## Criterios de aceptacion

- La app abre en navegador.
- El despacho ya no se ve como rectangulos planos principales.
- Piso, paredes, estanterias, escritorio y portal usan assets del pack.
- Roxana usa spritesheet normalizado.
- El jugador mantiene movimiento y colisiones correctas.
- Roxana sigue abriendo dialogo React.
- El escritorio sigue abriendo bitacora React.
- El portal sigue mostrando mensaje React y puede cerrarse con interactuar/atras.
- `npm run lint` pasa.
- `npm run build` pasa.
- No se usan imagenes `concept` en runtime.
- No se renderiza texto narrativo dentro de Phaser.

## QA visual

- Verificar desktop en `http://localhost:3000`.
- Verificar que el canvas mantenga aspect ratio `16:9`.
- Verificar que los assets se vean pixelated/crisp.
- Verificar que UI React no tape permanentemente escritorio, Roxana ni portal.
- Verificar que los sprites no queden borrosos por escala no entera dentro de Phaser.

## Notas para la rama de desarrollo

Rama sugerida:

```txt
codex/integrar-assets-despacho
```

La rama debe partir del baseline mergeado que contiene `Spec 008`, `Spec 009` y `Asset Pack Roxana V1`.
