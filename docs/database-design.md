# FundTrack database design

PostgreSQL is the source of truth. The application uses UUID primary keys, foreign keys, check constraints, UTC `timestamptz`, and RLS on every exposed organization-scoped table. Monetary columns will use `NUMERIC`. The default currency is `USD`.

This document describes the migration that exists and the shape later migrations must follow. Tables listed as planned are not in the database yet.

## Applied design: initial migration

File: `supabase/migrations/202611100001_initial_schema.sql`.

Whether this file has been applied to the hosted Supabase project is not recorded in the repository.

### organizations

| Column | Type | Notes |
| --- | --- | --- |
| id | UUID | Primary key, `gen_random_uuid()` |
| name | VARCHAR(200) | Required |
| base_currency | CHAR(3) | Default `USD` |
| created_at | TIMESTAMPTZ | Default `now()` |

### organization_members

Composite primary key `(organization_id, user_id)`.

| Column | Type | Notes |
| --- | --- | --- |
| organization_id | UUID | References `organizations` |
| user_id | UUID | References `auth.users` |
| role | VARCHAR(20) | `ADMIN`, `FINANCE`, or `VIEWER`. Default `VIEWER` |
| created_at | TIMESTAMPTZ | Default `now()` |

### donors

| Column | Type | Notes |
| --- | --- | --- |
| id | UUID | Primary key |
| organization_id | UUID | Required, indexed |
| name | VARCHAR(200) | Unique with `organization_id` |
| email | VARCHAR(255) | Optional |
| phone | VARCHAR(50) | Optional |
| description | TEXT | Optional |
| active | BOOLEAN | Default true |
| created_at | TIMESTAMPTZ | Default `now()` |

## Row Level Security today

RLS is enabled on all three tables. Policies are `SELECT` only, granted to `authenticated`:

- A user can read membership rows where `user_id` is `auth.uid()`.
- A user can read an organization or donor when a membership row links that organization to `auth.uid()`.

The membership policy does not query `organizations` or `donors`, so it does not recurse. With no insert, update, or delete policies, the Data API denies writes. That is safe and also means organization onboarding cannot succeed until Milestone 3 adds an explicit, checked write path.

Foreign keys do not declare `ON DELETE`. There is no `updated_at`. The donor name uniqueness rule may be tightened or relaxed when donor archiving is designed.

## Planned tables

Later migrations add these only when the matching milestone starts:

- `projects` and `project_funding`
- `budget_lines` and `budget_adjustments`
- `financial_transactions` and `transaction_reversals`
- `audit_logs`
- `import_jobs` and `import_errors`

Planned checks:

- Project status: `PLANNED`, `ACTIVE`, `CLOSED`
- Transaction status: `DRAFT`, `POSTED`, `REVERSED`
- Currency code stored on each money row and checked against the organization or the related project
- Posted transactions excluded from silent update and delete

## Planned privileged functions

Organization creation and transaction posting need atomic database functions.

- `create_organization` inserts the organization and the caller's `ADMIN` membership in one transaction. It is `SECURITY DEFINER`, sets `search_path` to `pg_catalog, public`, requires `auth.uid()`, and is executable by `authenticated` only.
- Expense posting locks the budget line, rejects spending above the authorized amount, and writes the transaction and audit row together.
- Reversal inserts a linked reversing row and sets the original status to `REVERSED`. It does not delete the original.

These functions are not in the initial migration. Membership checks used by RLS stay in normal policies and do not use recursive security-definer helpers.

## Reporting rule

Report queries sum posted rows only. Drafts and reversed originals are excluded or paired with their reversals so a report can be reproduced from the same persisted data.
