Status: Done

Approved 2026-10-13. Implementing 2026-10-13. Done 2026-10-13. Pull request: https://github.com/EricRobertCampbell/alberta-paleontological-society-website/pull/262

# Plan

## Objective

Add a credited hero photo of the speaker to each monthly meeting from 13 October 2026 through May 2027 that has a talk. Do the work on a new branch and open a pull request into `main`.

## Scope

Five meetings, one talk each:

- 16 October 2026 — Christiana Garros, Morrin Bridge fieldwork
- 20 November 2026 — Tako Koning, Driftwood Canyon
- 15 January 2027 — Ilaria Paparella, marine reptiles
- 19 February 2027 — Christina Barron-Ortiz, Ice Age horses
- 16 April 2027 — Don Brinkman, Central Asian fossil sites

For each talk, look up a public page about the speaker. Prefer a photo of them that relates to the talk. Otherwise use a photo of them. Save a local copy, set the event `image` (`src`, `alt`, `attribution`), and leave the talk text as it is.

## Out of scope

- December 2026 social and May 2027 annual general meeting
- The March 2027 symposium
- Meetings before 13 October 2026 and after May 2027
- Schema, component, or layout changes
- Turning the caption into a link, or moving the image onto the talk (those are suggested improvements, not accepted)
- Merging the pull request

## Delivery

Do this on a separate branch. Do not commit it on `main`.

1. Branch from current `main`. Suggested name: `content/upcoming-meeting-talk-images`.
2. Commit the image files and event frontmatter on that branch. Use a `content` commit type so release-please can list it after merge (`readme/adr/0001-release-please.md`).
3. Push the branch and open a pull request into `main`.
4. Stop. Leave the pull request open for review. Do not merge it as part of this work.

## Architectural approach

Reuse the event hero that `Event.astro` already renders. Set `image` on the five event files. Do not add a talk image field, and do not change `Talk.astro`.

Store each photo at `public/events/{year}/{kebab-name}.{ext}`, referenced as a site path. That matches `.agents/skills/add-event/SKILL.md` and keeps the hero up if the speaker’s site later drops the file. The November fossil figures stay in `public/events/2026/tako-koning-driftwood/` and stay in the talk body.

`attribution` stays a plain string. Include the photographer or institution, the source site name, the source page URL written out, and any licence notice the source states. `alt` describes who is in the photo and, when it is true, the talk-related setting. Do not claim a portrait was taken at the field site.

A page with no stated licence is allowed. Cite the source page anyway. Skip a photo only when the page forbids copying or republication. The source page must identify this speaker and, when the talk names an institution, that institution. If no public photo of that person can be found, leave the meeting without `image` and say so in the pull request.

## Affected areas

- Content: five event files
- Assets: new files under `public/events/2026/` and `public/events/2027/`
- Pages, only as existing render sites: home (next event only), `/events/`, `/events/monthlymeetings`, calendar, `/events/stable/{slug}`

## Affected files and modules

- `src/content/events/2026-10-16-monthlyMeeting.md`
- `src/content/events/2026-11-20-monthlyMeeting.md`
- `src/content/events/2027-01-15-monthlyMeeting.md`
- `src/content/events/2027-02-19-monthlyMeeting.md`
- `src/content/events/2027-04-16-monthlyMeeting.md`
- New image files under `public/events/2026/` and `public/events/2027/`

No edits to `src/content/config.ts`, `src/components/Event.astro`, `src/components/Talk.astro`, or the talk markdown, unless a talk file is opened only to read the speaker’s name.

## Content / schema changes

Frontmatter added to each in-scope event that receives a photo:

```yaml
image:
    src: '/events/2026/example.jpg'
    alt: 'What the photo shows, including the speaker'
    attribution: 'Photo by Name. Site name. https://example.com/page. Licence notice when the source requires one.'
```

No schema change. Events with no acceptable photo keep omitting `image`.

## UI changes

None beyond the hero those five events will show through the existing figure. The image is capped at 60% of the content width, with a small caption.

## Testing strategy

This is a content change that fits the existing event schema. Do not add a Vitest suite for it. There is no current test for event heroes.

Verify in the browser on a branch build:

- Each meeting that received a photo shows it, with the alt text available and the credit visible, on `/events/monthlymeetings` and on `/events/stable/{slug}` while the meeting is upcoming.
- The home page shows the hero only when that meeting is the next APS event. Another APS event, such as fossil sorting, can be sooner. A missing home-page hero is not a failure in that case.
- The November fossil figures are still in the talk.
- December and May still have no hero.

## Security considerations

Save a local copy of a public photo. A page with no stated licence is allowed when the caption cites it. Do not save a photo from a page that forbids copying or republication. Do not hotlink. The caption is text, so a credit URL cannot inject markup. Do not use a page that asks for credentials or sits behind a login wall.

## Deployment considerations

America/Edmonton offsets on these events stay as they are. Merging a `content` commit to `main` causes release-please to open a patch release pull request. Opening this feature pull request does not publish a release.

## Relevant ADRs and architecture docs

- `readme/adr/0001-release-please.md` — `content` commits on `main` open a patch release pull request after merge.
- No architecture note applies. `readme/architecture/` has no document past the template.

## Open questions

None. A page with no stated licence is allowed and must be cited. A page that forbids copying is skipped. If no public photo of the speaker exists, that meeting stays without a hero and the gap is reported in the pull request. The 16 October photo stays in scope if that date has passed.

## Revisions

2026-10-13: The plan review’s licence stop is removed. A photo with no stated licence is in scope and is cited. The home-page check applies only when that meeting is the next APS event. The source page must identify the speaker and, when named, their institution. No photo of that person means no hero, reported in the pull request.

## Assumptions

- One hero on the event is enough, because each in-scope meeting has one talk.
- A museum, university, or news page counts when the speaker has no personal site.
- The March symposium is not part of this season’s monthly-meeting talks.
- The pull request is opened and left for a human to merge.
