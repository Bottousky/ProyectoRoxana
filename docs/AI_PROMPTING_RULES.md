# AI Prompting Rules

Reglas para prompts usados en Proyecto Roxana.

## Principios

- Prompt estructurado antes que pedido largo y ambiguo.
- Rol experto segun tarea.
- Campos separados para proteger continuidad.
- Timeline cuando haya secuencia, escena o progresion.
- Evaluacion contra spec, no contra gusto aislado.

## Roles recomendados

| Tarea | Rol IA |
| --- | --- |
| Direccion general | Director creativo senior |
| Identidad de personaje | Disenador senior de personajes |
| Biblia visual | Director de arte de continuidad |
| Pixel art | Artista pixel art y supervisor de legibilidad |
| Assets de juego | Supervisor de produccion visual para videojuegos |
| Escenas narrativas | Director narrativo visual |
| Storyboard | Storyboard artist |
| QA visual | Evaluador de continuidad y legibilidad |

## Plantilla JSON para personaje

```json
{
  "project": "Proyecto Roxana",
  "target": "Roxana",
  "role": "guia narrativa central",
  "narrative_core": {
    "desire": "",
    "fear": "",
    "contradiction": "",
    "relationship_to_world": ""
  },
  "visual_identity": {
    "silhouette": "",
    "proportions": "",
    "palette": [],
    "materials": [],
    "essential_accessories": [],
    "expression_rules": ""
  },
  "allowed_variations": [],
  "forbidden_changes": [],
  "output": {
    "format": "character sheet",
    "style": "2D source for pixel art translation",
    "acceptance_criteria": []
  }
}
```

## Plantilla JSON para asset

```json
{
  "project": "Proyecto Roxana",
  "asset_id": "",
  "asset_type": "sprite | prop | tile | ui | scene_reference",
  "gameplay_function": "",
  "base_resolution": "384x216",
  "tile_size": 16,
  "visual_rules": {
    "must_preserve": [],
    "may_simplify": [],
    "must_avoid": []
  },
  "states": [],
  "technical_requirements": {
    "format": "png",
    "background": "transparent",
    "scale_notes": ""
  },
  "acceptance_criteria": []
}
```

## Plantilla timeline para escena

```json
{
  "scene_id": "",
  "purpose": "",
  "continuity_rules": [],
  "beats": [
    {
      "order": 1,
      "action": "",
      "emotion": "",
      "camera_or_composition": "",
      "gameplay_relevance": ""
    }
  ],
  "what_must_remain_clear": [],
  "what_must_not_happen": []
}
```

## Antipatrones

- Pedir "mejorar" sin decir que se protege.
- Generar muchas variantes sin criterio de aprobacion.
- Usar IA para saltar la spec.
- Aceptar una imagen porque se ve bien aunque no funcione en 384x216.
- Mezclar cinematicas, marketing y gameplay en el mismo prompt.
- Meter assets finales en una fase que solo pide placeholders.
