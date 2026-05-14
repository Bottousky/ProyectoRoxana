# AI Source Review

Revision de los PDFs locales de `PDFS/` y decision de uso para Proyecto Roxana.

## Decision de repo

Los PDFs originales no se versionan. Son material fuente local, pesado y no necesario para ejecutar ni mantener el proyecto. Lo util queda integrado como specs y docs derivados.

## Matriz por PDF

| PDF | Utilidad para Roxana | Decision |
| --- | --- | --- |
| `Mapa completo del pipeline creativo con IA.pdf` | Muy util para ordenar el flujo completo: idea, concepto, imagen base, continuidad, character sheet, biblia visual, assets y entrega. | Integrado como base del pipeline creativo. |
| `JSON Prompting y Timeline Prompting.pdf` | Muy util para SDD: prompts con campos definidos, continuidad por estructura y secuencias temporales para escenas. | Integrado como regla de prompts estructurados. |
| `Roles expertos para prompts con IA.pdf` | Util para asignar roles de IA segun tarea: director creativo, arte, personaje, pixel art, assets, worldbuilding, evaluacion. | Integrado como taxonomia de roles. |
| `Flujo 2D -_ Pixel Art Perceptual.pdf` | Critico para Roxana por el estilo pixel art: reducir sin perder silueta, paleta, gesto, accesorios y legibilidad. | Integrado como regla de pixel art. |
| `Produccion de assets con IA_ recursos visuales para videojuegos, cinematicas y diseno digital.pdf` | Muy util para convertir sistema visual aprobado en sprites, props, UI, escenas y recursos listos para produccion. | Integrado como asset pipeline. |
| `Flujo completo para construir una biblia visual de personaje con IA.pdf` | Muy util para documentar Roxana, Ohm y futuros personajes con identidad, variantes y reglas de continuidad. | Integrado como biblia visual. |
| `Flujo completo de dirección creativa con IA para desarrollar personajes.pdf` | Util para crear personajes desde distintos puntos de partida sin perder identidad. | Integrado en pipeline de personajes. |
| `Crear un personaje desde cero con IA.pdf` | Util para personajes nuevos, especialmente antes de tener imagen aprobada. | Integrado como preproduccion de personajes futuros. |
| `PROMPTEANDO _ PROMPTING EXPLICADO PASO A PASO_ DE UNA IMAGEN A UN CHARACTER SHEET_ flujo de trabajo con IA para replicar personajes.pdf` | Util para estabilizar una imagen unica en character sheet y vistas consistentes. | Integrado para personajes aprobados. |
| `Edición e iteración de personajes con IA.pdf` | Util para corregir sin regenerar todo: separar lo que se modifica, protege y evalua. | Integrado como regla de iteracion. |
| `Style Transfer con IA_ matriz completa y flujo operativo para continuidad visual.pdf` | Util para adaptar estilo, formato o atmosfera sin redisenar identidad. | Integrado con cautela para conversiones y mood variants. |
| `Anexo de comandos especializados para ampliar una biblia visual.pdf` | Util como caja de herramientas para worldbuilding, fotografia, vestuario, props y variantes. | Integrado como extension de biblia visual. |
| `De biblia visual a escenas narrativas_ cómo crear el mundo visual de un personaje.pdf` | Util para transformar biblia visual en escenas narrativas coherentes. | Integrado para escenas del Hub y Ohmdal. |
| `Storyboard y guion visual con IA.pdf` | Util para planificar escenas antes de generar imagenes o tomas. | Integrado para escenas narrativas y futuras cinematicas. |
| `Cinemáticas con IA_ cómo generar tomas breves y coherentes para un flujo audiovisual híbrido.pdf` | Util mas adelante; ahora no es prioridad porque el vertical slice no necesita cinematicas. | Registrado como fase futura. |
| `Del character sheet al modelo 3D_ documentación técnica con IA para producción visual.pdf` | Baja utilidad inmediata: Roxana es 2D pixel art. Sirve solo si en el futuro hay promo 3D, maqueta o material externo. | No integrado al flujo actual; queda como referencia futura. |

## Sintesis aplicable

- La IA debe usarse con direccion, no como generador abierto.
- Cada asset necesita funcion, formato, escala, continuidad y criterio de aprobacion.
- La identidad visual se protege antes de pedir variaciones.
- Pixel art no es solo aplicar textura retro: es traducir identidad a baja resolucion.
- Prompts complejos deben estructurarse en campos o timeline.
- Una imagen atractiva no alcanza; para produccion hacen falta reglas reutilizables.
- Cinematicas y 3D quedan fuera del vertical slice inicial salvo spec dedicada.
