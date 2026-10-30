---
name: accessibility-review
description: Review APS website UI changes for semantic HTML, ARIA use, keyboard access, focus visibility, heading structure, alt text, form labels, and contrast. Use when the user runs /accessibility-review, or when /code-review or /implement-feature touches user-facing markup, components, layouts, styling, or client scripts.
---

# Accessibility review

Apply this skill to changes under `src/components/`, `src/layouts/`, `src/pages/` (excluding API routes), `src/styling/`, and `public/scripts/`. Also apply it when a content or schema change adds or alters user-facing image `alt` text, control labels, or other accessible names rendered in the UI.

Adapted from the [Frontend Accessibility](https://awesomeskill.ai/skill/adigunners-github-io-frontend-accessibility) skill for this Astro SSR brochure site. Prefer native HTML already used on the site (`nav`, `main`, `header`, `dialog`, labelled controls) over custom ARIA widgets.

Read and apply:

- [findings.md](../code-review/references/findings.md)
- [accessibility.md](../code-review/references/accessibility.md)

## What to review

- Semantic structure: landmarks, headings in order, lists, buttons vs links
- Accessible names for interactive controls (visible text, `<label>`, or concise `aria-label`)
- Keyboard operability and visible focus for new or changed controls
- Images: meaningful `alt`, or intentional empty `alt` when decorative
- Forms and filters: labels, instructions, and error text tied to controls
- Dialogs and disclosures: focus move/restore, dismiss, and state exposure
- Colour and motion: meaning not by colour alone; respect reduced-motion when adding motion
- ARIA only where native HTML cannot express the role or state; no redundant or contradictory ARIA

Do not demand a full WCAG audit of unchanged pages. Review the diff and the UI surface it affects. Do not invent an accessibility test runner mid-change; report gaps that keyboard or assistive-tech users would hit.

## Output

Follow [findings.md](../code-review/references/findings.md).

## Related

- Orchestrator: [code-review](../code-review/SKILL.md)
- Implementation: [implement-feature](../implement-feature/SKILL.md)
- Broader UI consistency: [frontend-review](../frontend-review/SKILL.md)
