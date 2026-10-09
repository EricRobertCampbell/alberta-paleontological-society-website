# Review findings

Every code-review skill uses this severity scale and output format. Do not invent another scale.

## Severity

- **Critical** — exploitable security hole, data loss, or data corruption
- **High** — incorrect behaviour, a security weakness, a significant performance problem, or one of the established High mappings below
- **Medium** — a missing regression test, or a maintainability problem that will cause a defect
- **Low** — a minor improvement

Critical and High findings are blocking. These glosses apply the existing scale; they do not add a new one.

Use severity to communicate actual importance. A stylistic preference stays a suggestion. Do not raise it to High or Critical to make it look mandatory.

Prioritize findings in this order:

1. Bugs that will cause incorrect behaviour
2. Security issues
3. Data loss or corruption
4. Significant performance problems
5. Missing or inadequate tests
6. Maintainability concerns
7. Minor style improvements

Established mappings:

- A diff that contradicts `README.md`, `src/pages/api/README.md`, a matching architecture doc in `readme/architecture/`, or an Accepted ADR in `readme/adr/` is **High**.
- An intentional behaviour change that leaves those docs stale is **Medium**.
- A new test that is not adjacent to the module under change (when a colocated location is practical) is **Low**.
- A missing test is **Medium**, and only when it can hide a regression. Do not require a test for a trivial change that cannot hide one (for example pure content copy with no logic).
- A content-collection schema or frontmatter change that breaks existing content without updating it is **High**.
- A new public API route that omits input validation or returns an unclear error for bad input is **Medium**.
- A date/timezone change that ignores UTC-in-dev / America/Edmonton-in-prod handling is **High** when it can show wrong event times or filters.
- A user-facing error message that is not descriptive, or that does not provide a set of next steps, is **Medium**.

Do not report something merely because you would have implemented it differently.

## Output format

Number every finding the reader sees, starting at 1, with no gaps or reused numbers. The reader uses these numbers to say which findings to address or ignore.

When `/code-review` is the caller, return findings in this format without numbers and do not write a second full summary. The orchestrating skill consolidates them and assigns the numbers. When a specialized review is invoked on its own, number its findings itself.

For each finding, provide:

### 1. Short title

- **Severity:** Critical / High / Medium / Low
- **Location:** File and line(s)
- **Problem:** What is wrong
- **Impact:** Why it matters
- **Recommendation:** How to fix it

Replace `1` with that finding's number and `Short title` with a one-line summary. Number optional suggestions that are not blockers in the same sequence, after the findings, so a number always refers to one item.

When a specialized review is invoked on its own, end with:

- Number of findings by severity, with the finding numbers in each severity
- Whether any findings are blocking, listed by number
- Optional suggestions that are not blockers, listed by number
