# Proyecto Roxana - AGENTS.md

## Identidad del proyecto

Proyecto Roxana es un juego educativo narrativo web-first para publico 12+, construido como una experiencia 2D pixel art top-down embebida en una aplicacion web.

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

## Resolucion y UI

El gameplay usa pixel art con resolucion base 384x216 y tiles de 16x16.

La UI textual NO debe renderizarse dentro de Phaser salvo casos minimos.
Dialogos, bitacora, inventario y menus deben ser ReactHTML para asegurar legibilidad en PC y mobile.

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

## Prohibiciones

No construir backend todavia.
No construir tienda todavia.
No construir login todavia.
No construir los 4 mundos todavia.
No meter explicaciones educativas directas en dialogos.
No hardcodear dialogos dentro de escenas Phaser.
No acoplar puzzles a UI React salvo mediante eventos.
