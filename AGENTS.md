<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

# FundTrack — Project Instructions

## Project Overview
FundTrack is a full-stack financial management
application for nonprofit organizations and NGOs.

This is an original software engineering project
developed from scratch.

## Technology Stack
- Next.js App Router
- React and TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase Auth
- Supabase PostgreSQL
- Supabase Row Level Security
- Next.js Server Actions and Route Handlers

## Project Structure
- app/ — Pages, layouts and routes
- components/ — Shared UI components
- features/ — Business feature modules
- lib/ — Utilities and Supabase clients
- supabase/migrations/ — Database migrations
- types/ — Shared TypeScript types

Do not create or move code into src/.
Keep the existing root-level structure.

## Financial Requirements
- Default currency: USD
- Never use floating-point arithmetic for money.
- Use PostgreSQL NUMERIC for stored monetary values.
- Enforce organization-level data isolation.
- Validate all financial operations server-side.
- Maintain audit trails for financial changes.
- Posted transactions must not be directly edited.
- Use database transactions for atomic financial operations.

## Development Rules
1. Inspect existing files before editing.
2. Do not recreate existing project configuration.
3. Implement features incrementally.
4. Explain significant architectural changes.
5. Use TypeScript strict typing.
6. Use reusable React components.
7. Never expose Supabase secret keys.
8. Keep .env.local out of Git.
9. Write tests for important business logic.
10. Run lint, TypeScript checks and relevant tests.
11. Do not claim tests passed unless they were executed.
12. Ask before deleting files or changing database schemas.
13. Preserve existing working functionality.

## Current Development Stage
The Next.js application and dashboard have been
started. Supabase SSR authentication setup is
in progress.

Next task:
Complete lib/supabase/proxy.ts and the root
proxy.ts session-refresh integration.

<!-- END:nextjs-agent-rules -->