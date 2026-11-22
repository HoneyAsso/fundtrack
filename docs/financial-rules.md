# FundTrack financial rules

FundTrack records budgets, income, and expenses for an organization. It does not claim to be a certified accounting system, a tax engine, or a double-entry general ledger.

The default reporting currency is USD. These rules are mandatory once the related features exist. Milestone 1 does not post money.

## Money

1. Store amounts in PostgreSQL `NUMERIC`, not floating-point columns.
2. Do not use JavaScript binary floating point for an authoritative total, balance, or overspend check.
3. TypeScript may carry amounts as decimal strings and may format them for display.
4. Persist a currency code with every monetary row.
5. Reject a transaction whose currency does not match the organization or project currency it belongs to.
6. Ignore totals calculated in the browser. Recompute on the server or in SQL.

## Lifecycle

Transaction statuses are `DRAFT`, `POSTED`, and `REVERSED`.

- A draft does not change posted income, posted expenses, or budget utilization.
- Posting is atomic. A second post of the same transaction is rejected.
- A posted row is not edited or deleted to correct it.
- A reversal adds a linked record and marks the original `REVERSED`, so the history remains queryable.

Project statuses are `PLANNED`, `ACTIVE`, and `CLOSED`. Closing a project follows the rules added with project management. It does not erase transactions.

## Budgets and funding

These amounts are different and must not be substituted for each other:

- A funding commitment is a donor's pledged support for a project.
- Recorded income is a posted income transaction.
- An approved budget is the sum of authorized budget lines after adjustments.
- An expense reduces remaining budget only when it is posted.
- Remaining budget is approved budget minus posted expenses. Drafts are not subtracted.

The default rule rejects a posted expense that would exceed the authorized budget on its line, including when two requests arrive together. Zero-budget lines cannot accept a positive expense. Boundary amounts that land exactly on the remaining budget are allowed.

## Reports

A report is the result of querying persisted posted transactions and budget rows for an authorized organization and date range. Re-running the same query returns the same figures. CSV export uses those figures, not values typed into the page.

## Imports

An import may create draft or otherwise validated rows only after preview and row checks. Invalid rows are reported and skipped. A retry must not duplicate a row that already committed. Import results are audited.

## Audit

Budget changes, posting, reversal, role changes, and imports record the actor, time, action, entity, and a safe change summary. Passwords, session tokens, and service keys are never written to the audit log.
