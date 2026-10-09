# Architecture docs

Longer-lived descriptions of how areas of the APS website work. Use these for invariants and flows that are larger than a single ADR.

## Conventions

- One topic per file under `readme/architecture/`.
- Skip this `README.md` and any `TEMPLATE.md` when matching docs to a diff.
- Optional YAML frontmatter may list `paths` globs so reviews can match docs to changed files:

```yaml
---
paths:
  - src/utility/dates.ts
  - src/content/config.ts
  - src/pages/api/**
---
```

## Suggested topics

Add docs here when an area needs durable explanation, for example:

- Event date handling and timezones
- Content collections and bulletin naming
- Fossil collection / 3D scans
- Public JSON API routes

Until topic docs exist, rely on `README.md`, `src/pages/api/README.md`, and Accepted ADRs in `readme/adr/`.
