# Findings

Research for adding speaker hero images to monthly meetings from 13 October 2026 through May 2027. Requirements: `.ai/requirements/upcoming-meeting-talk-images.md`.

## Meetings in the season

Monthly meetings are `type: Monthly Meeting` under `src/content/events/`. Talks are a separate collection, referenced from the event `talks` list by slug. There is no monthly meeting in March 2027; `2027-03-13-symposiumDay1.md` and `2027-03-14-symposiumDay2.md` point at `/events/symposium` and do not reference the talks collection.

| Event file                                        | Talk file                                                               | Speaker and title                                   | Image today                                                                                                |
| ------------------------------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `src/content/events/2026-10-16-monthlyMeeting.md` | `src/content/talks/2026-10-16-christiana-garros-morrin-bridge.md`       | Christiana Garros — Morrin Bridge fieldwork         | No `image`. Talk has bio, abstract, and `abstractPdf`.                                                     |
| `src/content/events/2026-11-20-monthlyMeeting.md` | `src/content/talks/2026-11-20-tako-koning-driftwood.md`                 | Tako Koning — Driftwood Canyon                      | No `image`. Talk body already has two `<figure>` images under `public/events/2026/tako-koning-driftwood/`. |
| `src/content/events/2026-12-11-monthlyMeeting.md` | none                                                                    | December potluck                                    | No talk, no `image`.                                                                                       |
| `src/content/events/2027-01-15-monthlyMeeting.md` | `src/content/talks/2027-01-15-ilaria-paparella-marine-reptiles.md`      | Dr. Ilaria Paparella — Marine Reptiles              | Title and speaker only.                                                                                    |
| `src/content/events/2027-02-19-monthlyMeeting.md` | `src/content/talks/2027-02-19-christina-barron-ortiz-ice-age-horses.md` | Dr. Christina Barron-Ortiz — Ice Age Horses         | Title and speaker only.                                                                                    |
| `src/content/events/2027-04-16-monthlyMeeting.md` | `src/content/talks/2027-04-16-don-brinkman-central-asia.md`             | Dr. Don Brinkman — Central Asia's Fossil-Rich Sites | Title and speaker only.                                                                                    |
| `src/content/events/2027-05-14-monthlyMeeting.md` | none                                                                    | Annual general meeting                              | No talk, no `image`.                                                                                       |

No talk file links a personal or institutional profile URL. January, February, and April cannot be matched to a website from the talk body; the speaker name and institution in frontmatter are the only leads.

## How a hero is stored and shown

Schema is `eventSchema.image` in `src/content/config.ts`: `src` (string), `alt` (required when `image` is set), `attribution` (optional string). Talks have no image field (`talkSchema` is title, speaker, youtube link, abstract PDF, and `presentingRemotely`).

`src/components/Event.astro` renders `image` as a `<figure class="hero-figure">` after the header and before the event body and talks. `attribution` is inserted as text inside `<figcaption>`, so a URL in the caption is not a link. The caption is styled at `0.5rem`. The image uses `max-width: 60%`.

`src/components/Talk.astro` renders the talk title, speaker, abstract PDF link, optional YouTube embed, and markdown body. It does not render an image.

Existing credits are plain sentences or a licence line. Examples:

- `src/content/events/2026-10-18-microfossilSorting.md` — `attribution: 'Jessica Theodor Checks a Fossil which Vaclav Marsovsky Found at the Microfossil Sorting Session on March 8, 2026. Photo by Mona Trick.'`
- `src/content/events/2023-08-19-danek-bonebed-field-trip.md` — `attribution: Jeffrey Beall, CC BY 4.0 <https://creativecommons.org/licenses/by/4.0>, via Wikimedia Commons`

The add-event skill (`.agents/skills/add-event/SKILL.md`) already defines the file convention: an APS event hero goes in `public/events/{year}/{kebab-name}.{ext}` and is referenced as `/events/{year}/{kebab-name}.{ext}`. `image.src` is a site path, never a remote URL. Figures inside a talk body use `public/events/{year}/{slug}/`. Do not put these speaker photos in the November talk’s figure folder; that folder is for the existing fossil figures.

## Where visitors see it

`Event.astro` is used by:

- `src/pages/index.astro` — one event, the soonest upcoming APS event (`nextEvent`)
- `src/pages/events/index.astro` — upcoming APS events, then past APS events inside `<details open>`
- `src/pages/events/monthlymeetings.astro` — upcoming monthly meetings only (`sortEventsByDate`)
- `src/pages/events/stable/[slug].astro` — one meeting by slug
- `src/pages/events/calendar.astro` — the selected day’s events

Home will show at most one of these heroes at a time, and only while that meeting is the next event. After the meeting date, `/events/monthlymeetings` drops it; `/events/` keeps it under past events; the stable permalink keeps it.

Listing filters use `host`. These monthly meetings omit `host`, so `filterAPSEvents` keeps them. Do not add `host`.

## Dates

Event `start` values are America/Edmonton instants. October 2026 and April–May 2027 use `-06:00`. November 2026 through February 2027 use `-07:00`. This work does not change those fields. “Upcoming” elsewhere in the site is computed from those instants, so an October image added after 16 October 2026 still belongs on the past-events list and the stable permalink, and will not be on the monthly-meetings page.

## Tests and docs

No Vitest suite asserts event hero markup or `image` frontmatter. Content-collection events are not given a new test when they fit the existing schema (add-event skill). `readme/architecture/` has no note beyond the template. `readme/adr/0001-release-please.md` says a `content` commit on `main` opens a patch release pull request via release-please. That matters after this pull request is merged; it does not change how the branch is opened.

## Rights gap

The requirements still have a high open question: when a page shows a usable photo but states no licence, should that photo be skipped? Until that is answered, implementation cannot choose the files. The rest of the approach — event `image`, local file, plain-text credit, branch, pull request — does not depend on the answer.
