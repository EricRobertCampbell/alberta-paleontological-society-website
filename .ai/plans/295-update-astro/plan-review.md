# Plan Review

## Blocking Issues

None.

## Important Issues

1. **API `id` vs `slug` dual mapping.** `api/events.ts` currently maps both `id: event.id` and `slug: event.slug` into `eventsForApiRange`. After Content Layer, those may become the same string. Confirm deadline `sourceEventId` / anchor ids and any consumer relying on the old path-like `id` (with extension) still behave. The plan mentions this; checklist should explicitly verify API JSON for one underlying event and one deadline event.

2. **`remarkPluginFrontmatter` vs `entry.data`.** Listings depend on frontmatter from `render()`. The plan’s fallback is good; add a verification checklist item that at least one listing still shows title/dates after upgrade (not only that build exits 0).

3. **Prettier churn timing.** Running Prettier 3 across the repo can drown the upgrade diff. Prefer a dedicated `chore` commit for format-only changes after functional commits, or limit format to files the plugin requires — so reviewers can still read the Astro migration.

## Generalization Opportunities

### Recommended

None beyond the planned `contentEntryPublicId` helper (already justified by repeated slug call sites).

### Not Recommended

- Custom content CMS or abstraction layer for “future Astro majors.”
- Keeping a permanent compatibility shim that re-adds `entry.slug` on every collection entry.

## Questions

None blocking. Markdown/`compressHTML` fallbacks are adequately decided.

## Suggested Changes

1. Add an explicit checklist verification bullet: inspect `GET /api/events` JSON for `id` / `stablePath` on a sample range.
2. Prefer separating Prettier reformat into its own commit inside the same PR.
3. When migrating `glob` bases, double-check empty-collection failure mode (wrong `base` yields empty arrays and a green build).

## Missing Tests

- Public-id helper tests (already planned) — required.
- No need for a full Astro framework suite. Medium: if API `id` shape changes, extend `registrationDeadline` / API-adjacent coverage so `stablePath` and deadline ids cannot silently drift — plan already covers `stablePath`; ensure one test documents the public id string for a representative event basename.

## Positive Findings

- Requirements are complete and human-confirmed (Astro 7.x, Node pin, CI, Prettier).
- Findings correctly inventory every `render`/`slug` call site and loader vs legacy collections.
- Plan correctly rejects shipping on `legacy.collectionsBackwardsCompat`.
- Node pins already on the branch reduce deploy risk.
- TDD target (URL public id) matches the highest behavioural risk.

## Recommendation

approve
