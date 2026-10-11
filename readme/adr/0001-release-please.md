# 0001. Cut releases with release-please

- **Status:** Accepted
- **Date:** 2026-10-10

## Context

Versions and `CHANGELOG.md` were updated on every push to `main` by a GitHub Action that ran `standard-version` and pushed the result back to `main`. That produced a git tag for the current version (`v1.219.2` at the time of this decision) and often an empty patch release for commits that never appeared in the changelog. The repository already requires [Conventional Commits](https://www.conventionalcommits.org/).

## Decision

Pushes to `main` run [release-please](https://github.com/googleapis/release-please) via `googleapis/release-please-action` at v4, using manifest mode:

- `release-please-config.json` configures a single Node package at the repository root
- `.release-please-manifest.json` records the last released version
- Tags stay in the existing `vX.Y.Z` form (`include-component-in-tag` is false)
- `feat` opens a minor release, `fix` and `content` open a patch release, and a `BREAKING CHANGE` footer opens a major release
- Other commit types, such as `chore` and `docs`, do not open a release
- Merging the release pull request updates `package.json`, `package-lock.json`, `CHANGELOG.md`, and the manifest, then tags the commit and publishes a GitHub Release

The manifest starts at `1.219.2` so the next release continues from the existing `v1.219.2` tag. Historical changelog entries stay in place.

## Alternatives considered

- Keep `standard-version` pushing release commits directly to `main` — it bypasses pull request review and publishes empty patch releases for non-user-facing commits
- Use release-please with only the default changelog sections — `content` commits, which record events, bulletins, and other site updates, would no longer appear in the changelog or cut a release

## Consequences

### Positive

- Release notes and version bumps are reviewed in a pull request before a tag exists
- GitHub Releases are published for each version
- Changelog entries include `content` commits as well as features and fixes

### Negative

- A release is not tagged until someone merges the release pull request
- `chore`, `docs`, `refactor`, and `test` commits no longer bump the version on their own

### Follow-ups

- `README.md` describes the release pull request flow
- The implement-feature skill records which commit types open a release
