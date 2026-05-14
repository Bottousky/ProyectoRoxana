# Spec 004 - Dialogue System

## Objetivo

Evolucionar el dialogo inicial hacia un sistema narrativo simple, data-driven y preparado para IA.

## Alcance propuesto

- Biblioteca de dialogos en JSON.
- Tipos compartidos para speaker, lines y metadata.
- Event Bus como unica frontera entre Phaser y React.
- Bloqueo explicito de input durante dialogo.
- Soporte para avanzar lineas y completar dialogo.

## Reglas narrativas

- Roxana no explica conceptos cientificos de forma directa.
- Las pistas deben invitar a observar patrones.
- La informacion formal se manda a bitacora.

## Criterios de aceptacion

- Ninguna escena Phaser contiene texto narrativo hardcodeado.
- React puede renderizar un dialogo por `dialogueId`.
- Phaser no conoce el contenido textual del dialogo.
- Completar dialogo emite un evento que desbloquea gameplay.
