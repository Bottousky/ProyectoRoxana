# Spec 009 - Asset Contract Pipeline

## Objetivo

Definir como Proyecto Roxana convierte imagenes generadas por IA o dibujadas manualmente en assets entendibles por Phaser, React y futuras herramientas de mapas.

La meta no es producir arte final todavia. La meta es crear un contrato estable entre:

- una imagen pixel art;
- una descripcion de que contiene;
- sus zonas recortables;
- sus reglas de colision e interaccion;
- su uso dentro del Hub de Roxana y futuros mapas.

## Problema

Una imagen generada puede verse muy bien y aun asi no ser directamente usable en Phaser.

Para que sirva en un mapa necesitamos saber:

- donde empieza y termina cada tile, sprite, prop o icono;
- que tamano real tiene;
- si ocupa 16x16, 32x32, 48x32 u otra huella;
- si bloquea movimiento;
- si es decorativo, interactuable, UI o parte del terreno;
- que nombre estable tendra en codigo y datos;
- si pertenece a una paleta y escala compatibles con el juego.

Sin ese contrato, Phaser tendria que adivinar por coordenadas visuales. Eso vuelve fragil el mapa y dificulta que IA o humanos lo editen despues.

## Alcance

- Definir tipos de sheets aceptadas.
- Definir el manifiesto JSON que describe una sheet.
- Definir el manifiesto JSON para mapas semanticos.
- Definir criterios para decidir si una imagen IA sirve, necesita refinamiento o debe descartarse.
- Definir la ruta entre concept art, normalized sheet y asset de produccion.
- Preparar el pipeline para Spec 008: despacho/libreria de Roxana.

## Fuera de alcance

- Implementar el mapa de la libreria.
- Reemplazar placeholders actuales.
- Crear un editor visual propio.
- Crear backend.
- Crear login.
- Crear tienda.
- Declarar arte final.
- Depender de assets con texto incrustado dentro de la imagen.

## Definiciones

### Concept sheet

Imagen exploratoria que fija estilo, paleta, atmosfera y posibles objetos.

Puede ser generada por IA. Puede tener irregularidades. No se usa directamente como fuente confiable de mapas salvo que pase validacion.

### Normalized sheet

Version limpia de una concept sheet:

- fondo transparente real;
- sin labels ni texto interno;
- objetos separados con padding;
- dimensiones divisibles por 16;
- tiles de terreno alineados a grilla 16x16;
- props recortables con rectangulos exactos;
- sin blur ni antialiasing visible.

### Production manifest

Archivo JSON que declara que hay en la sheet. Es el contrato tecnico.

### Semantic map

Mapa JSON legible por IA y humanos que usa nombres estables en vez de depender solamente de indices numericos.

## Decision

Proyecto Roxana usara imagenes PNG acompanadas por manifest JSON.

Ningun tileset, spritesheet o UI sheet debe considerarse listo para integracion si no tiene manifest.

Las imagenes generadas por IA pueden entrar como referencia visual, pero solo se integran al runtime cuando pasan por normalizacion y contrato.

## Estructura propuesta

```txt
public/
  assets/
    environment/
      library/
        roxana-library.concept.png
        roxana-library.normalized.png
        roxana-library.manifest.json
    characters/
      roxana/
        roxana.png
        roxana.manifest.json
    ui/
      icons/
        roxana-icons.png
        roxana-icons.manifest.json

src/
  content/
    maps/
      roxana-library-hub.map.json
  game/
    types/
      assets.ts
      maps.ts
```

La estructura exacta puede ajustarse durante implementacion, pero debe conservar la separacion por dominio.

## Tipos de sheet

### tileset

Usado para terreno repetible y paredes modulares.

Reglas:

- tile base de 16x16;
- cada tile debe ocupar una celda exacta;
- no debe mezclar props grandes si esos props no estan alineados a grilla;
- ideal para pisos, paredes, bordes, alfombras modulares, trim y variantes rotas/reparadas.

### objectAtlas

Usado para props y objetos grandes.

Reglas:

- cada objeto puede ocupar multiples tiles;
- cada entrada declara `rect`, `footprint` y `collision`;
- sirve para escritorios, estanterias, puertas, portal, lamparas, mesas, sillas y decoracion.

### spritesheet

Usado para personajes o entidades animadas.

Reglas:

- todos los frames de una animacion tienen el mismo ancho y alto;
- cada animacion declara direccion, frames, frameRate y repeat;
- los pivotes deben ser consistentes.

### uiIconSheet

Usado por React, no por Phaser como UI textual.

Reglas:

- iconos recortables por manifest;
- puede tener 16x16, 24x24 o 32x32;
- no debe contener texto esencial;
- debe poder renderizarse con CSS `image-rendering: pixelated`.

## Manifest de asset sheet

Ejemplo base:

```json
{
  "schemaVersion": 1,
  "id": "roxana-library-v1",
  "kind": "objectAtlas",
  "image": "/assets/environment/library/roxana-library.normalized.png",
  "source": {
    "type": "ai-assisted",
    "status": "normalized",
    "notes": "Basado en concept sheet de biblioteca arcano-tecnologica."
  },
  "pixelArt": {
    "tileSize": 16,
    "requiresPixelatedRendering": true,
    "allowsNonIntegerScale": false
  },
  "grid": {
    "unit": 16,
    "columns": 96,
    "rows": 64
  },
  "entries": [
    {
      "id": "wood_floor_clean",
      "kind": "tile",
      "category": "floor",
      "rect": { "x": 0, "y": 0, "w": 16, "h": 16 },
      "walkable": true,
      "collision": [],
      "tags": ["wood", "floor", "library"]
    },
    {
      "id": "bookshelf_repaired_wide",
      "kind": "prop",
      "category": "shelf",
      "rect": { "x": 160, "y": 48, "w": 48, "h": 32 },
      "footprint": { "w": 3, "h": 1 },
      "anchor": { "x": 0.5, "y": 1 },
      "walkable": false,
      "collision": [
        { "x": 0, "y": 16, "w": 48, "h": 16 }
      ],
      "tags": ["bookshelf", "library", "solid"]
    },
    {
      "id": "ohmdal_gate_inactive",
      "kind": "interactable",
      "category": "gate",
      "rect": { "x": 288, "y": 96, "w": 32, "h": 48 },
      "footprint": { "w": 2, "h": 1 },
      "anchor": { "x": 0.5, "y": 1 },
      "walkable": false,
      "collision": [
        { "x": 0, "y": 32, "w": 32, "h": 16 }
      ],
      "interaction": {
        "kind": "blocked_gate",
        "messageId": "ohmdal_gate_unstable"
      },
      "tags": ["ohmdal", "gate", "blocked", "cyan-tech"]
    }
  ]
}
```

## Manifest de spritesheet

```json
{
  "schemaVersion": 1,
  "id": "roxana-character-v1",
  "kind": "spritesheet",
  "image": "/assets/characters/roxana/roxana.png",
  "frame": {
    "w": 32,
    "h": 48
  },
  "anchor": {
    "x": 0.5,
    "y": 1
  },
  "animations": {
    "idle_down": {
      "row": 0,
      "frames": [0, 1],
      "frameRate": 2,
      "repeat": -1
    },
    "walk_down": {
      "row": 4,
      "frames": [0, 1, 2, 3],
      "frameRate": 8,
      "repeat": -1
    },
    "read": {
      "row": 8,
      "frames": [0, 1, 2, 3],
      "frameRate": 4,
      "repeat": -1
    }
  }
}
```

## Semantic map

El mapa inicial puede escribirse en JSON propio antes de pasar a Tiled.

```json
{
  "schemaVersion": 1,
  "id": "roxana-library-hub",
  "size": {
    "w": 24,
    "h": 14,
    "tileSize": 16
  },
  "tilesets": ["roxana-library-v1"],
  "layers": [
    {
      "id": "floor",
      "kind": "tile",
      "z": 0,
      "data": [
        ["wood_floor_clean", "wood_floor_clean"]
      ]
    },
    {
      "id": "props",
      "kind": "objects",
      "z": 10,
      "objects": [
        {
          "id": "desk_central",
          "asset": "roxana_desk_repaired",
          "x": 10,
          "y": 5,
          "interaction": {
            "kind": "journal",
            "journalEntryId": "central_hub_libreria"
          }
        },
        {
          "id": "ohmdal_gate",
          "asset": "ohmdal_gate_inactive",
          "x": 21,
          "y": 5,
          "interaction": {
            "kind": "blocked_gate",
            "messageId": "ohmdal_gate_unstable"
          }
        }
      ]
    }
  ],
  "entities": [
    {
      "id": "roxana",
      "kind": "npc",
      "sprite": "roxana-character-v1",
      "x": 12,
      "y": 8,
      "interaction": {
        "kind": "dialogue",
        "dialogueId": "roxana_intro"
      }
    }
  ],
  "spawn": {
    "player": { "x": 4, "y": 10, "facing": "up" }
  }
}
```

## Reglas de generacion de imagenes

Los prompts de generacion deben pedir:

- pixel art top-down para RPG 2D;
- fondo transparente;
- sin labels ni texto;
- assets separados con padding claro;
- objetos pequenos legibles a escala 1x;
- tile size base 16x16;
- props en multiplos de 16 cuando sea posible;
- paleta limitada;
- luz consistente desde arriba o arriba-izquierda;
- sin blur, sin suavizado, sin antialiasing fuerte;
- sin sombras blandas de alta resolucion.

## Reglas de validacion

Una sheet es usable solo si:

- es PNG;
- sus dimensiones son divisibles por 16;
- el fondo es transparente o removible sin halos;
- los tiles repetibles encajan en grilla 16x16;
- los sprites tienen frames consistentes;
- cada entrada del manifest tiene `id`, `kind`, `rect` y `tags`;
- los objetos solidos tienen collision declarada;
- los interactuables tienen `interaction.kind`;
- no hay texto narrativo incrustado en Phaser ni en la imagen;
- el canvas y CSS usan rendering pixelated/crisp.

## Clasificacion de assets IA

### Aprobado para referencia

La imagen fija buen estilo, atmosfera o paleta, pero no tiene manifest o no esta normalizada.

### Aprobado para normalizacion

La imagen tiene assets utiles, buena transparencia, escala razonable y puede recortarse.

### Aprobado para runtime

La imagen esta normalizada, tiene manifest y pasa validacion tecnica.

### Descartado

La imagen no respeta escala, mezcla demasiados estilos, contiene texto indispensable, tiene blur fuerte, no permite recorte claro o no aporta al vertical slice.

## Aplicacion a la sheet generada por Codex

La imagen generada por Codex para biblioteca arcano-tecnologica debe tratarse como `concept sheet` inicial.

Datos observados:

- dimensiones: 1536x1024;
- divisible por 16: si;
- uso recomendado actual: referencia visual y fuente de candidatos;
- estado tecnico: pendiente de normalizacion y manifest.

No debe usarse directamente para construir el mapa de Phaser hasta que se recorten sus objetos principales y se declaren en JSON.

## Criterios de aceptacion

- Existe una guia clara para pasar de imagen a asset usable.
- Existe un contrato JSON para sheets.
- Existe un contrato JSON para mapas semanticos.
- Spec 008 puede depender de este pipeline para assets sin romper arquitectura.
- Las imagenes generadas por IA no entran al runtime sin manifest.
- La separacion Phaser/React se mantiene.
- El texto largo sigue viviendo en React/contenido, no en PNG ni Phaser.

## Relacion con Spec 008

Antes de implementar el despacho/libreria de Roxana con assets visuales, se debe:

1. elegir una concept sheet;
2. normalizar los tiles/props necesarios;
3. crear manifest;
4. crear o adaptar semantic map;
5. integrar en `HubScene` como render de datos, no como coordenadas magicas dispersas.

Para una primera implementacion de Spec 008 todavia se permite usar placeholders, pero este pipeline define como reemplazarlos sin reescribir el sistema.
