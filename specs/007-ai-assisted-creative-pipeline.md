# Spec 007 - AI Assisted Creative Pipeline

## Objetivo

Integrar los aprendizajes utiles de los PDFs de IA como un pipeline SDD para direccion creativa, prompts, pixel art, assets y escenas de Proyecto Roxana.

## Alcance

- Revisar PDFs locales y extraer principios utiles.
- Versionar docs derivados, no PDFs originales.
- Definir reglas para prompts estructurados.
- Definir flujo creativo asistido por IA.
- Definir criterios para assets generados con IA.
- Definir reglas de pixel art perceptual.

## Fuera de alcance

- Subir PDFs originales al repo.
- Generar assets finales ahora.
- Crear cinematicas.
- Crear material 3D.
- Cambiar la arquitectura Next/React/Phaser.

## Decisiones

- Los PDFs se consideran material fuente local.
- Lo integrado vive en `docs/AI_SOURCE_REVIEW.md`, `docs/AI_CREATIVE_PIPELINE.md`, `docs/AI_PROMPTING_RULES.md` y `docs/PIXEL_ART_AI_RULES.md`.
- La carpeta `PDFS/` queda ignorada por Git.
- La IA se usa para explorar y producir bajo specs, no para saltarse specs.

## Criterios de aceptacion

- Cada PDF queda clasificado por utilidad.
- Las reglas utiles quedan integradas como docs accionables.
- Lo no util para el vertical slice actual queda marcado como futuro o descartado.
- Los PDFs originales no se stagean.
- `npm run lint` pasa.
- `npm run build` pasa.
