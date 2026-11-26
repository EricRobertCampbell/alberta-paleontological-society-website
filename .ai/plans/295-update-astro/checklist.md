# Checklist: 295-update-astro

## Tests

- [x] Add failing Vitest coverage adjacent to a new `src/utility/contentEntry` helper for the public content id used in URLs (former `slug`)
- [x] Extend or confirm `registrationDeadline.test.ts` still asserts `stablePath` uses that public id

## Content / utilities

- [x] Implement `contentEntryPublicId` (or equivalent) and use it at slug call sites
- [x] Move collections to `src/content.config.ts` with `glob`/`file` loaders; remove `type`; import `z` from `astro/zod`
- [x] Delete legacy `src/content/config.ts`
- [x] Replace `entry.render()` with `render(entry)` from `astro:content` at all call sites
- [x] Fix `reference('talk')` → `reference('talks')` if the build requires it
- [x] Preserve `remarkPluginFrontmatter` behaviour or migrate reads to `entry.data` without changing visitor-visible content

## Dependencies / config

- [x] Upgrade to newest Astro 7.x and compatible `@astrojs/netlify` (via `@astrojs/upgrade` or pinned installs)
- [x] Upgrade Prettier 3.x and compatible `prettier-plugin-astro`; run format if required for a green lint workflow
- [x] Adjust `astro.config.mjs` only as needed (markdown processor, `compressHTML`, adapter) — defaults accepted; no change required
- [x] Confirm `netlify.toml` `NODE_VERSION = '22.23.4'` and CI Node `22.23.4` remain

## Docs

- [x] Update README technology stack from Astro 5 to Astro 7

## Verification

- [x] `npm run test` passes
- [x] `npm run build` passes
- [x] Spot-check home, `/events/`, `/events/calendar`, one `/events/stable/{slug}`, and the three API routes
- [x] Inspect `GET /api/events` JSON for a sample range: underlying event `id` and deadline `stablePath` match former slug basenames
- [x] Confirm at least one event listing still shows title and dates after render (not build-only)
- [x] Confirm collection counts are non-zero after glob migration (wrong `base` can yield empty collections with a green build)

## Delivery

- [ ] Commit on `cursor/iss-295-update-astro-491a` and update PR #296 into `main` (do not merge). End description with `Closes #295` when the upgrade is complete.
