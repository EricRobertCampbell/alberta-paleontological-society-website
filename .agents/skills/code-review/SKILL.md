---
name: code-review
description: Review a diff, pull request, or local change on the Alberta Paleontological Society website by running the specialized reviews that match the change, then consolidating findings. Use when the user asks for a code review, runs /code-review, or asks whether a change is ready to merge.
---

# Code Review

Orchestrate the specialized review skills. Do not restate their checklists here. Do not start implementation.

## Workflow

1. Understand the purpose of the change.
2. Review the diff before examining surrounding code.
3. Choose the specialized reviews that apply. Use [Which reviews to run](#which-reviews-to-run).
4. Read each chosen skill and every reference it names. Apply those checks to the diff.
5. Always include [general-review](../general-review/SKILL.md). It checks correctness, maintainability, and docs.
6. Check user-facing error messages. See [User-facing error messages](#user-facing-error-messages).
7. Merge the findings into one list. Use the severity scale in [references/findings.md](references/findings.md).
8. Drop duplicate comments. When two reviews report the same issue, keep one finding, use the higher severity, and name both sources.
9. Report only issues that are actionable and reasonably well-supported.
10. Distinguish defects from suggestions.
11. Number the consolidated findings from 1, in the priority order in [references/findings.md](references/findings.md). Continue that sequence for optional suggestions. The reader uses these numbers to say which items to address or ignore.

## Which reviews to run

| Skill | Run when |
| --- | --- |
| [general-review](../general-review/SKILL.md) | Every review |
| [frontend-review](../frontend-review/SKILL.md) | The diff touches `src/components/**`, `src/layouts/**`, `src/styling/**`, `public/scripts/**`, or UI pages under `src/pages/**` excluding `src/pages/api/**` |
| [content-review](../content-review/SKILL.md) | The diff touches `src/content/**`, `src/utility/**`, `scripts/**`, or related static assets under `public/` (bulletins, fossils, abstracts, images) |
| [api-review](../api-review/SKILL.md) | The diff touches `src/pages/api/**` or the API contract docs |
| [security-review](../security-review/SKILL.md) | The diff touches raw HTML rendering, user-influenced URLs or paths, API input handling, secrets, third-party embeds, or file serving |
| [testing-review](../testing-review/SKILL.md) | The diff changes behaviour |

A styling-only change runs general-review and frontend-review. A content-copy change with no logic may skip testing-review; say so. Skip security-review when the diff has no security surface. Say which reviews were skipped and why.

Specialized reviews can be invoked on their own, for example `/content-review` or `/security-review`. When this skill invoked them, they contribute findings and this skill writes the single summary.

## User-facing error messages

Any user-facing error message should be descriptive and provide a set of next steps. The message should say what went wrong and what the user can do next. A message that only names the failure, or that gives no next steps, is Medium.

## Output

Follow [references/findings.md](references/findings.md).

End with:

- Reviews run and reviews skipped
- Number of findings by severity, with the finding numbers in each severity
- Whether any findings are blocking, listed by number
- Optional suggestions that are not blockers, listed by number

## Related

- Implementation: [implement-feature](../implement-feature/SKILL.md)
- Plan review: [review-plan](../review-plan/SKILL.md)
- Paths: `.ai/README.md`
