---
name: search-palaeo-events
description: >-
    Search for new palaeontological events in or related to Alberta, compare them
    to existing events in the content collection, and report ready-to-add event
    data without writing files. Use when the user runs /search-palaeo-events or
    asks to find, discover, scrape, or survey upcoming museum or palaeo events in
    Alberta.
disable-model-invocation: true
---

# Search palaeo events

Find palaeontological events in or related to Alberta, compare each candidate to `src/content/events/`, and **display** everything needed to add or update an event. Do **not** write or modify any files. Hand off creation or updates to `/add-event` only when the user asks.

Reuse field rules, host names, date pairs, `detailsLink` conventions, and ATMS restrictions from [add-event](../add-event/SKILL.md). Schema source of truth: `src/content/config.ts`.

## Scope

Include an event when it is palaeontology-related **and** either:

- takes place in Alberta, or
- is hosted or co-hosted by an Alberta museum/society, or
- is clearly aimed at Alberta audiences (for example an RTMP webcast)

The event must be open to the **general public** (or to the public with ordinary paid admission/tickets). Do **not** list school-only, classroom-only, or grades-only sessions. When a program lists both a public evening and school daytime slots (for example RTMP webcasts), report only the public session(s).

Also skip these recurring museum program types even when they are palaeo-themed:

- Homeschool Days (and similar homeschool-only education days)
- The Nesting Grounds (and similar parent-and-tot drop-in series at PJCDM)

Skip non-palaeo museum programming (general kids camps, art nights, unrelated exhibitions) unless the listing is about fossils, dinosaurs, Ice Age life, geology of fossils, or similar.

Prefer upcoming and ongoing events. Mention past events only when they are still listed on a source page and the match check is useful.

## Sources

Search every source below. Open the page (or listing) and read what is visible. If a login wall, signup wall, or empty listing blocks content, say what was visible and continue with the other sources.

| Source                           | Start URL / entry                                                                                                                                                                   |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Royal Tyrrell Museum             | `https://tyrrellmuseum.com/whats_on` (also check speaker series, webcasts, and other program pages linked from What’s On)                                                           |
| Royal Alberta Museum             | `https://www.royalalbertamuseum.ca/whats-on`                                                                                                                                        |
| Philip J. Currie Dinosaur Museum | `https://dinomuseum.ca/events`                                                                                                                                                      |
| Devil's Coulee Dinosaur Museum   | `https://www.devilscoulee.com/`                                                                                                                                                     |
| General search                   | Web search for Alberta palaeontology / dinosaur / fossil events, talks, workshops, and field programs (museums, universities, societies). Prefer organizer pages over social posts. |

For each listing that looks relevant, open one durable event or program page when the index lacks date, time, place, or cost. Do not crawl the entire site.

Never use `https://atms.alberta.ca` (or any path on that host) as `detailsLink` or as a recommended body link. For RTMP, prefer the tyrrellmuseum.com program-type overview (see add-event). If the source only gives ATMS, omit `detailsLink` and say so.

## Workflow

1. Load or search `src/content/events/` enough to match candidates (by date + title/host/type/speaker). Do not invent matches.
2. Visit each required source and run the general search.
3. For every candidate event, extract only stated facts (title, subtitle, dates/times, location, host, cost, registration, speaker, description, image URL if shown, durable details URL).
4. Classify against existing events (see [Match against existing events](#match-against-existing-events)).
5. Report results with the [Output format](#output-format). No file writes, no commits, no `/add-event` unless the user asks next.

## Match against existing events

Match on calendar date together with title, type, host, and speaker when known. A later session of a series is a different event even when the title is similar.

| Result               | When                                                   | Report                                                                                                                                                                                                     |
| -------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **New**              | No matching file                                       | Full create payload (frontmatter + body + notes)                                                                                                                                                           |
| **Update suggested** | Same event exists, source has extra or corrected facts | Path of existing file, fields that would change, and suggested new values. Highlight added information, a better `detailsLink`, missing `location`/`image`/`registrationDeadline`, body gaps, or talk data |
| **Already complete** | Same event exists and the source adds nothing material | Path only; one line that it is already covered                                                                                                                                                             |
| **Uncertain**        | Possible match but date/title/host conflict            | Existing path(s), why it is ambiguous, and both interpretations                                                                                                                                            |

Do not propose a second file for an event that already has a file.

## Output format

Lead with a short summary: sources checked, how many new / update / already complete / uncertain / skipped.

Then one section per candidate, newest first when dates are known:

### [Title] — New | Update suggested | Already complete | Uncertain

- **Source:** URL(s) used
- **Existing file:** path or `none`
- **Match notes:** why it matched, or why it is new/uncertain
- **Suggested changes:** only for updates — bullet the fields or body beats that would change

**Proposed frontmatter** (for New and Update suggested; omit for Already complete):

```yaml
---
title: '...'
# only fields supported by eventSchema; omit unknowns
type: 'External'
host: '...' # exact HOST_LOGO_MAP string when known
# start/end OR startDate/endDate — not both
detailsLink: '...' # durable page; never ATMS
---
```

**Proposed body:** markdown that would follow the frontmatter, using only stated facts.

**Talk (if any):** proposed talk frontmatter + `## Bio` / `## Abstract` when the source has them.

**Image:** remote image URL from the source if one was found, plus suggested `alt` and the `public/events/...` path `/add-event` would use. Do not download the file.

**Gaps:** facts the listing did not provide (time, price, registration, etc.).

After all candidates, list **Skipped** items briefly (non-palaeo or out of scope) with source URL and reason.

End with: remind the user that nothing was written; they can run `/add-event` with a chosen candidate or URL to create or update files.

## Checks while reporting

- Record only facts the source states; leave unknown fields unset.
- External museum events use `type: External` and the exact host string from add-event when applicable (`Royal Tyrrell Museum of Palaeontology` / `Royal Tyrrell Museum`, `Royal Alberta Museum`, `Philip J. Currie Dinosaur Museum`, `Devil's Coulee Dinosaur Heritage Museum`).
- Prefer organizer event pages over social posts for `detailsLink`.
- Do not invent clock times to force `start`/`end`.
- Do not write files, create branches, or commit.
