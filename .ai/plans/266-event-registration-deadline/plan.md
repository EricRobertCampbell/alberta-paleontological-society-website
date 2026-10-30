Status: Done

Approved 2026-10-29. Implementing 2026-10-29. Done 2026-10-29. Plan review recommended approve. The stable event page renders per request so the closed sentence uses the server clock.

# Plan

## Objective

Let an event record an optional registration deadline, show that deadline as its own event everywhere events are already shown, and remove the hidden Dinovember registration blocks on the field-trips page.

Requirements: `.ai/requirements/266-event-registration-deadline.md`.

## Scope

- Optional `registrationDeadline` on the event schema.
- A shared helper that validates the value, formats it, decides open versus closed, and builds the derived deadline entry.
- Calendar, home, `/events/`, monthly meetings, field trips, fossil sorting, and the stable page. The stable page renders on each request so the closed sentence is not frozen at build time.
- `GET /api/events` and `src/pages/api/README.md`.
- Delete the three hidden field-trips blocks, and show an alert from open field-trip deadlines.
- `.agents/skills/add-event/SKILL.md`.

## Out of scope

- Backfilling existing event files, including the Dinovember sleepover prose.
- Deleting the signup PDF.
- Symposium pages, the weekly SVG generator, and enabling `TodaysEvents`.
- Fixing the calendar’s pre-existing multi-month range check.
- A stable URL that belongs only to the deadline.
- An ADR.

## Architectural approach

Keep the deadline on the event. Derive the second entry at read time in `src/utility/registrationDeadline.ts`. Pages keep their current filters, then append a derived entry for each remaining event that has a valid deadline. The derived entry copies `type` and `host`, so external events stay off the home page and `/events/`, and a field trip deadline stays on the field-trips page.

`Event.astro` renders that entry with the same card. The time line for a deadline card comes from the stored string. When the deadline has passed, the card says “Registration is closed.” The calendar page also appends the deadline sentence to the underlying event’s description.

The API uses the same helper to decide which objects fall in `start_date`..`end_date`.

## Affected areas

- Content schema
- `src/utility/registrationDeadline.ts` and its Vitest file
- `src/components/Event.astro`
- Calendar, home, events index, monthly meetings, field trips, fossil sorting, stable event page
- `src/pages/api/events.ts` and the API README
- Add-event skill

## Affected files and modules

- `src/content/config.ts`
- `src/utility/registrationDeadline.ts`
- `src/utility/registrationDeadline.test.ts`
- `src/components/Event.astro`
- `src/pages/events/calendar.astro`
- `src/pages/index.astro`
- `src/pages/events/index.astro`
- `src/pages/events/monthlymeetings.astro`
- `src/pages/events/fieldtrips.astro`
- `src/pages/events/fossilsorting/index.astro`
- `src/pages/events/stable/[slug].astro`
- `src/pages/api/events.ts`
- `src/pages/api/README.md`
- `.agents/skills/add-event/SKILL.md`

## Content / schema changes

Add optional `registrationDeadline`. Validate it in the schema with the shared predicate so a bad value fails the content build. Do not edit event markdown.

## API changes

`GET /api/events` adds `registrationDeadline` on the underlying object when set. It also returns a derived object when the deadline’s calendar date is inside the range. See `decisions.md` for the fields and the three range cases. Dates stay `YYYY-MM-DD` query params. Cache header stays one hour.

## UI changes

- Calendar day cell title “Registration Deadline for &lt;Event Name&gt;” on the deadline’s day. The chip links to that card. The card links to `/events/stable/{slug}`.
- The underlying calendar description ends with the formatted deadline.
- The same derived card appears on the home page (when it is the next event), `/events/`, the matching type list, and the stable page.
- Passed deadlines say “Registration is closed.” on both cards.
- Field trips: remove the Dinovember alert, the Registration and Payment section, and the sleepover form link. Show one warning alert listing field trips whose deadline is still open.

## Utility changes

`src/utility/registrationDeadline.ts` owns validation, the calendar-date prefix, formatting, open/closed, derived frontmatter, and API selection. Callers pass `now` and `todayString` so tests do not depend on the clock. Pages use `getTodayString()` and `new Date()`.

## Testing strategy

Write `src/utility/registrationDeadline.test.ts` first and confirm it fails. Cover:

- date-only acceptance and datetime-with-offset acceptance
- rejection of a zoneless datetime, a non-date, and an impossible day
- calendar date taken from the prefix, including a late-evening offset whose UTC day is the next day
- open through a date-only deadline day, closed the next day
- datetime closed after its instant and open before it
- derived title, anchor id, date fields, and omitted image
- API selection for event-only, deadline-only, both, and an undated event with a deadline

Then implement the helper, schema, API, pages, and skill. There is no Astro render harness; page changes stay thin wrappers over the helper.

## Migration and backwards compatibility

The field is optional. Current API clients gain a field only when it is set, and an extra object only when the queried range includes a deadline. No current event sets one, so today’s API payload is unchanged until an event uses the field.

## Security considerations

The stable href is built from the content slug as `/events/stable/${slug}`. Do not use `detailsLink` or the markdown body for that href. Astro escapes the title and the formatted date. Do not render them with `set:html`.

## Deployment considerations

Date-only openness uses `getTodayString()`, which is UTC in development and America/Edmonton on Netlify. Datetime openness uses the offset in the value, so the process timezone does not move the instant. The displayed calendar day is the string prefix in both environments.

`src/pages/events/stable/[slug].astro` is prerendered today. Drop that flag so this page uses the server clock, like the other event listings. A build-time closed flag would stay wrong until the next deploy.

## Relevant ADRs and architecture docs

- `readme/adr/0001-release-please.md`: a `feat` commit later opens a minor release. Do not commit unless asked.
- Project `README.md`: dev UTC versus production America/Edmonton.
- `src/pages/api/README.md`: update the events contract in the same change.
- No architecture doc covers event dates. Do not add one.

## Open questions

None. Choices are in `decisions.md`.

## Assumptions

- One deadline per event.
- “Registration is closed.” and the alert line are the visitor-facing sentences.
- Previous/next on the stable page still walks real events only.
- Branch name when implementing: `iss-266-registration-deadline`, from `main`.
