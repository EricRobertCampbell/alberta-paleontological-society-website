# Decisions

## Use the existing event hero

Each in-scope meeting has one talk, and `Event.astro` already shows `image` above that talk. The plan sets `image` on the event file. It does not add an image field to talks. Moving the picture onto the talk stays a suggested improvement until it is accepted.

## Branch and pull request into main

The change is committed on a new branch and opened as a pull request into `main`. Implementation does not commit on `main` and does not merge the pull request.

The implementation branch is `upcoming-meeting-talk-images`. The plan’s earlier suggestion, `content/upcoming-meeting-talk-images`, is replaced by the repository branch name with no issue number: a short kebab-case description.

## Photos with no stated licence

Accepted 2026-10-13. A public photo may be saved when the page does not forbid copying. The caption cites the source page even when the page states no licence.
