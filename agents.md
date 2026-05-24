# Proyecto Roxana - AGENTS.md

## Identidad del proyecto

Proyecto Roxana es un juego educativo narrativo web-first para publico 12+, construido como una experiencia 2D top-down embebida en una aplicacion web.

El jugador encuentra a Roxana, una IAmemoria atrapada en una biblioteca abandonada, y junto a ella explora mundos donde el conocimiento cientifico se perdio.

El aprendizaje debe ocurrir por exploracion, interaccion y resolucion de problemas. Nunca debe sentirse como una clase tradicional.

## Stack tecnico

- Next.js
- React
- TypeScript
- Phaser
- Tailwind CSS
- Zustand para estado liviano
- Tiled para mapas
- Contenido narrativo en JSONMarkdown

## Separacion de responsabilidades

Phaser debe encargarse de
- mundo jugable
- mapas
- jugador
- NPCs
- camara
- colisiones
- objetos interactivos
- puzzles visuales
- eventos de gameplay

React debe encargarse de
- dialogos
- bitacora
- HUD
- inventario
- menu
- controles mobile
- login futuro
- progreso futuro
- tienda futura
- videos y links externos

## Regla de oro narrativa

Roxana y los personajes guia NUNCA explican directamente conceptos cientificos.

No usar frases como
- Esto es un circuito cerrado
- La ley de Ohm dice...
- Una variable es...
- La energia cinetica se calcula...

En gameplay, los personajes deben
- hacer preguntas
- reaccionar emocionalmente
- usar metaforas narrativas
- dar pistas indirectas
- invitar a observar patrones

La explicacion formal vive en la bitacora, no en el dialogo de gameplay.

## MVP actual

El objetivo actual es construir un vertical slice

- Hub + Ohmdal
- 1 capitulo jugable
- 20 a 30 minutos de duracion final
- 3 puzzles de electricidad
- Roxana como guia central
- Ohm como guia del mundo Ohmdal
- bitacora central
- bitacora de mundo
- objeto recuperado que vuelve al Hub

## Resolucion, escala y UI

La escala visual no esta cerrada como pixel art estricto. El prototipo historico usa `384x216` y tile/base grid `16`, pero las specs nuevas deben separar viewport logico, tamano de mundo y estilo visual final.

Para nuevas escenas de capitulo, tomar como referencia `docs/GAME_SCALE_AND_ART_DIRECTION.md`: viewport logico sugerido `640x360`, mapas mas grandes que el viewport, camara con seguimiento y grid de diseno `32` no necesariamente pixel-art final.

La UI textual NO debe renderizarse dentro de Phaser salvo casos minimos. Dialogos, bitacora, inventario y menus deben ser ReactHTML para asegurar legibilidad en PC y mobile.

## Arquitectura esperada

Usar una arquitectura modular

- gamescenes
- gameentities
- gamesystems
- gamepuzzles
- componentsdialogue
- componentsjournal
- store
- contentworlds
- contentdialogues
- contentjournal

Evitar archivos gigantes. Evitar meter logica de UI dentro de escenas Phaser.

## Comunicacion Phaser <-> React

Usar un Event Bus tipado para comunicar eventos.

Ejemplos
- Phaser emite `dialoguestart`
- React muestra dialogo
- React emite `dialoguecomplete`
- Phaser desbloquea movimiento o avanza estado

## Criterio de calidad

Antes de agregar nuevas features, validar que

- funciona en desktop browser
- funciona en mobile browser
- el texto se lee comodo
- el player se controla bien
- no se rompe el aspect ratio
- el codigo esta tipado
- el contenido narrativo esta separado de la logica

## Spec Driven Development

Antes de implementar una feature nueva, crear o actualizar una spec en `specs/`.

GitHub Spec Kit esta instalado en `.specify/` y sus skills Codex viven en `.agents/skills/`.

Agent Sprite Forge tambien esta integrado como skills locales en `.agents/skills/` para produccion visual 2D:

- `$generate2dmap`
- `$generate2dsprite`

Usar Agent Sprite Forge solo para mapas, sprites, props, referencias visuales y procesamiento de assets 2D. No reemplaza Spec Kit, no decide contenido narrativo y no autoriza assets finales si la spec vigente solo permite placeholders. Ver `docs/AGENT_SPRITE_FORGE_REVIEW.md`.

Para nuevas features activas, preferir el flujo:

- `$speckit-specify`
- `$speckit-clarify`
- `$speckit-plan`
- `$speckit-tasks`
- `$speckit-implement`

Flujo de ramas:

- `main`: base estable.
- `develop`: integracion activa del vertical slice.
- ramas feature temporales: crear solo cuando una spec activa lo necesite y eliminarlas despues de integrar.
- las ramas feature de Spec Kit deben usar prefijo compatible, por ejemplo `017-ohmdal-chapter-01`.

La constitucion del proyecto vive en `.specify/memory/constitution.md`.

Cada spec debe declarar:

- objetivo
- alcance
- fuera de alcance
- decisiones tecnicas
- reglas narrativas si aplica
- eventos Phaser <-> React si aplica
- criterios de aceptacion
- QA esperado

El codigo debe implementarse contra la spec, no contra ideas sueltas.

## Uso de IA en produccion creativa

Los PDFs fuente sobre IA son material local y no deben versionarse en el repo.

Las reglas derivadas viven en:

- `docs/AI_SOURCE_REVIEW.md`
- `docs/AI_CREATIVE_PIPELINE.md`
- `docs/AI_PROMPTING_RULES.md`
- `docs/PIXEL_ART_AI_RULES.md`

La IA puede ayudar a explorar, documentar, producir variantes y preparar assets, pero no reemplaza la spec ni la direccion del proyecto.

No agregar assets finales generados con IA si la spec vigente solo permite placeholders.

## Prohibiciones

No construir backend todavia.
No construir tienda todavia.
No construir login todavia.
No construir los 4 mundos todavia.
No meter explicaciones educativas directas en dialogos.
No hardcodear dialogos dentro de escenas Phaser.
No acoplar puzzles a UI React salvo mediante eventos.

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read
`specs/017-ohmdal-chapter-01/plan.md`.
<!-- SPECKIT END -->
