---
name: add-event
description: >-
  Add an Alberta Palaeontological Society event to the content collection,
  including frontmatter schema, markdown paths, public image and abstract
  locations, host and type conventions, and where the event is listed. Use
  when the user runs /add-event or asks to add, create, schedule, or publish
  an event, monthly meeting, field trip, fossil sorting session, symposium
  session, talk, or external event. Input may be a long-form description or a
  URL (poster, email, bulletin, event page, or social post).
---

# Add an event

Adding an event is a content update. Do not create a plan directory or a Vitest test. Do not change schemas, listing pages, or interstitial pages unless the new event cannot be represented with the fields below.

Copy the nearest existing file of the same `type` and year, then change only what this event needs. Schema source of truth: `src/content/config.ts` (`eventSchema`, `talkSchema`, `EVENT_TYPES`).

## Input

Record only facts the source states: title, date, clock time, place, host, cost, registration, and speaker. Leave unknown fields unset. Do not invent a time, price, or deadline.

### Long-form description

The user's text is the source.

- Take every event fact from that text.
- Do not fetch anything when the description already has the title and either a clock time or a calendar date, plus the place when it names one.
- A URL that only points to tickets or further details becomes `detailsLink`. Leave that URL unopened when the description already has those facts.
- Open a URL included in the description when the text defers a missing fact to it (the time, the place, or the poster). If the page and the description disagree, keep the description and say what differed.
- Save an image only when the user attached one or named a local file. Otherwise omit `image`.

### URL

Open the URL and read the page before writing the file. The page is the source.

- If a login wall, signup wall, or preview hides the event, say what was visible and what was blocked. Stop when the visible page has no title or no date, and ask for a description or a screenshot.
- Set `detailsLink` to the event's own page. Prefer a specific listing linked from the page over the site homepage or a bare social profile.
- When the page shows a poster or hero image for this event, save that file under [Files](#files) and set `image`, with `alt` describing what the image shows. If the file cannot be saved, omit `image` and say so.
- Open one linked page when the current page names a canonical details page or poster and does not itself include the date or time. Do not browse the rest of the site.
- Tell the user which facts were taken from the page.

### Both

The description supplies every fact it states. The URL fills gaps, supplies `detailsLink`, and supplies the poster. If they disagree, keep the description and mention the disagreement.

## Steps

1. Follow [Input](#input) for a long-form description, a URL, or both.
2. Classify the event (see [Types](#types)).
3. Choose the date pair (see [Dates](#dates)).
4. Add the markdown file under `src/content/events/`.
5. Add a talk file only when this event has a speaker abstract, bio, or YouTube link that should render in the talk block.
6. Save images and PDFs under `public/` (see [Files](#files)). `image.src` is a site path, never a remote URL.
7. Check the new entry against [Checks](#checks), then open the calendar month and the stable permalink in the browser.

## Types

`type` must be one of `EVENT_TYPES`:

| type | When | `host` | Listed on |
| --- | --- | --- | --- |
| `Monthly Meeting` | APS monthly meeting | omit | Home, `/events/`, `/events/monthlymeetings`, calendar |
| `Field Trip` | APS field trip | omit | Home, `/events/`, `/events/fieldtrips`, calendar |
| `Fossil Sorting` | APS microfossil sorting | omit | Home, `/events/`, `/events/fossilsorting`, calendar |
| `Symposium` | APS symposium day or workshop | omit | Home, `/events/`, calendar. `/events/symposium` is hand-written; do not edit it unless asked |
| `Special Joint Meeting of the APS and the CSPG BASS Division` | That joint meeting only | omit | Home, `/events/`, calendar |
| `External` | Another organization, promoted by APS | required, not `APS` | Calendar and `/events/stable/{slug}` only |

Listing filters use `host`, not `type`. `filterAPSEvents` in `src/utility/filters.ts` keeps events with no `host` or `host: APS`. Home (`src/pages/index.astro`) uses the same rule. An `External` event without a non-APS `host` shows up as an APS event. An APS trip with some other `host` disappears from the field-trip and fossil-sorting pages.

Omit `host` for APS events. The APS logo still appears. Do not set `host` to `Alberta Palaeontological Society`.

For a known external host, copy the `host` string exactly so the logo resolves:

- `University of Alberta Palaeontological Society`
- `University of Saskatchewan Palaeobiology Club`
- `Royal Tyrrell Museum of Palaeontology`
- `Royal Tyrrell Museum`
- `Philip J. Currie Dinosaur Museum`
- `Royal Alberta Museum`
- `Devil's Coulee Dinosaur Heritage Museum`
- `Tumbler Ridge Museum`

Any other host name is valid and simply has no logo. Add a `public/logos/` file and a `HOST_LOGO_MAP` entry in `src/utility/filters.ts` only when the user supplies a logo.

## Files

Event path: `src/content/events/YYYY-MM-DD-slug.md`

`YYYY-MM-DD` is the America/Edmonton start date. Match existing slug shapes:

- Monthly meeting: `2026-11-20-monthlyMeeting.md`, title `Monthly Meeting: November 2026`
- Field trip: `2026-07-25-fieldTrip-knudsensFarm.md`
- Fossil sorting: `2026-11-22-microfossilSorting.md`
- Symposium day: `2026-03-15-symposiumDay2.md`
- External: `2026-09-27-franks-lectures-hunting-dinosaurs.md` (kebab-case)

Talk path, only when needed: `src/content/talks/YYYY-MM-DD-speaker-topic.md`. Reference that slug (no `.md`) from the event `talks` list. Talk body uses `## Bio` and `## Abstract` when those exist.

| Asset | Save as | Reference as |
| --- | --- | --- |
| External poster or flyer | `public/events/{year}/external/{kebab-name}.{jpg,png,webp}` | `/events/{year}/external/{kebab-name}.{ext}` |
| APS event hero photo | `public/events/{year}/{kebab-name}.{ext}` | `/events/{year}/{kebab-name}.{ext}` |
| Figure inside the body or talk | `public/events/{year}/{slug}/{kebab-name}.{ext}` | `/events/{year}/{slug}/{kebab-name}.{ext}` |
| Field trip poster | `public/fieldTrips/{year}/{name}.png` | `/fieldTrips/{year}/{name}.png` |
| Talk abstract PDF | `public/presentationAbstracts/{year}/{name}.pdf` | `/presentationAbstracts/{year}/{name}.pdf` |

Prefer kebab-case filenames with no spaces. Omit `image` when neither the user nor a fetched page provides one. Link the registration PDF already used by other field trips that year; do not add a new form unless the user supplies one.

## Frontmatter

```yaml
---
title: 'Event title'
subtitle: 'Series name' # optional
location: 'Venue, City, AB' # optional
start: '2026-11-20T19:30:00-07:00' # clock time: use start/end, not startDate/endDate
end: '2026-11-20T21:00:00-07:00'
type: 'External'
host: 'Royal Tyrrell Museum of Palaeontology' # external events only
detailsLink: 'https://example.com/event' # optional
image:
    src: '/events/2026/external/example.jpg'
    alt: 'What the image shows'
    attribution: 'Photo by Name.' # optional; rendered as the caption
talks:
  - 2026-11-20-speaker-topic
---
```

`detailsLink` is printed after the body as the raw URL. Put named links in the markdown body instead when the sentence needs a label.

`image.alt` is required whenever `image` is set. Use `attribution` for a photo credit. Posters usually omit it.

Talk fields (`src/content/talks/`): `title`, `speaker`, optional `youtubeLink` (watch URL, not an embed), optional `abstractPdf` (site path), optional `presentingRemotely: true`.

## Dates

Use one pair. `start` and `end` are datetimes and the heading shows a clock time. `startDate` and `endDate` are calendar dates and the heading shows the day only. The schema marks `startDate` and `endDate` for an event that has a date and no clock time.

### `start` and `end`

Use this pair when the source gives a clock time.

- Format: ISO 8601 with an America/Edmonton offset, `YYYY-MM-DDTHH:MM:SS±HH:MM`.
- Daylight time (second Sunday in March through the first Sunday in November) is `-06:00`. Standard time is `-07:00`.
- The date before `T` is the local calendar date. The calendar matches that prefix. `generateEventDateTimeString` in `src/utility/functions.ts` formats the instant in `America/Edmonton` and includes the time.
- Set both fields. The calendar includes the event only when both `start` and `end` are present.
- Same-day session: the same calendar date on both fields, with different times. The heading shows the date once and both times.
- Multi-day event with times: `start` is the first local date and time; `end` is the last.
- Example: `start: '2026-11-20T19:30:00-07:00'` and `end: '2026-11-20T21:00:00-07:00'`.

### `startDate` and `endDate`

Use this pair when the source gives a day or a range and no clock time. Field trips and symposium days are often in this group.

- Format: `YYYY-MM-DD` only. No time and no offset.
- The heading shows the date and no time (`convertDateString` in `src/utility/functions.ts`).
- Single day: set `startDate`. `endDate` may be omitted; sorting and the calendar then use `startDate` as the end.
- Multi-day: `startDate` is the first day and `endDate` is the last day.
- Example: `startDate: '2026-07-25'` and `endDate: '2026-07-25'`.

### Which pair

| The source gives | Write |
| --- | --- |
| A clock time, including one evening | `start` and `end` |
| A day, or a range of days, and no clock time | `startDate`, plus `endDate` when the range is more than one day |
| No date | Neither pair. Tell the user. An undated event is left off the calendar, the events API, and upcoming/past sorting |

Do not write midnight, `T00:00:00`, or a guessed time in order to use `start` and `end`.

Use only one pair. The heading prefers `start` / `end`, so it shows a time whenever either is set. Sorting and the API prefer `startDate` / `endDate` (`getStartDate` and `getEndDate` in `src/utility/eventSorting.ts`). Writing both can make the listed day and the heading disagree.

Monthly meetings are 7:30–9:00 p.m., so they use `start` and `end` with `19:30:00` and `21:00:00` and that date's Edmonton offset, and `location: 'Calgary, Alberta'`. Leave the Mount Royal room out of the event body; `/events/monthlymeetings` already describes it.

## Body

Markdown after the closing `---`. Empty bodies are normal for monthly meetings whose content lives on the talk.

Match the neighbouring file of the same type:

- External: when, where, cost, then a short description, using only stated facts.
- Field trip: leader, price, registration deadline, and the existing registration-form link.
- Fossil sorting: audience, place, and how to register, including the contact already used by that year's sessions.
- Talk: bio and abstract. Figures in the body use a site path under `/events/{year}/`.

## Checks

- The event uses `start` and `end`, or `startDate` and `endDate`, and not both. A timed event sets both `start` and `end`.
- `type` is an `EVENT_TYPES` value, quoted the same way as neighbouring files.
- APS events omit `host`. External events set both `type: External` and a non-APS `host`.
- A known host matches `HOST_LOGO_MAP` exactly.
- Every `image.src`, body image, `abstractPdf`, and registration href points at a file that exists under `public/`.
- Every `talks` entry matches a filename in `src/content/talks/` without `.md`.
- The event slug is unique in `src/content/events/`.

Then verify in the browser:

- `/events/calendar?year=YYYY&month=MM` shows the event on the right day.
- `/events/stable/{slug}` shows title, time, image, body, and talks.
- APS events also appear on `/events/` and on the type page (`/events/monthlymeetings`, `/events/fieldtrips`, or `/events/fossilsorting`).
- External events appear on the calendar and the stable page, and are absent from the homepage and `/events/`.
