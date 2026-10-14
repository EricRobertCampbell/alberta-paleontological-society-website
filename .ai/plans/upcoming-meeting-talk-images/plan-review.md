# Plan Review

Reviewed against `.ai/requirements/upcoming-meeting-talk-images.md` after the licence decision: a public photo with no stated licence is allowed, and the caption cites the source page. A page that forbids copying is still excluded.

## Blocking Issues

The plan still treats a missing licence as unresolved, and it tells the implementer not to choose files until that is answered. The checklist repeats that stop. The architectural approach says to skip the photo when no stated licence is the only problem.

That now misses the requirement. Those photos are in scope. The credit still names the site and the page, and it includes a licence notice only when the source states one. A page that forbids copying or republication stays excluded. Until the plan and checklist say that, an implementer will either stall or leave heroes off.

## Important Issues

The plan’s second open question asks whether a missing photo should be left off or waited on. Requirements edge case 4 already says to leave that meeting without a hero and report the gap. The checklist agrees. Keeping the question open in `plan.md` gives a reason to stop work the requirements already decided.

The checklist never says to confirm the page is the person in the talk. October and November have bios. January, February, and April have a name and an institution only. A different researcher with a similar name would still satisfy every mechanical check. The page used for the photo should name that speaker and, when the talk names one, the same institution.

Home-page verification is easy to misread. `src/pages/index.astro` shows one event: the soonest upcoming event with no host or `host: APS`, not “the next monthly meeting.” Fossil sorting and other APS events can be sooner than one of these five meetings, so the home page can omit a hero that is still upcoming. `/events/monthlymeetings` and the stable permalink are the checks that match the requirement. The home page only confirms a hero when that meeting is actually the next APS event.

## Generalization Opportunities

### Recommended

None. The event `image` field and `Event.astro` hero already cover a meeting with one talk. Extending that is the whole change.

### Not Recommended

A talk-level image field, so a future meeting with two talks could show two heroes. Nothing in this season has two talks, and the requirements leave that as an unaccepted suggestion. A new field would be a schema change for a case this work does not have.

## Questions

None that should block implementation once the licence wording above is in the plan. The remaining requirements questions are already given a working rule: no public photo means no hero, reported in the pull request; the 16 October photo stays in scope if that date has passed.

## Suggested Changes

- In `plan.md` and `checklist.md`, delete the instruction to wait on the licence question. State that a page with no licence is allowed and must be cited, and that a page that forbids copying is skipped.
- Remove the licence item from Open questions. Leave the “no photo found” case as the edge-case rule, not as a question that stops the branch.
- Add a checklist step: the source page identifies this speaker, and the institution matches the talk when the talk names one.
- Say that the home page is checked only when one of these meetings is the next APS event. Do not treat a missing home-page hero as a failure when a different APS event is sooner.

## Missing Tests

No Vitest gap. The change adds files and event frontmatter the schema already accepts. It does not change rendering, sorting, or filtering. A missing test would not hide a regression in code. The browser checks in the checklist are the right verification, with the home-page caveat above.

## Positive Findings

Claims in `findings.md` match the code. `eventSchema.image` is `src`, required `alt`, and optional `attribution`. Talks have no image field. `Event.astro` renders the hero before the body and inserts `attribution` as text, so a credit URL cannot inject markup. The add-event path `public/events/{year}/{kebab-name}.{ext}` matches existing heroes. The November fossil figures are separate files and stay out of the hero slot. Home, `/events/`, `/events/monthlymeetings`, the calendar month list, and `/events/stable/[slug]` all render `Event.astro`. Upcoming versus past on the meeting and events pages comes from `sortEventsByDate`, which this work does not change.

The plan reuses that hero instead of adding a component or schema. It stores a local file instead of hotlinking, so the non-functional requirement about the speaker’s site later dropping the photo is met. The branch, the pull request into `main`, and the `content` commit type match the request and `readme/adr/0001-release-please.md`. Opening the pull request does not itself cut a release.

## Recommendation

Revise the plan. The approach is right; the licence stop is not. Do not implement until that wording is updated and the plan is approved.
