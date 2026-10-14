# Verification

2026-10-13, branch `upcoming-meeting-talk-images`.

## Build

`npm run build` completed with exit code 0. Content sync succeeded. Stable pages for the five meetings were prerendered, including `/events/stable/2026-10-16-monthlymeeting/` and `/events/stable/2026-11-20-monthlymeeting/`.

No Vitest run. This change adds image files and event frontmatter the schema already accepts.

## Browser

Dev server: `npm run dev` (`TZ=UTC`), http://localhost:4322/.

`/events/monthlymeetings` rendered a loaded hero and caption for October 2026, November 2026, January 2027, February 2027, and April 2027. December 2026 and May 2027 had no hero. The November talk still showed `/events/2026/tako-koning-driftwood/eosalmo-driftwoodensis.jpg` and `metasequoia.jpg`.

The home page’s next event was Monthly Meeting: October 2026, and its hero loaded (`/events/2026/christiana-garros-morrin-quarry.jpg`).

`/events/stable/2026-11-20-monthlymeeting/` showed the Tako Koning hero and both fossil figures.

## Push

`git push -u origin HEAD` published `upcoming-meeting-talk-images`. Pull request, left unmerged: https://github.com/EricRobertCampbell/alberta-paleontological-society-website/pull/262
