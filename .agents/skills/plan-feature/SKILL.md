---
name: plan-feature
description: Research the APS website repo and write a persisted implementation plan for a substantial feature, enhancement, refactor, complex bug fix, or architectural change. Use when the user runs /plan-feature or asks for an implementation plan before coding. Do not use it for trivial edits, and do not start implementation.
---

# Plan feature

Produce a plan and stop for human review. Do not edit application code.

Skip this skill for trivial work: an isolated bug fix, typo, small UI change, simple content update, or other task that follows one existing pattern and does not change content schemas, API contracts, or architecture. Those go to [implement-feature](../implement-feature/SKILL.md). If the user explicitly ran `/plan-feature` on work that is trivial, say so and write the planning files only after they confirm they still want a plan.

## Workflow

1. Understand the requested work. Read `.ai/requirements/<feature-slug>.md` when it exists, and any requirements file the user names.
2. Inspect the repository enough to see how this area actually works. Cover the items in [What to inspect](#what-to-inspect) that are relevant. Record discoveries while you go.
3. Read matching architecture docs in `readme/architecture/` and relevant ADRs in `readme/adr/`. Skip `README.md` and `TEMPLATE.md` in those folders. Also read the project `README.md` and `src/pages/api/README.md` when APIs are involved.
4. Distinguish discoveries, requirements, assumptions, decisions, and open questions. Do not invent a requirement that the request and the requirements file do not support. Label assumptions as assumptions.
5. Write the planning files. Follow `.ai/README.md`.
6. Review the plan against [Before finishing](#before-finishing).
7. Set `Status: Draft` and stop. Ask the human to run `/review-plan` or to approve the plan. Do not implement it.

## What to inspect

Look for the relevant subset of:

- Astro pages under `src/pages/`
- Components under `src/components/` and layouts under `src/layouts/`
- Content collections under `src/content/` and schemas in `src/content/config.ts`
- Shared utilities under `src/utility/`
- API routes under `src/pages/api/`
- Styling under `src/styling/`
- Static assets under `public/`
- Existing similar implementations and patterns to reuse
- Adjacent Vitest tests next to the modules under change (including any existing `__tests__/` suites)
- Docs in `readme/`, ADRs in `readme/adr/`, project `README.md`, and the API README

Record reusable patterns. Prefer extending an existing abstraction when it already covers the case. Note architectural implications, edge cases (especially dates/timezones), task dependencies, and missing requirements.

## Files to write

Create `.ai/plans/<feature-slug>/` and write:

- `findings.md` — research for a later agent, not a short summary. Include relevant files, existing implementations, architectural patterns, content/API contracts, tests, reusable code, constraints, and potential problems.
- `plan.md` — the proposed approach
- `checklist.md` — concrete tasks

Also write `decisions.md` when the plan makes a choice a later reader would otherwise have to reverse-engineer. Do not create empty `progress.md`, `decisions.md`, or `verification.md` files.

`plan.md` starts with `Status: Draft`. Use later statuses only as the workflow changes them: `Reviewed`, `Approved`, `Implementing`, `Done`.

Include these sections in `plan.md` when they are relevant. Omit a section that does not apply rather than filling it with filler:

- Objective
- Scope
- Out of scope
- Architectural approach
- Affected areas (pages, components, content, utilities, API, assets)
- Affected files and modules
- Content / schema changes
- API changes
- UI changes
- Utility changes
- Testing strategy (TDD: failing adjacent tests first for behaviour changes)
- Migration and backwards compatibility
- Security considerations
- Deployment considerations (Netlify, timezone)
- Relevant ADRs and architecture docs
- Open questions
- Assumptions

`checklist.md` uses tasks that can be completed and verified on their own. Group them by area, and include only groups that apply. For behaviour changes, put failing-test tasks before implementation tasks:

```markdown
## Tests

- [ ] Add failing Vitest coverage adjacent to ...

## Content / utilities

- [ ] Update ...

## UI

- [ ] Add ...

## API

- [ ] Update ...

## Verification

- [ ] Run `npm run test` / `npm run build`
```

## Before finishing

Check that:

- The plan is internally consistent
- Each requested requirement is represented, or explicitly out of scope
- The plan follows existing repository conventions
- Relevant tests are identified next to the modules they cover, with a failing-test-first order for behaviour work
- Relevant ADRs and architecture docs were considered
- Dependencies between tasks are explicit
- Open questions that would change the approach are visible

If a requirements file is missing and the request is still ambiguous, write the questions into `plan.md` and say that `/requirements` should be run before implementation. Do not invent the missing requirements.

## Related

- Requirements: [requirements](../requirements/SKILL.md)
- Plan review: [review-plan](../review-plan/SKILL.md)
- Implementation: [implement-feature](../implement-feature/SKILL.md)
- Paths: `.ai/README.md`
