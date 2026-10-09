# AI development artifacts

Planning and requirements files for agent-assisted work on the Alberta Paleontological Society website live under `.ai/`.

## Paths

| Kind | Path |
| --- | --- |
| Requirements | `.ai/requirements/<feature-slug>.md` |
| Plans | `.ai/plans/<feature-slug>/` |

Typical plan directory contents:

- `findings.md` — research notes for a later agent
- `plan.md` — proposed approach and status
- `checklist.md` — verifiable tasks
- `decisions.md` — only when a non-obvious choice needs recording
- `plan-review.md` — written by `/review-plan`
- `verification.md` — commands and results during `/implement-feature`

Do not create empty placeholder files.

## Feature slug

Use a short kebab-case slug derived from the issue or feature name, for example:

- `todays-events`
- `bulletin-archive-search`
- `api-events-date-validation`

When a GitHub issue exists, you may prefix with the number: `248-todays-events`.

## Plan status

`plan.md` starts with a status line such as:

```markdown
Status: Draft
```

Allowed values, in order: `Draft` → `Reviewed` → `Approved` → `Implementing` → `Done`.

## Related docs

- ADRs: `readme/adr/`
- Architecture notes: `readme/architecture/`

## Related skills

Skills live in `.agents/skills/`:

- `/requirements`
- `/plan-feature`
- `/review-plan`
- `/implement-feature` (TDD: failing adjacent Vitest test first for behaviour changes)
- `/code-review` and the specialized reviews it orchestrates
