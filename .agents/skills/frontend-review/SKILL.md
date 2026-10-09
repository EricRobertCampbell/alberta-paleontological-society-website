---
name: frontend-review
description: Review APS Astro component, page, layout, and styling changes for structure, accessibility, and UI consistency. Use when the user runs /frontend-review, or when /code-review reviews a UI change under src/components, src/layouts, src/pages, or src/styling.
---

# Frontend review

Apply this skill to changes under `src/components/`, `src/layouts/`, `src/pages/` (excluding API routes), `src/styling/`, and `public/scripts/`.

Read and apply:

- [findings.md](../code-review/references/findings.md)
- [frontend.md](../code-review/references/frontend.md)

## What to review

- Match surrounding Astro component and page patterns
- Reuse existing UI components and CSS variables
- Accessibility of new interactive elements: name, keyboard use, and focus
- Loading, empty, and error states when the UI depends on fetched or filtered data
- Client scripts and 3D scan behaviour stay consistent with existing patterns
- Homepage and event listings preserve external-event filtering and date sorting unless the change is explicitly about those rules
- UI consistency with neighbouring pages (spacing, typography, max content width)

## Output

Follow [findings.md](../code-review/references/findings.md).
