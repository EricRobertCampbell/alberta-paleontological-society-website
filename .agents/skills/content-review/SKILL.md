---
name: content-review
description: Review APS content-collection, utility, and static-asset changes for schema fit, date handling, bulletin conventions, and reuse of shared helpers. Use when the user runs /content-review, or when /code-review reviews content or utility changes.
---

# Content review

Apply this skill to changes under `src/content/`, `src/utility/`, `src/content/config.ts`, `scripts/`, and related assets under `public/` (bulletins, fossils, abstracts, images).

Read and apply:

- [findings.md](../code-review/references/findings.md)
- [content.md](../code-review/references/content.md)

## What to review

- Collection schemas and frontmatter match `src/content/config.ts`
- Event date fields prefer modern ISO `start` / `end`; no new deprecated date/time usage without reason
- Bulletin PDF naming and YAML `location` fields stay consistent
- Referenced static files exist and follow existing `public/` layout
- Shared date, filter, and sorting logic stays in `src/utility/` rather than duplicated in pages
- Timezone handling remains correct (UTC in dev, America/Edmonton in production)
- Function and utility placement follows `.cursor/rules/function-order.mdc`

## Output

Follow [findings.md](../code-review/references/findings.md).
