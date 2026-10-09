# Frontend review

Apply these checks to changes under `src/components/`, `src/layouts/`, `src/pages/` (excluding `src/pages/api/`), `src/styling/`, and `public/scripts/`. Report findings with the severity scale in [findings.md](findings.md).

## Astro and TypeScript

- Follow existing component and page patterns. Prefer `.astro` components already used nearby over inventing a new structure.
- Prefer existing UI components (`Button`, `Card`, `HeadingWithBackground`, etc.) and project conventions.
- Avoid introducing new dependencies unless necessary.
- Shared logic belongs in `src/utility/`. File-local helpers sit below the setup or function that calls them. Callers come first; callees lower in the file. See `.cursor/rules/function-order.mdc`.
- Match surrounding TypeScript style. Prefer clarifying types over assertions when practical.

## Styling

- Use CSS custom properties from `src/styling/variables.css`.
- Prefer global styles in `src/styling/globalStyles.css` or scoped styles in the component when that matches neighbouring code.
- Fonts: "Lexend Deca" for headings, "Roboto" for body text.
- Maximum content width is 1000px unless the surrounding layout already breaks that rule deliberately.
- Do not invent a parallel design system or colour palette.

## Pages and layouts

- File-based routing under `src/pages/` must match the intended URL.
- Interstitial and temporary announcement pages live under `src/pages/interstitial/` when that is the existing pattern.
- Keep page frontmatter focused: load content, filter/sort with shared utilities, then render. Push reusable logic into `src/utility/` or a component.

## Client scripts and interactivity

- Client-side scripts live in `public/scripts/` or as established client islands / component scripts.
- Three.js and 3D scan UI should reuse `ThreeDScanDialog` and existing fossil-collection patterns rather than a one-off viewer.
- Do not add a client framework (React, Vue, Svelte) unless the user explicitly asks for one.

## Accessibility

- Interactive elements need an accessible name, keyboard use, and focus behaviour consistent with neighbouring UI.
- Images need meaningful `alt` text (or an intentional empty alt when decorative).
- Prefer semantic HTML already used on the site (`nav`, `main`, headings in order).

## Dates and events in the UI

- Prefer modern event fields (`start` / `end` ISO strings). Do not add new uses of deprecated `startDate` / `endDate` / `startTime` / `endTime` unless the content genuinely has a date with no time.
- External events are filtered from the homepage; preserve that behaviour unless the change is explicitly about it.

## Tests

- Behaviour changes in components, pages, or client scripts should get colocated `*.test.ts` coverage (same directory or a local `__tests__/` folder), not a dump into `src/utility/__tests__/`.
