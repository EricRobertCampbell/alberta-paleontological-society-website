---
name: categorize-comments
description: Triage critical or advisory comments about the codebase by severity, likelihood, and fix effort, then recommend address, band-aid, defer, or ignore. Use when the user runs /categorize-comments, or when prioritizing findings from /code-review, a human reviewer, another agent, or an external report.
---

# Categorize comments

Decide which review comments are worth fixing now. Do not implement fixes in this skill unless the caller (for example [runthrough-feature](../runthrough-feature/SKILL.md)) explicitly continues into implementation after triage.

## Inputs

Accept comments from any source:

- Numbered findings from [code-review](../code-review/SKILL.md)
- Human reviewer notes on a pull request or in chat
- Another agent's critique
- External bug or quality reports

Preserve each comment's original identifier when it has one (finding number, review thread, quote). If a comment has no id, assign `C1`, `C2`, … for this triage pass.

Read enough surrounding code to rate the three axes honestly. Do not re-run a full code review unless the comments are too vague to score.

## Axes

Score every comment on all three axes. Use these scales only.

### Severity

How bad is it if the issue is real and occurs?

| Level | Meaning |
| --- | --- |
| **S1 — Critical** | Exploitable security hole, data loss, or data corruption |
| **S2 — High** | Incorrect user-visible behaviour, security weakness, or significant performance harm |
| **S3 — Medium** | Defect that can hide until later, missing regression coverage for real behaviour, or maintainability that will become a defect |
| **S4 — Low** | Minor improvement, style, or polish |

When the comment already carries a [code-review severity](../code-review/references/findings.md), start from that mapping: Critical→S1, High→S2, Medium→S3, Low→S4. Adjust only when the local code shows the stated severity is wrong, and say why.

### Likelihood

How probable is the failure or cost in normal use of this site?

| Level | Meaning |
| --- | --- |
| **L1 — Probable** | Likely in ordinary visitor or editor use, or already observed |
| **L2 — Occasional** | Plausible on a real path, but not the common case |
| **L3 — Unlikely** | Narrow edge case, unlikely data shape, or theoretical without evidence |

### Effort

How much work is a sound fix?

| Level | Meaning |
| --- | --- |
| **E1 — Small** | Localized change; roughly a short edit and a focused test |
| **E2 — Moderate** | Several files or a small design tweak; still contained |
| **E3 — Large** | Broad restructuring, schema/API migration, or a large rewrite of a section |

Rate effort for a proper fix. If a narrow mitigation is much cheaper than a proper fix, note that under the recommendation as a possible **band-aid**.

## Disposition

Choose exactly one disposition per comment:

| Disposition | Meaning |
| --- | --- |
| **address** | Fix properly now |
| **band-aid** | Apply a small mitigation now; record the proper fix as follow-up |
| **defer** | Real issue; leave it for a later change |
| **ignore** | Not worth tracking; preference, obsolete, or incorrect |

### Decision rules

Apply the first matching rule:

1. **S1** at any likelihood → **address**, unless effort is E3 and a reliable **band-aid** removes the exploitable or destructive path now. If neither a proper fix nor a band-aid is possible in this change, **defer** and call it out as residual Critical/High risk.
2. **S2** + **L1** → **address**. If effort is E3, prefer a **band-aid** that corrects the behaviour on the hot path, and defer the restructure.
3. **S2** + **L2** → **address** when effort is E1 or E2; **band-aid** or **defer** when effort is E3 (prefer band-aid if one clearly reduces user harm).
4. **S2** + **L3** → **address** when effort is E1; otherwise **defer** (or **band-aid** when cheap and behaviourally meaningful).
5. **S3** + effort **E1** → **address**, even when likelihood is L3.
6. **S3** + effort **E2** → **address** when likelihood is L1 or L2; **defer** when likelihood is L3.
7. **S3** + effort **E3** → **defer**, or **band-aid** only when a tiny guard prevents a concrete failure without the restructure.
8. **S4** → **ignore**, or **address** only when effort is E1 and you are already touching that code for another **address**/**band-aid** item.
9. Pure style or alternate-implementation preferences with no defect → **ignore**.

Examples that must fall out of these rules:

- Low severity that needs a large restructure → **ignore** or **defer**, never a broad rewrite for polish.
- Medium severity, low likelihood, small effort → **address**.
- Medium severity, low likelihood, large restructure → **defer**, or **band-aid** if a tiny guard helps.

When rules conflict because a comment bundles several issues, split it into separate scored items.

## Output

Write a triage list. If a plan directory exists for the work under review, also save it as `.ai/plans/<feature-slug>/comment-triage.md`. Otherwise put the full triage in the reply.

Use this shape:

```markdown
# Comment triage

## Summary

- Address: …
- Band-aid: …
- Defer: …
- Ignore: …

## Items

### 1. Short title

- **Source:** finding #n / reviewer / quote
- **Severity:** S2 — High
- **Likelihood:** L2 — Occasional
- **Effort:** E3 — Large
- **Disposition:** defer
- **Rationale:** …
- **Suggested follow-up:** …  # required for band-aid and defer; omit for ignore
```

Number items in the same order as the input when possible. Keep dispositions stable: do not mark something **address** and then skip it without saying why.

## After triage

- Tell the human (or the calling skill) which ids to fix now, which get a band-aid, and which are left.
- Do not expand the change to take **defer** or **ignore** items.
- When this skill runs under `/runthrough-feature`, the runthrough skill performs the **address** and **band-aid** work next.

## Related

- Code review: [code-review](../code-review/SKILL.md)
- Findings scale: [findings.md](../code-review/references/findings.md)
- Runthrough: [runthrough-feature](../runthrough-feature/SKILL.md)
- Implementation: [implement-feature](../implement-feature/SKILL.md)
