# Plan Review

## Blocking Issues

None.

`src/pages/events/stable/[slug].astro` is prerendered while the rest of the event listings render per request (`output: 'server'`). A closed sentence computed at build time would stay wrong until the next deploy. The plan drops `prerender` on that page and uses the same server clock as the other listings. That is the right fix, and it is in the plan before implementation.

## Important Issues

None.

## Generalization Opportunities

### Recommended

None. The plan already puts validation, calendar-day selection, open/closed, the derived entry, and API range selection in `src/utility/registrationDeadline.ts`. The pages repeat the same filter-then-append shape they already use for sorting. A new list component would hide page-specific sections (today, past, next event) without removing a real duplication.

### Not Recommended

A content-collection entry per deadline, or a client-side clock on the stable page. The first duplicates markdown. The second uses the visitor’s timezone instead of the server date the rest of the site already uses.

## Questions

None.

## Suggested Changes

None.

## Missing Tests

The utility test list covers the behaviour that can hide a regression: validation, the date prefix, open versus closed, the derived entry, and the three API range cases. This repository has no Astro render harness. Leaving the pages as thin callers is consistent with the existing Vitest layout. A missing page-level test would not add coverage the helper test cannot provide, as long as each listed page actually calls the helper.

## Positive Findings

The plan matches the code that was checked: `getStartDate` prefers `startDate`, `dateToDisplayFormat` converts to America/Edmonton, the calendar month filter will not pull a deadline in from another month, the three field-trips blocks are the ones gated by `showSleepoverRegistration`, and the API returns a fixed field list with no body. Optional schema and no backfill keep current events and the current API payload unchanged. The stable link is a site path, not `detailsLink`.

## Recommendation

approve
