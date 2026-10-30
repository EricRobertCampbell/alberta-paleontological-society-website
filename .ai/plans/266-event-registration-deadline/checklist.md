# Checklist

## Tests

- [x] Add failing `src/utility/registrationDeadline.test.ts` for validation, calendar-day prefix, open/closed, derived entry, and API range selection
- [x] Run that test and confirm it fails before the helper exists

## Content / utilities

- [x] Add `src/utility/registrationDeadline.ts` and the optional schema field
- [x] Re-run the utility tests and confirm they pass

## UI

- [x] Teach `Event.astro` the deadline time line, the stable link, the calendar deadline sentence, and “Registration is closed.”
- [x] Show derived deadline entries on the calendar, including a deadline whose month is not the event’s month
- [x] Show derived entries on the home page, `/events/`, monthly meetings, field trips, and fossil sorting. Cancelled for the stable page: that page shows only the underlying event, with the deadline sentence after its content.
- [x] Render the stable event page on each request so open versus closed uses the server clock
- [x] Remove the three hidden field-trips blocks and show an alert for open field-trip deadlines

## API

- [x] Return `registrationDeadline` and the derived object from `GET /api/events` using the helper
- [x] Update `src/pages/api/README.md`

## Skill

- [x] Update `.agents/skills/add-event/SKILL.md` to record a stated deadline and to leave it unset otherwise

## Review follow-up

- [x] Prefer the underlying event when the homepage’s next date is shared with a deadline
- [x] Type deadline frontmatter as `EventFrontmatter` and remove the listing `as any` casts

## Verification

- [x] Run `npm run test`
- [x] Run `npm run build`
- [x] Browser-check the calendar, field trips, and an event card path. No current event has a deadline, so the new card is verified by the unit tests plus a build; say so if a live deadline card cannot be clicked
