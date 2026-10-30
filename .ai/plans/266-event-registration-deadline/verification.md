# Verification

2026-10-29. Branch `iss-266-event-registration-deadlines`. Nothing committed.

## Commands

- `npm run test -- --run` — 7 files, 86 tests passed, including 20 in `src/utility/registrationDeadline.test.ts`. The first run, before the helper existed, failed to load `./registrationDeadline`. The `selectNextEvent` tests failed with “is not a function” before that helper was added.
- `npm run build` — completed. Server and client builds succeeded. Unrelated static routes still prerender. The Vite chunk-size warning is the existing 3D scan bundle.

## Browser

Dev server: `npm run dev` (`TZ=UTC`), then a fresh server on port 4322 after the stable-page 404 change. An older process on port 4321 kept serving the previous page.

- `/events/fieldtrips` — Adult Waiver, Minor Waiver, and Medical form links are present. “Registration and Payment”, “Dinovember Sleepover Sign Up”, and “is open until” are absent.
- `/events/calendar` for October 2026 — events load. “Monthly Meeting: October 2026” opens `#2026-10-16-monthlyMeeting.md`.
- `/events/stable/2026-11-13-fieldtrip-rtmp-sleepin` — 200, with the event and previous/next links. No “Registration is closed.” because that event has no `registrationDeadline`.
- `/events/stable/does-not-exist` — 404, `text/html`, title “Event not found”, link to `/events/`.
- `GET /api/events` for October 2026 — 200, no deadline objects. `start_date` after `end_date` — 400, `start_date must be less than or equal to end_date`.
- Home and `/events/` — 200.

No current event sets `registrationDeadline`, so a live deadline chip, deadline card, closed sentence, and field-trip alert could not be clicked. Those paths are covered by the utility tests and the build.

After the review fixes, `npm run test -- --run` passed again (86 tests) and `npm run build` completed. The homepage at `http://127.0.0.1:4322/` still shows Next Event as “Search for Microfossils this Autumn, 2026” on Sunday, November 1, 2026. A same-day deadline card could not be checked in the browser; `selectNextEvent` covers that tie.
