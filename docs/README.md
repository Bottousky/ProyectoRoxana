# Proyecto Roxana — Fuente de verdad

Esta carpeta es la **fuente de verdad incremental** del MVP y del canon jugable de Proyecto Roxana.

Regla principal:

> Si una decisión de lore, guion, diseño educativo o estructura de niveles no está en `docs/`, no es canon.

Los chats sirven para explorar ideas. Codex sirve para implementar. Esta documentación decide qué se considera verdad del proyecto.

## Estructura

- `canon/`: reglas globales, identidad del juego, escuela, Roxana, bitácora y personajes transversales.
- `worlds/ohmdal/`: biblia del mundo de Ohmdal, Unidad 1, assets y reglas educativas propias del mundo.
- `production/`: instrucciones para Codex, decisiones tomadas, preguntas abiertas y manifiestos de assets.

## Flujo recomendado

1. Explorar ideas en ChatGPT o en notas sueltas.
2. Convertir lo que se acepta en cambios canonizados dentro de `docs/`.
3. Pedirle a Codex que lea `docs/production/codex_instructions.md` antes de tocar código.
4. Implementar solo lo documentado.
5. Si aparece una decisión nueva durante desarrollo, registrarla en `docs/production/decisions_log.md` o dejarla como duda en `docs/production/open_questions.md`.

## Regla de oro

```text
Idea exploratoria → Propuesta → Decisión → Documento canon → Implementación
```

Nunca implementar lore nuevo directamente desde una conversación sin actualizar primero esta carpeta.
