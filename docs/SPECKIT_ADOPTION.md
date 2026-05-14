# Spec Kit Adoption

Proyecto Roxana now includes GitHub Spec Kit v0.8.9 for a stricter Spec Driven Development workflow.

## Installed pieces

- `.specify/`: Spec Kit configuration, templates, scripts, workflows and constitution.
- `.agents/skills/`: Codex skills installed by Spec Kit.
- `.specify/memory/constitution.md`: Roxana-specific principles and governance.

## Available skills

Spec Kit installed these Codex skills:

- `$speckit-constitution`
- `$speckit-specify`
- `$speckit-clarify`
- `$speckit-plan`
- `$speckit-tasks`
- `$speckit-analyze`
- `$speckit-checklist`
- `$speckit-implement`
- Git helper skills such as `$speckit-git-feature` and `$speckit-git-commit`

## How this maps to our current specs

The existing files in `specs/*.md` are the early Roxana SDD archive. Keep them as project memory.

For new implementation work, prefer the Spec Kit feature shape:

```txt
specs/
  009-feature-name/
    spec.md
    plan.md
    tasks.md
    research.md
    quickstart.md
```

Existing flat specs can be promoted into Spec Kit feature folders when they become active implementation work.

## Recommended next move

When we decide to implement the Roxana library Hub, promote:

```txt
specs/008-roxana-library-hub.md
```

into a Spec Kit feature folder, then run the workflow conceptually:

1. `$speckit-clarify`
2. `$speckit-plan`
3. `$speckit-tasks`
4. `$speckit-implement`

Do not implement directly from the flat spec if important requirements are still ambiguous.

## Rules

- Keep `PDFS/`, `.next/`, `node_modules/`, and other generated or source-only local folders out of Git.
- Do not let Spec Kit overwrite Roxana's project rules in `agents.md`.
- The constitution and `agents.md` must agree on architecture, narrative rules, and QA gates.
