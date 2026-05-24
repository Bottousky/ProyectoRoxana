# Spec Kit Adoption

Proyecto Roxana now includes GitHub Spec Kit v0.8.9 for a stricter Spec Driven Development workflow.

## Installed pieces

- `.specify/`: Spec Kit configuration, templates, scripts, workflows and constitution.
- `.agents/skills/`: Codex skills installed by Spec Kit, plus project-approved asset skills.
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

## Active feature

The active Spec Kit feature is pinned in `.specify/feature.json`.

Current feature:

```txt
specs/017-ohmdal-chapter-01
```

`agents.md` must point to the same plan file inside the `<!-- SPECKIT START -->` block.

## Permanent branches

The repository keeps only two permanent local branches:

```txt
main
develop
```

Use `main` as the stable base and `develop` as the active integration branch. Feature/spec branches are temporary and should be deleted after their changes are integrated.

## Branch naming

Spec Kit validates feature branches by checking the final branch segment. If a temporary feature branch uses a Codex prefix, the segment after the slash must start with a Spec Kit feature prefix.

Good:

```txt
codex/017-ohmdal-chapter-01
codex/017-depurar-skills-specs-integracion
codex/20260524-120000-agent-sprite-forge-research
```

Bad:

```txt
codex/depurar-skills-specs-integracion
```

That bad form fails `.specify/scripts/powershell/check-prerequisites.ps1` before it can resolve the active feature.

Do not keep old feature branches around as long-lived secondary branches.

## Recommended next move

Continue implementing the active Ohmdal chapter through:

```txt
specs/017-ohmdal-chapter-01
```

and run the workflow conceptually:

1. `$speckit-clarify`
2. `$speckit-plan`
3. `$speckit-tasks`
4. `$speckit-implement`

Do not implement directly from archived flat specs if important requirements are still ambiguous.

## Rules

- Keep `PDFS/`, `.next/`, `node_modules/`, and other generated or source-only local folders out of Git.
- Do not let Spec Kit overwrite Roxana's project rules in `agents.md`.
- The constitution and `agents.md` must agree on architecture, narrative rules, and QA gates.
