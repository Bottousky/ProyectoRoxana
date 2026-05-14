# Spec 000 - SDD Process

## Objetivo

Definir como Proyecto Roxana usa Spec Driven Development para que cada cambio tenga intencion, alcance y criterios de aceptacion claros antes de escribir codigo.

## Regla principal

Toda feature nueva debe empezar con una spec en `specs/`. El codigo se implementa contra esa spec y el QA verifica sus criterios de aceptacion.

## Formato minimo de spec

Cada spec debe incluir:

- objetivo;
- alcance;
- fuera de alcance;
- decisiones tecnicas;
- reglas de arquitectura;
- contenido o datos necesarios;
- eventos Phaser <-> React si aplica;
- criterios de aceptacion;
- QA esperado.

## Flujo de trabajo

1. Crear o actualizar spec.
2. Revisar que el alcance no contradiga `agents.md` ni `docs/`.
3. Implementar solo lo necesario para cumplir la spec.
4. Ejecutar QA tecnico.
5. Registrar en commit o PR la spec principal.

## Convencion de nombres

- Specs: `NNN-nombre-corto.md`.
- Branches: `codex/nombre-corto`.
- Commits: mencionar la spec cuando el cambio sea guiado por una.

## Criterios de aceptacion

- Hay una spec antes de implementar una feature nueva.
- Las decisiones importantes quedan versionadas.
- Los criterios de aceptacion son verificables.
- Las features no mezclan backend, login, tienda o assets finales salvo que la spec lo autorice.
