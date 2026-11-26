# Comment triage: 295-update-astro

Source: `/code-review` on Astro 7 upgrade (2026-11-26).

| ID | Summary | Severity | Likelihood | Effort | Disposition |
| --- | --- | --- | --- | --- | --- |
| 1 | README intro still says Astro 5 | S3 | L1 | E1 | **address** |
| 2 | README Prerequisites still say Node v18+ | S3 | L1 | E1 | **address** |
| 3 | `registrationDeadline` still requires synthetic `slug` | S4 | L2 | E2 | **defer** |
| 4 | Agent skill paths still name `src/content/config.ts` | S4 | L2 | E1 | **defer** |

## Notes

- Optional suggestion to set `session: false` deferred/ignored (not a defect; Netlify deploy preview already works).
- Finding 3 is a maintainability hardening for a later PR.
- Finding 4 is docs/skills hygiene outside the upgrade’s visitor-facing scope.
