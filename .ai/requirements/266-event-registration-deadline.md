# Requirements

## Objective

An event can record a registration deadline as either a calendar date or a datetime with a timezone or offset. Everywhere the site already shows events, that deadline appears as its own event titled “Registration Deadline for &lt;Event Name&gt;”, linking to the underlying event. After the deadline has passed, visitors can see that registration is closed.

## Background

Public visitors see events in these places:

- `/events/calendar` shows a month grid and, under it, an event card for each event whose dates overlap the viewed month. A day cell links to that event’s card. The grid shows titles. The card shows the type, title, time, image, and description.
- The home page shows the next upcoming APS event. External events are omitted. `TodaysEvents` is present in the source and commented out on the page.
- `/events/` lists today’s APS events, upcoming APS events, and past APS events. External events are omitted.
- `/events/monthlymeetings`, `/events/fieldtrips`, and `/events/fossilsorting` list upcoming events of that type, and the field-trip and fossil-sorting pages also list past ones.
- `/events/stable/{slug}` is the stable page for one event.

Event dates are already stored in one of two ways. `start` and `end` are datetimes with an offset, such as `2026-11-13T18:30:00-07:00`. `startDate` and `endDate` are calendar dates with no clock time. The calendar day comes from the date portion of those values. A date-only value stays on that calendar date in both development (UTC) and production (America/Edmonton). Upcoming versus past uses the same local calendar date: an event is upcoming when its end date is today or later.

There is no structured registration deadline. Deadlines are sentences in the event body. The November 2026 Dinovember sleepover is 13–14 November and its body says the registration deadline is Sunday, October 11. The field-trips page gates a sleepover alert, a registration-and-payment section, and a sleepover form link with a hardcoded `2026-10-11`. As of 29 October 2026 that date is already past, so those blocks are hidden. Other field trips state deadlines only in prose, for example “August 1, 2026”.

`GET /api/events` returns selected frontmatter for events overlapping a date range. It does not return the markdown description or a registration deadline. A separate weekly SVG generator reads that API. It does not build this calendar.

Issue: [#266](https://github.com/EricRobertCampbell/alberta-paleontological-society-website/issues/266).

## Functional Requirements

1. **Requested.** An event may have a registration deadline.
2. **Requested.** The deadline is either a calendar date with no clock time, or a datetime that includes a timezone or offset.
3. **Requested.** On the calendar, an event that has a registration deadline shows that deadline at the end of its description. A date-only deadline shows the date. A datetime deadline shows the date and time.
4. **Requested.** On the deadline’s day, the calendar shows an event titled “Registration Deadline for &lt;Event Name&gt;”, using the underlying event’s title. Clicking it shows a regular event card with that same text and a link to the underlying event’s stable page, `/events/stable/{slug}`.
5. **Requested.** Every place that already shows events also shows this deadline, as its own event, with that title and a link to the underlying stable page. That includes the home page’s next event, `/events/`, the monthly-meeting, field-trip, and fossil-sorting listings, and the underlying event’s stable page.
6. **Requested.** The deadline event is ordered and grouped by the deadline’s date, in the same way an event is ordered and grouped by its own dates. It can be the next event, an upcoming event, today’s event, or a past event.
7. **Requested.** Once the deadline has passed, the deadline event and the underlying event say that registration is closed.
8. **Requested.** The field-trips page removes the blocks that are hidden because 11 October 2026 has passed: the Dinovember sleepover alert, the Registration and Payment section, and the Dinovember Sleepover Sign Up form link. The adult waiver, minor waiver, and medical form links stay.
9. **Requested.** When a field trip has a registration deadline that is still open, the field-trips page shows a registration alert taken from that deadline. No separate hardcoded date controls it.
10. **Requested.** `GET /api/events` includes an event’s registration deadline when one is set. A date range that contains the deadline date returns the deadline as its own event, including when the range does not contain the underlying event’s dates. A date range that contains the underlying event returns that event, including its deadline.
11. **Requested.** Existing events are left unchanged. Deadlines already written only in prose are not copied into a structured deadline.
12. **Requested.** `/add-event` looks for a registration deadline in the source, whether that source is the user’s description or a fetched page. When the source states one, the event records it. When the source does not state one, the deadline stays unset.
13. **Implied.** An event with no registration deadline is unchanged.
14. **Implied.** The deadline does not change the underlying event’s dates. The underlying event stays on its own days. The deadline event is on the deadline’s day.
15. **Implied.** A date-only deadline uses that calendar date and has no clock time. A datetime deadline uses the calendar date in its own timezone or offset.
16. **Implied.** The deadline event follows the underlying event’s visibility. A deadline for an external event appears where external events appear, including the calendar, and is omitted where external events are omitted, including the home page and `/events/`. A deadline appears on a type listing only when that listing already shows the underlying event.
17. **Implied.** A date-only deadline stays open through that calendar date and is closed starting the next calendar date. The field-trips page treated 11 October 2026 as still open on that date. A datetime deadline stays open through that instant and is closed after it. “Today” follows the site’s existing local calendar date: America/Edmonton in production and UTC in development.
18. **Implied.** Any event the site already shows may have a deadline, including field trips, meetings, and external events.
19. **Implied.** `/add-event` records a calendar date when the source gives a day and no clock time, and a datetime when the source gives a clock time. A clock time with no timezone uses the America/Edmonton offset for that date, the same rule the skill already uses for `start` and `end`. A source that states no deadline does not get an invented one. Updating an event leaves a deadline unchanged when the new source does not mention it.

## Non-functional Requirements

1. A date-only deadline stays on the written calendar date in development and in production.
2. A datetime deadline does not move to the previous or next calendar day because the site process timezone differs from the offset written on the deadline.
3. The closed state uses that same local calendar date for a date-only deadline, and the deadline’s own instant for a datetime.

## Business Rules

1. The deadline is optional.
2. The two accepted forms are a calendar date, or a datetime that includes a timezone or offset. A datetime with no timezone or offset is not a deadline.
3. The underlying event and the deadline event are both shown. The deadline event does not replace the underlying event.
4. The deadline event’s title is “Registration Deadline for &lt;Event Name&gt;”.
5. The deadline event links to the underlying event’s stable page.
6. Existing events are not given a structured deadline as part of this work.
7. An event has at most one registration deadline.

## Acceptance Criteria

1. An event can be given a registration deadline of `2026-10-11` and no clock time.
2. An event can be given a registration deadline of a datetime that includes an offset, such as `2026-10-11T17:00:00-06:00`.
3. A value that is neither a calendar date nor a datetime with a timezone or offset is not treated as a deadline.
4. On the calendar month of an event that has a deadline, that event’s description ends with the deadline date, and with the time when a datetime was given.
5. The calendar still shows the underlying event on its own days.
6. The calendar day for the deadline shows “Registration Deadline for &lt;Event Name&gt;”. Clicking it shows an event card with that text and a link to `/events/stable/{slug}` for the underlying event. A deadline on 11 October for an event on 13–14 November appears in October under that title, and the November event remains in November.
7. The home page, `/events/`, the matching type listing, and the underlying stable page show the same deadline event, with that title and the same stable link, when they would show an event on the deadline’s date.
8. While the deadline is still open, those places do not say that registration is closed. After a date-only deadline’s calendar date, and after a datetime deadline’s instant, the deadline event and the underlying event say that registration is closed.
9. An event with no deadline still shows only its own entry, and its description is unchanged.
10. Setting a deadline does not change the event’s start or end.
11. No existing event file gains a structured deadline. The Dinovember sleepover keeps its deadline only in prose.
12. `/events/fieldtrips` no longer shows the Dinovember sleepover alert, the Registration and Payment section, or the Dinovember Sleepover Sign Up link. The adult waiver, minor waiver, and medical form links remain.
13. A field trip with a structured deadline that is still open shows a registration alert on `/events/fieldtrips` taken from that deadline. No hardcoded `2026-10-11` date controls it. With no structured deadline, that alert is absent.
14. `GET /api/events` for a range that includes only the deadline date returns the deadline event and its title. A range that includes the underlying event returns that event and its deadline. A range that includes both returns both.
15. The add-event skill tells the agent to look for a registration deadline and to record it when the source states one, as a calendar date or as a datetime. It tells the agent to leave the deadline unset when the source states none.

## Edge Cases

1. The deadline falls on a day the event already occupies. That day shows the underlying event and “Registration Deadline for &lt;Event Name&gt;”.
2. The deadline is in a different month from the event. The event’s month shows the underlying event, with the deadline at the end of the description. The deadline’s month shows the deadline event and its card, with a link to the stable page, and does not show the underlying description unless the underlying event also overlaps that month.
3. The deadline is before the event, after the event, or on the event’s last day.
4. The event has a clock time and the deadline is date-only, or the reverse. The deadline event shows a clock time only when the deadline has one.
5. The deadline is late in the evening in its own offset, so the UTC instant falls on the next calendar day. Visitors still see the deadline on the offset’s calendar date.
6. The event body already states a deadline in prose, and someone later records a structured deadline. The structured deadline is shown as its own event and at the end of the description, so the date can appear twice until the prose is edited.
7. The underlying event has no start or end. It stays off the calendar and the dated listings. Its deadline event still appears on the deadline’s date and links to the stable page.
8. The deadline day is in a past month, or the deadline instant has passed. The deadline event remains visible there and says that registration is closed. An underlying event that is still upcoming also says that registration is closed.
9. The deadline event is the earliest upcoming APS event. The home page shows it as the next event.
10. The underlying event is external. The deadline event appears on the calendar and the stable page, and is omitted from the home page and `/events/`.
11. The Dinovember signup PDF can remain on disk. The event body may still link to it. The field-trips page no longer lists it beside the waivers.

## Out of Scope

- Registration forms, payment, refunds, capacity, and waitlists.
- Hand-written symposium registration sections.
- Copying prose deadlines on existing events into structured deadlines, including the Dinovember sleepover. `/add-event` records a deadline only when someone adds or updates an event and the source states one.
- Deleting the Dinovember signup PDF from `public/`.
- A stable page whose only purpose is the deadline event.
- The weekly SVG generator. The API change is in scope; that generator’s code is not.

## Suggested Improvements

None remain.

## Open Questions

None.

## Assumptions

1. “The calendar” is the public page `/events/calendar`.
2. The issue’s “registrationDeadline field” on the event schema is a non-binding suggestion for where the deadline is stored. The requirement is the behaviour above, not a particular field name or schema API.
3. An event has at most one registration deadline.
4. “Event Name” in the title is the underlying event’s title.
5. The deadline event uses the same event-card layout visitors already see. Its title is the sentence above, it shows the deadline’s date or datetime, and it links to the underlying stable page. It does not repeat the underlying event’s description, image, or location.

## Update

29 October 2026. The deadline is its own event titled “Registration Deadline for &lt;Event Name&gt;”. Clicking it on the calendar opens a regular event card with that text and a link to the underlying stable page. The same deadline event appears everywhere events are already shown, ordered by the deadline date. Existing events are not backfilled.

These suggestions are now requirements: say that registration is closed after the deadline; drive the field-trips registration alert from the structured deadline; return the deadline from `GET /api/events`, including as its own event when the range covers the deadline date.

The suggestion to collapse the deadline into the underlying event when they share a day was not adopted. The deadline stays its own event on that day as well. The earlier suggestion to append the deadline to descriptions outside the calendar is covered by showing the deadline as its own event in those places; the underlying event’s description still ends with the deadline on the calendar.

29 October 2026, later. The hidden field-trips blocks are removed: the Dinovember alert, the Registration and Payment section, and the Dinovember Sleepover Sign Up link. A registration alert still appears when a field trip has a structured deadline that is still open. `/add-event` looks for a registration deadline and records it when the source states one. There is no plan directory for this feature yet, so these changes are recorded here for `/plan-feature`.
