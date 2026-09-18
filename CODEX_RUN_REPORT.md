# Codex Run Report

Date: 2026-09-18

## Verified end-to-end feature

The Activities API is now a complete PostgreSQL-backed path. A real HTTP request is
validated by Nest, protected with a timing-safe `x-api-key` check for mutations,
written through Prisma to PostgreSQL, read back, partially updated, and returned by
the published/category-filtered list endpoint. The integration test found and fixed
a partial-update bug where an inherited DTO initializer reset status to `DRAFT`.

## Database and migration changes

- Existing ORM retained: Prisma 5 with PostgreSQL.
- Added forward-only migration `20260918120000_harden_activity_queries`.
- Added indexes for published/category activity lists and activity-scoped price and
  availability queries.
- Added `NOT VALID` database checks that enforce valid date windows and capacity on
  new writes without making migration deployment fail on possible legacy rows.
- Added strict PostgreSQL URL and minimum admin API key environment validation.
- Added a disposable PostgreSQL Docker service on port 5433 using tmpfs.
- Removed insecure `POSTGRES_HOST_AUTH_METHOD=trust` from local Docker configuration.
- Integration tooling requires `TEST_DATABASE_URL`, verifies the database name
  contains `test`, and never falls back to the development/production URL.

## Endpoints tested

- `GET /api/v1` - application liveness, independent of the database.
- `GET /api/v1/ready` - database readiness (`SELECT 1`).
- `POST /api/v1/activities` - 400 validation, 401 authorization, and 201 create.
- `GET /api/v1/activities/:slug` - reads the created PostgreSQL row.
- `PATCH /api/v1/activities/:id` - updates without overwriting omitted fields.
- `GET /api/v1/activities?category=E2E%20Safari` - published/category-filtered list.

## Commands and results

- `docker compose --profile test up -d postgres-test` - PASS.
- `npm run migrate:test` - PASS; all three migrations applied to
  `african_memories_test` only.
- `npx prisma validate` - PASS.
- `docker compose --profile test config --quiet` - PASS (Docker config access
  warning only; Compose definition valid).
- `npm run format` (backend) - PASS.
- `npm run lint` (backend) - PASS.
- `npm run typecheck` (backend) - PASS.
- `npm test -- --runInBand` (backend) - PASS, 3 suites / 14 tests.
- `npm run test:e2e` (backend) - PASS, 1 suite / 2 tests against PostgreSQL.
- `npm run build` (backend) - PASS.
- `npm run build` (frontend production) - PASS after allowing Google Fonts network access.
- `npm run lint` (repository frontend) - FAILS on pre-existing frontend/generated and
  `.kilo/worktrees` findings; the backend-scoped lint command passes. This run did
  not modify unrelated frontend implementation to suppress those findings.
- `git diff --check` - PASS (line-ending notices only).

## Files changed

- Root: `.gitignore` (pre-existing user change preserved), `README.md`, this report.
- Backend configuration: `.env.example`, `compose.yaml`, `package.json`,
  `eslint.config.mjs`.
- Prisma: `schema.prisma` and the new migration above.
- Application: app health/readiness wiring, environment validation, activities
  controller/service/DTO/module, admin API-key guard, and small lint corrections.
- Tests: PostgreSQL activity e2e test, safe test-env setup, Prisma migration wrapper,
  and Jest e2e configuration.

## Unresolved defects or missing inputs

- No production database credentials or production secrets were supplied or used.
- There is no user/role identity system in this repository. Activity mutations use
  an environment-managed admin API key as the available authorization boundary;
  replace this with the intended identity provider when its requirements exist.
- Existing nullable `Price.activityId` and `Availability.activityId` relationships
  were not made destructive/non-null because legacy data has not been audited.
- The root frontend lint scope includes `.kilo` worktrees, backend generated Prisma
  JavaScript, and existing frontend rule violations. This is separate from the
  backend integration and should be repaired as a dedicated frontend/tooling task.
- No backend-critical client-supplied images, copy, or other assets are required.
  Destination/accommodation content and imagery remain frontend-owned static data.

## Required steps before production deployment

1. Back up and audit the target database, especially orphaned Price/Availability rows.
2. Set a production PostgreSQL `DATABASE_URL` with TLS as required by the provider.
3. Generate and store a high-entropy `ADMIN_API_KEY` in the deployment secret store;
   never commit it or reuse the example/test value.
4. Run `npx prisma migrate deploy` once against a staging clone and validate existing
   rows against the new constraints before production.
5. Run backend lint, type-check, unit tests, integration tests against an isolated
   staging/test database, and both production builds in CI.
6. Configure the exact production `FRONTEND_URL`, network access rules, monitoring,
   backups, restore testing, and secret rotation.
7. Resolve the root frontend lint configuration/findings and decide whether the
   legacy nullable relationships can be tightened in a later forward migration.
8. Do not deploy until staging smoke tests confirm liveness, readiness, authorization,
   create/read/update/list behavior, and rollback procedures.
