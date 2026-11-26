# Verification: 295-update-astro

## Commands

| Command                                           | Result                                                         | When (UTC) |
| ------------------------------------------------- | -------------------------------------------------------------- | ---------- |
| `npx vitest run src/utility/contentEntry.test.ts` | pass (3)                                                       | 2026-11-26 |
| `npm run test -- --run`                           | pass (96)                                                      | 2026-11-26 |
| `npm run build`                                   | pass after HTML fixes for Rust compiler                        | 2026-11-26 |
| `astro preview`                                   | unsupported by `@astrojs/netlify` 8 — used `astro dev` instead | 2026-11-26 |

## Spot checks (`astro dev` on 127.0.0.1:4321)

| Check                                                       | Result                                                                                    |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `GET /`                                                     | 200; brand title present                                                                  |
| `GET /events/`                                              | 200; event titles present (98 `event-title` matches)                                      |
| `GET /events/calendar`                                      | 200                                                                                       |
| `GET /events/stable/2026-12-06-microfossilsorting`          | 200; title and body content present                                                       |
| `GET /api/events?start_date=2026-10-01&end_date=2026-11-30` | 200; 41 items; underlying `id` basename-style; deadline `stablePath` `/events/stable/...` |
| `GET /api/fossil-friday` without params                     | 400 missing year/month/day (unchanged contract)                                           |
| `GET /api/fossil-sorting-images`                            | 200                                                                                       |

## Versions locked

- `astro` 7.4.13
- `@astrojs/netlify` 8.2.14
- `prettier` 3.10.1 / `prettier-plugin-astro` 1.1.2
- Node pin `22.23.4` in `netlify.toml` and CI

## Notes

- Local `astro dev` logged a Netlify Edge Functions local-server connection error (`--allow-scripts`); pages and APIs still responded 200. Production build completed successfully with the Netlify adapter.
- `astro preview` is not supported by this adapter version.
