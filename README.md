# FundTrack

FundTrack is a financial management application for nonprofit organizations. It tracks donors, projects, budgets, and transactions in USD by default. It is not a certified accounting or compliance product.

The application is a Next.js App Router project with Supabase Auth and PostgreSQL. Milestone status lives in [docs/development-roadmap.md](docs/development-roadmap.md).

## Local setup

```bash
npm install
cp .env.example .env.local
```

Set these values in `.env.local` from the Supabase project settings:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Do not put a service-role key in `.env.local`. That file is gitignored.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). An anonymous visit is redirected to `/login`. The dashboard still shows labeled demonstration figures.

## Checks

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

## Documentation

- [Architecture](docs/architecture.md)
- [Database design](docs/database-design.md)
- [Financial rules](docs/financial-rules.md)
- [Security](docs/security.md)
- [Testing](docs/testing.md)
- [Roadmap](docs/development-roadmap.md)

Deployment, seed data, and the full acceptance guide are Milestone 12. Do not deploy from this repository until that work is approved.
