This repository contains the African Memories Next.js frontend and NestJS/PostgreSQL backend.

## Backend local setup

Prerequisites: Node.js, npm, and Docker Desktop.

```bash
cd backend
copy .env.example .env
# Replace POSTGRES_PASSWORD and ADMIN_API_KEY in .env with local-only values.
docker compose up -d postgres
npm install
npx prisma migrate deploy
npm run dev
```

The API is served at `http://localhost:3001/api/v1`. `GET /api/v1` is a process
liveness check and `GET /api/v1/ready` verifies PostgreSQL connectivity. Mutating
activity endpoints require `ADMIN_API_KEY` in the `x-api-key` header.

## Backend integration tests

The test service uses port 5433, a database name containing `test`, and a tmpfs
volume. Test tooling refuses to use `DATABASE_URL` as a fallback.

```bash
cd backend
docker compose --profile test up -d postgres-test
# PowerShell:
$env:TEST_DATABASE_URL='postgresql://african_memories_test:local_test_only@localhost:5433/african_memories_test?schema=public'
npm run migrate:test
npm run test:e2e
```

Run `npm run format`, `npm run lint`, `npm run typecheck`, `npm test`, and
`npm run build` for the remaining backend checks.

## Frontend

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
"# african-memories" 
# african-memories
# african-memories
# african-memories
# african-memories
