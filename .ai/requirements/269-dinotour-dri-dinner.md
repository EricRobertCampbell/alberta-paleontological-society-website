# Requirements

## Objective

Visitors reading the 2027 Edmonton DRI dinner and Dinotour 2027 can email the addresses given for each event, and can open the Dinotour 2027 registration form. On Dinotour 2027, that contact address and registration form are visible before the itinerary, inclusions, and price. If a source states a registration deadline for either event, that deadline is shown the way the site already shows a registration deadline. A registration opening date is not treated as a deadline.

## Background

Issue: [#269](https://github.com/EricRobertCampbell/alberta-paleontological-society-website/issues/269).

The issue asks for an email on the Edmonton DRI dinner (`Info@dinosaurresearch.com`), an email on Dinotour 2027 (`Dinotour@dinosaurresearch.com`), and a link to the Dinotour registration form on the Dinosaur Research Institute site. A follow-up asks to update these events with a registration deadline when one is present. A further follow-up accepts moving the Dinotour contact address and registration form so they can be found without reading the rest of the card.

Public visitors see these as external events. External events appear on `/events/calendar` and at `/events/stable/{slug}`. They are omitted from the home page, `/events/`, and the monthly-meeting, field-trip, and fossil-sorting listings. On the calendar, the month grid shows the title, and the card under the grid shows the type, host, title, dates, image, and markdown body. A `detailsLink` is printed after the body as the raw URL.

The events already exist:

- `src/content/events/2027-03-19-dri-edmonton-dinner.md` — DRI Edmonton Dinner, 19 March 2027, Edmonton. The body already has a mailto link to `info@dinosaurresearch.com`. `detailsLink` is `https://www.dinosaurresearch.com`.
- `src/content/events/2027-07-09-dinotour-grande-prairie.md` — Dinotour 2027 Grande Prairie, 9–12 July 2027. The body already has a mailto link to `dinotour@dinosaurresearch.com` and a link to `https://www.dinosaurresearch.com/images/Dinotour2027RegistrationFillablePDF.pdf`. `detailsLink` is the DRI Dinotour page.

The site can already store one optional registration deadline on an event. It must be a calendar date (`YYYY-MM-DD`) or a datetime with a timezone or offset. Where events are shown, that deadline is appended to the description. On the deadline’s day the calendar also shows “Registration Deadline for &lt;Event Name&gt;”, linking to the underlying stable page. After the deadline has passed, the event says registration is closed. A deadline for an external event appears only where external events appear. No event file currently sets a registration deadline.

Sources checked on 30 October 2026:

- The issue names the two emails and asks for the registration-form link. It states no deadline.
- The DRI Dinotour page (`https://www.dinosaurresearch.com/5%20Dinotour.htm`) gives `dinotour@dinosaurresearch.com`, says registration starts 1 October 2026, and links the 2027 fillable PDF at `images/Dinotour2027RegistrationFillablePDF.pdf`. The same page also links an older 2025 registration PDF for a different tour. The visible label near the 2027 file still says “Dinotour 2025 Registration Form”. The page states no closing date or time.
- The DRI home page describes the past Edmonton dinner of 20 March 2026 and says to contact `info@dinosaurresearch.com` for tickets for next year. It does not give a 2027 dinner date, venue, price, or registration deadline. Its Dinotour blurb says registration will begin on 1 October 2026.

## Functional Requirements

1. **Requested.** The Edmonton DRI dinner offers a way to email `info@dinosaurresearch.com`.
2. **Requested.** Dinotour 2027 offers a way to email `dinotour@dinosaurresearch.com`.
3. **Requested.** Dinotour 2027 links to the 2027 registration form published on the DRI Dinotour page: `https://www.dinosaurresearch.com/images/Dinotour2027RegistrationFillablePDF.pdf`.
4. **Requested.** On Dinotour 2027, the contact address and the registration-form link appear before the itinerary, the inclusions, and the price.
5. **Requested.** When a source states a registration deadline for one of these events, that event shows the deadline the way the site already shows a registration deadline, including the separate “Registration Deadline for &lt;Event Name&gt;” entry on the deadline’s day.
6. **Implied.** Both the email and the registration-form link are visible on the calendar month for the event and on its stable page.
7. **Implied.** The Dinotour 2025 registration PDF is not the registration form for Dinotour 2027.
8. **Implied.** The instructions for sending the completed form and the deposit stay with the registration-form link. They are not left below the itinerary after the form moves.
9. **Implied.** A date when registration opens is not a registration deadline. “Registration starts October 1, 2026” and “Registration will begin on October 1, 2026” stay descriptive text.
10. **Implied.** When no source states a closing deadline, the event does not gain one, and it does not say that registration is closed because of an opening date.
11. **Implied.** A stated deadline with no clock time is a calendar date. A stated deadline with a clock time includes that time. A clock time with no timezone uses the America/Edmonton offset for that date.
12. **Implied.** Facts already published for these events stay unless a source corrects them. That includes the Dinotour dates, cost, itinerary link, and the dinner’s 19 March 2027 date. The tour description itself is unchanged; only the contact and registration block moves ahead of it.

## Non-functional Requirements

1. The registration-form link is the DRI file named for Dinotour 2027, and it resolves as a downloadable PDF on the DRI site at the time of the change.
2. A date-only deadline stays on the written calendar date in development and in production. A datetime deadline does not move to another calendar day because the site process timezone differs from the offset on the deadline.

## Business Rules

1. These are external events hosted by the Dinosaur Research Institute. They stay on the calendar and their stable pages, and they stay off the home page, `/events/`, and the APS type listings.
2. Each event has at most one registration deadline.
3. A registration deadline is recorded only when a source states when registration closes. An opening date, a deposit instruction, or a contact address is not a deadline.
4. The 2027 registration form is the fillable PDF linked from the 2027 section of the DRI Dinotour page. The 2025 registration PDF on that page is for the earlier tour.
5. Email addresses match the issue and the DRI pages. Letter case in the address does not change the recipient.

## Acceptance Criteria

1. On the March 2027 calendar and on `/events/stable/2027-03-19-dri-edmonton-dinner`, the Edmonton dinner includes a mailto link to `info@dinosaurresearch.com`.
2. On the July 2027 calendar and on `/events/stable/2027-07-09-dinotour-grande-prairie`, Dinotour 2027 includes a mailto link to `dinotour@dinosaurresearch.com`.
3. Those Dinotour views link to `https://www.dinosaurresearch.com/images/Dinotour2027RegistrationFillablePDF.pdf`. They do not offer the 2025 registration PDF as the way to register for the 2027 tour.
4. On those Dinotour views, the contact address, the registration-form link, and the instructions for sending the form and the deposit appear before the itinerary, the inclusions, and the price.
5. With the sources available on 30 October 2026, neither event has a registration deadline. Neither view says that registration is closed. The sentence that registration starts on 1 October 2026 remains on Dinotour 2027 and is not a separate “Registration Deadline for Dinotour 2027 Grande Prairie” entry.
6. If a source states a closing deadline before the change is made, that event shows the deadline date, and the time when the source gives one. The calendar day for that deadline shows “Registration Deadline for &lt;Event Name&gt;” and links to that event’s stable page. The underlying event remains on its own dates.
7. The home page and `/events/` still do not list either event.
8. Dinotour’s dates, cost, and itinerary link are unchanged. The dinner remains on 19 March 2027 unless a source that corrects that date is supplied. The dinner contact stays with the short dinner description.

## Edge Cases

1. The DRI Dinotour page places a 2025 registration PDF below the 2027 tour. The 2027 event uses the 2027 PDF only.
2. The link text on the DRI page says “Dinotour 2025 Registration Form” beside the 2027 file. The APS event still points at the 2027 file.
3. `Info@dinosaurresearch.com` and `info@dinosaurresearch.com` are the same recipient. Either spelling satisfies the dinner email.
4. A deadline stated as a day with no clock time has no time on the event. It is not stored as midnight.
5. The dinner’s DRI homepage describes the 2026 dinner and asks readers to email for next year’s tickets. That page does not supply a 2027 deadline.
6. The dinner description is a single sentence plus the contact line. The placement requirement applies to Dinotour 2027, where the contact and form currently follow the itinerary.

## Out of Scope

1. Adding a venue, time, ticket price, or other dinner facts that the issue and the DRI pages do not state.
2. Changing either event’s dates from the values already published, unless a source that corrects a date is supplied.
3. A new kind of date for when registration opens.
4. Copying deadlines onto any other event.
5. Hosting the registration PDF on the APS site.
6. Showing these external events on the home page or `/events/`.

## Suggested Improvements

1. **User experience.** The dinner card sends “more details” to the DRI homepage, which still describes the 20 March 2026 dinner and only says to email for next year. Visitors looking for the 2027 dinner do not find a venue, time, or ticket price there. Publishing those facts once DRI states them would make the dinner card as useful as the 2026 dinner page already is.

## Open Questions

1. The issue, the current event bodies, and the DRI pages checked on 30 October 2026 state when Dinotour registration opens and do not state when registration closes for either event. If a closing deadline exists somewhere else, what is the date, and the time if there is one? If there is none, both events stay without a registration deadline. This does not block planning: the outcome is to leave the deadline unset unless that date is supplied.
2. The APS dinner is dated 19 March 2027. The DRI site does not give a 2027 dinner date; it documents 20 March 2026 and says to email for next year. Should 19 March 2027 stay? This does not block the email, form link, or deadline work. The date stays as published unless a correction is supplied.

## Assumptions

1. The two files named in Background are the events the issue means. No second 2027 Dinotour or Edmonton dinner should be added.
2. “If those are present” applies to these two events, and “present” means a closing deadline stated by the issue, the event’s current source, or the DRI pages checked for this specification.
3. Showing a deadline “the way the site already shows a registration deadline” means the existing optional deadline: a calendar date, or a datetime with a timezone or offset; the deadline on the description; the derived calendar entry; and the closed state after it passes.
4. Letter case in the email address is not significant.
5. Non-binding suggestion: none. The request to record a deadline when one is present is a requirement, not an implementation proposal. The accepted placement of the Dinotour contact and registration form is Functional Requirement 4, not a design for how the page is built.

## Changes

30 October 2026. Accepted the suggestion to move the Dinotour contact address and registration form ahead of the itinerary, inclusions, and price. It is now Functional Requirement 4. The instructions for sending the form and the deposit stay with that link. The dinner-details suggestion remains under Suggested Improvements.
