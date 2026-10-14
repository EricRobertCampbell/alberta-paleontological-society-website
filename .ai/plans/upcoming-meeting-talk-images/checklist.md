# Checklist

## Branch

- [x] From current `main`, create `content/upcoming-meeting-talk-images` (or another new branch). Do not commit on `main`.
      Done as `upcoming-meeting-talk-images`, from `main`.

## Images

A page with no stated licence is allowed. Cite the source page. Skip a photo only when the page forbids copying or republication. The page must identify that speaker and, when the talk names one, the same institution.

- [x] Christiana Garros (16 October 2026): find a public photo, prefer one tied to Morrin Bridge or that fieldwork, save it under `public/events/2026/`, and set `image` on `src/content/events/2026-10-16-monthlyMeeting.md`.
- [x] Tako Koning (20 November 2026): find a public photo, prefer one tied to Driftwood Canyon, save it under `public/events/2026/`, and set `image` on `src/content/events/2026-11-20-monthlyMeeting.md`. Leave the two fossil figures in the talk body.
      No Driftwood photo of Koning was found. The hero is a portrait from the Alberta Wilderness Association profile that identifies him. The fossil figures are unchanged.
- [x] Ilaria Paparella (15 January 2027): find a public photo, prefer one tied to marine reptiles, save it under `public/events/2027/`, and set `image` on `src/content/events/2027-01-15-monthlyMeeting.md`.
- [x] Christina Barron-Ortiz (19 February 2027): find a public photo, prefer one tied to Ice Age horses, save it under `public/events/2027/`, and set `image` on `src/content/events/2027-02-19-monthlyMeeting.md`.
      The CBC photo shows her holding a fossil horse premolar. Her face is outside the frame. The alt text says so.
- [x] Don Brinkman (16 April 2027): find a public photo, prefer one tied to Central Asian fossil sites, save it under `public/events/2027/`, and set `image` on `src/content/events/2027-04-16-monthlyMeeting.md`.
      No Central Asia photo was found. The hero is a laboratory portrait from a DrumhellerMail profile that identifies him as Tyrrell’s director of preservation and research. The caption does not claim the fossil is from Central Asia.
- [x] For each saved photo, set `alt` to what the photo shows and `attribution` to the source site, written-out page URL, and any citation or licence notice that source requires.
- [x] If a speaker has no photo the society can republish, leave that event without `image` and record the gap.
      Every in-scope speaker had a public photo. None were skipped.

## Verification

- [x] Confirm December 2026 and May 2027 still have no `image`.
- [x] In the browser, check each new hero on `/events/monthlymeetings` and that meeting’s stable permalink, and the November fossil figures. Check the home page only when one of these meetings is the next APS event.
      Monthly meetings page showed all five heroes. The November stable permalink was opened in the browser. The home page’s next event was the October meeting, and its hero loaded. See `verification.md`.
- [x] Run the production build.
      `npm run build` exited 0.

## Pull request

- [x] Commit on the feature branch with a `content` commit message.
      `13ac931` — `content: add speaker photos to upcoming monthly meetings`
- [x] Push the branch.
      `upcoming-meeting-talk-images` tracks `origin/upcoming-meeting-talk-images`.
- [x] Open a pull request into `main` and leave it unmerged.
      https://github.com/EricRobertCampbell/alberta-paleontological-society-website/pull/262
