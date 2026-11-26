# Decisions: 295-update-astro

## decision: Continue on existing branch and PR #296

**Alternatives:** New branch from `main` for implementation only; leave requirements PR separate.

**Choice:** Keep `cursor/iss-295-update-astro-491a` and update PR #296 so Node pins, requirements, plan, and upgrade land together.

**Why:** Avoids stacking two PRs for one issue; Node pins are already approved on this branch.

## decision: Full Content Layer migration; no shipped legacy flag

**Alternatives:** Enable `legacy.collectionsBackwardsCompat` temporarily on Astro 6/7; migrate later.

**Choice:** Migrate to Content Layer in this work and do not leave the legacy flag enabled in the final tree.

**Why:** Requirements demand Astro 7.x and durable maintainability; the flag is a temporary helper only.

## decision: Single PR upgrade path verified by build/test

**Alternatives:** Three sequential PRs (5→6, 6→7, polish); local stepwise commits without intermediate PRs.

**Choice:** One PR; during implementation, bump packages and fix until `build`/`test` pass (may include intermediate local commits).

**Why:** Requirements treat 5→6→7 sequencing as an implementation detail; one reviewable PR matches the issue.

## decision: Public URL id helper

**Alternatives:** Inline `entry.id` replacements everywhere; keep reading `entry.slug` with optional chaining.

**Choice:** Add `src/utility/contentEntry.ts` with a named helper used by pages, API, and deadline utilities.

**Why:** Centralizes former-slug semantics and gives an adjacent Vitest target for TDD.

## assumption: Glob basenames equal today’s slugs

**Alternatives:** Custom loader that preserves legacy `id`/`slug` dual fields.

**Choice:** Assume `glob` with per-folder `base` yields `id` equal to the previous `slug` for existing files.

**Why:** Matches Astro Content Layer docs; smallest reversible approach. If wrong, fix loader/`generateId` rather than inventing a parallel slug field unless URLs would break.

## decision: Markdown / compressHTML fallbacks

**Alternatives:** Always force `unified()` and `compressHTML: true` up front; always accept Astro 7 defaults.

**Choice:** Try Astro 7 defaults first after the bump. If collection body rendering or `remarkPluginFrontmatter` regresses, switch markdown to `unified()`. If inline spacing breaks, set `compressHTML: true`.

**Why:** Avoids unnecessary config unless a real regression appears; preserves visitor-facing behaviour when defaults do not.

## decision: Prettier reformat as its own commit

**Alternatives:** Mix formatting with migration commits; skip running Prettier after the bump.

**Choice:** After functional upgrade commits, bump Prettier and apply format-only changes in a separate `chore` commit on the same PR.

**Why:** Plan review: keeps the Astro/content diff reviewable.

## decision: Requirements already written

**Alternatives:** Re-run `/requirements` during runthrough.

**Choice:** Use existing `.ai/requirements/295-update-astro.md` (human answers already incorporated).

**Why:** Spec is complete; open questions are cleared.
