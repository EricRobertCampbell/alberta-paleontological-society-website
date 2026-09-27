# Publication download tracking

Living status for the publication-download feature. Update this file at the end of each session.

Last updated: 2026-09-26.

## Status

Database-specific code is **not** implemented. Waiting on a human decision to use Neon (recommended below).

Done:

- Repository and Netlify/Astro deployment model reviewed.
- Supabase, Neon, and Netlify Database compared (pricing and limits checked 2026-09-26).
- Neon recommended. Supabase and Netlify Database are documented as the alternatives that were set aside.
- Minimal schema defined here. Migrations are not written yet.
- `/site-analytics` lists the single test publication. Download counts are not live.

Next human action: confirm Neon (or choose Supabase), create the project, and supply a connection string. Do not commit credentials.

Next agent action, after that confirmation: schema/migrations, a small data-access layer, and the tracked `/publications/:filename` redirect. Do not build membership, authentication, or an admin dashboard in that pass.

## Recommendation

Use **Neon** (serverless Postgres) for v1.

A low-traffic APS site will sit idle for hours or days. Neon suspends compute after 5 minutes and wakes it on the next query, in a few hundred milliseconds, without anyone logging into a dashboard. Supabase’s free plan does the opposite: after about a week without enough database activity it **pauses the project**, and a paused project does not wake up when the site queries it. Someone has to restore it from the Supabase dashboard. Until they do, download events are silently dropped (the PDF must still be served). That is a poor fit for a volunteer-run site.

Neon also avoids any change to the site’s legacy Netlify Free plan. Netlify Database is only on Netlify’s newer credit-based plans, and switching off a legacy plan is irreversible.

Postgres itself stays ordinary. If a later membership system is a better fit for Supabase Auth and Row Level Security, the `publications` and `publication_downloads` tables can move. This feature should keep working even if authentication is built some other way.

### Supabase vs Neon

Both are hosted Postgres. Figures below are from each vendor’s docs and pricing pages on 2026-09-26. Either can run the download tracker. The difference is what happens when the site is quiet, and how much of a future member system comes in the box.

| | Neon Free | Supabase Free |
| --- | --- | --- |
| Monthly price | $0, no card | $0 |
| What you get | Postgres, branching, pooling, a SQL/HTTP data API | Postgres plus Auth, Storage, Realtime, Edge Functions, auto APIs, and a table/auth dashboard |
| Storage | 0.5 GB per project | 500 MB database, plus 1 GB file storage |
| Idle behavior | Compute suspends after 5 minutes and wakes on the next query | Project stays on, then pauses after about 7 days without enough activity. Restore is manual |
| Cold start | A few hundred milliseconds after idle | None while the project is active. A paused project does not wake on a query |
| Projects | 100 | 2 active (paused projects do not count) |
| Branches | 10 per project, data included | Not on Free. Branching is a paid feature |
| Backups | 6-hour instant restore (capped at 1 GB of changes), 1 manual snapshot | No automatic backups. Export with `db dump` yourself |
| Egress | 5 GB public transfer per project per month | 5 GB |
| Auth included | Managed Better Auth, up to 60,000 monthly active users. AWS regions only | Auth up to 50,000 monthly active users, with Row Level Security as the normal access model |
| Region near Alberta | No Canadian region on the published AWS list. Closest listed options are US East (Ohio) or US West (Oregon) | Canada (Central), `ca-central-1` (Montreal) |
| Paid step up | Launch is pay-for-what-you-use, no monthly minimum. Scale-to-zero can be turned off | Pro is a subscription (about $25/month). Paid projects are not paused for inactivity, and daily backups start here |

#### Neon pros

- Idle time is the normal case for this site. Compute sleeps after 5 minutes and the next download request wakes it. Nobody has to open a dashboard.
- That wake is short enough to sit inside the tracked redirect. If the wake fails or runs long, the route still redirects and the visitor gets the PDF.
- 100 CU-hours per project per month is a large budget for a counter. Each event is one small insert. Ordinary publication traffic will not approach the cap.
- A free project can have a separate dev branch (up to 10) without a second bill. Useful for trying a migration before it touches production counts.
- The free tier has a short restore window (6 hours) and one manual snapshot. Supabase Free has no automatic backups.
- Connection pooling is built in, which fits Netlify’s one-request-at-a-time functions.
- The client can be ordinary Postgres (`DATABASE_URL`, pooled). The download feature then does not depend on a vendor SDK, so a later move to Supabase is a data migration.
- Managed Better Auth exists if accounts are added later: users live in the same database, it works with Row Level Security, and the free allowance is 60,000 monthly active users. It is optional. v1 does not turn it on.
- Launch, the paid plan, has no monthly minimum. Scale-to-zero can stay on, so a quiet month can stay near $0.

#### Neon cons

- There is no Canadian region on Neon’s published AWS region list. Membership records (names, emails, payments) would sit in the United States or another listed country unless that changes. Download timestamps of public PDFs are less sensitive. Member data is the reason this matters.
- Scale-to-zero cannot be disabled on Free. The first request after a quiet stretch waits through the wake. `/site-analytics` would feel that. The PDF redirect is allowed to give up and redirect anyway.
- If the project exceeds 100 CU-hours, 0.5 GB stored, or 5 GB of transfer in a month, Neon suspends compute until the next billing period. Data remains. For this workload the storage and compute caps are loose. The egress cap matters only if something starts streaming large query results.
- The free restore window is 6 hours. A bad migration discovered the next day is not covered by instant restore. Keep SQL migrations in git, and take the one manual snapshot before risky changes.
- Managed Better Auth is newer than Supabase Auth, limited to AWS regions, and the documented app SDKs are Next.js and React. An Astro integration would be new work. Self-hosted Better Auth, or another library, is possible because the users would still be rows in Postgres.
- Neon does not include object storage, realtime subscriptions, or edge functions. PDFs stay in `public/` on Netlify either way. Private member files, live updates, and scheduled jobs would be separate choices later.
- The console is a database console. It is a weaker day-to-day admin tool for a volunteer who wants to look up a member, reset a login, or edit a row without SQL.

#### Supabase pros

- It is an application platform, not only a database. Auth, Row Level Security, file storage, realtime, edge functions, and generated APIs are already there. Member accounts, roles, and an admin looking at tables are the features this lines up with.
- Auth is the mature product: email and password, magic links, OAuth, and row-level policies tied to the logged-in user. That is the usual shape for “members see their registration, editors see everything.”
- Canada (Central) is a selectable region. Future membership and payment records can stay in Canada. Neon cannot offer that on the current region list.
- While the project is running, there is no cold start. A page that reads download counts is fast every time.
- The dashboard is built for non-database specialists: table editor, SQL editor, auth user list, storage browser. A small APS admin group can inspect data without a custom admin site on day one.
- Free limits that matter for a society are comfortable: 500 MB database, 1 GB file storage, 5 GB egress, 50,000 monthly active users, unlimited API requests, two active projects.
- Pro (about $25/month) removes inactivity pausing and adds daily backups (7 days). Point-in-time recovery is a further add-on, about $100/month. If APS later decides member accounts are worth a small subscription, Supabase is the cleaner platform to move to.
- Storage is available if a later feature needs private files (registration forms, member-only PDFs) rather than public files in git.

#### Supabase cons

- A free project with too little database activity for about 7 days is paused. Supabase emails a warning about a week ahead, then a confirmation. Restoring is a manual step in the dashboard, and it can take minutes. Until someone does that, every query fails. Download tracking would stop recording. The PDF route must still succeed, so the public site keeps working and the gap shows up only in the counts.
- “A few database requests each day over the previous week” is the published rule of thumb for staying active. A quiet week of publications can fall short. A volunteer board can miss the warning email.
- A paused project can be restored for up to 1 year. After that, the project may not come back. Paused projects do not count toward the two-project limit, which makes it easy to leave one paused and forget it.
- Free has no automatic backups. The documented advice is to dump the database yourself. Losing the project, or a bad edit, can mean losing the download history.
- Pro is the plan that never pauses and that includes daily backups. That is a standing subscription, which this project has been trying to avoid for a download counter (the same reason Netlify Analytics at $9/month was set aside).
- The comfortable path for member features is the Supabase client in the browser, with the anon key and Row Level Security. That is powerful and easy to get wrong: a table without a policy is exposed, and the service-role key must never reach the browser. v1 should not use that path. A server-side query layer avoids it, and then Supabase’s main advantage sits unused until accounts exist.
- Two active projects is a tight cap if APS wants production and a long-lived staging project both awake.
- Hosted branching is not on the free plan. That is a convenience for preview databases, not the way features get tested. See below.
- Direct-to-browser APIs and Auth are Supabase-shaped. Using them deeply makes a later move to plain Postgres more work than a `pg_dump`.

#### Branching, and testing without it

A database branch is a second database you can throw away. It is not a Git branch. The website code is already branched in GitHub. Branching here means an isolated copy of Postgres so a migration or experiment cannot change production counts, members, or registrations.

**Neon.** A branch is a copy-on-write snapshot of the parent database. It is created in seconds, includes the parent’s schema and data, has its own connection string, and sleeps on its own. Changed pages are what consume extra storage. Free includes 10 branches per project. This is useful when you want to try a migration against a copy of real download history, then delete the branch.

**Supabase.** Hosted branching is a Pro feature, about $0.01344 per branch-hour, because each preview branch runs its own compute. A branch is a separate environment (database, auth, storage), and it does **not** copy production data unless you opt in with a seed file or “Include data.” Supabase’s documented everyday workflow does not use it: develop locally with the Supabase CLI, push to GitHub, and deploy `main` to the project. That workflow is on every plan, including Free.

Testing a new feature without hosted branching is ordinary local development:

1. Run Postgres on the machine doing the work. For plain SQL, that is Docker or a local Postgres install. If the feature uses Supabase Auth or Storage, `supabase start` runs that stack locally.
2. Apply the migration files from the repository.
3. Point local `DATABASE_URL` at that database. Production credentials stay in Netlify.
4. Exercise the route locally, including a direct request to `/publications/test-book.pdf` and a case where the database is unreachable.
5. When the change is ready, apply the same migration to the hosted database.

A second free Supabase project can act as a long-lived staging database. Free allows two active projects, so staging plus production uses the whole allowance. Neon can do the same with a branch, and still keep production as the parent.

Copying production data down, when a test needs real rows, is a `pg_dump` and restore. This schema is two small tables. That dump is seconds of work. It becomes worth automating only when membership data is large or sensitive enough that a fresh copy should be a one-click branch instead of a dump.

For v1, missing free branching does not make the feature hard to test. The tracked redirect, the fail-open path, and the count query can all be proven against a local database. Hosted branches matter later, if several people need isolated copies of production at the same time, or if each pull request should receive its own database automatically.

#### What is the same for this feature

- The PDF stays a static Netlify file. Neither database stores the file in v1.
- The tracker stores two tables and no visitor identifiers.
- A failed database write must not block the redirect. That requirement exists for both, because both free tiers can be asleep, paused, or over a limit.
- Netlify functions should use a pooled connection, not a new direct session per download.
- Membership email, payment webhooks, and role checks are future work on top of either database. Neither provider sends APS event mail or takes payment by itself.
- v1 should talk to Postgres through a small data-access module. That keeps the download feature usable even if accounts are later built with Supabase, Neon Auth, or something else.

#### When to pick which

Pick **Neon** if the priority is a free database that records downloads through quiet months without someone watching a dashboard. That is the current recommendation.

Pick **Supabase** if the priority is Canadian data residency, or if member accounts and an admin dashboard are close enough that the platform is worth the pause risk (or worth Pro). The download tables can still be created there. The fail-open redirect is mandatory on that plan, because a pause will happen if the site goes quiet.

**Netlify Database** is Neon billed by Netlify. It is only on credit-based plans. This site is on a legacy Free plan, and leaving that plan cannot be undone. Database compute and bandwidth would also spend the plan’s credits. It is not a candidate for this feature.

### Sources checked 2026-09-26

- [Supabase: project pausing](https://supabase.com/docs/guides/platform/free-project-pausing)
- [Supabase pricing](https://supabase.com/pricing)
- [Supabase backups](https://supabase.com/docs/guides/platform/backups)
- [Supabase regions](https://supabase.com/docs/guides/platform/regions)
- [Supabase deployment and branching](https://supabase.com/docs/guides/deployment/branching)
- [Neon plans](https://neon.com/docs/introduction/plans)
- [Neon scale to zero](https://neon.com/docs/introduction/scale-to-zero)
- [Neon regions](https://neon.com/docs/introduction/regions)
- [Neon Managed Better Auth](https://neon.com/docs/auth/overview)
- [Netlify Database announcement](https://www.netlify.com/blog/netlify-database/)
- [Netlify Database billing](https://docs.netlify.com/build/data-and-storage/netlify-database/billing-and-usage/)

## How the site is deployed today

- Astro 5, `output: 'server'`, `@astrojs/netlify` (`astro.config.mjs`). Pages and endpoints are server-rendered functions.
- Production timezone is `America/Edmonton` (`netlify.toml`). `npm run dev` forces UTC.
- Files in `public/` are static CDN assets. Example: `public/files/publications/test-book.pdf` is served at `/files/publications/test-book.pdf` and does not run Astro code.
- There is no database client, migration tool, or `.env` example yet. `.env` is gitignored.

`/publications/test-book.pdf` can be an Astro route while `/files/publications/test-book.pdf` stays static, as long as the PDF is **not** also placed under `public/publications/`. A file at `public/publications/test-book.pdf` could be served by the CDN and skip the tracker.

The redirect must be **302**, with `Cache-Control: no-store`. A cached 301 would send later visits straight to the file and skip the tracker. The redirect target must be the `/files/publications/...` path so it cannot call the tracking route again.

Tracking writes must be wrapped so a sleeping, missing, or failing database still returns the redirect. Log the failure on the server. Do not store IP addresses, user ids, or other visitor identifiers.

## Data model

Events, not a single counter.

```text
publications
  id
  slug            -- test-book
  title
  file_path       -- /files/publications/test-book.pdf
  published_at

publication_downloads
  id
  publication_id
  downloaded_at   -- timestamptz
```

Counts:

```sql
SELECT COUNT(*)
FROM publication_downloads
WHERE publication_id = ...;
```

Month and trend queries can group on `downloaded_at` later. No visitor columns.

The interim in-repo catalog is `src/data/publications.ts`. It currently holds Test Book so `/site-analytics` has something to show. Once the database exists, that table is the source of truth and this page should read counts from it. The file can remain the seed list for known publications.

## Test publication

| Field | Value |
| --- | --- |
| Title | Test Book |
| Slug | `test-book` |
| Tracked URL | `/publications/test-book.pdf` |
| Static file | `public/files/publications/test-book.pdf` (not added yet) |
| Public file URL | `/files/publications/test-book.pdf` |
| Analytics page | `/site-analytics` |

`/site-analytics` is a normal page and is not in the main navigation. It describes Test Book and states that download counts are not recorded yet. It does not link a PDF that is not in the repository.

## Planned environment variables

After a Neon project exists:

| Name | Where | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Local `.env` (gitignored) and Netlify site environment variables | Pooled Postgres connection string from Neon. Never commit it. |

No other secrets are required for v1. Production values belong in the Netlify UI, not in git.

## How a new publication will be added

Not implemented yet. Intended steps, once the route exists:

1. Add `public/files/publications/<slug>.pdf`.
2. Insert a `publications` row (`slug`, `title`, `file_path`, `published_at`).
3. Share `https://albertapaleo.org/publications/<slug>.pdf`.

Do not put the PDF in `public/publications/`.

## Agent checklist

- [x] Inspect the repository and Astro/Netlify configuration.
- [x] Confirm how static assets and Astro server endpoints are deployed.
- [x] Confirm `/publications/:filename` can be a server route while `/files/publications/:filename` stays static.
- [x] Compare Supabase and Neon free-tier inactivity, limits, and fit for a low-traffic nonprofit.
- [x] Consider how authentication could be added later under each option.
- [x] Recommend Neon, and wait for a human decision before database-specific code.
- [x] Define the minimal `publications` and `publication_downloads` schema.
- [ ] Add migrations appropriate to the chosen database.
- [ ] Add a small data-access layer. Keep vendor calls out of the route.
- [ ] Implement `GET /publications/:filename` as record-then-302.
- [ ] Failed tracking must never block the redirect.
- [ ] Redirect target must not re-enter the tracking route.
- [ ] Log failed tracking writes on the server.
- [ ] Do not collect visitor-identifying fields.
- [ ] Add a real test PDF for the end-to-end flow.
- [ ] Test a direct request to the tracked URL, not only a click from an APS page.
- [ ] Document adding a publication in the developer docs once the flow exists.
- [ ] Document local environment variables in the developer docs once the client exists.
- [ ] Document the Netlify environment variables in the developer docs once the client exists.
- [ ] Update the README when the feature is real.
- [x] Keep the work limited to download tracking. No membership or authentication system.

## Human checklist

### Database choice

- [ ] Review the Neon recommendation in this file.
- [ ] Choose Neon or Supabase.
- [ ] Create the project. Neon has no Canadian region on its published list; US East (Ohio) or US West (Oregon) are the closest. Supabase can be created in Canada (Central) if that option is chosen instead.
- [ ] Put the pooled connection string in local `.env` as `DATABASE_URL`, and in the Netlify site environment. Do not commit it.

### Netlify

- [ ] Add `DATABASE_URL` to the APS Netlify project.
- [ ] Confirm it is set for production (and any other deploy contexts that should record downloads).
- [ ] Deploy after the route exists, and review the deploy.

### Publication

- [ ] Supply the real PDF (or approve a tiny placeholder PDF for `test-book`).
- [ ] Confirm public filename/slug, title, and publication date.

### Verification

- [ ] Open the tracked URL and confirm the PDF is served.
- [ ] Confirm a `publication_downloads` row.
- [ ] Request it again and confirm the count increases.
- [ ] Use a direct URL, not only an on-site link.
- [ ] Confirm a database failure still serves the PDF.

## Definition of done for v1

`https://albertapaleo.org/publications/test-book.pdf` records a download event when the database is available, and still 302-redirects to `/files/publications/test-book.pdf` when it is not. Someone with database access can count rows in `publication_downloads`. No analytics dashboard beyond the current `/site-analytics` publication listing.

## Session log

### 2026-09-26

Reviewed Astro SSR on Netlify, static `public/` files, and current Supabase, Neon, and Netlify Database limits. Recommended Neon and recorded the schema and checklists in this file. Added `/site-analytics` for Test Book, with download counts still unavailable.

Expanded the Supabase vs Neon notes into a pros/cons comparison, including free-tier limits, backups, auth, and regions. Supabase offers Canada (Central). Neon’s published region list does not include Canada.

Noted that hosted Supabase branching is a paid preview-environment feature, and that local Postgres (or the Supabase CLI) is enough to test this feature without it.
