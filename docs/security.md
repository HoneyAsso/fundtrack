# FundTrack security

Defense in depth: a server-side session check, an authorization check in the action, input validation, and RLS. Hiding a button is not an access control.

## Identity

Supabase Auth stores passwords. FundTrack does not add a password column.

The browser and server clients receive only:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

`lib/env.ts` parses those two values and returns only them. A service-role key is not read there and must not be prefixed with `NEXT_PUBLIC_`. `.env.local` is gitignored. `.env.example` lists names and contains no secrets.

Cookie sessions use `@supabase/ssr`. `proxy.ts` calls `getClaims()` so refreshed auth cookies are written on the response. Server Components may fail to set cookies; that refresh belongs to Proxy. Proxy is an optimistic check. Each protected page and each mutation still checks the session.

With `cacheComponents` enabled, the home page reads the session inside a child component rendered under `<Suspense>`.

## Authorization

Current RLS lets an authenticated user read their own membership and the organizations and donors tied to it. There are no write policies, so the Data API cannot insert or update those tables.

Later mutations must:

- Resolve the user from the server session, not from a form field.
- Load the caller's role from `organization_members`.
- Allow `ADMIN` to manage membership and organization profile.
- Allow `ADMIN` and `FINANCE` to change financial records.
- Allow `VIEWER` to read.
- Reject a role change that would leave an organization without an administrator, once that rule is implemented.
- Use a narrowly granted `SECURITY DEFINER` function only when a single statement cannot enforce the invariant. The function must pin `search_path` and check `auth.uid()`.

## Input and files

Zod validates action input. Database constraints remain the backstop. Future uploads must check extension, content type, and size before storage. Errors returned to the browser should not include SQL, keys, or another organization's identifiers.

## Logging

Audit metadata may include ids, status, and amount strings. It must not include passwords, access tokens, refresh tokens, or service-role keys.

## Operations

Do not commit `.env.local`. Do not deploy or push without approval. Do not run a destructive migration against a shared database without an explicit request. The hosted project's migration history is not verified by this repository.
