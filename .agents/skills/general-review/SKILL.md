---
name: general-review
description: Review an APS website diff for correctness, regressions, error handling, maintainability, and docs consistency. Use when the user runs /general-review, or when /code-review includes the general quality pass.
---

# General review

Review the diff for defects that are not specific to frontend, content, API, security, or test conventions. Those domains have their own skills. Read [findings.md](../code-review/references/findings.md) and use it for every finding.

## What to review

- Correctness and edge cases
- Regressions in neighbouring behaviour
- Error handling
- Significant performance problems
- Unnecessary complexity, duplication, and dead code
- Consistency with existing project patterns in this Astro SSR repo
- Whether a new abstraction is justified by a real repeated case
- Whether a one-off special case ignores an existing shared utility that would be clearer and no harder to use

Prefer named constants over magic values.

Order functions from general to specific. If function A calls function B, define A first and B after it. Shared helpers belong in `src/utility/`.

When the diff touches UI files, also apply [frontend.md](../code-review/references/frontend.md). When it touches content or utilities, also apply [content.md](../code-review/references/content.md). The matching specialized skill covers the domain checklist; do not repeat those findings here when `/code-review` is running both.

## Architecture docs

Architecture docs live in `readme/architecture/`. Match them to the diff before finishing.

1. List `readme/architecture/*.md`. Skip `README.md` and `TEMPLATE.md`.
2. Read frontmatter only. Keep a doc when any `paths` glob matches a changed file.
3. Read each matching doc in full. Check the diff against its purpose, invariants, and flow.
4. If nothing matches, say so. Do not invent an architecture constraint.
5. If the diff contradicts a doc, report it as High. If the diff deliberately changes the documented behaviour, the same change must update that architecture doc. Report a missing update as Medium.

Also check `README.md` and, when API routes change, `src/pages/api/README.md`.

## ADRs

ADRs live in `readme/adr/`. Follow `readme/adr/README.md`.

- If the diff contradicts an Accepted ADR, report that as High and point at the ADR.
- A deliberate change to that decision needs an ADR update (or a superseding ADR) in the same change.
- Skip `README.md` and `TEMPLATE.md` when scanning for constraints.

## Under-generalized and over-built changes

Flag a change as Medium when all of the following are true:

- A more general approach is equally understandable, or easier to understand
- It matches an existing abstraction and reduces duplication
- The extra implementation, test, and maintenance cost is small
- Similar code or a neighbouring feature shows the general form will actually be reused

Do not request a new framework, plugin system, or configurable abstraction for a hypothetical future requirement.

## Output

Follow [findings.md](../code-review/references/findings.md).
