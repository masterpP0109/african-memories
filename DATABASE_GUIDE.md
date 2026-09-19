# African Memories: database to website guide

This guide matches this repository's Next.js frontend, NestJS API and Prisma 5 setup. Run commands in **PowerShell**, using the folders shown. The `.cmd` suffix avoids this computer?s PowerShell script execution restriction. You do not need to install PostgreSQL separately: Docker runs it for you.

## 1. Understand the connection

Browser -> Next.js (port 3000) -> NestJS API (port 3001) -> Prisma -> PostgreSQL in Docker (port 5432).

Prisma migrations create the tables. Prisma Studio is your local visual editor for the records. The API reads those records and sends JSON to the frontend. Keep all three services running while using database-backed pages.

## 2. Start Docker Desktop

Open Docker Desktop from the Windows Start menu and wait until the engine is running (Linux containers). Then open PowerShell:

```powershell
Set-Location C:\Users\user\Desktop\african-memories\backend
docker version
```

You should see both Client and Server information. A missing `docker_engine` pipe means the engine is not running. This was the blocker during the project audit.

## 3. Configure the database (first time only)

The project already has `backend/.env`: edit it locally; do not overwrite it. For a fresh checkout only:

```powershell
if (!(Test-Path .env)) { Copy-Item .env.example .env }
notepad .env
```

Set these values, keeping your actual password private:

```dotenv
PORT=3001
FRONTEND_URL=http://localhost:3000
POSTGRES_USER=african_memories
POSTGRES_PASSWORD=YOUR_LOCAL_PASSWORD
POSTGRES_DB=african_memories
DATABASE_URL=postgresql://african_memories:YOUR_LOCAL_PASSWORD@localhost:5432/african_memories?schema=public
ADMIN_API_KEY=YOUR_RANDOM_KEY_AT_LEAST_16_CHARACTERS
```

Use the same password in both places. URL-encode special characters in the password inside DATABASE_URL. Never put DATABASE_URL or ADMIN_API_KEY in a NEXT_PUBLIC variable. Existing Docker volumes retain the original database credentials: editing `.env` does not change a PostgreSQL user's password.

## 4. Start PostgreSQL and create the tables

In the backend folder:

```powershell
docker compose up -d postgres
docker compose ps
npm.cmd install
npx.cmd prisma generate
npx.cmd prisma migrate deploy
npx.cmd prisma migrate status
```

Wait for postgres to show healthy. The repository migrations create Activity, Price and Availability. `migrate deploy` applies existing migrations; do not use reset to load content.

Optional learning record:

```powershell
npm.cmd run seed
```

This creates `zambezi-boat-cruise` with sample pricing and availability if it does not already exist. It preserves existing content on reruns. Sample commercial details must be reviewed before real publication; dates and prices are not verified offers.

## 5. Start the backend

In the same terminal:

```powershell
npm.cmd run dev
```

Leave it running. In another PowerShell window, check:

```powershell
Invoke-RestMethod http://localhost:3001/api/v1/ready
Invoke-RestMethod http://localhost:3001/api/v1/activities
```

Readiness should report `database: connected`. An empty activity list means no PUBLISHED records exist yet.

## 6. Add your own information visually

Open another terminal:

```powershell
Set-Location C:\Users\user\Desktop\african-memories\backend
npx.cmd prisma studio
```

Open the local URL printed by Studio (normally http://localhost:5555).

1. Open **Activity**, choose **Add record**, and fill in name, slug, category, description, image and status.
2. Example: name `Zambezi Sunset Cruise`, slug `zambezi-sunset-cruise`, category `SCENIC`. Use lowercase letters, numbers and hyphens for a unique slug. The public page becomes `/adventures/zambezi-sunset-cruise`.
3. Use your real description and a full HTTPS image URL, preferably your existing ImageKit host. For a new image host, add it to `next.config.ts` remotePatterns and restart Next.js.
4. Leave generated id/timestamps at their defaults. Save as DRAFT while editing; set PUBLISHED when ready. Drafts are hidden from the public list and detail endpoint.
5. Save and copy the generated Activity id.
6. Open **Price**, add a record, link its activityId to that Activity id, and enter amount (e.g. 150), currency (USD), validFrom, validTo and isActive=true. Use your real price. validTo must be after validFrom. Only active prices valid now display; the latest starting valid price wins if periods overlap.
7. Open **Availability**, link the same activityId, enter startsAt/endsAt, capacity and remaining. Dates must be ordered; remaining must be between zero and capacity. Only future slots with remaining > 0 display. Use ISO dates with timezone, such as `2026-12-01T15:00:00+02:00`.
8. Save each table's changes. Studio writes directly to PostgreSQL and bypasses API validation, so check these rules yourself. Prefer the API below for validated entry.

Activity has many Price and Availability records; the shared activityId is what connects them. Entering a price without linking it will not put it on the activity page. Keep slugs stable after sharing links.

## 7. Connect and start the frontend

Open a separate terminal in the project root:

```powershell
Set-Location C:\Users\user\Desktop\african-memories
notepad .env.local
```

Add or update this line without removing other existing settings:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

An optional server-only API_URL takes precedence if set; ensure it points to the same API during local development.

```powershell
npm.cmd install
npm.cmd run dev
```

Visit http://localhost:3000/adventures and click your record. Open http://localhost:3000/adventures/zambezi-sunset-cruise directly too. The homepage shows the first four published activities alphabetically. Reads use no-store: refresh the page after saving database changes. There is no automatic live push to an already open page. Restart Next.js after editing environment variables.

## 8. Add records through the API (validated alternative)

Run in a separate PowerShell terminal. Paste your private backend ADMIN_API_KEY when prompted; never put it in frontend code.

```powershell
$base = 'http://localhost:3001/api/v1'
$privateKey = Read-Host 'Backend ADMIN_API_KEY' -AsSecureString
$headers = @{ 'x-api-key' = [System.Net.NetworkCredential]::new('', $privateKey).Password }
$body = @{
  name = 'Zambezi Sunset Cruise'
  slug = 'zambezi-sunset-cruise'
  category = 'SCENIC'
  description = 'Replace this with your actual experience description.'
  image = 'https://ik.imagekit.io/c0x52ylk1/African%20Memories%20Resources/caption.jpg'
  status = 'DRAFT'
} | ConvertTo-Json
$activity = Invoke-RestMethod "$base/activities" -Method Post -Headers $headers -ContentType 'application/json' -Body $body

$price = @{
  activityId = $activity.id
  amount = 150
  currency = 'USD'
  validFrom = (Get-Date).ToUniversalTime().AddDays(-1).ToString('o')
  validTo = (Get-Date).ToUniversalTime().AddMonths(3).ToString('o')
  isActive = $true
} | ConvertTo-Json
Invoke-RestMethod "$base/pricing" -Method Post -Headers $headers -ContentType 'application/json' -Body $price

$slot = @{
  activityId = $activity.id
  startsAt = (Get-Date).ToUniversalTime().AddDays(7).ToString('o')
  endsAt = (Get-Date).ToUniversalTime().AddDays(7).AddHours(3).ToString('o')
  capacity = 12
  remaining = 12
} | ConvertTo-Json
Invoke-RestMethod "$base/availability" -Method Post -Headers $headers -ContentType 'application/json' -Body $slot

# Publish after reviewing the content, sample amount and dates above.
Invoke-RestMethod "$base/activities/$($activity.id)" -Method Patch -Headers $headers -ContentType 'application/json' -Body '{"status":"PUBLISHED"}'
Invoke-RestMethod "$base/activities/zambezi-sunset-cruise"
Remove-Variable headers, privateKey
```

If the slug already exists, use its id from Studio and PATCH `/activities/ID` to edit it; do not rerun POST with the same slug. Price and availability currently support create/read only: use Studio to edit or deactivate those records. Do not rerun their POST calls accidentally, as they create additional records.

## 9. Prove a database change reaches the page

Change the description of your published record in Studio, save, inspect `/api/v1/activities/YOUR-SLUG`, then refresh `/adventures/YOUR-SLUG`. The same description should appear in both. Change to DRAFT: it should disappear from `/adventures`, and its public slug should return 404. Restore PUBLISHED when ready.

If it does not appear:

| Symptom | Check |
| --- | --- |
| Docker cannot connect | Docker Desktop engine and Linux containers |
| Database authentication fails | Matching credentials and original volume password |
| Migration connection error | postgres health, port 5432 and DATABASE_URL |
| API cannot start | ADMIN_API_KEY configuration, dependencies and port 3001 |
| API list is empty | Activity status must be PUBLISHED |
| API works, page fails | API_URL/NEXT_PUBLIC_API_URL, restart frontend |
| Missing price | Correct activityId, active flag and validity period |
| Missing dates | Future startsAt, remaining > 0, correct activityId |
| Image fails | Public HTTPS URL and Next.js allowed image host |
| POST returns 401 | Correct x-api-key header |
| POST returns 400 | Validation message, date order, UUID and allowed fields |
| POST returns 409 | Slug already exists |

## 10. Everyday startup and shutdown

Start Docker Desktop, run `docker compose up -d postgres` in backend, run `npm.cmd run dev` in backend, and run `npm.cmd run dev` in the root in another terminal. Open Studio only when editing data. Use Ctrl+C to stop each development server. `docker compose stop postgres` stops the database while preserving records. Do not use `docker compose down -v` unless intentionally deleting the database volume.

## Backend completion audit

| Area | Current state |
| --- | --- |
| PostgreSQL, Prisma schema and migrations | Implemented; live connection requires Docker verification |
| Activity create/update/list/slug | Implemented; writes require admin key; drafts hidden publicly |
| Price and availability create/read | Implemented; date validation repaired and writes now admin protected |
| Price and availability update/delete | No routed endpoints yet; edit through Studio |
| Homepage activity cards, adventures list/detail | Connected to API; no static fallback records |
| Accommodation list/detail | Still frontend catalog; no database model or API |
| Destination pages | Still frontend content, including static related adventures |
| Blog list/detail | Still frontend content; no blog database/API |
| Contact form | UI only: currently sets a submitted state, with no backend save/email |
| Reservations/payments | Not implemented; availability display does not reserve seats |
| Admin dashboard/login, image upload | Not implemented; local Studio and API key available |
| Production readiness | Still needs deployment configuration, backups, monitoring, rate limits and reservation concurrency design |

The whole backend is **not complete**. You can populate activities now. Hotels, destinations and blogs require their own models, migrations, validated endpoints and frontend connections before entering them into PostgreSQL will affect those pages. Recommended next order: accommodation -> destinations and activity relationships -> blog -> real enquiries -> reservation workflow. Do not treat the contact form's current success message as proof of delivery.

## Checks

```powershell
# backend folder
npm.cmd test -- --runInBand
npm.cmd run typecheck
npm.cmd run build
# isolated database integration tests (never the content database)
docker compose --profile test up -d postgres-test
$env:TEST_DATABASE_URL='postgresql://african_memories_test:local_test_only@localhost:5433/african_memories_test?schema=public'
npm.cmd run migrate:test
npm.cmd run test:e2e
# project root
npx.cmd tsc --noEmit
npm.cmd run build
```

Commands use the repository's installed Prisma 5 version; do not substitute prisma@latest or Prisma 7/8 setup instructions. Reference: [Docker Compose up](https://docs.docker.com/reference/cli/docker/compose/up/) and [Prisma CLI](https://docs.prisma.io/docs/orm/reference/prisma-cli-reference).

## Verification results from this update

- Backend: 4 test suites / 17 tests passed, including ISO date validation and draft slug protection.
- Backend production build passed.
- Frontend TypeScript check and git whitespace check passed.
- Frontend production build was blocked by Google Fonts network downloads (Fraunces, Work Sans, Geist and Geist Mono).
- Live database/migration/integration testing was not run because the Docker engine was unavailable; no real database content was changed.
- Browser visual verification was unavailable in this session. Review desktop and mobile layouts after starting the site.
