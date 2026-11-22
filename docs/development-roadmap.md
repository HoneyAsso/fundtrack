# FundTrack development roadmap

Status reflects the repository as inspected on 2026-11-21 and the Milestone 1 foundation work. A milestone is complete only after its checks have been run and recorded here.

## Checklist

| Milestone | Status | Notes |
| --- | --- | --- |
| 1. Application foundation | Complete | Docs, public env validation, Cache Components session boundary, Vitest. Verified 2026-11-21. |
| 2. Authentication | Not started | Login page exists. Register, verification, logout, reset, and route protection do not. |
| 3. Organization management | Not started | Tables and read policies exist. No onboarding or write policies. |
| 4. Donor management | Not started | `donors` table and read policy exist. No application CRUD. |
| 5. Project management | Not started | |
| 6. Budget management | Not started | |
| 7. Financial transactions | Not started | |
| 8. Dashboard and analytics | Not started | UI is static and labeled Demo Data. |
| 9. Financial reporting | Not started | |
| 10. Excel import | Not started | |
| 11. Production quality | Not started | |
| 12. Deployment and documentation | Not started | No remote, CI, or production checklist yet. |

## Milestone 1 — Application foundation

Scope:

- Confirm the existing Next.js 16 App Router, Tailwind CSS 4, and shadcn/ui setup.
- Validate the two public Supabase environment variables.
- Keep session refresh in `proxy.ts` and read the session on the home page behind `<Suspense>` because `cacheComponents` is enabled.
- Add a Vitest unit test for env parsing, plus `typecheck` and `test` scripts.

Out of scope: authentication flows, schema changes, and replacing dashboard demo data.

### Verification

Recorded after the checks in this milestone finish.

| Check | Result |
| --- | --- |
| ESLint | Passed (`npm run lint`, no findings) |
| TypeScript | Passed (`npm run typecheck`) |
| Unit tests | Passed (`npm test`, 4 tests in `tests/unit/env.test.ts`) |
| Production build | Passed (`npm run build`). `/` is a partial prerender; `/login` is static. |

## Milestone 2 — Authentication

- Email and password registration, email verification, login, logout, and password reset through Supabase Auth.
- Protected dashboard routes with a server-side session check. Proxy remains an optimistic cookie refresh, not the authorization boundary.
- Validation with Zod and tests for the auth input rules.

## Milestone 3 — Organization management

- Atomic organization creation that also inserts the creating user as `ADMIN`.
- Organization profile, membership, and role changes authorized on the server and in RLS.
- Isolation tests so one organization cannot read another.

## Milestone 4 — Donor management

- Create, update, view, search, filter, and archive donors inside the caller's organization.
- Funding history once project funding exists.
- Authorization tests for cross-organization access.

## Milestone 5 — Project management

- Projects with codes, dates, and statuses `PLANNED`, `ACTIVE`, and `CLOSED`.
- Donor funding commitments kept separate from recorded income.
- Project financial summaries calculated on the server.

## Milestone 6 — Budget management

- Budget lines, allocations, controlled adjustments, and utilization.
- Database-enforced overspending protection, including concurrent posts.
- Zero-budget and boundary cases.

## Milestone 7 — Financial transactions

- Income and expense drafts, posting, and reversal.
- Statuses `DRAFT`, `POSTED`, and `REVERSED`.
- Posted rows are not edited or deleted. Reversals append history.
- Amounts use PostgreSQL `NUMERIC`. Drafts stay out of reports.

## Milestone 8 — Dashboard and analytics

- Replace the demo figures with queries over posted data.
- Summary cards, utilization, trends, recent transactions, filters, and loading and error states.
- Keep the Demo Data badge until those queries exist.

## Milestone 9 — Financial reporting

- Project, donor, budget-versus-actual, and income/expense reports.
- Date filters, pagination, and CSV export from persisted rows.

## Milestone 10 — Excel import

- XLSX upload, mapping, preview, validation, duplicate detection, idempotent apply, and row-level errors.
- Import jobs and audit records. Invalid rows are never inserted silently.

## Milestone 11 — Production quality

- Broader unit, integration, RLS, and concurrency tests.
- Playwright coverage for the main financial path.
- Accessibility, error monitoring, security review, and GitHub Actions.

## Milestone 12 — Deployment and documentation

- Production build, Vercel configuration, Supabase production settings, env documentation, seed data, and the acceptance README.
- No deploy or push without explicit approval.

## Next incomplete milestone

Authentication. Login with email and password exists. Registration, email verification, logout, password reset, and route-group protection do not.
