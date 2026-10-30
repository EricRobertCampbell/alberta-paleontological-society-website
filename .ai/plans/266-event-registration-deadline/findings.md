# Findings

Research for the registration-deadline work. Requirements: `.ai/requirements/266-event-registration-deadline.md`. Issue #266.

## Schema and content

`eventSchema` in `src/content/config.ts` has `title`, optional `subtitle`, `location`, `start`, `end`, deprecated `startDate` / `endDate`, optional `image`, `type`, optional `host`, optional `detailsLink`, and optional `talks`. Dates use `isoDateString`, which accepts any string `Date.parse` accepts. There is no registration deadline field.

`start` / `end` are datetimes with an offset (`2026-11-13T18:30:00-07:00`). `startDate` / `endDate` are `YYYY-MM-DD` with no clock time. The add-event skill says to use only one pair. `getStartDate` / `getEndDate` in `src/utility/eventSorting.ts` prefer `startDate` / `endDate` over `start` / `end`. Writing both can make the listed day and the heading disagree.

No existing event sets a structured deadline. Prose deadlines stay as they are. The November 2026 sleepover (`src/content/events/2026-11-13-fieldTrip-rtmp-sleepin.md`) says “Sunday, October 11” in the body and must not gain a field.

## How a calendar day is chosen

`splitIsoString` (`src/utility/dates.ts`) takes the `YYYY-MM-DD` prefix before `T`. It does not apply a timezone.

`formatDateString` parses that prefix directly and returns “October 11, 2026”.

`getTodayString` (`src/utility/functions.ts`) builds `YYYY-MM-DD` from the process timezone. `npm run dev` sets `TZ=UTC` (`package.json`). Production sets `TZ=America/Edmonton` (`netlify.toml`). `sortEventsByDate` uses the same offset trick: an event is upcoming when its end date string is greater than or equal to that today string.

`dateToDisplayFormat` formats an instant in `America/Edmonton`, not in the offset written on the string, and not in the process timezone. A deadline whose offset is not Edmonton can fall on a different Edmonton calendar day than the date prefix. The deadline’s displayed day must come from the prefix, not from `dateToDisplayFormat`.

`convertDateString` formats a date-only value as midnight `-07:00` and then in `America/Edmonton`. That stays on the written calendar date. Date-only deadlines can use that path.

## Where events are shown

Each of these loads the `events` collection, renders markdown, and passes `remarkPluginFrontmatter` to `src/components/Event.astro`:

| Surface                 | File                                         | Filter                                                                                                                                                             |
| ----------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Calendar grid and cards | `src/pages/events/calendar.astro`            | Month overlap. Grid chips link to `#id`. Cards are the rendered body.                                                                                              |
| Next event              | `src/pages/index.astro`                      | Drops `host` other than missing or `APS`. Keeps `start >= now` or `startDate >= today`. Sorts descending and takes the last item. `TodaysEvents` is commented out. |
| Events index            | `src/pages/events/index.astro`               | `filterAPSEvents`. Today, upcoming, and past.                                                                                                                      |
| Monthly meetings        | `src/pages/events/monthlymeetings.astro`     | APS and `type === 'Monthly Meeting'`. Upcoming only.                                                                                                               |
| Field trips             | `src/pages/events/fieldtrips.astro`          | Not external, `type === 'Field Trip'`. Upcoming and past.                                                                                                          |
| Fossil sorting          | `src/pages/events/fossilsorting/index.astro` | Fossil Sorting type. Upcoming and past.                                                                                                                            |
| Stable page             | `src/pages/events/stable/[slug].astro`       | One event. Previous/next walk the collection by `getStartDate`. `prerender = true`.                                                                                |

`filterAPSEvents` (`src/utility/filters.ts`) keeps events with no host or host `APS`. External events set a non-APS `host`. The calendar does not apply that filter.

`Event.astro` shows type, host logo, title, `generateEventDateTimeString`, optional image, the slot (markdown body), optional `detailsLink`, and talks. It does not show `location`. The slot is the description.

## Calendar month filter

`calendar.astro` includes an event when the viewed year/month sits between the start and end year/month by comparing each part separately. A range that crosses a year boundary can be dropped. Day cells then keep an event when the day-of-month number sits between the start and end day numbers, which is wrong for a multi-month stay inside one viewed month. A deadline is one day, so a deadline item whose `startDate` and `endDate` are that `YYYY-MM-DD` lands on the right cell once the month list contains it. Do not rely on the existing range check to pull a deadline in from another month.

## Field-trips page blocks to remove

`showSleepoverRegistration` is `getTodayString() <= '2026-10-11'`. On 29 October 2026 it is false. It gates:

1. The Dinovember `Alert` (about lines 48–60).
2. The Registration and Payment section (about lines 66–86), including the e-transfer instructions.
3. The “Dinovember Sleepover Sign Up” item in the forms list (about lines 112–118).

The adult waiver, minor waiver, and medical form links are outside that condition. `CURRENT_YEAR` is still used in the terms copy. `EmailLink` and `PhoneLink` are still used by the coordinator paragraph. The signup PDF is also linked from the sleepover event body; leave the file in `public/`.

## API

`GET /api/events` (`src/pages/api/events.ts`) requires `start_date` and `end_date` as `YYYY-MM-DD`, with start less than or equal to end. It returns events whose `getStartDate` / `getEndDate` overlap that range, sorted by start date. Each object is `id` plus non-empty string fields from a fixed list, plus `image` when `src` is set. Talks are omitted. The body is omitted. Cache is one hour. There is no route test. The weekly SVG generator in another repository reads this API and formats fields itself. Adding an optional field is compatible. Adding a second object for a deadline changes the array when the range covers the deadline.

`src/pages/api/README.md` documents the current object. The project `README.md` only mentions the dev/prod timezone split. `readme/adr/0001-release-please.md` is the release ADR. `readme/architecture/` has no event-date document.

## Tests and skills

Vitest runs with `npm run test`. Suites sit next to utilities (`src/utility/attributionLinks.test.ts`) or under `src/utility/__tests__/`. There is no Astro component test runner.

`.agents/skills/add-event/SKILL.md` already says not to invent a deadline, and the field-trip body template mentions a registration deadline in prose. Dates with a clock time are written as ISO 8601 with an America/Edmonton offset (`-06:00` during daylight time, `-07:00` otherwise). Date-only values are `YYYY-MM-DD`. Updates leave fields the new source does not mention unchanged.

## Server versus prerender

`astro.config.mjs` sets `output: 'server'`. The calendar, home page, `/events/`, and the type listings do not set `prerender`, so they render per request and `getTodayString()` follows the process timezone. `src/pages/events/stable/[slug].astro` sets `prerender = true`, so a closed sentence computed there is frozen at build time until the next deploy.

## Constraints

- Optional schema field. Existing files must still build.
- Do not backfill prose deadlines.
- Date-only values must not go through `new Date('YYYY-MM-DD')`, which is UTC midnight and can shift the day.
- Deadline display day is the date prefix of the stored value.
- A datetime is closed after that instant (`Date.parse` respects the offset). A date-only deadline stays open through `getTodayString()` equal to that date.
- Stable URLs are `/events/stable/{slug}` and are generated by the site, not taken from `detailsLink`.
