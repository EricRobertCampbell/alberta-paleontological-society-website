---
name: runthrough-feature
description: Run plan-feature, review-plan, implement-feature, and code-review in sequence with as little human interruption as possible. Use when the user runs /runthrough-feature, or asks to plan, review, implement, and code-review a feature in one pass.
---

# Runthrough feature

Drive a feature from request to reviewed implementation without stopping between phases. Prefer completing the work over waiting for confirmation.

When this skill is invoked, that request is approval to continue through every phase below. Do not stop for the human gates that the child skills use when they run alone.

## Phases

Run these skills in order. Read each skill file and follow it, except where this skill overrides a stop or approval gate.

1. [plan-feature](../plan-feature/SKILL.md)
2. [review-plan](../review-plan/SKILL.md)
3. [implement-feature](../implement-feature/SKILL.md)
4. [code-review](../code-review/SKILL.md)

After code-review, run [categorize-comments](../categorize-comments/SKILL.md) on the consolidated findings. Address items marked **address** or **band-aid**. Leave items marked **defer** or **ignore**. If you change code, re-run the affected checks and a focused code-review pass on the new diff.

## Autonomy overrides

These overrides apply only while `/runthrough-feature` is the active skill:

| Child skill rule | During runthrough |
| --- | --- |
| `/plan-feature` stops for human review | Continue to `/review-plan` |
| `/review-plan` waits for human approval before implementation | Treat a non-blocking review as approval. Record `Status: Approved` with the date and that `/runthrough-feature` approved it, then continue to `/implement-feature` |
| `/implement-feature` expects an explicit implement request as approval | The `/runthrough-feature` invocation is that approval |
| Open questions or missing requirements would normally stop the work | Decide, record the decision or assumption, and continue when a reasonable choice exists |

Do not invent product requirements that the request does not support. Prefer the smallest reversible choice that unblocks the next phase.

## Decisions and assumptions

Whenever you choose among alternatives, fill a gap, or accept a risk so work can continue:

1. Record it in `.ai/plans/<feature-slug>/decisions.md` (create the file if needed).
2. Label each entry as a **decision** or an **assumption**.
3. Note the alternatives considered and why this choice was taken.
4. Keep going.

If the request is still product-language and blocked without a specification, run [requirements](../requirements/SKILL.md) first, then continue the phases. Record that you ran it as a decision.

## When a plan review finds problems

- **Blocking issues you can resolve in the plan:** revise `plan.md`, `checklist.md`, and `findings.md` / `decisions.md` as needed. Re-run `/review-plan` once. Then continue.
- **Blocking issues that need a product call you can reasonably infer:** choose, record the assumption, revise the plan, and continue.
- **Truly unsafe to guess** (legal, irreversible data loss, production secrets, or a contradiction that invalidates the objective): stop, report the blocker, and list decisions made so far. This is the only hard stop.

## Trivial work

If the request is an isolated bug fix, typo, small UI change, simple content update, or other task that `/plan-feature` would skip:

1. Say that a full plan is disproportionate.
2. Skip phases 1 and 2.
3. Run `/implement-feature`, then `/code-review`, then `/categorize-comments` on the findings.
4. Record that skip as a decision if a plan directory already exists; otherwise say it in the final summary.

## Implementation and delivery

Follow `/implement-feature` for TDD, verification, branch naming, commits, and the pull request into `main`. Use `.cursor/rules/issue-branches.mdc`.

Do not merge the pull request.

## After code review

1. Run `/categorize-comments` on every numbered finding (and on optional suggestions only when they are cheap and clearly valuable).
2. Fix **address** and **band-aid** items on the same branch.
3. Re-run tests (and build when relevant). Re-review the follow-up diff.
4. Update the pull request description if the change set grew.

Do not expand scope to chase **defer** or **ignore** items.

## Final human summary

When the runthrough is complete — or when it hits the hard stop — give the human one summary that includes:

- What shipped (branch, pull request, and plan status)
- Phases run and any phase skipped
- Decisions and assumptions made, with pointers to `decisions.md`
- Code-review findings: addressed, band-aided, deferred, and ignored
- Remaining risk or open questions that still need a human

Do not ask the human to approve intermediate phases unless you hit the hard stop.

## Related

- Requirements: [requirements](../requirements/SKILL.md)
- Planning: [plan-feature](../plan-feature/SKILL.md)
- Plan review: [review-plan](../review-plan/SKILL.md)
- Implementation: [implement-feature](../implement-feature/SKILL.md)
- Code review: [code-review](../code-review/SKILL.md)
- Comment triage: [categorize-comments](../categorize-comments/SKILL.md)
- Paths: `.ai/README.md`
