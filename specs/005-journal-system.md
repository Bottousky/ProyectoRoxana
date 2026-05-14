# Spec 005 - Journal System

## Objetivo

Definir la bitacora como superficie React para observaciones, pistas y explicaciones formales.

## Alcance propuesto

- Entradas en JSON.
- Panel React abrir/cerrar.
- Separacion entre bitacora central y bitacora de mundo.
- Preparacion para desbloqueos futuros por eventos de gameplay.

## Fuera de alcance

- Persistencia backend.
- Sincronizacion en la nube.
- Edicion por usuario.

## Criterios de aceptacion

- La bitacora no se renderiza en Phaser.
- El contenido vive en `src/content/journal`.
- El panel es legible en desktop y mobile.
- El sistema puede crecer hacia entradas desbloqueables sin acoplarse a escenas.
