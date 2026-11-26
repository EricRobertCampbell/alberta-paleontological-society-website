# Requirements

## Objective

The site runs on the newest published Astro 7.x release. Maintainers can still build, test, and deploy it on Netlify. Public visitors and API consumers continue to see the same pages, content, and endpoints they use today.

## Background

Issue: [#295](https://github.com/EricRobertCampbell/alberta-paleontological-society-website/issues/295). The issue asks only to “Update to the newest version of Astro.” There are no comments or labels.

As of 26 November 2026 (America/Edmonton), the project depends on `astro` `^5.4.2` (lockfile 5.4.2) and `@astrojs/netlify` `^6.2.2` (lockfile 6.2.2). The newest Astro on npm at that check is 7.4.13. The newest `@astrojs/netlify` is 8.2.14 and declares a peer dependency on `astro` `^7.0.0`. The latest Astro 5.x release is 5.18.2. The README still describes the stack as Astro 5 with SSR and the Netlify adapter.

The site is SSR (`output: 'server'`) with the Netlify adapter. Astro 7 declares `engines.node` of `>=22.23.4`. The human confirmed the target is the latest Astro 7.x, that Node for Netlify is pinned in-repo (not only via the Netlify UI), and that GitHub Actions should move to a compatible Node version in the same body of work. `netlify.toml` and the lint workflow pin Node `22.23.4`. Prettier is still 2.8.8 while current `prettier-plugin-astro` expects Prettier 3.x.

Content collections are defined in `src/content/config.ts` with the legacy `type: 'content'` form for markdown collections (and a loader for some data collections). Pages and APIs that depend on those collections include the home page, `/events/` and type listings, `/events/calendar`, `/events/stable/{slug}`, bulletin archives, FAQs, Fossil Friday, privacy policy, and `GET /api/events`, `GET /api/fossil-friday`, and `GET /api/fossil-sorting-images`. Collection entries are commonly read with `getCollection` / `getEntry`, rendered with `entry.render()`, and addressed with `entry.slug` (for example stable event URLs and the events API).

Affected workflows:

- Public visitors browsing events, bulletins, fossils, FAQs, and related pages.
- Consumers of the public JSON APIs.
- Maintainers who run `astro dev`, `astro build`, Vitest, and Netlify deploys.

## Functional Requirements

1. **Requested.** The project uses the newest published Astro 7.x release available when the upgrade is performed.
2. **Requested.** Netlify builds use Node `22.23.4` (or newer within the same engines floor), pinned in the repository so it overrides any Netlify UI default.
3. **Requested.** GitHub Actions workflows that install Node for this project use a version that satisfies Astro 7’s `engines.node` (`>=22.23.4`), updated in the same upgrade work.
4. **Requested.** Prettier and `prettier-plugin-astro` are upgraded to versions that work together with the upgraded toolchain.
5. **Implied.** Official Astro packages the project already depends on, including `@astrojs/netlify`, remain at versions that support that Astro release.
6. **Implied.** `npm run build` succeeds after the upgrade.
7. **Implied.** The existing Vitest suite passes after the upgrade.
8. **Implied.** The Netlify deploy path that serves the production site continues to succeed with the upgraded project.
9. **Implied.** Public pages that already render content collections continue to show that content, including events, talks, bulletins, FAQs, announcements, Fossil Friday, and fossil-sorting data.
10. **Implied.** Stable event URLs under `/events/stable/{slug}` remain valid for existing event slugs.
11. **Implied.** `GET /api/events`, `GET /api/fossil-friday`, and `GET /api/fossil-sorting-images` continue to return their existing response shapes for the same inputs.
12. **Implied.** Development commands that already use Astro (`npm run dev`, `npm run preview`) continue to start against the upgraded project.
13. **Implied.** Project documentation that states the Astro major version is updated so it matches the version in use.

## Non-functional Requirements

1. Local development, CI, and Netlify production use a Node version that satisfies the upgraded Astro package’s declared `engines.node` requirement.
2. The upgrade does not change public page copy, content files, or API response contracts except where a newer Astro major forces an equivalent rewrite that preserves behaviour.

## Business Rules

1. “Newest” means the latest Astro 7.x release published on the npm registry at the time of the upgrade, not the newest patch within Astro 5.x.
2. Visitor-facing URLs and API contracts stay the same unless a forced framework change has no equivalent that preserves them; any such exception must be called out before merge.
3. Content already published in collections remains published; the upgrade is not a content edit.
4. The Netlify Node version is controlled from the repository (`netlify.toml` and/or `.nvmrc` / `.node-version`), not left only as a Netlify UI setting.

## Acceptance Criteria

1. `package.json` / the lockfile resolve `astro` to the newest published Astro 7.x version at the time of the change.
2. `@astrojs/netlify` (and any other official Astro integration already in the project) resolves to a release that supports that Astro version.
3. `npm run build` completes successfully.
4. `npm run test` (or the project’s Vitest run used in CI) passes.
5. A production-style Netlify build of the upgraded project succeeds on the in-repo pinned Node version (`>=22.23.4`).
6. Spot-checks of the home page, an events listing, `/events/calendar`, one `/events/stable/{slug}` page, and each public API route show the same content and response shape as before the upgrade for unchanged content.
7. The README’s technology-stack statement names the Astro major actually in use.
8. `netlify.toml` (or an equivalent in-repo Netlify Node pin) sets Node to a version that meets Astro 7’s engines.
9. GitHub Actions Node installs for this project use a version that meets Astro 7’s engines.
10. Prettier and `prettier-plugin-astro` resolve to mutually compatible versions, and the existing formatting workflow still runs.

## Edge Cases

1. The newest Astro 7.x on npm moves between writing the plan and merging the upgrade; the merge target is whatever is newest in 7.x when the upgrade is finished, not a stale pin from an earlier check.
2. Only some environments (local, GitHub Actions, Netlify) already meet Astro’s Node engines; every environment that builds or deploys the site must.
3. Collection entry identity used in URLs (today `slug` on content entries) must continue to match existing public paths such as `/events/stable/{slug}`.
4. Markdown rendering differences in a newer Astro major must not break pages that already render collection bodies (events, talks, announcements, FAQs, Fossil Friday, disclaimers).
5. A Prettier major bump may reformat many files; formatting churn is acceptable when required for a working Prettier + `prettier-plugin-astro` pair, and must not change runtime behaviour.

## Out of Scope

- Redesigning pages, navigation, or styling.
- Adding or rewriting site content, events, or bulletin archives.
- Upgrading unrelated dependencies except Prettier / `prettier-plugin-astro` and packages required for compatibility with the new Astro release or its official integrations.
- Enabling new Astro features that are not needed to keep current behaviour.
- Changing API authentication, caching policy, or response fields beyond what is required to keep existing contracts working.
- Configuring Node only through the Netlify UI without an in-repo pin.

## Suggested Improvements

None remain.

## Open Questions

None.

## Assumptions

1. “Newest version of Astro” means the latest Astro 7.x release on the public npm registry when the upgrade lands. The human confirmed the 7.x major jump on 26 November 2026.
2. Keeping `@astrojs/netlify` compatible with that Astro version is part of the requested outcome, even though the issue names only Astro.
3. Preserving current public behaviour is required; the issue does not ask for new visitor-facing features.
4. Intermediate major upgrades (5 → 6 → 7) are an implementation choice for `/plan-feature`, not a product requirement.
5. Stakeholder silence on content-collection internals is not a suggestion to keep the legacy config path; only the visitor- and maintainer-facing outcomes above are required.
6. Pinning Node `22.23.4` in `netlify.toml` and GitHub Actions is sufficient for Netlify and CI; no separate Netlify dashboard Node change is required when the in-repo pin is present.

## Update

26 November 2026. Human confirmed: target is latest Astro 7.x; Node for Netlify is pinned in-repo; GitHub Actions Node is upgraded in the same work. Accepted suggested improvements: in-repo Node pin for Netlify and CI, and a compatible Prettier / `prettier-plugin-astro` pair. Those are now Requested functional requirements. Open questions cleared.
