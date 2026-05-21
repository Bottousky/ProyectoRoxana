# Journal Addendum For `src/content/journal/ohmdal.json`

Estas entradas son contenido propuesto para integrar en `src/content/journal/ohmdal.json` cuando se implemente Spec 017.

## Entrada nueva: `ohmdal_conductive_paths`

```json
{
  "id": "ohmdal_conductive_paths",
  "title": "Caminos que dejan pasar",
  "scope": "world",
  "worldId": "ohmdal",
  "conceptIds": ["conductivity", "continuity"],
  "defaultMode": "simple",
  "revealStages": [
    {
      "id": "material_observation",
      "title": "Materiales observados",
      "summary": "No todo camino visible deja pasar el pulso."
    },
    {
      "id": "working_path",
      "title": "Camino funcional",
      "summary": "El cobre permitió que el sistema respondiera."
    },
    {
      "id": "formalization",
      "title": "Formalización",
      "summary": "La conducción depende del material y de la continuidad del recorrido."
    }
  ],
  "spreads": [
    {
      "id": "conductive_paths_spread_1",
      "title": "Rutas de taller",
      "leftPageNumber": 26,
      "rightPageNumber": 27
    }
  ],
  "blocks": [
    {
      "id": "conductive_paths_title",
      "type": "title",
      "stageId": "material_observation",
      "page": "left",
      "x": 8,
      "y": 6,
      "width": 84,
      "layerMode": "both",
      "title": "Caminos que dejan pasar"
    },
    {
      "id": "conductive_paths_simple_1",
      "type": "paragraph",
      "stageId": "material_observation",
      "page": "left",
      "x": 8,
      "y": 20,
      "width": 84,
      "layerMode": "simple",
      "text": "En Ohmdal, algunas rutas parecen dibujadas para el pulso, pero no todas responden."
    },
    {
      "id": "conductive_paths_simple_2",
      "type": "paragraph",
      "stageId": "working_path",
      "page": "left",
      "x": 8,
      "y": 42,
      "width": 84,
      "layerMode": "simple",
      "text": "La cinta de cobre despertó al autómata porque el camino no solo estaba unido: también dejaba pasar."
    },
    {
      "id": "conductive_paths_technical",
      "type": "paragraph",
      "stageId": "formalization",
      "page": "right",
      "x": 8,
      "y": 20,
      "width": 84,
      "layerMode": "technical",
      "text": "Un conductor es un material que permite el movimiento de carga eléctrica con baja resistencia relativa. La continuidad física del camino también importa."
    }
  ]
}
```

## Nota de integración

Este archivo es un addendum de diseño, no está importado por React todavía. Cuando se implemente el capítulo, mover esta entrada a `src/content/journal/ohmdal.json` y conectarla con eventos `journal:entry-unlocked` y `journal:entry-updated`.
