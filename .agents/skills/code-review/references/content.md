# Content and utility review

Apply these checks to changes under `src/content/`, `src/utility/`, `src/content/config.ts`, and related static assets under `public/` (bulletins, fossils, abstracts, images). Report findings with the severity scale in [findings.md](findings.md).

## Content collections

Schemas live in `src/content/config.ts`. Collections include events, talks, announcements, bulletins, bulletinVolumes, faqs, disclaimers, fossils, fossilFriday, and fossil-sorting data.

- New or changed frontmatter must satisfy the collection schema.
- Prefer extending the existing Zod schema over ad-hoc validation in pages.
- Prefer modern event datetimes (`start` / `end`) over deprecated date/time fields.
- Event `type` values must come from `EVENT_TYPES` in `src/content/config.ts`.
- External events use type `External` and are filtered from the homepage.

## Bulletins

- PDF naming: `bulletin{volume}{issue}.pdf` (for example `bulletin011.pdf` for Volume 1, Issue 1).
- YAML under `src/content/bulletins/` references the PDF via the `location` field.
- Keep bulletin volume organization consistent with existing `bulletinVolumes` entries.

## Fossils and media

- Fossil YAML and 3D scan assets must stay consistent (referenced files exist under `public/`).
- Fossil Friday and fossil-sorting content should follow neighbouring entry shape and image paths.
- Do not commit huge binary assets without need; follow existing `public/` layout.

## Utilities

- Shared helpers belong in `src/utility/` (or a focused script under `scripts/`).
- File-local helpers stay in the file that uses them, below the caller when possible.
- If function A calls function B, define A above B.
- Reuse `dates.ts`, `filters.ts`, `eventSorting.ts`, and related modules instead of duplicating date or event logic.
- Timezone: development uses UTC (`TZ=UTC`); production uses America/Edmonton (`netlify.toml`). Date comparisons and "today" logic must remain correct under that split.
- Tests for a utility belong next to that utility (colocated `*.test.ts` or a local `__tests__/` directory). Extend `src/utility/__tests__/` only when changing modules that already use that suite.

## Scripts

Build-time helpers live under `scripts/` (thumbnail generation, heading backgrounds). Match existing `tsx` script patterns and npm script names in `package.json`.
