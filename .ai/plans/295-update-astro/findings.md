# Findings: 295-update-astro

Requirements: `.ai/requirements/295-update-astro.md`.

## Current stack

| Package | Declared | Locked |
| --- | --- | --- |
| `astro` | `^5.4.2` | `5.4.2` |
| `@astrojs/netlify` | `^6.2.2` | `6.2.2` |
| `prettier` | `^2.8.8` | `2.8.8` |
| `prettier-plugin-astro` | `^0.10.0` | `0.10.0` |
| `vitest` | `^3.0.8` | `3.0.8` |

Newest targets (26 November 2026, America/Edmonton): Astro `7.4.13`, `@astrojs/netlify` `8.2.14` (peer `astro ^7`), Prettier `3.x`, `prettier-plugin-astro` `1.1.2` (peer Prettier `^3.5.3`).

Already on branch `cursor/iss-295-update-astro-491a`:

- `netlify.toml` → `NODE_VERSION = '22.23.4'`
- `.github/workflows/testAndLint.yml` → Node `22.23.4`

`astro.config.mjs`: `output: 'server'`, `adapter: netlify()`. No experimental flags. No `src/fetch.ts`. No `Astro.glob()`. No `ViewTransitions`.

## Content collections (legacy)

Config lives only at `src/content/config.ts` (no `src/content.config.ts`).

| Collection | Legacy shape | Files |
| --- | --- | --- |
| `events` | `type: 'content'` | `src/content/events/*.md` |
| `talks` | `type: 'content'` | `src/content/talks/*.md` |
| `disclaimers` | `type: 'content'` | `src/content/disclaimers/*.md` |
| `faqs` | `type: 'content'` | `src/content/faqs/*.md` |
| `announcements` | `type: 'content'` | `src/content/announcements/*.md` |
| `fossilFriday` | `type: 'content'` | `src/content/fossilFriday/*.md` |
| `bulletins` | `type: 'data'` | `src/content/bulletins/*.yml` |
| `bulletinVolumes` | `type: 'data'` | `src/content/bulletinVolumes/*.yml` |
| `fossils` | `type: 'data'` | `src/content/fossils/*.yml` |
| `fossilSortingImages` | `loader: file(.../images.json)` | already Content Layer |
| `fossilSortingSpecimens` | `loader: file(.../specimens.json)` | already Content Layer |
| `fossilSortingData` | `loader: file(.../fossilSortingData.json)` | already Content Layer |

Schemas import `z` from `astro:content`. Events use `reference('talk')` while the exported collection key is `talks` — call sites use `getEntry('talks', ...)`. Bulletins use `reference('bulletinVolumes')`. Specimens use `reference('fossilSortingImages')`.

Astro 6+ removes legacy collections: config must be `src/content.config.ts`, every collection needs a `loader`, no `type: 'content'|'data'`, `entry.slug` → `entry.id`, `entry.render()` → `render(entry)` from `astro:content`. Import `z` from `astro/zod`. Astro 7 defaults to Zod 4 and Sätteri Markdown.

## Call sites that must change

### `entry.render()` → `render(entry)`

`Event.astro`, `TodaysEvents.astro`, `index.astro`, `privacypolicy.astro`, `faq.astro`, `fossilfriday/[date].astro`, `events/stable/[slug].astro`, `events/calendar.astro`, `events/index.astro`, `events/fieldtrips.astro`, `events/monthlymeetings.astro`, `events/fossilsorting/index.astro`.

Many listings spread the render result and re-attach `slug` / `id`, then read `remarkPluginFrontmatter`. After migration, confirm `render()` still exposes equivalent frontmatter (or switch those reads to `entry.data`).

### `entry.slug` → public id (former slug)

Stable routes, listings, FAQ section ids, `registrationDeadline.ts` (`stablePath`, `sourceSlug`), `api/events.ts` (maps `slug: event.slug` into `eventsForApiRange`).

With Content Layer `glob({ base: './src/content/events', pattern: '**/*.md' })`, entry `id` is the basename without extension (for example `2026-11-13-foo`), which matches today’s `slug`. That preserves `/events/stable/{slug}` and API `stablePath` values if call sites use `id` where they used `slug`.

Old `id` was path-like (often including extension). API responses that expose raw `id` may change string shape for underlying events. Deadline API objects use `sourceEventId: event.id` and `id: registrationDeadlineAnchorId(event.id)`. Preserve public stable URLs; document any raw `id` string change if it cannot match the old value.

### References

`extractReferenceId` in `src/utility/functions.ts` already normalizes string or `{ id }` refs. Tests in `src/utility/__tests__/extractReferenceId.test.ts`.

## Tests today

- `src/utility/registrationDeadline.test.ts` — deadline behaviour and `stablePath: '/events/stable/...'`
- `src/utility/__tests__/extractReferenceId.test.ts` — reference id extraction
- No adjacent tests for API routes or content config

## Docs / ADRs

- ADR `0001-release-please.md` mentions a single Node package root only.
- No architecture docs beyond templates.
- Project `README.md` states “Astro 5” and describes content collections under `src/content/`.

## Official upgrade constraints (Astro docs)

- v6: legacy content collections removed (temporary `legacy.collectionsBackwardsCompat` exists but is temporary; do not ship on it).
- v7: Vite 8; Rust compiler (stricter unclosed tags); Sätteri default Markdown (opt into `unified()` via `@astrojs/markdown-remark` if needed); `compressHTML` default `'jsx'`; Node `>=22.23.4`.
- Recommended tool: `npx @astrojs/upgrade` for Astro + official integrations.

## Risks

1. **Slug / id identity** — broken stable URLs or FAQ anchors if glob `base`/`pattern` wrong (empty collections fail silently).
2. **`remarkPluginFrontmatter`** — pages depend on it after render; Sätteri or Content Layer may change the shape.
3. **Zod 4** — schema `.refine` / APIs may need tweaks when importing from `astro/zod`.
4. **Rust compiler** — invalid or unclosed markup that Astro 5 accepted may fail the build.
5. **Whitespace (`compressHTML: 'jsx'`)** — possible missing spaces between inline elements; visual check after upgrade.
6. **Prettier 3** — large formatting churn when bumping Prettier + plugin; acceptable per requirements.
7. **`reference('talk')` vs `talks`** — may surface as a hard error after migration.

## Reusable patterns

- Keep `file()` loaders for the three JSON collections as they are.
- Prefer a small shared helper for “public content id used in URLs” so pages/API/utilities do not fork slug vs id logic.
- Continue using `extractReferenceId` for references.
