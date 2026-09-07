# Heading background originals

Full-resolution photos used only as source material for
`npm run generate-heading-backgrounds`.

The script crops each photo to the thin strip shown behind page headings
(using positions in `scripts/heading-backgrounds.config.ts`) and writes
optimized WebP/JPEG files to `public/headingBackgrounds/`.

Do not put originals in `public/`.

## Add or replace a background

1. Drop the full-resolution image here as `name.jpg`
2. Add a crop entry in `scripts/heading-backgrounds.config.ts`
   (`positionY` / `positionX` are the old CSS object-position percentages)
3. Run `npm run generate-heading-backgrounds -- --force`
4. Use `<HeadingWithBackground background="name">` on the page
