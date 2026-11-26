# Checklist: 295-update-astro

## Tests

- [ ] Add failing Vitest coverage adjacent to a new `src/utility/contentEntry` helper for the public content id used in URLs (former `slug`)
- [ ] Extend or confirm `registrationDeadline.test.ts` still asserts `stablePath` uses that public id

## Content / utilities

- [ ] Implement `contentEntryPublicId` (or equivalent) and use it at slug call sites
- [ ] Move collections to `src/content.config.ts` with `glob`/`file` loaders; remove `type`; import `z` from `astro/zod`
- [ ] Delete legacy `src/content/config.ts`
- [ ] Replace `entry.render()` with `render(entry)` from `astro:content` at all call sites
- [ ] Fix `reference('talk')` → `reference('talks')` if the build requires it
- [ ] Preserve `remarkPluginFrontmatter` behaviour or migrate reads to `entry.data` without changing visitor-visible content

## Dependencies / config

- [ ] Upgrade to newest Astro 7.x and compatible `@astrojs/netlify` (via `@astrojs/upgrade` or pinned installs)
- [ ] Upgrade Prettier 3.x and compatible `prettier-plugin-astro`; run format if required for a green lint workflow
- [ ] Adjust `astro.config.mjs` only as needed (markdown processor, `compressHTML`, adapter)
- [ ] Confirm `netlify.toml` `NODE_VERSION = '22.23.4'` and CI Node `22.23.4` remain

## Docs

- [ ] Update README technology stack from Astro 5 to Astro 7

## Verification

- [ ] `npm run test` passes
- [ ] `npm run build` passes
- [ ] Spot-check home, `/events/`, `/events/calendar`, one `/events/stable/{slug}`, and the three API routes
- [ ] Inspect `GET /api/events` JSON for a sample range: underlying event `id` and deadline `stablePath` match former slug basenames
- [ ] Confirm at least one event listing still shows title and dates after render (not build-only)
- [ ] Confirm collection counts are non-zero after glob migration (wrong `base` can yield empty collections with a green build)

## Delivery

- [ ] Commit on `cursor/iss-295-update-astro-491a` and update PR #296 into `main` (do not merge). End description with `Closes #295` when the upgrade is complete.
