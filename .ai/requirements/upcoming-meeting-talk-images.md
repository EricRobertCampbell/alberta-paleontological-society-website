# Requirements

## Objective

Each monthly meeting from now until the meetings stop in May that has a talk shows a hero image of the speaker, preferably one that relates to that talk, with a visible credit to the original source and any citation that source requires.

## Background

Public visitors read monthly meetings on the home page, `/events/`, `/events/monthlymeetings`, the calendar, and the meeting’s stable permalink. The home page shows only the next event. `/events/` lists upcoming events and, behind a disclosure, past events. `/events/monthlymeetings` lists upcoming monthly meetings only. Each of those surfaces renders the event, including its optional hero image and caption, above the description and any talks.

“This year” means the rest of the monthly-meeting season: from 13 October 2026 until meetings stop in May 2027. There is no monthly meeting in March 2027; that weekend is the symposium. The season’s monthly meetings are:

| Meeting                     | Talk                                                                                                                  | Hero today                                                                           |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| 16 October 2026, 7:30 p.m.  | Christiana Garros, University of Alberta — “New discoveries from the University of Alberta's Morrin Bridge fieldwork” | None. Bio, abstract, and PDF abstract are present.                                   |
| 20 November 2026, 7:30 p.m. | Tako Koning — “The Driftwood Canyon Fossil Beds, Smithers, Northern British Columbia”                                 | None. Bio, abstract, PDF abstract, and two fossil figures with captions are present. |
| 11 December 2026, 7:30 p.m. | None. The meeting is the APS December potluck social.                                                                 | None                                                                                 |
| 15 January 2027, 7:30 p.m.  | Dr. Ilaria Paparella, Royal Tyrrell Museum of Palaeontology — “Marine Reptiles”                                       | None. The talk file has a title and speaker only.                                    |
| 19 February 2027, 7:30 p.m. | Dr. Christina Barron-Ortiz, Royal Alberta Museum — “Ice Age Horses”                                                   | None. The talk file has a title and speaker only.                                    |
| 16 April 2027, 7:30 p.m.    | Dr. Don Brinkman, Royal Tyrrell Museum of Palaeontology — “Central Asia's Fossil-Rich Sites”                          | None. The talk file has a title and speaker only.                                    |
| 14 May 2027, 7:30 p.m.      | None. The meeting is the annual general meeting.                                                                      | None                                                                                 |

None of these talks link to a speaker website.

A hero is the event image: a picture, a required text alternative, and an optional caption. Talks themselves have no image field. Past events on `/events/` keep showing that image after the meeting date.

## Functional Requirements

1. **Requested.** Each of these monthly meetings displays a hero image of that meeting’s speaker:
    - 16 October 2026 — Christiana Garros
    - 20 November 2026 — Tako Koning
    - 15 January 2027 — Ilaria Paparella
    - 19 February 2027 — Christina Barron-Ortiz
    - 16 April 2027 — Don Brinkman
2. **Requested.** Prefer a photo of the speaker that relates to the talk (for example, the speaker with the material, site, or work the talk is about). If no such photo is available, a photo of the speaker is enough.
3. **Requested.** The photo comes from a public page about the speaker, found by looking up that speaker. The page is the source that the credit cites.
4. **Requested.** Each hero has a visible credit that names the original site and includes the citation and licence notice that source requires. A page that states no licence is still acceptable. The credit names that source and page anyway.
5. **Requested.** The work is done on a separate branch, and a pull request is opened into `main`. It is not committed directly on `main`.
6. **Implied.** Each hero has a text alternative that describes what the photo shows, including the speaker.
7. **Implied.** The credit and text alternative match the photo. They do not describe a fieldwork or fossil scene when the photo is only a portrait, and they do not attribute the photo to a site it did not come from.
8. **Implied.** The November talk’s existing fossil figures and captions stay as they are. The hero is additional.
9. **Implied.** The image keeps displaying with the meeting on every page that already shows that meeting, including after the meeting date on surfaces that still list it.

## Non-functional Requirements

1. The hero remains understandable when the speaker’s website later changes or removes the photo.
2. The credit is readable as part of the meeting, at the same scale visitors already use for event image captions.

## Business Rules

1. Scope is the monthly meetings from 13 October 2026 through the last monthly meeting in May 2027. Only meetings that have a talk get a hero.
2. Use a public photo of the speaker unless the source page forbids copying or republication. A page that states no licence is allowed. The credit names the original site, includes the page address, and includes a licence notice when the source states one.
3. A fossil, site, or specimen picture that does not show the speaker does not satisfy the request.
4. The December social and the May annual general meeting have no speaker and no talk, so they get no hero under this request.
5. Monthly meetings stay public. Adding a hero does not change the meeting time, place, title, or talk text.

## Acceptance Criteria

1. The October meeting shows a photo of Christiana Garros. The photo relates to the Morrin Bridge / Horseshoe Canyon fieldwork or the fossils in that talk when a public photo of that kind exists and the page does not forbid copying; otherwise it is a photo of Garros.
2. The November meeting shows a photo of Tako Koning. The photo relates to Driftwood Canyon or the Eocene fossils in that talk when a public photo of that kind exists and the page does not forbid copying; otherwise it is a photo of Koning.
3. The January meeting shows a photo of Ilaria Paparella. The photo relates to marine reptiles when a public photo of that kind exists and the page does not forbid copying; otherwise it is a photo of Paparella.
4. The February meeting shows a photo of Christina Barron-Ortiz. The photo relates to Ice Age horses when a public photo of that kind exists and the page does not forbid copying; otherwise it is a photo of Barron-Ortiz.
5. The April meeting shows a photo of Don Brinkman. The photo relates to Central Asian fossil sites when a public photo of that kind exists and the page does not forbid copying; otherwise it is a photo of Brinkman.
6. Every new photo has a text alternative that describes the photo, and a visible credit naming the original site plus any citation the source requires.
7. The November talk still shows the _Eosalmo driftwoodensis_ and _Metasequoia_ figures with their current captions.
8. The December social and the May annual general meeting still have no hero image.
9. While a meeting is the next event, its hero appears on the home page. While it is upcoming, its hero appears on `/events/`, `/events/monthlymeetings`, and that meeting’s stable permalink.
10. The change reaches `main` only through a pull request opened from a separate branch.

## Edge Cases

1. The speaker has no personal website. A public university, museum, society, or news page about the speaker is the next place to look.
2. The only public photo is an unrelated headshot. Use it, and do not imply in the credit that it shows the talk subject.
3. A related photo exists but the page forbids copying or republication. Do not use that photo. A page that simply states no licence is still acceptable; cite it.
4. No public photo of the speaker can be found. That meeting stays without a hero, and the gap is reported.
5. The photo includes other people or is a group shot. The text alternative says so, and the credit still matches the source.
6. The 16 October meeting may have passed before the image is published. It remains in scope for this request because it was upcoming on 13 October 2026.
7. The November talk already illustrates its subject. Those figures are not a substitute for a photo of the speaker.
8. January, February, and April talks have no bio or abstract yet. The hero does not require adding one.
9. There is no March 2027 monthly meeting. The symposium that weekend is not one of these talks.

## Out of Scope

- Monthly meetings that have already happened, including the 18 September 2026 talk by Luke Nelson.
- The 11 December 2026 social and the 14 May 2027 annual general meeting.
- Monthly meetings after May 2027.
- Field trips, fossil-sorting sessions, the March 2027 symposium, and external events.
- Changing meeting copy, abstracts, or the November talk figures.
- A new image treatment, layout, or talk-image system.
- Merging the pull request.

## Suggested Improvements

1. **User experience.** Make the credit a link to the source page. Captions today are plain text, so a written-out URL is easy to miss and harder to check. A link would let a visitor open the original page from the meeting.
2. **Technical.** Keep the picture with the talk, not only with the meeting. Each of these meetings has one talk, so a meeting hero is enough. A later meeting with two talks could not show one picture per talk without that split.
3. **User experience.** When the chosen photo is only a portrait, say that in the caption in ordinary language. Visitors skimming a talk announcement may otherwise assume the picture is from the field site or the fossils.

## Open Questions

1. **Medium.** If no public photo of a speaker can be found, is leaving that meeting without a hero acceptable, or should someone supply a photo?
2. **Low.** Should the 16 October hero still be added if that meeting has already happened by the time the change is published?

## Assumptions

1. “From now until meetings stop in May” means APS monthly meetings from 13 October 2026 through 14 May 2027. That answer replaces the earlier calendar-year assumption.
2. “An image of them” means a photograph that shows the speaker. A subject-only fossil photo is not enough.
3. “The speaker’s website” includes another public page about the speaker when no personal site exists. This is assumed so talks that do not link a personal site can still be in scope.
4. The hero visitors already see on an event is the image this request means. Treating that as a reason to invent a separate talk-image system would be a design choice; see Suggested Improvements.
5. The March symposium is outside “monthly meetings,” even though it falls before May.
6. A public photo with no stated licence may be saved on the site. The caption cites the source page. A page that forbids copying is still excluded.

## Revision

2026-10-13: “This year” now means from 13 October 2026 until monthly meetings stop in May 2027. The January, February, and April 2027 talks are in scope. December 2026 and May 2027 stay out of scope because they have no talk. The home-page acceptance criterion now matches the site: only the next event appears there. Delivery on a separate branch, with a pull request into `main`, is requested. Suggested improvements are unchanged. The earlier question about whether January 2027 was in scope is answered and removed.

2026-10-13: A photo with no stated licence is in scope. Cite the source page. A page that forbids copying is still out of scope. The high open question about skipping those photos is removed. Suggested improvements are unchanged.
