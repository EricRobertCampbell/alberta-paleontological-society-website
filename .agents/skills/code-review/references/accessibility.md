# Accessibility review

Apply these checks to user-facing markup, components, layouts, styling, and client scripts. Report findings with the severity scale in [findings.md](findings.md). This site is mostly static Astro SSR with light client script (navigation, calendars, image modals, native `<dialog>` 3D viewers). Prefer patterns already used nearby over new widget frameworks.

Target practical WCAG 2.2 Level AA behaviour for the changed surface. Do not claim legal conformance from review alone.

## Semantic HTML

- Prefer native elements with built-in semantics and keyboard behaviour: `button`, `a`, `nav`, `main`, `header`, `footer`, `section` with a heading, lists, tables for tabular data, `dialog` for modals.
- Do not use a `div` or `span` with a click handler when a `button` or `a` fits. Links navigate; buttons perform actions on the page.
- Keep a single primary `h1` per page view when neighbouring pages do. Headings must not skip levels in the content the change introduces (for example do not jump from `h2` to `h4`).
- Preserve landmark structure from `src/layouts/Layout.astro` (`header`, `main`, footer). Do not wrap the whole page in an extra conflicting landmark without need.
- Decorative icons beside visible text should be hidden from assistive tech (`alt=""`, `aria-hidden="true"`) so names are not doubled.

## Names, roles, and ARIA

- Every interactive control needs an accessible name that states its purpose (visible label, `aria-label`, or `aria-labelledby`). Icon-only controls need a concise name (for example existing gallery controls use `aria-label="Close image dialog"`).
- Prefer visible text and native `<label for>` over invisible ARIA names when practical.
- First rule of ARIA: do not add a role, state, or property when a native element already provides it. Avoid redundant `role="button"` on `<button>`, `role="navigation"` on `<nav>`, or `aria-required` when `required` is enough.
- When ARIA is required (custom disclosure, tablist, and similar), match the WAI-ARIA Authoring Practices pattern for keyboard behaviour and states (`aria-expanded`, `aria-selected`, `aria-controls`, and so on).
- Never put `aria-hidden="true"` on a focusable control or its focusable ancestors. Never strip interactive semantics with `role="presentation"` / `role="none"` on controls that still receive focus.
- Live regions (`aria-live`) only for important updates that the user would otherwise miss; do not announce routine visual churn.

## Keyboard and focus

- All new interaction must work with a keyboard (Tab, Shift+Tab, Enter/Space for buttons, Escape to dismiss dialogs/overlays where neighbouring UI does).
- Focus order follows reading order. Do not use positive `tabindex` to patch source order.
- Visible focus indicators must remain for keyboard users. If you remove the default outline, provide an equivalent `:focus-visible` style consistent with nearby UI (for example teal outline patterns on the fossil-sorting gallery).
- Opening a modal or dialog moves focus into it; closing restores focus to the control that opened it. Prefer the native `<dialog>` pattern used by `ThreeDScanDialog` when adding modals.
- Do not trap focus outside an intentional modal. Do not create keyboard traps in carousels, menus, or custom widgets.
- Pointer-only gestures need a keyboard or single-pointer alternative when they are required to complete a task.

## Images and media

- Informative images need meaningful `alt` text. Content-collection image fields that require `alt` must stay populated with concise, accurate text.
- Decorative images use empty `alt` (`alt=""`). Do not omit the attribute on `<img>`.
- Linked images derive their link name from `alt` or surrounding text; the combined name must make sense in isolation.
- Charts and graphs need a text alternative or accessible data summary when they convey information beyond decoration.
- Video or audio embeds need captions or a transcript when the change introduces meaningful spoken or visual-only information. Third-party embeds must not break keyboard access to the rest of the page.

## Forms, filters, and errors

- Inputs need persistent labels. Placeholders are not a substitute for a label.
- Group related controls with `fieldset` and `legend` when that matches the form’s structure.
- Error and help text must identify the field in text and, when practical, programmatically (`aria-describedby`, `aria-invalid`).
- User-facing validation messages stay descriptive and give next steps (see the code-review rule for user-facing errors).
- Required fields are indicated in text, not by colour alone.

## Colour, contrast, and motion

- Do not convey meaning by colour alone (status, event type, required fields). Pair colour with text, shape, or pattern—as the event calendar legend does with labels.
- Text and interactive icons should maintain readable contrast against their background. Flag obvious low-contrast new colour pairings (large light text on light backgrounds, grey-on-grey controls). Use existing CSS variables from `src/styling/variables.css` rather than one-off low-contrast colours.
- New animation or parallax must not be the only way to reach content. Honour `prefers-reduced-motion` when adding non-essential motion.
- Do not autoplay moving content with sound. Keep flashing content well under seizure-risk thresholds.

## Client scripts

- Behaviour in `public/scripts/` or component scripts must keep semantics and focus in sync with the DOM (expanded state, dialog open/close, tab selection).
- Dynamic content inserted via script needs the same accessible names and keyboard paths as static markup.
- Do not rely on `mouseover` / `mouseout` alone for essential information; pair with focus events when needed.

## Severity guidance

Use [findings.md](findings.md). Typical mappings for this skill:

- Unusable keyboard path, keyboard trap, or missing accessible name on a primary control is **High**.
- Missing or wrong `alt` on an informative image, broken dialog focus restore, or contradictory ARIA that misrepresents state is **High** when users cannot complete the task or will be actively misled.
- Missing visible focus on a new interactive control, meaning by colour alone, or a missing form label with a workaround still possible is **Medium**.
- Redundant ARIA, minor heading-level skips in a small subsection, or polish on already-usable controls is **Low**.

Do not report unchanged legacy issues unless the diff makes them worse or the change is explicitly an accessibility fix for that area.
