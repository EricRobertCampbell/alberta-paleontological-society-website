[![Netlify Status](https://api.netlify.com/api/v1/badges/0ad5b867-2269-4836-9fd8-689e31988903/deploy-status)](https://app.netlify.com/sites/proposed-aps/deploys)

# Alberta Paleontological Society Website

A website for the Alberta Paleontological Society (APS), built with Astro 5 using server-side rendering (SSR) and deployed to Netlify. The site provides information about the society, manages events, hosts bulletin archives, and displays the society's fossil collection with 3D scans.

## Features

- **Event Management**: Monthly meetings, symposiums, field trips, and fossil sorting events
- **Bulletin Archives**: Archive of society bulletins
- **Fossil Collection**: Interactive fossil collection with 3D scans
- **Fossil Friday**: Weekly fossil feature posts
- **Content Collections**: Structured content management using Astro's Content Collections
- **RESTful API**: JSON endpoints for events, fossil Friday, and fossil sorting images

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

```bash
npm install
```

### Development

Start the development server (runs with UTC timezone):

```bash
npm run dev
```

The site will be available at `http://localhost:4321`

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Testing

Run tests:

```bash
npm run test
```

## Technology Stack

- **Framework**: [Astro 5](https://astro.build/) with SSR (`output: 'server'`)
- **Adapter**: `@astrojs/netlify` for Netlify deployment
- **Testing**: Vitest
- **3D Rendering**: Three.js for fossil collection 3D scans

## Project Structure

```
src/
├── components/        # Astro components
├── content/           # Content collections (events, bulletins, fossils, etc.)
├── layouts/           # Page layout wrapper
├── pages/             # File-based routing
│   └── api/           # API endpoints (see /api/README.md)
├── styling/           # Global CSS
└── utility/           # Shared utility functions

public/                # Static assets
├── bulletinArchives/  # PDF bulletins
├── assets/            # Images
├── fossilCollection/  # 3D model files
└── scripts/           # Client-side JavaScript
```

## Content Collections

The site uses Astro's Content Collections for structured content:

- **events**: Markdown content for society events
- **announcements**: Time-bound announcements
- **bulletins**: YAML data files referencing bulletin PDFs
- **bulletinVolumes**: YAML data organizing bulletins by year
- **faqs**: Markdown content for frequently asked questions
- **disclaimers**: Markdown content for legal/privacy sections
- **fossils**: YAML data for the fossil collection
- **fossilFriday**: Markdown content for Fossil Friday posts
- **fossilSortingSpecimens**: JSON data for fossil sorting specimens
- **fossilSortingImages**: YAML data for fossil sorting images

## Date Handling

Events support both modern and legacy date formats:

- **Modern**: `start` and `end` fields with ISO 8601 strings (e.g., `2025-04-11T19:00:00`)
- **Legacy**: `startDate`, `endDate`, `startTime`, `endTime` fields (deprecated)

The development server uses UTC timezone, while production uses America/Edmonton (configured in `netlify.toml`).

## API Endpoints

The site provides RESTful API endpoints for programmatic access. See [API Documentation](./src/pages/api/README.md) for details.

## Commit Conventions

This project uses [Conventional Commits](https://www.conventionalcommits.org/) enforced by commitlint via Husky pre-commit hooks. Commit messages must follow the format:

```
type(scope): description
```

Examples:
- `feat: add symposium page`
- `fix: update october meeting interstitial`
- `chore(release): 1.96.1`

## Deployment

The site is automatically deployed to Netlify on push to the main branch. The Netlify configuration is defined in `netlify.toml`.

## License

This project is licensed under the GNU General Public License v3.0. See [LICENCE](./LICENCE) for details.
