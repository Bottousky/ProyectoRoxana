# Superpowers Integration

Proyecto Roxana includes local copies of the `obra/superpowers` Codex skills so future agent sessions can use the methodology without depending on a marketplace install.

## Source

- Repository: https://github.com/obra/superpowers
- Version inspected: `5.1.0`
- Source commit integrated: `f2cbfbefebbfef77321e4c9abc9e949826bea9d7`
- License: MIT, copied to `.agents/skills/SUPERPOWERS_LICENSE`

## Installed Skills

The following skills were copied into `.agents/skills/`:

- `brainstorming`
- `dispatching-parallel-agents`
- `executing-plans`
- `finishing-a-development-branch`
- `receiving-code-review`
- `requesting-code-review`
- `subagent-driven-development`
- `systematic-debugging`
- `test-driven-development`
- `using-git-worktrees`
- `using-superpowers`
- `verification-before-completion`
- `writing-plans`
- `writing-skills`

## Project Precedence

Superpowers is methodology support. It does not replace the Roxana rules.

Priority order for this project:

1. User instructions in the current conversation.
2. `agents.md` and `.specify/memory/constitution.md`.
3. Active Spec Kit feature specs under `specs/`.
4. Superpowers skills.
5. General assistant defaults.

## Intended Use

Use Superpowers for:

- planning implementation work;
- verifying before completion;
- systematic debugging;
- code review workflows;
- finishing a branch;
- test-driven development when a task calls for it;
- subagent-driven development only when explicitly allowed.

Keep using Spec Kit as the source of truth for product/features.

## Maintenance

To update Superpowers later:

1. Inspect the upstream repository and release notes.
2. Copy changed skill folders into `.agents/skills/`.
3. Update this document with the new version and commit.
4. Run a quick `git diff` review to catch unexpected changes.
