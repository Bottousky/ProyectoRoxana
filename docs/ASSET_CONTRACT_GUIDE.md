# Asset Contract Guide

Guia practica para que las imagenes pixel art de Proyecto Roxana puedan ser entendidas por Phaser, React y por agentes IA en futuras iteraciones.

## Resumen

Una imagen bonita no alcanza. Para usarla en el juego necesitamos tres piezas:

1. **PNG**
   La imagen visual.

2. **Manifest JSON**
   El contrato que dice que parte de la imagen es cada cosa.

3. **Map JSON o Tiled JSON**
   El documento que decide donde va cada cosa en la sala.

La regla del proyecto es simple:

> Si una imagen no tiene manifest, todavia es referencia visual, no asset de runtime.

## Estados de un asset

### 1. Concept

Sirve para decidir estilo.

Puede venir de GPT, imagegen, dibujo manual o mezcla.

Acepta imperfecciones:

- objetos no perfectamente alineados;
- props mezclados;
- variaciones redundantes;
- escala algo irregular;
- detalles que luego se simplifican.

No se usa directo en Phaser.

### 2. Normalized

Sirve para recortar y mapear.

Debe tener:

- PNG transparente;
- sin texto o labels;
- dimensiones divisibles por 16;
- elementos separados con padding;
- tiles repetibles alineados a 16x16;
- props en rectangulos claros;
- sin blur ni halos.

### 3. Runtime

Sirve dentro del juego.

Debe tener:

- manifest JSON;
- nombres estables;
- colisiones;
- categorias;
- tags;
- interacciones si aplica.

## Convenciones de nombres

Usar ids descriptivos, en ingles simple y snake case.

Ejemplos:

```txt
wood_floor_clean
wood_floor_cracked
bookshelf_damaged_wide
bookshelf_repaired_wide
roxana_desk_repaired
ohmdal_gate_inactive
journal_icon_closed
dialogue_icon_bubble
```

Evitar:

```txt
tile_1
thing_blue
new_asset_final_final
bookcaseMaybe
```

## Tipos principales

### tile

Una pieza repetible de 16x16.

Uso:

- piso;
- pared modular;
- borde;
- alfombra modular;
- detalle repetible.

### prop

Objeto decorativo o fisico que puede ocupar multiples tiles.

Uso:

- escritorio;
- estanteria;
- silla;
- mesa;
- lampara;
- caja.

### interactable

Objeto con accion de gameplay o UI.

Uso:

- Roxana;
- escritorio/bitacora;
- portal bloqueado;
- estanteria inspeccionable.

### sprite

Entidad animada.

Uso:

- jugador;
- Roxana;
- futuros NPCs.

### uiIcon

Icono renderizado por React.

Uso:

- bitacora;
- dialogo;
- inventario futuro;
- ajustes;
- energia o estados.

## Manifest minimo

```json
{
  "schemaVersion": 1,
  "id": "roxana-library-v1",
  "kind": "objectAtlas",
  "image": "/assets/environment/library/roxana-library.normalized.png",
  "pixelArt": {
    "tileSize": 16,
    "requiresPixelatedRendering": true,
    "allowsNonIntegerScale": false
  },
  "entries": [
    {
      "id": "wood_floor_clean",
      "kind": "tile",
      "rect": { "x": 0, "y": 0, "w": 16, "h": 16 },
      "walkable": true,
      "collision": [],
      "tags": ["floor", "wood"]
    }
  ]
}
```

## Campos obligatorios por entrada

Cada entrada debe tener:

```json
{
  "id": "stable_asset_id",
  "kind": "tile | prop | interactable | sprite | uiIcon",
  "rect": { "x": 0, "y": 0, "w": 16, "h": 16 },
  "tags": []
}
```

Si bloquea movimiento:

```json
{
  "walkable": false,
  "collision": [
    { "x": 0, "y": 8, "w": 32, "h": 8 }
  ]
}
```

Si es interactuable:

```json
{
  "interaction": {
    "kind": "dialogue | journal | blocked_gate | inspect",
    "dialogueId": "roxana_intro",
    "journalEntryId": "central_hub_libreria",
    "messageId": "ohmdal_gate_unstable"
  }
}
```

## Como se arma un mapa

El mapa no deberia decir "usar coordenada x=320 del PNG".

Debe decir:

```json
{
  "asset": "bookshelf_repaired_wide",
  "x": 4,
  "y": 1
}
```

Luego el loader resuelve ese id usando el manifest.

Esto permite cambiar el PNG sin reescribir el mapa, siempre que el id se mantenga.

## Flujo recomendado

1. Reunir referencias visuales.
2. Elegir una concept sheet.
3. Separar lo que sirve de lo que no.
4. Generar o editar una normalized sheet.
5. Medir cada asset en coordenadas.
6. Escribir manifest.
7. Validar dimensiones y colisiones.
8. Crear semantic map.
9. Integrar en Phaser.
10. Probar a 384x216 y en escala mobile.

## Prompt base para nuevas sheets

```txt
Create a transparent-background pixel art asset sheet for a top-down 2D Phaser RPG.
Theme: Roxana's magical abandoned library, warm wood, old books, repaired and damaged furniture, teal/cyan magical technology, subtle gold trim.
Technical rules: 16x16 base tile size, props should fit multiples of 16px, clear padding between assets, no text labels, no UI text, crisp hard pixel edges, limited palette, no blur, no antialiasing, no soft shadows, readable at 1x.
Include: wooden floor tiles, cracked floor variants, stone accents, walls and trims, bookshelves, librarian desk, rugs, candles, wall lamps, book piles, crates, inactive magical gate, journal icon candidates, small interactable props.
```

## Prompt base para spritesheets

```txt
Create a transparent-background pixel art spritesheet for Roxana, a former library director in a magical abandoned library.
Style: warm indie RPG pixel art, readable silhouette, long wavy brown hair, green eyes, dark librarian coat with gold trim, cyan magical book pendant.
Technical rules: consistent frame size, no labels, no text, clear spacing, hard pixel edges, no blur, no antialiasing.
Animations: idle down/up/left/right, walk down/up/left/right, reading/interact. Use 2 idle frames and 4 walking frames per direction.
```

## Validacion rapida

Antes de integrar, responder:

- ¿La imagen es PNG?
- ¿El tamano total es divisible por 16?
- ¿Hay transparencia real?
- ¿Los tiles repetibles estan en grilla?
- ¿Los props se pueden recortar sin cortar sombras o vecinos?
- ¿Los sprites tienen frames iguales?
- ¿Cada elemento usado en mapa tiene id estable?
- ¿Cada solido tiene colision?
- ¿Cada interactuable tiene evento o payload?
- ¿El texto sigue afuera de Phaser y afuera del PNG?

## Nota sobre la sheet generada por Codex

La sheet generada para biblioteca arcano-tecnologica es prometedora como concept sheet.

Estado actual:

- visualmente util para direccion;
- tecnicamente no aprobada aun como runtime;
- requiere normalizacion, recorte y manifest;
- puede alimentar la Spec 008 si antes se convierte en normalized sheet.

## Principio operativo

El PNG muestra. El JSON explica. El mapa decide.

Phaser solo deberia ejecutar esa decision, no inventarla.
