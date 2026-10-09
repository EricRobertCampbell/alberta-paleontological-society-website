# Architecture Decision Records

ADRs record architectural decisions that should stay visible to future developers and AI agents.

## When to write an ADR

Write or supersede an ADR when a change:

- Introduces a lasting architectural choice (rendering model, content shape, API contract style, timezone strategy, testing layout, deploy assumptions)
- Materially changes an existing Accepted decision
- Establishes a convention that code review should enforce later

Do not write an ADR for trivial implementation details, one-off content edits, or choices that are already obvious from the code.

## Process

1. Copy [TEMPLATE.md](TEMPLATE.md) to a new file named `NNNN-short-title.md` (zero-padded number, kebab-case title).
2. Fill in Context, Decision, and Consequences.
3. Set **Status** to `Proposed` while the decision is under discussion.
4. Set **Status** to `Accepted` when the team adopts it.
5. To reverse a decision, add a new ADR that supersedes the old one, and mark the old ADR `Superseded by NNNN`.

## Status values

- `Proposed`
- `Accepted`
- `Superseded by NNNN`
- `Deprecated`

## Index

| ADR | Title | Status |
| --- | --- | --- |
| — | _(none yet)_ | — |

Add a row here whenever you create an ADR.
