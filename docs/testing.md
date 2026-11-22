# FundTrack testing

A feature is not treated as done because its page renders. Checks are recorded in `docs/development-roadmap.md` only after they have been executed.

## Layers

| Layer | Tool | Covers | When |
| --- | --- | --- | --- |
| Unit | Vitest | Env parsing, later money formatting, status transitions, Zod schemas | Milestone 1 onward |
| Static | `npm run lint`, `npm run typecheck` | ESLint and `tsc --noEmit` | Every milestone |
| Build | `npm run build` | Production compile, including Cache Components constraints | Foundation and release milestones |
| Integration | Database tests against a disposable Supabase or Postgres | Constraints, RLS isolation, posting, reversal, concurrent spend, imports | From organizations and transactions onward |
| End to end | Playwright | Login, onboarding, donor, project, budget, post, and report paths | After those flows exist |

Playwright and database integration tests are not part of Milestone 1. There is no shared test database configured in this repository.

## Commands

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

## Milestone 1 unit coverage

`tests/unit/env.test.ts` checks that:

- A valid public URL and publishable key parse.
- A missing or malformed Supabase URL fails with an error that names the variable.
- A source object that also contains a service-role key still produces an object with only the two public fields.

## Later financial tests

Unit tests will cover decimal string handling and status transitions without `number` arithmetic for stored totals.

Database tests will cover:

- A user in organization A cannot read organization B.
- A draft expense does not change posted totals.
- Posting the same transaction twice fails.
- Two concurrent expenses cannot both pass an overspend check.
- A reversal preserves the original row.
- An import retry does not duplicate a committed row.

## What not to claim

Do not mark a milestone verified if a command was skipped. Do not describe demonstration dashboard numbers as database results.
