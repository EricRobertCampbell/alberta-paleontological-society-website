# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Alberta Paleontological Society (APS) website, built with Astro 5 using server-side rendering (SSR) and deployed to Netlify. The site provides information about the society, manages events, hosts bulletin archives, and displays the society's fossil collection with 3D scans.

## Development Commands

```bash
# Development server (runs with UTC timezone)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Run tests with coverage
npm run coverage
```

## Architecture

### Framework and Rendering

-   **Framework**: Astro 5 with SSR (`output: 'server'`)
-   **Adapter**: Netlify (`@astrojs/netlify`)
-   **Timezone handling**: Development uses UTC (`TZ=UTC`), production uses America/Edmonton (configured in `netlify.toml`)

### Content Collections

The site uses Astro's Content Collections (defined in `src/content/config.ts`) for structured content:

-   **events**: Markdown content with frontmatter for society events (monthly meetings, symposiums, field trips, fossil sorting). Events support both ISO datetime strings (`start`/`end`) and legacy date fields (`startDate`/`endDate`). Event types are defined in `EVENT_TYPES` constant.
-   **announcements**: Time-bound announcements with `startDate` and `endDate` for display control
-   **bulletins**: YAML data files referencing bulletin PDFs in `/public/bulletinArchives/`
-   **bulletinVolumes**: YAML data organizing bulletins by year
-   **faqs**: Markdown content with ordering
-   **disclaimers**: Markdown content for legal/privacy sections
-   **fossils**: YAML data for the fossil collection, including 3D scan references

### Directory Structure

```
src/
├── components/        # Astro components
│   ├── EventCalendar/ # Calendar display logic with utility.ts
│   └── *.astro        # Reusable UI components
├── content/           # Content collections (see above)
├── layouts/           # Page layout wrapper (Layout.astro)
├── pages/             # File-based routing
│   ├── index.astro    # Homepage with event filtering
│   ├── about/         # About pages
│   ├── events/        # Event-related pages
│   ├── resources/     # Resources and bulletin archives
│   ├── members/       # Member information
│   └── interstitial/  # Temporary redirect/announcement pages
├── styling/           # Global CSS (variables.css, globalStyles.css)
└── utility/           # Shared utility functions
    ├── dates.ts       # Date manipulation and timezone handling
    ├── filters.ts     # Content filtering utilities
    ├── eventSorting.ts # Event sorting logic
    ├── constants.ts   # Shared constants
    └── __tests__/     # Vitest tests

public/                # Static assets
├── bulletinArchives/  # PDF bulletins (bulletin###.pdf format)
├── assets/            # Images
├── scripts/           # Client-side JavaScript
└── 3d-scans/          # 3D model files for fossil collection
```

### Date and Event Handling

Events are transitioning from legacy date fields to ISO datetime strings:

-   **Modern**: `start` and `end` fields with ISO 8601 strings (e.g., `2025-04-11T19:00:00`)
-   **Legacy**: `startDate`, `endDate`, `startTime`, `endTime` fields (deprecated)

The homepage (`src/pages/index.astro`) filters and sorts events, removing external events and past events. Date utilities in `src/utility/dates.ts` handle timezone conversions and date comparisons.

### Testing

Uses Vitest for testing. Tests are located in `src/utility/__tests__/`. Test files should use only the `.test.ts` extensions.

### Commit Conventions

This project uses Conventional Commits enforced by commitlint via Husky pre-commit hooks. Commit messages must follow the format: `type(scope): description` (e.g., `feat: add symposium page`, `fix: update october meeting interstitial`, `chore(release): 1.96.1`).

### Styling

-   Uses CSS custom properties defined in `src/styling/variables.css`
-   Global styles in `src/styling/globalStyles.css`
-   Font families: "Lexend Deca" (headings), "Roboto" (body text)
-   Maximum content width: 1000px

## Important Notes

-   The bulletin naming convention follows the pattern: `bulletin{volume}{issue}.pdf` (e.g., `bulletin011.pdf` for Volume 1, Issue 1)
-   Bulletin YAML files in `src/content/bulletins/` reference the PDF location via the `location` field
-   The site handles both member events and external events, but external events are filtered from the homepage
-   When working with dates, always consider timezone handling (UTC in dev, America/Edmonton in production)
