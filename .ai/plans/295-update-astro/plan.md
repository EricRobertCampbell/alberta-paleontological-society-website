Status: Implementing

Approved: 26 November 2026 (America/Edmonton) by `/runthrough-feature` after non-blocking `/review-plan`.

# Plan: Update to Astro 7.x

Requirements: `.ai/requirements/295-update-astro.md`.

## Objective

Upgrade the site to the newest published Astro 7.x, keep Netlify SSR working, preserve public pages / stable event URLs / API contracts, and bring Node pins (already started), Prettier, and docs in line.

## Scope

- Astro 7.x + compatible `@astrojs/netlify`
- Content Layer migration (`src/content.config.ts`, loaders, `render(entry)`, `id` instead of `slug`)
- Prettier 3 + compatible `prettier-plugin-astro`
- README Astro major version
- Node `22.23.4` in `netlify.toml` and GitHub Actions (already on branch; keep)

## Out of scope

- Page redesigns or content edits
- New Astro features beyond what the upgrade requires
- Shipping on `legacy.collectionsBackwardsCompat`
- Unrelated dependency upgrades

## Architectural approach

1. **Content Layer first (behaviour locked), then package bump.** Add a small public-id helper and failing-then-passing tests so URL identity is explicit before mass call-site edits. Migrate collections and call sites to Content Layer APIs while still on Astro 5 where possible, or immediately after the package bump if Astro 5 cannot load the new config alone — prefer one coherent migration that builds on Astro 7.
2. **Single delivery PR** on `cursor/iss-295-update-astro-491a` (already opened as #296). Use `npx @astrojs/upgrade` (or equivalent pinned installs) to land Astro 7.x + `@astrojs/netlify` 8.x. Do not leave a temporary legacy-collections flag in the final tree.
3. **Markdown:** Prefer keeping `unified()` via `@astrojs/markdown-remark` if `remarkPluginFrontmatter` or event/FAQ body rendering regresses under Sätteri; otherwise accept the Astro 7 default. Record the choice in `decisions.md`.
4. **HTML compression:** If inline spacing breaks, set `compressHTML: true` to restore prior HTML-aware spacing rather than editing every template.
5. **References:** Align `reference(...)` collection names with exported keys (`talks`, not `talk`) when migrating the config.

## Affected areas

- Config: `astro.config.mjs`, `package.json` / lockfile, `netlify.toml`, `.github/workflows/testAndLint.yml`
- Content: move/replace `src/content/config.ts` → `src/content.config.ts`
- Pages/components listed in `findings.md` that call `render` / `slug`
- Utilities: `registrationDeadline.ts`; new public-id helper under `src/utility/`
- Docs: `README.md` technology stack
- Tooling: Prettier + `prettier-plugin-astro`

## Affected files and modules

Primary:

- `package.json`, `package-lock.json`
- `astro.config.mjs`
- `src/content/config.ts` → `src/content.config.ts` (delete old path)
- All `entry.render()` / `entry.slug` call sites in `findings.md`
- `src/utility/registrationDeadline.ts` (+ tests)
- New `src/utility/contentEntry.ts` (+ adjacent test) for public URL id
- `README.md`
- Prettier deps; run format once after bump

Already done (verify still present):

- `netlify.toml` `NODE_VERSION`
- CI Node version

## Content / schema changes

- Every former `type: 'content'` collection: `loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/<dir>' })`
- Every former `type: 'data'` YAML collection: `loader: glob({ pattern: '**/*.{yml,yaml}', base: './src/content/<dir>' })`
- Keep existing `file()` loaders for fossil-sorting JSON collections
- Import `z` from `astro/zod`; adjust Zod 4 breakage if any
- Fix `reference('talk')` → `reference('talks')` if required for a green build
- Do not change markdown/YAML content bodies

## API changes

- Keep `GET /api/events`, `/api/fossil-friday`, `/api/fossil-sorting-images` response shapes.
- Map former `slug` fields with the public-id helper (`entry.id` after migration).
- `stablePath` must remain `/events/stable/{former-slug}`.

## UI changes

- No intentional UI redesign.
- Fix only markup the Rust compiler rejects, and any spacing regressions from `compressHTML`.

## Utility changes

- Add `contentEntryPublicId(entry)` (name may vary) returning the string used in public URLs (Content Layer `id`, formerly `slug`).
- Update `registrationDeadline` and pages to use it.
- Keep `extractReferenceId` as-is unless reference shapes change.

## Testing strategy

TDD for URL identity and deadline stable paths:

1. Add failing adjacent tests for the public-id helper (and extend `registrationDeadline.test.ts` if needed) that assert `/events/stable/{id}` uses the basename-style id.
2. Implement helper and call-site updates until green.
3. After package upgrade, run full `npm run test` and `npm run build`.
4. Spot-check home, events list, calendar, one stable event URL, and each API route (dev server or `astro preview` when available).

Framework-only package bumps are verified by build/test, not by inventing redundant suite wrappers.

## Migration and backwards compatibility

- Public paths `/events/stable/{slug}` stay valid for existing event basenames.
- FAQ `#` anchors that used `question.slug` must use the same public id.
- Do not rely on `legacy.collectionsBackwardsCompat` in the merged result.
- Raw API `id` strings may match the new Content Layer id; prefer that over inventing a parallel legacy id field unless a consumer break is proven.

## Security considerations

- No new HTML sinks; keep existing markdown rendering boundaries.
- Do not weaken API validation while touching routes.

## Deployment considerations

- Node `22.23.4` pinned in `netlify.toml` (in-repo overrides UI).
- CI lint job on Node `22.23.4`.
- Netlify adapter must be Astro 7–compatible (`@astrojs/netlify` 8.x).
- Production timezone remains America/Edmonton via `netlify.toml` `TZ`.

## Relevant ADRs and architecture docs

- ADR 0001 (release-please / single package) — no conflict.
- No architecture docs beyond templates.

## Open questions

None that block implementation. Choices below are recorded in `decisions.md` under `/runthrough-feature` autonomy.

## Assumptions

1. Glob `base` per collection directory yields `id` equal to today’s `slug` for markdown/YAML entries.
2. Keeping three `file()` JSON collections unchanged is correct.
3. Prettier 3 formatting churn is acceptable in this PR.
4. Continuing on PR #296 / branch `cursor/iss-295-update-astro-491a` is preferred over opening a second PR.
