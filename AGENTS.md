<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

# FundTrack — AI Engineering Agent Instructions

## 1. Project Identity

**Project name:** FundTrack  
**Application type:** Full-stack financial management platform  
**Primary users:** Nonprofit organizations, NGOs, finance officers, project managers, and administrators  
**Default currency:** USD  
**Development environment:** Cursor AI on macOS  
**Repository:** Existing local `fundtrack` project

FundTrack is an original software engineering project built from scratch. It helps organizations manage donors, projects, budgets, financial transactions, reporting, and audit histories.

The application must be developed as a substantial, maintainable software engineering project with genuine domain logic, a secure backend, automated tests, and deployment documentation.

Do not clone or adapt an existing financial management application. Standard framework packages and open-source component libraries may be used according to their licenses.

## 2. Technology Stack

Use the following stack unless there is a documented technical reason to change it:

- Next.js with App Router
- React
- TypeScript with strict type checking
- Tailwind CSS
- shadcn/ui
- Lucide React
- Supabase Auth
- Supabase PostgreSQL
- Supabase Row Level Security (RLS)
- Supabase Storage for file uploads
- `@supabase/ssr` for session management
- Next.js Server Actions and Route Handlers
- Zod for runtime validation
- React Hook Form for forms
- Recharts for financial visualizations
- Vitest for unit testing
- Playwright for end-to-end testing
- Git and GitHub for version control
- GitHub Actions for continuous integration
- Vercel for application deployment

Use the installed Next.js version's supported conventions. Verify package versions and relevant official documentation before implementing version-sensitive features.

Do not introduce a separate Spring Boot backend, MongoDB, Redis, or microservices unless explicitly requested.

## 3. Existing Project Structure

The Next.js application uses root-level directories. It does NOT use `src/`.

Preserve the existing project and organize new code as follows:

```text
fundtrack/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   ├── donors/
│   │   ├── projects/
│   │   ├── budgets/
│   │   ├── transactions/
│   │   ├── reports/
│   │   ├── imports/
│   │   └── settings/
│   ├── api/
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   ├── layout/
│   ├── dashboard/
│   └── shared/
├── features/
│   ├── auth/
│   ├── organizations/
│   ├── donors/
│   ├── projects/
│   ├── budgets/
│   ├── transactions/
│   ├── reporting/
│   ├── imports/
│   └── audit/
├── lib/
│   ├── supabase/
│   ├── validation/
│   ├── financial/
│   └── utils.ts
├── supabase/
│   ├── migrations/
│   └── seed.sql
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/
├── public/
├── AGENTS.md
└── package.json
```

This is a target structure, not a requirement to create unused empty files immediately.

Preserve existing working files and imports. Do not create duplicate `app/`, `components/`, `lib/`, or Supabase client structures.

## 4. Architecture Principles

Use a modular monolith with clear feature boundaries.

Follow this separation:

- UI components: Presentation and user interactions.
- Server Actions / Route Handlers: Request handling and authorization.
- Application services: Business workflows and transaction orchestration.
- Domain logic: Financial calculations and business rules.
- Data access: PostgreSQL queries and Supabase interaction.
- Database: Referential integrity, RLS, constraints, atomic operations, and migrations.

Keep complex financial operations on the server or in PostgreSQL database functions.

Do not trust client-supplied financial totals, organization membership, role information, or authorization decisions.

Avoid unnecessary abstraction, premature microservices, and oversized components.

## 5. Functional Requirements

### 5.1 Authentication

Implement:

- Email/password registration
- Email/password login
- Logout
- Email verification
- Forgot-password and password reset
- Protected application routes
- Secure cookie-based sessions
- Server-side authentication checks

Use Supabase Auth.

Never store passwords in custom application tables.

### 5.2 Organization Management

Implement:

- Organization registration and onboarding
- Organization profile
- Organization membership
- Administrator, finance officer, and viewer roles
- Authorized role management
- Organization-specific data isolation

Each financial record must belong to an organization, directly or through securely enforced relationships.

### 5.3 Donor Management

Implement:

- Create donor
- Update donor
- View donor details
- Search and filter donors
- Archive donors
- Link donors to project funding
- View donor funding history

Prevent unauthorized or cross-organization data access.

### 5.4 Project Management

Implement:

- Create projects
- Update project information
- Set project start/end dates
- Assign project codes
- Track project lifecycle
- Link funding sources
- View project financial summaries
- Archive or close projects according to business rules

Statuses:

- PLANNED
- ACTIVE
- CLOSED

### 5.5 Budget Management

Implement:

- Project budgets
- Budget categories and lines
- Allocated amounts
- Budget utilization
- Remaining budgets
- Budget-versus-actual reports
- Budget validation
- Controlled budget adjustments
- Overspending protection

Default behavior must prevent posting expenses that exceed the authorized budget.

### 5.6 Financial Transactions

Implement:

- Income transactions
- Expense transactions
- Transaction references
- Transaction dates
- Project and budget-line association
- Draft creation
- Editing drafts
- Posting transactions
- Reversing posted transactions
- Transaction search/filtering
- Transaction details
- Audit histories

Use explicit transaction lifecycle states:

- DRAFT
- POSTED
- REVERSED

Posted transactions must not be silently edited or deleted.

Corrections must preserve historical records and use well-defined reversal logic.

### 5.7 Financial Dashboard

Build a responsive dashboard displaying:

- Total recorded income
- Total recorded expenses
- Approved budget allocations
- Remaining budget
- Active projects
- Funding summaries
- Project budget utilization
- Recent transactions
- Financial trends
- Budget alerts

Distinguish commitments, recorded funding, actual income, and approved budgets. Do not treat these amounts as automatically interchangeable.

Replace synthetic sample values with database queries when corresponding backend functionality exists.

Display a clear demo indicator whenever synthetic data is shown.

### 5.8 Reporting

Implement:

- Project expenditure reports
- Donor funding reports
- Income and expense summaries
- Budget-versus-actual reports
- Date-range filtering
- Search and pagination
- CSV export
- PDF report export in a later phase

Report values must be calculated from authoritative persisted transactions, not client-provided totals.

### 5.9 Excel Import

Implement:

- XLSX upload
- Field mapping
- Data validation
- Preview before import
- Duplicate detection
- Import results
- Row-level error reporting
- Safe retries and idempotency
- Import audit records

Never import invalid records silently.

### 5.10 Audit Logging

Record important actions such as:

- Creating or updating donors and projects
- Budget adjustments
- Transaction posting
- Transaction reversal
- Role changes
- Financial data imports

Record actor, timestamp, action, relevant entity, and appropriate change metadata.

Do not store passwords, authentication tokens, or secrets in audit logs.

## 6. Financial Correctness Rules

These rules are mandatory.

1. Default reporting currency is USD.
2. Use PostgreSQL `NUMERIC` for monetary data.
3. Avoid JavaScript floating-point calculations for authoritative monetary operations.
4. Use safe decimal arithmetic or minor-unit representations where appropriate.
5. Persist currency codes with transactions.
6. Validate currency consistency.
7. Never trust totals calculated by the browser.
8. Draft transactions do not affect posted financial reports.
9. Posted transactions require atomic database operations.
10. Reversals must preserve financial history.
11. Do not allow duplicate transaction posting.
12. Prevent overspending under concurrent requests.
13. Include zero-budget and boundary-case handling.
14. Maintain referential integrity.
15. Ensure financial reports are reproducible.
16. Test all significant calculations.

FundTrack MVP is a financial tracking and budget management platform, not a certified accounting system or full double-entry general ledger.

Do not advertise unsupported accounting, compliance, or audit certifications.

## 7. Database Design

Design a PostgreSQL schema containing:

- organizations
- organization_members
- donors
- projects
- project_funding
- budget_lines
- budget_adjustments
- financial_transactions
- transaction_reversals or equivalent reversal linkage
- audit_logs
- import_jobs
- import_errors

Additional tables may be introduced when justified by requirements.

Use:

- UUID primary keys
- Foreign keys
- Appropriate unique constraints
- CHECK constraints
- Useful indexes
- UTC timestamps
- Versioned SQL migrations
- Explicit authorization policies

Define RLS policies for every exposed organization-scoped table.

RLS must enforce cross-organization isolation.

Do not create recursive membership policies or insecure functions that permit privilege escalation.

Privileged database functions must have tightly scoped execution permissions, explicit authorization checks, and safe `search_path` configuration.

Never expose service-role or secret database keys to the browser.

## 8. User Interface Requirements

Create a clean, modern, professional SaaS dashboard.

Design principles:

- Light theme as default
- White and slate surfaces
- Blue as the primary accent
- Responsive layout
- Accessible components
- Consistent spacing and typography
- Clear navigation
- Loading and empty states
- Meaningful validation errors
- Success/error notifications
- Confirmation for destructive operations

Use shadcn/ui and Tailwind CSS.

Create reusable:

- Application sidebar
- Header
- Page headings
- Summary cards
- Data tables
- Forms
- Dialogs
- Status indicators
- Date selectors
- Pagination controls
- Report filters

Do not leave placeholder navigation pretending to be functional.

## 9. Security Requirements

Apply defense in depth.

- Authenticate protected requests.
- Authorize each business operation.
- Enforce database RLS.
- Validate input with Zod.
- Prevent cross-organization access.
- Protect privileged operations.
- Validate file formats and upload sizes.
- Avoid leaking sensitive data in errors.
- Never expose environment secrets.
- Never commit `.env.local`.
- Use secure session handling.
- Prevent unauthorized role changes.
- Apply safe error handling and logging.

Use real authorization checks, not just hidden UI buttons.

## 10. Testing Requirements

Every important feature must include automated tests.

Unit tests should cover:

- Financial calculations
- Input validation
- Status transitions
- Budget utilization
- Report aggregation logic

Integration tests should cover:

- Database constraints
- RLS tenant isolation
- Financial posting
- Concurrent budget spending
- Transaction reversal
- Duplicate imports

End-to-end tests should cover:

- Login
- Organization onboarding
- Donor creation
- Project creation
- Budget allocation
- Transaction creation and posting
- Report viewing

Do not claim that tests passed without running them.

## 11. Engineering Quality

Maintain:

- TypeScript strict typing
- ESLint compliance
- Reusable components
- Meaningful error handling
- Small, focused functions
- Separation of concerns
- Secure SQL operations
- Documented API contracts
- Appropriate logging
- Accessible UI
- Useful documentation

Avoid using `any`, suppressing TypeScript errors, or disabling lint rules simply to make builds pass.

## 12. Git and GitHub

Use meaningful development milestones.

Suggested branches:

- `feature/authentication`
- `feature/organizations`
- `feature/donors`
- `feature/projects`
- `feature/budgets`
- `feature/transactions`
- `feature/reports`
- `feature/excel-import`

Write descriptive commits and maintain a clear history.

Do not automatically force-push, delete branches, or publish code without authorization.

## 13. Documentation

Maintain:

- README.md
- docs/architecture.md
- docs/database-design.md
- docs/financial-rules.md
- docs/security.md
- docs/development-roadmap.md
- docs/testing.md
- docs/deployment.md
- docs/decisions/

Document important engineering trade-offs through architecture decision records.

## 14. Agent Workflow

Before modifying code:

1. Inspect the existing repository.
2. Identify completed and missing features.
3. Read relevant documentation and existing tests.
4. Explain the proposed implementation.
5. Identify security and data-integrity implications.

During implementation:

1. Work on one coherent milestone at a time.
2. Preserve working code.
3. Apply small, reviewable changes.
4. Add tests with each feature.
5. Update relevant documentation.
6. Run appropriate checks.
7. Report failures accurately.

After implementation:

1. Summarize files changed.
2. Explain key design decisions.
3. Report executed tests and results.
4. Identify remaining limitations.
5. Recommend the next milestone.

Never claim that the entire project is finished unless every defined release requirement has been implemented and verified.

Do not fabricate terminal results, screenshots, deployments, or Git commits.

## 15. Project Completion Criteria

The MVP is complete when an authorized user can:

1. Register and sign in.
2. Create or join an organization through an authorized workflow.
3. Manage donors.
4. Register projects and their funding sources.
5. Create and adjust project budgets.
6. Create, post, and reverse financial transactions.
7. View accurate financial dashboards.
8. Generate financial reports.
9. Import validated Excel transactions.
10. View relevant audit histories.
11. Use the application without unauthorized access to another organization's data.

The application must also:

- Pass automated tests.
- Pass TypeScript and lint checks.
- Build successfully.
- Have deployment instructions.
- Have documented security assumptions.
- Contain synthetic demonstration data.
- Have useful Git history.
- Have no known critical financial integrity or authorization defects.

## 16. Current Project Status

The repository already exists.

Previously completed or started:

- Next.js application initialization
- Root-level App Router structure
- Tailwind CSS
- shadcn/ui configuration
- Initial dashboard interface
- Supabase package installation/configuration
- Initial authentication integration

The status of these items must be verified from the actual repository. Do not assume that code or database migrations are complete solely because they appear in these instructions.

The immediate next step is to inspect the existing codebase and safely resume Supabase SSR authentication integration.

## 17. Final Principle

Prioritize correctness, security, maintainability, and meaningful engineering decisions over producing large amounts of code quickly.

FundTrack must become a credible, independently developed financial software application that its developer can understand, test, maintain, and explain.

<!-- END:nextjs-agent-rules -->