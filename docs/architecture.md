# FundTrack architecture

FundTrack is a modular monolith: one Next.js application, one PostgreSQL database, and feature folders with clear boundaries. It is a financial tracking and budget platform for nonprofit organizations. It is not a certified accounting system or a general ledger.

## Stack in this repository

- Next.js 16.4.6 App Router, React 19, TypeScript strict mode
- Tailwind CSS 4 and shadcn/ui (`base-nova`, Base UI)
- Supabase Auth, PostgreSQL, and Row Level Security
- `@supabase/ssr` for cookie sessions
- Zod for runtime validation
- Vitest for unit tests
- Root-level `app/`, `components/`, `features/`, and `lib/`. There is no `src/` directory.

`next.config.ts` enables `cacheComponents`. A Server Component that reads cookies must sit behind `<Suspense>`. The home page follows that rule. Proxy refreshes the Supabase session cookie and does not authorize business operations.

## Request flow

```text
Browser
  -> proxy.ts (refresh session cookies)
  -> App Router page
  -> Server Action or Route Handler
  -> feature service
  -> domain rules in lib/financial or SQL
  -> Supabase client
  -> PostgreSQL with RLS
```

## Boundaries

| Layer | Responsibility | Location |
| --- | --- | --- |
| UI | Presentation, forms, loading and empty states | `app/`, `components/` |
| Request handling | Auth check, Zod parse, call a service | Server Actions and Route Handlers |
| Application services | Workflows such as post, reverse, import | `features/<domain>/` |
| Domain logic | Status transitions and money rules that are safe to unit test | `lib/financial/`, `lib/validation/` |
| Data access | Queries and RPC calls | Feature data modules using `lib/supabase/` |
| Database | Constraints, RLS, locks, and atomic posting | `supabase/migrations/` |

The browser may hold only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Organization membership, roles, and money totals supplied by the client are not trusted.

## What exists now

- `lib/supabase/client.ts`, `server.ts`, and `proxy.ts` create Supabase clients from the validated public env.
- `app/page.tsx` requires a session and renders the dashboard. `app/login/page.tsx` signs in with email and password.
- `components/dashboard/dashboard-content.tsx` renders labeled demonstration figures. Those figures are not queried from the database.
- `features/` is reserved for later milestones and has no modules yet.

## What is not built yet

Server Actions, organization onboarding, donor and project workflows, budgets, posting, reports, imports, and audit writes. Those land in the milestone that introduces them, as tracked in `docs/development-roadmap.md`.

## Decisions

1. Keep `cacheComponents` and stream authenticated UI behind Suspense, matching the Next.js 16 authentication guide in this install.
2. Put authoritative money math in PostgreSQL. TypeScript may validate and format decimal strings. It does not add currency with binary floating point for stored totals.
3. Add schema in new migrations. `supabase/migrations/202611100001_initial_schema.sql` stays as the first version.
4. Do not add a second backend, Redis, or a `src/` tree.
