# Decisions

## Store the deadline as `registrationDeadline`

The issue suggested this name. It is optional on `eventSchema`. The behaviour matters more than the name, and no other name is in use.

Accepted values:

- `YYYY-MM-DD` for a calendar date
- `YYYY-MM-DDTHH:MM:SS` with `Z` or `±HH:MM` for a datetime. Seconds are required, matching `start` / `end`. Fractional seconds are allowed.

A datetime with no zone is invalid. A date-only value is not passed through `Date.parse` to decide its calendar day.

## Deadline rows are derived, not new markdown files

Pages and the API build a second entry from the field. Content files are not duplicated. Existing events without the field are unchanged.

The derived entry copies `type` and `host` so the existing APS, external, and type filters apply. It drops `image`, `location`, `subtitle`, `talks`, and `detailsLink`. Its title is `Registration Deadline for ${title}`. Its anchor id is `${id}-registration-deadline`. Its stable link is `/events/stable/${slug}` of the underlying event, with the underlying title as the link text.

A date-only deadline sets `startDate` and `endDate` to that date and does not set `start` / `end`. A datetime sets `start` and `end` to that instant and does not set `startDate` / `endDate`. That matches `getStartDate`, which prefers `startDate`.

## The card time is read from the stored string

The deadline heading and the sentence at the end of a calendar description use the date prefix and, for a datetime, the clock time in the string. They do not use `dateToDisplayFormat`, which converts to America/Edmonton and can move a non-Edmonton offset onto another day.

## Closed copy and where the deadline sentence appears

After the deadline, both the underlying card and the deadline card say “Registration is closed.” A date-only deadline is still open on that `getTodayString()` date. A datetime is closed once `Date.now()` is after `Date.parse`.

Every underlying event card adds “Registration deadline: …” after its main content, in the site error red. The deadline’s own card does not repeat that sentence. Other pages still show the deadline as its own card and leave the markdown body unchanged. The stable page shows only the underlying event. A morning deadline still follows `sortEventsByDate` (upcoming through the end date) and also shows the closed sentence once the instant has passed.

## API returns both objects when the range covers both dates

The underlying object gains `registrationDeadline` when set. The derived object uses the same id, title, and date fields as the card, plus `sourceEventId` and `stablePath`. A range that covers only the event returns the underlying object. A range that covers only the deadline returns the derived object. A range that covers both returns both, underlying first when the dates are equal. An undated event still does not appear; its deadline does when the range covers the deadline date.

## Field-trip alert

Delete the three `showSleepoverRegistration` blocks. When one or more field trips have an open `registrationDeadline`, show one warning `Alert` with a line per trip: the title links to the stable page and the line includes the formatted deadline. No event has the field yet, so the alert is absent until one is set.

## Add-event

The skill records the field when the source states a deadline. A day with no clock time is `YYYY-MM-DD`. A clock time with no zone uses the America/Edmonton offset already used for `start` / `end`. The skill does not invent a deadline, and an update does not clear a deadline the new source does not mention.

## Stable event page renders per request

The stable page is the only event surface that is prerendered. Closed versus open has to follow the same `getTodayString()` and `Date` instant as the other listings. Remove `prerender` from `src/pages/events/stable/[slug].astro` and resolve the slug on each request. Previous and next still come from the collection. Do not move that check into the visitor’s browser timezone.

## Missing stable pages use the site layout

A missing slug sets status 404 and renders the normal layout with the heading “Event not found” and a link to `/events/`. Returning a bare `Response` from the page was replaced, in dev, by a plain-text “Not found” body.

## Homepage tie when the deadline shares the event’s date

The homepage still has one Next Event slot. `selectNextEvent` chooses the earliest calendar date. When a deadline shares that date with an event, the underlying event is selected. An earlier deadline is still selected over a later event. Among several underlying events on the earliest date, the last one in the input stays selected, matching the previous homepage sort. Listings still show both cards.

## No ADR

The API README is the contract. The display rule lives next to the helper. This does not need a new ADR.
