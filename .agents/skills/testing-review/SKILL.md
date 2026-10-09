---
name: testing-review
description: Review whether an APS change is verified by Vitest tests that actually check the stated behaviour. Use when the user runs /testing-review, or when /code-review reviews a behaviour change.
---

# Testing review

Read [findings.md](../code-review/references/findings.md). A missing test is Medium only when it can hide a regression. Do not require a test for a trivial change that cannot hide one (for example copy-only content updates).

## Where tests live

Place tests **adjacent to the module under change**, not in a single central folder by default.

- Prefer `foo.test.ts` next to `foo.ts`, or a colocated `__tests__/` directory beside that module.
- For an Astro component or page, colocate the test with that component or page (same directory).
- For an API route under `src/pages/api/`, colocate the test with that route.
- Existing tests under `src/utility/__tests__/` may be extended when changing those utilities; do not move unrelated new coverage there.
- Use the `.test.ts` extension for new tests (do not add new `.spec.ts` files).
- Run tests with `npm run test` or `npm run coverage`.

## What to review

- The tests assert the behaviour the change claims, including failure paths
- Tests sit next to the code they cover (or extend an existing adjacent suite for that same module)
- Edge cases called out in requirements, the plan, or the diff (especially dates and timezones)
- Regressions in neighbouring behaviour the diff could disturb
- Tests that pass without exercising the new branch
- Gaps where behaviour has no practical harness; report the gap rather than inventing a new test runner mid-change

## Output

Follow [findings.md](../code-review/references/findings.md).
