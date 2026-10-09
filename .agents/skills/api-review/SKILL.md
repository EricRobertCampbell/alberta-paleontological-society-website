---
name: api-review
description: Review APS Astro REST API route changes under src/pages/api for validation, response shape, caching, and compatibility. Use when the user runs /api-review, or when /code-review reviews an API contract change.
---

# API review

Review changes to JSON API routes and their documented contracts. Read [findings.md](../code-review/references/findings.md).

## Where the contract lives

- Routes: `src/pages/api/`
- Documentation: `src/pages/api/README.md`
- Shared filtering/sorting helpers: `src/utility/`

Known endpoints include `/api/events`, `/api/fossil-friday`, and fossil-sorting image routes. Prefer the patterns already used by neighbouring handlers.

## What to review

- Query and body validation before work begins (required params, date formats, ranges)
- Stable response shapes for existing clients; breaking field renames without a doc and caller update are High
- Error responses: appropriate status codes and messages that say what failed and what to fix
- Caching headers stay intentional (`Cache-Control` on successful responses when neighbouring routes cache)
- Handlers reuse shared date and filter utilities instead of reimplementing event logic
- Docs in `src/pages/api/README.md` update in the same change when the contract changes
- No secrets, tokens, or internal paths leaked in responses

A contract change that breaks an existing documented response without updating the README is High.

## Output

Follow [findings.md](../code-review/references/findings.md).
