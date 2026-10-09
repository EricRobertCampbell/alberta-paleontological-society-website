---
name: implement-feature
description: Implement an APS website feature, enhancement, bug fix, refactor, or other code change using test-driven development when behaviour changes, and using a plan directory when one exists. Use when the user runs /implement-feature or asks to implement a change. For substantial work with no plan, stop and recommend /plan-feature. For a material conflict between the plan and the repo, stop for human confirmation.
---

# Implement feature

This is the general implementation skill for features, enhancements, bug fixes, refactors, and other normal development. Do not create a separate implementation path per change type.

## Choose the weight of process

Use a plan when the work is a new feature, a cross-cutting change, a content-schema or API contract change, an architectural change, or a request whose requirements are still unclear.

For an isolated bug fix, typo, small UI change, simple content update, or straightforward maintenance task:

- Do not create `.ai/plans/` or `.ai/requirements/`
- Follow steps 1 through 8 and 10 through 13 below. Skip step 9. There is no checklist or status to update
- If the task turns out to need schema, API, or architectural decisions, stop and recommend [plan-feature](../plan-feature/SKILL.md)

For substantial work with no plan, recommend `/plan-feature` and stop. Continue without a plan only when the user explicitly says to.

## When a plan exists

The planning directory `.ai/plans/<feature-slug>/` is the source of truth. Read:

- `findings.md`
- `plan.md`
- `checklist.md`
- `plan-review.md` when present
- `decisions.md` when present
- Relevant ADRs in `readme/adr/` and architecture docs in `readme/architecture/`
- Any other docs the plan names

The user's request to implement records approval: set `Status: Approved`, then `Implementing`, and note the date in `plan.md`. If `plan-review.md` lists blocking issues and the user has not accepted them, show those issues and wait for confirmation before editing application code.

Update `checklist.md` as work is verified, not merely written. Add tasks the plan missed. Do not delete a cancelled task; mark it cancelled and say why.

Do not follow the plan when the repository contradicts it. Use [Contradictions](#contradictions).

## Git base branch

The repo's integration branch is `main` (Netlify deploys from `main`). When creating a feature branch for implementation work:

1. Fetch and update local `main` from `origin/main`.
2. Create the feature branch from `main` (for example `git checkout -b <branch> main` or `git switch -c <branch> main`).
3. Open the pull request with `main` as the base branch.

Do not branch from or target `development` unless the user explicitly asks for that.

## Test-driven development

For any change that alters behaviour (feature, bug fix, or logic refactor), implement with failing tests first:

1. **Identify the behaviour** to lock in (acceptance criteria, bug reproduction, or plan test tasks).
2. **Write or extend a Vitest test adjacent to the module under change**, using the `.test.ts` extension. Prefer `foo.test.ts` next to `foo.ts`, or a colocated `__tests__/` directory beside that file, component, page, or API route. Extend an existing adjacent suite when one already covers that module (including legacy suites such as `src/utility/__tests__/` when changing those utilities).
3. **Run the test and confirm it fails** for the right reason (`npm run test` / Vitest). If it passes before the fix, the test is not covering the gap — rewrite it.
4. **Only then** change application code to make the test pass.
5. **Refactor** if needed while keeping tests green.
6. **Re-run tests** before calling the work done.

Skip the failing-test-first sequence only when the change cannot hide a logic regression — for example pure copy edits, image asset drops, or markup-only tweaks with no conditional behaviour. If unsure, write the test.

Do not implement production code for a behaviour change and only add tests afterwards.

## Workflow

1. Understand the task.
2. Read planning artifacts when they exist.
3. Read relevant ADRs in `readme/adr/` before making an architectural choice. Skip `README.md` and `TEMPLATE.md` there. Also read matching docs in `readme/architecture/` and project READMEs when relevant.
4. Inspect the existing implementation and match its patterns. Frontend conventions are in [frontend.md](../code-review/references/frontend.md). Content and utility conventions are in [content.md](../code-review/references/content.md).
5. Apply [Test-driven development](#test-driven-development): write the failing adjacent test first for behaviour changes, then implement.
6. Implement incrementally. Keep shared helpers in `src/utility/` and follow `.cursor/rules/function-order.mdc`.
7. Run the relevant checks: `npm run test`, and `npm run build` when pages, content schemas, or config may break the Astro build.
8. Review the resulting diff against the plan, when one exists, and the conventions above.
9. When a plan directory exists, update `checklist.md` as work is verified, not merely written, and record commands and results in `verification.md`. Add tasks the plan missed. Do not delete a cancelled task; mark it cancelled and say why.
10. Verify the behaviour. For a UI change, exercise the affected flow in the browser when browser tools are available. If they are not, say what was not verified.
11. Apply [ADR consideration](#adr-consideration) and [Doc consideration](#doc-consideration).
12. A change that alters a documented invariant or architecture flow updates `README.md`, `src/pages/api/README.md`, and/or the matching doc under `readme/architecture/` in the same change.
13. When a plan directory exists and its checklist is complete, set `Status: Done`. Summarize what changed, what was verified, and any remaining risk. The next step is [code-review](../code-review/SKILL.md).

Do not claim the task is complete because the code was written. Behaviour changes are incomplete until the new tests failed first, then passed with the implementation.

When you create a branch or a commit, follow [Branches and commits](#branches-and-commits).

## Branches and commits

Name a new implementation branch:

```text
iss-<number>-<description>
```

`<number>` is the GitHub issue number when one exists. `<description>` is a short kebab-case summary. Example: `iss-248-todays-events`. If there is no issue number, use a short kebab-case description alone.

Write each commit with the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) formula. This repo's changelog is generated from those messages.

```text
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

Use a type such as `feat`, `fix`, `refactor`, `perf`, `test`, `docs`, `content`, or `chore`. When you include a scope, wrap it in parentheses. Keep the description in the imperative mood.

When the commit closes an issue, make the last line of the message `Closes #<issue number>`.

```text
fix: show todays events in Edmonton timezone

Align "today" filtering with America/Edmonton in production.

Closes #248
```

Only create commits when the user asks for them.

## Contradictions

If repository reality materially contradicts the plan, do not silently adapt and continue.

Examples: an expected abstraction is missing or means something else, the planned architecture conflicts with the code, requirements are incomplete, complexity is materially different, a different existing abstraction should be reused, or the scope has changed.

1. **Document the discovery** in `findings.md`. Record a decision in `decisions.md` when you are proposing one.
2. **Update** `plan.md` and `checklist.md`. Keep the previous reasoning under `## Revisions` with the date and why it changed.
3. **Classify the impact.** This repo has no separate impact scale, so use:
   - **minor** — a detail is wrong, and the approach, scope, and architecture still hold. Record it and continue.
   - **moderate** — the approach changes, and the objective and architecture still hold. Stop for confirmation.
   - **major** — scope, requirements, architecture, or the reuse target is wrong. Stop, and recommend `/plan-feature` again.
4. **Present the discrepancy** in this form:

```text
Plan assumption:
...

Repository reality:
...

Impact:
...

Proposed approach:
...

Why the plan may need to change:
...

Recommendation:
- continue
- revise plan
- re-run /plan-feature
```

5. **Wait** for human confirmation before continuing when the impact is moderate or major. Do not unilaterally redefine the implementation.
6. **Re-plan** when the discrepancy is major. Say that a new `/plan-feature` pass is preferable to patching an inaccurate plan.

## Doc consideration

After the implementation, ask: did this work change a documented invariant (content collections, date handling, API contract, deploy/timezone behaviour, testing layout)?

If yes, update the matching project or architecture doc in the same change. If no, do not invent documentation.

## ADR consideration

After the implementation, ask: did this work introduce, materially change, or establish an architectural decision that should be preserved for future developers and AI agents?

If yes, add or supersede an ADR using `readme/adr/README.md`. If no, do not write one. Trivial implementation details do not get an ADR.

Read relevant ADRs before choosing an architecture, not only afterwards.

## Related

- Planning: [plan-feature](../plan-feature/SKILL.md)
- Plan review: [review-plan](../review-plan/SKILL.md)
- Code review: [code-review](../code-review/SKILL.md)
- ADR convention: `readme/adr/README.md`
